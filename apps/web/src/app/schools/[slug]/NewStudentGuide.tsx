'use client'

import { useState } from 'react'
import Link from 'next/link'
import styles from './new-student-guide.module.css'

interface GuideCard {
  id: string
  icon: string
  title: string
  body: React.ReactNode
}

interface NewStudentGuideProps {
  schoolSlug: string
  schoolName: string
  schoolShortName: string
}

export default function NewStudentGuide({
  schoolSlug,
  schoolName,
  schoolShortName,
}: NewStudentGuideProps) {
  const [open, setOpen] = useState(false)
  const [expandedCard, setExpandedCard] = useState<string | null>(null)

  const cards: GuideCard[] = [
    {
      id: 'frosh',
      icon: '🎉',
      title: 'Frosh Week',
      body: (
        <>
          The first week of September is orientation (frosh week) at most Canadian schools. Expect
          campus tours, social mixers, faculty introductions, and your very first taste of student
          life at {schoolShortName}. Participation is free and optional — but highly recommended
          for meeting your future study group before classes begin.
        </>
      ),
    },
    {
      id: 'housing',
      icon: '🏠',
      title: 'Housing',
      body: (
        <>
          Most first-year students live in residence. Spots fill fast — apply as soon as you
          receive your acceptance letter. Off-campus rentals near {schoolName} in{' '}
          {schoolShortName} are also available.{' '}
          <Link href={`/housing?near=${schoolSlug}`} className={styles.cardLink}>
            Browse housing near {schoolShortName} →
          </Link>
        </>
      ),
    },
    {
      id: 'clubs',
      icon: '🎯',
      title: 'Clubs & societies',
      body: (
        <>
          The clubs fair is held in the first two weeks of term. Joining a club is the fastest way
          to make friends and build your resume outside the classroom. From academic societies to
          cultural groups, sports teams, and student government — there is something for everyone.{' '}
          <Link href={`/clubs?school=${schoolSlug}`} className={styles.cardLink}>
            Browse {schoolShortName} clubs →
          </Link>
        </>
      ),
    },
    {
      id: 'scholarships',
      icon: '💰',
      title: 'Scholarships',
      body: (
        <>
          Check {schoolName}&apos;s entrance scholarships — many are awarded automatically with your
          admission offer and require no separate application. Renewable bursaries and
          programme-specific awards open throughout the year. Scholarship matching on Digital
          Kampus is always free for students.{' '}
          <Link href="/scholarships" className={styles.cardLink}>
            Find scholarships →
          </Link>
        </>
      ),
    },
    {
      id: 'student-card',
      icon: '🪪',
      title: 'Your student card',
      body: (
        <>
          Your {schoolShortName} student card is your key to campus. It unlocks transit discounts,
          library borrowing privileges, gym access, and exclusive student deals at local businesses.
          Pick it up at the Registrar&apos;s Office (or a designated ID desk) during the first week
          of classes — bring a valid government-issued photo ID.
        </>
      ),
    },
  ]

  function toggleCard(id: string) {
    setExpandedCard((prev) => (prev === id ? null : id))
  }

  return (
    <div className={styles.guideWrap}>
      <button
        type="button"
        className={styles.guideToggle}
        aria-expanded={open}
        onClick={() => setOpen((v) => !v)}
      >
        <span className={styles.guideIcon}>🎓</span>
        <span className={styles.guideTitle}>New student? Here is what to expect</span>
        <span className={styles.chevron} aria-hidden="true">
          {open ? '▲' : '▼'}
        </span>
      </button>

      {open && (
        <div className={styles.guideBody}>
          <p className={styles.guideIntro}>
            Starting at {schoolName} is exciting — and a little overwhelming. Here are the five
            things every new student should know in their first weeks.
          </p>
          <div className={styles.cards}>
            {cards.map((card) => (
              <div key={card.id} className={styles.card}>
                <button
                  type="button"
                  className={styles.cardHeader}
                  aria-expanded={expandedCard === card.id}
                  onClick={() => toggleCard(card.id)}
                >
                  <span className={styles.cardIcon} aria-hidden="true">
                    {card.icon}
                  </span>
                  <span className={styles.cardTitle}>{card.title}</span>
                  <span className={styles.cardChevron} aria-hidden="true">
                    {expandedCard === card.id ? '−' : '+'}
                  </span>
                </button>
                {expandedCard === card.id && (
                  <div className={styles.cardBody}>{card.body}</div>
                )}
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}
