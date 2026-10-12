import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import { Breadcrumbs } from '@/components/ui/Breadcrumbs'
import styles from './scholarship.module.css'

export const revalidate = 3600

interface Scholarship {
  slug:         string
  name:         string
  provider:     string
  amount:       string
  deadline:     string
  renewable:    boolean
  gpa:          string | null
  programs:     string[]
  description:  string
  eligibility:  string[]
  howToApply:   string
  url:          string
}

const SCHOLARSHIPS: Record<string, Scholarship> = {
  'vanier-cgs': {
    slug:        'vanier-cgs',
    name:        'Vanier Canada Graduate Scholarships',
    provider:    'Government of Canada',
    amount:      '$50,000/year',
    deadline:    'November 1',
    renewable:   true,
    gpa:         '3.7+',
    programs:    ['Graduate', 'PhD'],
    description: 'The Vanier CGS program strengthens Canada’s ability to attract and retain world-class doctoral students by supporting students who demonstrate both leadership skills and a high standard of scholarly achievement in graduate studies in the social sciences, humanities, natural sciences, engineering, and health.',
    eligibility: [
      'Canadian citizen or permanent resident',
      'First-year doctoral student or about to start',
      'Nominated by a Canadian university',
      'GPA of 3.7 or higher in last two years of study',
    ],
    howToApply:  'Applications are submitted through your university. Contact your graduate admissions office for the internal nomination deadline.',
    url:         'https://vanier.gc.ca',
  },
  'trudeau-foundation': {
    slug:        'trudeau-foundation',
    name:        'Pierre Elliott Trudeau Foundation Scholarship',
    provider:    'Trudeau Foundation',
    amount:      '$60,000 + $20,000 travel',
    deadline:    'November 1',
    renewable:   true,
    gpa:         null,
    programs:    ['PhD', 'Social Sciences', 'Humanities'],
    description: 'The Pierre Elliott Trudeau Foundation Scholarship supports doctoral students whose research focuses on the four themes central to Pierre Elliott Trudeau’s legacy: engaged citizenship, human rights and dignity, responsible citizenship, and Canada and the world.',
    eligibility: [
      'Canadian citizen or landed immigrant',
      'Enrolled in or accepted to a Canadian university doctoral program',
      'Research aligned with Foundation themes',
      'Demonstrated leadership and civic engagement',
    ],
    howToApply:  'Apply directly through the Foundation’s online portal. Two academic references required.',
    url:         'https://www.trudeaufoundation.ca',
  },
  'nserc-pgsd': {
    slug:        'nserc-pgsd',
    name:        'NSERC Postgraduate Scholarships–Doctoral',
    provider:    'Natural Sciences and Engineering Research Council',
    amount:      '$21,000/year',
    deadline:    'October 15',
    renewable:   true,
    gpa:         '3.5+',
    programs:    ['Science', 'Engineering', 'PhD'],
    description: 'NSERC PGS D provides financial support to high-calibre scholars engaged in doctoral programs in the natural sciences or engineering. The scholarship is intended to develop research skills and assist in the training of highly qualified personnel.',
    eligibility: [
      'Canadian citizen or permanent resident',
      'Full-time doctoral student',
      'Natural sciences or engineering program',
      'First-class average (A–) in last two completed years',
    ],
    howToApply:  'Apply through the NSERC online application portal. Applications submitted by your university.',
    url:         'https://www.nserc-crsng.gc.ca',
  },
  'sshrc-doctoral': {
    slug:        'sshrc-doctoral',
    name:        'SSHRC Doctoral Fellowship',
    provider:    'Social Sciences and Humanities Research Council',
    amount:      '$20,000/year',
    deadline:    'October 15',
    renewable:   true,
    gpa:         '3.5+',
    programs:    ['Social Sciences', 'Humanities', 'PhD'],
    description: 'SSHRC Doctoral Fellowships support high-calibre students who are engaged in doctoral programs in the social sciences and humanities. The program develops research skills and assists in the training of highly qualified Canadian researchers.',
    eligibility: [
      'Canadian citizen or permanent resident',
      'Pursuing a full-time doctoral degree',
      'Social sciences or humanities discipline',
      'High academic standing',
    ],
    howToApply:  'Apply through the SSHRC online portal. Institutional approval may be required.',
    url:         'https://www.sshrc-crsh.gc.ca',
  },
  'ontario-grad': {
    slug:        'ontario-grad',
    name:        'Ontario Graduate Scholarship',
    provider:    'Government of Ontario',
    amount:      '$15,000/year',
    deadline:    'Varies by university',
    renewable:   true,
    gpa:         '3.7+',
    programs:    ['Graduate', 'Masters', 'PhD'],
    description: 'The Ontario Graduate Scholarship program encourages excellence in graduate studies at publicly assisted universities in Ontario. OGS is jointly funded by the Province of Ontario and Ontario universities.',
    eligibility: [
      'Canadian citizen, permanent resident, or protected person',
      'Enrolled full-time in a qualifying Ontario university',
      'High academic achievement (A– average or higher)',
      'Any discipline',
    ],
    howToApply:  'Apply through your university’s graduate studies office. Check your school’s specific deadline.',
    url:         'https://osap.gov.on.ca',
  },
  'rbc-future-launch': {
    slug:        'rbc-future-launch',
    name:        'RBC Future Launch Scholarship',
    provider:    'RBC',
    amount:      '$5,000',
    deadline:    'April 30',
    renewable:   false,
    gpa:         null,
    programs:    ['Undergraduate', 'Any'],
    description: 'The RBC Future Launch Scholarship supports young Canadians who are working to remove barriers for others in their community. Recipients demonstrate a commitment to giving back and helping their peers succeed.',
    eligibility: [
      'Canadian citizen or permanent resident',
      'Full-time post-secondary student',
      'Under 30 years of age',
      'Demonstrated community leadership',
    ],
    howToApply:  'Apply online through the RBC Future Launch portal. Essay and references required.',
    url:         'https://www.rbc.com/community-social-impact/youth-education',
  },
}

