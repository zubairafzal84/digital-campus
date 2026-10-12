'use client'

import { useState, useEffect, useCallback } from 'react'
import Link from 'next/link'
import { useParams } from 'next/navigation'
import { useUser } from '@clerk/nextjs'
import { SiteNav } from '@/components/layout/SiteNav'
import { SiteFooter } from '@/components/layout/SiteFooter'
import styles from './professor-profile.module.css'

// ── Types ─────────────────────────────────────────────────

interface Professor {
  id: string
  name: string
  school: string
  department: string
  course_codes: string[]
  ratings_count: number
  avg_overall_rating: number | null
  avg_clarity_rating: number | null
  avg_helpfulness_rating: number | null
  avg_difficulty_rating: number | null
  would_take_again_pct: number | null
}

interface Review {
  id: string
  course_code: string | null
  grade_received: string | null
  overall_rating: number
  clarity_rating: number | null
  helpfulness_rating: number | null
  difficulty_rating: number | null
  would_take_again: boolean | null
  review_text: string | null
  created_at: string
}

// ── Helpers ───────────────────────────────────────────────

function barColor(score: number | null): string {
  if (score == null) return styles.barRed
  if (score >= 4) return styles.barGreen
  if (score >= 3) return styles.barYellow
  return styles.barRed
}

function barWidth(score: number | null): string {
  if (score == null) return '0%'
  return `${(score / 5) * 100}%`
}

function timeAgo(dateStr: string): string {
  const diff = Date.now() - new Date(dateStr).getTime()
  const days = Math.floor(diff / 86_400_000)
  if (days === 0) return 'Today'
  if (days === 1) return 'Yesterday'
  if (days < 30) return `${days} days ago`
  const months = Math.floor(days / 30)
  if (months < 12) return `${months} month${months !== 1 ? 's' : ''} ago`
  const years = Math.floor(months / 12)
  return `${years} year${years !== 1 ? 's' : ''} ago`
}

// ── Star picker ───────────────────────────────────────────

function StarPicker({
  value,
  onChange,
  label,
}: {
  value: number
  onChange: (v: number) => void
  label: string
}) {
  const [hover, setHover] = useState(0)
  return (
    <div>
      <div className={styles.formLabel}>{label}</div>
      <div className={styles.starRow} role="group" aria-label={label}>
        {[1, 2, 3, 4, 5].map((n) => (
          <button
            key={n}
            type="button"
            className={`${styles.starBtn} ${(hover || value) >= n ? styles.starActive : ''}`}
            onClick={() => onChange(n)}
            onMouseEnter={() => setHover(n)}
            onMouseLeave={() => setHover(0)}
            aria-label={`${n} star${n !== 1 ? 's' : ''}`}
          >
            ★
          </button>
        ))}
        {value > 0 && (
          <span style={{ fontSize: 12, color: 'var(--muted)', marginLeft: 6 }}>
            {value}/5
          </span>
        )}
      </div>
    </div>
  )
}

// ── Mini stars (read-only) ────────────────────────────────

function MiniStars({ value }: { value: number | null }) {
  if (value == null) return null
  return (
    <span className={styles.miniStars}>
      {[1, 2, 3, 4, 5].map((n) => (
        <span key={n} style={{ color: n <= value ? '#f59e0b' : 'var(--border)' }}>★</span>
      ))}
    </span>
  )
}

// ── Breakdown row ─────────────────────────────────────────

function BreakdownRow({ label, score }: { label: string; score: number | null }) {
  const color = barColor(score)
  const width = barWidth(score)
  return (
    <div className={styles.breakdownRow}>
      <span className={styles.breakdownLabel}>{label}</span>
      <div className={styles.barWrap}>
        <div className={`${styles.bar} ${color}`} style={{ width }} />
      </div>
      <span className={styles.breakdownScore}>
        {score != null ? score.toFixed(1) : '—'}
      </span>
    </div>
  )
}

// ── Rating form ───────────────────────────────────────────

const GRADE_OPTIONS = [
  'A+', 'A', 'A-',
  'B+', 'B', 'B-',
  'C+', 'C', 'C-',
  'D', 'F', 'Drop', 'Audit',
]

interface RatingFormProps {
  professorId: string
  professorName: string
  onSubmitted: () => void
}

