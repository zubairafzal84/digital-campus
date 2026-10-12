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
      'One of Canada’s top research universities, UBC spans two campuses in Vancouver and Kelowna. Known for its world-class faculty, ocean-to-sky setting, and bilingual research output.',
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
      'Canada’s largest university and a global top-25 research institution. Three campuses across the Greater Toronto Area. Home to groundbreaking research in AI, medicine, and public policy.',
    rankings: { macleans: 1, times: 21, qs: 25 },
    faculties: ['Arts & Science', 'Engineering', 'Rotman Commerce', 'Law', 'Medicine', 'Education', 'Architecture'],
    website: 'https://utoronto.ca',
  },
  mcgill: {
    slug: 'mcgill',
    name: 'McGill University',
    shortName: 'McGill',
    city: 'Montréal',
    province: 'QC',
    type: 'University',
    founded: 1821,
    enrolment: 40000,
    programmes: 300,
    tuitionMin: 4338,
    tuitionMax: 27000,
    verified: true,
    lastUpdated: '2026-10',
    description:
      'McGill is one of Canada’s most distinguished universities, renowned for its research in medicine, law, and natural sciences. Located in bilingual Montréal, it draws students from over 150 countries.',
    rankings: { macleans: 4, times: 46, qs: 30 },
    faculties: ['Arts', 'Science', 'Medicine', 'Law', 'Engineering', 'Education', 'Management', 'Music'],
    website: 'https://mcgill.ca',
  },
  uwaterloo: {
    slug: 'uwaterloo',
    name: 'University of Waterloo',
    shortName: 'Waterloo',
    city: 'Waterloo',
    province: 'ON',
    type: 'University',
    founded: 1959,
    enrolment: 42000,
    programmes: 250,
    tuitionMin: 6700,
    tuitionMax: 39000,
    verified: true,
    lastUpdated: '2026-10',
    description:
      'Home to the world’s largest co-operative education program, Waterloo is a global leader in computer science, engineering, and mathematics. Its graduates are among the most recruited in tech.',
    rankings: { macleans: 6, times: 201, qs: 173 },
    faculties: ['Mathematics', 'Engineering', 'Science', 'Arts', 'Environment', 'Health', 'Applied Health Sciences'],
    website: 'https://uwaterloo.ca',
  },
  queens: {
    slug: 'queens',
    name: "Queen's University",
    shortName: "Queen's",
    city: 'Kingston',
    province: 'ON',
    type: 'University',
    founded: 1841,
    enrolment: 25000,
    programmes: 200,
    tuitionMin: 6500,
    tuitionMax: 50000,
    verified: true,
    lastUpdated: '2026-10',
    description:
      "One of Canada’s oldest and most respected universities, Queen’s offers a close-knit campus community in Kingston, Ontario. Smith School of Business and the Faculty of Law are among its most acclaimed.",
    rankings: { macleans: 5, times: 401, qs: 561 },
    faculties: ['Arts & Science', 'Engineering', 'Smith Commerce', 'Law', 'Education', 'Health Sciences', 'Computing'],
    website: 'https://queensu.ca',
  },
  ualberta: {
    slug: 'ualberta',
    name: 'University of Alberta',
    shortName: 'U of A',
    city: 'Edmonton',
    province: 'AB',
    type: 'University',
    founded: 1908,
    enrolment: 40000,
    programmes: 400,
    tuitionMin: 5600,
    tuitionMax: 30000,
    verified: true,
    lastUpdated: '2026-10',
    description:
      'A leading Canadian research university, the University of Alberta is ranked among the top five in Canada. It excels in energy research, agriculture, and Indigenous studies, with strong co-op programs.',
    rankings: { macleans: 7, times: 110, qs: 111 },
    faculties: ['Arts', 'Science', 'Engineering', 'Business', 'Law', 'Medicine', 'Education', 'Agriculture'],
    website: 'https://ualberta.ca',
  },
  uvic: {
    slug: 'uvic',
    name: 'University of Victoria',
    shortName: 'UVic',
    city: 'Victoria',
    province: 'BC',
    type: 'University',
    founded: 1963,
    enrolment: 22000,
    programmes: 160,
    tuitionMin: 5660,
    tuitionMax: 31000,
    verified: true,
    lastUpdated: '2026-10',
    description:
      'UVic is a leading research university on southern Vancouver Island. Known for its co-op programs, ocean and climate science, and a commitment to reconciliation with Indigenous peoples.',
    rankings: { macleans: 8, times: 601, qs: 651 },
    faculties: ['Humanities', 'Science', 'Engineering', 'Business', 'Law', 'Education', 'Social Sciences', 'Fine Arts'],
    website: 'https://uvic.ca',
  },
  dal: {
    slug: 'dal',
    name: 'Dalhousie University',
    shortName: 'Dal',
    city: 'Halifax',
    province: 'NS',
    type: 'University',
    founded: 1818,
    enrolment: 19000,
    programmes: 180,
    tuitionMin: 9000,
    tuitionMax: 24000,
    verified: true,
    lastUpdated: '2026-10',
    description:
      "Dalhousie is Atlantic Canada’s leading research-intensive university, known for ocean sciences, law, and medicine. Halifax offers a vibrant, affordable student experience on Canada’s East Coast.",
    rankings: { macleans: 11, times: 601, qs: 701 },
    faculties: ['Arts & Social Sciences', 'Science', 'Engineering', 'Management', 'Law', 'Medicine', 'Health'],
    website: 'https://dal.ca',
  },
  bcit: {
    slug: 'bcit',
    name: 'British Columbia Institute of Technology',
    shortName: 'BCIT',
    city: 'Burnaby',
    province: 'BC',
    type: 'Institute of Technology',
    founded: 1964,
    enrolment: 48000,
    programmes: 150,
    tuitionMin: 4500,
    tuitionMax: 20000,
    verified: true,
    lastUpdated: '2026-10',
    description:
      'BCIT is BC’s largest post-secondary institution, offering applied and technical training that leads directly to careers. High employment rates and industry partnerships make it a top choice for career-focused students.',
    rankings: { macleans: 0, times: 0, qs: 0 },
    faculties: ['Applied & Natural Sciences', 'Business & Media', 'Computing & IT', 'Engineering', 'Health Sciences', 'Trades & Apprenticeship'],
    website: 'https://bcit.ca',
  },
  seneca: {
    slug: 'seneca',
    name: 'Seneca Polytechnic',
    shortName: 'Seneca',
    city: 'Toronto',
    province: 'ON',
    type: 'College',
    founded: 1967,
    enrolment: 35000,
    programmes: 300,
    tuitionMin: 3800,
    tuitionMax: 18500,
    verified: true,
    lastUpdated: '2026-10',
    description:
      "Seneca Polytechnic is one of Canada’s largest colleges, serving students across multiple Toronto-area campuses. Its business, technology, and animation programs enjoy strong industry reputations.",
    rankings: { macleans: 0, times: 0, qs: 0 },
    faculties: ['Business', 'Computing & IT', 'Engineering Technology', 'Communication Arts', 'Health Sciences', 'Liberal Arts'],
    website: 'https://senecapolytechnic.ca',
  },
  humber: {
    slug: 'humber',
    name: 'Humber College',
    shortName: 'Humber',
    city: 'Etobicoke',
    province: 'ON',
    type: 'College',
    founded: 1967,
    enrolment: 30000,
    programmes: 250,
    tuitionMin: 3700,
    tuitionMax: 17800,
    verified: true,
    lastUpdated: '2026-10',
    description:
      "Humber is one of Ontario’s largest polytechnics, offering a blend of college credentials and degree pathways. Located in Toronto’s west end, it is known for creative arts, business, and social service programs.",
    rankings: { macleans: 0, times: 0, qs: 0 },
    faculties: ['Business', 'Health Sciences', 'Liberal Arts & Sciences', 'Media Studies', 'Social & Community Services', 'Technology'],
    website: 'https://humber.ca',
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

export function generateStaticParams() {
  return Object.keys(SCHOOLS).map((slug) => ({ slug }))
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

                {(school.rankings.macleans > 0 || school.rankings.times > 0 || school.rankings.qs > 0) && (
                  <section className={styles.card}>
                    <h2 className={styles.cardH}>Rankings</h2>
                    <div className={styles.rankRow}>
                      {school.rankings.macleans > 0 && (
                        <div className={styles.rankItem}>
                          <span className={styles.rankNum}>#{school.rankings.macleans}</span>
                          <span className={styles.rankLabel}>Maclean&apos;s</span>
                        </div>
                      )}
                      {school.rankings.times > 0 && (
                        <div className={styles.rankItem}>
                          <span className={styles.rankNum}>#{school.rankings.times}</span>
                          <span className={styles.rankLabel}>Times World</span>
                        </div>
                      )}
                      {school.rankings.qs > 0 && (
                        <div className={styles.rankItem}>
                          <span className={styles.rankNum}>#{school.rankings.qs}</span>
                          <span className={styles.rankLabel}>QS World</span>
                        </div>
                      )}
                    </div>
                    <p className={styles.rankNote}>
                      Rankings sourced from Maclean&apos;s Education, Times Higher Education, and QS World University Rankings.
                      <Link href="/about#data-sources" className={styles.inlineLink}> Data sources →</Link>
                    </p>
                  </section>
                )}
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
