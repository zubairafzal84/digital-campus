'use client'

import { useState, useEffect } from 'react'
import styles from './profile.module.css'

/* ── Personal info form ─────────────────────────────────── */

interface PersonalProps {
  firstName:    string
  lastName:     string
  email:        string
  displayName?: string | null
}

export function PersonalInfoForm({ firstName, lastName, email, displayName: initDisplayName }: PersonalProps) {
  const [first,       setFirst]       = useState(firstName)
  const [last,        setLast]        = useState(lastName)
  const [displayName, setDisplayName] = useState(initDisplayName ?? '')
  const [lang,        setLang]        = useState('en')
  const [saving,      setSaving]      = useState(false)
  const [success,     setSuccess]     = useState(false)
  const [error,       setError]       = useState('')

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setSaving(true)
    setError('')
    setSuccess(false)

    try {
      const res = await fetch('/api/profile', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          preferred_language: lang,
          display_name: displayName.trim() || null,
        }),
      })
      if (!res.ok) throw new Error('Save failed.')
      setSuccess(true)
      setTimeout(() => setSuccess(false), 3000)
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : 'Save failed.')
    } finally {
      setSaving(false)
    }
  }

  return (
    <form className={styles.form} onSubmit={handleSubmit}>
      {error   && <div className={styles.formError}>{error}</div>}
      {success && <div className={styles.formSuccess}>Saved.</div>}

      <div className={styles.row2}>
        <div className={styles.field}>
          <label className={styles.label}>First name</label>
          <input type="text" value={first} onChange={e => setFirst(e.target.value)} className={styles.input} />
          <p className={styles.hint}>Name changes are managed through your account provider.</p>
        </div>
        <div className={styles.field}>
          <label className={styles.label}>Last name</label>
          <input type="text" value={last} onChange={e => setLast(e.target.value)} className={styles.input} />
        </div>
      </div>

      <div className={styles.field}>
        <label className={styles.label}>Display name</label>
        <input
          type="text"
          value={displayName}
          onChange={e => setDisplayName(e.target.value.slice(0, 40))}
          placeholder="How should other students see you?"
          maxLength={40}
          className={styles.input}
        />
        <p className={styles.hint}>This is what other students see in chat and on your profile. Max 40 characters.</p>
      </div>

      <div className={styles.field}>
        <label className={styles.label}>Email</label>
        <input type="email" defaultValue={email} className={styles.input} readOnly />
        <p className={styles.hint}>Email is managed by your account provider.</p>
      </div>

      <div className={styles.field}>
        <label className={styles.label}>Preferred language</label>
        <select className={styles.input} value={lang} onChange={e => setLang(e.target.value)}>
          <option value="en">English</option>
          <option value="fr">Français (coming soon)</option>
        </select>
      </div>

      <button type="submit" className={styles.saveBtn} disabled={saving}>
        {saving ? 'Saving…' : 'Save changes'}
      </button>
    </form>
  )
}

/* ── Education form ─────────────────────────────────────── */

interface EducationProps {
  programme?:    string | null
  yearOfStudy?:  number | null
  isVerified?:   boolean
}

const YEARS = [
  { value: '1', label: '1st year' },
  { value: '2', label: '2nd year' },
  { value: '3', label: '3rd year' },
  { value: '4', label: '4th year' },
  { value: '5', label: '5th year +' },
  { value: 'grad', label: 'Graduate' },
]

export function EducationForm({ programme: initProg, yearOfStudy: initYear, isVerified }: EducationProps) {
  const [programme,   setProgramme]   = useState(initProg ?? '')
  const [year,        setYear]        = useState(String(initYear ?? '1'))
  const [saving,      setSaving]      = useState(false)
  const [success,     setSuccess]     = useState(false)
  const [error,       setError]       = useState('')

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setSaving(true)
    setError('')
    setSuccess(false)

    try {
      const res = await fetch('/api/profile', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          programme:    programme.trim() || null,
          year_of_study: isNaN(parseInt(year)) ? null : parseInt(year),
        }),
      })
      if (!res.ok) throw new Error('Save failed.')
      setSuccess(true)
      setTimeout(() => setSuccess(false), 3000)
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : 'Save failed.')
    } finally {
      setSaving(false)
    }
  }

  return (
    <form className={styles.form} onSubmit={handleSubmit}>
      {error   && <div className={styles.formError}>{error}</div>}
      {success && <div className={styles.formSuccess}>Saved.</div>}

      <div className={styles.field}>
        <label className={styles.label}>School</label>
        <input
          type="text"
          placeholder="e.g. University of British Columbia"
          className={styles.input}
          readOnly
          defaultValue=""
        />
        <p className={styles.hint}>Contact support to change your institution after verification.</p>
      </div>

      <div className={styles.row2}>
        <div className={styles.field}>
          <label className={styles.label}>Programme</label>
          <input
            type="text"
            placeholder="e.g. BSc Computer Science"
            className={styles.input}
            value={programme}
            onChange={e => setProgramme(e.target.value)}
          />
        </div>
        <div className={styles.field}>
          <label className={styles.label}>Year</label>
          <select className={styles.input} value={year} onChange={e => setYear(e.target.value)}>
            {YEARS.map(({ value, label }) => (
              <option key={value} value={value}>{label}</option>
            ))}
          </select>
        </div>
      </div>

      <button type="submit" className={styles.saveBtn} disabled={saving}>
        {saving ? 'Saving…' : 'Save changes'}
      </button>

      {!isVerified && (
        <VerificationForm />
      )}
    </form>
  )
}

