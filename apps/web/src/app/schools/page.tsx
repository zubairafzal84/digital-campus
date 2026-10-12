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
  { name: 'University of British Columbia', slug: 'ubc', city: 'Vancouver', province: 'BC', type: 'University', programmes: 300, verified: true, logoUrl: 'https://upload.wikimedia.org/wikipedia/en/thumb/8/83/University_of_British_Columbia_coat_of_arms.svg/120px-University_of_British_Columbia_coat_of_arms.svg.png' },
  { name: 'University of Toronto', slug: 'uoft', city: 'Toronto', province: 'ON', type: 'University', programmes: 700, verified: true, logoUrl: 'https://upload.wikimedia.org/wikipedia/en/thumb/a/a6/University_of_Toronto_coat_of_arms.svg/120px-University_of_Toronto_coat_of_arms.svg.png' },
  { name: 'McGill University', slug: 'mcgill', city: 'Montréal', province: 'QC', type: 'University', programmes: 400, verified: true, logoUrl: 'https://upload.wikimedia.org/wikipedia/en/thumb/3/3b/McGill_University_CoA.svg/120px-McGill_University_CoA.svg.png' },
  { name: 'University of Western Ontario', slug: 'western', city: 'London', province: 'ON', type: 'University', programmes: 400, verified: true, logoUrl: 'https://upload.wikimedia.org/wikipedia/en/thumb/4/4c/Western_University_London_Ontario_coat_of_arms.svg/120px-Western_University_London_Ontario_coat_of_arms.svg.png' },
  { name: 'McMaster University', slug: 'mcmaster', city: 'Hamilton', province: 'ON', type: 'University', programmes: 300, verified: true, logoUrl: 'https://upload.wikimedia.org/wikipedia/en/thumb/0/0a/McMaster_University_logo.svg/120px-McMaster_University_logo.svg.png' },
  { name: 'University of Waterloo', slug: 'uwaterloo', city: 'Waterloo', province: 'ON', type: 'University', programmes: 250, verified: true, logoUrl: 'https://upload.wikimedia.org/wikipedia/en/thumb/f/f3/University_of_Waterloo_seal.svg/120px-University_of_Waterloo_seal.svg.png' },
  { name: "Queen's University", slug: 'queens', city: 'Kingston', province: 'ON', type: 'University', programmes: 200, verified: true, logoUrl: 'https://upload.wikimedia.org/wikipedia/en/thumb/8/8b/Queens_University_CoA.svg/120px-Queens_University_CoA.svg.png' },
  { name: 'University of Alberta', slug: 'ualberta', city: 'Edmonton', province: 'AB', type: 'University', programmes: 400, verified: true, logoUrl: 'https://upload.wikimedia.org/wikipedia/en/thumb/a/a6/University_of_Alberta_coat_of_arms.svg/120px-University_of_Alberta_coat_of_arms.svg.png' },
  { name: 'University of Calgary', slug: 'ucalgary', city: 'Calgary', province: 'AB', type: 'University', programmes: 250, verified: true, logoUrl: 'https://upload.wikimedia.org/wikipedia/en/thumb/1/16/University_of_Calgary_arms.svg/120px-University_of_Calgary_arms.svg.png' },
  { name: 'University of Ottawa', slug: 'uottawa', city: 'Ottawa', province: 'ON', type: 'University', programmes: 450, verified: true, logoUrl: 'https://upload.wikimedia.org/wikipedia/en/thumb/6/6f/University_of_Ottawa_coat_of_arms.svg/120px-University_of_Ottawa_coat_of_arms.svg.png' },
  { name: 'Simon Fraser University', slug: 'sfu', city: 'Burnaby', province: 'BC', type: 'University', programmes: 200, verified: true, logoUrl: null },
  { name: 'Université de Montréal', slug: 'udem', city: 'Montréal', province: 'QC', type: 'University', programmes: 650, verified: true, logoUrl: null },
  { name: 'Université Laval', slug: 'laval', city: 'Québec City', province: 'QC', type: 'University', programmes: 500, verified: true, logoUrl: null },
  { name: 'York University', slug: 'yorku', city: 'Toronto', province: 'ON', type: 'University', programmes: 300, verified: true, logoUrl: null },
  { name: 'Toronto Metropolitan University', slug: 'ryerson', city: 'Toronto', province: 'ON', type: 'University', programmes: 150, verified: true, logoUrl: null },
  { name: 'Carleton University', slug: 'carleton', city: 'Ottawa', province: 'ON', type: 'University', programmes: 250, verified: true, logoUrl: null },
  { name: 'Concordia University', slug: 'concordia', city: 'Montréal', province: 'QC', type: 'University', programmes: 300, verified: true, logoUrl: null },
  { name: 'Dalhousie University', slug: 'dal', city: 'Halifax', province: 'NS', type: 'University', programmes: 190, verified: true, logoUrl: null },
  { name: 'BCIT', slug: 'bcit', city: 'Burnaby', province: 'BC', type: 'Polytechnic', programmes: 180, verified: true, logoUrl: null },
  { name: 'Seneca Polytechnic', slug: 'seneca', city: 'Toronto', province: 'ON', type: 'College', programmes: 300, verified: true, logoUrl: null },
  { name: 'Humber College', slug: 'humber', city: 'Etobicoke', province: 'ON', type: 'College', programmes: 250, verified: true, logoUrl: null },
  { name: 'Sheridan College', slug: 'sheridan', city: 'Oakville', province: 'ON', type: 'College', programmes: 150, verified: true, logoUrl: null },
  { name: 'NAIT', slug: 'nait', city: 'Edmonton', province: 'AB', type: 'Polytechnic', programmes: 200, verified: true, logoUrl: null },
  { name: 'University of Manitoba', slug: 'umanitoba', city: 'Winnipeg', province: 'MB', type: 'University', programmes: 180, verified: true, logoUrl: null },
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
    .from('institutions')
    .select('slug, name_en, city, province, type, is_verified')
    .eq('is_published', true)
    .order('name_en')
    .limit(24)

  const schools = dbSchools?.map(s => ({
    slug: s.slug,
    name: s.name_en,
    city: s.city,
    province: s.province,
    type: s.type,
    verified: s.is_verified,
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
              {schools.map((s) => {
                const logoUrl = (s as { logoUrl?: string | null }).logoUrl ?? null
                return (
                  <Link key={s.slug} href={`/schools/${s.slug}`} className={styles.card}>
                    <div className={styles.cardTop}>
                      {logoUrl ? (
                        <div className={styles.cardLogoWrap}>
                          {/* eslint-disable-next-line @next/next/no-img-element */}
                          <img src={logoUrl} alt={s.name + ' logo'} width={40} height={40} className={styles.cardLogo} />
                        </div>
                      ) : (
                        <div className={styles.cardIcon}>{s.name.charAt(0)}</div>
                      )}
                      {s.verified && (
                        <span className={styles.verified} title="Verified institution">✓ Verified</span>
                      )}
                    </div>
                    <h2 className={styles.cardName}>{s.name}</h2>
                    <p className={styles.cardMeta}>{s.city}, {s.province} · {s.type}</p>
                    <p className={styles.cardProg}>{s.programmes}+ programmes</p>
                    <span className={styles.cardCta}>View profile →</span>
                  </Link>
                )
              })}
            </div>
          </div>
        </section>
      </main>
      <SiteFooter />
    </>
  )
}
