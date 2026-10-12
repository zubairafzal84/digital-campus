'use client'

import { useEffect, useState, useCallback } from 'react'
import Link from 'next/link'
import { useUser } from '@clerk/nextjs'
import styles from './school-ratings.module.css'

interface Aggregates {
  count: number
  overall: number
  academics: number
  campusLife: number
  housing: number
  social: number
  career: number
}

interface SchoolRatingsProps {
  schoolSlug: string
  schoolName: string
}

function StarDisplay({ value, max = 5 }: { value: number; max?: number }) {
  return (
    <span className={styles.stars} aria-label={`${value} out of ${max} stars`}>
      {Array.from({ length: max }).map((_, i) => (
        <span
          key={i}
          className={i < Math.round(value) ? styles.starFilled : styles.starEmpty}
        >
          ★
        </span>
      ))}
    </span>
  )
}

function StarPicker({
  value,
  onChange,
  label,
}: {
  value: number
  onChange: (v: number) => void
  label: string
}) {
  return (
    <div className={styles.starPicker} role="group" aria-label={label}>
      {[1, 2, 3, 4, 5].map((n) => (
        <button
          key={n}
          type="button"
          className={styles.starPickerBtn}
          aria-label={`${n} star${n > 1 ? 's' : ''}`}
          aria-pressed={value >= n}
          onClick={() => onChange(n)}
        >
          <span className={value >= n ? styles.starFilled : styles.starEmpty}>★</span>
        </button>
      ))}
    </div>
  )
}

const CATEGORY_LABELS: { key: keyof Aggregates; label: string }[] = [
  { key: 'academics', label: 'Academics' },
  { key: 'campusLife', label: 'Campus life' },
  { key: 'housing', label: 'Housing' },
  { key: 'social', label: 'Social scene' },
  { key: 'career', label: 'Career support' },
]

const YEAR_OPTIONS = [
  { value: 1, label: '1st year' },
  { value: 2, label: '2nd year' },
  { value: 3, label: '3rd year' },
  { value: 4, label: '4th year' },
  { value: 5, label: '5th year' },
  { value: 6, label: 'Graduate' },
]

