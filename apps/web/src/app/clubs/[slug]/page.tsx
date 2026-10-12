import type { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { SiteNav } from '@/components/layout/SiteNav'
import { SiteFooter } from '@/components/layout/SiteFooter'
import styles from './clubs-detail.module.css'

interface ClubEvent {
  title: string
  date: string
  location: string
}

interface Club {
  slug: string
  name: string
  school: string
  category: string
  members: number
  founded: number
  description: string
  events: ClubEvent[]
}

const CLUBS: Club[] = [
  {
    slug: 'ubc-computer-science-club',
    name: 'UBC Computer Science Club',
    school: 'UBC',
    category: 'Tech',
    members: 340,
    founded: 2008,
    description:
      'Weekly socials, hackathons, career panels, and industry talks. Open to all CS and engineering students.',
    events: [
      { title: 'Annual Hackathon', date: 'Nov 8–9', location: 'ESB 1013' },
      { title: 'Industry Panel', date: 'Nov 15 6 PM', location: 'ICCS 246' },
    ],
  },
  {
    slug: 'mcgill-debating-union',
    name: 'McGill Debating Union',
    school: 'McGill',
    category: 'Academic',
    members: 210,
    founded: 1952,
    description: 'Competitive and recreational debating in English and French.',
    events: [
      { title: 'Open Tournament', date: 'Nov 14–15', location: 'Leacock Building' },
    ],
  },
  {
    slug: 'uoft-muslim-students-association',
    name: 'UofT Muslim Students Association',
    school: 'UofT',
    category: 'Cultural',
    members: 650,
    founded: 1969,
    description:
      'Community, events, and support for Muslim students at all three UofT campuses.',
    events: [
      { title: 'Halal Food Fair', date: 'Nov 5 11 AM – 3 PM', location: 'Bahen Centre Atrium' },
    ],
  },
  {
    slug: 'sfu-hiking-club',
    name: 'SFU Hiking Club',
    school: 'SFU',
    category: 'Sports',
    members: 520,
    founded: 1973,
    description:
      'Weekend hikes across the Lower Mainland, Whistler, and Sea-to-Sky. All fitness levels welcome.',
    events: [
      { title: 'Garibaldi Lake Day Hike', date: 'Nov 2 7 AM', location: 'SFU West Mall' },
      { title: 'Cypress Bowl Snowshoe', date: 'Dec 7', location: 'SFU West Mall' },
    ],
  },
  {
    slug: 'carleton-film-collective',
    name: 'Carleton Film Collective',
    school: 'Carleton',
    category: 'Arts',
    members: 120,
    founded: 2015,
    description:
      'Student filmmaking, screenings, and production workshops. Equipment loans and editing suite access.',
    events: [
      { title: 'Short Film Night', date: 'Nov 10 7 PM', location: 'Richcraft Hall 2200' },
    ],
  },
  {
    slug: 'ualberta-sustainability-network',
    name: 'UAlberta Sustainability Network',
    school: 'UAlberta',
    category: 'Environment',
    members: 180,
    founded: 2010,
    description:
      'Campus sustainability initiatives, green campaigns, and community garden.',
    events: [
      { title: 'Climate Action Summit', date: 'Nov 18 9 AM – 5 PM', location: 'SUB Ballroom' },
    ],
  },
]

function getClub(slug: string): Club | undefined {
  return CLUBS.find((c) => c.slug === slug)
}

export function generateStaticParams() {
  return CLUBS.map((c) => ({ slug: c.slug }))
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>
}): Promise<Metadata> {
  const { slug } = await params
  const club = getClub(slug)
  if (!club) return { title: 'Club Not Found | Digital Kampus' }

  return {
    title: `${club.name} | Digital Kampus`,
    description: club.description,
    alternates: {
      canonical: `https://digitalkampus.ca/clubs/${club.slug}`,
      languages: {
        'en-CA': `https://digitalkampus.ca/clubs/${club.slug}`,
        'fr-CA': `https://digitalkampus.ca/fr/clubs/${club.slug}`,
      },
    },
  }
}

