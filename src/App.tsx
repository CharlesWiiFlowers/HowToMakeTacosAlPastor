import Navbar from './components/Navbar'
import ParticleField from './components/ParticleField'
import Starfield from './components/Starfield'
import Hero from './components/Hero'
import Ingredients from './components/Ingredients'
import Process from './components/Process'
import Tips from './components/Tips'
import Outro from './components/Outro'
import { usePrefersReducedMotion } from './hooks/usePrefersReducedMotion'
import { useStarfieldMode } from './hooks/useStarfieldMode'
import { useTheme } from './hooks/useTheme'

function App() {
  const { preference, resolvedTheme, setPreference } = useTheme()
  const { mode, setMode } = useStarfieldMode()
  const prefersReducedMotion = usePrefersReducedMotion()

  // The saved setting is always kept: when reduced motion is requested, the
  // animated mode quietly degrades to the lightweight static starfield.
  const animatedBlocked = mode === 'animated' && prefersReducedMotion
  const showAnimatedField = mode === 'animated' && !prefersReducedMotion
  const showStaticStars = mode === 'static' || animatedBlocked

  return (
    <>
      {showStaticStars ? <Starfield /> : null}
      {showAnimatedField ? <ParticleField theme={resolvedTheme} /> : null}
      <a className="skip-link" href="#recipe">
        Skip to content
      </a>
      <Navbar
        theme={preference}
        onThemeChange={setPreference}
        starfieldMode={mode}
        onStarfieldModeChange={setMode}
        starfieldFallbackActive={animatedBlocked}
      />
      <main>
        <Hero />
        <Ingredients />
        <Process />
        <Tips />
      </main>
      <Outro />
    </>
  )
}

export default App
