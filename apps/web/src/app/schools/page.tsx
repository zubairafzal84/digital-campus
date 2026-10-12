import type { Metadata } from 'next'
import Link from 'next/link'
import { JsonLd } from '@/components/seo/JsonLd'
import { SiteNav } from '@/components/layout/SiteNav'
import { SiteFooter } from '@/components/layout/SiteFooter'
import { createClient } from '@/lib/supabase/server'
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

const PROVINCES = [
  { code: 'ON', name: 'Ontario' },
  { code: 'BC', name: 'British Columbia' },
  { code: 'QC', name: 'Quebec' },
  { code: 'AB', name: 'Alberta' },
  { code: 'MB', name: 'Manitoba' },
  { code: 'SK', name: 'Saskatchewan' },
  { code: 'NS', name: 'Nova Scotia' },
  { code: 'NB', name: 'New Brunswick' },
  { code: 'NL', name: 'Newfoundland' },
  { code: 'PE', name: 'P.E.I.' },
]

const TYPES = ['University', 'College', 'Polytechnic', 'Institut']

const FEATURED_SCHOOLS = [
  { name: 'University of British Columbia', slug: 'ubc', city: 'Vancouver', province: 'BC', type: 'University', programmes: 300, verified: true },
  { name: 'University of Toronto', slug: 'uoft', city: 'Toronto', province: 'ON', type: 'University', programmes: 700, verified: true },
  { name: 'McGill University', slug: 'mcgill', city: 'Montréal', province: 'QC', type: 'University', programmes: 400, verified: true },
  { name: 'Simon Fraser University', slug: 'sfu', city: 'Burnaby', province: 'BC', type: 'University', programmes: 200, verified: true },
  { name: 'University of Alberta', slug: 'ualberta', city: 'Edmonton', province: 'AB', type: 'University', programmes: 350, verified: true },
  { name: 'Carleton University', slug: 'carleton', city: 'Ottawa', province: 'ON', type: 'University', programmes: 250, verified: true },
  { name: 'University of Ottawa', slug: 'uottawa', city: 'Ottawa', province: 'ON', type: 'University', programmes: 450, verified: true },
  { name: 'BCIT', slug: 'bcit', city: 'Burnaby', province: 'BC', type: 'Polytechnic', programmes: 180, verified: true },
  { name: 'Humber College', slug: 'humber', city: 'Toronto', province: 'ON', type: 'College', programmes: 220, verified: true },
  { name: 'Université de Montréal', slug: 'udem', city: 'Montréal', province: 'QC', type: 'University', programmes: 380, verified: true },
  { name: 'Dalhousie University', slug: 'dal', city: 'Halifax', province: 'NS', type: 'University', programmes: 190, verified: false },
  { name: 'University of Manitoba', slug: 'umanitoba', city: 'Winnipeg', province: 'MB', type: 'University', programmes: 180, verified: false },
]

const breadcrumbs = {
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: [
    { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://digitalkampus.ca' },
    { '@type': 'ListItem', position: 2, name: 'Schools', item: 'https://digitalkampus.ca/schools' },
  ],
}

export default async function SchoolsPage() {
  const supabase = await createClient()
  const { data: dbSchools } = await supabase
    .from('schools')
    .select('slug, name, city, province_code, type, verified')
    .eq('status', 'active')
    .order('name')
    .limit(24)

  const schools = dbSchools?.map(s => ({
    slug: s.slug,
    name: s.name,
    city: s.city,
    province: s.province_code,
    type: s.type,
    verified: s.verified,
  })) ?? FEATURED_SCHOOLS

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
            <p className={styles.sub}>200+ institutions. Tuition, programmes, scholarships — in English and French.</p>
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

        <section className={styles.filters}>
          <div className={styles.inner}>
            <div className={styles.filterRow}>
              <div className={styles.filterGroup}>
                <span className={styles.filterLabel}>Province</span>
                <div className={styles.chips}>
                  <button className={`${styles.chip} ${styles.chipActive}`}>All</button>
                  {PROVINCES.map((p) => (
                    <button key={p.code} className={styles.chip}>{p.name}</button>
                  ))}
                </div>
              </div>
              <div className={styles.filterGroup}>
                <span className={styles.filterLabel}>Type</span>
                <div className={styles.chips}>
                  <button className={`${styles.chip} ${styles.chipActive}`}>All</button>
                  {TYPES.map((t) => (
                    <button key={t} className={styles.chip}>{t}</button>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className={styles.results}>
          <div className={styles.inner}>
            <p className={styles.resultCount}>Showing {schools.length} of 200+ schools</p>
            <div className={styles.grid}>
              {schools.map((s) => (
                <Link key={s.slug} href={`/schools/${s.slug}`} className={styles.card}>
                  <div className={styles.cardTop}>
                    <div className={styles.cardIcon}>{s.name.charAt(0)}</div>
                    {s.verified && (
                      <span className={styles.verified} title="Verified institution">✓ Verified</span>
                    )}
                  </div>
                  <h2 className={styles.cardName}>{s.name}</h2>
                  <p className={styles.cardMeta}>{s.city}, {s.province} · {s.type}</p>
                  <p className={styles.cardProg}>{s.programmes}+ programmes</p>
                  <span className={styles.cardCta}>View profile →</span>
                </Link>
              ))}
            </div>
          </div>
        </section>
      </main>
      <SiteFooter />
    </>
  )
}
