'use client'

import { useEffect, useState } from 'react'
import { useAuth } from '@clerk/nextjs'
import Link from 'next/link'
import styles from './courses.module.css'

type Course = {
  id: string
  course_code: string
  course_name: string | null
  professor: string | null
  semester: string
  institution_slug: string
}

type StudyGroup = {
  id: string
  course_code: string
  course_name: string
  title: string
  location: string | null
  is_virtual: boolean
  scheduled_at: string
  duration_minutes: number
  max_members: number
  member_count?: number
}

const POPULAR_COURSES: Record<string, { name: string; code: string }[]> = {
  ubc: [
    { code: 'CPSC 110', name: 'Computation, Programs and Programming' },
    { code: 'CPSC 221', name: 'Basic Algorithms and Data Structures' },
    { code: 'CPSC 310', name: 'Introduction to Software Engineering' },
    { code: 'BIOL 112', name: 'Biology of the Cell' },
    { code: 'CHEM 121', name: 'Structural Chemistry & Spectroscopy' },
    { code: 'MATH 100', name: 'Differential Calculus with Applications' },
    { code: 'ECON 101', name: 'Principles of Microeconomics' },
    { code: 'PSYC 101', name: 'Introduction to Biological & Cognitive Psychology' },
  ],
  uoft: [
    { code: 'CSC108', name: 'Introduction to Computer Programming' },
    { code: 'CSC148', name: 'Introduction to Computer Science' },
    { code: 'BIO130', name: 'Molecular and Cell Biology' },
    { code: 'CHM135', name: 'Chemistry: Physical Principles' },
    { code: 'MAT137', name: 'Calculus with Proofs' },
    { code: 'ECO100', name: 'Introduction to Economics' },
  ],
  uwaterloo: [
    { code: 'CS135', name: 'Designing Functional Programs' },
    { code: 'CS136', name: 'Elementary Algorithm Design and Data Abstraction' },
    { code: 'MATH135', name: 'Algebra for Honours Mathematics' },
    { code: 'MATH137', name: 'Calculus 1 for Honours Mathematics' },
    { code: 'ECE105', name: 'Classical Mechanics' },
  ],
}

