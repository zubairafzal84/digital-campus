import type { Metadata } from 'next'
import Link from 'next/link'
import { SiteNav } from '@/components/layout/SiteNav'
import styles from './dashboard.module.css'

export const metadata: Metadata = {
  title: 'Dashboard | Digital Kampus',
  robots: { index: false, follow: false },
}

export default function DashboardPage() {
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
            {[
              { href: '/dashboard', label: 'Overview', icon: '◉' },
              { href: '/dashboard/grades', label: 'Grades', icon: '📊' },
              { href: '/dashboard/clubs', label: 'Clubs', icon: '🤝' },
              { href: '/scholarships', label: 'Scholarships', icon: '🎓' },
              { href: '/housing', label: 'Housing', icon: '🏠' },
              { href: '/dashboard/chat', label: 'Messages', icon: '💬' },
              { href: '/dashboard/notifications', label: 'Notifications', icon: '🔔' },
              { href: '/profile', label: 'Profile', icon: '👤' },
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
              <h1 className={styles.h1}>Good morning, Alex 👋</h1>
              <p className={styles.sub}>Here's what's happening at UBC today.</p>
            </div>
          </div>

          <div className={styles.grid}>
            {/* Grades card */}
            <section className={styles.card} aria-labelledby="grades-h">
              <div className={styles.cardHeader}>
                <h2 className={styles.cardH} id="grades-h">Current grades</h2>
                <Link href="/dashboard/grades" className={styles.cardLink}>View all →</Link>
              </div>
              <div className={styles.gradeList}>
                {[
                  { code: 'CPSC 310', name: 'Software Engineering', grade: 87, letter: 'A' },
                  { code: 'CPSC 340', name: 'ML & Data Mining', grade: 91, letter: 'A+' },
                  { code: 'MATH 221', name: 'Linear Algebra', grade: 78, letter: 'B+' },
                ].map(({ code, name, grade, letter }) => (
                  <div key={code} className={styles.gradeRow}>
                    <div className={styles.gradeInfo}>
                      <span className={styles.courseCode}>{code}</span>
                      <span className={styles.courseName}>{name}</span>
                    </div>
                    <div className={styles.gradeRight}>
                      <div className={styles.progressBar}>
                        <div className={styles.progressFill} style={{ width: `${grade}%` }} />
                      </div>
                      <span className={styles.gradeNum}>{grade}%</span>
                      <span className={styles.gradeLetter}>{letter}</span>
                    </div>
                  </div>
                ))}
              </div>
              <div className={styles.cardFooter}>
                <span className={styles.gpa}>GPA: 3.7 / 4.0</span>
                <span className={styles.gpaTrend}>↑ +0.1 this term</span>
              </div>
            </section>

            {/* Scholarships card */}
            <section className={styles.card} aria-labelledby="funding-h">
              <div className={styles.cardHeader}>
                <h2 className={styles.cardH} id="funding-h">Matched scholarships</h2>
                <Link href="/scholarships" className={styles.cardLink}>See all →</Link>
              </div>
              <div className={styles.fundingList}>
                {[
                  { name: 'Trek Excellence Scholarship', amount: 5000, match: 96, deadline: 'Jan 15' },
                  { name: 'UBC International Student Award', amount: 8000, match: 88, deadline: 'Feb 1' },
                  { name: 'BC Access Grant', amount: 4000, match: 82, deadline: 'Rolling' },
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
              <Link href="/scholarships" className={styles.ctaFull}>Match more scholarships →</Link>
            </section>

            {/* Clubs / social card */}
            <section className={styles.card} aria-labelledby="clubs-h">
              <div className={styles.cardHeader}>
                <h2 className={styles.cardH} id="clubs-h">Your clubs</h2>
                <Link href="/clubs" className={styles.cardLink}>Browse →</Link>
              </div>
              <div className={styles.clubList}>
                {[
                  { name: 'UBC Computer Science Club', members: 340, nextEvent: 'Hackathon — Nov 8' },
                  { name: 'UBC Hiking Club', members: 520, nextEvent: 'Garibaldi hike — Nov 2' },
                ].map(({ name, members, nextEvent }) => (
                  <div key={name} className={styles.clubRow}>
                    <div className={styles.clubIcon}>{name.charAt(0)}</div>
                    <div className={styles.clubInfo}>
                      <span className={styles.clubName}>{name}</span>
                      <span className={styles.clubMeta}>{members} members · {nextEvent}</span>
                    </div>
                  </div>
                ))}
              </div>
              <Link href="/clubs" className={styles.ctaFull}>Discover more clubs →</Link>
            </section>

            {/* Messages card */}
            <section className={styles.card} aria-labelledby="chat-h">
              <div className={styles.cardHeader}>
                <h2 className={styles.cardH} id="chat-h">Messages</h2>
                <Link href="/dashboard/chat" className={styles.cardLink}>Open inbox →</Link>
              </div>
              <div className={styles.msgList}>
                {[
                  { from: 'Jordan Lee', preview: 'Hey, are you going to the hackathon?', time: '2h ago', unread: true },
                  { from: 'CS Club Announcements', preview: 'New event posted: AI Workshop Nov 15', time: '5h ago', unread: true },
                  { from: 'Housing Office', preview: 'Your application has been received.', time: 'Yesterday', unread: false },
                ].map(({ from, preview, time, unread }) => (
                  <div key={from} className={`${styles.msgRow} ${unread ? styles.msgUnread : ''}`}>
                    <div className={styles.msgAvatar}>{from.charAt(0)}</div>
                    <div className={styles.msgInfo}>
                      <div className={styles.msgFrom}>{from} {unread && <span className={styles.unreadDot} />}</div>
                      <div className={styles.msgPreview}>{preview}</div>
                    </div>
                    <span className={styles.msgTime}>{time}</span>
                  </div>
                ))}
              </div>
            </section>
          </div>
        </main>
      </div>
    </>
  )
}
