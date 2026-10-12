import type { Metadata } from 'next'
import Link from 'next/link'
import { currentUser } from '@clerk/nextjs/server'
import { SiteNav } from '@/components/layout/SiteNav'
import styles from '../dashboard.module.css'
import schStyles from './scholarships.module.css'

export const metadata: Metadata = {
  title: 'Scholarships | Dashboard | Digital Kampus',
  robots: { index: false, follow: false },
}

const SCHOLARSHIPS = [
  {
    name: 'Vanier Canada Graduate Scholarships',
    amount: 50000,
    match: 94,
    deadline: 'Nov 1',
    href: '/scholarships/vanier-cgs',
    type: 'Graduate',
  },
  {
    name: 'NSERC Postgraduate Scholarships-D',
    amount: 21000,
    match: 87,
    deadline: 'Oct 15',
    href: '/scholarships/nserc-pgsd',
    type: 'Graduate',
  },
  {
    name: 'RBC Future Launch Scholarship',
    amount: 5000,
    match: 78,
    deadline: 'Apr 30',
    href: '/scholarships/rbc-future-launch',
    type: 'Undergraduate',
  },
  {
    name: 'Trudeau Foundation Scholarship',
    amount: 60000,
    match: 71,
    deadline: 'Dec 1',
    href: '/scholarships/trudeau-foundation',
    type: 'Graduate',
  },
  {
    name: 'Ontario Graduate Scholarship',
    amount: 15000,
    match: 68,
    deadline: 'Feb 1',
    href: '/scholarships/ontario-grad',
    type: 'Graduate',
  },
  {
    name: 'SSHRC Doctoral Fellowship',
    amount: 20000,
    match: 63,
    deadline: 'Oct 15',
    href: '/scholarships/sshrc-doctoral',
    type: 'Graduate',
  },
]

export default async function DashboardScholarshipsPage() {
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
              <p className={styles.userName}>{user ? `${user.firstName ?? ''} ${user.lastName ?? ''}`.trim() : 'Student'}</p>
              <p className={styles.userSchool}>Digital Kampus</p>
            </div>
          </div>
          <ul className={styles.sideLinks}>
            {[
              { href: '/dashboard',               label: 'Overview',      icon: '◉' },
              { href: '/dashboard/grades',        label: 'Grades',        icon: '📊' },
              { href: '/dashboard/clubs',         label: 'Clubs',         icon: '🤝' },
              { href: '/dashboard/scholarships',  label: 'Scholarships',  icon: '🎓' },
              { href: '/dashboard/housing',       label: 'Housing',       icon: '🏠' },
              { href: '/dashboard/chat',          label: 'Messages',      icon: '💬' },
              { href: '/dashboard/notifications', label: 'Notifications', icon: '🔔' },
              { href: '/profile',                 label: 'Profile',       icon: '👤' },
            ].map(({ href, label, icon }) => (
              <li key={href}>
                <Link
                  href={href}
                  className={`${styles.sideLink} ${href === '/dashboard/scholarships' ? styles.sideLinkActive : ''}`}
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
              <h1 className={styles.h1}>Scholarships</h1>
              <p className={styles.sub}>Matched awards sorted by fit. Apply before each deadline.</p>
            </div>
          </div>

          <div className={schStyles.freeNotice} role="note">
            <span className={schStyles.freeIcon}>🎓</span>
            <strong>Scholarship matching is always free — we never charge students.</strong>
          </div>

          <section aria-label="Matched scholarships">
            <div className={schStyles.list}>
              {SCHOLARSHIPS.map((s) => (
                <div key={s.href} className={schStyles.card}>
                  <div className={schStyles.cardTop}>
                    <div className={schStyles.badges}>
                      <span className={schStyles.matchBadge}>{s.match}% match</span>
                      <span className={schStyles.typeBadge}>{s.type}</span>
                    </div>
                    <span className={schStyles.amount}>${s.amount.toLocaleString()}</span>
                  </div>
                  <h2 className={schStyles.cardName}>{s.name}</h2>
                  <div className={schStyles.cardFooter}>
                    <span className={schStyles.deadline}>Deadline: {s.deadline}</span>
                    <Link href={s.href} className={schStyles.viewBtn}>View details →</Link>
                  </div>
                </div>
              ))}
            </div>
          </section>
        </main>
      </div>
    </>
  )
}
