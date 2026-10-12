import type { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { SiteNav } from '@/components/layout/SiteNav'
import { SiteFooter } from '@/components/layout/SiteFooter'
import { Breadcrumbs } from '@/components/ui/Breadcrumbs'
import { CLUBS } from '../clubs-data'
import styles from './clubs-detail.module.css'

function getClub(slug: string) {
  return CLUBS.find((c) => c.id === slug)
}

export function generateStaticParams() {
  return CLUBS.map((c) => ({ slug: c.id }))
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
    title: `${club.name} — ${club.university} | Digital Kampus`,
    description: club.description,
    alternates: {
      canonical: `https://digitalkampus.ca/clubs/${club.id}`,
      languages: {
        'en-CA': `https://digitalkampus.ca/clubs/${club.id}`,
        'fr-CA': `https://digitalkampus.ca/fr/clubs/${club.id}`,
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
            <Breadcrumbs items={[
              { label: 'Home', href: '/' },
              { label: 'Clubs', href: '/clubs' },
              { label: club.university, href: `/clubs?school=${club.universitySlug}` },
              { label: club.name },
            ]} />

            <div className={styles.heroBody}>
              <div className={styles.clubIcon} aria-hidden="true">
                {club.name.charAt(0)}
              </div>
              <div className={styles.heroText}>
                <div className={styles.heroMeta}>
                  <span className={styles.categoryBadge}>{club.category}</span>
                  <span className={styles.schoolBadge}>{club.university}</span>
                </div>
                <h1 className={styles.h1}>{club.name}</h1>
                <div className={styles.stats}>
                  <span className={styles.stat}>
                    <strong>{club.members.toLocaleString('en-CA')}</strong> members
                  </span>
                  {club.founded && (
                    <>
                      <span className={styles.statDivider} aria-hidden="true">·</span>
                      <span className={styles.stat}>
                        Founded <strong>{club.founded}</strong>
                      </span>
                    </>
                  )}
                  {club.website && (
                    <>
                      <span className={styles.statDivider} aria-hidden="true">·</span>
                      <a
                        href={club.website}
                        className={styles.websiteLink}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        Official website ↗
                      </a>
                    </>
                  )}
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

                {/* Back to school clubs */}
                <div className={styles.relatedSchool}>
                  <Link href={`/clubs?school=${club.universitySlug}`} className={styles.relatedLink}>
                    ← More clubs at {club.university}
                  </Link>
                </div>
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

                {club.website && (
                  <div className={styles.websiteCard}>
                    <p className={styles.websiteLabel}>Official website</p>
                    <a
                      href={club.website}
                      className={styles.websiteCardLink}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      {club.website.replace(/^https?:\/\//, '')} ↗
                    </a>
                  </div>
                )}
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
