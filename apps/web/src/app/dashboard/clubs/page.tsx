import type { Metadata } from 'next'
import Link from 'next/link'
import { CLUBS } from '../../clubs/clubs-data'
import styles from '../dashboard.module.css'
import clubStyles from './clubs.module.css'

export const metadata: Metadata = {
  title: 'My Clubs | Digital Kampus',
  robots: { index: false, follow: false },
}

const ICON_MAP: Record<string, string> = {
  'Student Government': '🏛️',
  Academic: '📚',
  Cultural: '🌐',
  Sports: '⚽',
  Arts: '🎨',
  Tech: '💻',
  Community: '🤝',
  Environment: '🌿',
  Politics: '🗳️',
  Media: '📰',
}

// Pick 4 varied suggested clubs from different universities
const SUGGESTED = CLUBS.slice(0, 4).map((c) => ({
  ...c,
  icon: ICON_MAP[c.category] ?? '🤝',
}))

export default function DashboardClubsPage() {
  return (
    <>
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
          Memberships <span className={clubStyles.count}>0</span>
        </h2>
        <div className={clubStyles.emptyMemberships}>
          <span className={clubStyles.emptyMembershipsIcon}>🤝</span>
          <p>You have not joined any clubs yet.</p>
          <Link href="/clubs" className={styles.emptyLink}>Browse clubs →</Link>
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
                    <span>{c.members.toLocaleString()} members</span>
                    <span>·</span>
                    <span>{c.university}</span>
                  </div>
                </div>
              </div>
              <div className={clubStyles.clubActions}>
                <Link href={`/clubs/${c.universitySlug}`} className={clubStyles.joinBtn}>Explore →</Link>
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
            List your organization on Digital Kampus to reach students across Canada.
          </p>
        </div>
        <Link href="/clubs/register" className={clubStyles.ctaBtn}>
          Register your club →
        </Link>
      </div>
    </>
  )
}
