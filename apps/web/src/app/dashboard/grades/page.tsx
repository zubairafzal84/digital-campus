import type { Metadata } from 'next'
import GradeTracker from './GradeTracker'
import styles from './grades.module.css'

export const metadata: Metadata = {
  title: 'Grades | Digital Kampus',
  robots: { index: false, follow: false },
}

export default function GradesPage() {
  return (
    <>
      <p className={styles.privacyNote}>
        🔒 Your grades are stored locally and never shared without your permission.
      </p>
      <GradeTracker />
    </>
  )
}
