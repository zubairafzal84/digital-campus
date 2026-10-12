import styles from '@/app/skeleton.module.css'

export default function GradesLoading() {
  return (
    <main
      style={{ padding: '24px 16px', maxWidth: 900, margin: '0 auto', display: 'flex', flexDirection: 'column', gap: 24 }}
      aria-busy="true"
      aria-label="Loading grades"
    >
      {/* page title */}
      <div className={styles.skeletonTitle} style={{ width: '25%', height: 28 }} />

      {/* semester selector bar */}
      <div style={{ display: 'flex', gap: 12 }}>
        {Array.from({ length: 3 }).map((_, i) => (
          <div key={i} className={styles.skeleton} style={{ width: 100, height: 36, borderRadius: 20 }} />
        ))}
      </div>

      {/* GPA summary card */}
      <div className={styles.skeletonCard} style={{ height: 96 }} />

      {/* course cards */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
        {Array.from({ length: 5 }).map((_, i) => (
          <div
            key={i}
            className={styles.skeleton}
            style={{ height: 80, borderRadius: 10 }}
          />
        ))}
      </div>
    </main>
  )
}
