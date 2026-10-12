import type { Metadata } from 'next'
import Link from 'next/link'
import { SiteNav } from '@/components/layout/SiteNav'
import styles from '../dashboard.module.css'
import notifStyles from './notifications.module.css'

export const metadata: Metadata = {
  title: 'Notifications | Digital Kampus',
  robots: { index: false, follow: false },
}

const NOTIFICATIONS = [
  {
    id: 1,
    type: 'scholarship',
    icon: '🎓',
    title: 'Scholarship deadline approaching',
    body: 'The Loran Award closes in 14 days. You matched this award.',
    time: '2 hours ago',
    read: false,
    href: '/scholarships',
  },
  {
    id: 2,
    type: 'contact',
    icon: '👤',
    title: 'Contact request from Jordan L.',
    body: 'Jordan sent you a contact request. Accept to start messaging.',
    time: '5 hours ago',
    read: false,
    href: '/dashboard/chat',
  },
  {
    id: 3,
    type: 'club',
    icon: '🤝',
    title: 'UBC Robotics Club posted an update',
    body: 'New build session this Friday at 6 PM in ICCS 246. All members welcome.',
    time: 'Yesterday',
    read: true,
    href: '/clubs',
  },
  {
    id: 4,
    type: 'scholarship',
    icon: '🎓',
    title: 'New scholarship match',
    body: 'You match the TD Scholarship for Community Leadership ($70,000). Deadline: Mar 1.',
    time: '2 days ago',
    read: true,
    href: '/scholarships',
  },
  {
    id: 5,
    type: 'grades',
    icon: '📊',
    title: 'Mid-term grade posted',
    body: 'CPSC 320 — Analysis of Algorithms: 84% posted by your instructor.',
    time: '3 days ago',
    read: true,
    href: '/dashboard/grades',
  },
  {
    id: 6,
    type: 'contact',
    icon: '👤',
    title: 'Sam K. accepted your contact request',
    body: 'You can now message Sam directly.',
    time: '4 days ago',
    read: true,
    href: '/dashboard/chat',
  },
  {
    id: 7,
    type: 'system',
    icon: '✅',
    title: 'Student verification complete',
    body: 'Your UBC student status has been verified. Your profile now shows a verified badge.',
    time: '1 week ago',
    read: true,
    href: '/profile',
  },
]

const NAV_LINKS = [
  { href: '/dashboard', label: 'Overview', icon: '◉' },
  { href: '/dashboard/grades', label: 'Grades', icon: '📊' },
  { href: '/dashboard/clubs', label: 'Clubs', icon: '🤝' },
  { href: '/scholarships', label: 'Scholarships', icon: '🎓' },
  { href: '/housing', label: 'Housing', icon: '🏠' },
  { href: '/dashboard/chat', label: 'Messages', icon: '💬' },
  { href: '/dashboard/notifications', label: 'Notifications', icon: '🔔' },
  { href: '/profile', label: 'Profile', icon: '👤' },
]

const unread = NOTIFICATIONS.filter((n) => !n.read).length

export default function NotificationsPage() {
  return (
    <>
      <SiteNav />
      <div className={styles.layout}>
        <nav className={styles.sidebar} aria-label="Dashboard navigation">
          <div className={styles.sideUser}>
            <div className={styles.avatar}>A</div>
            <div>
              <p className={styles.userName}>Alex Martin</p>
              <p className={styles.userSchool}>UBC · 3rd year</p>
            </div>
          </div>
          <ul className={styles.sideLinks}>
            {NAV_LINKS.map(({ href, label, icon }) => (
              <li key={href}>
                <Link
                  href={href}
                  className={`${styles.sideLink} ${href === '/dashboard/notifications' ? styles.sideLinkActive : ''}`}
                >
                  <span className={styles.sideIcon}>{icon}</span>
                  {label}
                  {label === 'Notifications' && unread > 0 && (
                    <span className={notifStyles.badge}>{unread}</span>
                  )}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <main className={styles.main}>
          <div className={styles.topBar}>
            <div>
              <h1 className={styles.h1}>Notifications</h1>
              <p className={styles.sub}>
                {unread > 0 ? `${unread} unread` : 'All caught up'}
              </p>
            </div>
            {unread > 0 && (
              <button className={notifStyles.markAllBtn}>
                Mark all as read
              </button>
            )}
          </div>

          <div className={notifStyles.list}>
            {NOTIFICATIONS.map((n) => (
              <Link
                key={n.id}
                href={n.href}
                className={`${notifStyles.item} ${!n.read ? notifStyles.unread : ''}`}
              >
                <div className={`${notifStyles.iconWrap} ${notifStyles[n.type]}`}>
                  {n.icon}
                </div>
                <div className={notifStyles.content}>
                  <p className={notifStyles.title}>{n.title}</p>
                  <p className={notifStyles.body}>{n.body}</p>
                  <p className={notifStyles.time}>{n.time}</p>
                </div>
                {!n.read && <span className={notifStyles.unreadDot} aria-label="Unread" />}
              </Link>
            ))}
          </div>
        </main>
      </div>
    </>
  )
}
