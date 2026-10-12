import type { Metadata } from 'next'
import Link from 'next/link'
import styles from './chat.module.css'

export const metadata: Metadata = {
  title: 'Messages | Digital Kampus',
  robots: { index: false, follow: false },
}

export default function ChatPage() {
  return (
    <div className={styles.layout}>
      {/* Thread list */}
      <aside className={styles.threads}>
        <div className={styles.threadsHeader}>
          <h1 className={styles.h1}>Messages</h1>
        </div>
        <div className={styles.emptyThreads}>
          <p className={styles.emptyThreadsText}>No conversations yet</p>
        </div>
      </aside>

      {/* Main area */}
      <main className={styles.convo}>
        <div className={styles.emptyConvo}>
          <span className={styles.emptyIcon}>💬</span>
          <h2 className={styles.emptyH}>Your messages will appear here</h2>
          <p className={styles.emptyP}>
            To message another student, send them a contact request first. Once they accept, you can message each other directly.
          </p>
          <p className={styles.emptyP}>
            Contact requests must be accepted before any 1:1 messaging begins.
          </p>
          <Link href="/schools" className={styles.findBtn}>
            Find students at your school →
          </Link>
        </div>
      </main>
    </div>
  )
}
