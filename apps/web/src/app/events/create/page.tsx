'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import styles from './event-create.module.css'

// ---- Constants ----

const COVER_EMOJIS = [
  '🏏','🎬','🎮','🥾','🎵','🍕','🏀','⚽','🎾','🃏',
  '🎨','📚','🏊','🎭','🌲','🎓','🎪','🏋️','🧩','🎯',
]

const CATEGORIES: { value: string; label: string; emoji: string }[] = [
  { value: 'watch_party',    label: 'Watch Party',    emoji: '🏏' },
  { value: 'study_session',  label: 'Study Session',  emoji: '📚' },
  { value: 'pickup_game',    label: 'Pickup Game',    emoji: '⚽' },
  { value: 'potluck',        label: 'Potluck',        emoji: '🍕' },
  { value: 'hiking',         label: 'Hiking',         emoji: '🥾' },
  { value: 'gaming',         label: 'Gaming',         emoji: '🎮' },
  { value: 'movie',          label: 'Movie Night',    emoji: '🎬' },
  { value: 'music',          label: 'Music / Concert',emoji: '🎵' },
  { value: 'campus_tour',    label: 'Campus Tour',    emoji: '🎓' },
  { value: 'cultural',       label: 'Cultural',       emoji: '🌍' },
  { value: 'other',          label: 'Other',          emoji: '🎉' },
]

const VISIBILITY: { value: string; icon: string; title: string; desc: string }[] = [
  {
    value: 'public',
    icon: '🌍',
    title: 'Public',
    desc: 'Anyone on Digital Kampus can find and join',
  },
  {
    value: 'unlisted',
    icon: '🔗',
    title: 'Unlisted',
    desc: 'Only people with the link can join',
  },
  {
    value: 'private',
    icon: '🔒',
    title: 'Private',
    desc: 'Only people you invite can join',
  },
]

// ---- Minimal auth check using cookie/session ----

function useCurrentUser() {
  const [userId, setUserId] = useState<string | null | undefined>(undefined)

  useEffect(() => {
    // Hits Clerk's own session check endpoint — returns null if no session
    fetch('/api/auth/me', { credentials: 'include' })
      .then((r) => r.json())
      .then((d) => setUserId(d?.userId ?? null))
      .catch(() => setUserId(null))
  }, [])

  return userId
}

// ---- Component ----

