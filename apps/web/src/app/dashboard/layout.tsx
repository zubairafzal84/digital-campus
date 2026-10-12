'use client'

import { usePathname } from 'next/navigation'
import Link from 'next/link'
import { useUser } from '@clerk/nextjs'
import { SiteNav } from '@/components/layout/SiteNav'
import OnboardingModal from './OnboardingModal'
import styles from './dashboard.module.css'

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

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()
  const { user } = useUser()

  const firstName  = user?.firstName ?? 'Student'
  const fullName   = [user?.firstName, user?.lastName].filter(Boolean).join(' ') || 'Student'
  const initials   = ((user?.firstName?.[0] ?? '') + (user?.lastName?.[0] ?? '')).toUpperCase() || 'DK'
  const avatarUrl  = user?.imageUrl

  function isActive(href: string) {
    if (href === '/dashboard') return pathname === '/dashboard'
    return pathname.startsWith(href)
  }

  return (
    <>
      <SiteNav />
      <OnboardingModal />
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
              <p className={styles.userName}>{fullName}</p>
              <p className={styles.userSchool}>Digital Kampus</p>
            </div>
          </div>
          <ul className={styles.sideLinks}>
            {NAV_LINKS.map(({ href, label, icon }) => (
              <li key={href}>
                <Link
                  href={href}
                  className={`${styles.sideLink}${isActive(href) ? ` ${styles.sideLinkActive}` : ''}`}
                >
                  <span className={styles.sideIcon}>{icon}</span>
                  {label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <main className={styles.main}>
          {children}
        </main>
      </div>
    </>
  )
}
