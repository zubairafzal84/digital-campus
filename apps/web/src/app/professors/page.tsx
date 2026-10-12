import type { Metadata } from 'next'
import Link from 'next/link'
import { SiteNav } from '@/components/layout/SiteNav'
import { SiteFooter } from '@/components/layout/SiteFooter'
import ProfessorsClient from './ProfessorsClient'
import styles from './professors.module.css'

export const metadata: Metadata = {
  title: 'Rate My Professor | Digital Kampus',
  description:
    'Find and rate professors at Canadian universities and colleges. Real reviews from real Canadian students.',
  alternates: {
    canonical: 'https://digitalkampus.ca/professors',
    languages: {
      'en-CA': 'https://digitalkampus.ca/professors',
      'fr-CA': 'https://digitalkampus.ca/fr/professeurs',
    },
  },
}

export default function ProfessorsPage() {
  return (
    <>
      <SiteNav />
      <main>
        {/* ── Static hero (server-rendered) ─────────── */}
        <section className={styles.hero}>
          <div className={styles.inner}>
            <nav className={styles.breadcrumb} aria-label="Breadcrumb">
              <Link href="/">Home</Link>
              <span>›</span>
              <span aria-current="page">Professors</span>
            </nav>

            <h1 className={styles.h1}>
              Find &amp; Rate Your<br />
              <span className={styles.hi}>Professors</span>
            </h1>
            <p className={styles.sub}>
              Real reviews from real Canadian students.
            </p>
          </div>
        </section>

        {/* ── Client island: search + filters + grid ── */}
        <ProfessorsClient />
      </main>
      <SiteFooter />
    </>
  )
}
