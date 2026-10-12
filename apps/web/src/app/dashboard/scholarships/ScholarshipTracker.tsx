'use client'

import { useEffect, useState, useCallback } from 'react'
import Link from 'next/link'
import styles from './scholarship-tracker.module.css'
import type { Scholarship } from '@/app/scholarships/scholarships-data'

// ─── Types ──────────────────────────────────────────────────────────────────

type ApplicationStatus =
  | 'bookmarked'
  | 'in_progress'
  | 'submitted'
  | 'awarded'
  | 'rejected'

interface Application {
  id: string
  scholarship_id: string
  scholarship_name: string
  amount_max: number | null
  status: ApplicationStatus
  deadline_date: string | null
  notes: string | null
  applied_at: string | null
  created_at: string
}

const STATUS_COLS: { key: ApplicationStatus; label: string; colClass: string }[] = [
  { key: 'bookmarked',   label: 'Bookmarked',   colClass: styles.colBookmarked },
  { key: 'in_progress',  label: 'In Progress',  colClass: styles.colInProgress },
  { key: 'submitted',    label: 'Submitted',    colClass: styles.colSubmitted },
  { key: 'awarded',      label: 'Awarded',      colClass: styles.colAwarded },
  { key: 'rejected',     label: 'Rejected',     colClass: styles.colRejected },
]

// ─── Helpers ─────────────────────────────────────────────────────────────────

