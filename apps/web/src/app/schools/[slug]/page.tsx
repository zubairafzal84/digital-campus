import type { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { JsonLd } from '@/components/seo/JsonLd'
import { SiteNav } from '@/components/layout/SiteNav'
import { SiteFooter } from '@/components/layout/SiteFooter'
import styles from './school.module.css'

const SCHOOLS: Record<string, School> = {
  ubc: {
    slug: 'ubc',
    name: 'University of British Columbia',
    shortName: 'UBC',
    city: 'Vancouver',
    province: 'BC',
    type: 'University',
    founded: 1908,
    enrolment: 68000,
    programmes: 300,
    tuitionMin: 5500,
    tuitionMax: 42000,
    verified: true,
    lastUpdated: '2026-10',
    description:
      'One of Canada's top research universities, UBC spans two campuses in Vancouver and Kelowna. Known for its world-class faculty, ocean-to-sky setting, and bilingual research output.',
    rankings: { macleans: 3, times: 34, qs: 38 },
    faculties: ['Arts', 'Science', 'Commerce', 'Engineering', 'Law', 'Medicine', 'Forestry'],
    website: 'https://ubc.ca',
  },
  sfu: {
    slug: 'sfu',
    name: 'Simon Fraser University',
    shortName: 'SFU',
    city: 'Burnaby',
    province: 'BC',
    type: 'University',
    founded: 1965,
    enrolment: 35000,
    programmes: 200,
    tuitionMin: 5200,
    tuitionMax: 38000,
    verified: true,
    lastUpdated: '2026-10',
    description:
      'SFU is a Canadian public research university in Metro Vancouver. Its Burnaby mountain campus is an architectural landmark, and it consistently ranks among the top comprehensive universities in Canada.',
    rankings: { macleans: 2, times: 251, qs: 328 },
    faculties: ['Arts & Social Sciences', 'Science', 'Business', 'Communication', 'Education', 'Engineering', 'Health Sciences'],
    website: 'https://sfu.ca',
  },
  uoft: {
    slug: 'uoft',
    name: 'University of Toronto',
    shortName: 'U of T',
    city: 'Toronto',
    province: 'ON',
    type: 'University',
    founded: 1827,
    enrolment: 97000,
    programmes: 700,
    tuitionMin: 6100,
    tuitionMax: 58000,
    verified: true,
    lastUpdated: '2026-10',
    description:
      'Canada's largest university and a global top-25 research institution. Three campuses across the Greater Toronto Area. Home to groundbreaking research in AI, medicine, and public policy.',
    rankings: { macleans: 1, times: 21, qs: 25 },
    faculties: ['Arts & Science', 'Engineering', 'Rotman Commerce', 'Law', 'Medicine', 'Education', 'Architecture'],
    website: 'https://utoronto.ca',
  },
}

interface School {
  slug: string
  name: string
  shortName: string
  city: string
  province: string
  type: string
  founded: number
  enrolment: number
  programmes: number
  tuitionMin: number
  tuitionMax: number
  verified: boolean
  lastUpdated: string
  description: string
  rankings: { macleans: number; times: number; qs: number }
  faculties: string[]
  website: string
}

type Props = { params: Promise<{ slug: string }> }

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  const school = SCHOOLS[slug]
  if (!school) return {}
  return {
    title: `${school.name} — Tuition, Programmes & Reviews | Digital Kampus`,
    description: `${school.name} in ${school.city}, ${school.province}. Tuition $${school.tuitionMin.toLocaleString()}–$${school.tuitionMax.toLocaleString()}, ${school.programmes}+ programmes. Student reviews and scholarship matching.`,
    alternates: {
      canonical: `https://digitalkampus.ca/schools/${slug}`,
      languages: {
        'en-CA': `https://digitalkampus.ca/schools/${slug}`,
        'fr-CA': `https://digitalkampus.ca/fr/etablissements/${slug}`,
      },
    },
  }
}

