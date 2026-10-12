'use client'

import { useEffect, useRef, useState, useCallback } from 'react'
import Link from 'next/link'
import { useUser } from '@clerk/nextjs'
import styles from './chat.module.css'

interface Conversation {
  id: string
  participant_a: string
  participant_b: string
  last_message_at: string | null
}

interface Message {
  id: string
  content: string
  sender_id: string
  created_at: string
}

function relativeTime(iso: string | null): string {
  if (!iso) return ''
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

function avatarInitials(userId: string): string {
  // Show first 2 chars of the id as a stand-in avatar
  return userId.slice(0, 2).toUpperCase()
}

function truncateId(userId: string): string {
  if (userId.length <= 12) return userId
  return `${userId.slice(0, 6)}…${userId.slice(-4)}`
}

export default function ChatClient() {
  const { user } = useUser()
  const currentUserId = user?.id ?? null

  const [conversations, setConversations] = useState<Conversation[]>([])
  const [activeId, setActiveId] = useState<string | null>(null)
  const [messages, setMessages] = useState<Message[]>([])
  const [draft, setDraft] = useState('')
  const [loadingConvos, setLoadingConvos] = useState(true)
  const [loadingMessages, setLoadingMessages] = useState(false)
  const [sending, setSending] = useState(false)

  const messagesEndRef = useRef<HTMLDivElement>(null)
  const pollRef = useRef<ReturnType<typeof setInterval> | null>(null)

  // Fetch conversation list on mount
  useEffect(() => {
    let cancelled = false
    setLoadingConvos(true)
    fetch('/api/conversations')
      .then((r) => r.ok ? r.json() : Promise.reject(r.status))
      .then((data: Conversation[]) => {
        if (!cancelled) setConversations(data)
      })
      .catch(() => {
        if (!cancelled) setConversations([])
      })
      .finally(() => {
        if (!cancelled) setLoadingConvos(false)
      })
    return () => { cancelled = true }
  }, [])

  // Fetch messages for active conversation
  const fetchMessages = useCallback(async (id: string) => {
    try {
      const r = await fetch(`/api/conversations/${id}/messages`)
      if (!r.ok) return
      const data: Message[] = await r.json()
      setMessages(data)
    } catch {
      // silently ignore poll errors
    }
  }, [])

  useEffect(() => {
    if (!activeId) {
      setMessages([])
      return
    }

    setLoadingMessages(true)
    fetch(`/api/conversations/${activeId}/messages`)
      .then((r) => r.ok ? r.json() : Promise.reject(r.status))
      .then((data: Message[]) => {
        setMessages(data)
      })
      .catch(() => setMessages([]))
      .finally(() => setLoadingMessages(false))

    // Start 5-second poll
    if (pollRef.current) clearInterval(pollRef.current)
    pollRef.current = setInterval(() => {
      fetchMessages(activeId)
    }, 5_000)

    return () => {
      if (pollRef.current) {
        clearInterval(pollRef.current)
        pollRef.current = null
      }
    }
  }, [activeId, fetchMessages])

  // Scroll to bottom when messages change
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages])

  async function sendMessage() {
    if (!draft.trim() || !activeId || sending) return
    const text = draft.trim()
    setDraft('')
    setSending(true)
    try {
      const r = await fetch(`/api/conversations/${activeId}/messages`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ content: text }),
      })
      if (r.ok) {
        // Refresh messages immediately after send
        await fetchMessages(activeId)
      }
    } catch {
      // restore draft on failure
      setDraft(text)
    } finally {
      setSending(false)
    }
  }

  function handleKeyDown(e: React.KeyboardEvent<HTMLInputElement>) {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      sendMessage()
    }
  }

  function getOtherUserId(convo: Conversation): string {
    if (!currentUserId) return convo.participant_b
    return convo.participant_a === currentUserId
      ? convo.participant_b
      : convo.participant_a
  }

  const activeConvo = conversations.find((c) => c.id === activeId) ?? null
  const otherUserId = activeConvo ? getOtherUserId(activeConvo) : null

  return (
    <div className={styles.layout}>
      {/* Thread list */}
      <aside className={styles.threads}>
        <div className={styles.threadsHeader}>
          <h1 className={styles.h1}>Messages</h1>
        </div>

        {loadingConvos ? (
          <div className={styles.emptyThreads}>
            <p className={styles.emptyThreadsText}>Loading…</p>
          </div>
        ) : conversations.length === 0 ? (
          <div className={styles.emptyThreads}>
            <p className={styles.emptyThreadsText}>No conversations yet</p>
          </div>
        ) : (
          <div className={styles.threadList}>
            {conversations.map((convo) => {
              const other = getOtherUserId(convo)
              const isActive = convo.id === activeId
              return (
                <button
                  key={convo.id}
                  className={`${styles.thread}${isActive ? ` ${styles.threadActive}` : ''}`}
                  onClick={() => setActiveId(convo.id)}
                  type="button"
                >
                  <div className={styles.threadAvatar}>{avatarInitials(other)}</div>
                  <div className={styles.threadInfo}>
                    <div className={styles.threadTop}>
                      <span className={styles.threadName}>{truncateId(other)}</span>
                      <span className={styles.threadTime}>{relativeTime(convo.last_message_at)}</span>
                    </div>
                    <span className={styles.threadMsg}>{other}</span>
                  </div>
                </button>
              )
            })}
          </div>
        )}
      </aside>

      {/* Conversation panel */}
      <main className={styles.convo}>
        {!activeId ? (
          <div className={styles.emptyConvo}>
            <span className={styles.emptyIcon}>💬</span>
            <h2 className={styles.emptyH}>Your messages will appear here</h2>
            {conversations.length === 0 ? (
              <>
                <p className={styles.emptyP}>
                  To message another student, send them a contact request first. Once they accept, you can message each other directly.
                </p>
                <p className={styles.emptyP}>
                  Contact requests must be accepted before any 1:1 messaging begins.
                </p>
                <Link href="/schools" className={styles.findBtn}>
                  Start a conversation — find students at your school →
                </Link>
              </>
            ) : (
              <p className={styles.emptyP}>Select a conversation from the left to get started.</p>
            )}
          </div>
        ) : (
          <>
            {/* Header */}
            <div className={styles.convoHeader}>
              <div className={styles.convoAvatar}>
                {otherUserId ? avatarInitials(otherUserId) : '?'}
              </div>
              <div>
                <div className={styles.convoName}>
                  {otherUserId ? truncateId(otherUserId) : '—'}
                </div>
                <div className={styles.convoSchool}>Student</div>
              </div>
            </div>

            {/* Messages */}
            <div className={styles.messages}>
              {loadingMessages ? (
                <p className={styles.loadingMsg}>Loading messages…</p>
              ) : messages.length === 0 ? (
                <p className={styles.loadingMsg}>No messages yet. Say hello!</p>
              ) : (
                messages.map((msg) => {
                  const isMe = currentUserId !== null && msg.sender_id === currentUserId
                  return (
                    <div
                      key={msg.id}
                      className={`${styles.bubble} ${isMe ? styles.bubbleMe : styles.bubbleThem}`}
                    >
                      <div className={styles.bubbleText}>{msg.content}</div>
                      <span className={styles.bubbleTime}>{relativeTime(msg.created_at)}</span>
                    </div>
                  )
                })
              )}
              <div ref={messagesEndRef} />
            </div>

            {/* Compose */}
            <div className={styles.compose}>
              <input
                className={styles.composeInput}
                type="text"
                placeholder="Type a message…"
                value={draft}
                onChange={(e) => setDraft(e.target.value)}
                onKeyDown={handleKeyDown}
                disabled={sending}
                aria-label="Message input"
              />
              <button
                className={styles.sendBtn}
                type="button"
                onClick={sendMessage}
                disabled={!draft.trim() || sending}
                aria-label="Send message"
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                  <line x1="22" y1="2" x2="11" y2="13" />
                  <polygon points="22 2 15 22 11 13 2 9 22 2" />
                </svg>
              </button>
            </div>
          </>
        )}
      </main>
    </div>
  )
}
