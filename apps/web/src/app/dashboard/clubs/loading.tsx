import styles from '@/app/skeleton.module.css'

export default function ClubsLoading() {
  return (
    <main
      style={{ padding: '24px 16px', maxWidth: 1100, margin: '0 auto', display: 'flex', flexDirection: 'column', gap: 24 }}
      aria-busy="true"
      aria-label="Loading clubs"
    >
      {/* page title + search bar */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: 16 }}>
        <div className={styles.skeletonTitle} style={{ width: 200 }} />
        <div className={styles.skeleton} style={{ width: 240, height: 40, borderRadius: 8 }} />
      </div>

      {/* category pills */}
      <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap' }}>
        {Array.from({ length: 6 }).map((_, i) => (
          <div key={i} className={styles.skeleton} style={{ width: 90, height: 32, borderRadius: 20 }} />
        ))}
      </div>

      {/* club cards grid */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(260px, 1fr))', gap: 20 }}>
        {Array.from({ length: 9 }).map((_, i) => (
          <div key={i} className={styles.skeletonCard} style={{ height: 180 }} />
        ))}
      </div>
    </main>
  )
}
