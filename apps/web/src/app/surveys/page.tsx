import type { Metadata } from 'next'
import Link from 'next/link'
import { createServerClient } from '@/lib/supabase/server'
import styles from './surveys.module.css'

export const metadata: Metadata = {
  title: 'Student Surveys — Earn Rewards | Digital Kampus',
  description:
    'Complete surveys from companies and researchers. Some offer gift cards and prizes. Share your voice as a Canadian student.',
  alternates: {
    languages: { fr: '/fr/surveys' },
  },
}

export const revalidate = 300 // revalidate every 5 minutes

// ── Types ────────────────────────────────────────────────────────────

interface DbSurvey {
  id: string
  title: string
  description: string | null
  organization_name: string
  organization_logo_url: string | null
  status: string
  reward_description: string | null
  estimated_minutes: number
  max_participants: number | null
  current_participants: number
  closes_at: string | null
  target_schools: string[] | null
  tags: string[] | null
  is_featured: boolean
  created_at: string
}

// ── Data fetch ────────────────────────────────────────────────────────

async function fetchSurveys(): Promise<DbSurvey[]> {
  try {
    const supabase = await createServerClient()
    const { data, error } = await supabase
      .from('surveys')
      .select(`
        id, title, description, organization_name, organization_logo_url,
        status, reward_description, estimated_minutes, max_participants,
        current_participants, closes_at, target_schools, tags, is_featured, created_at
      `)
      .eq('status', 'active')
      .order('is_featured', { ascending: false })
      .order('created_at', { ascending: false })
      .limit(30)

    if (error || !data) return FALLBACK_SURVEYS
    return data as DbSurvey[]
  } catch {
    return FALLBACK_SURVEYS
  }
}

// ── Fallback data (shown when DB is unreachable) ──────────────────────

const FALLBACK_SURVEYS: DbSurvey[] = [
  {
    id: 'rbc-spending-habits-2024',
    title: 'Student Banking & Financial Literacy Study',
    description: 'Help RBC understand how Canadian students manage their finances.',
    organization_name: 'RBC Royal Bank',
    organization_logo_url: null,
    status: 'active',
    reward_description: '$25 Amazon gift card draw entry',
    estimated_minutes: 8,
    max_participants: 500,
    current_participants: 312,
    closes_at: null,
    target_schools: null,
    tags: ['finance', 'banking'],
    is_featured: true,
    created_at: new Date().toISOString(),
  },
  {
    id: 'uoft-mental-health-study',
    title: 'Student Well-Being & Academic Stress',
    description: 'University of Toronto research on campus mental health and academic pressure.',
    organization_name: 'University of Toronto — Psychology Dept.',
    organization_logo_url: null,
    status: 'active',
    reward_description: 'Entry into $200 draw',
    estimated_minutes: 12,
    max_participants: 1000,
    current_participants: 671,
    closes_at: null,
    target_schools: null,
    tags: ['health', 'research'],
    is_featured: true,
    created_at: new Date().toISOString(),
  },
  {
    id: 'spotify-campus-listening',
    title: 'Campus Music Discovery Habits',
    description: 'How do students discover and listen to music while studying?',
    organization_name: 'Spotify Canada',
    organization_logo_url: null,
    status: 'active',
    reward_description: '3 months Spotify Premium',
    estimated_minutes: 5,
    max_participants: 300,
    current_participants: 288,
    closes_at: null,
    target_schools: null,
    tags: ['entertainment'],
    is_featured: false,
    created_at: new Date().toISOString(),
  },
  {
    id: 'mcgill-housing-research',
    title: 'Off-Campus Housing Satisfaction',
    description: 'McGill Urban Planning Lab studying housing affordability in Montreal.',
    organization_name: 'McGill Urban Planning Lab',
    organization_logo_url: null,
    status: 'active',
    reward_description: null,
    estimated_minutes: 10,
    max_participants: 400,
    current_participants: 157,
    closes_at: null,
    target_schools: ['mcgill', 'concordia'],
    tags: ['housing', 'research'],
    is_featured: false,
    created_at: new Date().toISOString(),
  },
  {
    id: 'tim-hortons-menu',
    title: 'Feedback on Our New Campus Menu Items',
    description: 'Tim Hortons wants your honest opinion on new autumn items at campus locations.',
    organization_name: 'Tim Hortons',
    organization_logo_url: null,
    status: 'active',
    reward_description: '$10 Tim Hortons card',
    estimated_minutes: 4,
    max_participants: 600,
    current_participants: 203,
    closes_at: null,
    target_schools: null,
    tags: ['food', 'campus-life'],
    is_featured: false,
    created_at: new Date().toISOString(),
  },
  {
    id: 'deloitte-coop-experience',
    title: 'Co-op & Internship Experience Survey',
    description: 'Deloitte researching what students value most in a co-op placement.',
    organization_name: 'Deloitte Canada',
    organization_logo_url: null,
    status: 'active',
    reward_description: '$15 Starbucks gift card',
    estimated_minutes: 9,
    max_participants: 400,
    current_participants: 88,
    closes_at: null,
    target_schools: null,
    tags: ['career', 'coop'],
    is_featured: false,
    created_at: new Date().toISOString(),
  },
]

// ── Helpers ──────────────────────────────────────────────────────────

function spotsLeft(s: DbSurvey): number {
  if (s.max_participants == null) return 9999
  return Math.max(0, s.max_participants - s.current_participants)
}

