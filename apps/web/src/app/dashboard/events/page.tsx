'use client'

import { useState, useEffect, useCallback } from 'react'
import Link from 'next/link'
import styles from './events.module.css'

type EventTab = 'created' | 'going'

interface DashboardEvent {
  id: string
  title: string
  event_type: string
  event_category?: string
  visibility: 'public' | 'unlisted' | 'private'
  cover_emoji?: string
  starts_at: string
  ends_at?: string
  current_attendees?: number
  max_attendees?: number
  is_published: boolean
  location?: string
  is_online?: boolean
}

function formatEventDate(startsAt: string): string {
  const d = new Date(startsAt)
  const now = new Date()
  const diff = d.getTime() - now.getTime()
  const days = Math.floor(diff / (1000 * 60 * 60 * 24))

  if (days === 0) return 'Today'
  if (days === 1) return 'Tomorrow'
  if (days < 7) return d.toLocaleDateString('en-CA', { weekday: 'long' })
  return d.toLocaleDateString('en-CA', { month: 'short', day: 'numeric', year: 'numeric' })
}

function VisibilityBadge({ visibility, isPublished }: { visibility: string; isPublished: boolean }) {
  if (!isPublished) {
    return <span className={`${styles.visibilityBadge} ${styles.visDraft}`}>Draft</span>
  }
  if (visibility === 'public') {
    return <span className={`${styles.visibilityBadge} ${styles.visPublic}`}>Public</span>
  }
  if (visibility === 'unlisted') {
    return <span className={`${styles.visibilityBadge} ${styles.visUnlisted}`}>Unlisted</span>
  }
  return <span className={`${styles.visibilityBadge} ${styles.visPrivate}`}>Private</span>
}

function EventCard({ event }: { event: DashboardEvent }) {
  const emoji = event.cover_emoji ?? '🎉'
  const dateLabel = formatEventDate(event.starts_at)
  const attendees = event.current_attendees ?? 0
  const capacity = event.max_attendees

  return (
    <Link href={`/events/${event.id}`} className={styles.eventCard}>
      <div className={styles.eventEmoji} aria-hidden="true">{emoji}</div>
      <div className={styles.eventBody}>
        <span className={styles.eventTitle}>{event.title}</span>
        <div className={styles.eventMeta}>
          <span className={styles.eventDate}>{dateLabel}</span>
          <span className={styles.eventAttendees}>
            {attendees}{capacity ? `/${capacity}` : ''} going
          </span>
          <VisibilityBadge visibility={event.visibility} isPublished={event.is_published} />
        </div>
      </div>
    </Link>
  )
}

function LoadingSkeletons() {
  return (
    <div className={styles.eventList} aria-busy="true" aria-label="Loading events">
      {[1, 2, 3].map(i => (
        <div key={i} className={`${styles.skeleton} ${styles.skeletonCard}`} />
      ))}
    </div>
  )
}

function EmptyCreated() {
  return (
    <div className={styles.emptyState}>
      <span className={styles.emptyIcon}>📅</span>
      <p className={styles.emptyTitle}>No events yet</p>
      <p className={styles.emptySub}>
        You haven&rsquo;t created any events yet. Host a cricket watch, study session, hike — anything.
      </p>
      <Link href="/events/create" className={styles.emptyLink}>
        Create your first event →
      </Link>
    </div>
  )
}

function EmptyGoing() {
  return (
    <div className={styles.emptyState}>
      <span className={styles.emptyIcon}>🎟️</span>
      <p className={styles.emptyTitle}>Nothing on your calendar yet</p>
      <p className={styles.emptySub}>
        RSVP to events to see them here.
      </p>
      <Link href="/events" className={styles.emptyLink}>
        Browse events →
      </Link>
    </div>
  )
}

export default function DashboardEventsPage() {
  const [activeTab, setActiveTab] = useState<EventTab>('created')
  const [createdEvents, setCreatedEvents] = useState<DashboardEvent[]>([])
  const [goingEvents,   setGoingEvents]   = useState<DashboardEvent[]>([])
  const [loadingCreated, setLoadingCreated] = useState(true)
  const [loadingGoing,   setLoadingGoing]   = useState(false)
  const [goingLoaded,    setGoingLoaded]    = useState(false)

  // Fetch events created by the current user
  useEffect(() => {
    fetch('/api/events?created_by=me&limit=50')
      .then(r => r.json())
      .then(data => setCreatedEvents(data?.events ?? []))
      .catch(() => setCreatedEvents([]))
      .finally(() => setLoadingCreated(false))
  }, [])

  // Lazy-load RSVP'd events when the "Going" tab is first opened
  const loadGoingEvents = useCallback(() => {
    if (goingLoaded) return
    setLoadingGoing(true)
    fetch('/api/events?rsvp=going&limit=50')
      .then(r => r.json())
      .then(data => {
        setGoingEvents(data?.events ?? [])
        setGoingLoaded(true)
      })
      .catch(() => {
        setGoingEvents([])
        setGoingLoaded(true)
      })
      .finally(() => setLoadingGoing(false))
  }, [goingLoaded])

  function handleTabChange(tab: EventTab) {
    setActiveTab(tab)
    if (tab === 'going') loadGoingEvents()
  }

  const isCreatedLoading = loadingCreated
  const isGoingLoading   = loadingGoing

  return (
    <div className={styles.page}>
      <div className={styles.topBar}>
        <h1 className={styles.h1}>My Events</h1>
        <Link href="/events/create" className={styles.createBtn}>
          + Create an event
        </Link>
      </div>

      <div className={styles.tabs} role="tablist">
        <button
          role="tab"
          aria-selected={activeTab === 'created'}
          className={`${styles.tab}${activeTab === 'created' ? ` ${styles.tabActive}` : ''}`}
          onClick={() => handleTabChange('created')}
        >
          My Events
        </button>
        <button
          role="tab"
          aria-selected={activeTab === 'going'}
          className={`${styles.tab}${activeTab === 'going' ? ` ${styles.tabActive}` : ''}`}
          onClick={() => handleTabChange('going')}
        >
          Going
        </button>
      </div>

      {activeTab === 'created' && (
        <div role="tabpanel">
          {isCreatedLoading ? (
            <LoadingSkeletons />
          ) : createdEvents.length === 0 ? (
            <EmptyCreated />
          ) : (
            <div className={styles.eventList}>
              {createdEvents.map(ev => (
                <EventCard key={ev.id} event={ev} />
              ))}
            </div>
          )}
        </div>
      )}

      {activeTab === 'going' && (
        <div role="tabpanel">
          {isGoingLoading ? (
            <LoadingSkeletons />
          ) : goingEvents.length === 0 ? (
            <EmptyGoing />
          ) : (
            <div className={styles.eventList}>
              {goingEvents.map(ev => (
                <EventCard key={ev.id} event={ev} />
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  )
}
