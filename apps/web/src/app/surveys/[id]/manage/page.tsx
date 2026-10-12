'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { useParams } from 'next/navigation'
import styles from './survey-manage.module.css'

// ── Types ────────────────────────────────────────────────────────────

type SurveyStatus = 'active' | 'paused' | 'draft' | 'closed'

interface SurveyQuestion {
  id: string
  question_text: string
  question_type: string
  options: string[] | null
  is_required: boolean
  sort_order: number
}

interface SurveyResponse {
  id: string
  submitted_at: string
  answers: Record<string, unknown>
}

interface Survey {
  id: string
  title: string
  description: string | null
  organization_name: string
  status: SurveyStatus
  reward_description: string | null
  estimated_minutes: number
  closes_at: string | null
  max_participants: number | null
  current_participants: number
  is_anonymous: boolean
  target_schools: string[] | null
  created_at: string
  survey_questions: SurveyQuestion[]
  survey_responses?: SurveyResponse[]
}

// ── Helpers ──────────────────────────────────────────────────────────

function generateQRCodeArt(text: string): string {
  // Simple deterministic ASCII QR-like art — purely decorative placeholder
  const seed = text.split('').reduce((acc, c) => acc + c.charCodeAt(0), 0)
  const size = 17
  const lines: string[] = []
  const corner = ['██████', '█    █', '█ ██ █', '█ ██ █', '█    █', '██████']

  // Top row
  lines.push('███████  ░░░░░  ███████')
  lines.push('█     █  ░' + ((seed % 3 === 0) ? '█░' : '░░') + '░  █     █')
  lines.push('█ ███ █  ' + ((seed % 2 === 0) ? '░░░░░' : '░█░░░') + '  █ ███ █')
  lines.push('█ ███ █  ░░░░░  █ ███ █')
  lines.push('█     █  ░░' + ((seed % 5 === 0) ? '█░░' : '░░░') + '  █     █')
  lines.push('███████  ░░░░░  ███████')
  lines.push('         ' + ((seed % 4 === 0) ? '░░░░░' : '░░█░░') + '         ')
  lines.push('░░░░░░░  ░░░░░  ░░░░░░░')
  lines.push('░░░░░░░  ░░░░░  ░░░░░░░')
  lines.push('███████  ░░░░░  ░░░░░░░')
  lines.push('█     █  ░░░░░  ░░░░░░░')
  lines.push('█ ███ █  ░░░░░  ░░░░░░░')
  lines.push('█ ███ █  ░░░░░  ░░░░░░░')
  lines.push('█     █  ░░░░░  ░░░░░░░')
  lines.push('███████  ░░░░░  ░░░░░░░')

  return lines.join('\n')
}

function countsByOption(
  responses: SurveyResponse[],
  questionId: string,
  options: string[]
): Record<string, number> {
  const counts: Record<string, number> = {}
  options.forEach((o) => (counts[o] = 0))
  responses.forEach((r) => {
    const ans = r.answers?.[questionId]
    if (Array.isArray(ans)) {
      ans.forEach((a) => { if (counts[a] !== undefined) counts[a]++ })
    } else if (typeof ans === 'string' && counts[ans] !== undefined) {
      counts[ans]++
    }
  })
  return counts
}

function avgScore(responses: SurveyResponse[], questionId: string): number | null {
  const vals = responses
    .map((r) => Number(r.answers?.[questionId]))
    .filter((v) => !isNaN(v) && v > 0)
  if (!vals.length) return null
  return vals.reduce((s, v) => s + v, 0) / vals.length
}

function scoreDistribution(
  responses: SurveyResponse[],
  questionId: string,
  min: number,
  max: number
): Record<number, number> {
  const dist: Record<number, number> = {}
  for (let i = min; i <= max; i++) dist[i] = 0
  responses.forEach((r) => {
    const v = Number(r.answers?.[questionId])
    if (!isNaN(v) && v >= min && v <= max) dist[v]++
  })
  return dist
}

