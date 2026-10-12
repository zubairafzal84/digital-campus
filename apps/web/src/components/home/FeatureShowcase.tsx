'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import styles from './FeatureShowcase.module.css'

type Feature = {
  id: string
  label: string
  heading: string
  body: string
  cta: string
  ctaHref: string
  preview: React.ReactNode
}

function ChatPreview() {
  const [step, setStep] = useState(0)
  const messages = [
    { from: 'Jordan', text: 'Anyone want to study for CPSC 310 midterm?', time: '10:02' },
    { from: 'Priya', text: 'I'm in! IKB 4th floor?', time: '10:03' },
    { from: 'You', text: 'Thursday 2pm works for me 👍', time: '10:04' },
    { from: 'Jordan', text: 'Perfect. I'll book a room.', time: '10:05' },
  ]

  useEffect(() => {
    if (step >= messages.length) return
    const t = setTimeout(() => setStep(s => s + 1), 900)
    return () => clearTimeout(t)
  }, [step, messages.length])

  return (
    <div className={styles.chatPreview}>
      <div className={styles.chatHeader}>
        <div className={styles.chatDots}>
          <span /><span /><span />
        </div>
        <span className={styles.chatTitle}>Study Group — CPSC 310</span>
      </div>
      <div className={styles.chatBody}>
        {messages.slice(0, step).map((m, i) => (
          <div key={i} className={`${styles.msg} ${m.from === 'You' ? styles.msgMe : ''}`}>
            {m.from !== 'You' && <span className={styles.msgFrom}>{m.from}</span>}
            <div className={styles.msgBubble}>{m.text}</div>
            <span className={styles.msgTime}>{m.time}</span>
          </div>
        ))}
        {step < messages.length && (
          <div className={styles.typing}>
            <span /><span /><span />
          </div>
        )}
      </div>
    </div>
  )
}

function ScholarshipPreview() {
  const matches = [
    { name: 'Schulich Leader', amount: '$100,000', match: 94, type: 'merit' },
    { name: 'TD Community Leadership', amount: '$70,000', match: 87, type: 'merit' },
    { name: 'Canada Student Grant', amount: '$4,200', match: 100, type: 'government' },
  ]
  const [revealed, setRevealed] = useState(0)

  useEffect(() => {
    if (revealed >= matches.length) return
    const t = setTimeout(() => setRevealed(r => r + 1), 700)
    return () => clearTimeout(t)
  }, [revealed, matches.length])

  return (
    <div className={styles.scholarshipPreview}>
      <div className={styles.spHeader}>
        <span className={styles.spTitle}>Your matches</span>
        <span className={styles.spFree}>Always free</span>
      </div>
      {matches.slice(0, revealed).map((m, i) => (
        <div key={i} className={styles.spCard} style={{ animationDelay: `${i * 0.1}s` }}>
          <div className={styles.spInfo}>
            <span className={styles.spName}>{m.name}</span>
            <span className={`${styles.spType} ${styles[m.type]}`}>{m.type}</span>
          </div>
          <div className={styles.spBottom}>
            <span className={styles.spAmount}>{m.amount}</span>
            <div className={styles.spMatchWrap}>
              <div className={styles.spMatchBar} style={{ width: `${m.match}%` }} />
              <span className={styles.spMatchPct}>{m.match}% match</span>
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}

function ClubsPreview() {
  const clubs = [
    { name: 'Robotics Club', category: 'Technology', members: 120, joined: true },
    { name: 'Photography Society', category: 'Arts', members: 67, joined: false },
    { name: 'Debate Society', category: 'Academic', members: 85, joined: false },
  ]
  const [joinedIdx, setJoinedIdx] = useState<number | null>(null)

  return (
    <div className={styles.clubsPreview}>
      <div className={styles.clubsHeader}>
        <span className={styles.clubsTitle}>Clubs at your school</span>
      </div>
      {clubs.map((c, i) => (
        <div key={i} className={styles.clubRow}>
          <div className={styles.clubIcon}>{c.name.charAt(0)}</div>
          <div className={styles.clubInfo}>
            <span className={styles.clubName}>{c.name}</span>
            <span className={styles.clubMeta}>{c.category} · {c.members} members</span>
          </div>
          <button
            className={`${styles.joinBtn} ${(c.joined || joinedIdx === i) ? styles.joinBtnJoined : ''}`}
            onClick={() => setJoinedIdx(i)}
          >
            {(c.joined || joinedIdx === i) ? 'Joined ✓' : 'Join'}
          </button>
        </div>
      ))}
    </div>
  )
}

function GradesPreview() {
  const courses = [
    { code: 'CPSC 310', grade: 'A', pct: 91 },
    { code: 'MATH 220', grade: 'B+', pct: 85 },
    { code: 'CPSC 320', grade: 'A−', pct: 88 },
  ]

  return (
    <div className={styles.gradesPreview}>
      <div className={styles.gpCard}>
        <span className={styles.gpLabel}>GPA</span>
        <span className={styles.gpValue}>3.82</span>
        <span className={styles.gpOf}>/ 4.33</span>
      </div>
      <div className={styles.gpList}>
        {courses.map(c => (
          <div key={c.code} className={styles.gpRow}>
            <span className={styles.gpCode}>{c.code}</span>
            <div className={styles.gpBarWrap}>
              <div className={styles.gpBar} style={{ width: `${c.pct}%` }} />
            </div>
            <span className={styles.gpGrade}>{c.grade}</span>
          </div>
        ))}
      </div>
    </div>
  )
}

const FEATURES: Feature[] = [
  {
    id: 'chat',
    label: 'Study groups & chat',
    heading: 'Connect with your cohort',
    body: 'Create study groups, coordinate with classmates, and message students you\'ve connected with — all in a safe, contact-verified space.',
    cta: 'Get started free',
    ctaHref: '/signup',
    preview: <ChatPreview />,
  },
  {
    id: 'scholarships',
    label: 'Scholarship matching',
    heading: 'Find money you didn\'t know existed',
    body: 'We match you to scholarships, bursaries, and grants you\'re eligible for — and alert you before deadlines. Matching is always free for students.',
    cta: 'Match scholarships',
    ctaHref: '/scholarships',
    preview: <ScholarshipPreview />,
  },
  {
    id: 'clubs',
    label: 'Clubs & campus life',
    heading: 'Get involved on campus',
    body: 'Discover clubs, join organizations, and stay up to date on events at your school. Club organizers can register their organization in minutes.',
    cta: 'Browse clubs',
    ctaHref: '/clubs',
    preview: <ClubsPreview />,
  },
  {
    id: 'grades',
    label: 'Grades & GPA',
    heading: 'Track your academic progress',
    body: 'See your grades, GPA, and assignment breakdown in one place. Your data is private — never indexed, never shared without your explicit action.',
    cta: 'Create account',
    ctaHref: '/signup',
    preview: <GradesPreview />,
  },
]

export function FeatureShowcase() {
  const [active, setActive] = useState(0)

  useEffect(() => {
    const t = setInterval(() => {
      setActive(a => (a + 1) % FEATURES.length)
    }, 6000)
    return () => clearInterval(t)
  }, [])

  const feature = FEATURES[active]

  return (
    <section className={styles.section}>
      <div className={styles.inner}>
        <header className={styles.header}>
          <h2 className={styles.h2}>Everything for campus life</h2>
          <p className={styles.sub}>One platform. Built for Canadian students.</p>
        </header>

        <div className={styles.tabs}>
          {FEATURES.map((f, i) => (
            <button
              key={f.id}
              className={`${styles.tab} ${active === i ? styles.tabActive : ''}`}
              onClick={() => setActive(i)}
            >
              {f.label}
            </button>
          ))}
        </div>

        <div className={styles.content}>
          <div className={styles.text}>
            <h3 className={styles.featureH}>{feature.heading}</h3>
            <p className={styles.featureBody}>{feature.body}</p>
            <Link href={feature.ctaHref} className={styles.featureCta}>{feature.cta} →</Link>
          </div>
          <div className={styles.preview} key={feature.id}>
            {feature.preview}
          </div>
        </div>

        <div className={styles.progress}>
          {FEATURES.map((_, i) => (
            <button
              key={i}
              className={`${styles.dot} ${active === i ? styles.dotActive : ''}`}
              onClick={() => setActive(i)}
              aria-label={`Feature ${i + 1}`}
            />
          ))}
        </div>
      </div>
    </section>
  )
}
