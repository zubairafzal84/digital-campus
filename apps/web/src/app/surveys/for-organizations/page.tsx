import type { Metadata } from 'next'
import Link from 'next/link'
import styles from './for-orgs.module.css'

export const metadata: Metadata = {
  title: 'Run Surveys with Canadian Students | Digital Kampus for Organizations',
  description:
    'Reach verified Canadian students for market research, UX testing, and brand studies. Set up in minutes. Results you can act on.',
  alternates: {
    languages: { fr: '/fr/surveys/for-organizations' },
  },
}

// ── Static data ──────────────────────────────────────────────────────

const FEATURES = [
  {
    icon: (
      <svg width="28" height="28" viewBox="0 0 28 28" fill="none" aria-hidden="true">
        <circle cx="14" cy="14" r="12" stroke="currentColor" strokeWidth="2"/>
        <path d="M9 14l4 4 6-7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    ),
    title: 'Verified student audience',
    desc:
      'Every respondent has a verified Canadian student account. No bots, no panel farming — just real students from 50+ institutions.',
  },
  {
    icon: (
      <svg width="28" height="28" viewBox="0 0 28 28" fill="none" aria-hidden="true">
        <rect x="4" y="6" width="20" height="16" rx="3" stroke="currentColor" strokeWidth="2"/>
        <path d="M9 12h10M9 16h6" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
      </svg>
    ),
    title: '8 question types',
    desc:
      'Multiple choice, checkboxes, star ratings, NPS, yes/no, scales, short and long text — everything you need for actionable research.',
  },
  {
    icon: (
      <svg width="28" height="28" viewBox="0 0 28 28" fill="none" aria-hidden="true">
        <path d="M4 20l5-5 4 4 5-6 6 7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        <circle cx="9" cy="15" r="2" fill="currentColor"/>
      </svg>
    ),
    title: 'Real-time analytics',
    desc:
      'Watch results roll in live. Bar charts, NPS breakdowns, average scores, and open-text responses — all visible the moment someone submits.',
  },
  {
    icon: (
      <svg width="28" height="28" viewBox="0 0 28 28" fill="none" aria-hidden="true">
        <path d="M14 4v10M14 14l-4-4M14 14l4-4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        <rect x="5" y="18" width="18" height="6" rx="2" stroke="currentColor" strokeWidth="2"/>
      </svg>
    ),
    title: 'One-click CSV export',
    desc:
      'Download every response as a spreadsheet-compatible CSV file the moment you need it — for your own analysis, SPSS, or presentation deck.',
  },
  {
    icon: (
      <svg width="28" height="28" viewBox="0 0 28 28" fill="none" aria-hidden="true">
        <circle cx="10" cy="10" r="3" stroke="currentColor" strokeWidth="2"/>
        <circle cx="18" cy="10" r="3" stroke="currentColor" strokeWidth="2"/>
        <circle cx="14" cy="19" r="3" stroke="currentColor" strokeWidth="2"/>
        <path d="M13 10h2M11.5 13l-1 4M16.5 13l1 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
      </svg>
    ),
    title: 'Granular targeting',
    desc:
      'Narrow your audience by institution, programme, or year of study. Run a UBC engineering-only study or go national — your choice.',
  },
  {
    icon: (
      <svg width="28" height="28" viewBox="0 0 28 28" fill="none" aria-hidden="true">
        <path d="M14 4l2.5 5 5.5.8-4 3.9.95 5.5L14 16.5l-4.95 2.7.95-5.5L6 9.8l5.5-.8L14 4z"
          stroke="currentColor" strokeWidth="2" strokeLinejoin="round"/>
      </svg>
    ),
    title: 'Reward management',
    desc:
      'Attach a gift card, draw entry, or subscription reward to boost completion rates. We track claims and flag fulfilled rewards.',
  },
]

const PLANS = [
  {
    name: 'Free',
    price: '$0',
    period: '',
    description: 'For pilot studies and small research projects.',
    features: [
      '1 active survey',
      'Up to 100 responses',
      'All 8 question types',
      'Real-time results dashboard',
      'CSV export',
    ],
    cta: 'Get started free',
    href: '/surveys/create',
    highlight: false,
  },
  {
    name: 'Starter',
    price: '$49',
    period: '/month',
    description: 'For brands running recurring student research.',
    features: [
      '5 active surveys',
      'Up to 1,000 responses / survey',
      'All question types',
      'Targeting by school',
      'Reward tracking',
      'Priority listing placement',
    ],
    cta: 'Start with Starter',
    href: '/surveys/create',
    highlight: false,
  },
  {
    name: 'Professional',
    price: '$149',
    period: '/month',
    description: 'For research teams and mid-market companies.',
    features: [
      '20 active surveys',
      'Unlimited responses',
      'Target by school, programme & year',
      'Featured placement on /surveys',
      'Reward fulfillment dashboard',
      'Invite-only link sharing',
      'Priority email support',
    ],
    cta: 'Start Professional',
    href: '/surveys/create',
    highlight: true,
  },
  {
    name: 'Enterprise',
    price: 'Custom',
    period: '',
    description: 'For large research orgs and agencies.',
    features: [
      'Unlimited surveys & responses',
      'Dedicated account manager',
      'Custom targeting logic',
      'API access',
      'SLA',
      'Co-branded survey header',
      'Invoiced billing',
    ],
    cta: 'Contact us',
    href: '/partners/employers',
    highlight: false,
  },
]

const LOGOS = ['RBC', 'Deloitte', 'Spotify', 'Google', 'TD Bank', 'Tim Hortons']

const STEPS = [
  {
    num: '01',
    title: 'Create your survey',
    desc: 'Use the survey builder to add questions. Mix types: ratings, multiple choice, open text, NPS. Preview as you build.',
  },
  {
    num: '02',
    title: 'Set your audience',
    desc: 'Target all Canadian students or filter by school, programme, or year. Set a response cap and closing date.',
  },
  {
    num: '03',
    title: 'Go live',
    desc: 'Publish with one click. Your survey appears on the Digital Kampus surveys feed — verified students start responding.',
  },
  {
    num: '04',
    title: 'Analyze results',
    desc: 'Watch real-time charts fill in. Export a CSV, share the results link with your team, and close or pause any time.',
  },
]

// ── Component ────────────────────────────────────────────────────────

export default function SurveysForOrganizationsPage() {
  return (
    <div className={styles.page}>

      {/* ── Hero ── */}
      <section className={styles.hero}>
        <div className={styles.heroInner}>
          <span className={styles.eyebrow}>Digital Kampus for Organizations</span>
          <h1 className={styles.h1}>
            Survey 500,000 Canadian{' '}
            <em className={styles.heroEm}>students</em> in days — not months.
          </h1>
          <p className={styles.heroLead}>
            Run market research, UX studies, or brand surveys with verified students
            from 50+ Canadian colleges and universities. Real-time results. No panel
            companies. No minimum spend.
          </p>
          <div className={styles.heroCtas}>
            <Link href="/surveys/create" className={styles.ctaPrimary}>
              Start for free
            </Link>
            <Link href="#plans" className={styles.ctaSecondary}>
              See pricing
            </Link>
          </div>
        </div>
        <div className={styles.heroVisual} aria-hidden="true">
          <div className={styles.mockCard}>
            <div className={styles.mockOrg}>RBC Royal Bank</div>
            <div className={styles.mockTitle}>Student Banking Survey</div>
            <div className={styles.mockQ}>How do you primarily manage your money?</div>
            {['Mobile banking app', 'Spreadsheet', 'I don\'t track'].map((opt) => (
              <div key={opt} className={styles.mockOpt}>{opt}</div>
            ))}
            <div className={styles.mockBar}>
              <div className={styles.mockBarFill} style={{ width: '68%' }} />
              <span className={styles.mockBarLabel}>312 / 500 responses</span>
            </div>
          </div>
        </div>
      </section>

      {/* ── Logo strip ── */}
      <div className={styles.logoStrip}>
        <p className={styles.logoStripLabel}>Used by organizations including</p>
        <div className={styles.logoRow} role="list">
          {LOGOS.map((name) => (
            <span key={name} className={styles.logoItem} role="listitem">{name}</span>
          ))}
        </div>
      </div>

      {/* ── Features ── */}
      <section className={styles.features} id="features" aria-labelledby="features-heading">
        <div className={styles.featuresInner}>
          <div className={styles.sectionHead}>
            <span className={styles.eyebrow}>What you get</span>
            <h2 id="features-heading" className={styles.h2}>
              Everything you need to run great student research
            </h2>
          </div>
          <div className={styles.featGrid}>
            {FEATURES.map((f) => (
              <div key={f.title} className={styles.featCard}>
                <div className={styles.featIcon}>{f.icon}</div>
                <h3 className={styles.featTitle}>{f.title}</h3>
                <p className={styles.featDesc}>{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── How it works ── */}
      <section className={styles.howItWorks} aria-labelledby="how-heading">
        <div className={styles.howInner}>
          <div className={styles.sectionHead}>
            <span className={styles.eyebrow}>How it works</span>
            <h2 id="how-heading" className={styles.h2}>
              From idea to insights in under 10 minutes
            </h2>
          </div>
          <ol className={styles.stepList} role="list">
            {STEPS.map((step) => (
              <li key={step.num} className={styles.step}>
                <span className={styles.stepNum} aria-hidden="true">{step.num}</span>
                <div className={styles.stepBody}>
                  <h3 className={styles.stepTitle}>{step.title}</h3>
                  <p className={styles.stepDesc}>{step.desc}</p>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* ── Pricing ── */}
      <section className={styles.pricing} id="plans" aria-labelledby="pricing-heading">
        <div className={styles.pricingInner}>
          <div className={styles.sectionHead}>
            <span className={styles.eyebrow}>Pricing</span>
            <h2 id="pricing-heading" className={styles.h2}>
              Plans for research teams of every size
            </h2>
            <p className={styles.pricingNote}>
              All plans include a free trial. No credit card required to start.
            </p>
          </div>

          <div className={styles.planGrid}>
            {PLANS.map((plan) => (
              <div
                key={plan.name}
                className={`${styles.planCard} ${plan.highlight ? styles.planCardHighlight : ''}`}
              >
                {plan.highlight && (
                  <div className={styles.popularBadge}>Most popular</div>
                )}
                <div className={styles.planName}>{plan.name}</div>
                <div className={styles.planPrice}>
                  <span className={styles.planPriceNum}>{plan.price}</span>
                  {plan.period && <span className={styles.planPricePeriod}>{plan.period}</span>}
                </div>
                <p className={styles.planDesc}>{plan.description}</p>
                <ul className={styles.planFeatures} role="list">
                  {plan.features.map((feat) => (
                    <li key={feat} className={styles.planFeature}>
                      <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
                        <circle cx="8" cy="8" r="7" stroke="currentColor" strokeWidth="1.5"/>
                        <path d="M5 8l2.5 2.5L11 5.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                      {feat}
                    </li>
                  ))}
                </ul>
                <Link
                  href={plan.href}
                  className={plan.highlight ? styles.planCtaHighlight : styles.planCta}
                >
                  {plan.cta}
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Final CTA ── */}
      <section className={styles.finalCta} aria-labelledby="final-cta-heading">
        <div className={styles.finalCtaInner}>
          <h2 id="final-cta-heading" className={styles.finalCtaTitle}>
            Ready to hear from Canadian students?
          </h2>
          <p className={styles.finalCtaDesc}>
            Set up your first survey for free — no contracts, no minimums.
          </p>
          <div className={styles.heroCtas}>
            <Link href="/surveys/create" className={styles.ctaPrimary}>
              Create a survey
            </Link>
            <Link href="/surveys/dashboard" className={styles.ctaSecondary}>
              View my dashboard
            </Link>
          </div>
        </div>
      </section>

    </div>
  )
}