type Props = {
  params: Promise<{ slug: string }>
}

export async function generateStaticParams() {
  return Object.keys(SCHOLARSHIPS).map((slug) => ({ slug }))
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  const s = SCHOLARSHIPS[slug]
  if (!s) return {}
  return {
    title:       `${s.name} | Digital Kampus`,
    description: s.description.slice(0, 155),
    alternates:  { languages: { 'x-default': `/scholarships/${slug}`, fr: `/fr/scholarships/${slug}` } },
  }
}

export default async function ScholarshipDetailPage({ params }: Props) {
  const { slug } = await params
  const s = SCHOLARSHIPS[slug]
  if (!s) notFound()

  return (
    <main className={styles.page}>
      <Breadcrumbs items={[
        { label: 'Home', href: '/' },
        { label: 'Scholarships', href: '/scholarships' },
        { label: s.name },
      ]} />

      <div className={styles.layout}>
        <article className={styles.main}>
          <header className={styles.articleHeader}>
            <div className={styles.providerRow}>
              <span className={styles.provider}>{s.provider}</span>
              {s.renewable && <span className={styles.renewableBadge}>Renewable</span>}
            </div>
            <h1 className={styles.h1}>{s.name}</h1>
            <div className={styles.metaRow}>
              <span className={styles.amount}>{s.amount}</span>
              <span className={styles.dot} aria-hidden>·</span>
              <span className={styles.deadline}>Deadline: {s.deadline}</span>
              {s.gpa && (
                <>
                  <span className={styles.dot} aria-hidden>·</span>
                  <span className={styles.gpa}>GPA {s.gpa}</span>
                </>
              )}
            </div>
            <div className={styles.programs}>
              {s.programs.map((p) => (
                <span key={p} className={styles.programChip}>{p}</span>
              ))}
            </div>
          </header>

          <section className={styles.section}>
            <h2 className={styles.h2}>About this scholarship</h2>
            <p className={styles.body}>{s.description}</p>
          </section>

          <section className={styles.section}>
            <h2 className={styles.h2}>Eligibility requirements</h2>
            <ul className={styles.eligList}>
              {s.eligibility.map((item, i) => (
                <li key={i} className={styles.eligItem}>
                  <span className={styles.check} aria-hidden>✓</span>
                  {item}
                </li>
              ))}
            </ul>
          </section>

          <section className={styles.section}>
            <h2 className={styles.h2}>How to apply</h2>
            <p className={styles.body}>{s.howToApply}</p>
          </section>
        </article>

        <aside className={styles.sidebar}>
          <div className={styles.sideCard}>
            <h3 className={styles.sideH3}>Quick facts</h3>
            <dl className={styles.dl}>
              <dt>Amount</dt>
              <dd>{s.amount}</dd>
              <dt>Deadline</dt>
              <dd>{s.deadline}</dd>
              <dt>Renewable</dt>
              <dd>{s.renewable ? 'Yes' : 'One-time'}</dd>
              {s.gpa && <><dt>Min. GPA</dt><dd>{s.gpa}</dd></>}
              <dt>Programs</dt>
              <dd>{s.programs.join(', ')}</dd>
            </dl>
            <a
              href={s.url}
              target="_blank"
              rel="noopener noreferrer"
              className={styles.applyBtn}
            >
              Apply on official site
            </a>
            <p className={styles.freeNote}>
              Scholarship matching is always free on Digital Kampus.
            </p>
          </div>

          <div className={styles.sideCard}>
            <h3 className={styles.sideH3}>Get matched</h3>
            <p className={styles.sideBody}>
              Create a free account to see your personalized scholarship matches based on your program, province, and academic profile.
            </p>
            <Link href="/signup" className={styles.signupBtn}>Create free account</Link>
          </div>
        </aside>
      </div>
    </main>
  )
}
