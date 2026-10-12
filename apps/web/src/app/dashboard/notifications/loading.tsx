import styles from '@/app/skeleton.module.css'

export default function NotificationsLoading() {
  return (
    <main
      style={{ padding: '24px 16px', maxWidth: 700, margin: '0 auto', display: 'flex', flexDirection: 'column', gap: 20 }}
      aria-busy="true"
      aria-label="Loading notifications"
    >
      {/* page title + mark-all button */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div className={styles.skeletonTitle} style={{ width: 220 }} />
        <div className={styles.skeleton} style={{ width: 120, height: 34, borderRadius: 6 }} />
      </div>

      {/* notification rows */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
        {Array.from({ length: 10 }).map((_, i) => (
          <div
            key={i}
            style={{ display: 'flex', alignItems: 'center', gap: 14 }}
          >
            <div className={styles.skeletonAvatar} style={{ width: 40, height: 40 }} />
            <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: 7 }}>
              <div className={styles.skeletonText} style={{ width: `${55 + (i * 9) % 35}%` }} />
              <div className={styles.skeletonText} style={{ width: '30%', height: 11 }} />
            </div>
          </div>
        ))}
      </div>
    </main>
  )
}
