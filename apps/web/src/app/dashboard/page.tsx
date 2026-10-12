import type { Metadata } from 'next'
import Link from 'next/link'
import { currentUser } from '@clerk/nextjs/server'
import { SiteNav } from '@/components/layout/SiteNav'
import styles from './dashboard.module.css'

export const metadata: Metadata = {
  title: 'Dashboard | Digital Kampus',
  robots: { index: false, follow: false },
}

export default async function DashboardPage() {
  const user = await currentUser()
  const firstName = user?.firstName ?? 'Student'
  const initials  = ((user?.firstName?.[0] ?? '') + (user?.lastName?.[0] ?? '')).toUpperCase() || 'DK'
  const avatarUrl = user?.imageUrl

  const hour = new Date().getHours()
  const greeting = hour < 12 ? 'Good morning' : hour < 18 ? 'Good afternoon' : 'Good evening'

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
              { href: '/dashboard',              label: 'Overview',       icon: '◉' },
              { href: '/dashboard/grades',       label: 'Grades',         icon: '📊' },
              { href: '/dashboard/clubs',        label: 'Clubs',          icon: '🤝' },
              { href: '/dashboard/scholarships', label: 'Scholarships',   icon: '🎓' },
              { href: '/dashboard/housing',       label: 'Housing',        icon: '🏠' },
              { href: '/dashboard/chat',         label: 'Messages',       icon: '💬' },
              { href: '/dashboard/notifications',label: 'Notifications',  icon: '🔔' },
              { href: '/profile',                label: 'Profile',        icon: '👤' },
            ].map(({ href, label, icon }) => (
              <li key={href}>
                <Link
                  href={href}
                  className={`${styles.sideLink} ${href === '/dashboard' ? styles.sideLinkActive : ''}`}
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
              <h1 className={styles.h1}>{greeting}, {firstName} 👋</h1>
              <p className={styles.sub}>Welcome to your Digital Kampus dashboard.</p>
            </div>
          </div>

          {/* Verification upsell */}
          <div className={styles.verifyBanner}>
            <span className={styles.verifyIcon}>🎓</span>
            <div>
              <strong>Verify your student status</strong> to unlock scholarship matching and trusted peer connections.
            </div>
            <Link href="/profile#education" className={styles.verifyBtn}>Verify now →</Link>
          </div>

          <div className={styles.grid}>
            {/* Scholarships card */}
            <section className={styles.card} aria-labelledby="funding-h">
              <div className={styles.cardHeader}>
                <h2 className={styles.cardH} id="funding-h">Matched scholarships</h2>
                <Link href="/dashboard/scholarships" className={styles.cardLink}>See all →</Link>
              </div>
              <div className={styles.fundingList}>
                {[
                  { name: 'Vanier Canada Graduate Scholarships', amount: 50000, match: 94, deadline: 'Nov 1' },
                  { name: 'NSERC Postgraduate Scholarships', amount: 21000, match: 87, deadline: 'Oct 15' },
                  { name: 'RBC Future Launch Scholarship', amount: 5000, match: 78, deadline: 'Apr 30' },
                ].map(({ name, amount, match, deadline }) => (
                  <div key={name} className={styles.fundingRow}>
                    <div className={styles.fundingInfo}>
                      <span className={styles.fundingName}>{name}</span>
                      <span className={styles.fundingDeadline}>Deadline: {deadline}</span>
                    </div>
                    <div className={styles.fundingRight}>
                      <span className={styles.matchBadge}>{match}% match</span>
                      <span className={styles.fundingAmt}>${amount.toLocaleString()}</span>
                    </div>
                  </div>
                ))}
              </div>
              <p className={styles.freeNote}>Scholarship matching is always free.</p>
              <Link href="/dashboard/scholarships" className={styles.ctaFull}>View all matched scholarships →</Link>
            </section>

            {/* Grades card */}
            <section className={styles.card} aria-labelledby="grades-h">
              <div className={styles.cardHeader}>
                <h2 className={styles.cardH} id="grades-h">Grades</h2>
                <Link href="/dashboard/grades" className={styles.cardLink}>View all →</Link>
              </div>
              <div className={styles.emptyState}>
                <span className={styles.emptyIcon}>📊</span>
                <p>Add your courses to start tracking grades.</p>
                <Link href="/dashboard/grades" className={styles.emptyLink}>Add courses →</Link>
              </div>
            </section>

            {/* Clubs card */}
            <section className={styles.card} aria-labelledby="clubs-h">
              <div className={styles.cardHeader}>
                <h2 className={styles.cardH} id="clubs-h">Clubs</h2>
                <Link href="/clubs" className={styles.cardLink}>Browse →</Link>
              </div>
              <div className={styles.emptyState}>
                <span className={styles.emptyIcon}>🤝</span>
                <p>Join clubs to meet students with shared interests.</p>
                <Link href="/clubs" className={styles.emptyLink}>Browse clubs →</Link>
              </div>
            </section>

            {/* Messages card */}
            <section className={styles.card} aria-labelledby="chat-h">
              <div className={styles.cardHeader}>
                <h2 className={styles.cardH} id="chat-h">Messages</h2>
                <Link href="/dashboard/chat" className={styles.cardLink}>Open inbox →</Link>
              </div>
              <div className={styles.emptyState}>
                <span className={styles.emptyIcon}>💬</span>
                <p>Connect with students to start messaging.</p>
                <Link href="/schools" className={styles.emptyLink}>Find students →</Link>
              </div>
            </section>
          </div>
        </main>
      </div>
    </>
  )
}