function RatingForm({ professorId, professorName, onSubmitted }: RatingFormProps) {
  const [courseCode, setCourseCode] = useState('')
  const [gradeReceived, setGradeReceived] = useState('')
  const [overallRating, setOverallRating] = useState(0)
  const [clarityRating, setClarityRating] = useState(0)
  const [helpfulnessRating, setHelpfulnessRating] = useState(0)
  const [difficultyRating, setDifficultyRating] = useState(0)
  const [wouldTakeAgain, setWouldTakeAgain] = useState<boolean | null>(null)
  const [reviewText, setReviewText] = useState('')
  const [submitting, setSubmitting] = useState(false)
  const [msg, setMsg] = useState<{ type: 'success' | 'error'; text: string } | null>(null)

  const charLen = reviewText.length

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (overallRating === 0 || clarityRating === 0 || helpfulnessRating === 0 || difficultyRating === 0) {
      setMsg({ type: 'error', text: 'Please set ratings for Overall, Clarity, Helpfulness, and Difficulty.' })
      return
    }
    if (wouldTakeAgain === null) {
      setMsg({ type: 'error', text: 'Please answer "Would you take this professor again?"' })
      return
    }
    setSubmitting(true)
    setMsg(null)
    try {
      const res = await fetch(`/api/professors/${professorId}/ratings`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          course_code: courseCode || undefined,
          grade_received: gradeReceived || undefined,
          overall_rating: overallRating,
          clarity_rating: clarityRating,
          helpfulness_rating: helpfulnessRating,
          difficulty_rating: difficultyRating,
          would_take_again: wouldTakeAgain,
          review_text: reviewText || undefined,
        }),
      })
      const json = await res.json()
      if (!res.ok) {
        setMsg({ type: 'error', text: json.error ?? 'Something went wrong.' })
      } else {
        setMsg({ type: 'success', text: `Your rating for ${professorName} has been submitted!` })
        setCourseCode(''); setGradeReceived(''); setOverallRating(0); setClarityRating(0)
        setHelpfulnessRating(0); setDifficultyRating(0); setWouldTakeAgain(null); setReviewText('')
        onSubmitted()
      }
    } catch {
      setMsg({ type: 'error', text: 'Network error. Please try again.' })
    } finally {
      setSubmitting(false)
    }
  }

  const canSubmit = overallRating > 0 && clarityRating > 0 && helpfulnessRating > 0 && difficultyRating > 0 && wouldTakeAgain !== null

  return (
    <form className={styles.formCard} onSubmit={handleSubmit} noValidate>
      <p className={styles.formTitle}>Rate {professorName}</p>

      {msg && (
        <div className={`${styles.formMsg} ${msg.type === 'success' ? styles.formMsgSuccess : styles.formMsgError}`}>
          {msg.text}
        </div>
      )}

      <div className={styles.formField}>
        <label className={styles.formLabel} htmlFor="prof-course">Course code (optional)</label>
        <input
          id="prof-course"
          className={styles.formInput}
          value={courseCode}
          onChange={(e) => setCourseCode(e.target.value.toUpperCase())}
          placeholder="e.g. CPSC 110"
          maxLength={20}
        />
      </div>

      <div className={styles.formField}>
        <label className={styles.formLabel} htmlFor="prof-grade">Grade received (optional)</label>
        <select
          id="prof-grade"
          className={styles.formSelect}
          value={gradeReceived}
          onChange={(e) => setGradeReceived(e.target.value)}
        >
          <option value="">Select grade…</option>
          {GRADE_OPTIONS.map((g) => <option key={g} value={g}>{g}</option>)}
        </select>
      </div>

      <div className={styles.formField}>
        <StarPicker label="Overall *" value={overallRating} onChange={setOverallRating} />
      </div>

      <div className={styles.formField}>
        <StarPicker label="Clarity *" value={clarityRating} onChange={setClarityRating} />
      </div>

      <div className={styles.formField}>
        <StarPicker label="Helpfulness *" value={helpfulnessRating} onChange={setHelpfulnessRating} />
      </div>

      <div className={styles.formField}>
        <StarPicker label="Difficulty *" value={difficultyRating} onChange={setDifficultyRating} />
      </div>

      <div className={styles.formField}>
        <div className={styles.formLabel}>Would you take this professor again? *</div>
        <div className={styles.yesnoToggle}>
          <button
            type="button"
            className={`${styles.yesnoBtn} ${styles.yesnoBtnYes} ${wouldTakeAgain === true ? styles.yesnoBtnActive : ''}`}
            onClick={() => setWouldTakeAgain(wouldTakeAgain === true ? null : true)}
          >
            Yes
          </button>
          <button
            type="button"
            className={`${styles.yesnoBtn} ${styles.yesnoBtnNo} ${wouldTakeAgain === false ? styles.yesnoBtnActive : ''}`}
            onClick={() => setWouldTakeAgain(wouldTakeAgain === false ? null : false)}
          >
            No
          </button>
        </div>
      </div>

      <div className={styles.formField}>
        <label className={styles.formLabel} htmlFor="prof-review">Written review (optional)</label>
        <textarea
          id="prof-review"
          className={styles.textarea}
          value={reviewText}
          onChange={(e) => setReviewText(e.target.value.slice(0, 500))}
          placeholder="Share your experience with this professor…"
          rows={4}
        />
        <div className={`${styles.charCount} ${charLen > 490 ? styles.charOver : ''}`}>
          {charLen}/500
        </div>
      </div>

      <button
        type="submit"
        className={styles.submitBtn}
        disabled={submitting || !canSubmit}
      >
        {submitting ? 'Submitting…' : 'Submit Rating'}
      </button>
    </form>
  )
}

