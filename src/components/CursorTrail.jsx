import { useEffect, useRef } from 'react'

const TRAIL_LENGTH = 12

export default function CursorTrail() {
  const trailRef = useRef([])

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    const isCoarsePointer = window.matchMedia('(pointer: coarse)').matches

    if (prefersReducedMotion || isCoarsePointer) return undefined

    for (let i = 0; i < TRAIL_LENGTH; i++) {
      const el = document.createElement('div')
      el.className = 'cursor-trail-dot'
      el.style.position = 'fixed'
      el.style.pointerEvents = 'none'
      el.style.zIndex = '9999'
      const size = Math.max(2, 4 - i * 0.15)
      el.style.width = `${size}px`
      el.style.height = `${size}px`
      el.style.borderRadius = '50%'
      el.style.backgroundColor = 'rgba(255, 255, 255, 0.8)'
      el.style.boxShadow = '0 0 6px 2px rgba(0, 255, 255, 0.5)'
      el.style.willChange = 'transform'
      el.style.opacity = `${1 - i / (TRAIL_LENGTH + 4)}`
      el.style.transform = 'translate3d(-50%, -50%, 0)'
      document.body.appendChild(el)
      trailRef.current.push(el)
    }

    let mouse = { x: window.innerWidth / 2, y: window.innerHeight / 2 }
    let positions = Array.from({ length: TRAIL_LENGTH }, () => ({ ...mouse }))
    let rafId = null
    let isVisible = true

    const move = (e) => {
      mouse = { x: e.clientX, y: e.clientY }
    }

    const animate = () => {
      if (!isVisible) {
        rafId = null
        return
      }

      positions.unshift({ ...mouse })
      positions.length = TRAIL_LENGTH

      for (let i = 0; i < TRAIL_LENGTH; i++) {
        const el = trailRef.current[i]
        if (el) {
          el.style.transform = `translate3d(${positions[i].x}px, ${positions[i].y}px, 0) translate(-50%, -50%)`
        }
      }

      rafId = requestAnimationFrame(animate)
    }

    const onVisibilityChange = () => {
      isVisible = document.visibilityState === 'visible'
      if (isVisible && rafId == null) {
        rafId = requestAnimationFrame(animate)
      } else if (!isVisible && rafId != null) {
        cancelAnimationFrame(rafId)
        rafId = null
      }
    }

    window.addEventListener('mousemove', move, { passive: true })
    document.addEventListener('visibilitychange', onVisibilityChange)
    rafId = requestAnimationFrame(animate)

    return () => {
      window.removeEventListener('mousemove', move)
      document.removeEventListener('visibilitychange', onVisibilityChange)
      if (rafId != null) cancelAnimationFrame(rafId)
      trailRef.current.forEach((el) => el.remove())
      trailRef.current = []
    }
  }, [])

  return null
}
