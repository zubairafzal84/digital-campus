'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import styles from './edit.module.css'

interface Institution {
  id:           string
  name_en:      string
  name_fr:      string | null
  slug:         string | null
  province:     string | null
  type:         string | null
  website:      string | null
  is_published: boolean
  [key: string]: unknown
}

interface Props {
  institution: Institution | null
}

const PROVINCES = [
  'AB', 'BC', 'MB', 'NB', 'NL', 'NS', 'NT', 'NU',
  'ON', 'PE', 'QC', 'SK', 'YT',
]

const TYPES = ['university', 'college', 'polytechnic', 'institute']

export function InstitutionForm({ institution }: Props) {
  const router = useRouter()
  const isNew  = !institution

  const [nameEn,      setNameEn]      = useState(institution?.name_en      ?? '')
  const [nameFr,      setNameFr]      = useState(institution?.name_fr      ?? '')
  const [slug,        setSlug]        = useState(institution?.slug         ?? '')
  const [province,    setProvince]    = useState(institution?.province     ?? '')
  const [type,        setType]        = useState(institution?.type         ?? '')
  const [website,     setWebsite]     = useState(institution?.website      ?? '')
  const [isPublished, setIsPublished] = useState(institution?.is_published ?? false)

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
        name_en:      nameEn.trim(),
        name_fr:      nameFr.trim() || null,
        slug:         slug.trim()   || null,
        province:     province      || null,
        type:         type          || null,
        website:      website.trim() || null,
        is_published: isPublished,
      }

      const url    = isNew ? '/api/admin/institutions' : `/api/admin/institutions/${institution!.id}`
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

      setSuccess(isNew ? 'Institution created.' : 'Saved.')
      if (isNew) {
        const data = await res.json()
        router.push(`/institutions/${data.id}`)
      }
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : 'Save failed.')
    } finally {
      setSaving(false)
    }
  }

  async function handleDelete() {
    if (!institution) return
    if (!confirm(`Delete "${institution.name_en}"? This cannot be undone.`)) return

    setSaving(true)
    setError('')

    try {
      const res = await fetch(`/api/admin/institutions/${institution.id}`, { method: 'DELETE' })
      if (!res.ok) throw new Error('Delete failed.')
      router.push('/institutions')
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
          <label className={styles.label} htmlFor="slug">URL slug</label>
          <input id="slug" className={styles.input} value={slug} onChange={e => setSlug(e.target.value.toLowerCase().replace(/\s+/g, '-'))} placeholder="e.g. ubc" />
        </div>

        <div className={styles.field}>
          <label className={styles.label} htmlFor="website">Website</label>
          <input id="website" className={styles.input} type="url" value={website} onChange={e => setWebsite(e.target.value)} placeholder="https://…" />
        </div>

        <div className={styles.field}>
          <label className={styles.label} htmlFor="province">Province</label>
          <select id="province" className={styles.select} value={province} onChange={e => setProvince(e.target.value)}>
            <option value="">— Select —</option>
            {PROVINCES.map(p => <option key={p} value={p}>{p}</option>)}
          </select>
        </div>

        <div className={styles.field}>
          <label className={styles.label} htmlFor="type">Type</label>
          <select id="type" className={styles.select} value={type} onChange={e => setType(e.target.value)}>
            <option value="">— Select —</option>
            {TYPES.map(t => <option key={t} value={t}>{t}</option>)}
          </select>
        </div>
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
          {saving ? 'Saving…' : isNew ? 'Create institution' : 'Save changes'}
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