/* ── Verification widget ────────────────────────────────── */

function VerificationForm() {
  const [email,   setEmail]   = useState('')
  const [submitting, setSubmitting] = useState(false)
  const [done,    setDone]    = useState(false)
  const [error,   setError]   = useState('')

  async function handleVerify(e: React.FormEvent) {
    e.preventDefault()
    if (!email.trim()) return
    setSubmitting(true)
    setError('')

    try {
      const res = await fetch('/api/verification', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ student_email: email.trim().toLowerCase(), institution_id: null }),
      })
      if (!res.ok) {
        const data = await res.json().catch(() => ({}))
        throw new Error(data.error ?? 'Submission failed.')
      }
      setDone(true)
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : 'Submission failed.')
    } finally {
      setSubmitting(false)
    }
  }

  if (done) {
    return (
      <div className={styles.verifySuccess} id="verify-widget">
        <span className={styles.verifySuccessIcon}>✓</span>
        <div>
          <strong>Verification submitted</strong>
          <p>We&#39;ll review your request and update your status within 1–2 business days.</p>
        </div>
      </div>
    )
  }

  return (
    <div className={styles.verifyWidget} id="education">
      <h3 className={styles.verifyH}>Verify your student status</h3>
      <p className={styles.verifySub}>
        Use your school email address (.ca or .edu) to verify your enrollment. Verified students get full scholarship matching and peer connections.
      </p>
      {error && <div className={styles.formError}>{error}</div>}
      <form onSubmit={handleVerify} className={styles.verifyForm}>
        <input
          type="email"
          placeholder="yourname@school.ca"
          className={styles.input}
          value={email}
          onChange={e => setEmail(e.target.value)}
          required
        />
        <button type="submit" className={styles.verifyBtn} disabled={submitting}>
          {submitting ? 'Submitting…' : 'Submit for verification'}
        </button>
      </form>
      <p className={styles.hint}>Your school email is used only to verify enrollment and is never shared.</p>
    </div>
  )
}

/* ── Volunteer Experience ───────────────────────────────── */

interface VolunteerEntry {
  organization: string
  role: string
  year?: string
  hours?: number
}

const EMPTY_ENTRY: VolunteerEntry = { organization: '', role: '', year: '', hours: undefined }

