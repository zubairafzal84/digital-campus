import type { Metadata } from 'next'
import Link from 'next/link'
import styles from './grades.module.css'

export const metadata: Metadata = {
  title: 'Grades | Digital Kampus',
  robots: { index: false, follow: false },
}

export default function GradesPage() {
  return (
    <div className={styles.page}>
      <div className={styles.header}>
        <div>
          <h1 className={styles.h1}>Grades</h1>
          <p className={styles.sub}>Track your courses and academic progress.</p>
        </div>
      </div>

      <div className={styles.emptyWrap}>
        <span className={styles.emptyIcon}>📊</span>
        <h2 className={styles.emptyH}>No courses added yet</h2>
        <p className={styles.emptyP}>
          Grade tracking connects to your institution&apos;s student portal.
          This feature is coming soon — check back when it launches to view
          your courses, assignments, and academic standing in one place.
        </p>
      </div>

      <Link href="/dashboard" className={styles.backLink}>
        ← Back to dashboard
      </Link>

      <p className={styles.note}>
        Official transcripts are available through your institution&apos;s registrar.
      </p>
    </div>
  )
}
