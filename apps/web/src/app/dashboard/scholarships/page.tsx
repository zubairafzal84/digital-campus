import type { Metadata } from 'next'
import Link from 'next/link'
import styles from '../dashboard.module.css'
import schStyles from './scholarships.module.css'

export const metadata: Metadata = {
  title: 'My Scholarships | Digital Kampus',
  robots: { index: false, follow: false },
}

const NAV_LINKS = [
  { href: '/dashboard', label: 'Overview', icon: '🏠' },
  { href: '/dashboard/scholarships', label: 'Scholarships', icon: '🎓' },
  { href: '/dashboard/clubs', label: 'Clubs', icon: '🤝' },
  { href: '/dashboard/notifications', label: 'Notifications', icon: '🔔' },
  { href: '/profile', label: 'Profile', icon: '👤' },
]

const MATCHED: Award[] = [
  {
    id: '1',
    name: 'TD Bank Future Leaders Scholarship',
    amount: 10000,
    deadline: '2027-01-15',
    status: 'open',
    matchScore: 94,
    sponsor: 'TD Bank',
    note: 'Strong match: STEM major, first-generation student, Ontario resident',
  },
  {
    id: '2',
    name: 'Loran Award',
    amount: 100000,
    deadline: '2026-11-01',
    status: 'open',
    matchScore: 88,
    sponsor: 'Loran Scholars Foundation',
    note: 'Strong match: demonstrated leadership, academic excellence',
  },
  {
    id: '3',
    name: 'RBC Future Launch Scholarship',
    amount: 5000,
    deadline: '2026-12-31',
    status: 'open',
    matchScore: 82,
    sponsor: 'RBC',
    note: 'Match: undergraduate student, community involvement',
  },
  {
    id: '4',
    name: 'Indspire Post-Secondary Award',
    amount: 7500,
    deadline: '2027-03-31',
    status: 'open',
    matchScore: 0,
    sponsor: 'Indspire',
    note: 'Complete verification to unlock eligibility check',
    requiresVerification: true,
  },
]

const APPLIED: Award[] = [
  {
    id: '5',
    name: 'UBC Science Entrance Scholarship',
    amount: 4000,
    deadline: '2026-10-01',
    status: 'applied',
    matchScore: 91,
    sponsor: 'University of British Columbia',
    note: 'Submitted 2026-09-28',
  },
]

interface Award {
  id: string
  name: string
  amount: number
  deadline: string
  status: string
  matchScore: number
  sponsor: string
  note: string
  requiresVerification?: boolean
}

function formatDeadline(iso: string) {
  return new Date(iso).toLocaleDateString('en-CA', { year: 'numeric', month: 'short', day: 'numeric' })
}

export default function DashboardScholarshipsPage() {
  return (
    <div className={styles.shell}>
      <nav className={styles.sidebar}>
        <Link href="/" className={styles.sideBrand}>DK</Link>
        {NAV_LINKS.map((l) => (
          <Link
            key={l.href}
            href={l.href}
            className={`${styles.sideLink} ${l.href === '/dashboard/scholarships' ? styles.sideLinkActive : ''}`}
          >
            <span>{l.icon}</span>
            <span>{l.label}</span>
          </Link>
        ))}
      </nav>

      <main className={styles.content}>
        <header className={styles.pageHeader}>
          <div>
            <h1 className={styles.pageTitle}>Scholarships</h1>
            <p className={styles.pageSub}>Matching is always free. Deadlines are in your time zone.</p>
          </div>
          <Link href="/scholarships" className={schStyles.browseBtn}>Browse all awards →</Link>
        </header>

        <div className={schStyles.freeNote}>
          🎓 Scholarship and bursary matching is permanently free for all students on Digital Kampus.
        </div>

        {MATCHED.length > 0 && (
          <section className={schStyles.section}>
            <h2 className={schStyles.sectionH}>Matched for you</h2>
            <div className={schStyles.list}>
              {MATCHED.map((award) => (
                <div key={award.id} className={schStyles.card}>
                  <div className={schStyles.cardTop}>
                    <div className={schStyles.cardMeta}>
                      <span className={schStyles.sponsor}>{award.sponsor}</span>
                      {award.matchScore > 0 && (
                        <span className={schStyles.score}>{award.matchScore}% match</span>
                      )}
                      {award.requiresVerification && (
                        <span className={schStyles.locked}>🔒 Verify to check</span>
                      )}
                    </div>
                    <span className={schStyles.amount}>${award.amount.toLocaleString()}</span>
                  </div>
                  <h3 className={schStyles.cardName}>{award.name}</h3>
                  <p className={schStyles.cardNote}>{award.note}</p>
                  <div className={schStyles.cardFooter}>
                    <span className={schStyles.deadline}>
                      Deadline: {formatDeadline(award.deadline)}
                    </span>
                    {award.requiresVerification ? (
                      <Link href="/dashboard/profile" className={schStyles.btnVerify}>Complete profile →</Link>
                    ) : (
                      <Link href={`/scholarships`} className={schStyles.btnApply}>View & apply →</Link>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}

        {APPLIED.length > 0 && (
          <section className={schStyles.section}>
            <h2 className={schStyles.sectionH}>Applied</h2>
            <div className={schStyles.list}>
              {APPLIED.map((award) => (
                <div key={award.id} className={`${schStyles.card} ${schStyles.cardApplied}`}>
                  <div className={schStyles.cardTop}>
                    <div className={schStyles.cardMeta}>
                      <span className={schStyles.sponsor}>{award.sponsor}</span>
                      <span className={schStyles.statusPill}>Applied</span>
                    </div>
                    <span className={schStyles.amount}>${award.amount.toLocaleString()}</span>
                  </div>
                  <h3 className={schStyles.cardName}>{award.name}</h3>
                  <p className={schStyles.cardNote}>{award.note}</p>
                </div>
              ))}
            </div>
          </section>
        )}

        <section className={schStyles.section}>
          <div className={schStyles.verifyBanner}>
            <div>
              <h3 className={schStyles.verifyH}>Unlock more matches</h3>
              <p className={schStyles.verifyP}>
                Verifying your enrollment and completing your profile improves matching accuracy and
                unlocks need-based bursaries and institution-specific awards.
              </p>
            </div>
            <Link href="/profile" className={schStyles.btnPrimary}>Complete profile →</Link>
          </div>
        </section>
      </main>
    </div>
  )
}