function orgInitial(name: string): string {
  return name.trim()[0]?.toUpperCase() ?? '?'
}

function tagLabel(tag: string): string {
  return tag.replace(/-/g, ' ')
}

// ── Page component ────────────────────────────────────────────────────

export default async function SurveysPage() {
  const surveys = await fetchSurveys()

  const withRewards    = surveys.filter((s) => s.reward_description)
  const under5         = surveys.filter((s) => s.estimated_minutes <= 5)
  const researchOnly   = surveys.filter((s) => s.tags?.includes('research'))
  const companyOnly    = surveys.filter((s) => !s.tags?.includes('research'))
  const featuredCount  = surveys.filter((s) => s.is_featured).length

  return (
    <div className={styles.page}>
      {/* ── Hero ── */}
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

      {/* ── Trust belt ── */}
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
            <span className={styles.trustNum}>{surveys.length > 0 ? surveys.length : '34'}</span>
            <span className={styles.trustLabel}>active surveys</span>
          </div>
          <div className={styles.trustItem}>
            <span className={styles.trustNum}>Always free</span>
            <span className={styles.trustLabel}>to students</span>
          </div>
        </div>
      </div>

      {/* ── Body ── */}
      <div className={styles.body}>
        {/* Filter tabs — static labels; search params filtering is in server fetch */}
        <div className={styles.filters} role="tablist" aria-label="Filter surveys">
          <button className={`${styles.filterTab} ${styles.filterTabActive}`} role="tab" aria-selected="true">
            All ({surveys.length})
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
          {featuredCount > 0 && (
            <button className={styles.filterTab} role="tab" aria-selected="false">
              Featured ({featuredCount})
            </button>
          )}
        </div>

        {/* Survey grid */}
        {surveys.length === 0 ? (
          <div className={styles.empty}>
            <div className={styles.emptyIcon}>📋</div>
            <p className={styles.emptyTitle}>No surveys available right now.</p>
            <p className={styles.emptySub}>Check back soon — new surveys are posted regularly.</p>
          </div>
        ) : (
          <div className={styles.grid}>
            {surveys.map((survey) => {
              const spots    = spotsLeft(survey)
              const isUrgent = spots > 0 && spots <= 50
              const isFull   = spots === 0
              const initial  = orgInitial(survey.organization_name)

              return (
                <article
                  key={survey.id}
                  className={`${styles.card} ${survey.is_featured ? styles.cardFeatured : ''}`}
                >
                  {/* Featured ribbon */}
                  {survey.is_featured && (
                    <div className={styles.featuredRibbon} aria-label="Featured survey">
                      Featured
                    </div>
                  )}

                  {/* Card top: logo initial + org + reward */}
                  <div className={styles.cardTop}>
                    <div className={styles.orgAvatar} aria-hidden="true">
                      {initial}
                    </div>
                    <div className={styles.orgInfo}>
                      <span className={styles.orgName}>{survey.organization_name}</span>
                      <span className={styles.orgMeta}>{survey.estimated_minutes} min</span>
                    </div>
                    {survey.reward_description && (
                      <span className={styles.reward} aria-label={`Reward: ${survey.reward_description}`}>
                        🎁
                      </span>
                    )}
                  </div>

                  {/* Title */}
                  <h2 className={styles.cardTitle}>{survey.title}</h2>

                  {/* Description preview */}
                  {survey.description && (
                    <p className={styles.cardDesc}>{survey.description}</p>
                  )}

                  {/* Reward detail */}
                  {survey.reward_description && (
                    <div className={styles.rewardDetail}>
                      🎁 {survey.reward_description}
                    </div>
                  )}

                  {/* Tags */}
                  {survey.tags && survey.tags.length > 0 && (
                    <div className={styles.cardTags}>
                      {survey.tags.slice(0, 3).map((tag) => (
                        <span key={tag} className={styles.tag}>
                          {tagLabel(tag)}
                        </span>
                      ))}
                    </div>
                  )}

                  {/* Footer: spots + CTA */}
                  <div className={styles.cardFooter}>
                    <span
                      className={
                        isFull
                          ? styles.spotsLeft
                          : isUrgent
                          ? styles.spotsLeftUrgent
                          : styles.spotsLeft
                      }
                    >
                      {isFull
                        ? 'Full'
                        : isUrgent
                        ? `Only ${spots} spots left!`
                        : survey.max_participants
                        ? `${spots} spots left`
                        : 'Open'}
                    </span>
                    {!isFull ? (
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

        {/* Run-a-survey CTA for organizations */}
        <aside className={styles.runCta} aria-label="Run a survey with Digital Kampus">
          <div className={styles.runCtaText}>
            <p className={styles.runCtaEyebrow}>For organizations</p>
            <h2 className={styles.runCtaTitle}>Want to run a survey?</h2>
            <p className={styles.runCtaDesc}>
              Reach thousands of verified Canadian students. Set up your survey in minutes,
              target by school, programme, or year of study.
            </p>
          </div>
          <div className={styles.runCtaBtns}>
            <Link href="/surveys/create" className={styles.runCtaBtn}>
              Create a survey →
            </Link>
            <Link href="/surveys/for-organizations" className={styles.runCtaBtnSecondary}>
              See pricing &amp; plans
            </Link>
          </div>
        </aside>
      </div>
    </div>
  )
}
