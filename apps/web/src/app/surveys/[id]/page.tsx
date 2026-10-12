'use client'

import { useEffect, useState, useCallback } from 'react'
import { useParams, useRouter } from 'next/navigation'
import Link from 'next/link'
import styles from '../survey-take.module.css'

/* ── Types ───────────────────────────────────────────────────────── */

type QuestionType =
  | 'multiple_choice'
  | 'checkbox'
  | 'rating'
  | 'nps'
  | 'short_text'
  | 'long_text'
  | 'yes_no'
  | 'scale'

interface Question {
  id: string
  type: QuestionType
  text: string
  required: boolean
  options?: string[]          // multiple_choice, checkbox
  scaleMin?: number           // scale
  scaleMax?: number           // scale
  scaleMinLabel?: string
  scaleMaxLabel?: string
}

interface Survey {
  id: string
  title: string
  description: string
  org: string
  reward: string | null
  durationMin: number
  questions: Question[]
}

type AnswerValue = string | string[] | number | null

/* ── Fallback data (used when API is not yet live) ──────────────── */

const FALLBACK_SURVEY: Survey = {
  id: 'demo',
  title: 'Student Campus Experience Survey',
  description:
    'Help us understand your on-campus experience. Your responses are anonymous and will be used to improve student services.',
  org: 'Digital Kampus Research',
  reward: null,
  durationMin: 6,
  questions: [
    {
      id: 'q1',
      type: 'multiple_choice',
      text: 'How would you describe your overall campus experience so far?',
      required: true,
      options: ['Excellent', 'Good', 'Neutral', 'Poor', 'Very poor'],
    },
    {
      id: 'q2',
      type: 'checkbox',
      text: 'Which campus facilities do you use most often? (Select all that apply)',
      required: false,
      options: ['Library', 'Gym / fitness centre', 'Student centre', 'Cafeteria', 'Study lounges', 'Labs'],
    },
    {
      id: 'q3',
      type: 'rating',
      text: 'How would you rate the quality of your academic support services?',
      required: true,
    },
    {
      id: 'q4',
      type: 'nps',
      text: 'How likely are you to recommend your school to a friend or family member?',
      required: true,
    },
    {
      id: 'q5',
      type: 'yes_no',
      text: 'Do you feel your school offers enough mental health support resources?',
      required: true,
    },
    {
      id: 'q6',
      type: 'long_text',
      text: 'Is there anything your school could do to improve your day-to-day student experience?',
      required: false,
    },
  ],
}

/* ── Question renderers ──────────────────────────────────────────── */

function MultipleChoice({
  question,
  value,
  onChange,
}: {
  question: Question
  value: AnswerValue
  onChange: (v: string) => void
}) {
  return (
    <div className={styles.optionCards} role="radiogroup" aria-label={question.text}>
      {(question.options ?? []).map((opt) => {
        const selected = value === opt
        return (
          <button
            key={opt}
            type="button"
            className={`${styles.optionCard} ${selected ? styles.optionCardSelected : ''}`}
            onClick={() => onChange(opt)}
            aria-pressed={selected}
          >
            <span className={styles.optionIndicator} aria-hidden="true" />
            <span className={styles.optionText}>{opt}</span>
          </button>
        )
      })}
    </div>
  )
}

function CheckboxCards({
  question,
  value,
  onChange,
}: {
  question: Question
  value: AnswerValue
  onChange: (v: string[]) => void
}) {
  const selected = Array.isArray(value) ? value : []

  function toggle(opt: string) {
    if (selected.includes(opt)) {
      onChange(selected.filter((v) => v !== opt))
    } else {
      onChange([...selected, opt])
    }
  }

  return (
    <div className={styles.optionCards}>
      {(question.options ?? []).map((opt) => {
        const isSelected = selected.includes(opt)
        return (
          <button
            key={opt}
            type="button"
            className={`${styles.optionCard} ${isSelected ? styles.optionCardSelected : ''}`}
            onClick={() => toggle(opt)}
            aria-pressed={isSelected}
          >
            <span className={styles.optionIndicatorCheck} aria-hidden="true" />
            <span className={styles.optionText}>{opt}</span>
          </button>
        )
      })}
    </div>
  )
}

