import type { Metadata } from 'next'
import styles from './grades.module.css'

export const metadata: Metadata = {
  title: 'Grades | Digital Kampus',
  robots: { index: false, follow: false },
}

const COURSES = [
  { code: 'CPSC 310', name: 'Introduction to Software Engineering', grade: 'A', pct: 91, credits: 4, assignments: [
    { name: 'Assignment 1', score: '47/50', pct: 94 },
    { name: 'Assignment 2', score: '43/50', pct: 86 },
    { name: 'Midterm', score: '82/100', pct: 82 },
    { name: 'Project Phase 1', score: '38/40', pct: 95 },
  ]},
  { code: 'CPSC 320', name: 'Intermediate Algorithm Design', grade: 'A−', pct: 88, credits: 3, assignments: [
    { name: 'Assignment 1', score: '28/30', pct: 93 },
    { name: 'Assignment 2', score: '25/30', pct: 83 },
    { name: 'Midterm', score: '76/100', pct: 76 },
  ]},
  { code: 'MATH 220', name: 'Mathematical Proof', grade: 'B+', pct: 85, credits: 3, assignments: [
    { name: 'Assignment 1', score: '18/20', pct: 90 },
    { name: 'Midterm', score: '68/80', pct: 85 },
  ]},
  { code: 'ENGL 110', name: 'Composition', grade: 'A', pct: 92, credits: 3, assignments: [
    { name: 'Essay 1', score: '44/50', pct: 88 },
    { name: 'Essay 2', score: '47/50', pct: 94 },
  ]},
]

const GPA = 3.82
const TERM = 'Fall 2024'

function Bar({ pct }: { pct: number }) {
  const color = pct >= 90 ? '#22c55e' : pct >= 80 ? '#6B3EF2' : pct >= 70 ? '#f59e0b' : '#ef4444'
  return (
    <div className={styles.bar}>
      <div className={styles.barFill} style={{ width: `${pct}%`, background: color }} />
    </div>
  )
}

export default function GradesPage() {
  return (
    <div className={styles.page}>
      <div className={styles.header}>
        <div>
          <h1 className={styles.h1}>Grades</h1>
          <p className={styles.sub}>{TERM} · {COURSES.reduce((s, c) => s + c.credits, 0)} credits enrolled</p>
        </div>
        <div className={styles.gpaCard}>
          <span className={styles.gpaLabel}>Cumulative GPA</span>
          <span className={styles.gpaValue}>{GPA}</span>
          <span className={styles.gpaOf}>/ 4.33</span>
        </div>
      </div>

      <div className={styles.courseList}>
        {COURSES.map(course => (
          <div key={course.code} className={styles.courseCard}>
            <div className={styles.courseTop}>
              <div>
                <span className={styles.courseCode}>{course.code}</span>
                <h2 className={styles.courseName}>{course.name}</h2>
              </div>
              <div className={styles.gradeBlock}>
                <span className={styles.gradeLetter}>{course.grade}</span>
                <span className={styles.gradePct}>{course.pct}%</span>
              </div>
            </div>
            <Bar pct={course.pct} />
            <div className={styles.assignments}>
              {course.assignments.map(a => (
                <div key={a.name} className={styles.aRow}>
                  <span className={styles.aName}>{a.name}</span>
                  <span className={styles.aScore}>{a.score}</span>
                  <span className={styles.aPct}>{a.pct}%</span>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>

      <p className={styles.note}>
        Grades shown are from your institution's student portal. Contact your registrar for official transcripts.
      </p>
    </div>
  )
}