export default async function SchoolPage({ params }: Props) {
  const { slug } = await params
  const school = SCHOOLS[slug]
  if (!school) notFound()

  const ldJson = {
    '@context': 'https://schema.org',
    '@type': 'EducationalOrganization',
    name: school.name,
    url: school.website,
    address: { '@type': 'PostalAddress', addressLocality: school.city, addressRegion: school.province, addressCountry: 'CA' },
    foundingDate: school.founded.toString(),
    numberOfEmployees: { '@type': 'QuantitativeValue', value: school.enrolment },
    description: school.description,
  }

  const breadcrumbs = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://digitalkampus.ca' },
      { '@type': 'ListItem', position: 2, name: 'Schools', item: 'https://digitalkampus.ca/schools' },
      { '@type': 'ListItem', position: 3, name: school.name, item: `https://digitalkampus.ca/schools/${slug}` },
    ],
  }

  return (
    <>
      <JsonLd data={ldJson} />
      <JsonLd data={breadcrumbs} />
      <SiteNav />
      <main>
        <section className={styles.hero}>
          <div className={styles.inner}>
            <nav className={styles.breadcrumb} aria-label="Breadcrumb">
              <Link href="/">Home</Link>
              <span> › </span>
              <Link href="/schools">Schools</Link>
              <span> › </span>
              <span aria-current="page">{school.shortName}</span>
            </nav>
            <div className={styles.heroContent}>
              <div className={styles.heroLeft}>
                <div className={styles.icon}>{school.shortName.charAt(0)}</div>
                <div>
                  <div className={styles.heroMeta}>
                    {school.city}, {school.province} · {school.type} · Est. {school.founded}
                  </div>
                  <h1 className={styles.h1}>{school.name}</h1>
                  {school.verified && (
                    <span className={styles.verified}>✓ Verified institution · Last updated {school.lastUpdated}</span>
                  )}
                </div>
              </div>
              <div className={styles.heroCtas}>
                <Link href={`/compare?a=${slug}`} className={styles.btnOutline}>Compare schools</Link>
                <Link href="/signup" className={styles.btnPrimary}>Match scholarships free →</Link>
              </div>
            </div>
          </div>
        </section>

        <div className={styles.body}>
          <div className={styles.inner}>
            <div className={styles.layout}>
              <div className={styles.main}>
                <section className={styles.card}>
                  <h2 className={styles.cardH}>About {school.shortName}</h2>
                  <p className={styles.cardP}>{school.description}</p>
                </section>

                <section className={styles.card}>
                  <h2 className={styles.cardH}>Faculties & Schools</h2>
                  <div className={styles.tagCloud}>
                    {school.faculties.map((f) => (
                      <span key={f} className={styles.tag}>{f}</span>
                    ))}
                  </div>
                </section>

                <section className={styles.card}>
                  <h2 className={styles.cardH}>Rankings</h2>
                  <div className={styles.rankRow}>
                    <div className={styles.rankItem}>
                      <span className={styles.rankNum}>#{school.rankings.macleans}</span>
                      <span className={styles.rankLabel}>Maclean's</span>
                    </div>
                    <div className={styles.rankItem}>
                      <span className={styles.rankNum}>#{school.rankings.times}</span>
                      <span className={styles.rankLabel}>Times World</span>
                    </div>
                    <div className={styles.rankItem}>
                      <span className={styles.rankNum}>#{school.rankings.qs}</span>
                      <span className={styles.rankLabel}>QS World</span>
                    </div>
                  </div>
                  <p className={styles.rankNote}>
                    Rankings sourced from Maclean's Education, Times Higher Education, and QS World University Rankings.
                    <Link href="/about#data-sources" className={styles.inlineLink}> Data sources →</Link>
                  </p>
                </section>
              </div>

              <aside className={styles.sidebar}>
                <div className={styles.sideCard}>
                  <h3 className={styles.sideH}>Quick facts</h3>
                  <dl className={styles.dl}>
                    <dt>Enrolment</dt>
                    <dd>{school.enrolment.toLocaleString()} students</dd>
                    <dt>Programmes</dt>
                    <dd>{school.programmes}+</dd>
                    <dt>Domestic tuition</dt>
                    <dd>${school.tuitionMin.toLocaleString()} / yr</dd>
                    <dt>International tuition</dt>
                    <dd>from ${school.tuitionMax.toLocaleString()} / yr</dd>
                    <dt>Location</dt>
                    <dd>{school.city}, {school.province}</dd>
                    <dt>Type</dt>
                    <dd>{school.type}</dd>
                  </dl>
                </div>

                <div className={styles.sideCard}>
                  <h3 className={styles.sideH}>Compare</h3>
                  <p className={styles.sideP}>See how {school.shortName} stacks up against similar schools.</p>
                  {slug === 'ubc' && (
                    <Link href="/compare/ubc-vs-sfu" className={styles.compareLink}>UBC vs SFU →</Link>
                  )}
                  {slug === 'sfu' && (
                    <Link href="/compare/ubc-vs-sfu" className={styles.compareLink}>UBC vs SFU →</Link>
                  )}
                  {slug === 'uoft' && (
                    <Link href="/compare/uoft-vs-ubc" className={styles.compareLink}>U of T vs UBC →</Link>
                  )}
                  <Link href="/compare" className={styles.compareLinkMuted}>All comparisons →</Link>
                </div>

                <div className={styles.sideCard}>
                  <h3 className={styles.sideH}>Scholarships at {school.shortName}</h3>
                  <p className={styles.sideP}>Find funding matched to your programme and background.</p>
                  <Link href="/signup" className={styles.btnPrimary} style={{ display: 'block', textAlign: 'center' }}>
                    Match scholarships free →
                  </Link>
                </div>
              </aside>
            </div>
          </div>
        </div>
      </main>
      <SiteFooter />
    </>
  )
}
