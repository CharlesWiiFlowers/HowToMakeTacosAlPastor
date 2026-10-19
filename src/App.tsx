import { useCallback, useEffect, useState } from 'react'
import Navbar from './components/Navbar'
import Starfield from './components/Starfield'
import Hero from './components/Hero'
import Ingredients from './components/Ingredients'
import Process from './components/Process'
import Tips from './components/Tips'
import Outro from './components/Outro'
import { useTheme } from './hooks/useTheme'

const STARS_STORAGE_KEY = 'al-pastor-stars'

function readStarsEnabled(): boolean {
  try {
    return localStorage.getItem(STARS_STORAGE_KEY) !== 'off'
  } catch {
    return true
  }
}

function App() {
  const { preference, setPreference } = useTheme()
  const [starsOn, setStarsOn] = useState(readStarsEnabled)

  useEffect(() => {
    document.documentElement.dataset.stars = starsOn ? 'on' : 'off'
  }, [starsOn])

  const toggleStars = useCallback(() => {
    setStarsOn((previous) => {
      const next = !previous
      try {
        localStorage.setItem(STARS_STORAGE_KEY, next ? 'on' : 'off')
      } catch {
        // Persistence is optional; the toggle still works.
      }
      return next
    })
  }, [])

  return (
    <>
      {starsOn ? <Starfield /> : null}
      <a className="skip-link" href="#recipe">
        Skip to content
      </a>
      <Navbar
        theme={preference}
        onThemeChange={setPreference}
        starsOn={starsOn}
        onToggleStars={toggleStars}
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
