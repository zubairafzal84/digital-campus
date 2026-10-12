'use client'

import { useState, useEffect, useCallback } from 'react'
import styles from './events.module.css'

// ---- Types ----

type EventType = 'all' | 'academic' | 'social' | 'sports' | 'arts' | 'career' | 'volunteer' | 'frosh' | 'other'

interface CampusEvent {
  id: string
  title: string
  description: string | null
  event_type: string
  school_slug: string | null
  organizer_name: string | null
  location: string | null
  is_online: boolean
  online_url: string | null
  starts_at: string
  ends_at: string | null
  max_attendees: number | null
  current_attendees: number
  is_free: boolean
  price_cents: number
  image_url: string | null
}

interface RsvpMap {
  [eventId: string]: 'going' | 'maybe' | 'not_going' | null
}

// ---- Constants ----

const TYPE_TABS: { value: EventType; label: string; icon: string }[] = [
  { value: 'all',       label: 'All',       icon: '🎓' },
  { value: 'academic',  label: 'Academic',  icon: '📚' },
  { value: 'social',    label: 'Social',    icon: '🎉' },
  { value: 'sports',    label: 'Sports',    icon: '⚽' },
  { value: 'arts',      label: 'Arts',      icon: '🎨' },
  { value: 'career',    label: 'Career',    icon: '💼' },
  { value: 'volunteer', label: 'Volunteer', icon: '🤝' },
  { value: 'frosh',     label: 'Frosh',     icon: '🎊' },
]

const SCHOOLS: { slug: string; label: string }[] = [
  { slug: '',           label: 'All Schools' },
  { slug: 'ubc',        label: 'UBC' },
  { slug: 'sfu',        label: 'SFU' },
  { slug: 'uoft',       label: 'UofT' },
  { slug: 'mcgill',     label: 'McGill' },
  { slug: 'uwaterloo',  label: 'Waterloo' },
  { slug: 'queens',     label: "Queen's" },
  { slug: 'ualberta',   label: 'UAlberta' },
  { slug: 'uvic',       label: 'UVic' },
  { slug: 'dal',        label: 'Dalhousie' },
  { slug: 'bcit',       label: 'BCIT' },
  { slug: 'seneca',     label: 'Seneca' },
  { slug: 'humber',     label: 'Humber' },
  { slug: 'mcmaster',   label: 'McMaster' },
  { slug: 'carleton',   label: 'Carleton' },
  { slug: 'western',    label: 'Western' },
]

const TYPE_ICONS: Record<string, string> = {
  academic: '📚', social: '🎉', sports: '⚽', arts: '🎨',
  career: '💼', volunteer: '🤝', frosh: '🎊', other: '📌',
}

// ---- Date helpers ----

function getWeekRange(offset = 0): { from: Date; to: Date } {
  const now = new Date()
  const dow = now.getDay()
  const mon = new Date(now)
  mon.setDate(now.getDate() - dow + 1 + offset * 7)
  mon.setHours(0, 0, 0, 0)
  const sun = new Date(mon)
  sun.setDate(mon.getDate() + 6)
  sun.setHours(23, 59, 59, 999)
  return { from: mon, to: sun }
}

function getMonthRange(): { from: Date; to: Date } {
  const now = new Date()
  const from = new Date(now.getFullYear(), now.getMonth(), 1)
  const to   = new Date(now.getFullYear(), now.getMonth() + 1, 0, 23, 59, 59)
  return { from, to }
}

function toIso(d: Date) {
  return d.toISOString()
}

function buildStripDays(from: Date): { date: Date; dayName: string; dayNum: number }[] {
  const days = []
  for (let i = 0; i < 7; i++) {
    const d = new Date(from)
    d.setDate(from.getDate() + i)
    days.push({
      date: d,
      dayName: d.toLocaleDateString('en-CA', { weekday: 'short' }),
      dayNum: d.getDate(),
    })
  }
  return days
}

