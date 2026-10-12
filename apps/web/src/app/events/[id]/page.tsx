'use client'

import { useState, useEffect, useCallback } from 'react'
import Link from 'next/link'
import { useParams } from 'next/navigation'
import styles from './event-detail.module.css'

// ---- Types ----

interface EventDetail {
  id: string
  title: string
  description: string | null
  event_type: string
  event_category: string | null
  visibility: 'public' | 'unlisted' | 'private'
  cover_emoji: string | null
  tags: string[]
  comments_enabled: boolean
  share_token: string | undefined
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
  created_by: string
}

interface Comment {
  id: string
  user_id: string
  content: string
  created_at: string
}

type RsvpStatus = 'going' | 'maybe' | 'not_going' | null

// ---- Category → CSS class map ----

const CATEGORY_COVER: Record<string, string> = {
  watch_party:   styles.coverWatch,
  study_session: styles.coverStudy,
  pickup_game:   styles.coverPickup,
  potluck:       styles.coverPotluck,
  hiking:        styles.coverHiking,
  gaming:        styles.coverGaming,
  movie:         styles.coverMovie,
  music:         styles.coverMusic,
  campus_tour:   styles.coverCampus,
  cultural:      styles.coverCultural,
  other:         styles.coverOther,
}

// ---- Helpers ----

function formatDate(isoString: string): string {
  const d = new Date(isoString)
  return d.toLocaleDateString('en-CA', {
    weekday: 'long', year: 'numeric', month: 'long', day: 'numeric',
    hour: 'numeric', minute: '2-digit', hour12: true,
  })
}

function timeAgo(isoString: string): string {
  const diff = Date.now() - new Date(isoString).getTime()
  const mins = Math.floor(diff / 60000)
  if (mins < 1)  return 'just now'
  if (mins < 60) return `${mins}m ago`
  const hrs = Math.floor(mins / 60)
  if (hrs < 24)  return `${hrs}h ago`
  return `${Math.floor(hrs / 24)}d ago`
}

function initials(userId: string): string {
  return userId.slice(0, 2).toUpperCase()
}

// ---- Auth hook (same pattern as create page) ----

function useCurrentUser() {
  const [userId, setUserId] = useState<string | null | undefined>(undefined)

  useEffect(() => {
    fetch('/api/auth/me', { credentials: 'include' })
      .then((r) => r.json())
      .then((d) => setUserId(d?.userId ?? null))
      .catch(() => setUserId(null))
  }, [])

  return userId
}

// ---- Component ----

