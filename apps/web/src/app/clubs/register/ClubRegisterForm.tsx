'use client'

import { useState, FormEvent } from 'react'
import Link from 'next/link'
import styles from './register.module.css'

interface FormData {
  clubName: string
  school: string
  category: string
  members: string
  description: string
  meetSchedule: string
  website: string
  contactName: string
  contactEmail: string
  terms: boolean
}

const INITIAL: FormData = {
  clubName: '',
  school: '',
  category: '',
  members: '',
  description: '',
  meetSchedule: '',
  website: '',
  contactName: '',
  contactEmail: '',
  terms: false,
}

export default function ClubRegisterForm() {
  const [formData, setFormData] = useState<FormData>(INITIAL)
  const [submitting, setSubmitting] = useState(false)
  const [success, setSuccess] = useState(false)
  const [error, setError] = useState<string | null>(null)

  function handleChange(
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) {
    const { name, value, type } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? (e.target as HTMLInputElement).checked : value,
    }))
  }

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setSubmitting(true)
    setError(null)

    try {
      const res = await fetch('/api/clubs/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      })

      const json = await res.json()

      if (!res.ok) {
        setError(json.error ?? 'Something went wrong. Please try again.')
        setSubmitting(false)
        return
      }

      setSuccess(true)
    } catch {
      setError('Network error. Please check your connection and try again.')
      setSubmitting(false)
    }
  }

  if (success) {
    return (
      <div className={styles.successMessage}>
        <p>Your club has been submitted for review. We will be in touch within 3-5 business days.</p>
      </div>
    )
  }

  return (
    <form className={styles.form} onSubmit={handleSubmit} noValidate>
      <h2 className={styles.formH}>Club details</h2>

      <div className={styles.field}>
        <label className={styles.label} htmlFor="clubName">Club / organization name <span aria-hidden>*</span></label>
        <input
          id="clubName"
          name="clubName"
          type="text"
          required
          className={styles.input}
          placeholder="e.g. UBC Robotics Club"
          value={formData.clubName}
          onChange={handleChange}
        />
      </div>

      <div className={styles.field}>
        <label className={styles.label} htmlFor="school">School <span aria-hidden>*</span></label>
        <input
          id="school"
          name="school"
          type="text"
          required
          className={styles.input}
          list="schools-list"
          placeholder="Start typing your school…"
          value={formData.school}
          onChange={handleChange}
        />
        <datalist id="schools-list">
          <option value="University of British Columbia" />
          <option value="Simon Fraser University" />
          <option value="University of Toronto" />
          <option value="McGill University" />
          <option value="University of Waterloo" />
        </datalist>
      </div>

      <div className={styles.fieldRow}>
        <div className={styles.field}>
          <label className={styles.label} htmlFor="category">Category <span aria-hidden>*</span></label>
          <select
            id="category"
            name="category"
            required
            className={styles.input}
            value={formData.category}
            onChange={handleChange}
          >
            <option value="">Select one…</option>
            <option>Academic</option>
            <option>Arts &amp; Culture</option>
            <option>Athletics &amp; Fitness</option>
            <option>Community &amp; Volunteering</option>
            <option>Cultural &amp; International</option>
            <option>Environmental</option>
            <option>Professional &amp; Career</option>
            <option>Social &amp; Networking</option>
            <option>Technology &amp; Engineering</option>
            <option>Other</option>
          </select>
        </div>
        <div className={styles.field}>
          <label className={styles.label} htmlFor="members">Current members</label>
          <input
            id="members"
            name="members"
            type="number"
            min="1"
            className={styles.input}
            placeholder="e.g. 45"
            value={formData.members}
            onChange={handleChange}
          />
        </div>
      </div>

      <div className={styles.field}>
        <label className={styles.label} htmlFor="description">Description <span aria-hidden>*</span></label>
        <textarea
          id="description"
          name="description"
          required
          rows={4}
          className={styles.textarea}
          placeholder="Tell students what your club does, who it's for, and what they'll get out of joining."
          value={formData.description}
          onChange={handleChange}
        />
      </div>

      <div className={styles.field}>
        <label className={styles.label} htmlFor="meetSchedule">Meeting schedule</label>
        <input
          id="meetSchedule"
          name="meetSchedule"
          type="text"
          className={styles.input}
          placeholder="e.g. Every Tuesday at 6 PM in ICCS 246"
          value={formData.meetSchedule}
          onChange={handleChange}
        />
      </div>

      <div className={styles.field}>
        <label className={styles.label} htmlFor="website">Club website or social link</label>
        <input
          id="website"
          name="website"
          type="url"
          className={styles.input}
          placeholder="https://…"
          value={formData.website}
          onChange={handleChange}
        />
      </div>

      <h2 className={styles.formH} style={{ marginTop: 12 }}>Your contact information</h2>

      <div className={styles.fieldRow}>
        <div className={styles.field}>
          <label className={styles.label} htmlFor="contactName">Your name <span aria-hidden>*</span></label>
          <input
            id="contactName"
            name="contactName"
            type="text"
            required
            className={styles.input}
            value={formData.contactName}
            onChange={handleChange}
          />
        </div>
        <div className={styles.field}>
          <label className={styles.label} htmlFor="contactEmail">School email <span aria-hidden>*</span></label>
          <input
            id="contactEmail"
            name="contactEmail"
            type="email"
            required
            className={styles.input}
            placeholder="you@student.yourschool.ca"
            value={formData.contactEmail}
            onChange={handleChange}
          />
        </div>
      </div>

      <div className={styles.checkField}>
        <input
          id="terms"
          name="terms"
          type="checkbox"
          required
          className={styles.check}
          checked={formData.terms}
          onChange={handleChange}
        />
        <label htmlFor="terms" className={styles.checkLabel}>
          I confirm this is an official or recognized club at my institution. I agree to the{' '}
          <Link href="/terms" className={styles.link}>Terms of Service</Link>.
        </label>
      </div>

      {error && <p className={styles.errorMessage} role="alert">{error}</p>}

      <button type="submit" className={styles.submitBtn} disabled={submitting}>
        {submitting ? 'Submitting…' : 'Submit for review'}
      </button>
      <p className={styles.note}>We typically review submissions within 2 business days.</p>
    </form>
  )
}
