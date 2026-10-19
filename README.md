# Cosmic Place | Tacos — Tacos al Pastor Recipe Experience

> [!NOTE]
> I built this entire project with AI just for fun lol. I should be working on my university assignments, but here I am doing this instead. 💀

A polished, fully responsive, static recipe website that teaches you how to prepare
authentic Mexican tacos al pastor, step by step — wrapped in a cosmic-themed cooking
journal inspired by the **Cosmic Place** portfolio design language.

Built with **Vite + React + TypeScript**. No backend, no authentication, no API.

## Features

- **Cosmic visual identity** — deep space purple palette, lavender/pink accents,
  soft gradients, rounded cards, and the **Cosmic Place | Tacos** brand lockup
  (logo from `public/unu.webp`) in the navbar and footer.
- **Theme selector** — `System`, `Light`, and `Dark` themes, persisted in
  `localStorage` (`al-pastor-theme`) and applied before first paint to avoid a flash
  of the wrong theme.
- **Starfield mode** — three selectable background modes, persisted in
  `localStorage` (`al-pastor-stars`):
  - `Off` — no background stars.
  - `Static Stars` — the lightweight CSS starfield.
  - `Animated Stars` — tsParticles field with connecting lines, hover repulsion
    and a click burst (see below).
- **Hero section** — recipe introduction, metadata badges (active prep vs. hands-off
  marinating time clearly distinguished), and a remote hero photo with a graceful
  illustrated fallback if it fails to load.
- **Interactive ingredient checklist** — every ingredient is a checkbox, progress is
  calculated live (`X of 23 ingredients ready`), state persists in `localStorage`,
  and a reset button starts you over.
- **Step-by-step cooking guide** — 9 numbered step cards with timings and technique
  notes, including food-safety guidance (63 °C / 145 °F + 3-minute rest).
- **Cooking mode** — a guided view with `Previous Step` / `Next Step` /
  `Restart Cooking`, a live progress bar, and keyboard focus management.
- **Kitchen tips** — five practical rules plus a note on trompo tradition vs. home
  skillet preparation.
- **Responsive & accessible** — semantic HTML, logical heading hierarchy, visible
  focus states, accessible names, reduced-motion support, and genuine mobile
  layouts (no horizontal scrolling).

## Animated starfield

`Animated Stars` renders a transparent, fixed, full-viewport particle canvas behind
all content (`z-index: -1`, `pointer-events: none`), so it never covers the page
gradients or blocks the navbar, checklist, or cooking controls.

The configuration keeps the character of the original Cosmic Place particles —
white circular particles, fine connecting lines, ~80 particles, hover repulsion and
a small click burst — with a few adaptations:

- the canvas background is left transparent so the site's own gradients show through;
- particle colours follow the theme (white on dark, violet on light);
- interactivity listens on the document (tsParticles' default `detectsOn: 'window'`),
  which is what allows hover/click effects anywhere on the page without stealing
  pointer events from the UI;
- `fpsLimit` is 60 and the particle speed is tempered for a calmer background.

The tsParticles engine is initialised lazily — only when the animated mode is first
selected — and the container is destroyed when the mode changes or the component
unmounts.

## Getting started

```bash
npm install     # only needed on a fresh clone
npm run dev     # start the Vite dev server
```

Other scripts:

```bash
npm run build   # type-check and build for production
npm run preview # preview the production build
npm run lint    # run ESLint
```

## Project structure

```
src/
├── data/recipe.ts                 # All recipe content (ingredients, steps, tips, metadata)
├── hooks/
│   ├── useTheme.ts                # Theme preference state + localStorage persistence
│   ├── useStarfieldMode.ts        # Starfield mode state + persistence + legacy migration
│   └── usePrefersReducedMotion.ts # Live reduced-motion preference
├── components/
│   ├── Starfield.tsx              # Lightweight CSS starfield (static mode)
│   ├── ParticleField.tsx/.css     # Animated tsParticles background (animated mode)
│   ├── Navbar.tsx/.css            # Brand lockup, theme + starfield selects, mobile menu
│   ├── Hero.tsx/.css              # Intro, metadata badges, hero image with fallback
│   ├── Ingredients.tsx/.css       # Persistent interactive checklist with progress
│   ├── Process.tsx/.css           # Step cards + guided cooking mode
│   ├── Tips.tsx/.css              # Kitchen rule cards + tradition note
│   └── Outro.tsx/.css             # Final call to action + footer
├── index.css                      # Design tokens (light/dark), base styles, utilities
└── App.tsx                        # Page composition, starfield mode wiring
```

## Notes

- All content is in English and served as a fully static site.
- The hero image is loaded from Unsplash; if it is unavailable, a self-contained
  SVG illustration is shown instead.
- `public/unu.webp` holds the brand logo (a 500×500 image; the file extension does
  not match its actual PNG encoding, which browsers handle by inspecting the image
  data rather than the declared type).
- Starfield preferences saved by earlier versions (`"on"`/`"off"`) are migrated
  automatically: `"on"` becomes `Static Stars`, `"off"` becomes `Off`.