export default function EventDetailPage() {
  const params = useParams()
  const eventId = params.id as string
  const userId = useCurrentUser()

  const [event, setEvent]           = useState<EventDetail | null>(null)
  const [loadingEvent, setLoading]  = useState(true)
  const [notFound, setNotFound]     = useState(false)
  const [rsvp, setRsvp]             = useState<RsvpStatus>(null)
  const [rsvpLoading, setRsvpLoad]  = useState(false)
  const [comments, setComments]     = useState<Comment[]>([])
  const [commentText, setCommentText] = useState('')
  const [commentSubmitting, setCommentSubmitting] = useState(false)
  const [copied, setCopied]         = useState(false)

  // Fetch event
  useEffect(() => {
    if (!eventId) return
    setLoading(true)
    fetch(`/api/events/${eventId}`, { credentials: 'include' })
      .then((r) => {
        if (r.status === 404) { setNotFound(true); setLoading(false); return null }
        return r.json()
      })
      .then((d) => {
        if (d?.event) setEvent(d.event)
        setLoading(false)
      })
      .catch(() => setLoading(false))
  }, [eventId])

  // Fetch comments
  const fetchComments = useCallback(() => {
    if (!eventId) return
    fetch(`/api/events/${eventId}/comments`, { credentials: 'include' })
      .then((r) => r.json())
      .then((d) => setComments(d.comments ?? []))
      .catch(() => {})
  }, [eventId])

  useEffect(() => {
    fetchComments()
  }, [fetchComments])

  // RSVP handler
  async function handleRsvp(status: 'going' | 'maybe' | 'not_going') {
    if (!event) return
    setRsvpLoad(true)

    try {
      if (rsvp === status) {
        // Toggle off
        await fetch(`/api/events/${eventId}/rsvp`, { method: 'DELETE', credentials: 'include' })
        setRsvp(null)
        if (status === 'going') {
          setEvent((e) => e ? { ...e, current_attendees: Math.max(0, e.current_attendees - 1) } : e)
        }
      } else {
        const res = await fetch(`/api/events/${eventId}/rsvp`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          credentials: 'include',
          body: JSON.stringify({ status }),
        })
        if (res.ok) {
          setRsvp(status)
          setEvent((e) => {
            if (!e) return e
            let delta = 0
            if (status === 'going' && rsvp !== 'going') delta = 1
            if (status !== 'going' && rsvp === 'going') delta = -1
            return { ...e, current_attendees: Math.max(0, e.current_attendees + delta) }
          })
        }
      }
    } finally {
      setRsvpLoad(false)
    }
  }

  // Post comment
  async function handleComment(e: React.FormEvent) {
    e.preventDefault()
    const text = commentText.trim()
    if (!text || !userId) return
    setCommentSubmitting(true)

    try {
      const res = await fetch(`/api/events/${eventId}/comments`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify({ content: text }),
      })
      if (res.ok) {
        setCommentText('')
        fetchComments()
      }
    } finally {
      setCommentSubmitting(false)
    }
  }

  // Delete comment
  async function handleDeleteComment(commentId: string) {
    await fetch(`/api/events/${eventId}/comments?comment_id=${commentId}`, {
      method: 'DELETE',
      credentials: 'include',
    })
    setComments((c) => c.filter((x) => x.id !== commentId))
  }

  // Copy link
  function copyLink() {
    const url = event?.visibility === 'unlisted' && event.share_token
      ? `${window.location.origin}/events/${eventId}?share=${event.share_token}`
      : window.location.href

    navigator.clipboard.writeText(url).then(() => {
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    })
  }

  // ---- Render states ----

  if (loadingEvent) {
    return (
      <div className={styles.page}>
        <div className={styles.loadingState}>Loading event…</div>
      </div>
    )
  }

  if (notFound || !event) {
    return (
      <div className={styles.page}>
        <div className={styles.errorState}>
          <h2>Event not found</h2>
          <p>This event may be private, removed, or the link may be incorrect.</p>
          <Link href="/events">Browse all events</Link>
        </div>
      </div>
    )
  }

  const coverClass = CATEGORY_COVER[event.event_category ?? 'other'] ?? styles.coverOther
  const fillPct = event.max_attendees
    ? Math.min(100, (event.current_attendees / event.max_attendees) * 100)
    : null

  const shareUrl = event.visibility === 'unlisted' && event.share_token
    ? `${typeof window !== 'undefined' ? window.location.origin : ''}/events/${eventId}?share=${event.share_token}`
    : typeof window !== 'undefined' ? window.location.href : ''

  return (
    <div className={styles.page}>

      {/* ---- Cover ---- */}
      <div className={`${styles.cover} ${event.image_url ? '' : coverClass}`}>
        <Link href="/events" className={styles.coverBack}>← Events</Link>
        {event.image_url
          // eslint-disable-next-line @next/next/no-img-element
          ? <img src={event.image_url} alt={event.title} className={styles.coverImage} />
          : <span className={styles.coverEmoji}>{event.cover_emoji ?? '🎉'}</span>
        }
      </div>

      <div className={styles.content}>

        {/* ---- Main card ---- */}
        <div className={styles.mainCard}>
          <div className={styles.titleRow}>
            <h1 className={styles.title}>{event.title}</h1>
            {event.visibility && (
              <span className={`${styles.visBadge} ${
                event.visibility === 'public'   ? styles.visBadgePublic :
                event.visibility === 'unlisted' ? styles.visBadgeUnlisted :
                styles.visBadgePrivate
              }`}>
                {event.visibility === 'public' ? '🌍' : event.visibility === 'unlisted' ? '🔗' : '🔒'}
                {' '}{event.visibility.charAt(0).toUpperCase() + event.visibility.slice(1)}
              </span>
            )}
          </div>

          {event.organizer_name && (
            <p className={styles.organizer}>by {event.organizer_name}</p>
          )}

          <div className={styles.metaGrid}>
            <div className={styles.metaItem}>
              <span className={styles.metaIcon}>🗓</span>
              <span>{formatDate(event.starts_at)}</span>
            </div>
            <div className={styles.metaItem}>
              <span className={styles.metaIcon}>{event.is_online ? '💻' : '📍'}</span>
              <span>
                {event.is_online
                  ? (event.online_url ? <a href={event.online_url} target="_blank" rel="noreferrer">Join Online</a> : 'Online')
                  : (event.location ?? 'Location TBA')}
              </span>
            </div>
            {event.school_slug && (
              <div className={styles.metaItem}>
                <span className={styles.metaIcon}>🏫</span>
                <span>{event.school_slug.toUpperCase()}</span>
              </div>
            )}
          </div>

          {event.description && (
            <p className={styles.description}>{event.description}</p>
          )}

          {event.tags && event.tags.length > 0 && (
            <div className={styles.tags}>
              {event.tags.map((tag) => (
                <span key={tag} className={styles.tag}>#{tag}</span>
              ))}
            </div>
          )}
        </div>

        {/* ---- RSVP section ---- */}
        <div className={styles.rsvpSection}>
          <h2 className={styles.rsvpHeading}>
            {event.current_attendees} going
            {event.max_attendees ? ` · ${event.max_attendees - event.current_attendees} spots left` : ''}
          </h2>

          {fillPct !== null && (
            <div className={styles.attendeesBar}>
              <span>{Math.round(fillPct)}% full</span>
              <div className={styles.attendeesTrack} aria-hidden>
                <div className={styles.attendeesFill} style={{ width: `${fillPct}%` }} />
              </div>
            </div>
          )}

          {event.current_attendees > 0 && (
            <div className={styles.avatarRow} aria-label="Attendees">
              {Array.from({ length: Math.min(event.current_attendees, 8) }).map((_, i) => (
                <div key={i} className={styles.avatar} aria-hidden>
                  {String.fromCharCode(65 + (i % 26))}
                </div>
              ))}
              {event.current_attendees > 8 && (
                <div className={styles.avatar}>+{event.current_attendees - 8}</div>
              )}
            </div>
          )}

          <div className={styles.rsvpBtns}>
            {(['going', 'maybe', 'not_going'] as const).map((s) => {
              const labels: Record<string, string> = { going: '✅ Going', maybe: '🤔 Maybe', not_going: '❌ Skip' }
              return (
                <button
                  key={s}
                  disabled={rsvpLoading || !userId}
                  className={`${styles.rsvpBtn} ${rsvp === s ? (s === 'going' ? styles.rsvpGoing : s === 'maybe' ? styles.rsvpMaybe : '') : ''}`}
                  onClick={() => handleRsvp(s)}
                  aria-pressed={rsvp === s}
                  title={!userId ? 'Sign in to RSVP' : undefined}
                >
                  {labels[s]}
                </button>
              )
            })}
          </div>
        </div>

        {/* ---- Share section ---- */}
        <div className={styles.shareSection}>
          <h2 className={styles.shareHeading}>Share this event</h2>
          <div className={styles.shareLinkRow}>
            <div className={styles.shareLinkInput}>{shareUrl}</div>
            <button
              className={`${styles.copyBtn} ${copied ? styles.copyBtnDone : ''}`}
              onClick={copyLink}
            >
              {copied ? '✓ Copied!' : 'Copy Link'}
            </button>
          </div>
        </div>

        {/* ---- Comments section ---- */}
        {event.comments_enabled && (
          <div className={styles.commentsSection}>
            <h2 className={styles.commentsHeading}>
              Comments {comments.length > 0 && `(${comments.length})`}
            </h2>

            {comments.length > 0 && (
              <div className={styles.commentList}>
                {comments.map((c) => (
                  <div key={c.id} className={styles.commentItem}>
                    <div className={styles.commentAvatar}>{initials(c.user_id)}</div>
                    <div className={styles.commentBody}>
                      <div className={styles.commentMeta}>
                        <span className={styles.commentUserId}>{c.user_id.slice(0, 8)}…</span>
                        <span className={styles.commentTime}>{timeAgo(c.created_at)}</span>
                        {userId === c.user_id && (
                          <button
                            className={styles.commentDeleteBtn}
                            onClick={() => handleDeleteComment(c.id)}
                            aria-label="Delete comment"
                          >
                            Delete
                          </button>
                        )}
                      </div>
                      <p className={styles.commentText}>{c.content}</p>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {userId ? (
              <form className={styles.commentForm} onSubmit={handleComment}>
                <textarea
                  className={styles.commentInput}
                  placeholder="Add a comment…"
                  maxLength={500}
                  value={commentText}
                  onChange={(e) => setCommentText(e.target.value)}
                  rows={2}
                />
                <button
                  type="submit"
                  className={styles.commentSubmitBtn}
                  disabled={!commentText.trim() || commentSubmitting}
                >
                  {commentSubmitting ? '…' : 'Post'}
                </button>
              </form>
            ) : (
              <p className={styles.commentSignIn}>
                <Link href={`/login?redirect=/events/${eventId}`}>Sign in</Link> to leave a comment.
              </p>
            )}
          </div>
        )}

        {/* ---- Footer ---- */}
        <div className={styles.footerLinks}>
          <a
            href={`mailto:support@digitalkampus.ca?subject=Report event ${eventId}`}
            className={styles.reportLink}
          >
            Report this event
          </a>
        </div>

      </div>
    </div>
  )
}
