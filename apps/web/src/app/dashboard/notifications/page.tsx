import type { Metadata } from 'next'
import Link from 'next/link'
import { currentUser } from '@clerk/nextjs/server'
import { SiteNav } from '@/components/layout/SiteNav'
import NotificationsList from './NotificationsList'
import styles from '../dashboard.module.css'

export const metadata: Metadata = {
  title: 'Notifications | Digital Kampus',
  robots: { index: false, follow: false },
}

const NAV_LINKS = [
  { href: '/dashboard',               label: 'Overview',      icon: '◉' },
  { href: '/dashboard/grades',        label: 'Grades',        icon: '📊' },
  { href: '/dashboard/clubs',         label: 'Clubs',         icon: '🤝' },
  { href: '/dashboard/scholarships',  label: 'Scholarships',  icon: '🎓' },
  { href: '/dashboard/housing',       label: 'Housing',       icon: '🏠' },
  { href: '/dashboard/chat',          label: 'Messages',      icon: '💬' },
  { href: '/dashboard/notifications', label: 'Notifications', icon: '🔔' },
  { href: '/profile',                 label: 'Profile',       icon: '👤' },
]

export default async function NotificationsPage() {
  const user = await currentUser()
  const firstName = user?.firstName ?? 'Student'
  const initials = ((user?.firstName?.[0] ?? '') + (user?.lastName?.[0] ?? '')).toUpperCase() || 'DK'
  const avatarUrl = user?.imageUrl

  return (
    <>
      <SiteNav />
      <div className={styles.layout}>
        <nav className={styles.sidebar} aria-label="Dashboard navigation">
          <div className={styles.sideUser}>
            <div className={styles.avatarWrap}>
              {avatarUrl
                ? <img src={avatarUrl} alt={firstName} className={styles.avatarImg} />
                : <div className={styles.avatar}>{initials}</div>
              }
            </div>
            <div>
              <p className={styles.userName}>
                {user ? `${user.firstName ?? ''} ${user.lastName ?? ''}`.trim() : 'Student'}
              </p>
              <p className={styles.userSchool}>Digital Kampus</p>
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
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <main className={styles.main}>
          <div className={styles.topBar}>
            <div>
              <h1 className={styles.h1}>Notifications</h1>
            </div>
          </div>

          <NotificationsList />
        </main>
      </div>
    </>
  )
}