// ── Main page ─────────────────────────────────────────────

export default function ProfessorProfilePage() {
  const { id } = useParams<{ id: string }>()
  const { isSignedIn } = useUser()

  const [professor, setProfessor] = useState<Professor | null>(null)
  const [reviews, setReviews] = useState<Review[]>([])
  const [loading, setLoading] = useState(true)
  const [notFound, setNotFound] = useState(false)

  const loadData = useCallback(async () => {
    try {
      const res = await fetch(`/api/professors/${id}`)
      if (res.status === 404) { setNotFound(true); return }
      if (!res.ok) throw new Error('fetch failed')
      const json = await res.json()
      setProfessor(json.professor)
      setReviews(json.reviews ?? [])
    } catch {
      setNotFound(true)
    } finally {
      setLoading(false)
    }
  }, [id])

  useEffect(() => {
    if (id) loadData()
  }, [id, loadData])

  // ── Loading ──────────────────────────────────────────
  if (loading) {
    return (
      <>
        <SiteNav />
        <main className={styles.page}>
          <div className={styles.loadingWrap}>
            <p className={styles.loadingText}>Loading professor profile…</p>
          </div>
        </main>
        <SiteFooter />
      </>
    )
  }

  // ── Not found ─────────────────────────────────────────
  if (notFound || !professor) {
    return (
      <>
        <SiteNav />
        <main className={styles.page}>
          <div className={styles.errorWrap}>
            <h1>Professor not found</h1>
            <p>This professor may not exist or is pending admin review.</p>
            <Link href="/professors" className={styles.backLink}>← Back to professors</Link>
          </div>
        </main>
        <SiteFooter />
      </>
    )
  }

  const hasRatings = (professor.ratings_count ?? 0) > 0

  return (
    <>
      <SiteNav />
      <main className={styles.page}>

        {/* ── Profile header ───────────────────────────── */}
        <section className={styles.profileHeader}>
          <div className={styles.inner}>
            <nav className={styles.breadcrumb} aria-label="Breadcrumb">
              <Link href="/">Home</Link>
              <span>›</span>
              <Link href="/professors">Professors</Link>
              <span>›</span>
              <span aria-current="page">{professor.name}</span>
            </nav>

            <h1 className={styles.name}>{professor.name}</h1>
            <div className={styles.meta}>
              <span className={styles.metaItem}>🏫 {professor.school}</span>
              <span className={styles.metaItem}>📚 {professor.department}</span>
              {professor.ratings_count > 0 && (
                <span className={styles.metaItem}>
                  ⭐ {professor.ratings_count} rating{professor.ratings_count !== 1 ? 's' : ''}
                </span>
              )}
            </div>
          </div>
        </section>

        {/* ── Rating hero ──────────────────────────────── */}
        {hasRatings && (
          <section className={styles.ratingHero}>
            <div className={styles.ratingHeroInner}>
              {/* Big overall score */}
              <div className={styles.bigScoreWrap}>
                <span className={styles.bigScore}>
                  {professor.avg_overall_rating?.toFixed(1) ?? '—'}
                </span>
                <span className={styles.bigScoreLabel}>/ 5.0</span>
              </div>

              {/* Would take again + difficulty */}
              <div className={styles.ratingStats}>
                {professor.would_take_again_pct != null && (
                  <div className={styles.statPill}>
                    <span className={`${styles.statValue} ${styles.wouldTake}`}>
                      {professor.would_take_again_pct}%
                    </span>
                    <span className={styles.statLabel}>Would take again</span>
                  </div>
                )}
                {professor.avg_difficulty_rating != null && (
                  <div className={styles.statPill}>
                    <span className={styles.statValue}>
                      {professor.avg_difficulty_rating.toFixed(1)}/5
                    </span>
                    <span className={styles.statLabel}>Avg difficulty</span>
                  </div>
                )}
              </div>

              {/* Category breakdown */}
              <div className={styles.breakdown}>
                <p className={styles.breakdownTitle}>Category breakdown</p>
                <BreakdownRow label="Overall" score={professor.avg_overall_rating} />
                <BreakdownRow label="Clarity" score={professor.avg_clarity_rating} />
                <BreakdownRow label="Helpfulness" score={professor.avg_helpfulness_rating} />
                <BreakdownRow label="Difficulty" score={professor.avg_difficulty_rating} />
              </div>
            </div>
          </section>
        )}

        {/* ── Course codes ─────────────────────────────── */}
        {professor.course_codes && professor.course_codes.length > 0 && (
          <section className={styles.courses}>
            <div className={styles.coursesInner}>
              <p className={styles.sectionLabel}>Courses taught</p>
              <div className={styles.courseTags}>
                {professor.course_codes.map((code) => (
                  <span key={code} className={styles.courseTag}>{code}</span>
                ))}
              </div>
            </div>
          </section>
        )}

        {/* ── Main content: reviews + rating form ─────── */}
        <div className={styles.mainContent}>
          {/* Reviews */}
          <section className={styles.reviewsSection}>
            <h2>{reviews.length > 0 ? `${reviews.length} Student Review${reviews.length !== 1 ? 's' : ''}` : 'Reviews'}</h2>

            {reviews.length === 0 ? (
              <div className={styles.emptyReviews}>
                <p className={styles.emptyReviewsText}>
                  Be the first to rate {professor.name}.
                </p>
              </div>
            ) : (
              <div className={styles.reviewsList}>
                {reviews.map((review) => (
                  <article key={review.id} className={styles.reviewCard}>
                    <div className={styles.reviewMeta}>
                      {review.course_code && (
                        <span className={styles.reviewMetaItem}>
                          Course: <span>{review.course_code}</span>
                        </span>
                      )}
                      {review.grade_received && (
                        <span className={styles.reviewMetaItem}>
                          Grade: <span>{review.grade_received}</span>
                        </span>
                      )}
                      {review.would_take_again != null && (
                        <span
                          className={`${styles.wouldTakeTag} ${
                            review.would_take_again ? styles.wouldTakeYes : styles.wouldTakeNo
                          }`}
                        >
                          {review.would_take_again ? 'Would take again' : 'Would not take again'}
                        </span>
                      )}
                    </div>

                    <div className={styles.reviewStars}>
                      {review.overall_rating > 0 && (
                        <span className={styles.reviewStarGroup}>
                          <span>Overall</span>
                          <MiniStars value={review.overall_rating} />
                          <span>{review.overall_rating}/5</span>
                        </span>
                      )}
                      {review.clarity_rating != null && review.clarity_rating > 0 && (
                        <span className={styles.reviewStarGroup}>
                          <span>Clarity</span>
                          <MiniStars value={review.clarity_rating} />
                        </span>
                      )}
                      {review.helpfulness_rating != null && review.helpfulness_rating > 0 && (
                        <span className={styles.reviewStarGroup}>
                          <span>Helpfulness</span>
                          <MiniStars value={review.helpfulness_rating} />
                        </span>
                      )}
                      {review.difficulty_rating != null && review.difficulty_rating > 0 && (
                        <span className={styles.reviewStarGroup}>
                          <span>Difficulty</span>
                          <MiniStars value={review.difficulty_rating} />
                        </span>
                      )}
                    </div>

                    {review.review_text && (
                      <p className={styles.reviewText}>{review.review_text}</p>
                    )}

                    <p className={styles.reviewAge}>{timeAgo(review.created_at)}</p>
                  </article>
                ))}
              </div>
            )}
          </section>

          {/* Rating form or sign-in CTA */}
          <aside className={styles.ratingForm}>
            {isSignedIn ? (
              <RatingForm
                professorId={professor.id}
                professorName={professor.name}
                onSubmitted={loadData}
              />
            ) : (
              <div className={styles.signInCta}>
                <p>
                  Sign in to rate {professor.name} and help other students make better course decisions.
                </p>
                <Link href="/login" className={styles.signInLink}>
                  Sign in to rate →
                </Link>
              </div>
            )}
          </aside>
        </div>
      </main>
      <SiteFooter />
    </>
  )
}