function formatEventDate(starts_at: string, ends_at: string | null): string {
  const start = new Date(starts_at)
  const opts: Intl.DateTimeFormatOptions = {
    weekday: 'short', month: 'short', day: 'numeric',
    hour: 'numeric', minute: '2-digit', hour12: true,
  }
  const s = start.toLocaleDateString('en-CA', opts)
  if (!ends_at) return s
  const end = new Date(ends_at)
  const endTime = end.toLocaleTimeString('en-CA', { hour: 'numeric', minute: '2-digit', hour12: true })
  return `${s} – ${endTime}`
}

function formatPrice(price_cents: number): string {
  return `$${(price_cents / 100).toFixed(2)}`
}

// ---- Component ----

export default function EventsPage() {
  const [events, setEvents]           = useState<CampusEvent[]>([])
  const [loading, setLoading]         = useState(true)
  const [school, setSchool]           = useState('')
  const [eventType, setEventType]     = useState<EventType>('all')
  const [dateRange, setDateRange]     = useState<'this-week' | 'next-week' | 'this-month'>('this-week')
  const [selectedDay, setSelectedDay] = useState<string | null>(null)
  const [rsvpMap, setRsvpMap]         = useState<RsvpMap>({})
  const [rsvpLoading, setRsvpLoading] = useState<string | null>(null)

  // Build strip from the current range start
  const rangeStart = dateRange === 'next-week'
    ? getWeekRange(1).from
    : dateRange === 'this-month'
      ? getMonthRange().from
      : getWeekRange(0).from

  const stripDays = buildStripDays(rangeStart)

  // Compute event count per day for the dots
  const countsByDay: Record<string, number> = {}
  for (const ev of events) {
    const key = new Date(ev.starts_at).toDateString()
    countsByDay[key] = (countsByDay[key] ?? 0) + 1
  }

  // Derive date params from the selected range / day
  const getDateParams = useCallback(() => {
    if (selectedDay) {
      const d = new Date(selectedDay)
      const from = new Date(d); from.setHours(0, 0, 0, 0)
      const to   = new Date(d); to.setHours(23, 59, 59, 999)
      return { from: toIso(from), to: toIso(to) }
    }
    if (dateRange === 'this-week')  { const r = getWeekRange(0); return { from: toIso(r.from), to: toIso(r.to) } }
    if (dateRange === 'next-week')  { const r = getWeekRange(1); return { from: toIso(r.from), to: toIso(r.to) } }
    const r = getMonthRange(); return { from: toIso(r.from), to: toIso(r.to) }
  }, [dateRange, selectedDay])

  // Fetch events
  useEffect(() => {
    const controller = new AbortController()
    setLoading(true)
    const { from, to } = getDateParams()
    const params = new URLSearchParams({ from_date: from, to_date: to, limit: '100' })
    if (school)    params.set('school', school)
    if (eventType !== 'all') params.set('type', eventType)

    fetch(`/api/events?${params}`, { signal: controller.signal })
      .then((r) => r.json())
      .then((d) => {
        setEvents(d.events ?? [])
        setLoading(false)
      })
      .catch(() => setLoading(false))

    return () => controller.abort()
  }, [school, eventType, getDateParams])

  // Filter to selected day if set
  const displayEvents = selectedDay
    ? events.filter((e) => new Date(e.starts_at).toDateString() === new Date(selectedDay).toDateString())
    : events

  // RSVP handler
  async function handleRsvp(eventId: string, status: 'going' | 'maybe' | 'not_going') {
    const current = rsvpMap[eventId]
    setRsvpLoading(eventId)

    try {
      if (current === status) {
        // Toggle off = cancel
        await fetch(`/api/events/${eventId}/rsvp`, { method: 'DELETE' })
        setRsvpMap((m) => ({ ...m, [eventId]: null }))
        if (status === 'going') {
          setEvents((evs) =>
            evs.map((e) =>
              e.id === eventId
                ? { ...e, current_attendees: Math.max(0, e.current_attendees - 1) }
                : e,
            ),
          )
        }
      } else {
        const res = await fetch(`/api/events/${eventId}/rsvp`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ status }),
        })
        if (res.ok) {
          setRsvpMap((m) => ({ ...m, [eventId]: status }))
          setEvents((evs) =>
            evs.map((e) => {
              if (e.id !== eventId) return e
              let delta = 0
              if (status === 'going' && current !== 'going') delta = 1
              if (status !== 'going' && current === 'going') delta = -1
              return { ...e, current_attendees: Math.max(0, e.current_attendees + delta) }
            }),
          )
        }
      }
    } finally {
      setRsvpLoading(null)
    }
  }

  function handleDateRangeChange(range: 'this-week' | 'next-week' | 'this-month') {
    setDateRange(range)
    setSelectedDay(null)
  }

  return (
    <div className={styles.page}>
      {/* ---- Header ---- */}
      <div className={styles.header}>
        <div className={styles.headerInner}>
          <h1 className={styles.heading}>What&apos;s On Campus</h1>
          <p className={styles.subheading}>
            Discover events at your school — academic, social, sports, and more.
          </p>
          <div className={styles.dateNav}>
            {(['this-week', 'next-week', 'this-month'] as const).map((r) => (
              <button
                key={r}
                className={`${styles.dateNavBtn} ${dateRange === r && !selectedDay ? styles.dateNavBtnActive : ''}`}
                onClick={() => handleDateRangeChange(r)}
              >
                {r === 'this-week' ? 'This Week' : r === 'next-week' ? 'Next Week' : 'This Month'}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* ---- 7-day calendar strip ---- */}
      <div className={styles.calStrip}>
        {stripDays.map(({ date, dayName, dayNum }) => {
          const key = date.toDateString()
          const isActive = selectedDay === key
          const count = countsByDay[key] ?? 0
          return (
            <button
              key={key}
              className={`${styles.calDay} ${isActive ? styles.calDayActive : ''}`}
              onClick={() => setSelectedDay(isActive ? null : key)}
              aria-pressed={isActive}
            >
              <span className={styles.calDayName}>{dayName}</span>
              <span className={styles.calDayNum}>{dayNum}</span>
              {count > 0
                ? <span className={styles.dateDot} aria-label={`${count} events`} />
                : <span className={styles.dateDotEmpty} />}
            </button>
          )
        })}
      </div>

      {/* ---- Filter bar ---- */}
      <div className={styles.filterBar}>
        <select
          className={styles.schoolSelect}
          value={school}
          onChange={(e) => setSchool(e.target.value)}
          aria-label="Filter by school"
        >
          {SCHOOLS.map((s) => (
            <option key={s.slug} value={s.slug}>{s.label}</option>
          ))}
        </select>

        <div className={styles.typeTabs} role="tablist" aria-label="Event type filter">
          {TYPE_TABS.map(({ value, label, icon }) => (
            <button
              key={value}
              role="tab"
              aria-selected={eventType === value}
              className={`${styles.typeTab} ${eventType === value ? styles.typeTabActive : ''}`}
              onClick={() => setEventType(value)}
            >
              {icon} {label}
            </button>
          ))}
        </div>
      </div>

      {/* ---- Grid ---- */}
      <div className={styles.gridWrap}>
        {!loading && (
          <p className={styles.resultCount}>
            {displayEvents.length === 0
              ? 'No events found'
              : `${displayEvents.length} event${displayEvents.length !== 1 ? 's' : ''} found`}
          </p>
        )}

        {loading ? (
          <div className={styles.loadingGrid}>
            {Array.from({ length: 6 }).map((_, i) => (
              <div key={i} className={styles.skeletonCard}>
                <div className={styles.skeletonImg} />
                <div className={styles.skeletonBody}>
                  <div className={styles.skeletonLine} />
                  <div className={styles.skeletonLine} />
                  <div className={styles.skeletonLine} />
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className={styles.grid}>
            {displayEvents.length === 0 ? (
              <div className={styles.emptyState}>
                <div className={styles.emptyStateIcon}>📅</div>
                <p>No events for this period. Check back soon or try a different filter.</p>
              </div>
            ) : (
              displayEvents.map((event) => {
                const myRsvp = rsvpMap[event.id] ?? null
                const fillPct = event.max_attendees
                  ? Math.min(100, (event.current_attendees / event.max_attendees) * 100)
                  : null
                const typeIcon = TYPE_ICONS[event.event_type] ?? '📌'
                const isRsvpLoading = rsvpLoading === event.id

                return (
                  <article key={event.id} className={styles.card}>
                    {event.image_url ? (
                      // eslint-disable-next-line @next/next/no-img-element
                      <img
                        src={event.image_url}
                        alt={event.title}
                        className={styles.cardImage}
                      />
                    ) : (
                      <div className={styles.cardImagePlaceholder}>
                        {typeIcon}
                      </div>
                    )}

                    <div className={styles.cardBody}>
                      <div className={styles.cardTopRow}>
                        <span className={styles.cardType}>
                          {typeIcon} {event.event_type}
                        </span>
                        {event.is_free
                          ? <span className={styles.freeTag}>Free</span>
                          : <span className={styles.paidTag}>{formatPrice(event.price_cents)}</span>}
                      </div>

                      <h2 className={styles.cardTitle}>{event.title}</h2>

                      <div className={styles.cardMeta}>
                        <div className={styles.cardMetaRow}>
                          <span className={styles.metaIcon}>🗓</span>
                          <span>{formatEventDate(event.starts_at, event.ends_at)}</span>
                        </div>
                        <div className={styles.cardMetaRow}>
                          <span className={styles.metaIcon}>
                            {event.is_online ? '💻' : '📍'}
                          </span>
                          <span>
                            {event.is_online
                              ? 'Online'
                              : event.location ?? 'Location TBA'}
                          </span>
                        </div>
                        {event.organizer_name && (
                          <div className={styles.cardMetaRow}>
                            <span className={styles.metaIcon}>👤</span>
                            <span>{event.organizer_name}</span>
                          </div>
                        )}
                      </div>

                      {/* Attendees bar */}
                      <div className={styles.attendeesBar}>
                        <span>
                          {event.current_attendees} going
                          {event.max_attendees ? ` / ${event.max_attendees}` : ''}
                        </span>
                        {fillPct !== null && (
                          <div className={styles.attendeesTrack} aria-hidden>
                            <div
                              className={styles.attendeesFill}
                              style={{ width: `${fillPct}%` }}
                            />
                          </div>
                        )}
                      </div>

                      {/* RSVP buttons */}
                      <div className={styles.rsvpArea}>
                        {(['going', 'maybe', 'not_going'] as const).map((s) => {
                          const labels: Record<string, string> = {
                            going: 'Going', maybe: 'Maybe', not_going: 'Skip',
                          }
                          const activeClass =
                            s === 'going' ? styles.rsvpGoing
                            : s === 'maybe' ? styles.rsvpMaybe
                            : ''
                          return (
                            <button
                              key={s}
                              disabled={isRsvpLoading}
                              className={`${styles.rsvpBtn} ${myRsvp === s ? activeClass : ''}`}
                              onClick={() => handleRsvp(event.id, s)}
                              aria-pressed={myRsvp === s}
                            >
                              {labels[s]}
                            </button>
                          )
                        })}
                      </div>
                    </div>
                  </article>
                )
              })
            )}
          </div>
        )}
      </div>
    </div>
  )
}

export const metadata = {
  title: "What's On Campus | Digital Kampus",
  description:
    'Discover upcoming events at Canadian colleges and universities — academic sessions, social events, sports, arts, career fairs, and more.',
}
