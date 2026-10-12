'use client'

import { useState } from 'react'
import Link from 'next/link'
import styles from './seasonal-banner.module.css'

interface SeasonalBannerProps {
  yearOfStudy?: number | null
}

interface BannerConfig {
  icon: string
  title: string
  text: string
  variant?: 'default' | 'grad' | 'summer' | 'urgent'
  ctas?: { label: string; href: string }[]
}

function getGraduationBanner(): BannerConfig {
  return {
    icon: '🎊',
    title: 'Congratulations, Graduate!',
    text: 'You did it! All your hard work has paid off. Share your achievement with friends and family.',
    variant: 'grad',
  }
}

function getBannerConfig(month: number): BannerConfig {
  switch (month) {
    case 8: // September
      return {
        icon: '🎉',
        title: 'Welcome to campus! Frosh Week is here.',
        text: 'Explore everything campus life has to offer. Find your clubs, get verified, and discover scholarships — all in one place.',
        variant: 'default',
      }
    case 9: // October
      return {
        icon: '🍂',
        title: 'Fall semester in full swing.',
        text: 'Scholarship deadlines are coming up fast — make sure you don\'t miss out on free funding.',
        variant: 'default',
        ctas: [{ label: 'Browse scholarships', href: '/dashboard/scholarships' }],
      }
    case 10: // November
      return {
        icon: '📚',
        title: 'Reading week approaches.',
        text: 'Study groups are available to help you power through midterms and assignments.',
        variant: 'default',
        ctas: [{ label: 'Find study groups', href: '/clubs' }],
      }
    case 11: // December
      return {
        icon: '🎓',
        title: 'Finals season. You\'ve got this!',
        text: 'Connect with study groups and use every resource available. Good luck!',
        variant: 'default',
        ctas: [{ label: 'Find study groups', href: '/clubs' }],
      }
    case 0: // January
      return {
        icon: '✨',
        title: 'New semester, fresh start!',
        text: 'Update your courses and set yourself up for a great term.',
        variant: 'default',
        ctas: [{ label: 'Update courses', href: '/dashboard/grades' }],
      }
    case 1: // February
      return {
        icon: '❄️',
        title: 'Winter semester underway.',
        text: 'Scholarship season is open — browse and apply for funding opportunities.',
        variant: 'default',
        ctas: [{ label: 'Browse scholarships', href: '/dashboard/scholarships' }],
      }
    case 2: // March
      return {
        icon: '🌱',
        title: 'Spring scholarship deadlines are approaching!',
        text: 'Many major scholarships close in March and April. Apply now before it\'s too late.',
        variant: 'urgent',
        ctas: [{ label: 'Apply for scholarships now →', href: '/dashboard/scholarships' }],
      }
    case 3: // April
      return {
        icon: '🎓',
        title: 'Final exams coming up.',
        text: 'Book your study space and connect with peers. If you\'re graduating — congratulations!',
        variant: 'default',
        ctas: [{ label: 'Find study groups', href: '/clubs' }],
      }
    case 4: // May
      return {
        icon: '🎊',
        title: 'Congratulations, graduates!',
        text: 'Share your achievement with friends and family. The next chapter starts now.',
        variant: 'grad',
      }
    default: // June–August (5, 6, 7)
      return {
        icon: '☀️',
        title: 'Summer break!',
        text: 'Explore co-op opportunities and get a head start on housing for next year.',
        variant: 'summer',
        ctas: [
          { label: 'Browse housing', href: '/dashboard/housing' },
          { label: 'Find co-ops', href: '/dashboard/scholarships' },
        ],
      }
  }
}

export default function SeasonalBanner({ yearOfStudy }: SeasonalBannerProps) {
  const [copied, setCopied] = useState(false)

  const month = new Date().getMonth() // 0–11

  // Senior students in April or May always get graduation banner
  const isSeniorGrad =
    (yearOfStudy === 4 || yearOfStudy === 5) && (month === 3 || month === 4)

  const isGraduationMonth = month === 4 // May
  const isFroshWeek = month === 8 // September
  const showGradBanner = isSeniorGrad || isGraduationMonth

  const config = showGradBanner ? getGraduationBanner() : getBannerConfig(month)

  const variantClass =
    config.variant === 'grad'
      ? styles.bannerGrad
      : config.variant === 'summer'
      ? styles.bannerSummer
      : config.variant === 'urgent'
      ? styles.bannerUrgent
      : ''

  function handleShare() {
    const text =
      'I just graduated! 🎊 Proud to have reached this milestone. #DigitalKampus #Graduation'
    navigator.clipboard.writeText(text).then(() => {
      setCopied(true)
      setTimeout(() => setCopied(false), 2500)
    })
  }

  return (
    <div className={`${styles.banner} ${variantClass}`} role="region" aria-label="Seasonal update">
      {/* Confetti for graduation */}
      {showGradBanner && (
        <div className={styles.confettiWrap} aria-hidden="true">
          {Array.from({ length: 12 }).map((_, i) => (
            <span key={i} className={styles.confettiPiece} />
          ))}
        </div>
      )}

      <span className={styles.bannerIcon} aria-hidden="true">{config.icon}</span>

      <div className={styles.bannerContent}>
        <p className={styles.bannerTitle}>{config.title}</p>
        <p className={styles.bannerText}>{config.text}</p>

        {/* Graduation share button */}
        {showGradBanner && (
          <button
            className={`${styles.bannerCtaBtn} ${copied ? styles.ctaCopied : ''}`}
            onClick={handleShare}
            type="button"
          >
            {copied ? '✓ Copied to clipboard!' : '🎓 Share your graduation'}
          </button>
        )}

        {/* Regular CTAs */}
        {!showGradBanner && config.ctas && config.ctas.length > 0 && (
          <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
            {config.ctas.map(({ label, href }) => (
              <Link key={href} href={href} className={styles.bannerCta}>
                {label}
              </Link>
            ))}
          </div>
        )}

        {/* Frosh Week quick-action cards */}
        {isFroshWeek && !showGradBanner && (
          <div className={styles.quickActions}>
            <Link href="/clubs" className={styles.quickCard}>
              <span className={styles.quickCardIcon}>🤝</span>
              <span className={styles.quickCardLabel}>Find your clubs</span>
              <span className={styles.quickCardSub}>Meet people with your interests</span>
            </Link>
            <Link href="/profile#education" className={styles.quickCard}>
              <span className={styles.quickCardIcon}>🎓</span>
              <span className={styles.quickCardLabel}>Verify student status</span>
              <span className={styles.quickCardSub}>Unlock full platform access</span>
            </Link>
            <Link href="/dashboard/scholarships" className={styles.quickCard}>
              <span className={styles.quickCardIcon}>💰</span>
              <span className={styles.quickCardLabel}>Browse scholarships</span>
              <span className={styles.quickCardSub}>Free matching, always</span>
            </Link>
          </div>
        )}
      </div>
    </div>
  )
}
