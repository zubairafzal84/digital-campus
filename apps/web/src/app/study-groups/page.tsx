'use client'

import { useState } from 'react'
import Link from 'next/link'
import styles from './study-groups.module.css'

const POPULAR_ROOMS = [
  { name: 'UBC CPSC 110 Study Hall',        subject: 'Computer Science • UBC',         roomId: 'ubc-cpsc-110-study-hall' },
  { name: 'McGill BIOL 201 Review',          subject: 'Biology • McGill University',    roomId: 'mcgill-biol-201-review' },
  { name: 'Waterloo MATH 135 Help',          subject: 'Mathematics • U of Waterloo',    roomId: 'waterloo-math-135-help' },
  { name: 'U of T ECO 101 Midterm Prep',     subject: 'Economics • University of Toronto', roomId: 'uoft-eco-101-midterm-prep' },
  { name: 'UAlberta CHEM 101 Review',        subject: 'Chemistry • U of Alberta',       roomId: 'ualberta-chem-101-review' },
  { name: 'Western PSYCH 100 Exam Prep',     subject: 'Psychology • Western University', roomId: 'western-psych-100-exam-prep' },
]

function jitsiUrl(roomId: string) {
  return `https://meet.jit.si/dk-${roomId}`
}

export default function StudyGroupsPage() {
  const [roomName, setRoomName] = useState('')
  const [subject, setSubject] = useState('')
  const [maxStudents, setMaxStudents] = useState('6')
  const [generatedId, setGeneratedId] = useState<string | null>(null)
  const [copied, setCopied] = useState(false)

  function handleCreate(e: React.FormEvent) {
    e.preventDefault()
    if (!roomName.trim()) return
    const slug = roomName.toLowerCase().replace(/[^a-z0-9]/g, '-').replace(/-+/g, '-').replace(/^-|-$/g, '')
    const id = `${slug}-${Date.now().toString(36)}`
    setGeneratedId(id)
    setCopied(false)
  }

  function handleCopy() {
    if (!generatedId) return
    navigator.clipboard.writeText(jitsiUrl(generatedId)).then(() => {
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    })
  }

  return (
    <div className={styles.page}>
      {/* Header */}
      <header className={styles.header}>
        <div className={styles.inner}>
          <nav style={{ fontSize: 13, color: 'rgba(255,255,255,0.5)', marginBottom: 20, display: 'flex', gap: 6 }}>
            <Link href="/" style={{ color: 'rgba(255,255,255,0.6)', textDecoration: 'none' }}>Home</Link>
            <span>/</span>
            <span>Study Groups</span>
          </nav>
          <h1 className={styles.h1}>
            Study <span className={styles.hi}>Groups</span>
          </h1>
          <p className={styles.sub}>
            Video study rooms for Canadian students. Free, no account needed — just share the link.
          </p>
        </div>
      </header>

      {/* Main content */}
      <div className={styles.content}>
        {/* Create card */}
        <section className={styles.createCard}>
          <h2>Create a study room</h2>
          <form className={styles.form} onSubmit={handleCreate}>
            <div className={styles.field}>
              <label htmlFor="roomName" className={styles.label}>Room name <span aria-hidden>*</span></label>
              <input
                id="roomName"
                type="text"
                className={styles.input}
                placeholder="e.g. CPSC 310 Midterm Cram"
                value={roomName}
                onChange={e => setRoomName(e.target.value)}
                required
                maxLength={80}
              />
            </div>
            <div className={styles.field}>
              <label htmlFor="subject" className={styles.label}>Subject / course</label>
              <input
                id="subject"
                type="text"
                className={styles.input}
                placeholder="e.g. CPSC 310 Midterm"
                value={subject}
                onChange={e => setSubject(e.target.value)}
                maxLength={80}
              />
            </div>
            <div className={styles.field}>
              <label htmlFor="maxStudents" className={styles.label}>Max students</label>
              <select
                id="maxStudents"
                className={styles.select}
                value={maxStudents}
                onChange={e => setMaxStudents(e.target.value)}
              >
                <option value="2">2 students</option>
                <option value="4">4 students</option>
                <option value="6">6 students</option>
                <option value="10">10 students</option>
              </select>
            </div>
            <button type="submit" className={styles.createBtn}>Create Room</button>
          </form>

          {generatedId && (
            <div className={styles.roomResult} role="region" aria-label="Your study room">
              <p>Your room is ready</p>
              <div className={styles.roomUrl}>{jitsiUrl(generatedId)}</div>
              <div className={styles.roomActions}>
                <button
                  type="button"
                  className={`${styles.copyBtn}${copied ? ` ${styles.copied}` : ''}`}
                  onClick={handleCopy}
                  aria-label="Copy room link to clipboard"
                >
                  {copied ? 'Copied!' : 'Copy room link'}
                </button>
                <a
                  href={jitsiUrl(generatedId)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={styles.joinBtn}
                >
                  Join room →
                </a>
              </div>
            </div>
          )}
        </section>

        {/* Popular rooms */}
        <section className={styles.popularSection}>
          <h2 className={styles.popularH}>Popular study rooms this week</h2>
          <p className={styles.popularSub}>Click join to hop into a live session instantly.</p>
          <div className={styles.roomGrid}>
            {POPULAR_ROOMS.map(room => (
              <div key={room.roomId} className={styles.roomCard}>
                <div className={styles.roomInfo}>
                  <div className={styles.roomName}>{room.name}</div>
                  <div className={styles.roomSubject}>{room.subject}</div>
                </div>
                <span className={styles.liveBadge}>Open</span>
                <a
                  href={jitsiUrl(room.roomId)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={styles.joinRoomBtn}
                >
                  Join
                </a>
              </div>
            ))}
          </div>
        </section>
      </div>

      {/* Info strip */}
      <div className={styles.infoStrip}>
        <strong>Powered by Jitsi Meet</strong> — fully open-source, end-to-end encrypted video. No sign-up, no download required.
      </div>
    </div>
  )
}
