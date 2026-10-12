import styles from '@/app/skeleton.module.css'
import layoutStyles from './dashboard.module.css'

export default function DashboardLoading() {
  return (
    <div className={layoutStyles.layout}>
      {/* sidebar */}
      <div className={layoutStyles.sidebar} aria-hidden="true">
        <div style={{ display: 'flex', alignItems: 'center', gap: 12, padding: '16px 0 24px' }}>
          <div className={styles.skeletonAvatar} />
          <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: 8 }}>
            <div className={styles.skeletonTitle} style={{ width: '80%' }} />
            <div className={styles.skeletonText} style={{ width: '55%' }} />
          </div>
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
          {Array.from({ length: 8 }).map((_, i) => (
            <div key={i} className={styles.skeletonText} style={{ width: i % 3 === 0 ? '90%' : '75%' }} />
          ))}
        </div>
      </div>

      {/* main content */}
      <main className={styles.skeletonMain} aria-busy="true" aria-label="Loading dashboard">
        {/* greeting */}
        <div className={styles.skeletonTitle} style={{ width: '40%', height: 32 }} />

        {/* 4 summary cards */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(180px, 1fr))', gap: 16 }}>
          {Array.from({ length: 4 }).map((_, i) => (
            <div key={i} className={styles.skeletonCard} style={{ height: 120 }} />
          ))}
        </div>

        {/* quick-links / recent activity */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
          <div className={styles.skeletonTitle} style={{ width: '30%' }} />
          {Array.from({ length: 4 }).map((_, i) => (
            <div key={i} className={styles.skeletonRow} />
          ))}
        </div>
      </main>
    </div>
  )
}
