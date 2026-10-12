'use client'

import { useState, useEffect, useMemo, Suspense } from 'react'
import { useSearchParams } from 'next/navigation'
import Link from 'next/link'
import { SiteNav } from '@/components/layout/SiteNav'
import { SiteFooter } from '@/components/layout/SiteFooter'
import { SCHOLARSHIPS } from './scholarships-data'
import type { Scholarship } from './scholarships-data'
import styles from './scholarships.module.css'

const FUNDER_TABS = [
  { value: 'all', label: 'All' },
  { value: 'federal', label: 'Federal' },
  { value: 'provincial', label: 'Provincial' },
  { value: 'institutional', label: 'Institutional' },
  { value: 'private', label: 'Private' },
  { value: 'indigenous', label: 'Indigenous' },
] as const

const PROVINCES = [
  { value: 'all', label: 'All Provinces' },
  { value: 'AB', label: 'Alberta' },
  { value: 'BC', label: 'British Columbia' },
  { value: 'MB', label: 'Manitoba' },
  { value: 'NB', label: 'New Brunswick' },
  { value: 'NL', label: 'Newfoundland & Labrador' },
  { value: 'NS', label: 'Nova Scotia' },
  { value: 'NT', label: 'Northwest Territories' },
  { value: 'NU', label: 'Nunavut' },
  { value: 'ON', label: 'Ontario' },
  { value: 'PE', label: 'Prince Edward Island' },
  { value: 'QC', label: 'Quebec' },
  { value: 'SK', label: 'Saskatchewan' },
  { value: 'YT', label: 'Yukon' },
]

const YEARS = [
  { value: 'any', label: 'Any Year' },
  { value: '1', label: '1st Year' },
  { value: '2', label: '2nd Year' },
  { value: '3', label: '3rd Year' },
  { value: '4', label: '4th Year' },
  { value: 'graduate', label: 'Graduate' },
]

const FIELDS = [
  { value: 'any', label: 'Any Field' },
  { value: 'engineering-tech', label: 'Engineering / Tech' },
  { value: 'sciences', label: 'Sciences' },
  { value: 'arts-humanities', label: 'Arts / Humanities' },
  { value: 'business', label: 'Business' },
  { value: 'health-medicine', label: 'Health / Medicine' },
  { value: 'education', label: 'Education' },
  { value: 'law', label: 'Law' },
  { value: 'indigenous-studies', label: 'Indigenous Studies' },
]

const AMOUNTS = [
  { value: 'any', label: 'Any Amount' },
  { value: 'under5k', label: 'Under $5k' },
  { value: '5k-20k', label: '$5k–$20k' },
  { value: '20k-50k', label: '$20k–$50k' },
  { value: '50k+', label: '$50k+' },
]

const NEED_OPTIONS = [
  { value: 'any', label: 'Any' },
  { value: 'required', label: 'Required' },
  { value: 'not_required', label: 'Not required' },
]

const BADGE_CLASS: Record<string, string> = {
  federal: styles.cardBadgeFederal,
  provincial: styles.cardBadgeProvincial,
  institutional: styles.cardBadgeInstitutional,
  private: styles.cardBadgePrivate,
  indigenous: styles.cardBadgeIndigenous,
}

const FUNDER_LABEL: Record<string, string> = {
  federal: 'Federal',
  provincial: 'Provincial',
  institutional: 'Institutional',
  private: 'Private',
  indigenous: 'Indigenous',
}

function isUpcoming(deadlineISO: string | null): boolean {
  if (!deadlineISO) return false
  try {
    const deadline = new Date(deadlineISO)
    const now = new Date()
    const in90 = new Date(now.getTime() + 90 * 24 * 60 * 60 * 1000)
    return deadline >= now && deadline <= in90
  } catch { return false }
}

function isRecommended(
  s: Scholarship,
  province: string,
  year: string,
  field: string,
): boolean {
  if (!province && !year && !field) return false
  if (province) {
    if (!s.provinces.includes('all') && !s.provinces.includes(province)) return false
  }
  if (year) {
    if (!s.yearOfStudy.includes('any') && !s.yearOfStudy.includes(year)) return false
  }
  if (field) {
    if (!s.fieldOfStudy.includes('any') && !s.fieldOfStudy.includes(field)) return false
  }
  return true
}

