'use client'

import { useState, useEffect, useCallback } from 'react'
import styles from './grades.module.css'

interface Assessment {
  name: string
  weight: number
  score: number
  maxScore: number
}

interface Course {
  id: string
  code: string
  name: string
  credits: number
  assessments: Assessment[]
}

interface GradeData {
  courses: Course[]
}

function pctToLetter(pct: number): string {
  if (pct >= 97) return 'A+'
  if (pct >= 93) return 'A'
  if (pct >= 90) return 'A-'
  if (pct >= 87) return 'B+'
  if (pct >= 83) return 'B'
  if (pct >= 80) return 'B-'
  if (pct >= 77) return 'C+'
  if (pct >= 73) return 'C'
  if (pct >= 70) return 'C-'
  if (pct >= 60) return 'D'
  return 'F'
}

function pctToColor(pct: number): string {
  if (pct >= 80) return 'var(--purple)'
  if (pct >= 70) return '#2a9d8f'
  if (pct >= 60) return '#e9c46a'
  return '#e76f51'
}

function courseGradePct(course: Course): number | null {
  if (!course.assessments.length) return null
  const totalWeight = course.assessments.reduce((s, a) => s + a.weight, 0)
  if (totalWeight === 0) return null
  const weighted = course.assessments.reduce((s, a) => {
    const pct = a.maxScore > 0 ? (a.score / a.maxScore) * 100 : 0
    return s + pct * a.weight
  }, 0)
  return weighted / totalWeight
}

function calcGPA(courses: Course[]): number | null {
  const graded = courses.filter(c => courseGradePct(c) !== null)
  if (!graded.length) return null
  const totalCredits = graded.reduce((s, c) => s + c.credits, 0)
  if (totalCredits === 0) return null
  const weighted = graded.reduce((s, c) => s + c.credits * (courseGradePct(c) ?? 0), 0)
  return weighted / totalCredits
}

function uid(): string {
  return Math.random().toString(36).slice(2, 10)
}

const EMPTY: GradeData = { courses: [] }

