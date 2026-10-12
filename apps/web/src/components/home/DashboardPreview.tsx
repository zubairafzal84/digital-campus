'use client'

import { useState, useEffect } from 'react'
import styles from './DashboardPreview.module.css'

// Cycles through 4 animated feature previews
const PREVIEWS = [
  {
    id: 'grades',
    label: '📖 Grade Tracker',
    content: (
      <GradesView />
    ),
  },
  {
    id: 'social',
    label: '🤝 Community',
    content: <SocialView />,
  },
  {
    id: 'funding',
    label: '💸 Scholarships',
    content: <FundingView />,
  },
  {
    id: 'chat',
    label: '✉ Inbox',
    content: <ChatView />,
  },
]

export function DashboardPreview() {
  const [active, setActive] = useState(0)

  // Auto-cycle every 3.5s
  useEffect(() => {
    const t = setInterval(() => setActive((i) => (i + 1) % PREVIEWS.length), 3500)
    return () => clearInterval(t)
  }, [])

  return (
    <div className={styles.card}>
      <div className={styles.cardBar} />

      {/* Tab strip */}
      <div className={styles.tabs}>
        {PREVIEWS.map(({ id, label }, i) => (
          <button
            key={id}
            className={`${styles.tab} ${i === active ? styles.tabActive : ''}`}
            onClick={() => setActive(i)}
            aria-selected={i === active}
          >
            {label}
          </button>
        ))}
      </div>

      {/* Animated content panel */}
      <div className={styles.panel} key={active}>
        {PREVIEWS[active].content}
      </div>
    </div>
  )
}

function GradesView() {
  const courses = [
    { code: 'ENGR 201', name: 'Engineering Physics', pct: 74, letter: 'C+', color: '#D97706' },
    { code: 'CHEM 110', name: 'General Chemistry', pct: 81, letter: 'B+', color: '#16A34A' },
    { code: 'MATH 252', name: 'Multivariable Calculus', pct: 68, letter: 'C−', color: '#D97706' },
  ]
  return (
    <div className={styles.gradeList}>
      <div className={styles.panelHead}>Fall 2026 · SFU</div>
      {courses.map((c) => (
        <div key={c.code} className={styles.courseRow}>
          <div className={styles.courseIco}>{c.code.slice(0, 1)}</div>
          <div className={styles.courseInfo}>
            <div className={styles.courseName}>{c.name}</div>
            <div className={styles.courseCode}>{c.code}</div>
            <div className={styles.bar}>
              <div className={styles.barFill} style={{ width: `${c.pct}%`, background: c.color }} />
            </div>
          </div>
          <div className={styles.courseGrade}>
            <span className={styles.gradePct}>{c.pct}%</span>
            <span className={styles.gradeLtr}>{c.letter}</span>
          </div>
        </div>
      ))}
    </div>
  )
}

function SocialView() {
  const clubs = [
    { name: 'SFU Engineering Club', members: 412, new: true },
    { name: 'International Students', members: 893, new: false },
    { name: 'Coding & Dev Society', members: 267, new: true },
  ]
  return (
    <div className={styles.socialList}>
      <div className={styles.panelHead}>Clubs on your campus</div>
      {clubs.map((c) => (
        <div key={c.name} className={styles.clubRow}>
          <div className={styles.clubIco}>{c.name.slice(0, 1)}</div>
          <div className={styles.clubInfo}>
            <div className={styles.clubName}>{c.name}</div>
            <div className={styles.clubMeta}>{c.members.toLocaleString()} members</div>
          </div>
          {c.new && <span className={styles.newBadge}>New</span>}
          <button className={styles.joinBtn}>Join</button>
        </div>
      ))}
    </div>
  )
}

function FundingView() {
  const scholarships = [
    { name: 'Lester B. Pearson International', amount: '$40,000', match: 94, deadline: 'Jan 3' },
    { name: 'BC Excellence Scholarship', amount: '$5,000', match: 88, deadline: 'Feb 1' },
    { name: 'SFU Entrance Award', amount: '$3,500', match: 82, deadline: 'Mar 15' },
  ]
  return (
    <div className={styles.fundList}>
      <div className={styles.panelHead}>Matched for you · always free</div>
      {scholarships.map((s) => (
        <div key={s.name} className={styles.fundRow}>
          <div className={styles.fundMatch}>{s.match}%</div>
          <div className={styles.fundInfo}>
            <div className={styles.fundName}>{s.name}</div>
            <div className={styles.fundMeta}>{s.amount} · Due {s.deadline}</div>
          </div>
          <button className={styles.applyBtn}>Apply</button>
        </div>
      ))}
    </div>
  )
}

function ChatView() {
  const messages = [
    { from: 'Mei L.', text: 'Are you joining the study group tonight?', time: '2m', read: false },
    { from: 'Engineering Club', text: 'Event reminder: Career night Thu 6 PM', time: '1h', read: true },
    { from: 'Priya S.', text: 'Shared ENGR 201 notes with you', time: '3h', read: true },
  ]
  return (
    <div className={styles.chatList}>
      <div className={styles.panelHead}>Inbox</div>
      {messages.map((m) => (
        <div key={m.from} className={`${styles.chatRow} ${!m.read ? styles.chatUnread : ''}`}>
          <div className={styles.chatAv}>{m.from.slice(0, 1)}</div>
          <div className={styles.chatBody}>
            <div className={styles.chatFrom}>{m.from}</div>
            <div className={styles.chatText}>{m.text}</div>
          </div>
          <div className={styles.chatTime}>{m.time}</div>
        </div>
      ))}
    </div>
  )
}
