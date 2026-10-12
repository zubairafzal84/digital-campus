'use client'

import { useState, useEffect, useCallback } from 'react'
import Link from 'next/link'
import styles from './volunteer.module.css'

// ── Types ────────────────────────────────────────────────────

interface Opportunity {
  id: string
  title: string
  organization_name: string
  organization_type: string | null
  cause: string | null
  location: string | null
  city: string | null
  province: string | null
  is_remote: boolean
  commitment_hours_week: number | null
  commitment_duration: string | null
  is_one_time: boolean
  skills_needed: string[] | null
  spots_available: number | null
  spots_filled: number
  application_url: string | null
  application_email: string | null
  deadline_date: string | null
  school_slug: string | null
}

// ── Constants ────────────────────────────────────────────────

const CAUSES = [
  { value: '', label: 'All' },
  { value: 'environment',   label: 'Environment' },
  { value: 'education',     label: 'Education' },
  { value: 'health',        label: 'Health' },
  { value: 'community',     label: 'Community' },
  { value: 'arts',          label: 'Arts' },
  { value: 'animals',       label: 'Animals' },
  { value: 'seniors',       label: 'Seniors' },
  { value: 'food',          label: 'Food' },
]

const PROVINCES = [
  { value: '', label: 'All provinces' },
  { value: 'BC', label: 'British Columbia' },
  { value: 'ON', label: 'Ontario' },
  { value: 'QC', label: 'Quebec' },
  { value: 'AB', label: 'Alberta' },
  { value: 'MB', label: 'Manitoba' },
  { value: 'SK', label: 'Saskatchewan' },
  { value: 'NS', label: 'Nova Scotia' },
  { value: 'NB', label: 'New Brunswick' },
  { value: 'NL', label: 'Newfoundland' },
  { value: 'PE', label: 'PEI' },
]

const CAUSE_ICONS: Record<string, string> = {
  environment: '🌱',
  education:   '📚',
  health:      '🏥',
  community:   '🏘️',
  arts:        '🎨',
  animals:     '🐾',
  seniors:     '🤝',
  youth:       '🌟',
  food:        '🍎',
  crisis:      '🆘',
  international: '🌍',
  other:       '✨',
}

const ORG_TYPE_LABELS: Record<string, string> = {
  nonprofit:   'Nonprofit',
  government:  'Government',
  hospital:    'Hospital',
  school:      'Campus',
  community:   'Community',
  environment: 'Environment',
  other:       'Organization',
}

// Featured opportunity IDs (first 3 from seed)
const FEATURED_COUNT = 3

// ── Helpers ──────────────────────────────────────────────────

function causeBadgeClass(cause: string | null) {
  return `${styles.causeBadge} ${styles[`cause-${cause ?? 'other'}`]}`
}

function formatCommitment(opp: Opportunity) {
  if (opp.is_one_time) return 'One-time event'
  const parts: string[] = []
  if (opp.commitment_hours_week) parts.push(`${opp.commitment_hours_week} hrs/week`)
  if (opp.commitment_duration)   parts.push(opp.commitment_duration)
  return parts.join(' • ') || 'Flexible'
}

function spotsLeft(opp: Opportunity): number | null {
  if (opp.spots_available == null) return null
  return Math.max(0, opp.spots_available - opp.spots_filled)
}

function applyHref(opp: Opportunity) {
  if (opp.application_url) return opp.application_url
  if (opp.application_email) return `mailto:${opp.application_email}`
  return '#'
}

// ── Component ────────────────────────────────────────────────