export default function GradeTracker() {
  const [gradeData, setGradeData] = useState<GradeData>(EMPTY)
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [error, setError] = useState<string | null>(null)

  // Add-course form state
  const [showAddCourse, setShowAddCourse] = useState(false)
  const [newCode, setNewCode] = useState('')
  const [newName, setNewName] = useState('')
  const [newCredits, setNewCredits] = useState('3')

  // Add-grade form state per course (keyed by course id)
  const [addGradeCourse, setAddGradeCourse] = useState<string | null>(null)
  const [newAName, setNewAName] = useState('')
  const [newAWeight, setNewAWeight] = useState('')
  const [newAScore, setNewAScore] = useState('')
  const [newAMax, setNewAMax] = useState('100')

  useEffect(() => {
    fetch('/api/grades')
      .then(r => r.json())
      .then((d: GradeData | { error: string }) => {
        if ('error' in d) {
          setError((d as { error: string }).error)
        } else {
          setGradeData(d && d.courses ? d : EMPTY)
        }
      })
      .catch(() => setError('Failed to load grades'))
      .finally(() => setLoading(false))
  }, [])

  const save = useCallback(async (data: GradeData) => {
    setSaving(true)
    try {
      await fetch('/api/grades', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ grade_data: data }),
      })
    } catch {
      // silent — UI still reflects local state
    } finally {
      setSaving(false)
    }
  }, [])

  const updateData = useCallback((data: GradeData) => {
    setGradeData(data)
    save(data)
  }, [save])

  function handleAddCourse(e: React.FormEvent) {
    e.preventDefault()
    const code = newCode.trim().toUpperCase()
    const name = newName.trim()
    const credits = parseFloat(newCredits) || 3
    if (!code || !name) return
    const course: Course = { id: uid(), code, name, credits, assessments: [] }
    const next = { courses: [...gradeData.courses, course] }
    updateData(next)
    setNewCode('')
    setNewName('')
    setNewCredits('3')
    setShowAddCourse(false)
  }

  function handleDeleteCourse(id: string) {
    const next = { courses: gradeData.courses.filter(c => c.id !== id) }
    updateData(next)
    if (addGradeCourse === id) setAddGradeCourse(null)
  }

  function handleAddGrade(e: React.FormEvent, courseId: string) {
    e.preventDefault()
    const name = newAName.trim()
    const weight = parseFloat(newAWeight)
    const score = parseFloat(newAScore)
    const maxScore = parseFloat(newAMax)
    if (!name || isNaN(weight) || isNaN(score) || isNaN(maxScore)) return
    const assessment: Assessment = { name, weight, score, maxScore }
    const next = {
      courses: gradeData.courses.map(c =>
        c.id === courseId ? { ...c, assessments: [...c.assessments, assessment] } : c
      ),
    }
    updateData(next)
    setNewAName('')
    setNewAWeight('')
    setNewAScore('')
    setNewAMax('100')
    setAddGradeCourse(null)
  }

  function handleDeleteAssessment(courseId: string, idx: number) {
    const next = {
      courses: gradeData.courses.map(c =>
        c.id === courseId
          ? { ...c, assessments: c.assessments.filter((_, i) => i !== idx) }
          : c
      ),
    }
    updateData(next)
  }

  const overallGPA = calcGPA(gradeData.courses)

  if (loading) {
    return <div className={styles.page}><p className={styles.sub}>Loading grades…</p></div>
  }

  if (error) {
    return (
      <div className={styles.page}>
        <p className={styles.sub} style={{ color: '#e76f51' }}>{error}</p>
      </div>
    )
  }

  return (
    <div className={styles.page}>
      <div className={styles.header}>
        <div>
          <h1 className={styles.h1}>Grades</h1>
          <p className={styles.sub}>Track your courses and academic progress.{saving ? ' Saving…' : ''}</p>
        </div>
        {overallGPA !== null && (
          <div className={styles.gpaCard}>
            <span className={styles.gpaLabel}>Overall GPA</span>
            <span className={styles.gpaNumber}>{overallGPA.toFixed(1)}%</span>
            <span className={styles.letterGrade}>{pctToLetter(overallGPA)}</span>
          </div>
        )}
      </div>

      {overallGPA !== null && (
        <div className={styles.gpaBar}>
          <div
            style={{ width: `${Math.min(overallGPA, 100)}%`, background: pctToColor(overallGPA) }}
          />
        </div>
      )}

      <div className={styles.tracker}>
        {gradeData.courses.length === 0 && !showAddCourse && (
          <div className={styles.emptyWrap}>
            <span className={styles.emptyIcon}>📊</span>
            <h2 className={styles.emptyH}>No courses yet</h2>
            <p className={styles.emptyP}>Add your first course to start tracking grades.</p>
          </div>
        )}

        {gradeData.courses.map(course => {
          const pct = courseGradePct(course)
          const letter = pct !== null ? pctToLetter(pct) : '—'
          const color = pct !== null ? pctToColor(pct) : 'var(--border)'

          return (
            <div key={course.id} className={styles.courseCard}>
              <div className={styles.courseHeader}>
                <div>
                  <span className={styles.courseCode}>{course.code}</span>
                  <span className={styles.courseName}>{course.name}</span>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                  <span className={styles.creditsBadge}>{course.credits} cr</span>
                  {pct !== null && (
                    <div className={styles.gradeBlock}>
                      <span className={styles.gradeLetter} style={{ color }}>{letter}</span>
                      <span className={styles.gradePct}>{pct.toFixed(1)}%</span>
                    </div>
                  )}
                  <button
                    type="button"
                    onClick={() => handleDeleteCourse(course.id)}
                    className={styles.deleteBtn}
                    aria-label={`Remove ${course.code}`}
                  >
                    ×
                  </button>
                </div>
              </div>

              {pct !== null && (
                <div className={styles.bar}>
                  <div className={styles.barFill} style={{ width: `${Math.min(pct, 100)}%`, background: color }} />
                </div>
              )}

              {course.assessments.length > 0 && (
                <div className={styles.assignments}>
                  <div className={styles.aRow} style={{ borderBottom: '1.5px solid var(--border)', paddingBottom: 6, marginBottom: 2 }}>
                    <span className={styles.aName} style={{ fontWeight: 700, fontSize: 11, textTransform: 'uppercase', letterSpacing: '0.06em', color: 'var(--muted)' }}>Assessment</span>
                    <span className={styles.aScore} style={{ fontWeight: 700, fontSize: 11, textTransform: 'uppercase', letterSpacing: '0.06em' }}>Score</span>
                    <span className={styles.aPct} style={{ fontWeight: 700, fontSize: 11, textTransform: 'uppercase', letterSpacing: '0.06em' }}>Weight</span>
                    <span style={{ width: 24 }} />
                  </div>
                  {course.assessments.map((a, i) => {
                    const aPct = a.maxScore > 0 ? (a.score / a.maxScore) * 100 : 0
                    return (
                      <div key={i} className={styles.aRow}>
                        <span className={styles.aName}>{a.name}</span>
                        <span className={styles.aScore}>{a.score}/{a.maxScore}</span>
                        <span className={styles.aPct}>{aPct.toFixed(0)}% · {a.weight}%wt</span>
                        <button
                          type="button"
                          onClick={() => handleDeleteAssessment(course.id, i)}
                          className={styles.deleteBtn}
                          style={{ fontSize: 14 }}
                          aria-label="Remove assessment"
                        >
                          ×
                        </button>
                      </div>
                    )
                  })}
                </div>
              )}

              {addGradeCourse === course.id ? (
                <form
                  className={styles.addGradeForm}
                  onSubmit={e => handleAddGrade(e, course.id)}
                >
                  <input
                    className={styles.gradeInput}
                    placeholder="Assessment name"
                    value={newAName}
                    onChange={e => setNewAName(e.target.value)}
                    required
                  />
                  <input
                    className={styles.gradeInput}
                    type="number"
                    placeholder="Weight %"
                    value={newAWeight}
                    onChange={e => setNewAWeight(e.target.value)}
                    min="0"
                    max="100"
                    step="0.1"
                    required
                  />
                  <input
                    className={styles.gradeInput}
                    type="number"
                    placeholder="Score"
                    value={newAScore}
                    onChange={e => setNewAScore(e.target.value)}
                    min="0"
                    step="0.1"
                    required
                  />
                  <input
                    className={styles.gradeInput}
                    type="number"
                    placeholder="Max score"
                    value={newAMax}
                    onChange={e => setNewAMax(e.target.value)}
                    min="0.01"
                    step="0.1"
                    required
                  />
                  <div className={styles.formActions}>
                    <button type="submit" className={styles.btnPrimary}>Add Grade</button>
                    <button type="button" className={styles.btnGhost} onClick={() => setAddGradeCourse(null)}>Cancel</button>
                  </div>
                </form>
              ) : (
                <button
                  type="button"
                  className={styles.btnGhost}
                  style={{ marginTop: 12 }}
                  onClick={() => {
                    setAddGradeCourse(course.id)
                    setShowAddCourse(false)
                  }}
                >
                  + Add Grade
                </button>
              )}
            </div>
          )
        })}

        {showAddCourse ? (
          <form className={styles.addCourseForm} onSubmit={handleAddCourse}>
            <h3 className={styles.formTitle}>Add Course</h3>
            <input
              className={styles.gradeInput}
              placeholder="Course code (e.g. COMP 1510)"
              value={newCode}
              onChange={e => setNewCode(e.target.value)}
              required
            />
            <input
              className={styles.gradeInput}
              placeholder="Course name"
              value={newName}
              onChange={e => setNewName(e.target.value)}
              required
            />
            <input
              className={styles.gradeInput}
              type="number"
              placeholder="Credits"
              value={newCredits}
              onChange={e => setNewCredits(e.target.value)}
              min="0.5"
              step="0.5"
              required
            />
            <div className={styles.formActions}>
              <button type="submit" className={styles.btnPrimary}>Add Course</button>
              <button type="button" className={styles.btnGhost} onClick={() => setShowAddCourse(false)}>Cancel</button>
            </div>
          </form>
        ) : (
          <button
            type="button"
            className={styles.btnPrimary}
            onClick={() => {
              setShowAddCourse(true)
              setAddGradeCourse(null)
            }}
          >
            + Add Course
          </button>
        )}
      </div>

      <p className={styles.note}>
        Official transcripts are available through your institution&apos;s registrar.
        GPA shown is a percentage-based weighted average, not a 4.0 scale.
      </p>
    </div>
  )
}
