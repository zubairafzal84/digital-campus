import styles from '@/app/skeleton.module.css'

export default function ProfileLoading() {
  return (
    <main
      style={{ padding: '32px 16px', maxWidth: 760, margin: '0 auto', display: 'flex', flexDirection: 'column', gap: 32 }}
      aria-busy="true"
      aria-label="Loading profile"
    >
      {/* avatar + name block */}
      <div style={{ display: 'flex', alignItems: 'center', gap: 20 }}>
        <div className={styles.skeletonAvatar} style={{ width: 80, height: 80 }} />
        <div style={{ display: 'flex', flexDirection: 'column', gap: 10, flex: 1 }}>
          <div className={styles.skeletonTitle} style={{ width: '50%', height: 28 }} />
          <div className={styles.skeletonText} style={{ width: '35%' }} />
        </div>
      </div>

      {/* form section 1 — personal info */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
        <div className={styles.skeletonTitle} style={{ width: '30%', height: 20 }} />
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 14 }}>
          {Array.from({ length: 4 }).map((_, i) => (
            <div key={i} style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
              <div className={styles.skeletonText} style={{ width: '40%', height: 12 }} />
              <div className={styles.skeleton} style={{ height: 40, borderRadius: 6 }} />
            </div>
          ))}
        </div>
      </div>

      {/* form section 2 — academic info */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
        <div className={styles.skeletonTitle} style={{ width: '30%', height: 20 }} />
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 14 }}>
          {Array.from({ length: 4 }).map((_, i) => (
            <div key={i} style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
              <div className={styles.skeletonText} style={{ width: '45%', height: 12 }} />
              <div className={styles.skeleton} style={{ height: 40, borderRadius: 6 }} />
            </div>
          ))}
        </div>
      </div>

      {/* form section 3 — bio */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
        <div className={styles.skeletonTitle} style={{ width: '20%', height: 20 }} />
        <div className={styles.skeleton} style={{ height: 96, borderRadius: 6 }} />
      </div>

      {/* save button */}
      <div className={styles.skeleton} style={{ width: 140, height: 44, borderRadius: 8 }} />
    </main>
  )
}