function StarRating({
  value,
  onChange,
}: {
  value: AnswerValue
  onChange: (v: number) => void
}) {
  const [hovered, setHovered] = useState<number | null>(null)
  const rating = typeof value === 'number' ? value : 0
  const display = hovered ?? rating

  return (
    <div className={styles.starRow} role="radiogroup" aria-label="Star rating">
      {[1, 2, 3, 4, 5].map((n) => (
        <button
          key={n}
          type="button"
          className={`${styles.starBtn} ${n <= display ? styles.starBtnFilled : ''}`}
          aria-label={`${n} star${n !== 1 ? 's' : ''}`}
          aria-pressed={n === rating}
          onClick={() => onChange(n)}
          onMouseEnter={() => setHovered(n)}
          onMouseLeave={() => setHovered(null)}
        >
          ★
        </button>
      ))}
    </div>
  )
}

function NpsScale({
  value,
  onChange,
}: {
  value: AnswerValue
  onChange: (v: number) => void
}) {
  const selected = typeof value === 'number' ? value : null
  return (
    <div>
      <div className={styles.npsRow} role="radiogroup" aria-label="NPS scale 0 to 10">
        {[0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((n) => (
          <button
            key={n}
            type="button"
            className={`${styles.npsBtn} ${selected === n ? styles.npsBtnSelected : ''}`}
            aria-label={`Score ${n}`}
            aria-pressed={selected === n}
            onClick={() => onChange(n)}
          >
            {n}
          </button>
        ))}
      </div>
      <div className={styles.npsLabels}>
        <span className={styles.npsLabel}>Not likely</span>
        <span className={styles.npsLabel}>Extremely likely</span>
      </div>
    </div>
  )
}

function YesNo({
  value,
  onChange,
}: {
  value: AnswerValue
  onChange: (v: string) => void
}) {
  return (
    <div className={styles.yesNoRow}>
      <button
        type="button"
        className={`${styles.yesNoBtn} ${styles.yesNoBtnYes} ${value === 'yes' ? styles.yesNoBtnSelected : ''}`}
        aria-pressed={value === 'yes'}
        onClick={() => onChange('yes')}
      >
        Yes
      </button>
      <button
        type="button"
        className={`${styles.yesNoBtn} ${styles.yesNoBtnNo} ${value === 'no' ? styles.yesNoBtnSelected : ''}`}
        aria-pressed={value === 'no'}
        onClick={() => onChange('no')}
      >
        No
      </button>
    </div>
  )
}

function Scale({
  question,
  value,
  onChange,
}: {
  question: Question
  value: AnswerValue
  onChange: (v: number) => void
}) {
  const min = question.scaleMin ?? 1
  const max = question.scaleMax ?? 10
  const selected = typeof value === 'number' ? value : null
  const steps = Array.from({ length: max - min + 1 }, (_, i) => min + i)

  return (
    <div>
      <div className={styles.scaleRow} role="radiogroup" aria-label={`Scale ${min} to ${max}`}>
        {steps.map((n) => (
          <button
            key={n}
            type="button"
            className={`${styles.scaleBtn} ${selected === n ? styles.scaleBtnSelected : ''}`}
            aria-label={`${n}`}
            aria-pressed={selected === n}
            onClick={() => onChange(n)}
          >
            {n}
          </button>
        ))}
      </div>
      {(question.scaleMinLabel || question.scaleMaxLabel) && (
        <div className={styles.scaleLabels}>
          <span className={styles.scaleLabel}>{question.scaleMinLabel ?? ''}</span>
          <span className={styles.scaleLabel}>{question.scaleMaxLabel ?? ''}</span>
        </div>
      )}
    </div>
  )
}

function QuestionRenderer({
  question,
  value,
  onChange,
  error,
}: {
  question: Question
  value: AnswerValue
  onChange: (v: AnswerValue) => void
  error: boolean
}) {
  return (
    <div className={`${styles.questionBlock} ${error ? styles.questionError : ''}`}>
      <p className={styles.questionLabel}>
        {question.text}
        {question.required && <span className={styles.required} aria-hidden="true"> *</span>}
      </p>

      {question.type === 'multiple_choice' && (
        <MultipleChoice
          question={question}
          value={value}
          onChange={(v) => onChange(v)}
        />
      )}

      {question.type === 'checkbox' && (
        <CheckboxCards
          question={question}
          value={value}
          onChange={(v) => onChange(v)}
        />
      )}

      {question.type === 'rating' && (
        <StarRating value={value} onChange={(v) => onChange(v)} />
      )}

      {question.type === 'nps' && (
        <NpsScale value={value} onChange={(v) => onChange(v)} />
      )}

      {question.type === 'short_text' && (
        <input
          type="text"
          className={styles.textInput}
          placeholder="Your answer…"
          value={typeof value === 'string' ? value : ''}
          onChange={(e) => onChange(e.target.value)}
          aria-label={question.text}
        />
      )}

      {question.type === 'long_text' && (
        <textarea
          className={styles.textareaInput}
          placeholder="Your answer…"
          value={typeof value === 'string' ? value : ''}
          onChange={(e) => onChange(e.target.value)}
          aria-label={question.text}
        />
      )}

      {question.type === 'yes_no' && (
        <YesNo value={value} onChange={(v) => onChange(v)} />
      )}

      {question.type === 'scale' && (
        <Scale question={question} value={value} onChange={(v) => onChange(v)} />
      )}

      {error && (
        <p className={styles.fieldError} role="alert">
          ⚠ This question is required.
        </p>
      )}
    </div>
  )
}

/* ── Main page ─────────────────────────────────────────────────────── */

export default function TakeSurveyPage() {
  const params  = useParams<{ id: string }>()
  const router  = useRouter()

  const [survey,   setSurvey]   = useState<Survey | null>(null)
  const [loading,  setLoading]  = useState(true)
  const [answers,  setAnswers]  = useState<Record<string, AnswerValue>>({})
  const [errors,   setErrors]   = useState<Record<string, boolean>>({})
  const [page,     setPage]     = useState(0)   // paginated mode: current page index
  const [submitting, setSubmitting] = useState(false)
  const [submitErr,  setSubmitErr]  = useState<string | null>(null)

  useEffect(() => {
    async function load() {
      try {
        const res = await fetch(`/api/surveys/${params.id}`)
        if (!res.ok) throw new Error('not found')
        const data: Survey = await res.json()
        setSurvey(data)
      } catch {
        // Use fallback data so the UI is always functional
        setSurvey({ ...FALLBACK_SURVEY, id: params.id })
      } finally {
        setLoading(false)
      }
    }
    load()
  }, [params.id])

  const setAnswer = useCallback((qid: string, value: AnswerValue) => {
    setAnswers((prev) => ({ ...prev, [qid]: value }))
    setErrors((prev) => ({ ...prev, [qid]: false }))
  }, [])

  if (loading || !survey) {
    return (
      <div className={styles.page}>
        <div className={styles.progressBar}>
          <div className={styles.progressTrack}>
            <div className={styles.progressFill} style={{ width: '0%' }} />
          </div>
        </div>
        <div className={styles.loadingShell}>
          <div className={`${styles.skeleton} ${styles.skeletonTitle}`} />
          <div className={`${styles.skeleton} ${styles.skeletonDesc}`} />
          <div className={`${styles.skeleton} ${styles.skeletonCard}`} />
        </div>
      </div>
    )
  }

  const questions    = survey.questions
  const totalQ       = questions.length
  const showAll      = totalQ <= 5
  const pageSize     = 1
  const totalPages   = showAll ? 1 : totalQ
  const currentPage  = showAll ? 0 : Math.min(page, totalPages - 1)
  const isLastPage   = currentPage === totalPages - 1

  // Which questions are visible on the current page
  const visibleQs: Question[] = showAll
    ? questions
    : [questions[currentPage]]

  // Progress: answered required questions or page fraction
  const answeredRequired = questions.filter(
    (q) => q.required && answers[q.id] != null && answers[q.id] !== '' &&
           !(Array.isArray(answers[q.id]) && (answers[q.id] as string[]).length === 0)
  ).length
  const totalRequired = questions.filter((q) => q.required).length
  const progressPct = showAll
    ? (totalRequired > 0 ? Math.round((answeredRequired / totalRequired) * 100) : 0)
    : Math.round(((currentPage) / totalQ) * 100)

  function validatePage(): boolean {
    const newErrors: Record<string, boolean> = {}
    let valid = true
    for (const q of visibleQs) {
      if (!q.required) continue
      const val = answers[q.id]
      const empty =
        val == null ||
        val === '' ||
        (Array.isArray(val) && val.length === 0)
      if (empty) {
        newErrors[q.id] = true
        valid = false
      }
    }
    setErrors((prev) => ({ ...prev, ...newErrors }))
    return valid
  }

  function handleNext() {
    if (!validatePage()) return
    setPage((p) => p + 1)
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  function handleBack() {
    setPage((p) => Math.max(0, p - 1))
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  async function handleSubmit() {
    if (!validatePage()) return
    setSubmitting(true)
    setSubmitErr(null)
    try {
      const res = await fetch(`/api/surveys/${params.id}/respond`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ answers }),
      })
      if (!res.ok) {
        const msg = await res.text().catch(() => 'Submission failed. Please try again.')
        throw new Error(msg)
      }
      router.push(`/surveys/${params.id}/complete`)
    } catch (err) {
      setSubmitErr(err instanceof Error ? err.message : 'Something went wrong. Please try again.')
      setSubmitting(false)
    }
  }

  // Display label for progress
  const progressLabel = showAll
    ? `${answeredRequired} of ${totalRequired} required question${totalRequired !== 1 ? 's' : ''} answered`
    : `Question ${currentPage + 1} of ${totalQ}`

  return (
    <div className={styles.page}>
      {/* Sticky progress bar */}
      <div className={styles.progressBar}>
        <div className={styles.progressTrack} role="progressbar" aria-valuenow={progressPct} aria-valuemin={0} aria-valuemax={100} aria-label="Survey progress">
          <div className={styles.progressFill} style={{ width: `${progressPct}%` }} />
        </div>
        <div className={styles.progressMeta}>
          <span className={styles.progressLabel}>{progressLabel}</span>
          <span className={styles.progressCount}>{progressPct}%</span>
        </div>
      </div>

      {/* Survey header */}
      <header className={styles.surveyHeader}>
        <p className={styles.orgBadge}>{survey.org}</p>
        <h1 className={styles.surveyTitle}>{survey.title}</h1>
        {survey.description && (
          <p className={styles.surveyDesc}>{survey.description}</p>
        )}
        <div className={styles.surveyMeta}>
          <span className={styles.surveyMetaItem}>
            ⏱ About {survey.durationMin} min
          </span>
          <span className={styles.surveyMetaItem}>
            📋 {totalQ} questions
          </span>
          {survey.reward && (
            <span className={styles.rewardBadge}>
              🎁 {survey.reward}
            </span>
          )}
        </div>
      </header>

      {/* Questions */}
      <main className={styles.questionsArea}>
        {visibleQs.map((q) => (
          <QuestionRenderer
            key={q.id}
            question={q}
            value={answers[q.id] ?? null}
            onChange={(v) => setAnswer(q.id, v)}
            error={!!errors[q.id]}
          />
        ))}

        {/* Submit error */}
        {submitErr && (
          <p className={styles.submitError} role="alert">{submitErr}</p>
        )}

        {/* Navigation */}
        <div className={styles.actionBar}>
          {!showAll && currentPage > 0 ? (
            <button type="button" className={styles.prevBtn} onClick={handleBack}>
              ← Back
            </button>
          ) : (
            <span />
          )}

          {!showAll && !isLastPage ? (
            <button type="button" className={styles.nextBtn} onClick={handleNext}>
              Next →
            </button>
          ) : (
            <button
              type="button"
              className={styles.submitBtn}
              onClick={handleSubmit}
              disabled={submitting}
              aria-busy={submitting}
            >
              {submitting ? 'Submitting…' : 'Submit Survey'}
            </button>
          )}
        </div>
      </main>
    </div>
  )
}
