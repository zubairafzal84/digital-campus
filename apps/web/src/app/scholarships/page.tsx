import type { Metadata } from 'next'
import Link from 'next/link'
import { JsonLd } from '@/components/seo/JsonLd'
import { SiteNav } from '@/components/layout/SiteNav'
import { SiteFooter } from '@/components/layout/SiteFooter'
import styles from './scholarships.module.css'

export const metadata: Metadata = {
  title: 'Scholarships & Bursaries for Canadian Students | Digital Kampus',
  description:
    'Find and match scholarships, bursaries, and grants at Canadian colleges and universities. Free for students. Deadline alerts included.',
  alternates: {
    canonical: 'https://digitalkampus.ca/scholarships',
    languages: {
      'en-CA': 'https://digitalkampus.ca/scholarships',
      'fr-CA': 'https://digitalkampus.ca/fr/bourses',
    },
  },
}

const LISTINGS = [
  {
    id: 1,
    name: 'President\'s Entrance Scholarship',
    school: 'University of British Columbia',
    schoolSlug: 'ubc',
    amount: 40000,
    type: 'entrance',
    deadline: '2027-02-28',
    description: 'For outstanding domestic entering students. Renewable for 4 years.',
    tags: ['Domestic', 'Entrance', 'Renewable'],
  },
  {
    id: 2,
    name: 'Canada Graduate Scholarships — Master\'s',
    school: 'SSHRC / NSERC / CIHR',
    schoolSlug: null,
    amount: 17500,
    type: 'government',
    deadline: '2026-12-01',
    description: 'Federal government scholarship for Canadian master\'s students across disciplines.',
    tags: ['Federal', 'Graduate', 'Any school'],
  },
  {
    id: 3,
    name: 'Terry Fox Humanitarian Award',
    school: 'Multi-school',
    schoolSlug: null,
    amount: 28000,
    type: 'merit',
    deadline: '2027-02-01',
    description: 'For students who demonstrate academic achievement combined with volunteer service.',
    tags: ['Merit', 'Community', 'National'],
  },
  {
    id: 4,
    name: 'Loran Award',
    school: 'Loran Scholars Foundation',
    schoolSlug: null,
    amount: 100000,
    type: 'merit',
    deadline: '2026-11-01',
    description: 'One of Canada\'s most prestigious undergraduate scholarships. Full support over 4 years.',
    tags: ['Prestigious', 'Undergraduate', 'National'],
  },
  {
    id: 5,
    name: 'TD Scholarship for Community Leadership',
    school: 'TD Bank',
    schoolSlug: null,
    amount: 70000,
    type: 'merit',
    deadline: '2027-01-15',
    description: 'For students who demonstrate outstanding community leadership and volunteerism.',
    tags: ['Community', 'Leadership', 'National'],
  },
  {
    id: 6,
    name: 'BC Access Grant',
    school: 'Province of British Columbia',
    schoolSlug: null,
    amount: 4000,
    type: 'government',
    deadline: 'Rolling',
    description: 'Needs-based grant for BC students. No repayment required.',
    tags: ['Needs-based', 'BC', 'Grant'],
  },
]

const faqLd = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: [
    {
      '@type': 'Question',
      name: 'Is scholarship matching free on Digital Kampus?',
      acceptedAnswer: { '@type': 'Answer', text: 'Yes. Scholarship and bursary matching is free for all students on Digital Kampus and will always remain free.' },
    },
    {
      '@type': 'Question',
      name: 'How does scholarship matching work?',
      acceptedAnswer: { '@type': 'Answer', text: 'After you create a free account and add your programme, year, province, and background, we automatically match you to scholarships and bursaries you are eligible for — and alert you before deadlines.' },
    },
  ],
}

export default function ScholarshipsPage() {
  return (
    <>
      <JsonLd data={faqLd} />
      <SiteNav />
      <main>
        <section className={styles.hero}>
          <div className={styles.inner}>
            <nav className={styles.breadcrumb} aria-label="Breadcrumb">
              <Link href="/">Home</Link>
              <span> › </span>
              <span aria-current="page">Scholarships</span>
            </nav>
            <div className={styles.heroContent}>
              <div>
                <h1 className={styles.h1}>
                  Scholarships & Bursaries<br />
                  <span className={styles.hi}>for Canadian Students</span>
                </h1>
                <p className={styles.sub}>
                  Matching is free. Deadline alerts included.
                </p>
              </div>
              <Link href="/signup" className={styles.ctaBtn}>
                Match scholarships free →
              </Link>
            </div>
          </div>
        </section>

        <section className={styles.trust}>
          <div className={styles.inner}>
            <div className={styles.trustRow}>
              <div className={styles.trustItem}>
                <span className={styles.trustNum}>$4.2B+</span>
                <span className={styles.trustLabel}>in scholarships tracked</span>
              </div>
              <div className={styles.trustItem}>
                <span className={styles.trustNum}>1,200+</span>
                <span className={styles.trustLabel}>awards across Canada</span>
              </div>
              <div className={styles.trustItem}>
                <span className={styles.trustNum}>Free</span>
                <span className={styles.trustLabel}>for every student, always</span>
              </div>
            </div>
          </div>
        </section>

        <section className={styles.listings}>
          <div className={styles.inner}>
            <h2 className={styles.h2}>Featured opportunities</h2>
            <p className={styles.listNote}>
              Sign in to see your personalized matches.{' '}
              <Link href="/signup" className={styles.inlineLink}>Create free account →</Link>
            </p>
            <div className={styles.grid}>
              {LISTINGS.map((s) => (
                <div key={s.id} className={styles.card}>
                  <div className={styles.cardTop}>
                    <span className={styles.amount}>${s.amount.toLocaleString()}</span>
                    <span className={`${styles.typeBadge} ${styles[s.type]}`}>{s.type}</span>
                  </div>
                  <h3 className={styles.cardName}>{s.name}</h3>
                  <p className={styles.cardSchool}>
                    {s.schoolSlug
                      ? <Link href={`/schools/${s.schoolSlug}`}>{s.school}</Link>
                      : s.school}
                  </p>
                  <p className={styles.cardDesc}>{s.description}</p>
                  <div className={styles.cardTags}>
                    {s.tags.map((t) => <span key={t} className={styles.tag}>{t}</span>)}
                  </div>
                  <div className={styles.cardFooter}>
                    <span className={styles.deadline}>
                      Deadline: <strong>{s.deadline}</strong>
                    </span>
                    <Link href="/signup" className={styles.applyBtn}>Apply free →</Link>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className={styles.faq}>
          <div className={styles.inner}>
            <h2 className={styles.h2}>Common questions</h2>
            <dl className={styles.faqList}>
              <dt>Is scholarship matching free?</dt>
              <dd>Yes. Scholarship and bursary matching is free for all students on Digital Kampus and will always remain free.</dd>
              <dt>How does matching work?</dt>
              <dd>Add your programme, year, province, and background. We match you to eligible awards and alert you before deadlines — no spam.</dd>
              <dt>Can international students apply?</dt>
              <dd>Many awards are open to international students. Our matching flags eligibility clearly for each listing.</dd>
            </dl>
          </div>
        </section>
      </main>
      <SiteFooter />
    </>
  )
}
