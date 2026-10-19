import { useCallback, useEffect, useRef, useState } from 'react'
import { recipeSteps } from '../data/recipe'
import './Process.css'

function StepCard({
  step,
  index,
  active,
  headingId,
}: {
  step: (typeof recipeSteps)[number]
  index: number
  active?: boolean
  headingId?: string
}) {
  return (
    <li className={`step${active ? ' step--active' : ''}`}>
      <div className="step__marker" aria-hidden="true">
        {index + 1}
      </div>
      <div className="step__body">
        <p className="step__meta">
          <svg viewBox="0 0 16 16" aria-hidden="true" focusable="false" width="13" height="13">
            <circle cx="8" cy="8" r="6.4" fill="none" stroke="currentColor" strokeWidth="1.5" />
            <path
              d="M8 4.6V8l2.2 1.6"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
            />
          </svg>
          <span>
            Step {index + 1} · {step.time}
          </span>
        </p>
        <h3 className="step__title" id={headingId} tabIndex={active ? -1 : undefined}>
          {step.title}
        </h3>
        <p className="step__description">{step.description}</p>
        {step.note ? (
          <p className="step__note">
            <span className="step__note-label">Technique note</span>
            {step.note}
          </p>
        ) : null}
      </div>
    </li>
  )
}

export default function Process() {
  const [cooking, setCooking] = useState(false)
  const [activeIndex, setActiveIndex] = useState(0)
  const startButtonRef = useRef<HTMLButtonElement>(null)

  const total = recipeSteps.length

  // Move focus to the current step so keyboard users stay oriented.
  useEffect(() => {
    if (cooking) {
      document.getElementById('cooking-current-step')?.focus()
    }
  }, [cooking, activeIndex])

  const start = useCallback(() => {
    setActiveIndex(0)
    setCooking(true)
  }, [])

  const exit = useCallback(() => {
    setCooking(false)
    startButtonRef.current?.focus()
  }, [])

  const restart = useCallback(() => setActiveIndex(0), [])
  const previous = useCallback(
    () => setActiveIndex((index) => Math.max(0, index - 1)),
    [],
  )
  const next = useCallback(
    () => setActiveIndex((index) => Math.min(total - 1, index + 1)),
    [total],
  )

  const progressPercent = Math.round(((activeIndex + 1) / total) * 100)

  return (
    <section id="process" className="section process" aria-labelledby="process-title">
      <div className="container">
        <div className="section-head">
          <p className="eyebrow">Step by step</p>
          <h2 id="process-title" className="section-title">The Process</h2>
          <p className="section-lead">
            {recipeSteps.length} steps from dried chiles to the first bite. Prefer to be
            guided? Start cooking mode and follow one step at a time.
          </p>
        </div>

        {!cooking ? (
          <div className="process__start">
            <button type="button" className="btn btn-primary" ref={startButtonRef} onClick={start}>
              <svg viewBox="0 0 24 24" aria-hidden="true" focusable="false" width="16" height="16">
                <path d="M8 5.5v13l11-6.5Z" fill="currentColor" />
              </svg>
              Start Cooking
            </button>
            <p className="process__start-hint">
              Guides you through all {total} steps with a progress bar.
            </p>
          </div>
        ) : null}

        {cooking ? (
          <div className="cooking card" aria-label="Cooking mode">
            <div className="cooking__header">
              <p className="cooking__step-label" aria-live="polite">
                Step <strong>{activeIndex + 1}</strong> of {total}
              </p>
              <div
                className="progress cooking__progress"
                role="progressbar"
                aria-label="Cooking progress"
                aria-valuemin={1}
                aria-valuemax={total}
                aria-valuenow={activeIndex + 1}
                aria-valuetext={`Step ${activeIndex + 1} of ${total}`}
              >
                <div className="progress__fill" style={{ width: `${progressPercent}%` }} />
              </div>
            </div>

            <ol className="cooking__single">
              <StepCard
                key={recipeSteps[activeIndex].id}
                step={recipeSteps[activeIndex]}
                index={activeIndex}
                active
                headingId="cooking-current-step"
              />
            </ol>

            <div className="cooking__controls">
              <button
                type="button"
                className="btn btn-ghost"
                onClick={previous}
                disabled={activeIndex === 0}
              >
                <svg
                  viewBox="0 0 24 24"
                  aria-hidden="true"
                  focusable="false"
                  width="16"
                  height="16"
                >
                  <path
                    d="m14.5 5-7 7 7 7"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
                Previous Step
              </button>

              <button
                type="button"
                className="btn btn-primary"
                onClick={next}
                disabled={activeIndex === total - 1}
              >
                Next Step
                <svg
                  viewBox="0 0 24 24"
                  aria-hidden="true"
                  focusable="false"
                  width="16"
                  height="16"
                >
                  <path
                    d="m9.5 5 7 7-7 7"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </button>

              <div className="cooking__controls-secondary">
                <button type="button" className="btn btn-ghost" onClick={restart}>
                  Restart Cooking
                </button>
                <button type="button" className="btn btn-ghost" onClick={exit}>
                  Show all steps
                </button>
              </div>
            </div>
          </div>
        ) : null}

        <h3 className="process__list-title">{cooking ? 'All steps' : 'The full recipe'}</h3>
        <ol className="process__list">
          {recipeSteps.map((step, index) => (
            <StepCard
              key={step.id}
              step={step}
              index={index}
              active={cooking && index === activeIndex}
            />
          ))}
        </ol>
      </div>
    </section>
  )
}
