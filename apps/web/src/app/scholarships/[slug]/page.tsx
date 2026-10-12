import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import { SiteNav } from '@/components/layout/SiteNav'
import { SiteFooter } from '@/components/layout/SiteFooter'
import { JsonLd } from '@/components/seo/JsonLd'
import { Breadcrumbs } from '@/components/ui/Breadcrumbs'
import { SCHOLARSHIPS } from '../scholarships-data'
import styles from './scholarship.module.css'

export const revalidate = 3600

type Props = { params: Promise<{ slug: string }> }

export async function generateStaticParams() {
  return SCHOLARSHIPS.map(s => ({ slug: s.id }))
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  const s = SCHOLARSHIPS.find(x => x.id === slug)
  if (!s) return {}
  return {
    title: `${s.name} — ${s.amountDisplay} | Digital Kampus`,
    description: s.description.slice(0, 155),
    alternates: {
      languages: {
        'x-default': `/scholarships/${slug}`,
        'fr-CA': `/fr/scholarships/${slug}`,
      },
    },
  }
}

const FUNDER_LABEL: Record<string, string> = {
  federal: 'Federal',
  provincial: 'Provincial',
  institutional: 'Institutional',
  private: 'Private',
  indigenous: 'Indigenous',
}

export default async function ScholarshipDetailPage({ params }: Props) {
  const { slug } = await params
  const s = SCHOLARSHIPS.find(x => x.id === slug)
  if (!s) notFound()

  const similar = SCHOLARSHIPS.filter(x => x.id !== s.id && x.funderType === s.funderType).slice(0, 3)

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'MonetaryGrant',
    name: s.name,
    description: s.fullDescription,
    funder: {
      '@type': 'Organization',
      name: s.funder,
    },
    amount: {
      '@type': 'MonetaryAmount',
      minValue: s.amountMin,
      maxValue: s.amountMax,
      currency: 'CAD',
    },
    url: s.url,
    ...(s.deadlineISO ? { applicationDeadline: s.deadlineISO } : {}),
  }

  const badgeClass =
    s.funderType === 'federal'       ? styles.badgeFederal :
    s.funderType === 'provincial'    ? styles.badgeProvincial :
    s.funderType === 'institutional' ? styles.badgeInstitutional :
    s.funderType === 'private'       ? styles.badgePrivate :
    styles.badgeIndigenous

  return (
    <>
      <JsonLd data={jsonLd} />
      <SiteNav />

      <main className={styles.page}>
        <Breadcrumbs items={[
          { label: 'Home',         href: '/' },
          { label: 'Scholarships', href: '/scholarships' },
          { label: s.name },
        ]} />

        <div className={styles.layout}>
          {/* ── Main content ── */}
          <article className={styles.main}>
            <header className={styles.articleHeader}>
              <div className={styles.providerRow}>
                <span className={styles.provider}>{s.funder}</span>
                <span className={`${styles.funderBadge} ${badgeClass}`}>
                  {FUNDER_LABEL[s.funderType]}
                </span>
                {s.renewable && (
                  <span className={styles.renewableBadge}>Renewable</span>
                )}
              </div>

              <h1 className={styles.h1}>{s.name}</h1>

              <div className={styles.metaRow}>
                <span className={styles.amount}>{s.amountDisplay}</span>
                <span className={styles.dot} aria-hidden>·</span>
                <span className={styles.deadline}>
                  {s.deadline === 'Rolling' ? 'Rolling deadline' : `Deadline: ${s.deadline}`}
                </span>
                {s.gpa && (
                  <>
                    <span className={styles.dot} aria-hidden>·</span>
                    <span className={styles.gpa}>Min. GPA {s.gpa}</span>
                  </>
                )}
              </div>

              <div className={styles.chips}>
                {s.tags.map(t => (
                  <span key={t} className={styles.chip}>{t}</span>
                ))}
              </div>
            </header>

            <section className={styles.section}>
              <h2 className={styles.h2}>About this scholarship</h2>
              <p className={styles.body}>{s.fullDescription}</p>
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
              <p className={styles.needNote}>
                Financial need:{' '}
                <strong>
                  {s.financialNeed === 'required'     ? 'Required'      :
                   s.financialNeed === 'not_required' ? 'Not required'  :
                   'Considered but not required'}
                </strong>
              </p>
            </section>

            <section className={styles.section}>
              <h2 className={styles.h2}>How to apply</h2>
              <p className={styles.body}>{s.howToApply}</p>
              <a
                href={s.url}
                target="_blank"
                rel="noopener noreferrer"
                className={styles.applyBtnInline}
              >
                Apply Now →
              </a>
            </section>

            {/* ── Similar scholarships ── */}
            {similar.length > 0 && (
              <section className={styles.section}>
                <h2 className={styles.h2}>Similar scholarships</h2>
                <div className={styles.similarGrid}>
                  {similar.map(sim => (
                    <Link key={sim.id} href={`/scholarships/${sim.id}`} className={styles.simCard}>
                      <span className={styles.simAmount}>{sim.amountDisplay}</span>
                      <span className={styles.simName}>{sim.name}</span>
                      <span className={styles.simFunder}>{sim.funder}</span>
                    </Link>
                  ))}
                </div>
              </section>
            )}
          </article>

          {/* ── Sidebar ── */}
          <aside className={styles.sidebar}>
            <div className={styles.sideCard}>
              <h3 className={styles.sideH3}>Quick facts</h3>
              <dl className={styles.dl}>
                <dt>Amount</dt>
                <dd>{s.amountDisplay}</dd>
                <dt>Funder</dt>
                <dd>{s.funder}</dd>
                <dt>Type</dt>
                <dd>{FUNDER_LABEL[s.funderType]}</dd>
                <dt>Deadline</dt>
                <dd>{s.deadline}</dd>
                <dt>Renewable</dt>
                <dd>{s.renewable ? (s.renewalInfo ?? 'Yes') : 'One-time'}</dd>
                {s.gpa && <><dt>Min. GPA</dt><dd>{s.gpa}</dd></>}
                <dt>Financial Need</dt>
                <dd>
                  {s.financialNeed === 'required'     ? 'Required'     :
                   s.financialNeed === 'not_required' ? 'Not required' :
                   'Considered'}
                </dd>
                <dt>Eligible</dt>
                <dd>
                  {s.provinces.includes('all')
                    ? 'All provinces'
                    : s.provinces.join(', ')}
                </dd>
              </dl>
              <a
                href={s.url}
                target="_blank"
                rel="noopener noreferrer"
                className={styles.applyBtn}
              >
                Apply Now →
              </a>
              <p className={styles.freeNote}>
                Scholarship matching is always free on Digital Kampus.
              </p>
            </div>

            <div className={styles.sideCard}>
              <h3 className={styles.sideH3}>Get personalized matches</h3>
              <p className={styles.sideBody}>
                Create a free account to see all scholarships you qualify for, based on your program, province, and academic profile.
              </p>
              <Link href="/signup" className={styles.signupBtn}>Create free account</Link>
            </div>

            <div className={styles.sideCard}>
              <h3 className={styles.sideH3}>Browse more</h3>
              <ul className={styles.browseList}>
                <li><Link href="/scholarships?tab=federal">Federal scholarships</Link></li>
                <li><Link href="/scholarships?tab=provincial">Provincial scholarships</Link></li>
                <li><Link href="/scholarships?tab=institutional">Institutional awards</Link></li>
                <li><Link href="/scholarships?tab=private">Private scholarships</Link></li>
                <li><Link href="/scholarships?tab=indigenous">Indigenous scholarships</Link></li>
              </ul>
            </div>
          </aside>
        </div>
      </main>

      <SiteFooter />
    </>
  )
}
