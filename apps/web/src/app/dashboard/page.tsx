import type { Metadata } from 'next'
import Link from 'next/link'
import { currentUser } from '@clerk/nextjs/server'
import SeasonalBanner from './SeasonalBanner'
import OnboardingModal from './OnboardingModal'
import styles from './dashboard.module.css'

export const metadata: Metadata = {
  title: 'Dashboard | Digital Kampus',
  robots: { index: false, follow: false },
}

const EVENTS = [
  {
    club: 'UBC Debate Club',
    event: 'Newcomers tournament',
    date: 'This Friday',
    location: 'Irving K. Barber Learning Centre',
    link: '/clubs/ubc-debate-society',
  },
  {
    club: 'U of T Engineering Society',
    event: 'Skule Night showcase',
    date: 'Saturday Nov 8',
    location: 'Convocation Hall',
    link: '/clubs/uoft-engineering-society',
  },
  {
    club: 'McGill Debating Union',
    event: 'Open tournament',
    date: 'Nov 14',
    location: 'Leacock Building',
    link: '/clubs/mcgill-debating-union',
  },
  {
    club: 'SFU Hiking Club',
    event: 'Garibaldi day hike',
    date: 'Nov 2',
    location: 'Meet at SFU Transit Loop',
    link: '/clubs/sfu-hiking-club',
  },
  {
    club: 'Waterloo Data Science Club',
    event: 'Fall hackathon kickoff',
    date: 'Nov 1',
    location: 'Math 3 Building',
    link: '/clubs/uwaterloo-data-science-club',
  },
]

export default async function DashboardPage() {
  const user = await currentUser()
  const firstName = user?.firstName ?? 'Student'

  const hour = new Date().getHours()
  const greeting = hour < 12 ? 'Good morning' : hour < 18 ? 'Good afternoon' : 'Good evening'

  return (
    <>
      <OnboardingModal />

      <div className={styles.topBar}>
        <div>
          <h1 className={styles.h1}>{greeting}, {firstName} 👋</h1>
          <p className={styles.sub}>Welcome to your Digital Kampus dashboard.</p>
        </div>
      </div>

      {/* Quick stats bar */}
      <div className={styles.statsBar}>
        <div className={styles.statChip}>
          <span className={styles.statNum}>6</span>
          <span className={styles.statLabel}>scholarships matched</span>
        </div>
        <div className={styles.statChip}>
          <span className={styles.statNum}>180+</span>
          <span className={styles.statLabel}>clubs near you</span>
        </div>
        <div className={styles.statChip}>
          <span className={styles.statNum}>2.4k+</span>
          <span className={styles.statLabel}>students on campus</span>
        </div>
      </div>

      <SeasonalBanner yearOfStudy={null} />

      {/* Verification upsell */}
      <div className={styles.verifyBanner}>
        <span className={styles.verifyIcon}>🎓</span>
        <div>
          <strong>Verify your student status</strong> to unlock scholarship matching and trusted peer connections.
        </div>
        <Link href="/profile#education" className={styles.verifyBtn}>Verify now →</Link>
      </div>

      {/* What's on this week */}
      <section className={styles.eventsSection} aria-labelledby="events-h">
        <div className={styles.eventsSectionHeader}>
          <h2 className={styles.sectionTitle} id="events-h">What&rsquo;s on this week</h2>
          <Link href="/clubs" className={styles.cardLink}>See all clubs →</Link>
        </div>
        <div className={styles.eventsScroll}>
          {EVENTS.map(({ club, event, date, location, link }) => (
            <Link key={link} href={link} className={styles.eventCard}>
              <span className={styles.eventDate}>{date}</span>
              <span className={styles.eventName}>{event}</span>
              <span className={styles.eventClub}>{club}</span>
              <span className={styles.eventLocation}>📍 {location}</span>
            </Link>
          ))}
        </div>
      </section>

      <div className={styles.grid}>
        {/* Scholarships card — spans 2 cols on desktop */}
        <section className={`${styles.card} ${styles.cardScholarships}`} aria-labelledby="funding-h">
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

        {/* Study Groups card */}
        <section className={styles.card} aria-labelledby="study-h">
          <div className={styles.cardHeader}>
            <h2 className={styles.cardH} id="study-h">Study Groups</h2>
            <Link href="/study-groups" className={styles.cardLink}>Browse →</Link>
          </div>
          <div className={styles.emptyState}>
            <span className={styles.emptyIcon}>🎥</span>
            <p>Join a video study group with classmates.</p>
            <Link href="/study-groups" className={styles.emptyLink}>Browse study rooms →</Link>
          </div>
        </section>

        {/* Rate a Professor card */}
        <section className={styles.card} aria-labelledby="professors-h">
          <div className={styles.cardHeader}>
            <h2 className={styles.cardH} id="professors-h">Rate a Professor</h2>
            <Link href="/professors" className={styles.cardLink}>Browse →</Link>
          </div>
          <div className={styles.emptyState}>
            <span className={styles.emptyIcon}>🎓</span>
            <p>Share your experience with a professor.</p>
            <Link href="/professors" className={styles.emptyLink}>Rate a professor →</Link>
          </div>
        </section>
      </div>
    </>
  )
}