export default function VolunteerPage() {
  const [opportunities, setOpportunities] = useState<Opportunity[]>([])
  const [loading, setLoading]             = useState(true)
  const [cause, setCause]                 = useState('')
  const [province, setProvince]           = useState('')
  const [remoteOnly, setRemoteOnly]       = useState(false)
  const [oneTimeOnly, setOneTimeOnly]     = useState(false)
  const [campusOnly, setCampusOnly]       = useState(false)

  const fetchOpportunities = useCallback(async () => {
    setLoading(true)
    try {
      const params = new URLSearchParams()
      if (cause)      params.set('cause', cause)
      if (province)   params.set('province', province)
      if (remoteOnly) params.set('remote', 'true')
      if (oneTimeOnly) params.set('one_time', 'true')
      const res = await fetch(`/api/volunteer?${params.toString()}`)
      if (!res.ok) throw new Error('Failed to fetch')
      const json = await res.json()
      setOpportunities(json.opportunities ?? [])
    } catch {
      setOpportunities([])
    } finally {
      setLoading(false)
    }
  }, [cause, province, remoteOnly, oneTimeOnly])

  useEffect(() => {
    fetchOpportunities()
  }, [fetchOpportunities])

  const filtered = campusOnly
    ? opportunities.filter(o => o.school_slug != null)
    : opportunities

  const featured = filtered.slice(0, FEATURED_COUNT)
  const rest     = filtered.slice(FEATURED_COUNT)

  return (
    <main className={styles.page}>
      {/* ── Hero ── */}
      <section className={styles.hero} aria-labelledby="vol-hero-h">
        <div className={styles.heroInner}>
          <span className={styles.heroEyebrow}>Canada-wide opportunities</span>
          <h1 className={styles.heroTitle} id="vol-hero-h">Volunteer Opportunities</h1>
          <p className={styles.heroSub}>
            Make a difference. Build your resume. Meet amazing people.
          </p>
        </div>
      </section>

      {/* ── Stats bar ── */}
      <div className={styles.statsBar} role="list" aria-label="Platform statistics">
        <div className={styles.statItem} role="listitem">
          <span className={styles.statNum}>180+</span>
          <span className={styles.statLabel}>opportunities</span>
        </div>
        <div className={styles.statItem} role="listitem">
          <span className={styles.statNum}>40+</span>
          <span className={styles.statLabel}>cities</span>
        </div>
        <div className={styles.statItem} role="listitem">
          <span className={styles.statNum}>100+</span>
          <span className={styles.statLabel}>organizations</span>
        </div>
      </div>

      {/* ── Filters ── */}
      <div className={styles.filterBar}>
        {/* Cause tabs */}
        <div className={styles.causeTabs} role="tablist" aria-label="Filter by cause">
          {CAUSES.map(c => (
            <button
              key={c.value}
              role="tab"
              aria-selected={cause === c.value}
              className={`${styles.causeTab} ${cause === c.value ? styles.causeTabActive : ''}`}
              onClick={() => setCause(c.value)}
            >
              {c.value ? `${CAUSE_ICONS[c.value] ?? ''} ` : ''}{c.label}
            </button>
          ))}
        </div>

        {/* Secondary filters */}
        <div className={styles.filterRow}>
          <select
            className={styles.filterSelect}
            value={province}
            onChange={e => setProvince(e.target.value)}
            aria-label="Filter by province"
          >
            {PROVINCES.map(p => (
              <option key={p.value} value={p.value}>{p.label}</option>
            ))}
          </select>

          <label className={styles.toggleLabel}>
            <input
              type="checkbox"
              checked={remoteOnly}
              onChange={e => setRemoteOnly(e.target.checked)}
            />
            Remote only
          </label>

          <label className={styles.toggleLabel}>
            <input
              type="checkbox"
              checked={oneTimeOnly}
              onChange={e => setOneTimeOnly(e.target.checked)}
            />
            One-time only
          </label>

          <label className={styles.toggleLabel}>
            <input
              type="checkbox"
              checked={campusOnly}
              onChange={e => setCampusOnly(e.target.checked)}
            />
            Campus-specific
          </label>
        </div>
      </div>

      {/* ── Results ── */}
      <div className={styles.content}>
        {loading ? (
          <div className={styles.emptyState}>
            <span className={styles.emptyIcon}>⏳</span>
            <p>Loading opportunities…</p>
          </div>
        ) : filtered.length === 0 ? (
          <div className={styles.emptyState}>
            <span className={styles.emptyIcon}>🔍</span>
            <p>No opportunities match your filters. Try broadening your search.</p>
          </div>
        ) : (
          <>
            <p className={styles.resultCount}>
              {filtered.length} opportunit{filtered.length === 1 ? 'y' : 'ies'} found
            </p>

            {/* Featured */}
            {featured.length > 0 && (
              <section className={styles.section} aria-labelledby="featured-h">
                <h2 className={styles.sectionTitle} id="featured-h">Featured opportunities</h2>
                <div className={styles.featuredGrid}>
                  {featured.map(opp => (
                    <OpportunityCard key={opp.id} opp={opp} featured />
                  ))}
                </div>
              </section>
            )}

            {/* All */}
            {rest.length > 0 && (
              <section className={styles.section} aria-labelledby="all-h">
                <h2 className={styles.sectionTitle} id="all-h">
                  {featured.length > 0 ? 'More opportunities' : 'All opportunities'}
                </h2>
                <div className={styles.grid}>
                  {rest.map(opp => (
                    <OpportunityCard key={opp.id} opp={opp} featured={false} />
                  ))}
                </div>
              </section>
            )}
          </>
        )}

        {/* CTA */}
        <div className={styles.ctaSection}>
          <h2 className={styles.ctaTitle}>List a volunteer opportunity</h2>
          <p className={styles.ctaSub}>
            Are you a nonprofit, campus club, hospital, or community organization?
            Post your opportunity and connect with motivated students across Canada — free.
          </p>
          <Link href="/partners/volunteer" className={styles.ctaBtn}>
            Post an opportunity
          </Link>
        </div>
      </div>
    </main>
  )
}