function ScholarshipsContent() {
  const searchParams = useSearchParams()

  const [personalProvince, setPersonalProvince] = useState('')
  const [personalYear, setPersonalYear]         = useState('')
  const [personalField, setPersonalField]       = useState('')

  const [activeTab,      setActiveTab]      = useState('all')
  const [filterProvince, setFilterProvince] = useState('all')
  const [filterYear,     setFilterYear]     = useState('any')
  const [filterField,    setFilterField]    = useState('any')
  const [filterAmount,   setFilterAmount]   = useState('any')
  const [filterNeed,     setFilterNeed]     = useState('any')
  const [filterDeadline, setFilterDeadline] = useState('any')
  const [filterOpen,     setFilterOpen]     = useState(false)

  useEffect(() => {
    try {
      const prov = localStorage.getItem('dk_sch_province') || searchParams.get('province') || ''
      const yr   = localStorage.getItem('dk_sch_year')     || searchParams.get('year')     || ''
      const fld  = localStorage.getItem('dk_sch_field')    || searchParams.get('field')    || ''
      setPersonalProvince(prov)
      setPersonalYear(yr)
      setPersonalField(fld)
      if (prov) setFilterProvince(prov)
      if (yr)   setFilterYear(yr)
      if (fld)  setFilterField(fld)
    } catch { /* storage blocked */ }
  }, [searchParams])

  function saveLocal(prov: string, yr: string, fld: string) {
    try {
      prov ? localStorage.setItem('dk_sch_province', prov) : localStorage.removeItem('dk_sch_province')
      yr   ? localStorage.setItem('dk_sch_year',     yr)   : localStorage.removeItem('dk_sch_year')
      fld  ? localStorage.setItem('dk_sch_field',    fld)  : localStorage.removeItem('dk_sch_field')
    } catch { /* */ }
  }

  function handleProv(v: string) {
    setPersonalProvince(v)
    setFilterProvince(v || 'all')
    saveLocal(v, personalYear, personalField)
  }
  function handleYear(v: string) {
    setPersonalYear(v)
    setFilterYear(v || 'any')
    saveLocal(personalProvince, v, personalField)
  }
  function handleField(v: string) {
    setPersonalField(v)
    setFilterField(v || 'any')
    saveLocal(personalProvince, personalYear, v)
  }

  const filtered = useMemo(() => {
    return SCHOLARSHIPS.filter(s => {
      if (activeTab !== 'all' && s.funderType !== activeTab) return false
      if (filterProvince !== 'all' && !s.provinces.includes('all') && !s.provinces.includes(filterProvince)) return false
      if (filterYear !== 'any' && !s.yearOfStudy.includes('any') && !s.yearOfStudy.includes(filterYear)) return false
      if (filterField !== 'any' && !s.fieldOfStudy.includes('any') && !s.fieldOfStudy.includes(filterField)) return false
      if (filterAmount !== 'any') {
        if (filterAmount === 'under5k'  && s.amountMax >= 5000)                                         return false
        if (filterAmount === '5k-20k'   && (s.amountMax < 5000  || s.amountMin > 20000))               return false
        if (filterAmount === '20k-50k'  && (s.amountMax < 20000 || s.amountMin > 50000))               return false
        if (filterAmount === '50k+'     && s.amountMax < 50000)                                         return false
      }
      if (filterNeed !== 'any' && s.financialNeed !== filterNeed) return false
      if (filterDeadline === 'upcoming' && !isUpcoming(s.deadlineISO)) return false
      return true
    })
  }, [activeTab, filterProvince, filterYear, filterField, filterAmount, filterNeed, filterDeadline])

  const hasPersonal = personalProvince !== '' || personalYear !== '' || personalField !== ''

  function resetAll() {
    setActiveTab('all')
    setFilterProvince('all')
    setFilterYear('any')
    setFilterField('any')
    setFilterAmount('any')
    setFilterNeed('any')
    setFilterDeadline('any')
  }

  return (
    <>
      <SiteNav />
      <main>
        {/* ── Hero ── */}
        <section className={styles.hero}>
          <div className={styles.inner}>
            <nav className={styles.breadcrumb} aria-label="Breadcrumb">
              <Link href="/">Home</Link>
              <span> › </span>
              <span aria-current="page">Scholarships</span>
            </nav>
            <div className={styles.heroContent}>
              <div>
                <h1 className={styles.h1}>
                  Find Your<br />
                  <span className={styles.hi}>Scholarship</span>
                </h1>
                <p className={styles.sub}>
                  80+ Canadian scholarships from federal, provincial, institutional and private sources.
                </p>
              </div>
              <Link href="/signup" className={styles.ctaBtn}>
                Get personalized matches →
              </Link>
            </div>
          </div>
        </section>

        {/* ── Personalize Widget ── */}
        <section className={styles.personalizeSection}>
          <div className={styles.inner}>
            <div className={styles.personalizeWidget}>
              <span className={styles.personalizeLabel}>Personalize results:</span>
              <select
                className={styles.personalizeSelect}
                value={personalProvince}
                onChange={e => handleProv(e.target.value)}
                aria-label="Your province"
              >
                <option value="">Province</option>
                {PROVINCES.slice(1).map(p => (
                  <option key={p.value} value={p.value}>{p.label}</option>
                ))}
              </select>
              <select
                className={styles.personalizeSelect}
                value={personalYear}
                onChange={e => handleYear(e.target.value)}
                aria-label="Year of study"
              >
                <option value="">Year of Study</option>
                {YEARS.slice(1).map(y => (
                  <option key={y.value} value={y.value}>{y.label}</option>
                ))}
              </select>
              <select
                className={styles.personalizeSelect}
                value={personalField}
                onChange={e => handleField(e.target.value)}
                aria-label="Field of study"
              >
                <option value="">Field of Study</option>
                {FIELDS.slice(1).map(f => (
                  <option key={f.value} value={f.value}>{f.label}</option>
                ))}
              </select>
              {hasPersonal && (
                <button
                  className={styles.clearPersonalize}
                  onClick={() => {
                    setPersonalProvince('')
                    setPersonalYear('')
                    setPersonalField('')
                    setFilterProvince('all')
                    setFilterYear('any')
                    setFilterField('any')
                    saveLocal('', '', '')
                  }}
                >
                  Clear
                </button>
              )}
            </div>
          </div>
        </section>

        {/* ── Tabs ── */}
        <section className={styles.tabsSection}>
          <div className={styles.inner}>
            <div className={styles.tabs} role="tablist" aria-label="Filter by scholarship type">
              {FUNDER_TABS.map(tab => (
                <button
                  key={tab.value}
                  role="tab"
                  aria-selected={activeTab === tab.value}
                  className={`${styles.tab}${activeTab === tab.value ? ` ${styles.tabActive}` : ''}`}
                  onClick={() => setActiveTab(tab.value)}
                >
                  {tab.label}
                </button>
              ))}
            </div>
          </div>
        </section>

        {/* ── Filter Bar ── */}
        <section className={styles.filterSection}>
          <div className={styles.inner}>
            <button
              className={styles.filterToggle}
              onClick={() => setFilterOpen(o => !o)}
              aria-expanded={filterOpen}
              aria-controls="filter-bar"
            >
              <span>More filters</span>
              <span aria-hidden>{filterOpen ? '▲' : '▼'}</span>
            </button>
            <div
              id="filter-bar"
              className={`${styles.filterBar}${filterOpen ? ` ${styles.filterBarOpen}` : ''}`}
            >
              <div className={styles.filterRow}>
                <label className={styles.filterLabel} htmlFor="fp">Province</label>
                <select id="fp" className={styles.filterSelect} value={filterProvince} onChange={e => setFilterProvince(e.target.value)}>
                  {PROVINCES.map(p => <option key={p.value} value={p.value}>{p.label}</option>)}
                </select>
              </div>
              <div className={styles.filterRow}>
                <label className={styles.filterLabel} htmlFor="fy">Year of Study</label>
                <select id="fy" className={styles.filterSelect} value={filterYear} onChange={e => setFilterYear(e.target.value)}>
                  {YEARS.map(y => <option key={y.value} value={y.value}>{y.label}</option>)}
                </select>
              </div>
              <div className={styles.filterRow}>
                <label className={styles.filterLabel} htmlFor="ff">Field of Study</label>
                <select id="ff" className={styles.filterSelect} value={filterField} onChange={e => setFilterField(e.target.value)}>
                  {FIELDS.map(f => <option key={f.value} value={f.value}>{f.label}</option>)}
                </select>
              </div>
              <div className={styles.filterRow}>
                <label className={styles.filterLabel} htmlFor="fa">Amount</label>
                <select id="fa" className={styles.filterSelect} value={filterAmount} onChange={e => setFilterAmount(e.target.value)}>
                  {AMOUNTS.map(a => <option key={a.value} value={a.value}>{a.label}</option>)}
                </select>
              </div>
              <div className={styles.filterRow}>
                <label className={styles.filterLabel} htmlFor="fn">Financial Need</label>
                <select id="fn" className={styles.filterSelect} value={filterNeed} onChange={e => setFilterNeed(e.target.value)}>
                  {NEED_OPTIONS.map(n => <option key={n.value} value={n.value}>{n.label}</option>)}
                </select>
              </div>
              <div className={styles.filterRow}>
                <label className={styles.filterLabel} htmlFor="fd">Deadline</label>
                <select id="fd" className={styles.filterSelect} value={filterDeadline} onChange={e => setFilterDeadline(e.target.value)}>
                  <option value="any">Any</option>
                  <option value="upcoming">Upcoming (next 90 days)</option>
                </select>
              </div>
            </div>
          </div>
        </section>

        {/* ── Results ── */}
        <section className={styles.listings}>
          <div className={styles.inner}>
            <p className={styles.resultsCount}>
              Showing <strong>{filtered.length}</strong> of 80+ scholarships
              {activeTab !== 'all' && (
                <> · <span className={styles.activeFilter}>{FUNDER_LABEL[activeTab]}</span></>
              )}
              {filterProvince !== 'all' && (
                <> · <span className={styles.activeFilter}>{PROVINCES.find(p => p.value === filterProvince)?.label}</span></>
              )}
            </p>

            {filtered.length === 0 ? (
              <div className={styles.noResults}>
                <p>No scholarships match your current filters.</p>
                <button className={styles.resetBtn} onClick={resetAll}>Reset all filters</button>
              </div>
            ) : (
              <div className={styles.grid}>
                {filtered.map(s => {
                  const recommended = hasPersonal && isRecommended(s, personalProvince, personalYear, personalField)
                  const urgent = isUpcoming(s.deadlineISO)
                  return (
                    <div
                      key={s.id}
                      className={`${styles.card}${recommended ? ` ${styles.cardRecommended}` : ''}`}
                    >
                      {recommended && (
                        <div className={styles.recommendedBanner}>
                          ★ Recommended for you
                        </div>
                      )}
                      <div className={styles.cardTop}>
                        <span className={styles.amountRange}>{s.amountDisplay}</span>
                        <span className={`${styles.cardBadge} ${BADGE_CLASS[s.funderType]}`}>
                          {FUNDER_LABEL[s.funderType]}
                        </span>
                      </div>
                      <h3 className={styles.cardName}>{s.name}</h3>
                      <p className={styles.cardFunder}>{s.funder}</p>
                      <p className={styles.cardDesc}>{s.description}</p>
                      <div className={styles.cardMeta}>
                        <span className={`${styles.deadlineChip}${urgent ? ` ${styles.deadlineChipUrgent}` : ''}`}>
                          {urgent ? '⚡ ' : ''}{s.deadline === 'Rolling' ? 'Rolling' : `Due ${s.deadline}`}
                        </span>
                        {s.renewable && (
                          <span className={styles.renewBadge}>Renewable</span>
                        )}
                      </div>
                      <div className={styles.cardTags}>
                        {s.tags.slice(0, 3).map(t => (
                          <span key={t} className={styles.tag}>{t}</span>
                        ))}
                      </div>
                      <div className={styles.cardFooter}>
                        <Link href={`/scholarships/${s.id}`} className={styles.applyBtn}>
                          View &amp; Apply →
                        </Link>
                      </div>
                    </div>
                  )
                })}
              </div>
            )}
          </div>
        </section>

        {/* ── FAQ ── */}
        <section className={styles.faq}>
          <div className={styles.inner}>
            <h2 className={styles.h2}>Common questions</h2>
            <dl className={styles.faqList}>
              <dt>Is scholarship matching free?</dt>
              <dd>Yes. Scholarship and bursary matching is always free for every student on Digital Kampus.</dd>
              <dt>How does personalized matching work?</dt>
              <dd>Set your province, year of study, and field above to see tailored recommendations. Create an account for deadline alerts.</dd>
              <dt>Can international students apply?</dt>
              <dd>Many awards are open to international students. Each listing flags eligibility clearly. Federal scholarships often require Canadian citizenship or permanent residency.</dd>
            </dl>
          </div>
        </section>
      </main>
      <SiteFooter />
    </>
  )
}

export default function ScholarshipsPage() {
  return (
    <Suspense fallback={null}>
      <ScholarshipsContent />
    </Suspense>
  )
}
