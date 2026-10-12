'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import styles from './onboarding.module.css'

const SEED_SCHOOLS = [
  { slug: 'ubc',       name: 'University of British Columbia' },
  { slug: 'sfu',       name: 'Simon Fraser University' },
  { slug: 'uoft',      name: 'University of Toronto' },
  { slug: 'mcgill',    name: 'McGill University' },
  { slug: 'uwaterloo', name: 'University of Waterloo' },
  { slug: 'queens',    name: "Queen's University" },
  { slug: 'ualberta',  name: 'University of Alberta' },
  { slug: 'uvic',      name: 'University of Victoria' },
  { slug: 'dal',       name: 'Dalhousie University' },
  { slug: 'bcit',      name: 'BCIT' },
  { slug: 'seneca',    name: 'Seneca College' },
  { slug: 'humber',    name: 'Humber College' },
]

const YEARS = ['1st year', '2nd year', '3rd year', '4th year', '5th year+', 'Graduate']

const ONBOARDING_KEY = 'dk-onboarded'

export default function OnboardingModal() {
  const [visible, setVisible] = useState(false)
  const [step, setStep] = useState(1)
  const [school, setSchool] = useState('')
  const [programme, setProgramme] = useState('')
  const [year, setYear] = useState('')

  useEffect(() => {
    try {
      if (!localStorage.getItem(ONBOARDING_KEY)) {
        setVisible(true)
      }
    } catch {
      // localStorage unavailable (private mode, etc.) — skip modal
    }
  }, [])

  function dismiss() {
    try { localStorage.setItem(ONBOARDING_KEY, 'true') } catch { /* ignore */ }
    setVisible(false)
  }

  function finish() {
    dismiss()
  }

  if (!visible) return null

  return (
    <div className={styles.overlay} role="dialog" aria-modal="true" aria-labelledby="onboarding-title">
      <div className={styles.modal}>
        <button className={styles.closeBtn} onClick={dismiss} aria-label="Close welcome guide">
          ✕
        </button>

        {step === 1 && (
          <>
            <span className={styles.stepCount}>Step 1 of 3</span>
            <div className={styles.step}>
              <h2 className={styles.h2} id="onboarding-title">Welcome to Digital Kampus!</h2>
              <p className={styles.sub}>
                Let us personalize your experience. What school are you at?
              </p>
              <div className={styles.field}>
                <label className={styles.label} htmlFor="school-select">Your school</label>
                <select
                  id="school-select"
                  className={styles.select}
                  value={school}
                  onChange={(e) => setSchool(e.target.value)}
                >
                  <option value="">Select your school…</option>
                  {SEED_SCHOOLS.map((s) => (
                    <option key={s.slug} value={s.slug}>{s.name}</option>
                  ))}
                  <option value="other">Other / not listed</option>
                </select>
              </div>
              <div className={styles.actions}>
                <button
                  className={styles.nextBtn}
                  onClick={() => setStep(2)}
                  disabled={!school}
                >
                  Next →
                </button>
                <button className={styles.skipLink} onClick={dismiss}>Skip for now</button>
              </div>
            </div>
          </>
        )}

        {step === 2 && (
          <>
            <span className={styles.stepCount}>Step 2 of 3</span>
            <div className={styles.step}>
              <h2 className={styles.h2} id="onboarding-title">What are you studying?</h2>
              <p className={styles.sub}>
                We use this to surface relevant clubs, scholarships, and study groups for you.
              </p>
              <div className={styles.field}>
                <label className={styles.label} htmlFor="programme-input">Programme / major</label>
                <input
                  id="programme-input"
                  type="text"
                  className={styles.input}
                  placeholder="e.g. Computer Science, Nursing, Business…"
                  value={programme}
                  onChange={(e) => setProgramme(e.target.value)}
                />
              </div>
              <div className={styles.field}>
                <label className={styles.label} htmlFor="year-select">Year of study</label>
                <select
                  id="year-select"
                  className={styles.select}
                  value={year}
                  onChange={(e) => setYear(e.target.value)}
                >
                  <option value="">Select year…</option>
                  {YEARS.map((y) => (
                    <option key={y} value={y}>{y}</option>
                  ))}
                </select>
              </div>
              <div className={styles.actions}>
                <button className={styles.backBtn} onClick={() => setStep(1)}>← Back</button>
                <button
                  className={styles.nextBtn}
                  onClick={() => setStep(3)}
                >
                  Next →
                </button>
              </div>
            </div>
          </>
        )}

        {step === 3 && (
          <>
            <span className={styles.stepCount}>Step 3 of 3</span>
            <div className={styles.step}>
              <h2 className={styles.h2} id="onboarding-title">Verify your student email</h2>
              <p className={styles.sub}>
                Verifying your student status unlocks scholarship matching, trusted peer connections,
                and exclusive campus deals — all free. It takes less than a minute.
              </p>
              <p className={styles.sub} style={{ marginTop: -8 }}>
                Head to your profile and add your <strong>.edu</strong> or institution email address
                in the Education section.
              </p>
              <div className={styles.actions}>
                <button className={styles.backBtn} onClick={() => setStep(2)}>← Back</button>
                <Link href="/profile#education" className={styles.nextBtn} onClick={finish}>
                  Go to profile →
                </Link>
              </div>
              <div style={{ textAlign: 'center', marginTop: 12 }}>
                <button className={styles.skipLink} onClick={finish}>
                  Get started without verifying
                </button>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  )
}
