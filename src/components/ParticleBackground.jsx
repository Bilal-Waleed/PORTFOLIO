import { useCallback, useMemo } from 'react'
import { loadSlim } from "tsparticles-slim"
import Particles from "react-tsparticles"

export default function ParticleBackground() {
  const particlesInit = useCallback(async (engine) => {
    try {
      await loadSlim(engine)
    } catch (error) {
      console.error("Failed to initialize particles:", error)
    }
  }, [])

  const options = useMemo(() => {
    const isMobile = typeof window !== "undefined"
      && window.matchMedia("(max-width: 879px)").matches
    const finePointer = typeof window !== "undefined"
      && window.matchMedia("(pointer: fine)").matches

    return {
      fullScreen: false,
      fpsLimit: isMobile ? 24 : 30,
      pauseOnBlur: true,
      pauseOnOutsideViewport: true,
      detectRetina: false,
      particles: {
        number: {
          value: isMobile ? 14 : 24,
          density: {
            enable: true,
            value_area: isMobile ? 900 : 1100,
          },
        },
        color: {
          value: "#06b6d4",
        },
        shape: {
          type: "circle",
        },
        opacity: {
          value: { min: 0.12, max: 0.4 },
        },
        size: {
          value: { min: 1, max: 2 },
        },
        links: {
          enable: true,
          distance: isMobile ? 90 : 110,
          color: "#ffffff",
          opacity: 0.1,
          width: 1,
        },
        move: {
          enable: true,
          speed: isMobile ? 0.35 : 0.55,
          direction: "none",
          outModes: {
            default: "out",
          },
        },
      },
      interactivity: {
        detectsOn: "window",
        events: {
          onHover: {
            enable: finePointer && !isMobile,
            mode: "grab",
          },
          onClick: { enable: false },
          resize: true,
        },
        modes: {
          grab: {
            distance: 140,
            links: {
              opacity: 0.3,
            },
          },
        },
      },
    }
  }, [])

  return (
    <Particles
      id="tsparticles"
      className="pointer-events-none absolute inset-0 h-full w-full"
      init={particlesInit}
      options={options}
    />
  )
}
