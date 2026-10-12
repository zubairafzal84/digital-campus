'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import styles from './survey-dashboard.module.css'

// ── Types ────────────────────────────────────────────────────────────

type SurveyStatus = 'draft' | 'active' | 'paused' | 'closed'

interface Survey {
  id: string
  title: string
  description: string | null
  organization_name: string
  status: SurveyStatus
  reward_description: string | null
  estimated_minutes: number
  closes_at: string | null
  max_participants: number | null
  current_participants: number
  created_at: string
  tags: string[]
  is_featured: boolean
  plan: string
}

// ── Helpers ──────────────────────────────────────────────────────────

function statusLabel(s: SurveyStatus): string {
  switch (s) {
    case 'draft':  return 'Draft'
    case 'active': return 'Active'
    case 'paused': return 'Paused'
    case 'closed': return 'Closed'
  }
}

function statusClass(s: SurveyStatus, styles: Record<string, string>): string {
  switch (s) {
    case 'draft':  return styles.badgeDraft
    case 'active': return styles.badgeActive
    case 'paused': return styles.badgePaused
    case 'closed': return styles.badgeClosed
  }
}

function fmtDate(iso: string) {
  return new Intl.DateTimeFormat('en-CA', {
    year: 'numeric', month: 'short', day: 'numeric',
  }).format(new Date(iso))
}

function completionPct(s: Survey): number {
  if (!s.max_participants || s.max_participants === 0) return 0
  return Math.min(100, Math.round((s.current_participants / s.max_participants) * 100))
}

// ── Skeleton ─────────────────────────────────────────────────────────

function CardSkeleton() {
  return (
    <div className={styles.cardSkeleton}>
      <div className={`${styles.skLine} ${styles.skTitle}`} />
      <div className={`${styles.skLine} ${styles.skSub}`} />
      <div className={`${styles.skLine} ${styles.skMeta}`} />
    </div>
  )
}

// ── Main component ────────────────────────────────────────────────────

