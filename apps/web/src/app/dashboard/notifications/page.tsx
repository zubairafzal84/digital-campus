import type { Metadata } from 'next'
import NotificationsList from './NotificationsList'
import styles from '../dashboard.module.css'

export const metadata: Metadata = {
  title: 'Notifications | Digital Kampus',
  robots: { index: false, follow: false },
}

export default function NotificationsPage() {
  return (
    <>
      <div className={styles.topBar}>
        <div>
          <h1 className={styles.h1}>Notifications</h1>
        </div>
      </div>

      <NotificationsList />
    </>
  )
}
