import type { Metadata } from 'next'
import Link from 'next/link'
import styles from './surveys.module.css'

export const metadata: Metadata = {
  title: 'Student Surveys — Earn Rewards | Digital Kampus',
  description:
    'Complete surveys from companies and researchers. Some offer gift cards and prizes. Share your voice as a Canadian student.',
  alternates: {
    languages: { fr: '/fr/surveys' },
  },
}

export const revalidate = 3600

/* ── Static seed data (replaced by DB when live) ──────────────────── */

type SurveyTag = 'company' | 'research' | 'quick' | 'student-life'

interface Survey {
  id: string
  org: string
  title: string
  reward: string | null
  durationMin: number
  maxParticipants: number
  currentParticipants: number
  tags: SurveyTag[]
  target: string
  category: 'company' | 'research'
}

const SURVEYS: Survey[] = [
  {
    id: 'rbc-spending-habits-2024',
    org: 'RBC',
    title: 'Student Spending Habits & Financial Goals',
    reward: '$25 Amazon gift card',
    durationMin: 8,
    maxParticipants: 500,
    currentParticipants: 381,
    tags: ['company', 'quick'],
    target: 'All students',
    category: 'company',
  },
  {
    id: 'uoft-mental-health-study',
    org: 'University of Toronto — Psychology Dept.',
    title: 'Student Well-Being & Academic Stress',
    reward: 'Entry into $200 draw',
    durationMin: 12,
    maxParticipants: 1000,
    currentParticipants: 672,
    tags: ['research'],
    target: 'All Canadian students',
    category: 'research',
  },
  {
    id: 'spotify-campus-listening',
    org: 'Spotify',
    title: 'How Students Discover New Music on Campus',
    reward: '3 months Premium',
    durationMin: 5,
    maxParticipants: 300,
    currentParticipants: 289,
    tags: ['company', 'quick'],
    target: 'Engineering & Arts students',
    category: 'company',
  },
  {
    id: 'mcgill-housing-research',
    org: 'McGill Urban Planning Lab',
    title: 'Off-Campus Housing Satisfaction Study',
    reward: null,
    durationMin: 10,
    maxParticipants: 400,
    currentParticipants: 158,
    tags: ['research', 'student-life'],
    target: 'Off-campus students',
    category: 'research',
  },
  {
    id: 'tim-hortons-new-menu',
    org: 'Tim Hortons',
    title: 'Feedback on Our New Campus Menu Items',
    reward: '$10 Tim Hortons card',
    durationMin: 4,
    maxParticipants: 600,
    currentParticipants: 204,
    tags: ['company', 'quick'],
    target: 'All students',
    category: 'company',
  },
  {
    id: 'ubc-transportation-study',
    org: 'UBC Sustainability Initiative',
    title: 'Campus Transportation & Commuting Patterns',
    reward: null,
    durationMin: 7,
    maxParticipants: 800,
    currentParticipants: 443,
    tags: ['research', 'student-life'],
    target: 'UBC students',
    category: 'research',
  },
]

/* ── Helper functions ─────────────────────────────────────────────── */

function spotsLeft(s: Survey) {
  return s.maxParticipants - s.currentParticipants
}

function tagLabel(tag: SurveyTag): string {
  switch (tag) {
    case 'company':      return 'Company'
    case 'research':     return 'Research'
    case 'quick':        return 'Quick'
    case 'student-life': return 'Student Life'
  }
}

function tagClass(tag: SurveyTag): string {
  if (tag === 'company')  return styles.tagCompany
  if (tag === 'research') return styles.tagResearch
  return styles.tag
}

/* ── Page component ───────────────────────────────────────────────── */

