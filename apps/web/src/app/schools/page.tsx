import type { Metadata } from 'next'
import Link from 'next/link'
import { JsonLd } from '@/components/seo/JsonLd'
import { SiteNav } from '@/components/layout/SiteNav'
import { SiteFooter } from '@/components/layout/SiteFooter'
import SchoolExplorer from './SchoolExplorer'
import styles from './schools.module.css'

export const revalidate = 3600

export const metadata: Metadata = {
  title: 'Browse Canadian Colleges & Universities | Digital Kampus',
  description:
    'Compare over 200 Canadian colleges and universities. Find tuition, programmes, rankings, scholarships, and student reviews — in English and French.',
  alternates: {
    canonical: 'https://digitalkampus.ca/schools',
    languages: {
      'en-CA': 'https://digitalkampus.ca/schools',
      'fr-CA': 'https://digitalkampus.ca/fr/etablissements',
    },
  },
}

const breadcrumbs = {
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: [
    { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://digitalkampus.ca' },
    { '@type': 'ListItem', position: 2, name: 'Schools', item: 'https://digitalkampus.ca/schools' },
  ],
}

export default async function SchoolsPage() {
  return (
    <>
      <JsonLd data={breadcrumbs} />
      <SiteNav />
      <main>
        <section className={styles.hero}>
          <div className={styles.inner}>
            <nav className={styles.breadcrumb} aria-label="Breadcrumb">
              <Link href="/">Home</Link>
              <span aria-hidden="true"> › </span>
              <span aria-current="page">Schools</span>
            </nav>
            <h1 className={styles.h1}>
              Browse Canadian<br />
              <span className={styles.hi}>Colleges & Universities</span>
            </h1>
            <p className={styles.sub}>60+ institutions across every province. Filter by type, size, and ranking — then compare side by side.</p>
            <form className={styles.searchForm} role="search" action="/schools">
              <input
                type="search"
                name="q"
                placeholder="Search by school name, city, or programme…"
                className={styles.searchInput}
                aria-label="Search schools"
              />
              <button type="submit" className={styles.searchBtn}>Search</button>
            </form>
          </div>
        </section>

        <SchoolExplorer />
      </main>
      <SiteFooter />
    </>
  )
}
