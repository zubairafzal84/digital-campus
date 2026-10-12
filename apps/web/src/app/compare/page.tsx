import type { Metadata } from 'next'
import Link from 'next/link'
import { JsonLd } from '@/components/seo/JsonLd'
import { SiteNav } from '@/components/layout/SiteNav'
import { SiteFooter } from '@/components/layout/SiteFooter'
import CompareClient from './CompareClient'
import styles from './compare.module.css'

export const metadata: Metadata = {
  title: 'Compare Canadian Universities & Colleges | Digital Kampus',
  description:
    'Side-by-side comparisons of Canadian universities and colleges. Tuition, rankings, programmes, scholarships. Make the right choice for your future.',
  alternates: {
    canonical: 'https://digitalkampus.ca/compare',
    languages: {
      'en-CA': 'https://digitalkampus.ca/compare',
      'fr-CA': 'https://digitalkampus.ca/fr/comparer',
    },
  },
}

const POPULAR = [
  { slug: 'ubc-vs-sfu', label: 'UBC vs SFU', tag: 'BC rivals' },
  { slug: 'uoft-vs-ubc', label: 'U of T vs UBC', tag: 'Top 2 Canada' },
  { slug: 'mcgill-vs-udem', label: 'McGill vs UdeM', tag: 'Montréal' },
  { slug: 'uoft-vs-mcgill', label: 'U of T vs McGill', tag: 'Research giants' },
  { slug: 'sfu-vs-uvic', label: 'SFU vs UVic', tag: 'BC universities' },
  { slug: 'uottawa-vs-carleton', label: 'uOttawa vs Carleton', tag: 'Ottawa schools' },
  { slug: 'ualberta-vs-ucalgary', label: 'UAlberta vs UCalgary', tag: 'Alberta' },
  { slug: 'humber-vs-seneca', label: 'Humber vs Seneca', tag: 'Ontario colleges' },
]

const ldJson = {
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: [
    { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://digitalkampus.ca' },
    { '@type': 'ListItem', position: 2, name: 'Compare', item: 'https://digitalkampus.ca/compare' },
  ],
}

type Props = {
  searchParams: Promise<{ a?: string; b?: string; c?: string }>
}

export default async function ComparePage({ searchParams }: Props) {
  const { a, b, c } = await searchParams

  return (
    <>
      <JsonLd data={ldJson} />
      <SiteNav />
      <main>
        <section className={styles.hero}>
          <div className={styles.inner}>
            <nav className={styles.breadcrumb} aria-label="Breadcrumb">
              <Link href="/">Home</Link>
              <span> › </span>
              <span aria-current="page">Compare</span>
            </nav>
            <h1 className={styles.h1}>
              Compare Canadian<br />
              <span className={styles.hi}>Universities & Colleges</span>
            </h1>
            <p className={styles.sub}>
              Tuition, rankings, programmes, acceptance rates — side by side.<br />
              Make the right choice for your future.
            </p>
          </div>
        </section>

        <section className={styles.popular}>
          <div className={styles.inner}>
            <p className={styles.sectionTag}>Popular comparisons</p>
            <h2 className={styles.h2}>What students are comparing</h2>
            <div className={styles.grid}>
              {POPULAR.map(({ slug, label, tag }) => (
                <Link key={slug} href={`/compare/${slug}`} className={styles.card}>
                  <span className={styles.cardTag}>{tag}</span>
                  <span className={styles.cardLabel}>{label}</span>
                  <span className={styles.cardArrow}>→</span>
                </Link>
              ))}
            </div>
          </div>
        </section>

        <CompareClient initialA={a} initialB={b} initialC={c} />
      </main>
      <SiteFooter />
    </>
  )
}
