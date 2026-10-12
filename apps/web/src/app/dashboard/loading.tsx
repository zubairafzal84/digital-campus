import styles from '@/app/skeleton.module.css'

export default function DashboardLoading() {
  return (
    <div aria-busy="true" aria-label="Loading dashboard">
      {/* greeting */}
      <div className={styles.skeletonTitle} style={{ width: '40%', height: 32, marginBottom: 24 }} />

      {/* summary cards */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(180px, 1fr))', gap: 16, marginBottom: 24 }}>
        {Array.from({ length: 4 }).map((_, i) => (
          <div key={i} className={styles.skeletonCard} style={{ height: 120 }} />
        ))}
      </div>

      {/* recent activity rows */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
        <div className={styles.skeletonTitle} style={{ width: '30%' }} />
        {Array.from({ length: 4 }).map((_, i) => (
          <div key={i} className={styles.skeletonRow} />
        ))}
      </div>
    </div>
  )
}
