import type { Metadata } from 'next'
import Link from 'next/link'
import { SiteNav } from '@/components/layout/SiteNav'
import styles from '../dashboard.module.css'
import clubStyles from './clubs.module.css'

export const metadata: Metadata = {
  title: 'My Clubs | Digital Kampus',
  robots: { index: false, follow: false },
}

const MY_CLUBS = [
  {
    id: 1,
    name: 'UBC Robotics Club',
    category: 'Technology',
    role: 'Member',
    members: 120,
    nextEvent: 'Build session — Fri Nov 22, 6 PM',
    eventLocation: 'ICCS 246',
    icon: '🤖',
  },
  {
    id: 2,
    name: 'UBC Photography Club',
    category: 'Arts',
    role: 'Member',
    members: 67,
    nextEvent: 'Photo walk — Sun Nov 24, 10 AM',
    eventLocation: 'Meeting at main gates',
    icon: '📷',
  },
]

const SUGGESTED = [
  {
    id: 3,
    name: 'UBC Debate Society',
    category: 'Academic',
    members: 85,
    description: 'Competitive and recreational debate in parliamentary formats. Open to all experience levels.',
    icon: '🎤',
  },
  {
    id: 4,
    name: 'UBC Sustainability Network',
    category: 'Community',
    members: 143,
    description: 'Campus sustainability initiatives, community gardens, and advocacy.',
    icon: '🌱',
  },
  {
    id: 5,
    name: 'UBC Entrepreneurship Club',
    category: 'Professional',
    members: 190,
    description: 'Speaker series, pitch competitions, and mentorship from local founders.',
    icon: '🚀',
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

export default function DashboardClubsPage() {
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
                  className={`${styles.sideLink} ${href === '/dashboard/clubs' ? styles.sideLinkActive : ''}`}
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
              <h1 className={styles.h1}>My Clubs</h1>
              <p className={styles.sub}>Your memberships and upcoming club events.</p>
            </div>
            <Link href="/clubs" className={clubStyles.browseBtn}>Browse all clubs →</Link>
          </div>

          {/* My memberships */}
          <section className={clubStyles.section} aria-labelledby="my-clubs-h">
            <h2 className={clubStyles.sectionH} id="my-clubs-h">
              Memberships <span className={clubStyles.count}>{MY_CLUBS.length}</span>
            </h2>
            <div className={clubStyles.myList}>
              {MY_CLUBS.map((c) => (
                <div key={c.id} className={clubStyles.myCard}>
                  <div className={clubStyles.myCardTop}>
                    <div className={clubStyles.clubIconWrap}>{c.icon}</div>
                    <div className={clubStyles.clubInfo}>
                      <p className={clubStyles.clubName}>{c.name}</p>
                      <div className={clubStyles.clubMeta}>
                        <span className={clubStyles.category}>{c.category}</span>
                        <span>·</span>
                        <span>{c.members} members</span>
                        <span>·</span>
                        <span className={clubStyles.roleBadge}>{c.role}</span>
                      </div>
                    </div>
                  </div>
                  {c.nextEvent && (
                    <div className={clubStyles.nextEvent}>
                      <span className={clubStyles.eventLabel}>Next event</span>
                      <span className={clubStyles.eventName}>{c.nextEvent}</span>
                      <span className={clubStyles.eventLoc}>{c.eventLocation}</span>
                    </div>
                  )}
                  <div className={clubStyles.myCardFooter}>
                    <Link href="/clubs" className={clubStyles.viewLink}>View club →</Link>
                    <button className={clubStyles.leaveBtn}>Leave club</button>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* Suggested */}
          <section className={clubStyles.section} aria-labelledby="suggested-h">
            <h2 className={clubStyles.sectionH} id="suggested-h">Suggested for you</h2>
            <div className={clubStyles.suggestedGrid}>
              {SUGGESTED.map((c) => (
                <div key={c.id} className={clubStyles.sugCard}>
                  <div className={clubStyles.sugTop}>
                    <div className={clubStyles.sugIcon}>{c.icon}</div>
                    <span className={clubStyles.sugCategory}>{c.category}</span>
                  </div>
                  <p className={clubStyles.sugName}>{c.name}</p>
                  <p className={clubStyles.sugDesc}>{c.description}</p>
                  <div className={clubStyles.sugFooter}>
                    <span className={clubStyles.sugMembers}>{c.members} members</span>
                    <button className={clubStyles.joinBtn}>Join →</button>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* Register your own */}
          <section className={clubStyles.registerCta}>
            <div className={clubStyles.registerBox}>
              <div>
                <p className={clubStyles.registerH}>Running a club?</p>
                <p className={clubStyles.registerP}>List your organization on Digital Kampus to reach students at UBC and beyond.</p>
              </div>
              <Link href="/clubs/register" className={clubStyles.registerBtn}>Register your club →</Link>
            </div>
          </section>
        </main>
      </div>
    </>
  )
}
