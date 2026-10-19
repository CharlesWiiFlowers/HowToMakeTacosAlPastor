import { useMemo } from 'react'
import { Particles, ParticlesProvider } from '@tsparticles/react'
import { loadSlim } from '@tsparticles/slim'
import type { Engine, ISourceOptions } from '@tsparticles/engine'
import type { ResolvedTheme } from '../hooks/useTheme'
import './ParticleField.css'

/**
 * Registered once per page load. The tsParticles engine and its plugins live in
 * a shared singleton, so mounting the animated field again later is free.
 */
const registerParticles = async (engine: Engine) => {
  await loadSlim(engine)
}

interface ParticlePalette {
  particle: string
  link: string
  linkOpacity: number
}

/** The original field used white particles on a dark background. */
const PARTICLE_PALETTES: Record<ResolvedTheme, ParticlePalette> = {
  dark: { particle: '#ffffff', link: '#ffffff', linkOpacity: 0.5 },
  light: { particle: '#7c3aed', link: '#7c3aed', linkOpacity: 0.35 },
}

interface ParticleFieldProps {
  /** Resolved site theme, used to keep the particles visible in both themes. */
  theme: ResolvedTheme
}

function ParticleCanvas({ theme }: ParticleFieldProps) {
  const options = useMemo<ISourceOptions>(() => {
    const palette = PARTICLE_PALETTES[theme]

    return {
      detectRetina: true,
      fpsLimit: 60,
      // `background` is intentionally omitted: the page supplies the cosmic
      // gradients and the canvas must stay transparent.
      fullScreen: { enable: true, zIndex: -1 },
      interactivity: {
        // Listen on the document so hovering and clicking work anywhere on the
        // page: the canvas itself stays behind the content and ignores pointers.
        detectsOn: 'window',
        events: {
          onClick: { enable: true, mode: 'push' },
          onHover: { enable: true, mode: 'repulse' },
        },
        modes: {
          push: { quantity: 4 },
          repulse: { distance: 200, duration: 0.4 },
        },
      },
      particles: {
        color: { value: palette.particle },
        links: {
          color: palette.link,
          distance: 150,
          enable: true,
          opacity: palette.linkOpacity,
          width: 1,
        },
        move: {
          direction: 'none',
          enable: true,
          outModes: { default: 'out' },
          random: false,
          speed: 2.5,
          straight: false,
        },
        number: {
          density: { enable: true },
          value: 80,
        },
        opacity: { value: 0.5 },
        shape: { type: 'circle' },
        size: { value: { min: 1, max: 5 } },
      },
    }
  }, [theme])

  return <Particles id="cosmic-particles" className="particle-field" options={options} />
}

/**
 * Animated particle background inspired by the Cosmic Place portfolio:
 * white circular particles, connecting lines, hover repulsion and a small
 * click burst. Decorative only — `aria-hidden` and `pointer-events: none`
 * keep it away from assistive technology and page interactions.
 */
export default function ParticleField({ theme }: ParticleFieldProps) {
  return (
    <div aria-hidden="true">
      <ParticlesProvider init={registerParticles}>
        <ParticleCanvas theme={theme} />
      </ParticlesProvider>
    </div>
  )
}
