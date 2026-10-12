import styles from '@/app/skeleton.module.css'

export default function ScholarshipsLoading() {
  return (
    <main
      style={{ padding: '24px 16px', maxWidth: 900, margin: '0 auto', display: 'flex', flexDirection: 'column', gap: 24 }}
      aria-busy="true"
      aria-label="Loading scholarships"
    >
      {/* page title */}
      <div className={styles.skeletonTitle} style={{ width: '35%', height: 28 }} />

      {/* filter row */}
      <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap' }}>
        {Array.from({ length: 4 }).map((_, i) => (
          <div key={i} className={styles.skeleton} style={{ width: 110, height: 36, borderRadius: 8 }} />
        ))}
      </div>

      {/* list rows */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
        {Array.from({ length: 8 }).map((_, i) => (
          <div
            key={i}
            className={styles.skeletonRow}
            style={{ height: 72 }}
          />
        ))}
      </div>
    </main>
  )
}
