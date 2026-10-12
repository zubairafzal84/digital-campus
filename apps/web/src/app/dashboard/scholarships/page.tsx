import type { Metadata } from 'next'
import styles from '../dashboard.module.css'
import schStyles from './scholarships.module.css'
import ScholarshipTracker from './ScholarshipTracker'

export const metadata: Metadata = {
  title: 'Scholarships | Dashboard | Digital Kampus',
  robots: { index: false, follow: false },
}

export default function DashboardScholarshipsPage() {
  return (
    <>
      <div className={styles.topBar}>
        <div>
          <h1 className={styles.h1}>Scholarships</h1>
          <p className={styles.sub}>
            Personalised matches from across Canada — federal, provincial, institutional, and private.
            Tracking is always free.
          </p>
        </div>
      </div>

      <div className={schStyles.freeNotice} role="note">
        <span className={schStyles.freeIcon}>🎓</span>
        <strong>Scholarship matching is always free — we never charge students.</strong>
      </div>

      <ScholarshipTracker />
    </>
  )
}