export function VolunteerExperienceForm() {
  const [entries,  setEntries]  = useState<VolunteerEntry[]>([])
  const [loading,  setLoading]  = useState(true)
  const [saving,   setSaving]   = useState(false)
  const [success,  setSuccess]  = useState(false)
  const [error,    setError]    = useState('')

  useEffect(() => {
    fetch('/api/profile')
      .then(r => r.json())
      .then(data => {
        if (Array.isArray(data?.volunteer_experience)) {
          setEntries(data.volunteer_experience)
        }
      })
      .catch(() => {})
      .finally(() => setLoading(false))
  }, [])

  function addEntry() {
    setEntries(prev => [...prev, { ...EMPTY_ENTRY }])
  }

  function removeEntry(index: number) {
    setEntries(prev => prev.filter((_, i) => i !== index))
  }

  function updateEntry(index: number, field: keyof VolunteerEntry, value: string) {
    setEntries(prev => prev.map((e, i) => {
      if (i !== index) return e
      if (field === 'hours') {
        const parsed = parseInt(value, 10)
        return { ...e, hours: isNaN(parsed) ? undefined : parsed }
      }
      return { ...e, [field]: value }
    }))
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setSaving(true)
    setError('')
    setSuccess(false)

    // Strip empty entries
    const cleaned = entries.filter(en => en.organization.trim() && en.role.trim())

    try {
      const res = await fetch('/api/profile', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ volunteer_experience: cleaned }),
      })
      if (!res.ok) throw new Error('Save failed.')
      setEntries(cleaned)
      setSuccess(true)
      setTimeout(() => setSuccess(false), 3000)
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : 'Save failed.')
    } finally {
      setSaving(false)
    }
  }

  if (loading) {
    return <p className={styles.hint}>Loading…</p>
  }

  return (
    <form className={styles.form} onSubmit={handleSubmit}>
      {error   && <div className={styles.formError}>{error}</div>}
      {success && <div className={styles.formSuccess}>Saved.</div>}

      {entries.length === 0 && (
        <p className={styles.hint}>No volunteer experience added yet.</p>
      )}

      {entries.map((entry, i) => (
        <div key={i} className={styles.volunteerEntry}>
          <div className={styles.row2}>
            <div className={styles.field}>
              <label className={styles.label}>Organization</label>
              <input
                type="text"
                value={entry.organization}
                onChange={e => updateEntry(i, 'organization', e.target.value)}
                placeholder="e.g. Food Bank of Greater Vancouver"
                className={styles.input}
                required
              />
            </div>
            <div className={styles.field}>
              <label className={styles.label}>Role</label>
              <input
                type="text"
                value={entry.role}
                onChange={e => updateEntry(i, 'role', e.target.value)}
                placeholder="e.g. Shift Coordinator"
                className={styles.input}
                required
              />
            </div>
          </div>
          <div className={styles.row2}>
            <div className={styles.field}>
              <label className={styles.label}>Year <span className={styles.optional}>(optional)</span></label>
              <input
                type="text"
                value={entry.year ?? ''}
                onChange={e => updateEntry(i, 'year', e.target.value)}
                placeholder="e.g. 2024"
                className={styles.input}
              />
            </div>
            <div className={styles.field}>
              <label className={styles.label}>Hours <span className={styles.optional}>(optional)</span></label>
              <input
                type="number"
                min={1}
                value={entry.hours ?? ''}
                onChange={e => updateEntry(i, 'hours', e.target.value)}
                placeholder="e.g. 40"
                className={styles.input}
              />
            </div>
          </div>
          <button
            type="button"
            onClick={() => removeEntry(i)}
            className={styles.removeBtn}
            aria-label="Remove this entry"
          >
            Remove
          </button>
        </div>
      ))}

      <button type="button" onClick={addEntry} className={styles.addBtn}>
        + Add volunteer experience
      </button>

      <button type="submit" className={styles.saveBtn} disabled={saving}>
        {saving ? 'Saving…' : 'Save volunteer experience'}
      </button>
    </form>
  )
}

/* ── Privacy toggles ────────────────────────────────────── */

interface ToggleProps {
  isPublic: boolean
}

export function PrivacyToggles({ isPublic: initPublic }: ToggleProps) {
  const [isPublic,  setIsPublic]  = useState(initPublic)
  const [inSearch,  setInSearch]  = useState(false)
  const [shareGpa,  setShareGpa]  = useState(false)
  const [saving,    setSaving]    = useState(false)

  async function handleSave() {
    setSaving(true)
    try {
      await fetch('/api/profile', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ is_profile_public: isPublic }),
      })
    } finally {
      setSaving(false)
    }
  }

  const toggles = [
    { label: 'Show my profile to other students', sub: "Only students you've connected with can see it.", value: isPublic, onChange: (v: boolean) => { setIsPublic(v); } },
    { label: 'Appear in campus search', sub: 'Students at your school can find your public profile.', value: inSearch, onChange: setInSearch },
    { label: 'Share grades with clubs', sub: 'Some clubs use GPA for eligibility checks.', value: shareGpa, onChange: setShareGpa },
  ]

  return (
    <div>
      <div className={styles.toggleList}>
        {toggles.map(({ label, sub, value, onChange }) => (
          <div key={label} className={styles.toggleRow}>
            <div>
              <p className={styles.toggleLabel}>{label}</p>
              <p className={styles.toggleSub}>{sub}</p>
            </div>
            <button
              type="button"
              role="switch"
              aria-checked={value}
              className={`${styles.toggle} ${value ? styles.toggleOn : ''}`}
              onClick={() => onChange(!value)}
            >
              <span className={styles.toggleThumb} />
            </button>
          </div>
        ))}
      </div>
      <button
        type="button"
        className={styles.saveBtn}
        onClick={handleSave}
        disabled={saving}
        style={{ marginTop: '16px' }}
      >
        {saving ? 'Saving…' : 'Save privacy settings'}
      </button>
    </div>
  )
}