export default function CreateEventPage() {
  const router = useRouter()
  const userId = useCurrentUser()

  // Form state
  const [coverEmoji, setCoverEmoji] = useState('🎉')
  const [title, setTitle] = useState('')
  const [category, setCategory] = useState('other')
  const [description, setDescription] = useState('')
  const [date, setDate] = useState('')
  const [time, setTime] = useState('')
  const [location, setLocation] = useState('')
  const [isOnline, setIsOnline] = useState(false)
  const [maxAttendees, setMaxAttendees] = useState('')
  const [tagsRaw, setTagsRaw] = useState('')
  const [visibility, setVisibility] = useState('public')
  const [commentsEnabled, setCommentsEnabled] = useState(true)
  const [submitting, setSubmitting] = useState(false)
  const [error, setError] = useState<string | null>(null)

  // Still loading auth
  if (userId === undefined) {
    return (
      <div className={styles.page}>
        <div className={styles.header}>
          <p className={styles.subheading}>Loading…</p>
        </div>
      </div>
    )
  }

  // Not logged in
  if (userId === null) {
    return (
      <div className={styles.page}>
        <div className={styles.header}>
          <Link href="/events" className={styles.backLink}>← Back to Events</Link>
          <h1 className={styles.heading}>Create an Event</h1>
        </div>
        <div className={styles.authGate}>
          <div className={styles.authGateIcon}>🔐</div>
          <h2>Sign in to create events</h2>
          <p>You need a Digital Kampus account to organise events for other students.</p>
          <Link href="/login?redirect=/events/create" className={styles.authGateBtn}>
            Sign In
          </Link>
        </div>
      </div>
    )
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setError(null)

    if (!title.trim()) { setError('Please enter an event title.'); return }
    if (!date || !time)  { setError('Please set a date and time for your event.'); return }

    setSubmitting(true)

    const startsAt = new Date(`${date}T${time}`).toISOString()
    const tags = tagsRaw
      .split(',')
      .map((t) => t.trim().toLowerCase())
      .filter(Boolean)

    try {
      const res = await fetch('/api/events', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify({
          title: title.trim(),
          description: description.trim() || null,
          event_type: 'social',
          event_category: category,
          visibility,
          cover_emoji: coverEmoji,
          tags,
          comments_enabled: commentsEnabled,
          location: location.trim() || null,
          is_online: isOnline,
          starts_at: startsAt,
          max_attendees: maxAttendees ? parseInt(maxAttendees, 10) : null,
          is_free: true,
          is_published: true,
        }),
      })

      const data = await res.json()

      if (!res.ok) {
        setError(data.error ?? 'Something went wrong. Please try again.')
        setSubmitting(false)
        return
      }

      router.push(`/events/${data.event_id}`)
    } catch {
      setError('Network error. Please try again.')
      setSubmitting(false)
    }
  }

  return (
    <div className={styles.page}>
      {/* Header */}
      <div className={styles.header}>
        <Link href="/events" className={styles.backLink}>← Back to Events</Link>
        <h1 className={styles.heading}>Create an Event</h1>
        <p className={styles.subheading}>Organise a get-together for your campus community</p>
      </div>

      <div className={styles.formWrap}>
        <form className={styles.form} onSubmit={handleSubmit} noValidate>

          {/* ---- Cover emoji ---- */}
          <div className={styles.emojiSection}>
            <p className={styles.sectionLabel}>Event Cover</p>
            <div className={styles.emojiPreview}>
              <div className={styles.emojiLarge}>{coverEmoji}</div>
              <span className={styles.emojiPreviewText}>Pick an emoji to represent your event</span>
            </div>
            <div className={styles.emojiGrid} role="group" aria-label="Choose cover emoji">
              {COVER_EMOJIS.map((em) => (
                <button
                  key={em}
                  type="button"
                  aria-label={`Cover emoji ${em}`}
                  aria-pressed={coverEmoji === em}
                  className={`${styles.emojiBtn} ${coverEmoji === em ? styles.emojiBtnActive : ''}`}
                  onClick={() => setCoverEmoji(em)}
                >
                  {em}
                </button>
              ))}
            </div>
          </div>

          {/* ---- Title ---- */}
          <div className={styles.fieldGroup}>
            <label htmlFor="ec-title">Event Title <span aria-hidden>*</span></label>
            <input
              id="ec-title"
              className={styles.input}
              type="text"
              placeholder="e.g. IPL Watch Party — RCB vs MI 🏏"
              maxLength={80}
              required
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
            <div className={`${styles.charCount} ${title.length > 70 ? styles.charCountWarn : ''}`}>
              {title.length}/80
            </div>
          </div>

          {/* ---- Category ---- */}
          <div className={styles.fieldGroup}>
            <label htmlFor="ec-category">Category</label>
            <select
              id="ec-category"
              className={styles.select}
              value={category}
              onChange={(e) => setCategory(e.target.value)}
            >
              {CATEGORIES.map((c) => (
                <option key={c.value} value={c.value}>{c.emoji} {c.label}</option>
              ))}
            </select>
          </div>

          {/* ---- Description ---- */}
          <div className={styles.fieldGroup}>
            <label htmlFor="ec-desc">Description</label>
            <textarea
              id="ec-desc"
              className={styles.textarea}
              placeholder="What's happening? Share details, bring-your-own, dress code…"
              maxLength={500}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
            <div className={`${styles.charCount} ${description.length > 450 ? styles.charCountWarn : ''}`}>
              {description.length}/500
            </div>
          </div>

          {/* ---- Date & time ---- */}
          <div className={styles.fieldRow}>
            <div className={styles.fieldGroup}>
              <label htmlFor="ec-date">Date <span aria-hidden>*</span></label>
              <input
                id="ec-date"
                className={styles.input}
                type="date"
                required
                value={date}
                onChange={(e) => setDate(e.target.value)}
              />
            </div>
            <div className={styles.fieldGroup}>
              <label htmlFor="ec-time">Time <span aria-hidden>*</span></label>
              <input
                id="ec-time"
                className={styles.input}
                type="time"
                required
                value={time}
                onChange={(e) => setTime(e.target.value)}
              />
            </div>
          </div>

          {/* ---- Location ---- */}
          <div className={styles.fieldGroup}>
            <label htmlFor="ec-location">Location</label>
            <input
              id="ec-location"
              className={styles.input}
              type="text"
              placeholder="e.g. UBC Life Building Room 201, or Zoom link"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
            />
          </div>

          {/* ---- Online toggle ---- */}
          <div className={styles.toggleRow}>
            <div>
              <div className={styles.toggleLabel}>Online event</div>
              <div className={styles.toggleSub}>Check if this event takes place entirely online</div>
            </div>
            <label className={styles.toggle}>
              <input
                type="checkbox"
                checked={isOnline}
                onChange={(e) => setIsOnline(e.target.checked)}
              />
              <span className={styles.toggleSlider} />
            </label>
          </div>

          {/* ---- Max attendees ---- */}
          <div className={styles.fieldGroup}>
            <label htmlFor="ec-max">Max Attendees</label>
            <input
              id="ec-max"
              className={styles.input}
              type="number"
              min={1}
              placeholder="Leave blank for unlimited"
              value={maxAttendees}
              onChange={(e) => setMaxAttendees(e.target.value)}
            />
          </div>

          {/* ---- Tags ---- */}
          <div className={styles.fieldGroup}>
            <label htmlFor="ec-tags">Tags</label>
            <input
              id="ec-tags"
              className={styles.input}
              type="text"
              placeholder="e.g. cricket, IPL, UBC"
              value={tagsRaw}
              onChange={(e) => setTagsRaw(e.target.value)}
            />
            <small>Comma-separated — helps students discover your event</small>
          </div>

          {/* ---- Visibility ---- */}
          <div className={styles.visibilitySection}>
            <p className={styles.sectionLabel}>Who can see this event?</p>
            <div className={styles.visibilityGrid} role="group" aria-label="Event visibility">
              {VISIBILITY.map((v) => (
                <div
                  key={v.value}
                  role="radio"
                  aria-checked={visibility === v.value}
                  tabIndex={0}
                  className={`${styles.visCard} ${visibility === v.value ? styles.visCardActive : ''}`}
                  onClick={() => setVisibility(v.value)}
                  onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') setVisibility(v.value) }}
                >
                  <span className={styles.visCardIcon}>{v.icon}</span>
                  <div className={styles.visCardTitle}>{v.title}</div>
                  <p className={styles.visCardDesc}>{v.desc}</p>
                </div>
              ))}
            </div>
          </div>

          {/* ---- Comments toggle ---- */}
          <div className={styles.toggleRow}>
            <div>
              <div className={styles.toggleLabel}>Allow comments</div>
              <div className={styles.toggleSub}>Let attendees post questions and comments</div>
            </div>
            <label className={styles.toggle}>
              <input
                type="checkbox"
                checked={commentsEnabled}
                onChange={(e) => setCommentsEnabled(e.target.checked)}
              />
              <span className={styles.toggleSlider} />
            </label>
          </div>

          {/* ---- Error ---- */}
          {error && <div className={styles.errorBanner} role="alert">{error}</div>}

          {/* ---- Submit ---- */}
          <div className={styles.submitArea}>
            <Link href="/events" className={styles.cancelLink}>Cancel</Link>
            <button type="submit" className={styles.submitBtn} disabled={submitting}>
              {submitting ? 'Creating…' : 'Create Event'}
            </button>
          </div>

        </form>
      </div>
    </div>
  )
}
