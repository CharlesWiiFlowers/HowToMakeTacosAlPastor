import './Outro.css'

export default function Outro() {
  return (
    <>
      <section className="section outro" aria-labelledby="outro-title">
        <div className="container">
          <div className="outro__card card">
            <p className="eyebrow">Mission complete</p>
            <h2 id="outro-title" className="outro__title">
              Your kitchen. Your mission. Your tacos.
            </h2>
            <p className="outro__text">
              Warm tortillas, a squeeze of lime, and a table full of people — that is all it
              takes. When the craving hits again, the recipe is right here waiting.
            </p>
            <div className="outro__actions">
              <a className="btn btn-primary" href="#recipe">
                Back to the recipe
              </a>
              <a className="btn btn-secondary" href="#process">
                Replay the process
              </a>
            </div>
          </div>
        </div>
      </section>

      <footer className="site-footer">
        <div className="container site-footer__inner">
          <div className="site-footer__brand">
            <img
              className="site-footer__logo"
              src="/unu.webp"
              alt=""
              width="500"
              height="500"
            />
            <span>
              Cosmic Place <span aria-hidden="true">|</span> Tacos
            </span>
          </div>
          <div className="site-footer__text">
            <p>Made with love, chiles, and a little cosmic curiosity.</p>
            <p className="site-footer__credit">
              A recipe journal in the spirit of <span>Cosmic Place</span>.
            </p>
          </div>
        </div>
      </footer>
    </>
  )
}
