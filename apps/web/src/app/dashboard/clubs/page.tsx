import type { Metadata } from 'next'
import Link from 'next/link'
import { currentUser } from '@clerk/nextjs/server'
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

export default async function DashboardClubsPage() {
  const user = await currentUser()

  const fullName = user
    ? [user.firstName, user.lastName].filter(Boolean).join(' ')
    : 'Student'
  const initials = fullName
    .split(' ')
    .map((n) => n[0])
    .join('')
    .toUpperCase()
    .slice(0, 2)

  return (
    <>
      <SiteNav />
      <div className={styles.layout}>
        <nav className={styles.sidebar} aria-label="Dashboard navigation">
          <div className={styles.sideUser}>
            {user?.imageUrl ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img
                src={user.imageUrl}
                alt={fullName}
                className={styles.avatar}
                style={{ objectFit: 'cover' }}
              />
            ) : (
              <div className={styles.avatar}>{initials}</div>
            )}
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
            <div className={clubStyles.clubList}>
              {MY_CLUBS.map((c) => (
                <div key={c.id} className={clubStyles.clubCard}>
                  <div className={clubStyles.clubLeft}>
                    <div className={clubStyles.clubIcon}>{c.icon}</div>
                    <div className={clubStyles.clubInfo}>
                      <div className={clubStyles.clubTop}>
                        <p className={clubStyles.clubName}>{c.name}</p>
                        <span className={clubStyles.roleBadge}>{c.role}</span>
                      </div>
                      <div className={clubStyles.clubMeta}>
                        <span className={clubStyles.categoryBadge}>{c.category}</span>
                        <span>·</span>
                        <span>{c.members} members</span>
                      </div>
                    </div>
                  </div>
                  {c.nextEvent && (
                    <div className={clubStyles.nextEvent}>
                      <span className={clubStyles.nextEventLabel}>Next event</span>
                      <span className={clubStyles.nextEventName}>{c.nextEvent}</span>
                      <span className={clubStyles.nextEventLoc}>{c.eventLocation}</span>
                    </div>
                  )}
                  <div className={clubStyles.clubActions}>
                    <Link href="/clubs" className={clubStyles.viewBtn}>View club →</Link>
                    <button className={clubStyles.leaveBtn}>Leave</button>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* Suggested for you */}
          <section className={clubStyles.section} aria-labelledby="suggested-h">
            <h2 className={clubStyles.sectionH} id="suggested-h">Suggested for you</h2>
            <div className={clubStyles.clubList}>
              {SUGGESTED.map((c) => (
                <div key={c.id} className={clubStyles.clubCard}>
                  <div className={clubStyles.clubLeft}>
                    <div className={clubStyles.clubIconSuggested}>{c.icon}</div>
                    <div className={clubStyles.clubInfo}>
                      <div className={clubStyles.clubTop}>
                        <p className={clubStyles.clubName}>{c.name}</p>
                        <span className={clubStyles.categoryBadge}>{c.category}</span>
                      </div>
                      <p className={clubStyles.clubDesc}>{c.description}</p>
                      <div className={clubStyles.clubMeta}>
                        <span>{c.members} members</span>
                      </div>
                    </div>
                  </div>
                  <div className={clubStyles.clubActions}>
                    <button className={clubStyles.joinBtn}>Join →</button>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* Running a club CTA */}
          <div className={clubStyles.ctaBox}>
            <div className={clubStyles.ctaText}>
              <p className={clubStyles.ctaHeading}>Running a club?</p>
              <p className={clubStyles.ctaSub}>
                List your organization on Digital Kampus to reach students at UBC and beyond.
              </p>
            </div>
            <Link href="/clubs/register" className={clubStyles.ctaBtn}>
              Register your club →
            </Link>
          </div>
        </main>
      </div>
    </>
  )
}
