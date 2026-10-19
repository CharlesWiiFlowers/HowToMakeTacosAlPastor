import { useCallback, useEffect, useState } from 'react'

export type StarfieldMode = 'off' | 'static' | 'animated'

export const STARFIELD_STORAGE_KEY = 'al-pastor-stars'

const DEFAULT_MODE: StarfieldMode = 'static'

/**
 * Reads the saved starfield mode.
 *
 * Earlier versions stored a boolean ("on" / "off"); those values are migrated
 * to the new modes ("static" / "off") so existing visitors keep their setting.
 * Anything unrecognised falls back to the default mode.
 */
function readStoredMode(): StarfieldMode {
  try {
    const stored = localStorage.getItem(STARFIELD_STORAGE_KEY)

    if (stored === 'off') return 'off'
    if (stored === 'on') return 'static'
    if (stored === 'static' || stored === 'animated') return stored
  } catch {
    // Storage unavailable (private mode, blocked cookies, ...).
  }

  return DEFAULT_MODE
}

export function useStarfieldMode() {
  const [mode, setModeState] = useState<StarfieldMode>(readStoredMode)

  useEffect(() => {
    document.documentElement.dataset.stars = mode
  }, [mode])

  const setMode = useCallback((next: StarfieldMode) => {
    setModeState(next)
    try {
      localStorage.setItem(STARFIELD_STORAGE_KEY, next)
    } catch {
      // The mode still applies for this session when storage is unavailable.
    }
  }, [])

  return { mode, setMode }
}
