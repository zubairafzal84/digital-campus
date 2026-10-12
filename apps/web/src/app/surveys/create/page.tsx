'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import styles from './surveys-create.module.css'

// ── Types ────────────────────────────────────────────────────────────

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
  question_type: QuestionType
  question_text: string
  options: string[]
  is_required: boolean
  sort_order: number
}

interface SetupData {
  title: string
  description: string
  organization_name: string
  reward_description: string
  estimated_minutes: string
  closes_at: string
  target_schools: string[]
  target_programmes: string
  target_year_min: string
  target_year_max: string
  max_participants: string
  is_anonymous: boolean
}

// ── Constants ────────────────────────────────────────────────────────

const QUESTION_TYPES: { type: QuestionType; icon: string; label: string }[] = [
  { type: 'multiple_choice', icon: '◉', label: 'Multiple Choice' },
  { type: 'checkbox',        icon: '☑',  label: 'Checkboxes' },
  { type: 'rating',          icon: '★',  label: 'Star Rating' },
  { type: 'nps',             icon: '📊', label: 'NPS (0–10)' },
  { type: 'short_text',      icon: '✏️', label: 'Short Text' },
  { type: 'long_text',       icon: '📝', label: 'Long Text' },
  { type: 'yes_no',          icon: '👍', label: 'Yes / No' },
  { type: 'scale',           icon: '⟺',  label: 'Scale' },
]

const SCHOOLS = [
  'UBC', 'SFU', 'UofT', 'McGill', 'Waterloo',
  "Queen's", 'UAlberta', 'UVic', 'Dal', 'BCIT', 'Seneca', 'Humber',
]

const STEPS = ['Setup', 'Build Questions', 'Preview & Launch']

function uid() {
  return Math.random().toString(36).slice(2, 10)
}

// ── Sub-components ───────────────────────────────────────────────────

function QuestionPreview({ q }: { q: Question }) {
  return (
    <div className={styles.previewQuestion}>
      <p className={styles.previewQLabel}>
        {q.question_text || <em style={{ opacity: 0.5 }}>No question text yet</em>}
        {q.is_required && <span className={styles.previewQRequired}>*</span>}
      </p>

      {q.question_type === 'multiple_choice' && (
        <div>
          {(q.options.length ? q.options : ['Option A', 'Option B']).map((opt, i) => (
            <div key={i} className={styles.previewOption}>
              <span className={styles.previewOptionDot} />
              {opt || `Option ${i + 1}`}
            </div>
          ))}
        </div>
      )}

      {q.question_type === 'checkbox' && (
        <div>
          {(q.options.length ? q.options : ['Option A', 'Option B']).map((opt, i) => (
            <div key={i} className={styles.previewOption}>
              <span className={styles.previewOptionSquare} />
              {opt || `Option ${i + 1}`}
            </div>
          ))}
        </div>
      )}

      {q.question_type === 'rating' && (
        <div className={styles.starRow}>
          {[1, 2, 3, 4, 5].map((n) => (
            <span key={n} className={styles.star}>★</span>
          ))}
        </div>
      )}

      {q.question_type === 'nps' && (
        <div className={styles.previewNpsRow}>
          {Array.from({ length: 11 }, (_, i) => (
            <span key={i} className={styles.previewNpsBtn}>{i}</span>
          ))}
        </div>
      )}

      {q.question_type === 'short_text' && (
        <input className={styles.previewTextInput} placeholder="Your answer…" readOnly />
      )}

      {q.question_type === 'long_text' && (
        <textarea className={styles.previewTextarea} placeholder="Your answer…" readOnly />
      )}

      {q.question_type === 'yes_no' && (
        <div className={styles.previewYesNo}>
          <span className={styles.previewYesNoBtn}>Yes</span>
          <span className={styles.previewYesNoBtn}>No</span>
        </div>
      )}

      {q.question_type === 'scale' && (
        <div className={styles.previewScaleRow}>
          <span className={styles.previewScaleLabel}>1</span>
          <div className={styles.previewScaleTrack} />
          <span className={styles.previewScaleLabel}>10</span>
        </div>
      )}
    </div>
  )
}

// ── Main component ───────────────────────────────────────────────────