export default async function ClubDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  const club = getClub(slug)
  if (!club) notFound()

  return (
    <>
      <SiteNav />
      <main>
        {/* Hero */}
        <section className={styles.hero}>
          <div className={styles.inner}>
            <nav className={styles.breadcrumb} aria-label="Breadcrumb">
              <Link href="/">Home</Link>
              <span aria-hidden="true"> › </span>
              <Link href="/clubs">Clubs</Link>
              <span aria-hidden="true"> › </span>
              <span aria-current="page">{club.name}</span>
            </nav>

            <div className={styles.heroBody}>
              <div className={styles.clubIcon} aria-hidden="true">
                {club.name.charAt(0)}
              </div>
              <div className={styles.heroText}>
                <div className={styles.heroMeta}>
                  <span className={styles.categoryBadge}>{club.category}</span>
                  <span className={styles.schoolBadge}>{club.school}</span>
                </div>
                <h1 className={styles.h1}>{club.name}</h1>
                <div className={styles.stats}>
                  <span className={styles.stat}>
                    <strong>{club.members.toLocaleString()}</strong> members
                  </span>
                  <span className={styles.statDivider} aria-hidden="true">·</span>
                  <span className={styles.stat}>
                    Founded <strong>{club.founded}</strong>
                  </span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* About */}
        <section className={styles.section}>
          <div className={styles.inner}>
            <div className={styles.layout}>
              <div className={styles.main}>
                <h2 className={styles.sectionHeading}>About</h2>
                <p className={styles.about}>{club.description}</p>

                {/* Events */}
                <h2 className={styles.sectionHeading}>Upcoming Events</h2>
                {club.events.length > 0 ? (
                  <ul className={styles.eventsList} role="list">
                    {club.events.map((ev, idx) => (
                      <li key={idx} className={styles.eventItem}>
                        <div className={styles.eventIcon} aria-hidden="true">
                          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                            <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
                            <line x1="16" y1="2" x2="16" y2="6" />
                            <line x1="8" y1="2" x2="8" y2="6" />
                            <line x1="3" y1="10" x2="21" y2="10" />
                          </svg>
                        </div>
                        <div className={styles.eventDetails}>
                          <p className={styles.eventTitle}>{ev.title}</p>
                          <p className={styles.eventMeta}>
                            <span>{ev.date}</span>
                            <span className={styles.eventMetaDivider} aria-hidden="true">·</span>
                            <span>{ev.location}</span>
                          </p>
                        </div>
                      </li>
                    ))}
                  </ul>
                ) : (
                  <p className={styles.noEvents}>No upcoming events scheduled.</p>
                )}
              </div>

              {/* Sidebar CTA */}
              <aside className={styles.sidebar}>
                <div className={styles.ctaCard}>
                  <h3 className={styles.ctaHeading}>Interested in joining?</h3>
                  <p className={styles.ctaBody}>
                    Create a free Digital Kampus account to follow this club, get event reminders, and connect with members.
                  </p>
                  <Link href="/signup" className={styles.ctaBtn}>
                    Sign up — it&apos;s free
                  </Link>
                  <p className={styles.ctaLogin}>
                    Already have an account?{' '}
                    <Link href="/login" className={styles.ctaLoginLink}>Log in</Link>
                  </p>
                </div>
              </aside>
            </div>
          </div>
        </section>

        {/* Bottom CTA strip */}
        <section className={styles.bottomCta}>
          <div className={styles.inner}>
            <p className={styles.bottomCtaText}>
              Looking for more clubs?{' '}
              <Link href="/clubs" className={styles.bottomCtaLink}>Browse all clubs →</Link>
            </p>
          </div>
        </section>
      </main>
      <SiteFooter />
    </>
  )
}
