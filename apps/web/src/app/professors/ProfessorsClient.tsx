'use client'

import { useState, useEffect, useCallback, useRef } from 'react'
import Link from 'next/link'
import { useUser } from '@clerk/nextjs'
import styles from './professors.module.css'

export const SCHOOL_OPTIONS = [
  { value: 'University of British Columbia', label: 'UBC — University of British Columbia' },
  { value: 'Simon Fraser University', label: 'SFU — Simon Fraser University' },
  { value: 'University of Toronto', label: 'U of T — University of Toronto' },
  { value: 'McGill University', label: 'McGill University' },
  { value: 'University of Waterloo', label: 'University of Waterloo' },
  { value: "Queen's University", label: "Queen's University" },
  { value: 'University of Alberta', label: 'University of Alberta' },
  { value: 'University of Victoria', label: 'University of Victoria (UVic)' },
  { value: 'Dalhousie University', label: 'Dalhousie University' },
  { value: 'BCIT', label: 'BCIT — British Columbia Institute of Technology' },
  { value: 'Seneca Polytechnic', label: 'Seneca Polytechnic' },
  { value: 'Humber College', label: 'Humber College' },
  { value: 'York University', label: 'York University' },
  { value: 'Concordia University', label: 'Concordia University' },
  { value: 'University of Calgary', label: 'University of Calgary' },
  { value: 'Carleton University', label: 'Carleton University' },
  { value: 'University of Ottawa', label: 'University of Ottawa' },
  { value: 'McMaster University', label: 'McMaster University' },
  { value: 'University of Manitoba', label: 'University of Manitoba' },
  { value: 'University of Saskatchewan', label: 'University of Saskatchewan' },
]

const DEPARTMENTS_BY_SCHOOL: Record<string, string[]> = {
  'University of British Columbia': [
    'Arts', 'Science', 'Commerce', 'Education', 'Engineering', 'Forestry', 'Law', 'Medicine', 'Nursing', 'Pharmacy',
  ],
  'Simon Fraser University': [
    'Arts & Social Sciences', 'Business', 'Communication', 'Computing Science', 'Education', 'Engineering Science', 'Environment', 'Health Sciences',
  ],
  'University of Toronto': [
    'Arts & Science', 'Dentistry', 'Education', 'Engineering', 'Information', 'Kinesiology', 'Law', 'Management', 'Medicine', 'Music', 'Nursing', 'Pharmacy', 'Social Work',
  ],
  'McGill University': [
    'Arts', 'Dentistry', 'Education', 'Engineering', 'Law', 'Management', 'Medicine', 'Music', 'Science',
  ],
  'University of Waterloo': [
    'Applied Health Sciences', 'Arts', 'Engineering', 'Environment', 'Mathematics', 'Science',
  ],
}

const DEFAULT_DEPTS = [
  'Arts', 'Business', 'Engineering', 'Health Sciences', 'Humanities',
  'Law', 'Mathematics', 'Science', 'Social Sciences', 'Other',
]

interface Professor {
  id: string
  name: string
  school: string
  department: string
  course_codes?: string[]
  ratings_count: number
  avg_overall: number | null
}

function StarDisplay({ rating }: { rating: number }) {
  return (
    <span className={styles.stars} aria-label={`${rating.toFixed(1)} out of 5 stars`}>
      {[1, 2, 3, 4, 5].map((n) => (
        <span
          key={n}
          className={
            rating >= n
              ? styles.starFilled
              : rating >= n - 0.5
              ? styles.starHalf
              : styles.starEmpty
          }
        >
          ★
        </span>
      ))}
    </span>
  )
}

interface AddProfessorModalProps {
  onClose: () => void
  onAdded: (prof: Professor) => void
}

