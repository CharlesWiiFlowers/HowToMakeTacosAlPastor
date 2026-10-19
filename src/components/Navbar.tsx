import { useId, useState } from 'react'
import type { ThemePreference } from '../hooks/useTheme'
import './Navbar.css'

const NAV_LINKS = [
  { href: '#recipe', label: 'The Recipe' },
  { href: '#ingredients', label: 'Ingredients' },
  { href: '#process', label: 'The Process' },
  { href: '#tips', label: 'Tips' },
]

const THEME_OPTIONS: { value: ThemePreference; label: string }[] = [
  { value: 'system', label: 'System' },
  { value: 'light', label: 'Light' },
  { value: 'dark', label: 'Dark' },
]

interface NavbarProps {
  theme: ThemePreference
  onThemeChange: (theme: ThemePreference) => void
  starsOn: boolean
  onToggleStars: () => void
}

function ThemeSelect(props: {
  theme: ThemePreference
  onThemeChange: (theme: ThemePreference) => void
  id: string
}) {
  return (
    <div className="nav-control">
      <label className="nav-control__label" htmlFor={props.id}>
        Theme
      </label>
      <select
        id={props.id}
        className="nav-select"
        value={props.theme}
        onChange={(event) => props.onThemeChange(event.target.value as ThemePreference)}
      >
        {THEME_OPTIONS.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </div>
  )
}

export default function Navbar({ theme, onThemeChange, starsOn, onToggleStars }: NavbarProps) {
  const [menuOpen, setMenuOpen] = useState(false)
  const menuId = useId()
  const desktopThemeId = useId()
  const mobileThemeId = useId()

  const starLabel = starsOn ? 'Hide stars' : 'Show stars'

  return (
    <header className="site-header">
      <nav className="navbar container" aria-label="Main navigation">
        <a
          className="navbar__brand"
          href="#recipe"
          onClick={() => setMenuOpen(false)}
        >
          <svg
            className="navbar__brand-mark"
            viewBox="0 0 24 24"
            aria-hidden="true"
            focusable="false"
          >
            <path
              d="M3 16.5a9 9 0 0 1 18 0Z"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.8"
              strokeLinejoin="round"
            />
            <path
              d="M6.5 13.5c1.4-1.6 2.9-1.6 4.3 0s2.9 1.6 4.3 0 2.4-1.4 2.4-1.4"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.6"
              strokeLinecap="round"
            />
            <path d="M12 3.2v2M19 6.4l-1.3 1.3M5 6.4l1.3 1.3" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
          </svg>
          <span>Al Pastor</span>
        </a>

        <ul className="navbar__links">
          {NAV_LINKS.map((link) => (
            <li key={link.href}>
              <a className="navbar__link" href={link.href}>
                {link.label}
              </a>
            </li>
          ))}
        </ul>

        <div className="navbar__controls">
          <ThemeSelect id={desktopThemeId} theme={theme} onThemeChange={onThemeChange} />
          <button
            type="button"
            className="btn btn-ghost navbar__stars"
            aria-pressed={starsOn}
            onClick={onToggleStars}
          >
            <svg viewBox="0 0 24 24" aria-hidden="true" focusable="false" width="16" height="16">
              <path
                d="m12 3 1.9 5.1L19 10l-5.1 1.9L12 17l-1.9-5.1L5 10l5.1-1.9Z"
                fill={starsOn ? 'currentColor' : 'none'}
                stroke="currentColor"
                strokeWidth="1.6"
                strokeLinejoin="round"
              />
            </svg>
            {starLabel}
          </button>
        </div>

        <button
          type="button"
          className="navbar__burger"
          aria-expanded={menuOpen}
          aria-controls={menuId}
          onClick={() => setMenuOpen((open) => !open)}
        >
          <span className="sr-only">{menuOpen ? 'Close menu' : 'Open menu'}</span>
          <svg viewBox="0 0 24 24" aria-hidden="true" focusable="false" width="22" height="22">
            {menuOpen ? (
              <path
                d="m6 6 12 12M18 6 6 18"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
              />
            ) : (
              <path
                d="M4 7h16M4 12h16M4 17h16"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
              />
            )}
          </svg>
        </button>
      </nav>

      <div id={menuId} className="navbar__mobile-panel" hidden={!menuOpen}>
        <ul className="navbar__mobile-links">
          {NAV_LINKS.map((link) => (
            <li key={link.href}>
              <a className="navbar__link" href={link.href} onClick={() => setMenuOpen(false)}>
                {link.label}
              </a>
            </li>
          ))}
        </ul>
        <div className="navbar__mobile-controls">
          <ThemeSelect id={mobileThemeId} theme={theme} onThemeChange={onThemeChange} />
          <button
            type="button"
            className="btn btn-ghost navbar__stars"
            aria-pressed={starsOn}
            onClick={onToggleStars}
          >
            <svg viewBox="0 0 24 24" aria-hidden="true" focusable="false" width="16" height="16">
              <path
                d="m12 3 1.9 5.1L19 10l-5.1 1.9L12 17l-1.9-5.1L5 10l5.1-1.9Z"
                fill={starsOn ? 'currentColor' : 'none'}
                stroke="currentColor"
                strokeWidth="1.6"
                strokeLinejoin="round"
              />
            </svg>
            {starLabel}
          </button>
        </div>
      </div>
    </header>
  )
}
