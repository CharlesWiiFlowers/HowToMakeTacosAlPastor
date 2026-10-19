import { useCallback, useEffect, useMemo, useState } from 'react'
import { allIngredientIds, ingredientGroups } from '../data/recipe'
import './Ingredients.css'

const CHECKLIST_KEY = 'al-pastor-checklist'

function loadChecked(): Set<string> {
  try {
    const raw = localStorage.getItem(CHECKLIST_KEY)
    if (!raw) return new Set()
    const parsed: unknown = JSON.parse(raw)
    if (!Array.isArray(parsed)) return new Set()
    return new Set(parsed.filter((id): id is string => allIngredientIds.includes(id)))
  } catch {
    return new Set()
  }
}

export default function Ingredients() {
  const [checked, setChecked] = useState<Set<string>>(loadChecked)

  useEffect(() => {
    try {
      localStorage.setItem(CHECKLIST_KEY, JSON.stringify([...checked]))
    } catch {
      // Persistence is a nicety; the checklist still works without it.
    }
  }, [checked])

  const total = allIngredientIds.length
  const readyCount = useMemo(
    () => allIngredientIds.filter((id) => checked.has(id)).length,
    [checked],
  )
  const progressPercent = total > 0 ? Math.round((readyCount / total) * 100) : 0

  const toggle = useCallback((id: string) => {
    setChecked((previous) => {
      const next = new Set(previous)
      if (next.has(id)) {
        next.delete(id)
      } else {
        next.add(id)
      }
      return next
    })
  }, [])

  const reset = useCallback(() => setChecked(new Set()), [])

  return (
    <section id="ingredients" className="section ingredients" aria-labelledby="ingredients-title">
      <div className="container">
        <div className="section-head">
          <p className="eyebrow">Gather your mission supplies</p>
          <h2 id="ingredients-title" className="section-title">Ingredients</h2>
          <p className="section-lead">
            Everything you need for 4–6 people. Check items off as you go — your progress is
            saved in this browser.
          </p>
        </div>

        <div className="ingredients__toolbar card">
          <div className="ingredients__progress-copy">
            <p className="ingredients__count" aria-live="polite">
              <strong>{readyCount}</strong> of {total} ingredients ready
            </p>
            <div
              className="progress"
              role="progressbar"
              aria-label="Ingredient checklist progress"
              aria-valuemin={0}
              aria-valuemax={total}
              aria-valuenow={readyCount}
            >
              <div className="progress__fill" style={{ width: `${progressPercent}%` }} />
            </div>
          </div>
          <button
            type="button"
            className="btn btn-ghost ingredients__reset"
            onClick={reset}
            disabled={readyCount === 0}
          >
            Reset checklist
          </button>
        </div>

        <div className="ingredients__grid">
          {ingredientGroups.map((group) => (
            <fieldset key={group.id} className="ingredient-card card">
              <legend className="ingredient-card__legend">{group.title}</legend>
              <ul className="ingredient-card__list">
                {group.items.map((item) => {
                  const isChecked = checked.has(item.id)
                  return (
                    <li key={item.id}>
                      <label
                        className={`ingredient${isChecked ? ' ingredient--checked' : ''}`}
                        htmlFor={item.id}
                      >
                        <input
                          id={item.id}
                          className="ingredient__input"
                          type="checkbox"
                          checked={isChecked}
                          onChange={() => toggle(item.id)}
                        />
                        <span className="ingredient__box" aria-hidden="true">
                          <svg viewBox="0 0 16 16" focusable="false">
                            <path
                              d="m3.5 8.5 3 3 6-7"
                              fill="none"
                              stroke="currentColor"
                              strokeWidth="2.2"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            />
                          </svg>
                        </span>
                        <span className="ingredient__quantity">{item.quantity}</span>
                        <span className="ingredient__name">{item.name}</span>
                      </label>
                    </li>
                  )
                })}
              </ul>
            </fieldset>
          ))}
        </div>
      </div>
    </section>
  )
}
