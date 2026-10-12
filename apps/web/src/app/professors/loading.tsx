import styles from '@/app/skeleton.module.css'

export default function ProfessorsLoading() {
  return (
    <div style={{ maxWidth: '1120px', margin: '0 auto', padding: '32px 16px' }}>
      {/* Page heading skeleton */}
      <div className={styles.skeletonTitle} style={{ marginBottom: '8px' }} />
      <div className={styles.skeletonText} style={{ width: '40%', marginBottom: '32px' }} />

      {/* Filter / search bar skeleton */}
      <div className={styles.skeletonRow} style={{ height: '48px', marginBottom: '32px' }} />

      {/* Professor cards grid */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
          gap: '20px',
        }}
      >
        {Array.from({ length: 9 }).map((_, i) => (
          <div
            key={i}
            style={{
              border: '1px solid var(--border, #e5e7eb)',
              borderRadius: '12px',
              padding: '20px',
              display: 'flex',
              flexDirection: 'column',
              gap: '12px',
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
              <div className={styles.skeletonAvatar} />
              <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: '8px' }}>
                <div className={styles.skeletonTitle} style={{ width: '70%' }} />
                <div className={styles.skeletonText} style={{ width: '50%' }} />
              </div>
            </div>
            <div className={styles.skeletonText} />
            <div className={styles.skeletonText} style={{ width: '80%' }} />
            <div className={styles.skeletonRow} style={{ height: '36px', marginTop: '4px' }} />
          </div>
        ))}
      </div>
    </div>
  )
}