export default function CreateSurveyPage() {
  const router = useRouter()
  const [step, setStep] = useState(0)
  const [showTypePicker, setShowTypePicker] = useState(false)
  const [submitting, setSubmitting] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const [setup, setSetup] = useState<SetupData>({
    title: '',
    description: '',
    organization_name: '',
    reward_description: '',
    estimated_minutes: '5',
    closes_at: '',
    target_schools: [],
    target_programmes: '',
    target_year_min: '1',
    target_year_max: '5',
    max_participants: '',
    is_anonymous: true,
  })

  const [questions, setQuestions] = useState<Question[]>([])

  // ── Setup handlers ──

  function handleSetup(e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) {
    const { name, value, type } = e.target
    setSetup((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? (e.target as HTMLInputElement).checked : value,
    }))
  }

  function toggleSchool(school: string) {
    setSetup((prev) => ({
      ...prev,
      target_schools: prev.target_schools.includes(school)
        ? prev.target_schools.filter((s) => s !== school)
        : [...prev.target_schools, school],
    }))
  }

  // ── Question handlers ──

  function addQuestion(type: QuestionType) {
    const newQ: Question = {
      id: uid(),
      question_type: type,
      question_text: '',
      options: type === 'multiple_choice' || type === 'checkbox' ? ['', ''] : [],
      is_required: true,
      sort_order: questions.length,
    }
    setQuestions((prev) => [...prev, newQ])
    setShowTypePicker(false)
  }

  function updateQuestion(id: string, patch: Partial<Question>) {
    setQuestions((prev) => prev.map((q) => (q.id === id ? { ...q, ...patch } : q)))
  }

  function deleteQuestion(id: string) {
    setQuestions((prev) => prev.filter((q) => q.id !== id))
  }

  function addOption(qId: string) {
    setQuestions((prev) =>
      prev.map((q) =>
        q.id === qId ? { ...q, options: [...q.options, ''] } : q
      )
    )
  }

  function updateOption(qId: string, idx: number, val: string) {
    setQuestions((prev) =>
      prev.map((q) =>
        q.id === qId
          ? { ...q, options: q.options.map((o, i) => (i === idx ? val : o)) }
          : q
      )
    )
  }

  function removeOption(qId: string, idx: number) {
    setQuestions((prev) =>
      prev.map((q) =>
        q.id === qId
          ? { ...q, options: q.options.filter((_, i) => i !== idx) }
          : q
      )
    )
  }

  // ── Navigation ──

  function canProceed() {
    if (step === 0) return setup.title.trim() !== '' && setup.organization_name.trim() !== ''
    if (step === 1) return questions.length > 0
    return true
  }

  // ── Submit ──

  async function submit(status: 'draft' | 'active') {
    setSubmitting(true)
    setError(null)

    const payload = {
      title: setup.title.trim(),
      description: setup.description.trim() || null,
      organization_name: setup.organization_name.trim(),
      reward_description: setup.reward_description.trim() || null,
      estimated_minutes: parseInt(setup.estimated_minutes) || 5,
      closes_at: setup.closes_at || null,
      target_schools: setup.target_schools.length ? setup.target_schools : null,
      target_programmes: setup.target_programmes.trim() || null,
      target_year_min: parseInt(setup.target_year_min) || null,
      target_year_max: parseInt(setup.target_year_max) || null,
      max_participants: setup.max_participants ? parseInt(setup.max_participants) : null,
      is_anonymous: setup.is_anonymous,
      status,
      questions: questions.map((q, idx) => ({
        question_text: q.question_text,
        question_type: q.question_type,
        options: q.options.filter(Boolean).length ? q.options.filter(Boolean) : null,
        is_required: q.is_required,
        sort_order: idx,
      })),
    }

    try {
      const res = await fetch('/api/surveys', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      })
      const json = await res.json()
      if (!res.ok) {
        setError(json.error ?? 'Something went wrong. Please try again.')
        setSubmitting(false)
        return
      }
      router.push(`/surveys/${json.survey_id}/manage`)
    } catch {
      setError('Network error. Please check your connection.')
      setSubmitting(false)
    }
  }

  // ── Render ───────────────────────────────────────────────────────

  return (
    <div className={styles.page}>
      {/* Hero */}
      <div className={styles.hero}>
        <div className={styles.heroInner}>
          <span className={styles.eyebrow}>Partner Tools</span>
          <h1 className={styles.h1}>Create a Survey</h1>
          <p className={styles.lead}>
            Reach verified Canadian students at scale. Build your survey in minutes,
            target by school and year, and receive authentic responses.
          </p>
        </div>
      </div>

      {/* Step bar */}
      <div className={styles.stepBar}>
        {STEPS.map((label, i) => (
          <div
            key={i}
            className={`${styles.stepItem} ${i < step ? styles.done : ''} ${i === step ? styles.active : ''}`}
          >
            <div
              className={`${styles.stepDot} ${i === step ? styles.stepDotActive : ''} ${i < step ? styles.stepDotDone : ''}`}
            >
              {i < step ? '✓' : i + 1}
            </div>
            <span className={`${styles.stepLabel} ${i === step ? styles.stepLabelActive : ''}`}>
              {label}
            </span>
          </div>
        ))}
      </div>

      <div className={styles.wizard}>

        {/* ── Step 1: Setup ── */}
        {step === 0 && (
          <div className={styles.setupForm}>
            <p className={styles.sectionTitle}>Survey details</p>

            <div className={styles.field}>
              <label className={styles.label} htmlFor="title">
                Survey title <span>*</span>
              </label>
              <input
                id="title"
                name="title"
                className={styles.input}
                placeholder="e.g. Campus Dining Experience — Fall 2026"
                value={setup.title}
                onChange={handleSetup}
              />
            </div>

            <div className={styles.field}>
              <label className={styles.label} htmlFor="description">Description</label>
              <textarea
                id="description"
                name="description"
                className={styles.textarea}
                rows={3}
                placeholder="Tell students what this survey is about and how results will be used."
                value={setup.description}
                onChange={handleSetup}
              />
            </div>

            <div className={styles.field}>
              <label className={styles.label} htmlFor="organization_name">
                Organization name <span>*</span>
              </label>
              <input
                id="organization_name"
                name="organization_name"
                className={styles.input}
                placeholder="e.g. Acme Corp, Student Affairs Office"
                value={setup.organization_name}
                onChange={handleSetup}
              />
            </div>

            <div className={styles.fieldRow}>
              <div className={styles.field}>
                <label className={styles.label} htmlFor="reward_description">Reward (optional)</label>
                <input
                  id="reward_description"
                  name="reward_description"
                  className={styles.input}
                  placeholder="e.g. $25 gift card draw"
                  value={setup.reward_description}
                  onChange={handleSetup}
                />
              </div>
              <div className={styles.field}>
                <label className={styles.label} htmlFor="estimated_minutes">Est. completion time (min)</label>
                <input
                  id="estimated_minutes"
                  name="estimated_minutes"
                  type="number"
                  min="1"
                  max="60"
                  className={styles.input}
                  placeholder="5"
                  value={setup.estimated_minutes}
                  onChange={handleSetup}
                />
              </div>
            </div>

            <div className={styles.fieldRow}>
              <div className={styles.field}>
                <label className={styles.label} htmlFor="closes_at">Close date</label>
                <input
                  id="closes_at"
                  name="closes_at"
                  type="date"
                  className={styles.input}
                  value={setup.closes_at}
                  onChange={handleSetup}
                />
              </div>
              <div className={styles.field}>
                <label className={styles.label} htmlFor="max_participants">Max responses</label>
                <input
                  id="max_participants"
                  name="max_participants"
                  type="number"
                  min="1"
                  className={styles.input}
                  placeholder="Unlimited"
                  value={setup.max_participants}
                  onChange={handleSetup}
                />
              </div>
            </div>

            <p className={styles.sectionTitle}>Target audience</p>

            <div className={styles.field}>
              <span className={styles.label}>Target schools</span>
              <p className={styles.hint}>Leave all unselected to reach all schools.</p>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8, marginTop: 4 }}>
                {SCHOOLS.map((s) => (
                  <button
                    key={s}
                    type="button"
                    onClick={() => toggleSchool(s)}
                    style={{
                      padding: '6px 14px',
                      borderRadius: 20,
                      border: setup.target_schools.includes(s)
                        ? '1.5px solid var(--purple)'
                        : '1.5px solid var(--border)',
                      background: setup.target_schools.includes(s) ? 'var(--lav)' : 'var(--white)',
                      color: setup.target_schools.includes(s) ? 'var(--purple)' : 'var(--muted)',
                      fontSize: 13,
                      fontWeight: 600,
                      fontFamily: 'var(--font-body)',
                      cursor: 'pointer',
                      transition: 'all 0.15s',
                    }}
                  >
                    {s}
                  </button>
                ))}
              </div>
            </div>

            <div className={styles.field}>
              <label className={styles.label} htmlFor="target_programmes">Programme filter</label>
              <input
                id="target_programmes"
                name="target_programmes"
                className={styles.input}
                placeholder="e.g. Engineering, Business, Nursing (comma-separated)"
                value={setup.target_programmes}
                onChange={handleSetup}
              />
            </div>

            <div className={styles.fieldRow}>
              <div className={styles.field}>
                <label className={styles.label} htmlFor="target_year_min">Year of study — from</label>
                <select
                  id="target_year_min"
                  name="target_year_min"
                  className={styles.select}
                  value={setup.target_year_min}
                  onChange={handleSetup}
                >
                  {[1, 2, 3, 4, 5].map((y) => (
                    <option key={y} value={y}>Year {y}</option>
                  ))}
                </select>
              </div>
              <div className={styles.field}>
                <label className={styles.label} htmlFor="target_year_max">Year of study — to</label>
                <select
                  id="target_year_max"
                  name="target_year_max"
                  className={styles.select}
                  value={setup.target_year_max}
                  onChange={handleSetup}
                >
                  {[1, 2, 3, 4, 5].map((y) => (
                    <option key={y} value={y}>Year {y}</option>
                  ))}
                </select>
              </div>
            </div>

            <div className={styles.toggleRow}>
              <label className={styles.toggle}>
                <input
                  type="checkbox"
                  name="is_anonymous"
                  checked={setup.is_anonymous}
                  onChange={handleSetup}
                />
                <span className={styles.toggleSlider} />
              </label>
              <div>
                <div className={styles.toggleLabel}>Anonymous responses</div>
                <div className={styles.toggleDesc}>
                  Student identities will not be linked to their answers.
                </div>
              </div>
            </div>
          </div>
        )}

        {/* ── Step 2: Question builder ── */}
        {step === 1 && (
          <div>
            <div className={styles.builderTop}>
              <h2 className={styles.builderTitle}>
                Questions
                {questions.length > 0 && (
                  <span style={{ fontSize: 14, fontWeight: 500, color: 'var(--faint)', marginLeft: 8 }}>
                    ({questions.length})
                  </span>
                )}
              </h2>
              <button className={styles.addQuestionBtn} onClick={() => setShowTypePicker(true)}>
                + Add Question
              </button>
            </div>

            {questions.length === 0 ? (
              <div className={styles.emptyQuestions}>
                <div className={styles.emptyQIcon}>📋</div>
                <div className={styles.emptyQText}>No questions yet</div>
                <div className={styles.emptyQSub}>Click "Add Question" to start building your survey.</div>
              </div>
            ) : (
              <div className={styles.questionList}>
                {questions.map((q, idx) => (
                  <div key={q.id} className={styles.questionCard}>
                    <div className={styles.questionCardTop}>
                      <div className={styles.dragHandle}>
                        <span /><span /><span />
                      </div>
                      <span className={styles.questionNum}>Q{idx + 1}</span>
                      <span className={styles.questionType}>
                        {QUESTION_TYPES.find((t) => t.type === q.question_type)?.icon}{' '}
                        {QUESTION_TYPES.find((t) => t.type === q.question_type)?.label}
                      </span>
                      <div className={styles.questionCardActions}>
                        <label className={styles.reqToggle}>
                          <input
                            type="checkbox"
                            checked={q.is_required}
                            onChange={(e) =>
                              updateQuestion(q.id, { is_required: e.target.checked })
                            }
                          />
                          Required
                        </label>
                        <button
                          className={styles.deleteBtn}
                          onClick={() => deleteQuestion(q.id)}
                          aria-label="Delete question"
                        >
                          ✕
                        </button>
                      </div>
                    </div>

                    <input
                      className={styles.questionText}
                      placeholder="Enter your question…"
                      value={q.question_text}
                      onChange={(e) => updateQuestion(q.id, { question_text: e.target.value })}
                    />

                    {/* Options for MC / Checkbox */}
                    {(q.question_type === 'multiple_choice' || q.question_type === 'checkbox') && (
                      <div className={styles.optionsList}>
                        {q.options.map((opt, i) => (
                          <div key={i} className={styles.optionRow}>
                            <span
                              className={
                                q.question_type === 'multiple_choice'
                                  ? styles.optionBullet
                                  : styles.optionBulletSquare
                              }
                            />
                            <input
                              className={styles.optionInput}
                              placeholder={`Option ${i + 1}`}
                              value={opt}
                              onChange={(e) => updateOption(q.id, i, e.target.value)}
                            />
                            {q.options.length > 2 && (
                              <button
                                className={styles.removeOptionBtn}
                                onClick={() => removeOption(q.id, i)}
                                aria-label="Remove option"
                              >
                                ✕
                              </button>
                            )}
                          </div>
                        ))}
                        <button
                          className={styles.addOptionBtn}
                          onClick={() => addOption(q.id)}
                        >
                          + Add option
                        </button>
                      </div>
                    )}

                    {/* Star rating visual */}
                    {q.question_type === 'rating' && (
                      <div className={styles.starRow}>
                        {[1, 2, 3, 4, 5].map((n) => (
                          <span key={n} className={`${styles.star} ${n <= 3 ? styles.starFilled : ''}`}>★</span>
                        ))}
                      </div>
                    )}

                    {/* NPS scale preview */}
                    {q.question_type === 'nps' && (
                      <div className={styles.ratingPreview} style={{ flexWrap: 'wrap' }}>
                        {Array.from({ length: 11 }, (_, i) => (
                          <span key={i} className={styles.ratingDot}>{i}</span>
                        ))}
                      </div>
                    )}

                    {/* Scale visual */}
                    {q.question_type === 'scale' && (
                      <div style={{ marginTop: 12, display: 'flex', alignItems: 'center', gap: 10 }}>
                        <span style={{ fontSize: 12, color: 'var(--faint)' }}>1</span>
                        <div style={{ flex: 1, height: 6, background: 'var(--border)', borderRadius: 3 }} />
                        <span style={{ fontSize: 12, color: 'var(--faint)' }}>10</span>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* ── Step 3: Preview & Launch ── */}
        {step === 2 && (
          <div>
            <div className={styles.previewCard}>
              <div className={styles.previewMeta}>
                <span className={styles.previewOrg}>{setup.organization_name || 'Your Organization'}</span>
                {setup.reward_description && (
                  <span className={styles.previewBadge}>🎁 {setup.reward_description}</span>
                )}
                {setup.is_anonymous && (
                  <span className={styles.previewBadge}>Anonymous</span>
                )}
              </div>

              <h2 className={styles.previewTitle}>{setup.title || 'Untitled Survey'}</h2>

              {setup.description && (
                <p className={styles.previewDesc}>{setup.description}</p>
              )}

              <div className={styles.previewInfo}>
                {setup.estimated_minutes && (
                  <span className={styles.previewInfoItem}>
                    ⏱ <strong>{setup.estimated_minutes} min</strong>
                  </span>
                )}
                {questions.length > 0 && (
                  <span className={styles.previewInfoItem}>
                    📋 <strong>{questions.length} question{questions.length !== 1 ? 's' : ''}</strong>
                  </span>
                )}
                {setup.closes_at && (
                  <span className={styles.previewInfoItem}>
                    📅 Closes <strong>{new Date(setup.closes_at).toLocaleDateString('en-CA')}</strong>
                  </span>
                )}
                {setup.max_participants && (
                  <span className={styles.previewInfoItem}>
                    👥 Max <strong>{setup.max_participants} responses</strong>
                  </span>
                )}
              </div>

              <div className={styles.previewQuestionList}>
                {questions.map((q) => (
                  <QuestionPreview key={q.id} q={q} />
                ))}
              </div>
            </div>

            {error && <div className={styles.errorMsg}>{error}</div>}

            <div className={styles.actionRow}>
              <button
                className={styles.publishBtn}
                disabled={submitting}
                onClick={() => submit('active')}
              >
                {submitting ? 'Publishing…' : 'Publish Survey'}
              </button>
              <button
                className={styles.draftBtn}
                disabled={submitting}
                onClick={() => submit('draft')}
              >
                Save as Draft
              </button>
            </div>
          </div>
        )}

        {/* ── Navigation buttons ── */}
        {step < 2 && (
          <div className={styles.navRow}>
            {step > 0 ? (
              <button className={styles.backBtn} onClick={() => setStep((s) => s - 1)}>
                ← Back
              </button>
            ) : (
              <div />
            )}
            <button
              className={styles.nextBtn}
              disabled={!canProceed()}
              onClick={() => setStep((s) => s + 1)}
            >
              {step === 1 ? 'Preview →' : 'Next →'}
            </button>
          </div>
        )}

        {step === 2 && (
          <div className={styles.navRow}>
            <button className={styles.backBtn} onClick={() => setStep(1)}>
              ← Edit Questions
            </button>
            <div />
          </div>
        )}
      </div>

      {/* ── Type picker overlay ── */}
      {showTypePicker && (
        <div className={styles.overlay} onClick={() => setShowTypePicker(false)}>
          <div className={styles.typePicker} onClick={(e) => e.stopPropagation()}>
            <h3 className={styles.typePickerTitle}>Choose a question type</h3>
            <div className={styles.typePickerGrid}>
              {QUESTION_TYPES.map(({ type, icon, label }) => (
                <button
                  key={type}
                  className={styles.typeTile}
                  onClick={() => addQuestion(type)}
                >
                  <span className={styles.typeIcon}>{icon}</span>
                  <span className={styles.typeName}>{label}</span>
                </button>
              ))}
            </div>
            <button
              className={styles.typePickerCancel}
              onClick={() => setShowTypePicker(false)}
            >
              Cancel
            </button>
          </div>
        </div>
      )}
    </div>
  )
}
