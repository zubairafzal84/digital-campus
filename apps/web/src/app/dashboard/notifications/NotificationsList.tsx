'use client'

import { useEffect, useState, useCallback } from 'react'
import styles from './notifications.module.css'

interface Notification {
  id: string
  type: string
  title: string
  body: string
  actionUrl: string | null
  isRead: boolean
  createdAt: string
}

function relativeTime(iso: string): string {
  const diff = Date.now() - new Date(iso).getTime()
  const mins = Math.floor(diff / 60_000)
  if (mins < 1) return 'just now'
  if (mins < 60) return `${mins}m ago`
  const hrs = Math.floor(mins / 60)
  if (hrs < 24) return `${hrs}h ago`
  const days = Math.floor(hrs / 24)
  if (days < 7) return `${days}d ago`
  return new Date(iso).toLocaleDateString('en-CA', { month: 'short', day: 'numeric' })
}

const TYPE_ICONS: Record<string, string> = {
  scholarship: '🎓',
  contact_request: '👤',
  contact: '👤',
  club: '🤝',
  grades: '📊',
  system: '✅',
  message: '💬',
}

function notifIcon(type: string): string {
  return TYPE_ICONS[type] ?? '🔔'
}

function iconBgClass(type: string): string {
  const map: Record<string, string> = {
    scholarship: styles.bgScholarship,
    contact_request: styles.bgContact,
    contact: styles.bgContact,
    club: styles.bgClub,
    grades: styles.bgGrades,
    system: styles.bgSystem,
    message: styles.bgMessage,
  }
  return map[type] ?? ''
}

export default function NotificationsList() {
  const [notifications, setNotifications] = useState<Notification[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [actioning, setActioning] = useState<Set<string>>(new Set())

  const fetchNotifications = useCallback(async () => {
    try {
      const res = await fetch('/api/notifications')
      if (!res.ok) throw new Error('Failed to load notifications')
      const data: Notification[] = await res.json()
      setNotifications(data)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Unknown error')
    } finally {
      setLoading(false)
    }
  }, [])

  useEffect(() => {
    fetchNotifications()
  }, [fetchNotifications])

  const markRead = useCallback(async (id: string) => {
    setActioning((prev) => new Set(prev).add(id))
    try {
      await fetch(`/api/notifications/${id}`, { method: 'PATCH' })
      setNotifications((prev) =>
        prev.map((n) => (n.id === id ? { ...n, isRead: true } : n))
      )
    } finally {
      setActioning((prev) => {
        const next = new Set(prev)
        next.delete(id)
        return next
      })
    }
  }, [])

  const markAllRead = useCallback(async () => {
    try {
      await fetch('/api/notifications', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ all: true }),
      })
      setNotifications((prev) => prev.map((n) => ({ ...n, isRead: true })))
    } catch {
      // silently fail — UI stays consistent with optimistic reads above
    }
  }, [])

  const handleContactAction = useCallback(
    async (contactId: string, action: 'accept' | 'decline', notifId: string) => {
      setActioning((prev) => new Set(prev).add(notifId))
      try {
        await fetch(`/api/contacts/${contactId}`, {
          method: 'PATCH',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ action }),
        })
        // Mark the notification as read after acting
        await fetch(`/api/notifications/${notifId}`, { method: 'PATCH' })
        setNotifications((prev) =>
          prev.map((n) => (n.id === notifId ? { ...n, isRead: true } : n))
        )
      } finally {
        setActioning((prev) => {
          const next = new Set(prev)
          next.delete(notifId)
          return next
        })
      }
    },
    []
  )

  const unreadCount = notifications.filter((n) => !n.isRead).length

  if (loading) {
    return <p className={styles.emptyNotifs}>Loading notifications…</p>
  }

  if (error) {
    return <p className={styles.emptyNotifs}>Could not load notifications: {error}</p>
  }

  return (
    <div>
      {unreadCount > 0 && (
        <div className={styles.topBar}>
          <span className={styles.unreadCount}>{unreadCount} unread</span>
          <button className={styles.markAllBtn} onClick={markAllRead}>
            Mark all as read
          </button>
        </div>
      )}

      {notifications.length === 0 ? (
        <p className={styles.emptyNotifs}>You have no notifications.</p>
      ) : (
        <div className={styles.list}>
          {notifications.map((n) => (
            <div
              key={n.id}
              className={`${styles.notifItem} ${!n.isRead ? styles.itemUnread : ''}`}
            >
              <div className={`${styles.notifIcon} ${iconBgClass(n.type)}`}>
                <span aria-hidden="true">{notifIcon(n.type)}</span>
              </div>

              <div className={styles.notifContent}>
                <p className={styles.notifTitle}>{n.title}</p>
                <p className={styles.notifBody}>{n.body}</p>
                <p className={styles.notifTime}>{relativeTime(n.createdAt)}</p>

                {n.type === 'contact_request' && n.actionUrl && (
                  <div className={styles.actionBtns}>
                    <button
                      className={styles.acceptBtn}
                      disabled={actioning.has(n.id)}
                      onClick={() => handleContactAction(n.actionUrl!, 'accept', n.id)}
                    >
                      Accept
                    </button>
                    <button
                      className={styles.declineBtn}
                      disabled={actioning.has(n.id)}
                      onClick={() => handleContactAction(n.actionUrl!, 'decline', n.id)}
                    >
                      Decline
                    </button>
                  </div>
                )}
              </div>

              {!n.isRead && (
                <div className={styles.notifActions}>
                  <span className={styles.unreadDot} aria-label="Unread" />
                  <button
                    className={styles.markReadBtn}
                    disabled={actioning.has(n.id)}
                    onClick={() => markRead(n.id)}
                  >
                    Mark as read
                  </button>
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
