import { useRef, useEffect, useCallback, Children, cloneElement, isValidElement } from 'react'

export const RESUME_DELAY_MS = 5000
const DRAG_THRESHOLD = 8

export default function InteractiveLoopSlider({
  children,
  duration,
  reverse = false,
  className = '',
  innerClassName = 'flex gap-4',
  dragMovedRef,
}) {
  const items = Children.toArray(children)
  const trackRef = useRef(null)
  const innerRef = useRef(null)
  const offsetRef = useRef(0)
  const initializedRef = useRef(false)
  const halfWidthRef = useRef(0)
  const isPausedRef = useRef(false)
  const isDraggingRef = useRef(false)
  const isPointerDownRef = useRef(false)
  const isVisibleRef = useRef(true)
  const resumeTimerRef = useRef(null)
  const rafIdRef = useRef(null)
  const dragStartRef = useRef({ x: 0, y: 0, offset: 0 })
  const activePointerIdRef = useRef(null)
  const direction = reverse ? 1 : -1

  const applyTransform = useCallback(() => {
    if (innerRef.current) {
      innerRef.current.style.transform = `translate3d(${offsetRef.current}px, 0, 0)`
    }
  }, [])

  const wrapOffset = useCallback(() => {
    const hw = halfWidthRef.current
    if (hw <= 0) return
    if (reverse) {
      while (offsetRef.current > 0) offsetRef.current -= hw
      while (offsetRef.current <= -hw) offsetRef.current += hw
    } else {
      while (offsetRef.current < -hw) offsetRef.current += hw
      while (offsetRef.current > 0) offsetRef.current -= hw
    }
  }, [reverse])

  const measure = useCallback(() => {
    if (!innerRef.current) return
    const hw = innerRef.current.scrollWidth / 2
    if (hw <= 0) return
    halfWidthRef.current = hw
    if (!initializedRef.current) {
      offsetRef.current = reverse ? -hw : 0
      initializedRef.current = true
    }
    wrapOffset()
    applyTransform()
  }, [reverse, wrapOffset, applyTransform])

  const stopAnimation = useCallback(() => {
    if (rafIdRef.current != null) {
      cancelAnimationFrame(rafIdRef.current)
      rafIdRef.current = null
    }
  }, [])

  const clearResumeTimer = useCallback(() => {
    if (resumeTimerRef.current) {
      clearTimeout(resumeTimerRef.current)
      resumeTimerRef.current = null
    }
  }, [])

  const startAnimation = useCallback(() => {
    stopAnimation()
    if (isPausedRef.current || isDraggingRef.current || !isVisibleRef.current) return
    if (halfWidthRef.current <= 0) return

    let lastTime = performance.now()

    const tick = (now) => {
      if (isPausedRef.current || isDraggingRef.current || !isVisibleRef.current) {
        rafIdRef.current = null
        return
      }

      const dt = Math.min(now - lastTime, 50)
      lastTime = now

      const pxPerMs = halfWidthRef.current / duration
      offsetRef.current += direction * pxPerMs * dt
      wrapOffset()
      applyTransform()

      rafIdRef.current = requestAnimationFrame(tick)
    }

    rafIdRef.current = requestAnimationFrame(tick)
  }, [duration, direction, wrapOffset, applyTransform, stopAnimation])

  const scheduleResume = useCallback(() => {
    clearResumeTimer()
    resumeTimerRef.current = setTimeout(() => {
      isPausedRef.current = false
      startAnimation()
    }, RESUME_DELAY_MS)
  }, [clearResumeTimer, startAnimation])

  const pauseAuto = useCallback(() => {
    isPausedRef.current = true
    clearResumeTimer()
    stopAnimation()
  }, [clearResumeTimer, stopAnimation])

  useEffect(() => {
    measure()
    const el = innerRef.current
    if (!el) return undefined
    const ro = new ResizeObserver(measure)
    ro.observe(el)
    return () => ro.disconnect()
  }, [measure])

  useEffect(() => {
    const node = trackRef.current
    if (!node || typeof IntersectionObserver === 'undefined') {
      startAnimation()
      return () => stopAnimation()
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        isVisibleRef.current = entry.isIntersecting
        if (entry.isIntersecting && !isPausedRef.current && !isDraggingRef.current) {
          startAnimation()
        } else {
          stopAnimation()
        }
      },
      { root: null, rootMargin: '80px', threshold: 0 }
    )

    observer.observe(node)
    return () => {
      observer.disconnect()
      stopAnimation()
    }
  }, [startAnimation, stopAnimation])

  useEffect(() => {
    if (isVisibleRef.current && !isPausedRef.current && !isDraggingRef.current) {
      startAnimation()
    }
    return () => {
      stopAnimation()
      clearResumeTimer()
    }
  }, [duration, direction, startAnimation, stopAnimation, clearResumeTimer])

  const onPointerDown = (e) => {
    if (e.pointerType === 'mouse' && e.button !== 0) return
    isPointerDownRef.current = true
    isDraggingRef.current = false
    activePointerIdRef.current = e.pointerId
    if (dragMovedRef) dragMovedRef.current = false
    dragStartRef.current = { x: e.clientX, y: e.clientY, offset: offsetRef.current }
  }

  const onPointerMove = (e) => {
    if (!isPointerDownRef.current || e.pointerId !== activePointerIdRef.current) return

    const deltaX = e.clientX - dragStartRef.current.x
    const deltaY = e.clientY - dragStartRef.current.y

    if (!isDraggingRef.current) {
      if (Math.abs(deltaX) <= DRAG_THRESHOLD && Math.abs(deltaY) <= DRAG_THRESHOLD) return
      // Vertical scroll intent — let the browser handle it
      if (Math.abs(deltaY) > Math.abs(deltaX)) {
        isPointerDownRef.current = false
        activePointerIdRef.current = null
        return
      }
      isDraggingRef.current = true
      if (dragMovedRef) dragMovedRef.current = true
      pauseAuto()
      trackRef.current?.setPointerCapture(e.pointerId)
      trackRef.current?.classList.add('is-dragging')
    }

    const delta = e.clientX - dragStartRef.current.x
    offsetRef.current = dragStartRef.current.offset + delta
    wrapOffset()
    applyTransform()
  }

  const endDrag = (e) => {
    if (!isPointerDownRef.current || e.pointerId !== activePointerIdRef.current) return

    const wasDragging = isDraggingRef.current
    isPointerDownRef.current = false
    activePointerIdRef.current = null
    isDraggingRef.current = false

    if (trackRef.current?.hasPointerCapture(e.pointerId)) {
      trackRef.current.releasePointerCapture(e.pointerId)
    }
    trackRef.current?.classList.remove('is-dragging')
    if (wasDragging) scheduleResume()
  }

  return (
    <div
      ref={trackRef}
      className={`tech-stack-track ${className}`.trim()}
      onPointerDown={onPointerDown}
      onPointerMove={onPointerMove}
      onPointerUp={endDrag}
      onPointerCancel={endDrag}
    >
      <div ref={innerRef} className={`tech-stack-inner ${innerClassName}`.trim()}>
        {items.map((child, idx) =>
          isValidElement(child)
            ? cloneElement(child, { key: `loop-a-${child.key ?? idx}` })
            : child
        )}
        {items.map((child, idx) =>
          isValidElement(child)
            ? cloneElement(child, { key: `loop-b-${child.key ?? idx}` })
            : child
        )}
      </div>
    </div>
  )
}
