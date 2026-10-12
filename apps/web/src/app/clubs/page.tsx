import type { Metadata } from 'next'
import Link from 'next/link'
import { SiteNav } from '@/components/layout/SiteNav'
import { SiteFooter } from '@/components/layout/SiteFooter'
import ClubsClient from './ClubsClient'
import { CLUBS } from './clubs-data'
import styles from './clubs.module.css'

export const metadata: Metadata = {
  title: 'Student Clubs & Societies | Digital Kampus',
  description:
    'Find and join real student clubs and societies at Canadian universities and colleges — from student government and debate to film, tech, and cultural organizations. Free for students.',
  alternates: {
    canonical: 'https://digitalkampus.ca/clubs',
    languages: {
      'en-CA': 'https://digitalkampus.ca/clubs',
      'fr-CA': 'https://digitalkampus.ca/fr/clubs',
    },
  },
}

export default function ClubsPage() {
  const totalClubs = CLUBS.length

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
            <p className={styles.sub}>
              Browse {totalClubs}+ real clubs and societies from Canadian universities. Filter by school, find your community, and connect with students who share your interests.
            </p>
          </div>
        </section>

        <ClubsClient />

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