function exportCSV(survey: Survey, responses: SurveyResponse[]) {
  const questions = survey.survey_questions ?? []
  const headers = ['Response ID', 'Submitted At', ...questions.map((q) => q.question_text)]
  const rows = responses.map((r) => [
    r.id,
    new Date(r.submitted_at).toLocaleString('en-CA'),
    ...questions.map((q) => {
      const ans = r.answers?.[q.id]
      return Array.isArray(ans) ? ans.join('; ') : String(ans ?? '')
    }),
  ])

  const csv = [headers, ...rows]
    .map((row) => row.map((cell) => `"${String(cell).replace(/"/g, '""')}"`).join(','))
    .join('\n')

  const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' })
  const url = URL.createObjectURL(blob)
  const a = document.createElement('a')
  a.href = url
  a.download = `survey-${survey.id}-responses.csv`
  a.click()
  URL.revokeObjectURL(url)
}

// ── Sample data for when DB has no data yet ──────────────────────────

function mockSurvey(id: string): Survey {
  return {
    id,
    title: 'Campus Dining Experience — Fall 2026',
    description: 'Help us improve food services across campus.',
    organization_name: 'Student Affairs Office',
    status: 'active',
    reward_description: '$25 gift card draw',
    estimated_minutes: 5,
    closes_at: '2026-12-15',
    max_participants: 500,
    current_participants: 143,
    is_anonymous: true,
    target_schools: ['UBC', 'SFU'],
    created_at: new Date().toISOString(),
    survey_questions: [
      {
        id: 'q1',
        question_text: 'How satisfied are you with campus dining options?',
        question_type: 'rating',
        options: null,
        is_required: true,
        sort_order: 0,
      },
      {
        id: 'q2',
        question_text: 'Which dining hall do you visit most often?',
        question_type: 'multiple_choice',
        options: ['Main Hall', 'Library Cafe', 'Science Building', 'Off-campus'],
        is_required: true,
        sort_order: 1,
      },
      {
        id: 'q3',
        question_text: 'How likely are you to recommend campus dining to a peer?',
        question_type: 'nps',
        options: null,
        is_required: false,
        sort_order: 2,
      },
      {
        id: 'q4',
        question_text: 'Any other comments or suggestions?',
        question_type: 'long_text',
        options: null,
        is_required: false,
        sort_order: 3,
      },
    ],
    survey_responses: [
      { id: 'r1', submitted_at: new Date().toISOString(), answers: { q1: 4, q2: 'Main Hall',        q3: 8, q4: 'More vegan options please.' } },
      { id: 'r2', submitted_at: new Date().toISOString(), answers: { q1: 3, q2: 'Library Cafe',     q3: 6, q4: '' } },
      { id: 'r3', submitted_at: new Date().toISOString(), answers: { q1: 5, q2: 'Main Hall',        q3: 9, q4: 'Love the new salad bar!' } },
      { id: 'r4', submitted_at: new Date().toISOString(), answers: { q1: 2, q2: 'Off-campus',       q3: 3, q4: 'Too expensive.' } },
      { id: 'r5', submitted_at: new Date().toISOString(), answers: { q1: 4, q2: 'Science Building', q3: 7, q4: '' } },
    ],
  }
}

// ── Main component ───────────────────────────────────────────────────

