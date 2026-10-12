import styles from '@/app/skeleton.module.css'

export default function ChatLoading() {
  return (
    <main
      style={{ display: 'flex', height: 'calc(100vh - 64px)', overflow: 'hidden' }}
      aria-busy="true"
      aria-label="Loading messages"
    >
      {/* thread list panel */}
      <aside
        style={{
          width: 300,
          flexShrink: 0,
          borderRight: '1px solid var(--border, #e5e7eb)',
          padding: 16,
          display: 'flex',
          flexDirection: 'column',
          gap: 14,
        }}
      >
        <div className={styles.skeletonTitle} style={{ width: '60%' }} />
        {Array.from({ length: 7 }).map((_, i) => (
          <div key={i} style={{ display: 'flex', gap: 10, alignItems: 'center' }}>
            <div className={styles.skeletonAvatar} style={{ width: 40, height: 40 }} />
            <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: 6 }}>
              <div className={styles.skeletonText} style={{ width: '70%' }} />
              <div className={styles.skeletonText} style={{ width: '90%', height: 11 }} />
            </div>
          </div>
        ))}
      </aside>

      {/* message area */}
      <section style={{ flex: 1, display: 'flex', flexDirection: 'column', padding: 24, gap: 16, minWidth: 0 }}>
        {/* header */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 12, paddingBottom: 16, borderBottom: '1px solid var(--border, #e5e7eb)' }}>
          <div className={styles.skeletonAvatar} style={{ width: 40, height: 40 }} />
          <div className={styles.skeletonTitle} style={{ width: 180 }} />
        </div>

        {/* messages */}
        <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: 16, overflow: 'hidden' }}>
          {Array.from({ length: 6 }).map((_, i) => (
            <div
              key={i}
              style={{
                display: 'flex',
                justifyContent: i % 2 === 0 ? 'flex-start' : 'flex-end',
              }}
            >
              <div
                className={styles.skeleton}
                style={{
                  width: `${40 + (i * 7) % 30}%`,
                  height: 48,
                  borderRadius: 16,
                }}
              />
            </div>
          ))}
        </div>

        {/* compose bar */}
        <div className={styles.skeleton} style={{ height: 48, borderRadius: 24 }} />
      </section>
    </main>
  )
}
