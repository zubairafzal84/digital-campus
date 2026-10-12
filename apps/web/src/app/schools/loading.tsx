import styles from '@/app/skeleton.module.css'

export default function SchoolsLoading() {
  return (
    <main
      style={{ padding: '32px 16px', maxWidth: 1100, margin: '0 auto', display: 'flex', flexDirection: 'column', gap: 28 }}
      aria-busy="true"
      aria-label="Loading schools"
    >
      {/* hero title + subtitle */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: 12, alignItems: 'center', textAlign: 'center' }}>
        <div className={styles.skeletonTitle} style={{ width: 320, height: 36, margin: '0 auto' }} />
        <div className={styles.skeletonText} style={{ width: 480, maxWidth: '100%', margin: '0 auto' }} />
      </div>

      {/* search bar */}
      <div className={styles.skeleton} style={{ height: 48, borderRadius: 8, maxWidth: 560, margin: '0 auto', width: '100%' }} />

      {/* province filters */}
      <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap', justifyContent: 'center' }}>
        {Array.from({ length: 7 }).map((_, i) => (
          <div key={i} className={styles.skeleton} style={{ width: 90, height: 32, borderRadius: 20 }} />
        ))}
      </div>

      {/* school cards grid */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: 24 }}>
        {Array.from({ length: 12 }).map((_, i) => (
          <div key={i} className={styles.skeletonCard} style={{ height: 200 }} />
        ))}
      </div>
    </main>
  )
}