export default function SurveyDashboardPage() {
  const router = useRouter()

  const [surveys, setSurveys] = useState<Survey[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [filter, setFilter] = useState<'all' | SurveyStatus>('all')
  const [updating, setUpdating] = useState<string | null>(null)

  useEffect(() => {
    fetchSurveys()
  }, [])

  async function fetchSurveys() {
    setLoading(true)
    setError(null)
    try {
      const res = await fetch('/api/surveys/mine')
      if (res.status === 401) {
        router.push('/login?next=/surveys/dashboard')
        return
      }
      if (!res.ok) throw new Error('Failed to load surveys')
      const data = await res.json()
      setSurveys(data.surveys ?? [])
    } catch {
      setError('Could not load your surveys. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  async function updateStatus(surveyId: string, newStatus: SurveyStatus) {
    setUpdating(surveyId)
    try {
      const res = await fetch(`/api/surveys/${surveyId}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status: newStatus }),
      })
      if (!res.ok) throw new Error('Update failed')
      setSurveys((prev) =>
        prev.map((s) => (s.id === surveyId ? { ...s, status: newStatus } : s)),
      )
    } catch {
      alert('Could not update survey status. Please try again.')
    } finally {
      setUpdating(null)
    }
  }

  const shown =
    filter === 'all' ? surveys : surveys.filter((s) => s.status === filter)

  const counts = {
    all:    surveys.length,
    active: surveys.filter((s) => s.status === 'active').length,
    draft:  surveys.filter((s) => s.status === 'draft').length,
    paused: surveys.filter((s) => s.status === 'paused').length,
    closed: surveys.filter((s) => s.status === 'closed').length,
  }

  const totalResponses = surveys.reduce((n, s) => n + s.current_participants, 0)
  const activeSurveys  = counts.active

  return (
    <div className={styles.page}>
      {/* ── Header ── */}
      <header className={styles.header}>
        <div className={styles.headerInner}>
          <div className={styles.headerLeft}>
            <p className={styles.eyebrow}>Organization Dashboard</p>
            <h1 className={styles.h1}>Your Surveys</h1>
            <p className={styles.sub}>
              Manage your surveys, track responses, and analyze results — all in one place.
            </p>
          </div>
          <Link href="/surveys/create" className={styles.newBtn}>
            + New Survey
          </Link>
        </div>
      </header>

      {/* ── Stat row ── */}
      <div className={styles.statRow}>
        <div className={styles.statCard}>
          <span className={styles.statNum}>{surveys.length}</span>
          <span className={styles.statLabel}>Total surveys</span>
        </div>
        <div className={styles.statCard}>
          <span className={`${styles.statNum} ${styles.statNumGreen}`}>{activeSurveys}</span>
          <span className={styles.statLabel}>Active now</span>
        </div>
        <div className={styles.statCard}>
          <span className={`${styles.statNum} ${styles.statNumPurple}`}>{totalResponses.toLocaleString()}</span>
          <span className={styles.statLabel}>Total responses</span>
        </div>
        <div className={styles.statCard}>
          <span className={styles.statNum}>{counts.draft}</span>
          <span className={styles.statLabel}>Drafts</span>
        </div>
      </div>

      {/* ── Filter tabs ── */}
      <div className={styles.filterRow} role="tablist">
        {(['all', 'active', 'draft', 'paused', 'closed'] as const).map((tab) => (
          <button
            key={tab}
            role="tab"
            aria-selected={filter === tab}
            className={`${styles.tab} ${filter === tab ? styles.tabActive : ''}`}
            onClick={() => setFilter(tab)}
          >
            {tab === 'all' ? 'All' : statusLabel(tab as SurveyStatus)}
            <span className={styles.tabCount}>{counts[tab]}</span>
          </button>
        ))}
      </div>

      {/* ── Content ── */}
      <div className={styles.content}>
        {loading && (
          <div className={styles.grid}>
            {[1, 2, 3].map((n) => <CardSkeleton key={n} />)}
          </div>
        )}

        {error && (
          <div className={styles.errorBox} role="alert">
            <p>{error}</p>
            <button className={styles.retryBtn} onClick={fetchSurveys}>Retry</button>
          </div>
        )}

        {!loading && !error && shown.length === 0 && (
          <div className={styles.empty}>
            <div className={styles.emptyIcon} aria-hidden="true">
              <svg width="64" height="64" viewBox="0 0 64 64" fill="none">
                <rect x="8" y="12" width="48" height="40" rx="6" stroke="currentColor" strokeWidth="2.5"/>
                <line x1="18" y1="26" x2="46" y2="26" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"/>
                <line x1="18" y1="34" x2="38" y2="34" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"/>
                <line x1="18" y1="42" x2="30" y2="42" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"/>
              </svg>
            </div>
            <p className={styles.emptyTitle}>
              {filter === 'all' ? 'No surveys yet' : `No ${filter} surveys`}
            </p>
            <p className={styles.emptySub}>
              {filter === 'all'
                ? 'Create your first survey to start collecting student insights.'
                : `You have no surveys with status "${filter}" at the moment.`}
            </p>
            {filter === 'all' && (
              <Link href="/surveys/create" className={styles.emptyBtn}>
                Create your first survey
              </Link>
            )}
          </div>
        )}

        {!loading && !error && shown.length > 0 && (
          <div className={styles.grid}>
            {shown.map((survey) => {
              const pct = completionPct(survey)
              const isBusy = updating === survey.id

              return (
                <article key={survey.id} className={styles.card}>
                  {/* Top row: status badge + featured chip */}
                  <div className={styles.cardTop}>
                    <span className={`${styles.badge} ${statusClass(survey.status, styles)}`}>
                      {statusLabel(survey.status)}
                    </span>
                    {survey.is_featured && (
                      <span className={styles.featuredChip} title="Featured on the surveys listing page">
                        Featured
                      </span>
                    )}
                    <span className={styles.plan}>{survey.plan}</span>
                  </div>

                  {/* Title + org */}
                  <h2 className={styles.cardTitle}>{survey.title}</h2>
                  <p className={styles.cardOrg}>{survey.organization_name}</p>

                  {/* Meta */}
                  <div className={styles.cardMeta}>
                    <span className={styles.metaItem}>
                      <svg width="14" height="14" viewBox="0 0 16 16" fill="none" aria-hidden="true">
                        <circle cx="8" cy="8" r="6.5" stroke="currentColor" strokeWidth="1.5"/>
                        <path d="M8 5v3.5l2 2" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
                      </svg>
                      {survey.estimated_minutes} min
                    </span>
                    <span className={styles.metaItem}>
                      <svg width="14" height="14" viewBox="0 0 16 16" fill="none" aria-hidden="true">
                        <path d="M2 13l3-3 3 3 3-5 3 5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                      {survey.current_participants.toLocaleString()} response{survey.current_participants !== 1 ? 's' : ''}
                    </span>
                    {survey.closes_at && (
                      <span className={styles.metaItem}>
                        <svg width="14" height="14" viewBox="0 0 16 16" fill="none" aria-hidden="true">
                          <rect x="2" y="3" width="12" height="11" rx="2" stroke="currentColor" strokeWidth="1.5"/>
                          <path d="M5 1v4M11 1v4M2 7h12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
                        </svg>
                        Closes {fmtDate(survey.closes_at)}
                      </span>
                    )}
                  </div>

                  {/* Progress bar (only when there's a cap) */}
                  {survey.max_participants != null && survey.max_participants > 0 && (
                    <div className={styles.progressWrap}>
                      <div className={styles.progressBar}>
                        <div
                          className={styles.progressFill}
                          style={{ width: `${pct}%` }}
                          role="progressbar"
                          aria-valuenow={pct}
                          aria-valuemin={0}
                          aria-valuemax={100}
                          aria-label={`${pct}% of target reached`}
                        />
                      </div>
                      <span className={styles.progressLabel}>
                        {survey.current_participants.toLocaleString()} / {survey.max_participants.toLocaleString()} ({pct}%)
                      </span>
                    </div>
                  )}

                  {/* Tags */}
                  {survey.tags && survey.tags.length > 0 && (
                    <div className={styles.tagRow}>
                      {survey.tags.slice(0, 4).map((tag) => (
                        <span key={tag} className={styles.tag}>{tag}</span>
                      ))}
                    </div>
                  )}

                  {/* Actions */}
                  <div className={styles.cardFooter}>
                    <div className={styles.cardActions}>
                      {survey.status === 'draft' && (
                        <button
                          className={styles.actionBtnGreen}
                          disabled={isBusy}
                          onClick={() => updateStatus(survey.id, 'active')}
                        >
                          {isBusy ? 'Activating…' : 'Activate'}
                        </button>
                      )}
                      {survey.status === 'active' && (
                        <button
                          className={styles.actionBtnOrange}
                          disabled={isBusy}
                          onClick={() => updateStatus(survey.id, 'paused')}
                        >
                          {isBusy ? 'Pausing…' : 'Pause'}
                        </button>
                      )}
                      {survey.status === 'paused' && (
                        <button
                          className={styles.actionBtnGreen}
                          disabled={isBusy}
                          onClick={() => updateStatus(survey.id, 'active')}
                        >
                          {isBusy ? 'Resuming…' : 'Resume'}
                        </button>
                      )}
                      {(survey.status === 'active' || survey.status === 'paused') && (
                        <button
                          className={styles.actionBtnRed}
                          disabled={isBusy}
                          onClick={() => {
                            if (confirm('Close this survey? Participants will no longer be able to respond.')) {
                              updateStatus(survey.id, 'closed')
                            }
                          }}
                        >
                          Close
                        </button>
                      )}
                    </div>

                    <div className={styles.cardLinks}>
                      <Link
                        href={`/surveys/${survey.id}/manage`}
                        className={styles.manageLink}
                        aria-label={`Manage ${survey.title}`}
                      >
                        Results &amp; Analytics
                      </Link>
                      {survey.status !== 'closed' && (
                        <Link
                          href={`/surveys/${survey.id}`}
                          className={styles.previewLink}
                          target="_blank"
                          rel="noopener noreferrer"
                          aria-label={`Preview survey: ${survey.title}`}
                        >
                          Preview
                        </Link>
                      )}
                    </div>
                  </div>

                  {/* Created date */}
                  <p className={styles.createdDate}>Created {fmtDate(survey.created_at)}</p>
                </article>
              )
            })}
          </div>
        )}
      </div>

      {/* ── Upgrade CTA (shown when plan is free) ── */}
      {!loading && surveys.some((s) => s.plan === 'free') && (
        <aside className={styles.upgradeCta}>
          <div className={styles.upgradeCtaInner}>
            <div className={styles.upgradeCtaText}>
              <p className={styles.upgradeCtaEyebrow}>Unlock more</p>
              <h2 className={styles.upgradeCtaTitle}>Upgrade to Professional</h2>
              <p className={styles.upgradeCtaDesc}>
                Get featured placement, unlimited participants, reward fulfillment tracking,
                CSV exports, and priority support for your surveys.
              </p>
            </div>
            <Link href="/surveys/for-organizations" className={styles.upgradeCtaBtn}>
              See plans &amp; pricing
            </Link>
          </div>
        </aside>
      )}
    </div>
  )
}
