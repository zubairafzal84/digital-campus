'use client'

import { useState, useEffect } from 'react'
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
  avg_overall: number | null
  avg_clarity: number | null
  avg_helpfulness: number | null
  avg_difficulty: number | null
  would_take_again_pct: number | null
}

interface Review {
  id: string
  course_code: string | null
  grade: string | null
  overall: number
  clarity: number | null
  helpfulness: number | null
  difficulty: number | null
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

const GRADE_OPTIONS = ['A+', 'A', 'A-', 'B+', 'B', 'B-', 'C+', 'C', 'C-', 'D', 'F', 'W', 'Pass', 'Fail', 'Audit', 'N/A']

interface RatingFormProps {
  professorId: string
  professorName: string
  onSubmitted: () => void
}

function RatingForm({ professorId, professorName, onSubmitted }: RatingFormProps) {
  const [courseCode, setCourseCode] = useState('')
  const [grade, setGrade] = useState('')
  const [overall, setOverall] = useState(0)
  const [clarity, setClarity] = useState(0)
  const [helpfulness, setHelpfulness] = useState(0)
  const [difficulty, setDifficulty] = useState(0)
  const [wouldTakeAgain, setWouldTakeAgain] = useState<boolean | null>(null)
  const [reviewText, setReviewText] = useState('')
  const [submitting, setSubmitting] = useState(false)
  const [msg, setMsg] = useState<{ type: 'success' | 'error'; text: string } | null>(null)

  const charLeft = 500 - reviewText.length

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (overall === 0) {
      setMsg({ type: 'error', text: 'Please set an Overall rating.' })
      return
    }
    setSubmitting(true)
    setMsg(null)
    try {
      const res = await fetch(`/api/professors/${professorId}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          course_code: courseCode,
          grade,
          overall,
          clarity: clarity || undefined,
          helpfulness: helpfulness || undefined,
          difficulty: difficulty || undefined,
          would_take_again: wouldTakeAgain,
          review_text: reviewText,
        }),
      })
      const json = await res.json()
      if (!res.ok) {
        setMsg({ type: 'error', text: json.error ?? 'Something went wrong.' })
      } else {
        setMsg({ type: 'success', text: `Your rating for ${professorName} has been submitted!` })
        // Reset
        setCourseCode(''); setGrade(''); setOverall(0); setClarity(0)
        setHelpfulness(0); setDifficulty(0); setWouldTakeAgain(null); setReviewText('')
        onSubmitted()
      }
    } catch {
      setMsg({ type: 'error', text: 'Network error. Please try again.' })
    } finally {
      setSubmitting(false)
    }
  }

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
          value={grade}
          onChange={(e) => setGrade(e.target.value)}
        >
          <option value="">Select grade…</option>
          {GRADE_OPTIONS.map((g) => <option key={g} value={g}>{g}</option>)}
        </select>
      </div>

      <div className={styles.formField}>
        <StarPicker label="Overall *" value={overall} onChange={setOverall} />
      </div>

      <div className={styles.formField}>
        <StarPicker label="Clarity" value={clarity} onChange={setClarity} />
      </div>

      <div className={styles.formField}>
        <StarPicker label="Helpfulness" value={helpfulness} onChange={setHelpfulness} />
      </div>

      <div className={styles.formField}>
        <StarPicker label="Difficulty" value={difficulty} onChange={setDifficulty} />
      </div>

      <div className={styles.formField}>
        <div className={styles.formLabel}>Would you take this professor again?</div>
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
        <div className={`${styles.charCount} ${charLeft < 0 ? styles.charOver : ''}`}>
          {reviewText.length}/500
        </div>
      </div>

      <button
        type="submit"
        className={styles.submitBtn}
        disabled={submitting || overall === 0}
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

  async function loadData() {
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
  }

  useEffect(() => {
    if (id) loadData()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id])

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
            <p>This professor may have been removed or the link is incorrect.</p>
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
                  {professor.avg_overall?.toFixed(1) ?? '—'}
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
                {professor.avg_difficulty != null && (
                  <div className={styles.statPill}>
                    <span className={styles.statValue}>
                      {professor.avg_difficulty.toFixed(1)}/5
                    </span>
                    <span className={styles.statLabel}>Difficulty</span>
                  </div>
                )}
              </div>

              {/* Category breakdown */}
              <div className={styles.breakdown}>
                <p className={styles.breakdownTitle}>Category breakdown</p>
                <BreakdownRow label="Overall" score={professor.avg_overall} />
                <BreakdownRow label="Clarity" score={professor.avg_clarity} />
                <BreakdownRow label="Helpfulness" score={professor.avg_helpfulness} />
                <BreakdownRow label="Difficulty" score={professor.avg_difficulty} />
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
            <h2>{reviews.length > 0 ? 'Student Reviews' : 'Reviews'}</h2>

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
                      {review.grade && (
                        <span className={styles.reviewMetaItem}>
                          Grade: <span>{review.grade}</span>
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
                      {review.overall > 0 && (
                        <span className={styles.reviewStarGroup}>
                          <span>Overall</span>
                          <MiniStars value={review.overall} />
                          <span>{review.overall}/5</span>
                        </span>
                      )}
                      {review.clarity != null && review.clarity > 0 && (
                        <span className={styles.reviewStarGroup}>
                          <span>Clarity</span>
                          <MiniStars value={review.clarity} />
                        </span>
                      )}
                      {review.helpfulness != null && review.helpfulness > 0 && (
                        <span className={styles.reviewStarGroup}>
                          <span>Helpfulness</span>
                          <MiniStars value={review.helpfulness} />
                        </span>
                      )}
                      {review.difficulty != null && review.difficulty > 0 && (
                        <span className={styles.reviewStarGroup}>
                          <span>Difficulty</span>
                          <MiniStars value={review.difficulty} />
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
          <section className={styles.ratingForm}>
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
          </section>
        </div>
      </main>
      <SiteFooter />
    </>
  )
}
