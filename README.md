# Tacos al Pastor — A Cosmic Place Recipe Experience

A polished, fully responsive, static recipe website that teaches you how to prepare
authentic Mexican tacos al pastor, step by step — wrapped in a cosmic-themed cooking
journal inspired by the **Cosmic Place** portfolio design language.

Built with **Vite + React + TypeScript**. No backend, no extra dependencies.

## Features

- **Cosmic visual identity** — deep space purple palette, lavender/pink accents,
  soft gradients, rounded cards, and a subtle animated starfield behind all content.
- **Theme selector** — `System`, `Light`, and `Dark` themes, persisted in
  `localStorage` (`al-pastor-theme`) and applied before first paint to avoid a flash
  of the wrong theme.
- **Starfield toggle** — show or hide the stars (persisted, labeled for its current
  state) and fully disabled animation under `prefers-reduced-motion`.
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
├── data/recipe.ts          # All recipe content (ingredients, steps, tips, metadata)
├── hooks/useTheme.ts       # Theme preference state + localStorage persistence
├── components/
│   ├── Starfield.tsx       # Decorative animated background stars
│   ├── Navbar.tsx/.css     # Sticky nav, theme selector, star toggle, mobile menu
│   ├── Hero.tsx/.css       # Intro, metadata badges, hero image with fallback
│   ├── Ingredients.tsx/.css # Persistent interactive checklist with progress
│   ├── Process.tsx/.css    # Step cards + guided cooking mode
│   ├── Tips.tsx/.css       # Kitchen rule cards + tradition note
│   └── Outro.tsx/.css      # Final call to action + footer
├── index.css               # Design tokens (light/dark), base styles, utilities
└── App.tsx                 # Page composition and starfield state
```

## Notes

- All content is in English and served as a fully static site.
- The hero image is loaded from Unsplash; if it is unavailable, a self-contained
  SVG illustration is shown instead.
