'use client'

import { useEffect, useState, Suspense } from 'react'
import { useSearchParams } from 'next/navigation'
import { useAuth } from '@clerk/nextjs'
import Link from 'next/link'
import styles from './classmates.module.css'

type Classmate = {
  user_id: string
  course_code: string
  display_name: string | null
  program: string | null
  year: number | null
  avatar_url: string | null
}

function ClassmatesContent() {
  const searchParams = useSearchParams()
  const courseFilter = searchParams.get('course') || ''
  const institution = searchParams.get('institution') || 'ubc'
  const { userId, getToken } = useAuth()
  const [classmates, setClassmates] = useState<Classmate[]>([])
  const [myCourseCodes, setMyCourseCodes] = useState<string[]>([])
  const [loading, setLoading] = useState(true)
  const [activeCourse, setActiveCourse] = useState(courseFilter)
  const [contacted, setContacted] = useState<Set<string>>(new Set())

  useEffect(() => {
    if (!userId) return
    Promise.all([fetchMyCourseCodes(), fetchClassmates()])
  }, [userId, activeCourse])

  async function fetchMyCourseCodes() {
    try {
      const token = await getToken({ template: 'supabase' })
      const res = await fetch('/api/courses', { headers: { Authorization: `Bearer ${token}` } })
      if (res.ok) {
        const courses = await res.json()
        setMyCourseCodes(courses.map((c: { course_code: string }) => c.course_code))
      }
    } catch {}
  }

  async function fetchClassmates() {
    setLoading(true)
    try {
      const params = new URLSearchParams({ institution })
      if (activeCourse) params.set('course', activeCourse)
      const token = await getToken({ template: 'supabase' })
      const res = await fetch(`/api/classmates?${params}`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      if (res.ok) setClassmates(await res.json())
    } finally {
      setLoading(false)
    }
  }

  async function sendContactRequest(recipientId: string) {
    const token = await getToken({ template: 'supabase' })
    await fetch('/api/contacts/request', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
      body: JSON.stringify({ recipient_id: recipientId }),
    })
    setContacted(prev => new Set([...prev, recipientId]))
  }

  if (!userId) {
    return (
      <div className={styles.authWall}>
        <h2>Sign in to find classmates</h2>
        <Link href="/login" className={styles.btn}>Sign in</Link>
      </div>
    )
  }

  const grouped = classmates.reduce((acc, c) => {
    if (!acc[c.course_code]) acc[c.course_code] = []
    acc[c.course_code].push(c)
    return acc
  }, {} as Record<string, Classmate[]>)

  return (
    <div className={styles.page}>
      <div className={styles.hero}>
        <div className={styles.heroInner}>
          <Link href="/courses" className={styles.back}>← My Courses</Link>
          <h1>Find Classmates</h1>
          <p>Connect with students in your courses</p>
        </div>
      </div>

      <div className={styles.wrap}>
        {myCourseCodes.length > 0 && (
          <div className={styles.courseFilter}>
            <button
              className={`${styles.filterChip} ${!activeCourse ? styles.filterActive : ''}`}
              onClick={() => setActiveCourse('')}
            >All courses</button>
            {myCourseCodes.map(code => (
              <button
                key={code}
                className={`${styles.filterChip} ${activeCourse === code ? styles.filterActive : ''}`}
                onClick={() => setActiveCourse(code)}
              >
                {code}
              </button>
            ))}
          </div>
        )}

        {loading ? (
          <div className={styles.loading}>Finding classmates…</div>
        ) : classmates.length === 0 ? (
          <div className={styles.empty}>
            <div className={styles.emptyIcon}>👥</div>
            <h3>No classmates found yet</h3>
            <p>
              {myCourseCodes.length === 0
                ? 'Add your courses first so we can match you with classmates'
                : 'Be the first to add this course — classmates will appear here once others join'}
            </p>
            {myCourseCodes.length === 0 && (
              <Link href="/courses" className={styles.btn}>Add courses →</Link>
            )}
          </div>
        ) : (
          Object.entries(grouped).map(([code, people]) => (
            <div key={code} className={styles.courseGroup}>
              <div className={styles.courseGroupHd}>
                <span className={styles.courseTag}>{code}</span>
                <span className={styles.courseCount}>{people.length} classmate{people.length !== 1 ? 's' : ''}</span>
              </div>
              <div className={styles.classmateGrid}>
                {people.map(cm => (
                  <div key={cm.user_id} className={styles.classmateCard}>
                    <div className={styles.avatar}>
                      {cm.avatar_url
                        ? <img src={cm.avatar_url} alt="" />
                        : <span>{(cm.display_name || '?')[0].toUpperCase()}</span>
                      }
                    </div>
                    <div className={styles.cmInfo}>
                      <div className={styles.cmName}>{cm.display_name || 'Student'}</div>
                      {cm.program && <div className={styles.cmProgram}>{cm.program}</div>}
                      {cm.year && <div className={styles.cmYear}>Year {cm.year}</div>}
                    </div>
                    <button
                      className={`${styles.connectBtn} ${contacted.has(cm.user_id) ? styles.sent : ''}`}
                      onClick={() => sendContactRequest(cm.user_id)}
                      disabled={contacted.has(cm.user_id)}
                    >
                      {contacted.has(cm.user_id) ? 'Sent ✓' : 'Connect'}
                    </button>
                  </div>
                ))}
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  )
}

export default function ClassmatesPage() {
  return (
    <Suspense fallback={<div style={{ padding: 40, textAlign: 'center', color: '#6B3EF2' }}>Loading…</div>}>
      <ClassmatesContent />
    </Suspense>
  )
}