export default function SurveysPage() {
  const withRewards  = SURVEYS.filter((s) => s.reward !== null)
  const under5       = SURVEYS.filter((s) => s.durationMin <= 5)
  const researchOnly = SURVEYS.filter((s) => s.category === 'research')
  const companyOnly  = SURVEYS.filter((s) => s.category === 'company')

  return (
    <div className={styles.page}>
      {/* Hero */}
      <section className={styles.hero}>
        <div className={styles.heroInner}>
          <span className={styles.eyebrow}>Student Surveys</span>
          <h1 className={styles.h1}>
            Earn Rewards.{' '}
            <em>Share Your Voice.</em>
          </h1>
          <p className={styles.tagline}>
            Complete surveys from companies and researchers. Some offer gift cards and prizes.
          </p>
        </div>
      </section>

      {/* Trust belt */}
      <div className={styles.trust}>
        <div className={styles.trustRow}>
          <div className={styles.trustItem}>
            <span className={styles.trustNum}>6,200+</span>
            <span className={styles.trustLabel}>surveys completed</span>
          </div>
          <div className={styles.trustItem}>
            <span className={styles.trustNum}>$18,000</span>
            <span className={styles.trustLabel}>rewards distributed</span>
          </div>
          <div className={styles.trustItem}>
            <span className={styles.trustNum}>34</span>
            <span className={styles.trustLabel}>partner organizations</span>
          </div>
          <div className={styles.trustItem}>
            <span className={styles.trustNum}>Always free</span>
            <span className={styles.trustLabel}>to students</span>
          </div>
        </div>
      </div>

      {/* Body */}
      <div className={styles.body}>
        {/* Filter tabs (rendered as links with search params in a real impl;
            shown here as a static default "All" view) */}
        <div className={styles.filters} role="tablist" aria-label="Filter surveys">
          <button className={`${styles.filterTab} ${styles.filterTabActive}`} role="tab" aria-selected="true">
            All ({SURVEYS.length})
          </button>
          <button className={styles.filterTab} role="tab" aria-selected="false">
            With Rewards ({withRewards.length})
          </button>
          <button className={styles.filterTab} role="tab" aria-selected="false">
            Under 5 min ({under5.length})
          </button>
          <button className={styles.filterTab} role="tab" aria-selected="false">
            Research ({researchOnly.length})
          </button>
          <button className={styles.filterTab} role="tab" aria-selected="false">
            Company ({companyOnly.length})
          </button>
        </div>

        {/* Survey grid */}
        {SURVEYS.length === 0 ? (
          <div className={styles.empty}>
            <div className={styles.emptyIcon}>📋</div>
            <p className={styles.emptyTitle}>No surveys available right now.</p>
            <p className={styles.emptySub}>Check back soon — new surveys are posted regularly.</p>
          </div>
        ) : (
          <div className={styles.grid}>
            {SURVEYS.map((survey) => {
              const spots = spotsLeft(survey)
              const isUrgent = spots <= 50

              return (
                <article key={survey.id} className={styles.card}>
                  {/* Card top: org + reward */}
                  <div className={styles.cardTop}>
                    <span className={styles.orgName}>{survey.org}</span>
                    {survey.reward && (
                      <span className={styles.reward} aria-label={`Reward: ${survey.reward}`}>
                        🎁 {survey.reward}
                      </span>
                    )}
                  </div>

                  {/* Title */}
                  <h2 className={styles.cardTitle}>{survey.title}</h2>

                  {/* Meta row */}
                  <div className={styles.cardMeta}>
                    <span className={styles.metaItem}>
                      <span className={styles.metaIcon}>⏱</span>
                      {survey.durationMin} min
                    </span>
                    <span className={styles.metaItem}>
                      <span className={styles.metaIcon}>🎓</span>
                      {survey.target}
                    </span>
                  </div>

                  {/* Tags */}
                  <div className={styles.cardTags}>
                    {survey.tags.map((tag) => (
                      <span key={tag} className={`${styles.tag} ${tagClass(tag)}`}>
                        {tagLabel(tag)}
                      </span>
                    ))}
                  </div>

                  {/* Footer: spots + CTA */}
                  <div className={styles.cardFooter}>
                    <span className={isUrgent ? styles.spotsLeftUrgent : styles.spotsLeft}>
                      {spots <= 0
                        ? 'Full'
                        : isUrgent
                        ? `Only ${spots} spots left!`
                        : `${spots} spots left`}
                    </span>
                    {spots > 0 ? (
                      <Link
                        href={`/surveys/${survey.id}`}
                        className={styles.takeSurveyBtn}
                        aria-label={`Take the survey: ${survey.title}`}
                      >
                        Take Survey →
                      </Link>
                    ) : (
                      <span className={styles.spotsLeft} aria-label="Survey is full">
                        Closed
                      </span>
                    )}
                  </div>
                </article>
              )
            })}
          </div>
        )}

        {/* Run-a-survey CTA */}
        <aside className={styles.runCta} aria-label="Run a survey with Digital Kampus">
          <div className={styles.runCtaText}>
            <p className={styles.runCtaEyebrow}>For organizations</p>
            <h2 className={styles.runCtaTitle}>Want to run a survey?</h2>
            <p className={styles.runCtaDesc}>
              Reach thousands of verified Canadian students. Set up your survey in minutes,
              target by school, programme, or year of study.
            </p>
          </div>
          <Link href="/surveys/create" className={styles.runCtaBtn}>
            Get started →
          </Link>
        </aside>
      </div>
    </div>
  )
}
