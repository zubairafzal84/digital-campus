'use client'

import { useState, useMemo } from 'react'
import Link from 'next/link'
import { CLUBS, UNIVERSITIES, ALL_CATEGORIES } from './clubs-data'
import type { ClubCategory } from './clubs-data'
import styles from './clubs.module.css'

export default function ClubsClient() {
  const [selectedUniversity, setSelectedUniversity] = useState('')
  const [selectedCategory, setSelectedCategory] = useState<ClubCategory | ''>('')

  const filtered = useMemo(() => {
    return CLUBS.filter((club) => {
      const uMatch = !selectedUniversity || club.universitySlug === selectedUniversity
      const cMatch = !selectedCategory || club.category === selectedCategory
      return uMatch && cMatch
    })
  }, [selectedUniversity, selectedCategory])

  const categoryCounts = useMemo(() => {
    const source = selectedUniversity
      ? CLUBS.filter((c) => c.universitySlug === selectedUniversity)
      : CLUBS
    return ALL_CATEGORIES.reduce<Record<string, number>>((acc, cat) => {
      acc[cat] = source.filter((c) => c.category === cat).length
      return acc
    }, {})
  }, [selectedUniversity])

  return (
    <>
      <section className={styles.filters}>
        <div className={styles.inner}>
          <div className={styles.filterRow}>
            <select
              className={styles.schoolSelect}
              value={selectedUniversity}
              onChange={(e) => {
                setSelectedUniversity(e.target.value)
                setSelectedCategory('')
              }}
              aria-label="Filter by school"
            >
              <option value="">All schools</option>
              {UNIVERSITIES.map((u) => (
                <option key={u.slug} value={u.slug}>{u.name}</option>
              ))}
            </select>
          </div>
          <div className={styles.chips}>
            <button
              className={`${styles.chip} ${selectedCategory === '' ? styles.chipActive : ''}`}
              onClick={() => setSelectedCategory('')}
            >
              All categories
            </button>
            {ALL_CATEGORIES.map((cat) => {
              const count = categoryCounts[cat] ?? 0
              if (count === 0) return null
              return (
                <button
                  key={cat}
                  className={`${styles.chip} ${selectedCategory === cat ? styles.chipActive : ''}`}
                  onClick={() => setSelectedCategory(cat === selectedCategory ? '' : cat)}
                >
                  {cat} <span className={styles.chipCount}>{count}</span>
                </button>
              )
            })}
          </div>
        </div>
      </section>

      <section className={styles.grid_section}>
        <div className={styles.inner}>
          <p className={styles.count}>
            {filtered.length} club{filtered.length !== 1 ? 's' : ''} shown
            {selectedUniversity || selectedCategory
              ? ' · '
              : ' · '}
            <Link href="/clubs/register" className={styles.registerLink}>Register your club →</Link>
          </p>
          {filtered.length === 0 ? (
            <p className={styles.empty}>No clubs match your filters. <button className={styles.clearBtn} onClick={() => { setSelectedUniversity(''); setSelectedCategory('') }}>Clear filters</button></p>
          ) : (
            <div className={styles.grid}>
              {filtered.map((club) => (
                <Link key={club.id} href={`/clubs/${club.id}`} className={styles.card}>
                  <div className={styles.cardHeader}>
                    <div className={styles.icon}>{club.name.charAt(0)}</div>
                    <span className={styles.category}>{club.category}</span>
                  </div>
                  <h2 className={styles.clubName}>{club.name}</h2>
                  <p className={styles.schoolTag}>{club.university}</p>
                  <p className={styles.desc}>{club.description}</p>
                  <div className={styles.cardFooter}>
                    <div className={styles.meta}>
                      <span className={styles.members}>{club.members.toLocaleString('en-CA')} members</span>
                      {club.nextEvent && <span className={styles.event}>Next: {club.nextEvent}</span>}
                    </div>
                    <span className={styles.joinBtn}>View club →</span>
                  </div>
                </Link>
              ))}
            </div>
          )}
        </div>
      </section>
    </>
  )
}