export default function CoursesPage() {
  const { userId, getToken } = useAuth()
  const [courses, setCourses] = useState<Course[]>([])
  const [studyGroups, setStudyGroups] = useState<StudyGroup[]>([])
  const [adding, setAdding] = useState(false)
  const [newCode, setNewCode] = useState('')
  const [newName, setNewName] = useState('')
  const [newProf, setNewProf] = useState('')
  const [saving, setSaving] = useState(false)
  const [institutionSlug] = useState('ubc')
  const [semester] = useState('2025-F')
  const [activeTab, setActiveTab] = useState<'courses' | 'study-groups'>('courses')

  useEffect(() => {
    if (!userId) return
    fetchCourses()
    fetchStudyGroups()
  }, [userId])

  async function fetchCourses() {
    try {
      const token = await getToken({ template: 'supabase' })
      const res = await fetch('/api/courses', {
        headers: { Authorization: `Bearer ${token}` },
      })
      if (res.ok) setCourses(await res.json())
    } catch {}
  }

  async function fetchStudyGroups() {
    try {
      const res = await fetch(`/api/study-groups?institution=${institutionSlug}`)
      if (res.ok) setStudyGroups(await res.json())
    } catch {}
  }

  async function addCourse() {
    if (!newCode.trim()) return
    setSaving(true)
    try {
      const token = await getToken({ template: 'supabase' })
      const res = await fetch('/api/courses', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
        body: JSON.stringify({
          course_code: newCode.trim().toUpperCase(),
          course_name: newName.trim() || null,
          professor: newProf.trim() || null,
          institution_slug: institutionSlug,
          semester,
        }),
      })
      if (res.ok) {
        const created = await res.json()
        setCourses(prev => [...prev, created])
        setNewCode('')
        setNewName('')
        setNewProf('')
        setAdding(false)
      }
    } finally {
      setSaving(false)
    }
  }

  async function removeCourse(id: string) {
    const token = await getToken({ template: 'supabase' })
    await fetch(`/api/courses/${id}`, {
      method: 'DELETE',
      headers: { Authorization: `Bearer ${token}` },
    })
    setCourses(prev => prev.filter(c => c.id !== id))
  }

  async function joinStudyGroup(groupId: string) {
    const token = await getToken({ template: 'supabase' })
    await fetch(`/api/study-groups/${groupId}/join`, {
      method: 'POST',
      headers: { Authorization: `Bearer ${token}` },
    })
    fetchStudyGroups()
  }

  const suggestions = POPULAR_COURSES[institutionSlug] || []
  const myCourseGroups = studyGroups.filter(g =>
    courses.some(c => c.course_code === g.course_code)
  )
  const otherGroups = studyGroups.filter(g =>
    !courses.some(c => c.course_code === g.course_code)
  )

  if (!userId) {
    return (
      <div className={styles.authWall}>
        <h1>Sign in to manage your courses</h1>
        <Link href="/login" className={styles.btn}>Sign in</Link>
      </div>
    )
  }

  return (
    <div className={styles.page}>
      <div className={styles.hero}>
        <div className={styles.heroInner}>
          <h1>Your Courses</h1>
          <p>Add your courses to find classmates, study groups, and textbooks</p>
        </div>
      </div>

      <div className={styles.wrap}>
        {/* Tabs */}
        <div className={styles.tabs}>
          <button
            className={`${styles.tab} ${activeTab === 'courses' ? styles.tabActive : ''}`}
            onClick={() => setActiveTab('courses')}
          >
            📚 My Courses ({courses.length})
          </button>
          <button
            className={`${styles.tab} ${activeTab === 'study-groups' ? styles.tabActive : ''}`}
            onClick={() => setActiveTab('study-groups')}
          >
            👥 Study Groups
          </button>
        </div>

        {activeTab === 'courses' && (
          <div className={styles.section}>
            {courses.length === 0 && !adding && (
              <div className={styles.empty}>
                <div className={styles.emptyIcon}>📋</div>
                <h3>No courses added yet</h3>
                <p>Add your courses to connect with classmates and find study groups</p>
              </div>
            )}

            {courses.map(course => (
              <div key={course.id} className={styles.courseCard}>
                <div className={styles.courseMain}>
                  <span className={styles.courseCode}>{course.course_code}</span>
                  {course.course_name && <span className={styles.courseName}>{course.course_name}</span>}
                  {course.professor && <span className={styles.courseProf}>👤 {course.professor}</span>}
                </div>
                <div className={styles.courseActions}>
                  <Link
                    href={`/classmates?course=${encodeURIComponent(course.course_code)}&institution=${institutionSlug}`}
                    className={styles.actionBtn}
                  >
                    👥 Classmates
                  </Link>
                  <Link
                    href={`/textbooks?course=${encodeURIComponent(course.course_code)}&institution=${institutionSlug}`}
                    className={styles.actionBtn}
                  >
                    📖 Textbooks
                  </Link>
                  <button className={styles.removeBtn} onClick={() => removeCourse(course.id)}>✕</button>
                </div>
              </div>
            ))}

            {adding ? (
              <div className={styles.addForm}>
                <h3>Add a course</h3>
                <div className={styles.suggestions}>
                  <p className={styles.suggestLabel}>Popular at UBC this semester</p>
                  <div className={styles.suggestChips}>
                    {suggestions.filter(s => !courses.some(c => c.course_code === s.code)).slice(0, 6).map(s => (
                      <button
                        key={s.code}
                        className={styles.suggestChip}
                        onClick={() => { setNewCode(s.code); setNewName(s.name) }}
                      >
                        {s.code}
                      </button>
                    ))}
                  </div>
                </div>
                <div className={styles.formFields}>
                  <input
                    className={styles.input}
                    placeholder="Course code (e.g. CPSC 310)"
                    value={newCode}
                    onChange={e => setNewCode(e.target.value)}
                    autoFocus
                  />
                  <input
                    className={styles.input}
                    placeholder="Course name (optional)"
                    value={newName}
                    onChange={e => setNewName(e.target.value)}
                  />
                  <input
                    className={styles.input}
                    placeholder="Professor name (optional)"
                    value={newProf}
                    onChange={e => setNewProf(e.target.value)}
                  />
                </div>
                <div className={styles.formBtns}>
                  <button className={styles.cancelBtn} onClick={() => setAdding(false)}>Cancel</button>
                  <button className={styles.saveBtn} onClick={addCourse} disabled={!newCode.trim() || saving}>
                    {saving ? 'Adding…' : 'Add Course'}
                  </button>
                </div>
              </div>
            ) : (
              <button className={styles.addBtn} onClick={() => setAdding(true)}>
                + Add a course
              </button>
            )}

            {courses.length > 0 && (
              <div className={styles.quickLinks}>
                <h3>Quick actions</h3>
                <div className={styles.quickGrid}>
                  <Link href="/classmates" className={styles.quickCard}>
                    <span className={styles.quickIcon}>👥</span>
                    <strong>Find Classmates</strong>
                    <span>Connect with students in your courses</span>
                  </Link>
                  <Link href="/textbooks" className={styles.quickCard}>
                    <span className={styles.quickIcon}>📖</span>
                    <strong>Course Textbooks</strong>
                    <span>Find books being sold by other students</span>
                  </Link>
                  <Link href={`/courses?tab=study-groups`} onClick={() => setActiveTab('study-groups')} className={styles.quickCard}>
                    <span className={styles.quickIcon}>📅</span>
                    <strong>Study Together</strong>
                    <span>Join an exam prep or homework group</span>
                  </Link>
                  <Link href="/events" className={styles.quickCard}>
                    <span className={styles.quickIcon}>🗓️</span>
                    <strong>What's Happening</strong>
                    <span>Discover study sessions and events</span>
                  </Link>
                </div>
              </div>
            )}
          </div>
        )}

        {activeTab === 'study-groups' && (
          <div className={styles.section}>
            {myCourseGroups.length > 0 && (
              <>
                <h3 className={styles.sectionLabel}>For your courses</h3>
                {myCourseGroups.map(g => (
                  <StudyGroupCard key={g.id} group={g} onJoin={joinStudyGroup} />
                ))}
              </>
            )}
            {otherGroups.length > 0 && (
              <>
                <h3 className={styles.sectionLabel}>All study groups</h3>
                {otherGroups.map(g => (
                  <StudyGroupCard key={g.id} group={g} onJoin={joinStudyGroup} />
                ))}
              </>
            )}
            {studyGroups.length === 0 && (
              <div className={styles.empty}>
                <div className={styles.emptyIcon}>👥</div>
                <h3>No study groups yet</h3>
                <p>Be the first to organize one for your course</p>
              </div>
            )}
            <Link href="/study-groups/create" className={styles.addBtn}>
              + Create a study group
            </Link>
          </div>
        )}
      </div>
    </div>
  )
}

function StudyGroupCard({ group, onJoin }: { group: StudyGroup; onJoin: (id: string) => void }) {
  const date = new Date(group.scheduled_at)
  const dateStr = date.toLocaleDateString('en-CA', { weekday: 'short', month: 'short', day: 'numeric' })
  const timeStr = date.toLocaleTimeString('en-CA', { hour: 'numeric', minute: '2-digit' })

  return (
    <div className={styles.groupCard}>
      <div className={styles.groupTop}>
        <span className={styles.groupCourse}>{group.course_code}</span>
        <span className={styles.groupType}>{group.is_virtual ? '🌐 Virtual' : '📍 In-person'}</span>
      </div>
      <h4 className={styles.groupTitle}>{group.title}</h4>
      <div className={styles.groupMeta}>
        <span>🗓️ {dateStr} at {timeStr}</span>
        <span>⏱ {group.duration_minutes} min</span>
        {group.location && <span>📍 {group.location}</span>}
      </div>
      <div className={styles.groupFoot}>
        <span className={styles.groupSpots}>
          {group.member_count ?? 0}/{group.max_members} spots filled
        </span>
        <button className={styles.joinBtn} onClick={() => onJoin(group.id)}>
          Join →
        </button>
      </div>
    </div>
  )
}