function AddProfessorModal({ onClose, onAdded }: AddProfessorModalProps) {
  const { isSignedIn } = useUser()
  const [name, setName] = useState('')
  const [school, setSchool] = useState('')
  const [department, setDepartment] = useState('')
  const [courseCodes, setCourseCodes] = useState('')
  const [submitting, setSubmitting] = useState(false)
  const [success, setSuccess] = useState(false)
  const [error, setError] = useState('')

  const depts = DEPARTMENTS_BY_SCHOOL[school] ?? DEFAULT_DEPTS

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setSubmitting(true)
    setError('')
    try {
      const res = await fetch('/api/professors', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, school, department, course_codes: courseCodes }),
      })
      const json = await res.json()
      if (!res.ok) {
        setError(json.error ?? 'Something went wrong.')
      } else {
        setSuccess(true)
        if (json.professor) onAdded(json.professor as Professor)
        setTimeout(() => onClose(), 1800)
      }
    } catch {
      setError('Network error. Please try again.')
    } finally {
      setSubmitting(false)
    }
  }

  // Close on backdrop click
  function handleBackdropClick(e: React.MouseEvent<HTMLDivElement>) {
    if (e.target === e.currentTarget) onClose()
  }

  return (
    <div className={styles.overlay} role="dialog" aria-modal="true" aria-label="Add a professor" onClick={handleBackdropClick}>
      <div className={styles.modal}>
        <button className={styles.closeBtn} onClick={onClose} aria-label="Close">✕</button>
        <p className={styles.modalTitle}>Add a Professor</p>
        <p className={styles.modalSub}>Help your fellow students by adding a professor to the database.</p>

        {!isSignedIn ? (
          <div className={styles.loginPrompt}>
            <p>You need to be signed in to add a professor.</p>
            <Link href="/login" className={styles.loginLink}>Sign in to continue →</Link>
          </div>
        ) : success ? (
          <p className={styles.successMsg}>✓ Professor added! Thank you.</p>
        ) : (
          <form onSubmit={handleSubmit}>
            {error && (
              <p style={{ color: 'var(--red)', fontSize: 13, marginBottom: 12 }}>{error}</p>
            )}

            <div className={styles.formField}>
              <label className={styles.label} htmlFor="add-name">Professor name *</label>
              <input
                id="add-name"
                className={styles.input}
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="e.g. Dr. Jane Smith"
                required
                maxLength={120}
              />
            </div>

            <div className={styles.formField}>
              <label className={styles.label} htmlFor="add-school">School *</label>
              <select
                id="add-school"
                className={styles.select}
                value={school}
                onChange={(e) => { setSchool(e.target.value); setDepartment('') }}
                required
              >
                <option value="">Select a school…</option>
                {SCHOOL_OPTIONS.map((s) => (
                  <option key={s.value} value={s.value}>{s.label}</option>
                ))}
              </select>
            </div>

            <div className={styles.formField}>
              <label className={styles.label} htmlFor="add-dept">Department *</label>
              {school ? (
                <select
                  id="add-dept"
                  className={styles.select}
                  value={department}
                  onChange={(e) => setDepartment(e.target.value)}
                  required
                >
                  <option value="">Select department…</option>
                  {depts.map((d) => <option key={d} value={d}>{d}</option>)}
                  <option value="Other">Other</option>
                </select>
              ) : (
                <input
                  id="add-dept"
                  className={styles.input}
                  value=""
                  placeholder="Select a school first"
                  disabled
                  readOnly
                />
              )}
            </div>

            <div className={styles.formField}>
              <label className={styles.label} htmlFor="add-courses">Course codes (optional)</label>
              <input
                id="add-courses"
                className={styles.input}
                value={courseCodes}
                onChange={(e) => setCourseCodes(e.target.value)}
                placeholder="e.g. CPSC 110, CPSC 210"
              />
              <span className={styles.hint}>Comma-separated course codes this professor teaches.</span>
            </div>

            <div className={styles.formActions}>
              <button type="button" className={styles.cancelBtn} onClick={onClose}>Cancel</button>
              <button
                type="submit"
                className={styles.submitModalBtn}
                disabled={submitting || !name || !school || !department}
              >
                {submitting ? 'Adding…' : 'Add Professor'}
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  )
}

export default function ProfessorsClient() {
  const [query, setQuery] = useState('')
  const [school, setSchool] = useState('')
  const [department, setDepartment] = useState('')
  const [professors, setProfessors] = useState<Professor[]>([])
  const [loading, setLoading] = useState(false)
  const [showModal, setShowModal] = useState(false)
  const debounceRef = useRef<ReturnType<typeof setTimeout> | null>(null)

  const depts = DEPARTMENTS_BY_SCHOOL[school] ?? DEFAULT_DEPTS

  const fetchProfessors = useCallback(async (q: string, s: string) => {
    setLoading(true)
    try {
      const params = new URLSearchParams()
      if (s) params.set('school', s)
      if (q) params.set('q', q)
      const res = await fetch(`/api/professors?${params.toString()}`)
      if (!res.ok) throw new Error('fetch failed')
      const json = await res.json()
      setProfessors(json.professors ?? [])
    } catch {
      setProfessors([])
    } finally {
      setLoading(false)
    }
  }, [])

  // Initial load
  useEffect(() => {
    fetchProfessors('', '')
  }, [fetchProfessors])

  // Debounced fetch on query / school change
  useEffect(() => {
    if (debounceRef.current) clearTimeout(debounceRef.current)
    debounceRef.current = setTimeout(() => {
      fetchProfessors(query, school)
    }, 300)
    return () => {
      if (debounceRef.current) clearTimeout(debounceRef.current)
    }
  }, [query, school, fetchProfessors])

  // Department filtering is client-side only
  const filtered = department
    ? professors.filter((p) => p.department === department)
    : professors

  function handleProfessorAdded(prof: Professor) {
    setProfessors((prev) => [prof, ...prev])
  }

  return (
    <>
      {/* ── Search + filter bar ────────────────────── */}
      <section className={styles.filters}>
        <div className={styles.inner}>
          <div className={styles.filterRow}>
            {/* Search input */}
            <div className={styles.searchWrap}>
              <span className={styles.searchIcon} aria-hidden="true">🔍</span>
              <input
                className={styles.searchInput}
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Professor name or course code…"
                aria-label="Search professors"
                style={{
                  background: 'var(--white)',
                  color: 'var(--fg)',
                  borderColor: 'var(--border)',
                }}
              />
            </div>

            {/* School filter */}
            <select
              className={styles.filterSelect}
              value={school}
              onChange={(e) => { setSchool(e.target.value); setDepartment('') }}
              aria-label="Filter by school"
            >
              <option value="">All schools</option>
              {SCHOOL_OPTIONS.map((s) => (
                <option key={s.value} value={s.value}>{s.label}</option>
              ))}
            </select>

            {/* Department filter (only after school selected) */}
            {school && (
              <select
                className={styles.filterSelect}
                value={department}
                onChange={(e) => setDepartment(e.target.value)}
                aria-label="Filter by department"
              >
                <option value="">All departments</option>
                {depts.map((d) => (
                  <option key={d} value={d}>{d}</option>
                ))}
              </select>
            )}

            <span className={styles.filterCount}>
              {loading ? 'Loading…' : `${filtered.length} professor${filtered.length !== 1 ? 's' : ''}`}
            </span>
          </div>
        </div>
      </section>

      {/* ── Professor grid ─────────────────────────── */}
      <section className={styles.section}>
        <div className={styles.inner}>
          <div className={styles.gridHeader}>
            <p className={styles.resultCount}>
              {loading
                ? 'Loading professors…'
                : filtered.length > 0
                ? `Showing ${filtered.length} professor${filtered.length !== 1 ? 's' : ''}`
                : 'No professors found'}
            </p>
            <button className={styles.addBtn} onClick={() => setShowModal(true)}>
              + Add a professor
            </button>
          </div>

          <div className={styles.grid}>
            {filtered.length > 0
              ? filtered.map((prof) => (
                  <article key={prof.id} className={styles.card}>
                    <h2 className={styles.cardName}>{prof.name}</h2>
                    <div className={styles.cardMeta}>
                      <span className={styles.cardSchool}>{prof.school}</span>
                      <span className={styles.cardDept}>{prof.department}</span>
                    </div>
                    <div className={styles.cardRating}>
                      {prof.avg_overall != null ? (
                        <>
                          <StarDisplay rating={prof.avg_overall} />
                          <span className={styles.ratingNum}>{prof.avg_overall.toFixed(1)}</span>
                          <span className={styles.ratingCount}>
                            ({prof.ratings_count} rating{prof.ratings_count !== 1 ? 's' : ''})
                          </span>
                        </>
                      ) : (
                        <span className={styles.noRatings}>No ratings yet</span>
                      )}
                    </div>
                    <div className={styles.cardFooter}>
                      <Link href={`/professors/${prof.id}`} className={styles.viewLink}>
                        View profile →
                      </Link>
                    </div>
                  </article>
                ))
              : !loading && (
                  <div className={styles.empty}>
                    <div className={styles.emptyIcon}>🎓</div>
                    <p className={styles.emptyTitle}>No professors found.</p>
                    <p className={styles.emptyText}>
                      Try a different search or be the first to add one.
                    </p>
                    <button className={styles.addBtn} onClick={() => setShowModal(true)}>
                      + Add a professor
                    </button>
                  </div>
                )}
          </div>
        </div>
      </section>

      {/* ── Add professor modal ─────────────────────── */}
      {showModal && (
        <AddProfessorModal
          onClose={() => setShowModal(false)}
          onAdded={handleProfessorAdded}
        />
      )}
    </>
  )
}