function formatDeadline(s: Scholarship): string {
  if (!s.deadlineMonth) return 'Rolling / open'
  const months = ['', 'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun',
                   'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
  return `${months[s.deadlineMonth]} ${s.deadlineDay ?? ''}`
}

function deadlineDate(s: Scholarship): string | null {
  if (!s.deadlineMonth) return null
  const year = new Date().getFullYear()
  const mm = String(s.deadlineMonth).padStart(2, '0')
  const dd = String(s.deadlineDay ?? 1).padStart(2, '0')
  return `${year}-${mm}-${dd}`
}

function daysUntil(dateStr: string | null): number | null {
  if (!dateStr) return null
  const diff = new Date(dateStr).getTime() - Date.now()
  return Math.ceil(diff / 86400000)
}

function funderTypeBadgeClass(type: Scholarship['funderType']): string {
  switch (type) {
    case 'federal':       return styles.badgeFederal
    case 'provincial':    return styles.badgeProvincial
    case 'private':       return styles.badgePrivate
    case 'indigenous':    return styles.badgeIndigenous
    case 'institutional': return styles.badgeInstitutional
    default:              return styles.badgePrivate
  }
}

function capitalize(s: string) {
  return s.charAt(0).toUpperCase() + s.slice(1).replace('_', ' ')
}

// ─── Component ───────────────────────────────────────────────────────────────

export default function ScholarshipTracker() {
  const [tab, setTab] = useState<'recommended' | 'applications'>('recommended')

  // Recommendations
  const [recs, setRecs] = useState<Scholarship[]>([])
  const [recsLoading, setRecsLoading] = useState(true)
  const [profileComplete, setProfileComplete] = useState(true)
  const [showAllRecs, setShowAllRecs] = useState(false)
  const [recSearch, setRecSearch] = useState('')
  const [recFilter, setRecFilter] = useState<string>('all')

  // Applications
  const [apps, setApps] = useState<Application[]>([])
  const [appsLoading, setAppsLoading] = useState(true)
  const [trackedIds, setTrackedIds] = useState<Set<string>>(new Set())

  // Load recommendations
  useEffect(() => {
    setRecsLoading(true)
    fetch('/api/scholarships/recommendations')
      .then((r) => r.json())
      .then((d) => {
        setRecs(d.scholarships ?? [])
        setProfileComplete(d.profileComplete ?? false)
      })
      .catch(() => {})
      .finally(() => setRecsLoading(false))
  }, [])

  // Load applications
  const loadApps = useCallback(() => {
    setAppsLoading(true)
    fetch('/api/scholarships/applications')
      .then((r) => r.json())
      .then((d) => {
        const list: Application[] = d.applications ?? []
        setApps(list)
        setTrackedIds(new Set(list.map((a) => a.scholarship_id)))
      })
      .catch(() => {})
      .finally(() => setAppsLoading(false))
  }, [])

  useEffect(() => { loadApps() }, [loadApps])

  // Track a scholarship
  async function trackScholarship(s: Scholarship) {
    const already = trackedIds.has(s.id)
    if (already) return // already tracked — user should go to My Applications

    const deadline = deadlineDate(s)
    const res = await fetch('/api/scholarships/applications', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        scholarship_id: s.id,
        scholarship_name: s.name,
        amount_max: s.amountMax,
        status: 'bookmarked',
        deadline_date: deadline,
      }),
    })
    if (res.ok) {
      setTrackedIds((prev) => new Set([...prev, s.id]))
      loadApps()
    }
  }

  // Update status
  async function updateStatus(app: Application, status: ApplicationStatus) {
    await fetch('/api/scholarships/applications', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        scholarship_id: app.scholarship_id,
        scholarship_name: app.scholarship_name,
        amount_max: app.amount_max,
        status,
        deadline_date: app.deadline_date,
        notes: app.notes,
      }),
    })
    loadApps()
  }

  // Remove application
  async function removeApp(scholarshipId: string) {
    await fetch(`/api/scholarships/applications?scholarship_id=${encodeURIComponent(scholarshipId)}`, {
      method: 'DELETE',
    })
    setTrackedIds((prev) => {
      const next = new Set(prev)
      next.delete(scholarshipId)
      return next
    })
    loadApps()
  }

  // ── Derived stats ──
  const totalTracked = apps.length
  const totalValue = apps.reduce((sum, a) => sum + (a.amount_max ?? 0), 0)
  const submittedCount = apps.filter((a) => a.status === 'submitted' || a.status === 'awarded').length
  const awardedCount = apps.filter((a) => a.status === 'awarded').length

  // ── Filtered recs ──
  const filteredRecs = recs
    .filter((s) => {
      if (recSearch) {
        const q = recSearch.toLowerCase()
        return s.name.toLowerCase().includes(q) || s.funder.toLowerCase().includes(q)
      }
      return true
    })
    .filter((s) => {
      if (recFilter === 'all') return true
      return s.funderType === recFilter
    })
  const visibleRecs = showAllRecs ? filteredRecs : filteredRecs.slice(0, 8)

  // ── Kanban grouped apps ──
  const grouped: Record<ApplicationStatus, Application[]> = {
    bookmarked:  [],
    in_progress: [],
    submitted:   [],
    awarded:     [],
    rejected:    [],
  }
  for (const a of apps) {
    grouped[a.status].push(a)
  }

  return (
    <div>
      {/* Tab bar */}
      <div className={styles.tabRow} role="tablist">
        <button
          role="tab"
          aria-selected={tab === 'recommended'}
          className={`${styles.tab} ${tab === 'recommended' ? styles.tabActive : ''}`}
          onClick={() => setTab('recommended')}
        >
          Recommended
        </button>
        <button
          role="tab"
          aria-selected={tab === 'applications'}
          className={`${styles.tab} ${tab === 'applications' ? styles.tabActive : ''}`}
          onClick={() => setTab('applications')}
        >
          My Applications {totalTracked > 0 && `(${totalTracked})`}
        </button>
      </div>

      {/* ── Recommended tab ────────────────────────────────────────── */}
      {tab === 'recommended' && (
        <div role="tabpanel" aria-label="Recommended scholarships">
          {recsLoading ? (
            <div className={styles.loading}>
              <span className={styles.spinner} aria-hidden />
              Finding your best matches…
            </div>
          ) : !profileComplete && recs.length === 0 ? (
            <div className={styles.emptyState}>
              <span className={styles.emptyIcon} aria-hidden>🎓</span>
              <p>Complete your profile to get personalised recommendations.</p>
              <Link href="/profile" className={styles.emptyLink}>
                Complete your profile
              </Link>
            </div>
          ) : (
            <>
              {/* Filter bar */}
              <div className={styles.filterBar}>
                <input
                  type="search"
                  placeholder="Search scholarships…"
                  value={recSearch}
                  onChange={(e) => setRecSearch(e.target.value)}
                  className={styles.filterSearch}
                  aria-label="Search scholarships"
                />
                <select
                  value={recFilter}
                  onChange={(e) => setRecFilter(e.target.value)}
                  className={styles.filterSelect}
                  aria-label="Filter by type"
                >
                  <option value="all">All types</option>
                  <option value="federal">Federal</option>
                  <option value="provincial">Provincial</option>
                  <option value="institutional">Institutional</option>
                  <option value="private">Private / corporate</option>
                  <option value="indigenous">Indigenous</option>
                </select>
              </div>

              {filteredRecs.length === 0 ? (
                <div className={styles.emptyState}>
                  <span className={styles.emptyIcon} aria-hidden>🔍</span>
                  <p>No scholarships match your filters.</p>
                </div>
              ) : (
                <>
                  <div className={styles.recList}>
                    {visibleRecs.map((s) => {
                      const tracked = trackedIds.has(s.id)
                      return (
                        <div key={s.id} className={styles.recCard}>
                          <div className={styles.recBadges}>
                            <span className={`${styles.badgeType} ${funderTypeBadgeClass(s.funderType)}`}>
                              {s.funderType}
                            </span>
                            {s.province && (
                              <span className={`${styles.badgeType} ${styles.badgeProvincial}`}>
                                {s.province}
                              </span>
                            )}
                          </div>
                          <span className={styles.recAmount}>
                            {s.amountMin === s.amountMax
                              ? `$${s.amountMax.toLocaleString()}`
                              : `$${s.amountMin.toLocaleString()}–$${s.amountMax.toLocaleString()}`}
                            {s.isRenewable && s.renewableYears
                              ? ` / yr × ${s.renewableYears}`
                              : ''}
                          </span>
                          <h3 className={styles.recName}>{s.name}</h3>
                          <div className={styles.recFooter}>
                            <span className={styles.recDeadline}>
                              Deadline: {formatDeadline(s)}
                            </span>
                            <div className={styles.recActions}>
                              <a
                                href={s.applicationUrl}
                                target="_blank"
                                rel="noopener noreferrer"
                                className={styles.btnDetails}
                              >
                                Details ↗
                              </a>
                              <button
                                className={`${styles.btnTrack} ${tracked ? styles.btnTracked : ''}`}
                                onClick={() => !tracked && trackScholarship(s)}
                                aria-label={tracked ? 'Already tracking' : `Track ${s.name}`}
                              >
                                {tracked ? '✓ Tracking' : '+ Track'}
                              </button>
                            </div>
                          </div>
                        </div>
                      )
                    })}
                  </div>

                  {filteredRecs.length > 8 && (
                    <button
                      className={styles.showAllBtn}
                      onClick={() => setShowAllRecs((v) => !v)}
                    >
                      {showAllRecs
                        ? 'Show fewer'
                        : `Show all ${filteredRecs.length} matching scholarships`}
                    </button>
                  )}
                </>
              )}
            </>
          )}
        </div>
      )}

      {/* ── My Applications tab ────────────────────────────────────── */}
      {tab === 'applications' && (
        <div role="tabpanel" aria-label="My scholarship applications">
          {appsLoading ? (
            <div className={styles.loading}>
              <span className={styles.spinner} aria-hidden />
              Loading your applications…
            </div>
          ) : apps.length === 0 ? (
            <div className={styles.emptyState}>
              <span className={styles.emptyIcon} aria-hidden>📋</span>
              <p>Start tracking scholarships you plan to apply for.</p>
              <button
                className={styles.emptyLink}
                onClick={() => setTab('recommended')}
              >
                Browse recommendations
              </button>
            </div>
          ) : (
            <>
              {/* Stats row */}
              <div className={styles.statsRow} aria-label="Application summary">
                <div className={styles.statCard}>
                  <div className={styles.statValue}>{totalTracked}</div>
                  <div className={styles.statLabel}>Tracked</div>
                </div>
                <div className={styles.statCard}>
                  <div className={styles.statValue}>${totalValue.toLocaleString()}</div>
                  <div className={styles.statLabel}>Potential value</div>
                </div>
                <div className={styles.statCard}>
                  <div className={styles.statValue}>{submittedCount}</div>
                  <div className={styles.statLabel}>Submitted</div>
                </div>
                <div className={styles.statCard}>
                  <div className={styles.statValue}>{awardedCount}</div>
                  <div className={styles.statLabel}>Awarded</div>
                </div>
              </div>

              {/* Kanban */}
              <div className={styles.kanbanColumns}>
                {STATUS_COLS.map(({ key, label, colClass }) => {
                  const cards = grouped[key]
                  return (
                    <div key={key} className={`${styles.kanbanCol} ${colClass}`}>
                      <div className={styles.colHeader}>
                        {label}
                        <span className={styles.colCount}>{cards.length}</span>
                      </div>
                      <div className={styles.colCards}>
                        {cards.map((app) => {
                          const days = daysUntil(app.deadline_date)
                          const urgent = days !== null && days <= 14 && days >= 0
                          const isAwarded = app.status === 'awarded'
                          return (
                            <div
                              key={app.id}
                              className={`${styles.appCard} ${isAwarded ? styles.appCardAwarded : ''}`}
                            >
                              <p className={styles.appName}>{app.scholarship_name}</p>
                              {app.amount_max ? (
                                <p className={styles.appAmount}>
                                  ${app.amount_max.toLocaleString()}
                                </p>
                              ) : null}
                              {app.deadline_date && (
                                <p className={`${styles.appDeadline} ${urgent ? styles.appDeadlineUrgent : ''}`}>
                                  {urgent
                                    ? `⚠ ${days === 0 ? 'Due today' : `Due in ${days} day${days === 1 ? '' : 's'}`}`
                                    : `Deadline: ${new Date(app.deadline_date).toLocaleDateString('en-CA', { month: 'short', day: 'numeric' })}`}
                                </p>
                              )}
                              {app.notes && (
                                <p className={styles.appNotes} title={app.notes}>
                                  {app.notes}
                                </p>
                              )}
                              <div className={styles.appActions}>
                                <select
                                  className={styles.statusSelect}
                                  value={app.status}
                                  aria-label={`Status for ${app.scholarship_name}`}
                                  onChange={(e) =>
                                    updateStatus(app, e.target.value as ApplicationStatus)
                                  }
                                >
                                  {STATUS_COLS.map(({ key, label }) => (
                                    <option key={key} value={key}>
                                      {capitalize(label)}
                                    </option>
                                  ))}
                                </select>
                                <button
                                  className={styles.btnRemove}
                                  aria-label={`Remove ${app.scholarship_name}`}
                                  onClick={() => removeApp(app.scholarship_id)}
                                  title="Remove"
                                >
                                  ✕
                                </button>
                              </div>
                            </div>
                          )
                        })}
                      </div>
                    </div>
                  )
                })}
              </div>
            </>
          )}
        </div>
      )}
    </div>
  )
}
