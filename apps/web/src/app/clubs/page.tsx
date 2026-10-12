import type { Metadata } from 'next'
import Link from 'next/link'
import { SiteNav } from '@/components/layout/SiteNav'
import { SiteFooter } from '@/components/layout/SiteFooter'
import styles from './clubs.module.css'

export const metadata: Metadata = {
  title: 'Student Clubs & Events | Digital Kampus',
  description:
    'Find and join student clubs, societies, and campus events at Canadian colleges and universities. Free for students.',
  alternates: {
    canonical: 'https://digitalkampus.ca/clubs',
    languages: {
      'en-CA': 'https://digitalkampus.ca/clubs',
      'fr-CA': 'https://digitalkampus.ca/fr/clubs',
    },
  },
}

const CATEGORIES = ['All', 'Academic', 'Cultural', 'Sports', 'Arts', 'Tech', 'Community', 'Politics', 'Environment']

const CLUBS = [
  { id: 1, slug: 'ubc-computer-science-club', name: 'UBC Computer Science Club', school: 'UBC', members: 340, category: 'Tech', description: 'Weekly socials, hackathons, career panels. Open to all CS and engineering students.', nextEvent: 'Hackathon — Nov 8' },
  { id: 2, slug: 'mcgill-debating-union', name: 'McGill Debating Union', school: 'McGill', members: 210, category: 'Academic', description: 'Competitive and recreational debating in English and French.', nextEvent: 'Open tournament — Nov 14' },
  { id: 3, slug: 'uoft-muslim-students-association', name: 'UofT Muslim Students Association', school: 'U of T', members: 650, category: 'Cultural', description: 'Community, events, and support for Muslim students at all three UofT campuses.', nextEvent: 'Halal food fair — Nov 5' },
  { id: 4, slug: 'sfu-hiking-club', name: 'SFU Hiking Club', school: 'SFU', members: 520, category: 'Sports', description: 'Weekend hikes across the Lower Mainland, Whistler, and the Sea-to-Sky corridor.', nextEvent: 'Garibaldi hike — Nov 2' },
  { id: 5, slug: 'carleton-film-collective', name: 'Carleton Film Collective', school: 'Carleton', members: 120, category: 'Arts', description: 'Student filmmaking, screenings, and production workshops.', nextEvent: 'Short film night — Nov 10' },
  { id: 6, slug: 'ualberta-sustainability-network', name: 'UAlberta Sustainability Network', school: 'UAlberta', members: 180, category: 'Environment', description: 'Campus sustainability initiatives, green campaigns, and community garden.', nextEvent: 'Climate summit — Nov 18' },
]

export default function ClubsPage() {
  return (
    <>
      <SiteNav />
      <main>
        <section className={styles.hero}>
          <div className={styles.inner}>
            <nav className={styles.breadcrumb} aria-label="Breadcrumb">
              <Link href="/">Home</Link>
              <span> › </span>
              <span aria-current="page">Clubs</span>
            </nav>
            <h1 className={styles.h1}>
              Student Clubs<br />
              <span className={styles.hi}>& Campus Life</span>
            </h1>
            <p className={styles.sub}>Find your community at your school. Browse clubs, join events, connect with students who share your interests.</p>
          </div>
        </section>

        <section className={styles.filters}>
          <div className={styles.inner}>
            <div className={styles.chips}>
              {CATEGORIES.map((c) => (
                <button key={c} className={`${styles.chip} ${c === 'All' ? styles.chipActive : ''}`}>{c}</button>
              ))}
            </div>
          </div>
        </section>

        <section className={styles.grid_section}>
          <div className={styles.inner}>
            <p className={styles.count}>{CLUBS.length} clubs shown · <Link href="/clubs/register" className={styles.registerLink}>Register your club →</Link></p>
            <div className={styles.grid}>
              {CLUBS.map((club) => (
                <Link key={club.id} href={`/clubs/${club.slug}`} className={styles.card}>
                  <div className={styles.cardHeader}>
                    <div className={styles.icon}>{club.name.charAt(0)}</div>
                    <span className={styles.category}>{club.category}</span>
                  </div>
                  <h2 className={styles.clubName}>{club.name}</h2>
                  <p className={styles.schoolTag}>{club.school}</p>
                  <p className={styles.desc}>{club.description}</p>
                  <div className={styles.cardFooter}>
                    <div className={styles.meta}>
                      <span className={styles.members}>{club.members} members</span>
                      {club.nextEvent && <span className={styles.event}>Next: {club.nextEvent}</span>}
                    </div>
                    <span className={styles.joinBtn}>View club →</span>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>

        <section className={styles.registerCta}>
          <div className={styles.inner}>
            <div className={styles.ctaBox}>
              <div>
                <h2 className={styles.ctaH}>Running a club?</h2>
                <p className={styles.ctaP}>List your club for free and reach students across your campus. Event posting, member management, and announcements — all included.</p>
              </div>
              <Link href="/clubs/register" className={styles.ctaBtn}>Register your club →</Link>
            </div>
          </div>
        </section>
      </main>
      <SiteFooter />
    </>
  )
}
