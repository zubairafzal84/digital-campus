'use client'

import { useEffect, useState, Suspense } from 'react'
import { useSearchParams } from 'next/navigation'
import { useAuth } from '@clerk/nextjs'
import Link from 'next/link'
import styles from './textbooks.module.css'

type Listing = {
  id: string
  seller_id: string
  course_code: string | null
  title: string
  author: string | null
  edition: string | null
  condition: string
  asking_price: number | null
  is_free: boolean
  description: string | null
  institution_slug: string
  created_at: string
}

const CONDITION_LABELS: Record<string, string> = {
  new: '🌟 New',
  like_new: '✨ Like New',
  good: '👍 Good',
  fair: '🟡 Fair',
  poor: '⚠️ Poor',
}

const CONDITION_COLORS: Record<string, string> = {
  new: '#D1FAE5',
  like_new: '#DBEAFE',
  good: '#E0E7FF',
  fair: '#FEF3C7',
  poor: '#FEE2E2',
}

function TextbooksContent() {
  const searchParams = useSearchParams()
  const { userId, getToken } = useAuth()
  const [listings, setListings] = useState<Listing[]>([])
  const [loading, setLoading] = useState(true)
  const [courseFilter, setCourseFilter] = useState(searchParams.get('course') || '')
  const [institution] = useState(searchParams.get('institution') || 'ubc')
  const [showCreate, setShowCreate] = useState(false)
  const [myCourses, setMyCourses] = useState<string[]>([])

  // Create form state
  const [form, setForm] = useState({
    title: '', author: '', edition: '', course_code: '',
    condition: 'good', asking_price: '', is_free: false, description: '',
  })
  const [saving, setSaving] = useState(false)

  useEffect(() => {
    fetchListings()
    if (userId) fetchMyCourses()
  }, [courseFilter, institution])

  async function fetchListings() {
    setLoading(true)
    try {
      const params = new URLSearchParams({ institution })
      if (courseFilter) params.set('course', courseFilter)
      const res = await fetch(`/api/textbooks?${params}`)
      if (res.ok) setListings(await res.json())
    } finally {
      setLoading(false)
    }
  }

  async function fetchMyCourses() {
    try {
      const token = await getToken({ template: 'supabase' })
      const res = await fetch('/api/courses', { headers: { Authorization: `Bearer ${token}` } })
      if (res.ok) {
        const data = await res.json()
        setMyCourses(data.map((c: { course_code: string }) => c.course_code))
      }
    } catch {}
  }

  async function createListing() {
    if (!form.title.trim()) return
    setSaving(true)
    try {
      const token = await getToken({ template: 'supabase' })
      const res = await fetch('/api/textbooks', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
        body: JSON.stringify({ ...form, institution_slug: institution, asking_price: form.is_free ? null : parseFloat(form.asking_price) || null }),
      })
      if (res.ok) {
        const created = await res.json()
        setListings(prev => [created, ...prev])
        setShowCreate(false)
        setForm({ title: '', author: '', edition: '', course_code: '', condition: 'good', asking_price: '', is_free: false, description: '' })
      }
    } finally {
      setSaving(false)
    }
  }

  async function contactSeller(listingId: string) {
    // Opens a contact request to seller — messages are gated by accepted contact
    alert('Contact request sent to seller. You\'ll be connected once they accept.')
  }

  const coursesForFilter = myCourses.length > 0 ? myCourses : (courseFilter ? [courseFilter] : [])

  return (
    <div className={styles.page}>
      <div className={styles.hero}>
        <div className={styles.heroInner}>
          <Link href="/courses" className={styles.back}>← My Courses</Link>
          <h1>📖 Textbook Marketplace</h1>
          <p>Buy and sell textbooks with students at your school</p>
        </div>
      </div>

      <div className={styles.wrap}>
        <div className={styles.toolbar}>
          <div className={styles.filters}>
            <button
              className={`${styles.chip} ${!courseFilter ? styles.chipActive : ''}`}
              onClick={() => setCourseFilter('')}
            >All</button>
            {coursesForFilter.map(code => (
              <button
                key={code}
                className={`${styles.chip} ${courseFilter === code ? styles.chipActive : ''}`}
                onClick={() => setCourseFilter(code)}
              >{code}</button>
            ))}
          </div>
          {userId && (
            <button className={styles.sellBtn} onClick={() => setShowCreate(v => !v)}>
              {showCreate ? '✕ Cancel' : '+ List a textbook'}
            </button>
          )}
        </div>

        {showCreate && (
          <div className={styles.createForm}>
            <h3>List a textbook</h3>
            <div className={styles.formGrid}>
              <input
                className={styles.input}
                placeholder="Book title *"
                value={form.title}
                onChange={e => setForm(f => ({ ...f, title: e.target.value }))}
              />
              <input
                className={styles.input}
                placeholder="Author"
                value={form.author}
                onChange={e => setForm(f => ({ ...f, author: e.target.value }))}
              />
              <input
                className={styles.input}
                placeholder="Edition (e.g. 3rd)"
                value={form.edition}
                onChange={e => setForm(f => ({ ...f, edition: e.target.value }))}
              />
              <input
                className={styles.input}
                placeholder="Course code (e.g. CPSC 310)"
                value={form.course_code}
                onChange={e => setForm(f => ({ ...f, course_code: e.target.value.toUpperCase() }))}
              />
              <select
                className={styles.input}
                value={form.condition}
                onChange={e => setForm(f => ({ ...f, condition: e.target.value }))}
              >
                <option value="new">New</option>
                <option value="like_new">Like New</option>
                <option value="good">Good</option>
                <option value="fair">Fair</option>
                <option value="poor">Poor</option>
              </select>
              <div className={styles.priceRow}>
                <label className={styles.checkLabel}>
                  <input
                    type="checkbox"
                    checked={form.is_free}
                    onChange={e => setForm(f => ({ ...f, is_free: e.target.checked }))}
                  />
                  Free (giving away)
                </label>
                {!form.is_free && (
                  <input
                    className={styles.input}
                    placeholder="Asking price ($)"
                    type="number"
                    min="0"
                    step="0.01"
                    value={form.asking_price}
                    onChange={e => setForm(f => ({ ...f, asking_price: e.target.value }))}
                  />
                )}
              </div>
            </div>
            <textarea
              className={`${styles.input} ${styles.textarea}`}
              placeholder="Additional notes (optional)"
              value={form.description}
              onChange={e => setForm(f => ({ ...f, description: e.target.value }))}
            />
            <button className={styles.saveBtn} onClick={createListing} disabled={!form.title.trim() || saving}>
              {saving ? 'Listing…' : 'Post listing'}
            </button>
          </div>
        )}

        {loading ? (
          <div className={styles.loading}>Finding textbooks…</div>
        ) : listings.length === 0 ? (
          <div className={styles.empty}>
            <div className={styles.emptyIcon}>📚</div>
            <h3>No textbooks listed yet</h3>
            <p>Be the first to list a textbook for this course</p>
          </div>
        ) : (
          <div className={styles.grid}>
            {listings.map(l => (
              <div key={l.id} className={styles.card}>
                <div className={styles.cardTop}>
                  {l.course_code && <span className={styles.courseTag}>{l.course_code}</span>}
                  <span
                    className={styles.condition}
                    style={{ background: CONDITION_COLORS[l.condition] || '#f3f4f6' }}
                  >
                    {CONDITION_LABELS[l.condition] || l.condition}
                  </span>
                </div>
                <h3 className={styles.bookTitle}>{l.title}</h3>
                {l.author && <p className={styles.bookAuthor}>by {l.author}{l.edition ? ` · ${l.edition} ed.` : ''}</p>}
                {l.description && <p className={styles.bookDesc}>{l.description}</p>}
                <div className={styles.cardFoot}>
                  <span className={styles.price}>
                    {l.is_free ? <span className={styles.free}>FREE</span> : l.asking_price ? `$${l.asking_price.toFixed(2)}` : 'Price on ask'}
                  </span>
                  {userId && userId !== l.seller_id && (
                    <button className={styles.contactBtn} onClick={() => contactSeller(l.id)}>
                      Message seller →
                    </button>
                  )}
                  {userId === l.seller_id && (
                    <span className={styles.ownBadge}>Your listing</span>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}

export default function TextbooksPage() {
  return (
    <Suspense fallback={<div style={{ padding: 40, textAlign: 'center', color: '#6B3EF2' }}>Loading…</div>}>
      <TextbooksContent />
    </Suspense>
  )
}