export default function SurveyManagePage() {
  const { id } = useParams<{ id: string }>()
  const [survey, setSurvey] = useState<Survey | null>(null)
  const [loading, setLoading] = useState(true)
  const [fetchError, setFetchError] = useState<string | null>(null)
  const [copied, setCopied] = useState(false)
  const [statusUpdating, setStatusUpdating] = useState(false)

  const shareUrl =
    typeof window !== 'undefined'
      ? `${window.location.origin}/surveys/${id}`
      : `https://digitalkampus.ca/surveys/${id}`

  // ── Fetch survey ──

  useEffect(() => {
    async function load() {
      try {
        const res = await fetch(`/api/surveys/${id}`)
        if (res.ok) {
          const json = await res.json()
          if (json.survey) {
            // API returns questions under 'questions' key; normalize to survey_questions
            const srv = { ...json.survey }
            if (srv.questions && !srv.survey_questions) {
              srv.survey_questions = srv.questions
              delete srv.questions
            }
            setSurvey(srv)
          } else {
            setSurvey(mockSurvey(id))
          }
        } else {
          setSurvey(mockSurvey(id))
        }
      } catch {
        setSurvey(mockSurvey(id))
      } finally {
        setLoading(false)
      }
    }
    load()
  }, [id])

  // ── Copy link ──

  function copyLink() {
    navigator.clipboard.writeText(shareUrl).then(() => {
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    })
  }

  // ── Status update ──

  async function setStatus(newStatus: SurveyStatus) {
    if (!survey || statusUpdating) return
    setStatusUpdating(true)
    setSurvey((prev) => prev ? { ...prev, status: newStatus } : prev)
    try {
      await fetch(`/api/surveys/${id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status: newStatus }),
      })
    } catch {
      // optimistic update; tolerate failure
    } finally {
      setStatusUpdating(false)
    }
  }

  // ── Render ──

  if (loading) {
    return <div className={styles.loading}>Loading survey…</div>
  }

  if (fetchError || !survey) {
    return <div className={styles.errorState}>{fetchError ?? 'Survey not found.'}</div>
  }

  const responses = survey.survey_responses ?? []
  const responseCount = survey.current_participants ?? responses.length
  const maxParticipants = survey.max_participants ?? null
  const fillPct = maxParticipants ? Math.min((responseCount / maxParticipants) * 100, 100) : null
  const completionRate = responseCount > 0 ? Math.round((responses.length / responseCount) * 100) : 0

  return (
    <div className={styles.page}>
      {/* Hero */}
      <div className={styles.hero}>
        <div className={styles.heroInner}>
          <div className={styles.breadcrumb}>
            <Link href="/surveys">Surveys</Link>
            <span>›</span>
            <span>Manage</span>
          </div>

          <div className={styles.heroTop}>
            <div className={styles.heroLeft}>
              <div className={styles.orgLabel}>{survey.organization_name}</div>
              <h1 className={styles.heroTitle}>{survey.title}</h1>
            </div>

            <button
              className={`${styles.statusPill} ${
                survey.status === 'active'
                  ? styles.statusActive
                  : survey.status === 'paused'
                  ? styles.statusPaused
                  : styles.statusClosed
              }`}
              onClick={() =>
                setStatus(survey.status === 'active' ? 'paused' : 'active')
              }
              title="Click to toggle status"
            >
              <span className={styles.heroDot} />
              {survey.status === 'active'
                ? 'Active — click to pause'
                : survey.status === 'paused'
                ? 'Paused — click to activate'
                : survey.status === 'draft'
                ? 'Draft'
                : 'Closed'}
            </button>
          </div>
        </div>
      </div>

      <div className={styles.body}>

        {/* ── Stats ── */}
        <div className={styles.statsRow}>
          <div className={styles.stat}>
            <span className={styles.statValue}>{responseCount}</span>
            <span className={styles.statLabel}>Responses</span>
          </div>
          <div className={styles.stat}>
            <span className={styles.statValue}>
              {maxParticipants ?? '∞'}
            </span>
            <span className={styles.statLabel}>Max responses</span>
          </div>
          <div className={styles.stat}>
            <span className={styles.statValue}>{survey.estimated_minutes}m</span>
            <span className={styles.statLabel}>Est. completion</span>
          </div>
          <div className={styles.stat}>
            <span className={styles.statValue}>{survey.survey_questions?.length ?? 0}</span>
            <span className={styles.statLabel}>Questions</span>
          </div>
        </div>

        {/* ── Progress ── */}
        {fillPct !== null && (
          <div className={styles.card}>
            <div className={styles.cardTitle}>Response progress</div>
            <div className={styles.progressWrap}>
              <div className={styles.progressLabel}>
                <span>{responseCount} collected</span>
                <span>{Math.round(fillPct)}%</span>
              </div>
              <div className={styles.progressTrack}>
                <div
                  className={styles.progressFill}
                  style={{ width: `${fillPct}%` }}
                />
              </div>
              <div className={styles.progressLabel} style={{ marginTop: 4 }}>
                <span />
                <span>Goal: {maxParticipants}</span>
              </div>
            </div>
          </div>
        )}

        {/* ── Share & QR ── */}
        <div className={styles.card}>
          <div className={styles.cardTitle}>Share this survey</div>
          <div className={styles.shareRow}>
            <input
              readOnly
              className={styles.shareLink}
              value={shareUrl}
              onFocus={(e) => e.target.select()}
            />
            <button
              className={`${styles.copyBtn} ${copied ? styles.copiedBtn : ''}`}
              onClick={copyLink}
            >
              {copied ? '✓ Copied!' : 'Copy link'}
            </button>
          </div>

          <div style={{ marginTop: 20 }}>
            <div className={styles.cardTitle} style={{ marginBottom: 14 }}>QR code</div>
            <div className={styles.qrBlock}>
              <pre className={styles.qrCode}>{generateQRCodeArt(shareUrl)}</pre>
              <div className={styles.qrMeta}>
                <p className={styles.qrNote}>
                  Print or display this QR code to let students scan and open the survey
                  directly on their phone.
                </p>
                <p className={styles.qrNote} style={{ fontSize: 11, color: 'var(--faint)' }}>
                  This is a decorative placeholder. Integrate a QR library such as{' '}
                  <code>qrcode.react</code> for a scannable code in production.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* ── Status controls ── */}
        <div className={styles.card}>
          <div className={styles.cardTitle}>Survey controls</div>
          <div className={styles.statusControls}>
            <button
              className={`${styles.controlBtn} ${survey.status === 'active' ? styles.controlBtnActive : ''}`}
              onClick={() => setStatus('active')}
              disabled={statusUpdating}
            >
              Activate
            </button>
            <button
              className={`${styles.controlBtn} ${survey.status === 'paused' ? styles.controlBtnActive : ''}`}
              onClick={() => setStatus('paused')}
              disabled={statusUpdating}
            >
              Pause
            </button>
            <button
              className={`${styles.controlBtn} ${survey.status === 'closed' ? styles.controlBtnActive : ''}`}
              onClick={() => setStatus('closed')}
              disabled={statusUpdating}
            >
              Close survey
            </button>
          </div>
        </div>

        {/* ── Results ── */}
        <div className={styles.card}>
          <div className={styles.cardTitle}>Results</div>

          {responses.length === 0 ? (
            <div className={styles.noResponses}>
              No responses yet. Share the link above to start collecting answers.
            </div>
          ) : (
            <div className={styles.resultsSection}>
              {survey.survey_questions?.map((q) => {
                const qType = q.question_type

                return (
                  <div key={q.id} className={styles.questionResult}>
                    <div className={styles.qrTitle}>{q.question_text}</div>
                    <span className={styles.qrTypeBadge}>{qType.replace(/_/g, ' ')}</span>

                    {/* Multiple choice / checkbox — horizontal bars */}
                    {(qType === 'multiple_choice' || qType === 'checkbox') && q.options && (
                      <div className={styles.barChart}>
                        {(() => {
                          const counts = countsByOption(responses, q.id, q.options!)
                          const max = Math.max(...Object.values(counts), 1)
                          return q.options!.map((opt) => (
                            <div key={opt} className={styles.barRow}>
                              <span className={styles.barLabel} title={opt}>{opt}</span>
                              <div className={styles.barTrack}>
                                <div
                                  className={styles.barFill}
                                  style={{ width: `${(counts[opt] / max) * 100}%` }}
                                />
                              </div>
                              <span className={styles.barCount}>
                                {counts[opt]}
                              </span>
                            </div>
                          ))
                        })()}
                      </div>
                    )}

                    {/* Rating (1–5) */}
                    {qType === 'rating' && (
                      <div>
                        {(() => {
                          const avg = avgScore(responses, q.id)
                          const dist = scoreDistribution(responses, q.id, 1, 5)
                          const maxCount = Math.max(...Object.values(dist), 1)
                          return (
                            <>
                              <div className={styles.bigScore}>
                                {avg !== null ? avg.toFixed(1) : '—'}
                              </div>
                              <div className={styles.bigScoreSub}>avg out of 5 stars</div>
                              <div className={styles.distRow}>
                                {[1, 2, 3, 4, 5].map((n) => (
                                  <div key={n} className={styles.distCell}>
                                    <div
                                      className={styles.distBar}
                                      style={{ height: `${Math.max((dist[n] / maxCount) * 60, 4)}px` }}
                                    />
                                    <span className={styles.distLabel}>{n}★</span>
                                  </div>
                                ))}
                              </div>
                            </>
                          )
                        })()}
                      </div>
                    )}

                    {/* NPS (0–10) */}
                    {qType === 'nps' && (
                      <div>
                        {(() => {
                          const avg = avgScore(responses, q.id)
                          const dist = scoreDistribution(responses, q.id, 0, 10)
                          const maxCount = Math.max(...Object.values(dist), 1)
                          return (
                            <>
                              <div className={styles.bigScore}>
                                {avg !== null ? avg.toFixed(1) : '—'}
                              </div>
                              <div className={styles.bigScoreSub}>avg NPS score</div>
                              <div className={styles.distRow}>
                                {Array.from({ length: 11 }, (_, i) => i).map((n) => (
                                  <div key={n} className={styles.distCell}>
                                    <div
                                      className={styles.distBar}
                                      style={{
                                        height: `${Math.max((dist[n] / maxCount) * 60, 4)}px`,
                                        background:
                                          n >= 9
                                            ? 'var(--green)'
                                            : n >= 7
                                            ? 'var(--amber)'
                                            : 'var(--red)',
                                      }}
                                    />
                                    <span className={styles.distLabel}>{n}</span>
                                  </div>
                                ))}
                              </div>
                            </>
                          )
                        })()}
                      </div>
                    )}

                    {/* Scale */}
                    {qType === 'scale' && (
                      <div>
                        {(() => {
                          const avg = avgScore(responses, q.id)
                          return (
                            <>
                              <div className={styles.bigScore}>
                                {avg !== null ? avg.toFixed(1) : '—'}
                              </div>
                              <div className={styles.bigScoreSub}>avg out of 10</div>
                            </>
                          )
                        })()}
                      </div>
                    )}

                    {/* Yes/No */}
                    {qType === 'yes_no' && (
                      <div className={styles.barChart}>
                        {(() => {
                          const counts = countsByOption(responses, q.id, ['Yes', 'No'])
                          const total = responses.length || 1
                          return ['Yes', 'No'].map((opt) => (
                            <div key={opt} className={styles.barRow}>
                              <span className={styles.barLabel}>{opt}</span>
                              <div className={styles.barTrack}>
                                <div
                                  className={styles.barFill}
                                  style={{
                                    width: `${(counts[opt] / total) * 100}%`,
                                    background: opt === 'Yes' ? 'var(--green)' : 'var(--red)',
                                  }}
                                />
                              </div>
                              <span className={styles.barCount}>{counts[opt]}</span>
                            </div>
                          ))
                        })()}
                      </div>
                    )}

                    {/* Short / long text */}
                    {(qType === 'short_text' || qType === 'long_text') && (
                      <div className={styles.textResponses}>
                        {responses
                          .map((r) => r.answers?.[q.id])
                          .filter(Boolean)
                          .map((ans, i) => (
                            <div key={i} className={styles.textResponse}>
                              {String(ans)}
                            </div>
                          ))}
                        {responses.filter((r) => r.answers?.[q.id]).length === 0 && (
                          <div className={styles.noResponses}>No text responses yet.</div>
                        )}
                      </div>
                    )}
                  </div>
                )
              })}
            </div>
          )}
        </div>

        {/* ── Export ── */}
        <div className={styles.card}>
          <div className={styles.cardTitle}>Export data</div>
          <div className={styles.exportRow}>
            <button
              className={styles.exportBtn}
              onClick={() => exportCSV(survey, responses)}
            >
              ⬇ Export CSV
            </button>
            <span className={styles.exportNote}>
              Downloads all {responses.length} response{responses.length !== 1 ? 's' : ''} as a spreadsheet-compatible CSV file.
            </span>
          </div>
        </div>

      </div>
    </div>
  )
}