// ── OpportunityCard ──────────────────────────────────────────

function OpportunityCard({ opp, featured }: { opp: Opportunity; featured: boolean }) {
  const left = spotsLeft(opp)

  return (
    <article
      className={`${styles.card} ${featured ? styles.cardFeatured : ''}`}
      aria-label={opp.title}
    >
      {/* Top row: org + type badge */}
      <div className={styles.cardTop}>
        <span className={styles.orgName}>{opp.organization_name}</span>
        {opp.organization_type && (
          <span className={styles.orgTypeBadge}>
            {ORG_TYPE_LABELS[opp.organization_type] ?? opp.organization_type}
          </span>
        )}
      </div>

      {/* Title */}
      <h3 className={styles.cardTitle}>{opp.title}</h3>

      {/* Cause badge */}
      {opp.cause && (
        <span className={causeBadgeClass(opp.cause)}>
          {CAUSE_ICONS[opp.cause] ?? ''} {opp.cause.charAt(0).toUpperCase() + opp.cause.slice(1)}
        </span>
      )}

      {/* Location / remote */}
      <div className={styles.cardMeta}>
        <span className={styles.metaItem}>
          {opp.is_remote ? (
            <><span className={styles.remoteBadge}>Remote</span></>
          ) : (
            <>📍 {[opp.city, opp.province].filter(Boolean).join(', ') || opp.location || 'Canada'}</>
          )}
        </span>
        <span className={styles.metaItem}>
          🕐 {formatCommitment(opp)}
        </span>
      </div>

      {/* Skills */}
      {opp.skills_needed && opp.skills_needed.length > 0 && (
        <div className={styles.skills} aria-label="Skills needed">
          {opp.skills_needed.slice(0, 3).map(s => (
            <span key={s} className={styles.skillTag}>{s}</span>
          ))}
          {opp.skills_needed.length > 3 && (
            <span className={styles.skillTag}>+{opp.skills_needed.length - 3}</span>
          )}
        </div>
      )}

      {/* Spots chip */}
      {left != null && (
        <span className={`${styles.spotsChip} ${left < 5 ? styles.spotsLow : styles.spotsNormal}`}>
          {left === 0 ? 'Waitlist only' : `${left} spot${left === 1 ? '' : 's'} left`}
        </span>
      )}

      {/* Footer */}
      <div className={styles.cardFooter}>
        {opp.deadline_date ? (
          <span className={styles.deadlineText}>
            Deadline: {new Date(opp.deadline_date).toLocaleDateString('en-CA', { month: 'short', day: 'numeric', year: 'numeric' })}
          </span>
        ) : (
          <span className={styles.deadlineText}>Open deadline</span>
        )}
        <a
          href={applyHref(opp)}
          className={styles.applyBtn}
          target={opp.application_url ? '_blank' : undefined}
          rel={opp.application_url ? 'noopener noreferrer' : undefined}
        >
          Apply / Sign Up
        </a>
      </div>
    </article>
  )
}
