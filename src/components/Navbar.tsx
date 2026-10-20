import { useId, useState } from 'react'
import type { StarfieldMode } from '../hooks/useStarfieldMode'
import type { ThemePreference } from '../hooks/useTheme'
import './Navbar.css'

const BRAND_LOGO_URL = `${import.meta.env.BASE_URL}unu.webp`

const NAV_LINKS = [
  { href: '#recipe', label: 'The Recipe' },
  { href: '#ingredients', label: 'Ingredients' },
  { href: '#process', label: 'The Process' },
  { href: '#tips', label: 'Tips' },
]

interface NavSelectOption<T extends string> {
  value: T
  label: string
}

const THEME_OPTIONS: readonly NavSelectOption<ThemePreference>[] = [
  { value: 'system', label: 'System' },
  { value: 'light', label: 'Light' },
  { value: 'dark', label: 'Dark' },
]

const STARFIELD_OPTIONS: readonly NavSelectOption<StarfieldMode>[] = [
  { value: 'off', label: 'Off' },
  { value: 'static', label: 'Static Stars' },
  { value: 'animated', label: 'Animated Stars' },
]

const REDUCED_MOTION_NOTE =
  'Reduced motion is enabled on this device, so static stars are shown instead of animation.'

interface NavbarProps {
  theme: ThemePreference
  onThemeChange: (theme: ThemePreference) => void
  starfieldMode: StarfieldMode
  onStarfieldModeChange: (mode: StarfieldMode) => void
  /** True when the animated mode is selected but reduced motion prevents it. */
  starfieldFallbackActive: boolean
}

function NavSelect<T extends string>({
  id,
  label,
  value,
  options,
  onChange,
  description,
}: {
  id: string
  label: string
  value: T
  options: readonly NavSelectOption<T>[]
  onChange: (value: T) => void
  description?: string
}) {
  const descriptionId = `${id}-description`

  return (
    <div className="nav-control">
      <label className="nav-control__label" htmlFor={id}>
        {label}
      </label>
      <select
        id={id}
        className="nav-select"
        value={value}
        aria-describedby={description ? descriptionId : undefined}
        onChange={(event) => onChange(event.target.value as T)}
      >
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
      {description ? (
        <span id={descriptionId} className="sr-only">
          {description}
        </span>
      ) : null}
    </div>
  )
}

export default function Navbar({
  theme,
  onThemeChange,
  starfieldMode,
  onStarfieldModeChange,
  starfieldFallbackActive,
}: NavbarProps) {
  const [menuOpen, setMenuOpen] = useState(false)
  const menuId = useId()
  const desktopThemeId = useId()
  const desktopStarfieldId = useId()
  const mobileThemeId = useId()
  const mobileStarfieldId = useId()

  const starfieldDescription = starfieldFallbackActive ? REDUCED_MOTION_NOTE : undefined

  return (
    <header className="site-header">
      <nav className="navbar container" aria-label="Main navigation">
        <a
          className="navbar__brand"
          href="#recipe"
          aria-label="Cosmic Place | Tacos"
          onClick={() => setMenuOpen(false)}
        >
          <img
            className="navbar__brand-logo"
            src={BRAND_LOGO_URL}
            alt=""
            width="500"
            height="500"
          />
          <span className="navbar__brand-name">Cosmic Place</span>
          <span className="navbar__brand-divider" aria-hidden="true">
            |
          </span>
          <span className="navbar__brand-product">Tacos</span>
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
          <NavSelect
            id={desktopThemeId}
            label="Theme"
            value={theme}
            options={THEME_OPTIONS}
            onChange={onThemeChange}
          />
          <NavSelect
            id={desktopStarfieldId}
            label="Starfield mode"
            value={starfieldMode}
            options={STARFIELD_OPTIONS}
            onChange={onStarfieldModeChange}
            description={starfieldDescription}
          />
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
          <NavSelect
            id={mobileThemeId}
            label="Theme"
            value={theme}
            options={THEME_OPTIONS}
            onChange={onThemeChange}
          />
          <NavSelect
            id={mobileStarfieldId}
            label="Starfield mode"
            value={starfieldMode}
            options={STARFIELD_OPTIONS}
            onChange={onStarfieldModeChange}
            description={starfieldDescription}
          />
        </div>
      </div>
    </header>
  )
}