export default function SchoolRatings({ schoolSlug, schoolName }: SchoolRatingsProps) {
  const { isLoaded, isSignedIn } = useUser()

  const [aggregates, setAggregates] = useState<Aggregates | null>(null)
  const [loadingRatings, setLoadingRatings] = useState(true)

  // Form state
  const [overallRating, setOverallRating] = useState(0)
  const [academicsRating, setAcademicsRating] = useState(0)
  const [campusLifeRating, setCampusLifeRating] = useState(0)
  const [housingRating, setHousingRating] = useState(0)
  const [socialRating, setSocialRating] = useState(0)
  const [careerRating, setCareerRating] = useState(0)
  const [reviewText, setReviewText] = useState('')
  const [yearOfStudy, setYearOfStudy] = useState(0)
  const [programme, setProgramme] = useState('')
  const [submitting, setSubmitting] = useState(false)
  const [submitError, setSubmitError] = useState('')
  const [submitted, setSubmitted] = useState(false)

  const fetchRatings = useCallback(async () => {
    try {
      const res = await fetch(`/api/schools/${schoolSlug}/reviews`)
      if (res.ok) {
        const json = await res.json()
        setAggregates(json.aggregates ?? null)
      }
    } catch {
      // Ratings are non-critical; fail silently
    } finally {
      setLoadingRatings(false)
    }
  }, [schoolSlug])

  useEffect(() => {
    fetchRatings()
  }, [fetchRatings])

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (overallRating === 0) {
      setSubmitError('Please select an overall star rating before submitting.')
      return
    }
    setSubmitting(true)
    setSubmitError('')
    try {
      const res = await fetch(`/api/schools/${schoolSlug}/reviews`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          overall_rating: overallRating,
          academics_rating: academicsRating || null,
          campus_life_rating: campusLifeRating || null,
          housing_rating: housingRating || null,
          social_rating: socialRating || null,
          career_rating: careerRating || null,
          review_text: reviewText.trim() || null,
          year_of_study: yearOfStudy || null,
          programme: programme.trim() || null,
        }),
      })
      const json = await res.json()
      if (!res.ok) {
        setSubmitError(json.error ?? 'Something went wrong. Please try again.')
      } else {
        setSubmitted(true)
      }
    } catch {
      setSubmitError('Network error. Please check your connection and try again.')
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <div className={styles.ratingsWrap}>
      {/* ---- Rating summary ---- */}
      <div className={styles.ratingsSummary}>
        <h2 className={styles.sectionH}>Student ratings</h2>
        {loadingRatings ? (
          <p className={styles.noReviews}>Loading ratings&hellip;</p>
        ) : aggregates ? (
          <>
            <div className={styles.overallRow}>
              <span className={styles.bigScore}>{aggregates.overall.toFixed(1)}</span>
              <div>
                <StarDisplay value={aggregates.overall} />
                <span className={styles.reviewCount}>
                  {aggregates.count} student review{aggregates.count !== 1 ? 's' : ''}
                </span>
              </div>
            </div>
            <div className={styles.categoryRatings}>
              {CATEGORY_LABELS.map(({ key, label }) => (
                <div key={key} className={styles.categoryRow}>
                  <span className={styles.catLabel}>{label}</span>
                  <StarDisplay value={aggregates[key] as number} />
                  <span className={styles.avgScore}>
                    {(aggregates[key] as number).toFixed(1)}
                  </span>
                </div>
              ))}
            </div>
          </>
        ) : (
          <div className={styles.noReviews}>
            <p className={styles.beFirst}>
              No reviews yet — be the first to review {schoolName}.
            </p>
          </div>
        )}
      </div>

      {/* ---- Review submission form ---- */}
      {isLoaded && (
        <div className={styles.reviewForm}>
          <h2 className={styles.formH}>Write a review</h2>
          {submitted ? (
            <p className={styles.successMsg}>
              Your review has been submitted and is pending approval. Thank you for helping future students!
            </p>
          ) : isSignedIn ? (
            <form onSubmit={handleSubmit} noValidate>
              <div className={styles.formField}>
                <label className={styles.fieldLabel}>
                  Overall rating <span className={styles.req}>*</span>
                </label>
                <StarPicker
                  value={overallRating}
                  onChange={setOverallRating}
                  label="Overall rating"
                />
              </div>

              <fieldset className={styles.fieldset}>
                <legend className={styles.fieldsetLegend}>
                  Category ratings <span className={styles.optional}>(optional)</span>
                </legend>
                {[
                  { label: 'Academics', value: academicsRating, set: setAcademicsRating },
                  { label: 'Campus life', value: campusLifeRating, set: setCampusLifeRating },
                  { label: 'Housing', value: housingRating, set: setHousingRating },
                  { label: 'Social scene', value: socialRating, set: setSocialRating },
                  { label: 'Career support', value: careerRating, set: setCareerRating },
                ].map(({ label, value, set }) => (
                  <div key={label} className={styles.catFormRow}>
                    <span className={styles.catFormLabel}>{label}</span>
                    <StarPicker value={value} onChange={set} label={label} />
                  </div>
                ))}
              </fieldset>

              <div className={styles.formField}>
                <label htmlFor="review-text" className={styles.fieldLabel}>
                  Your review <span className={styles.optional}>(optional, max 1 000 characters)</span>
                </label>
                <textarea
                  id="review-text"
                  className={styles.textArea}
                  rows={5}
                  maxLength={1000}
                  placeholder={`What was your experience at ${schoolName} like?`}
                  value={reviewText}
                  onChange={(e) => setReviewText(e.target.value)}
                />
                <span className={styles.charCount}>{reviewText.length}/1000</span>
              </div>

              <div className={styles.formRow}>
                <div className={styles.formField}>
                  <label htmlFor="year-of-study" className={styles.fieldLabel}>
                    Year of study <span className={styles.optional}>(optional)</span>
                  </label>
                  <select
                    id="year-of-study"
                    className={styles.select}
                    value={yearOfStudy}
                    onChange={(e) => setYearOfStudy(Number(e.target.value))}
                  >
                    <option value={0}>Select year&hellip;</option>
                    {YEAR_OPTIONS.map((opt) => (
                      <option key={opt.value} value={opt.value}>
                        {opt.label}
                      </option>
                    ))}
                  </select>
                </div>

                <div className={styles.formField}>
                  <label htmlFor="programme" className={styles.fieldLabel}>
                    Programme <span className={styles.optional}>(optional)</span>
                  </label>
                  <input
                    id="programme"
                    type="text"
                    className={styles.input}
                    placeholder="e.g. Computer Science"
                    value={programme}
                    onChange={(e) => setProgramme(e.target.value)}
                  />
                </div>
              </div>

              {submitError && (
                <p className={styles.errorMsg} role="alert">
                  {submitError}
                </p>
              )}

              <button
                type="submit"
                className={styles.submitBtn}
                disabled={submitting}
              >
                {submitting ? 'Submitting…' : 'Submit review'}
              </button>
              <p className={styles.disclaimer}>
                Reviews are moderated before publication. Only honest, first-hand experiences help future students.
              </p>
            </form>
          ) : (
            <p className={styles.signInPrompt}>
              <Link href={`/login?redirect=/schools/${schoolSlug}`} className={styles.signInLink}>
                Sign in
              </Link>{' '}
              to leave a review and help future students.
            </p>
          )}
        </div>
      )}
    </div>
  )
}
