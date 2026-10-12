'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import styles from './edit.module.css'

interface Scholarship {
  id:             string
  name_en:        string
  name_fr:        string | null
  funder_name:    string | null
  amount_min:     number | null
  amount_max:     number | null
  type:           string | null
  deadline:       string | null
  description_en: string | null
  is_published:   boolean
  [key: string]: unknown
}

interface Props {
  scholarship: Scholarship | null
}

const TYPES = ['entrance', 'merit', 'needs', 'government']

export function ScholarshipForm({ scholarship }: Props) {
  const router = useRouter()
  const isNew  = !scholarship

  const [nameEn,        setNameEn]        = useState(scholarship?.name_en        ?? '')
  const [nameFr,        setNameFr]        = useState(scholarship?.name_fr        ?? '')
  const [funderName,    setFunderName]    = useState(scholarship?.funder_name    ?? '')
  const [amountMin,     setAmountMin]     = useState(scholarship?.amount_min?.toString()  ?? '')
  const [amountMax,     setAmountMax]     = useState(scholarship?.amount_max?.toString()  ?? '')
  const [type,          setType]          = useState(scholarship?.type           ?? '')
  const [deadline,      setDeadline]      = useState(scholarship?.deadline       ?? '')
  const [descriptionEn, setDescriptionEn] = useState(scholarship?.description_en ?? '')
  const [isPublished,   setIsPublished]   = useState(scholarship?.is_published   ?? false)

  const [saving,  setSaving]  = useState(false)
  const [error,   setError]   = useState('')
  const [success, setSuccess] = useState('')

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (!nameEn.trim()) { setError('English name is required.'); return }

    setSaving(true)
    setError('')
    setSuccess('')

    try {
      const body = {
        name_en:        nameEn.trim(),
        name_fr:        nameFr.trim()        || null,
        funder_name:    funderName.trim()    || null,
        amount_min:     amountMin !== ''     ? Number(amountMin)  : null,
        amount_max:     amountMax !== ''     ? Number(amountMax)  : null,
        type:           type                 || null,
        deadline:       deadline.trim()      || null,
        description_en: descriptionEn.trim() || null,
        is_published:   isPublished,
      }

      const url    = isNew ? '/api/admin/scholarships' : `/api/admin/scholarships/${scholarship!.id}`
      const method = isNew ? 'POST' : 'PATCH'

      const res = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body),
      })

      if (!res.ok) {
        const data = await res.json().catch(() => ({}))
        throw new Error(data.error ?? 'Save failed.')
      }

      setSuccess(isNew ? 'Scholarship created.' : 'Saved.')
      if (isNew) {
        const data = await res.json()
        router.push(`/scholarships/${data.id}`)
      }
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : 'Save failed.')
    } finally {
      setSaving(false)
    }
  }

  async function handleDelete() {
    if (!scholarship) return
    if (!confirm(`Delete "${scholarship.name_en}"? This cannot be undone.`)) return

    setSaving(true)
    setError('')

    try {
      const res = await fetch(`/api/admin/scholarships/${scholarship.id}`, { method: 'DELETE' })
      if (!res.ok) throw new Error('Delete failed.')
      router.push('/scholarships')
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : 'Delete failed.')
      setSaving(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} className={styles.form}>
      {error   && <div className={styles.errorBanner}>{error}</div>}
      {success && <div className={styles.successBanner}>{success}</div>}

      <div className={styles.grid}>
        <div className={styles.field}>
          <label className={styles.label} htmlFor="nameEn">Name (English) *</label>
          <input id="nameEn" className={styles.input} value={nameEn} onChange={e => setNameEn(e.target.value)} required />
        </div>

        <div className={styles.field}>
          <label className={styles.label} htmlFor="nameFr">Name (French)</label>
          <input id="nameFr" className={styles.input} value={nameFr} onChange={e => setNameFr(e.target.value)} placeholder="For future bilingual rollout" />
        </div>

        <div className={styles.field}>
          <label className={styles.label} htmlFor="funderName">Funder name</label>
          <input id="funderName" className={styles.input} value={funderName} onChange={e => setFunderName(e.target.value)} placeholder="e.g. Government of Canada" />
        </div>

        <div className={styles.field}>
          <label className={styles.label} htmlFor="type">Type</label>
          <select id="type" className={styles.select} value={type} onChange={e => setType(e.target.value)}>
            <option value="">— Select —</option>
            {TYPES.map(t => <option key={t} value={t}>{t}</option>)}
          </select>
        </div>

        <div className={styles.field}>
          <label className={styles.label} htmlFor="amountMin">Amount min ($)</label>
          <input id="amountMin" className={styles.input} type="number" min="0" value={amountMin} onChange={e => setAmountMin(e.target.value)} placeholder="e.g. 500" />
        </div>

        <div className={styles.field}>
          <label className={styles.label} htmlFor="amountMax">Amount max ($)</label>
          <input id="amountMax" className={styles.input} type="number" min="0" value={amountMax} onChange={e => setAmountMax(e.target.value)} placeholder="e.g. 5000" />
        </div>

        <div className={styles.field}>
          <label className={styles.label} htmlFor="deadline">Deadline</label>
          <input id="deadline" className={styles.input} value={deadline} onChange={e => setDeadline(e.target.value)} placeholder="e.g. 2027-02-01" />
        </div>
      </div>

      <div className={styles.field}>
        <label className={styles.label} htmlFor="descriptionEn">Description (English)</label>
        <textarea
          id="descriptionEn"
          className={styles.textarea}
          value={descriptionEn}
          onChange={e => setDescriptionEn(e.target.value)}
          rows={5}
          placeholder="Describe the scholarship, eligibility criteria, etc."
        />
      </div>

      <label className={styles.checkLabel}>
        <input
          type="checkbox"
          className={styles.check}
          checked={isPublished}
          onChange={e => setIsPublished(e.target.checked)}
        />
        Published (visible on site)
      </label>

      <div className={styles.formFooter}>
        <button type="submit" className={styles.saveBtn} disabled={saving}>
          {saving ? 'Saving…' : isNew ? 'Create scholarship' : 'Save changes'}
        </button>

        {!isNew && (
          <button type="button" className={styles.deleteBtn} onClick={handleDelete} disabled={saving}>
            Delete
          </button>
        )}
      </div>
    </form>
  )
}
