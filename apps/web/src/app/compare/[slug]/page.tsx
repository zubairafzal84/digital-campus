import type { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { JsonLd } from '@/components/seo/JsonLd'
import { SiteNav } from '@/components/layout/SiteNav'
import { SiteFooter } from '@/components/layout/SiteFooter'
import styles from './comparison.module.css'

interface CompareData {
  slug: string
  a: SchoolSnapshot
  b: SchoolSnapshot
  verdict: string
  verdictDetail: string
  lastUpdated: string
  relatedSlugs: string[]
}

interface SchoolSnapshot {
  name: string
  shortName: string
  slug: string
  city: string
  province: string
  tuitionDomestic: number
  tuitionIntl: number
  enrolment: number
  programmes: number
  rankMacleans: number
  rankTimes: number
  highlights: string[]
  bestFor: string[]
}

const COMPARISONS: Record<string, CompareData> = {
  'ubc-vs-sfu': {
    slug: 'ubc-vs-sfu',
    lastUpdated: '2026-10',
    verdict: 'UBC for research & prestige; SFU for flexibility & co-op.',
    verdictDetail:
      'UBC ranks higher globally and has more research funding, a larger campus, and stronger medicine and law faculties. SFU wins on co-op integration, schedule flexibility, and a slightly lower domestic tuition. Both are excellent. If you want a traditional research-university experience in Vancouver, UBC. If you want to work while you study, SFU.',
    relatedSlugs: ['uoft-vs-ubc', 'sfu-vs-uvic'],
    a: {
      name: 'University of British Columbia',
      shortName: 'UBC',
      slug: 'ubc',
      city: 'Vancouver',
      province: 'BC',
      tuitionDomestic: 5500,
      tuitionIntl: 42000,
      enrolment: 68000,
      programmes: 300,
      rankMacleans: 3,
      rankTimes: 34,
      highlights: ['Top 40 globally (QS & THE)', '12 Nobel Prize alumni', '$700M+ research funding', 'Medical & Dental schools'],
      bestFor: ['Research & grad school', 'Medicine & law', 'International recognition'],
    },
    b: {
      name: 'Simon Fraser University',
      shortName: 'SFU',
      slug: 'sfu',
      city: 'Burnaby',
      province: 'BC',
      tuitionDomestic: 5200,
      tuitionIntl: 38000,
      enrolment: 35000,
      programmes: 200,
      rankMacleans: 2,
      rankTimes: 251,
      highlights: ['#1 comprehensive (Maclean\'s)', 'Co-op placements in 50+ countries', 'Tri-semester calendar', 'Surrey & Vancouver campuses'],
      bestFor: ['Co-op & industry links', 'Flexible scheduling', 'Business & computing'],
    },
  },
  'uoft-vs-ubc': {
    slug: 'uoft-vs-ubc',
    lastUpdated: '2026-10',
    verdict: 'U of T for academic depth; UBC for lifestyle and cost.',
    verdictDetail:
      'The University of Toronto is ranked in the global top 25 with unmatched programme depth and research output. International tuition is significantly higher, and Toronto\'s cost of living is steep. UBC offers a comparable research environment on the world-famous Vancouver coast at lower international fees. Both are elite. Choose U of T for access to Toronto\'s finance, law, and tech ecosystems; UBC for a more balanced lifestyle.',
    relatedSlugs: ['ubc-vs-sfu', 'uoft-vs-mcgill'],
    a: {
      name: 'University of Toronto',
      shortName: 'U of T',
      slug: 'uoft',
      city: 'Toronto',
      province: 'ON',
      tuitionDomestic: 6100,
      tuitionIntl: 58000,
      enrolment: 97000,
      programmes: 700,
      rankMacleans: 1,
      rankTimes: 21,
      highlights: ['Top 25 globally (THE)', '10 Nobel Prizes', 'Largest university in Canada', 'Rotman & Osgoode'],
      bestFor: ['Finance & consulting', 'Academic research', 'Largest alumni network'],
    },
    b: {
      name: 'University of British Columbia',
      shortName: 'UBC',
      slug: 'ubc',
      city: 'Vancouver',
      province: 'BC',
      tuitionDomestic: 5500,
      tuitionIntl: 42000,
      enrolment: 68000,
      programmes: 300,
      rankMacleans: 3,
      rankTimes: 34,
      highlights: ['Top 40 globally', 'Sauder School of Business', 'Pacific Rim connections', 'Ocean to sky campus'],
      bestFor: ['Research with better lifestyle', 'Pacific & Asia-Pacific', 'Lower international tuition'],
    },
  },
}

const COMPARISONS_EXTRA: Record<string, CompareData> = {
  'uoft-vs-mcgill': {
    slug: 'uoft-vs-mcgill',
    lastUpdated: '2026-10',
    verdict: 'U of T for scope & rankings; McGill for culture & value.',
    verdictDetail:
      'The University of Toronto is Canada\'s highest-ranked university globally, with more than 700 programmes, a massive research budget, and strong placement in finance and law. McGill offers a comparable academic calibre in a bilingual Montreal culture, with significantly lower international tuition and a tight-knit residential feel. Choose U of T if career placement in Toronto matters most; choose McGill for a more affordable, culturally rich university experience.',
    relatedSlugs: ['uoft-vs-ubc', 'ubc-vs-sfu'],
    a: {
      name: 'University of Toronto',
      shortName: 'U of T',
      slug: 'uoft',
      city: 'Toronto',
      province: 'ON',
      tuitionDomestic: 6100,
      tuitionIntl: 58000,
      enrolment: 97000,
      programmes: 700,
      rankMacleans: 1,
      rankTimes: 21,
      highlights: ['Top 25 globally (THE)', '10 Nobel Prizes', 'Largest university in Canada', 'Rotman & Osgoode'],
      bestFor: ['Finance & consulting', 'Academic research', 'Largest alumni network'],
    },
    b: {
      name: 'McGill University',
      shortName: 'McGill',
      slug: 'mcgill',
      city: 'Montreal',
      province: 'QC',
      tuitionDomestic: 3800,
      tuitionIntl: 26000,
      enrolment: 40000,
      programmes: 300,
      rankMacleans: 2,
      rankTimes: 46,
      highlights: ['Top 50 globally', 'Bilingual Montreal campus', 'Strong medicine & law', 'Lower international fees'],
      bestFor: ['Bilingual environment', 'Medicine & life sciences', 'Budget-conscious international students'],
    },
  },
  'sfu-vs-uvic': {
    slug: 'sfu-vs-uvic',
    lastUpdated: '2026-10',
    verdict: 'SFU for co-op & urban access; UVic for environment & community.',
    verdictDetail:
      'Simon Fraser has campuses in Burnaby, Surrey, and Vancouver with deep co-op and industry connections and a fast-growing business and tech ecosystem. The University of Victoria sits in a scenic mid-sized city with a strong co-op tradition of its own, world-class ocean science programmes, and a tight campus community. If you want big-city internships, SFU. If you want a more contained, community-oriented campus where ocean and environmental research lead, UVic.',
    relatedSlugs: ['ubc-vs-sfu', 'uoft-vs-ubc'],
    a: {
      name: 'Simon Fraser University',
      shortName: 'SFU',
      slug: 'sfu',
      city: 'Burnaby',
      province: 'BC',
      tuitionDomestic: 5200,
      tuitionIntl: 38000,
      enrolment: 35000,
      programmes: 200,
      rankMacleans: 2,
      rankTimes: 251,
      highlights: ['#1 comprehensive (Maclean\'s)', 'Co-op in 50+ countries', 'Tri-semester calendar', 'Three Metro Vancouver campuses'],
      bestFor: ['Co-op & industry links', 'Flexible scheduling', 'Business & computing'],
    },
    b: {
      name: 'University of Victoria',
      shortName: 'UVic',
      slug: 'uvic',
      city: 'Victoria',
      province: 'BC',
      tuitionDomestic: 5500,
      tuitionIntl: 32000,
      enrolment: 22000,
      programmes: 150,
      rankMacleans: 4,
      rankTimes: 601,
      highlights: ['Strong co-op tradition', 'Ocean & climate research', 'Smaller campus community', 'Victoria lifestyle'],
      bestFor: ['Environmental & ocean sciences', 'Close-knit campus feel', 'Pacific coast lifestyle'],
    },
  },
}

const ALL_COMPARISONS = { ...COMPARISONS, ...COMPARISONS_EXTRA }

const RELATED_LABELS: Record<string, string> = {
  'ubc-vs-sfu': 'UBC vs SFU',
  'uoft-vs-ubc': 'U of T vs UBC',
  'uoft-vs-mcgill': 'U of T vs McGill',
  'sfu-vs-uvic': 'SFU vs UVic',
}

type Props = { params: Promise<{ slug: string }> }

export async function generateStaticParams() {
  return Object.keys(ALL_COMPARISONS).map((slug) => ({ slug }))
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  const cmp = ALL_COMPARISONS[slug]
  if (!cmp) return {}
  return {
    title: `${cmp.a.shortName} vs ${cmp.b.shortName}: Tuition, Rankings & Programmes | Digital Kampus`,
    description: `${cmp.a.name} vs ${cmp.b.name}. Compare tuition, rankings, programmes, and scholarships. ${cmp.verdict}`,
    alternates: {
      canonical: `https://digitalkampus.ca/compare/${slug}`,
      languages: {
        'en-CA': `https://digitalkampus.ca/compare/${slug}`,
        'fr-CA': `https://digitalkampus.ca/fr/comparer/${slug}`,
      },
    },
  }
}

function Row({ label, valA, valB }: { label: string; valA: string; valB: string }) {
  return (
    <div className={styles.row}>
      <span className={styles.rowLabel}>{label}</span>
      <span className={styles.rowVal}>{valA}</span>
      <span className={styles.rowVal}>{valB}</span>
    </div>
  )
}

export default async function ComparisonPage({ params }: Props) {
  const { slug } = await params
  const cmp = ALL_COMPARISONS[slug]
  if (!cmp) notFound()

  const { a, b } = cmp

  const ldFaq = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: [
      {
        '@type': 'Question',
        name: `Which is better: ${a.name} or ${b.name}?`,
        acceptedAnswer: { '@type': 'Answer', text: cmp.verdictDetail },
      },
      {
        '@type': 'Question',
        name: `What is the tuition at ${a.name} vs ${b.name}?`,
        acceptedAnswer: {
          '@type': 'Answer',
          text: `${a.name} domestic tuition is $${a.tuitionDomestic.toLocaleString()}/year; ${b.name} is $${b.tuitionDomestic.toLocaleString()}/year. International students pay $${a.tuitionIntl.toLocaleString()} at ${a.shortName} and $${b.tuitionIntl.toLocaleString()} at ${b.shortName}.`,
        },
      },
    ],
  }

  const breadcrumbs = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://digitalkampus.ca' },
      { '@type': 'ListItem', position: 2, name: 'Compare', item: 'https://digitalkampus.ca/compare' },
      { '@type': 'ListItem', position: 3, name: `${a.shortName} vs ${b.shortName}`, item: `https://digitalkampus.ca/compare/${slug}` },
    ],
  }

  return (
    <>
      <JsonLd data={ldFaq} />
      <JsonLd data={breadcrumbs} />
      <SiteNav />
      <main>
        <section className={styles.hero}>
          <div className={styles.inner}>
            <nav className={styles.breadcrumb} aria-label="Breadcrumb">
              <Link href="/">Home</Link>
              <span> › </span>
              <Link href="/compare">Compare</Link>
              <span> › </span>
              <span aria-current="page">{a.shortName} vs {b.shortName}</span>
            </nav>
            <h1 className={styles.h1}>
              {a.name} vs {b.name}
            </h1>
            <p className={styles.lastUpdated}>Last updated: {cmp.lastUpdated} · Verified data</p>
          </div>
        </section>

        <div className={styles.body}>
          <div className={styles.inner}>
            <section className={styles.verdict} aria-label="Verdict">
              <h2 className={styles.verdictH}>The verdict</h2>
              <p className={styles.verdictShort}>{cmp.verdict}</p>
              <p className={styles.verdictLong}>{cmp.verdictDetail}</p>
            </section>

            <section className={styles.tableWrap} aria-label="Comparison table">
              <div className={styles.tableHead}>
                <span />
                <Link href={`/schools/${a.slug}`} className={styles.schoolLink}>{a.name}</Link>
                <Link href={`/schools/${b.slug}`} className={styles.schoolLink}>{b.name}</Link>
              </div>
              <div className={styles.table}>
                <Row label="City" valA={`${a.city}, ${a.province}`} valB={`${b.city}, ${b.province}`} />
                <Row label="Domestic tuition" valA={`$${a.tuitionDomestic.toLocaleString()}/yr`} valB={`$${b.tuitionDomestic.toLocaleString()}/yr`} />
                <Row label="International tuition" valA={`$${a.tuitionIntl.toLocaleString()}/yr`} valB={`$${b.tuitionIntl.toLocaleString()}/yr`} />
                <Row label="Enrolment" valA={a.enrolment.toLocaleString()} valB={b.enrolment.toLocaleString()} />
                <Row label="Programmes" valA={`${a.programmes}+`} valB={`${b.programmes}+`} />
                <Row label="Maclean's rank" valA={`#${a.rankMacleans}`} valB={`#${b.rankMacleans}`} />
                <Row label="Times rank" valA={`#${a.rankTimes}`} valB={`#${b.rankTimes}`} />
              </div>
            </section>

            <div className={styles.highlightGrid}>
              {[a, b].map((school) => (
                <div key={school.slug} className={styles.highlightCard}>
                  <h3 className={styles.highlightH}>{school.shortName} highlights</h3>
                  <ul className={styles.highlightList}>
                    {school.highlights.map((h) => <li key={h}>{h}</li>)}
                  </ul>
                  <h4 className={styles.bestH}>Best for</h4>
                  <ul className={styles.bestList}>
                    {school.bestFor.map((b) => <li key={b}><span className={styles.bestDot} />  {b}</li>)}
                  </ul>
                </div>
              ))}
            </div>

            <section className={styles.cta}>
              <h2 className={styles.ctaH}>Ready to decide?</h2>
              <p className={styles.ctaP}>
                Match scholarships and bursaries at both schools — free, in under 2 minutes.
              </p>
              <Link href="/signup" className={styles.ctaBtn}>Get started free →</Link>
            </section>

            {cmp.relatedSlugs.length > 0 && (
              <section className={styles.related}>
                <h2 className={styles.relatedH}>Related comparisons</h2>
                <div className={styles.relatedRow}>
                  {cmp.relatedSlugs.map((s) => (
                    <Link key={s} href={`/compare/${s}`} className={styles.relatedCard}>
                      {RELATED_LABELS[s] ?? s}
                    </Link>
                  ))}
                </div>
              </section>
            )}
          </div>
        </div>
      </main>
      <SiteFooter />
    </>
  )
}
