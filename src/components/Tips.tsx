import { kitchenTips } from '../data/recipe'
import './Tips.css'

export default function Tips() {
  return (
    <section id="tips" className="section tips" aria-labelledby="tips-title">
      <div className="container">
        <div className="section-head">
          <p className="eyebrow">Field notes from the kitchen</p>
          <h2 id="tips-title" className="section-title">Kitchen Tips</h2>
          <p className="section-lead">
            Five rules that separate great al pastor from merely good al pastor.
          </p>
        </div>

        <ul className="tips__grid">
          {kitchenTips.map((tip, index) => (
            <li key={tip.id} className="tip card">
              <span className="tip__index" aria-hidden="true">
                {String(index + 1).padStart(2, '0')}
              </span>
              <h3 className="tip__title">{tip.title}</h3>
              <p className="tip__description">{tip.description}</p>
            </li>
          ))}
        </ul>

        <aside className="tips__note card" aria-label="A note on tradition">
          <h3 className="tips__note-title">A note on tradition</h3>
          <p>
            Authentic al pastor is roasted on a vertical spit called a <em>trompo</em>, a
            technique brought to Mexico by Lebanese immigrants and slowly turned over open
            heat. This home skillet method approximates that same flavor profile — smoky,
            savory, sweet, and bright — but it does not reproduce the exact spit-roasted
            cooking process. It is a delicious tribute, not a replica.
          </p>
        </aside>
      </div>
    </section>
  )
}
