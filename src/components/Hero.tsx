import { useState } from 'react'
import { recipeMeta } from '../data/recipe'
import './Hero.css'

/**
 * Hero photograph of tacos al pastor. If the remote image fails to load,
 * we swap in a self-contained illustrated fallback.
 */
const HERO_IMAGE_URL =
  'https://images.unsplash.com/photo-1551504734-5ee1c4a1479b?auto=format&fit=crop&w=1200&q=80'

const HERO_IMAGE_ALT =
  'Tacos al pastor on a plate with charred marinated pork, pineapple, cilantro, diced onion, and lime wedges'

function FallbackIllustration() {
  return (
    <div className="hero-visual__fallback" role="img" aria-label={HERO_IMAGE_ALT}>
      <svg viewBox="0 0 200 150" aria-hidden="true" focusable="false">
        <defs>
          <linearGradient id="hero-shell" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0" stopColor="#f6c453" />
            <stop offset="1" stopColor="#dd9527" />
          </linearGradient>
        </defs>
        <circle cx="35" cy="28" r="2.4" fill="#a78bfa" opacity="0.8" />
        <circle cx="168" cy="20" r="1.8" fill="#f472b6" opacity="0.8" />
        <circle cx="176" cy="52" r="2.2" fill="#a78bfa" opacity="0.6" />
        <circle cx="24" cy="62" r="1.6" fill="#f3f0ff" opacity="0.6" />
        <path d="M30 100a70 70 0 0 1 140 0Z" fill="url(#hero-shell)" />
        <path
          d="M44 100c9-15 20-15 30-5s21 9 31-2 20-6 30 3 15 6 15 6"
          fill="none"
          stroke="#c0392b"
          strokeWidth="12"
          strokeLinecap="round"
        />
        <path
          d="M48 100c8-9 17-9 26-3s18 5 27-2 16-4 24 2"
          fill="none"
          stroke="#3f9b52"
          strokeWidth="8"
          strokeLinecap="round"
        />
        <rect x="86" y="80" width="26" height="16" rx="5" fill="#f6c453" />
        <rect x="22" y="100" width="156" height="16" rx="8" fill="#c026d3" />
      </svg>
      <span className="hero-visual__fallback-text">Illustrated fallback — photo unavailable</span>
    </div>
  )
}

export default function Hero() {
  const [imageFailed, setImageFailed] = useState(false)

  return (
    <section id="recipe" className="hero section" aria-labelledby="hero-title">
      <div className="container hero__grid">
        <div className="hero__content">
          <p className="eyebrow">A little taste of Mexico</p>
          <h1 id="hero-title" className="hero__title">
            Tacos al Pastor
          </h1>
          <p className="hero__subtitle">
            Sweet pineapple. Smoky chiles. Perfectly marinated pork. A little bit of magic in
            every bite.
          </p>
          <p className="hero__intro">
            Tacos al pastor are a beloved Mexican street-food classic. The technique traces back
            to Lebanese immigrants who brought spit-roasted meat to Mexico; local cooks adapted
            it with dried chiles, achiote, warming spices, and sweet pineapple — and created
            something entirely new. This recipe recreates that iconic flavor at home, using a
            hot skillet instead of a vertical spit.
          </p>

          <ul className="hero__meta" aria-label="Recipe details">
            {recipeMeta.map((badge) => (
              <li
                key={badge.id}
                className={`hero__meta-item${badge.emphasis ? ' hero__meta-item--accent' : ''}`}
              >
                <span className="hero__meta-label">{badge.label}</span>
                <span className="hero__meta-value">{badge.value}</span>
                {badge.detail ? (
                  <span className="hero__meta-detail">{badge.detail}</span>
                ) : null}
              </li>
            ))}
          </ul>

          <div className="hero__actions">
            <a className="btn btn-primary" href="#process">
              Explore the Recipe
            </a>
            <a className="btn btn-secondary" href="#ingredients">
              Jump to Ingredients
            </a>
          </div>
        </div>

        <figure className="hero-visual">
          {imageFailed ? (
            <FallbackIllustration />
          ) : (
            <img
              className="hero-visual__img"
              src={HERO_IMAGE_URL}
              alt={HERO_IMAGE_ALT}
              width="1200"
              height="900"
              decoding="async"
              onError={() => setImageFailed(true)}
            />
          )}
          <figcaption className="hero-visual__caption">
            Skillet-charred pork, caramelized pineapple, and all the fresh toppings.
          </figcaption>
        </figure>
      </div>
    </section>
  )
}
