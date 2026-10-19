interface Star {
  id: number
  x: number
  y: number
  size: number
  duration: number
  delay: number
}

/** Small deterministic PRNG so the sky looks the same on every render. */
function mulberry32(seed: number): () => number {
  let a = seed
  return () => {
    a |= 0
    a = (a + 0x6d2b79f5) | 0
    let t = Math.imul(a ^ (a >>> 15), 1 | a)
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296
  }
}

const STAR_COUNT = 90

const STARS: Star[] = (() => {
  const random = mulberry32(20261018)
  return Array.from({ length: STAR_COUNT }, (_, id) => ({
    id,
    x: random() * 100,
    y: random() * 100,
    size: random() < 0.82 ? 2 : 3,
    duration: 2.6 + random() * 3.4,
    delay: random() * -6,
  }))
})()

/**
 * Decorative animated starfield rendered behind all content.
 * `aria-hidden` and `pointer-events: none` keep it out of the way of
 * assistive technology and interaction.
 */
export default function Starfield() {
  return (
    <div className="starfield" aria-hidden="true">
      {STARS.map((star) => (
        <span
          key={star.id}
          className="star"
          style={{
            left: `${star.x}%`,
            top: `${star.y}%`,
            width: star.size,
            height: star.size,
            animationDuration: `${star.duration}s`,
            animationDelay: `${star.delay}s`,
          }}
        />
      ))}
    </div>
  )
}
