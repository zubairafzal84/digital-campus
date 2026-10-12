'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import styles from './compare.module.css'

interface School {
  slug: string
  name: string
  shortName: string
  city: string
  province: string
  type: string
  founded: number
  enrolment: number
  tuition: number
  macleans: number  // 0 = not ranked in this category
  qs: number        // 0 = not ranked
  acceptanceRate: number  // percent; 0 = not published
  programmes: number
  notableFor: string
  logoUrl: string | null
}

const SCHOOLS: School[] = [
  { slug: 'uoft', name: 'University of Toronto', shortName: 'U of T', city: 'Toronto', province: 'ON', type: 'University', founded: 1827, enrolment: 97000, tuition: 6100, macleans: 1, qs: 25, acceptanceRate: 43, programmes: 700, notableFor: 'Research, AI, Medicine, Law', logoUrl: 'https://upload.wikimedia.org/wikipedia/en/thumb/a/a6/University_of_Toronto_coat_of_arms.svg/120px-University_of_Toronto_coat_of_arms.svg.png' },
  { slug: 'ubc', name: 'University of British Columbia', shortName: 'UBC', city: 'Vancouver', province: 'BC', type: 'University', founded: 1908, enrolment: 68000, tuition: 5500, macleans: 3, qs: 38, acceptanceRate: 46, programmes: 300, notableFor: 'Forestry, Commerce, Medicine, Research', logoUrl: 'https://upload.wikimedia.org/wikipedia/en/thumb/8/83/University_of_British_Columbia_coat_of_arms.svg/120px-University_of_British_Columbia_coat_of_arms.svg.png' },
  { slug: 'mcgill', name: 'McGill University', shortName: 'McGill', city: 'Montréal', province: 'QC', type: 'University', founded: 1821, enrolment: 40000, tuition: 4338, macleans: 4, qs: 30, acceptanceRate: 46, programmes: 300, notableFor: 'Medicine, Law, Natural Sciences', logoUrl: 'https://upload.wikimedia.org/wikipedia/en/thumb/3/3b/McGill_University_CoA.svg/120px-McGill_University_CoA.svg.png' },
  { slug: 'uwaterloo', name: 'University of Waterloo', shortName: 'Waterloo', city: 'Waterloo', province: 'ON', type: 'University', founded: 1959, enrolment: 42000, tuition: 6700, macleans: 6, qs: 173, acceptanceRate: 53, programmes: 250, notableFor: 'Computer Science, Engineering, Co-op', logoUrl: 'https://upload.wikimedia.org/wikipedia/en/thumb/f/f3/University_of_Waterloo_seal.svg/120px-University_of_Waterloo_seal.svg.png' },
  { slug: 'queens', name: "Queen's University", shortName: "Queen's", city: 'Kingston', province: 'ON', type: 'University', founded: 1841, enrolment: 25000, tuition: 6500, macleans: 5, qs: 561, acceptanceRate: 44, programmes: 200, notableFor: 'Commerce, Law, Engineering', logoUrl: 'https://upload.wikimedia.org/wikipedia/en/thumb/8/8b/Queens_University_CoA.svg/120px-Queens_University_CoA.svg.png' },
  { slug: 'ualberta', name: 'University of Alberta', shortName: 'U of A', city: 'Edmonton', province: 'AB', type: 'University', founded: 1908, enrolment: 40000, tuition: 5600, macleans: 7, qs: 111, acceptanceRate: 57, programmes: 400, notableFor: 'Energy, Agriculture, Indigenous Studies', logoUrl: 'https://upload.wikimedia.org/wikipedia/en/thumb/a/a6/University_of_Alberta_coat_of_arms.svg/120px-University_of_Alberta_coat_of_arms.svg.png' },
  { slug: 'mcmaster', name: 'McMaster University', shortName: 'McMaster', city: 'Hamilton', province: 'ON', type: 'University', founded: 1887, enrolment: 37000, tuition: 7700, macleans: 6, qs: 189, acceptanceRate: 69, programmes: 300, notableFor: 'Health Sciences, Engineering, Business', logoUrl: 'https://upload.wikimedia.org/wikipedia/en/thumb/0/0a/McMaster_University_logo.svg/120px-McMaster_University_logo.svg.png' },
  { slug: 'western', name: 'University of Western Ontario', shortName: 'Western', city: 'London', province: 'ON', type: 'University', founded: 1878, enrolment: 32000, tuition: 7500, macleans: 9, qs: 203, acceptanceRate: 58, programmes: 400, notableFor: 'Ivey Business, Law, Medicine', logoUrl: 'https://upload.wikimedia.org/wikipedia/en/thumb/4/4c/Western_University_London_Ontario_coat_of_arms.svg/120px-Western_University_London_Ontario_coat_of_arms.svg.png' },
  { slug: 'sfu', name: 'Simon Fraser University', shortName: 'SFU', city: 'Burnaby', province: 'BC', type: 'University', founded: 1965, enrolment: 35000, tuition: 5200, macleans: 2, qs: 328, acceptanceRate: 67, programmes: 200, notableFor: 'Science, Business, Communication', logoUrl: null },
  { slug: 'uottawa', name: 'University of Ottawa', shortName: 'uOttawa', city: 'Ottawa', province: 'ON', type: 'University', founded: 1848, enrolment: 44000, tuition: 6400, macleans: 11, qs: 273, acceptanceRate: 78, programmes: 450, notableFor: 'Bilingual, Law, Public Affairs, Medicine', logoUrl: 'https://upload.wikimedia.org/wikipedia/en/thumb/6/6f/University_of_Ottawa_coat_of_arms.svg/120px-University_of_Ottawa_coat_of_arms.svg.png' },
  { slug: 'uvic', name: 'University of Victoria', shortName: 'UVic', city: 'Victoria', province: 'BC', type: 'University', founded: 1963, enrolment: 22000, tuition: 5660, macleans: 8, qs: 651, acceptanceRate: 73, programmes: 160, notableFor: 'Ocean Science, Climate, Co-op, Law', logoUrl: null },
  { slug: 'dal', name: 'Dalhousie University', shortName: 'Dal', city: 'Halifax', province: 'NS', type: 'University', founded: 1818, enrolment: 19000, tuition: 9000, macleans: 11, qs: 701, acceptanceRate: 74, programmes: 180, notableFor: 'Ocean Sciences, Law, Medicine', logoUrl: null },
  { slug: 'ucalgary', name: 'University of Calgary', shortName: 'UCalgary', city: 'Calgary', province: 'AB', type: 'University', founded: 1966, enrolment: 33000, tuition: 6800, macleans: 12, qs: 235, acceptanceRate: 78, programmes: 250, notableFor: 'Energy, Haskayne Business, Engineering', logoUrl: 'https://upload.wikimedia.org/wikipedia/en/thumb/1/16/University_of_Calgary_arms.svg/120px-University_of_Calgary_arms.svg.png' },
  { slug: 'udem', name: 'Université de Montréal', shortName: 'UdeM', city: 'Montréal', province: 'QC', type: 'University', founded: 1878, enrolment: 66000, tuition: 4500, macleans: 0, qs: 141, acceptanceRate: 60, programmes: 650, notableFor: 'French, HEC, Polytechnique, Medicine', logoUrl: null },
  { slug: 'carleton', name: 'Carleton University', shortName: 'Carleton', city: 'Ottawa', province: 'ON', type: 'University', founded: 1942, enrolment: 30000, tuition: 6400, macleans: 14, qs: 0, acceptanceRate: 80, programmes: 250, notableFor: 'Journalism, Engineering, Public Affairs', logoUrl: null },
  { slug: 'concordia', name: 'Concordia University', shortName: 'Concordia', city: 'Montréal', province: 'QC', type: 'University', founded: 1974, enrolment: 51000, tuition: 3500, macleans: 0, qs: 0, acceptanceRate: 75, programmes: 300, notableFor: 'Fine Arts, John Molson Business, Media', logoUrl: null },
  { slug: 'laval', name: 'Université Laval', shortName: 'Laval', city: 'Québec City', province: 'QC', type: 'University', founded: 1663, enrolment: 43000, tuition: 4200, macleans: 0, qs: 0, acceptanceRate: 65, programmes: 500, notableFor: 'French, Law, Forestry, Agriculture', logoUrl: null },
  { slug: 'yorku', name: 'York University', shortName: 'York', city: 'Toronto', province: 'ON', type: 'University', founded: 1959, enrolment: 55000, tuition: 7000, macleans: 0, qs: 0, acceptanceRate: 83, programmes: 300, notableFor: 'Schulich Business, Osgoode Law, Fine Arts', logoUrl: null },
  { slug: 'guelphu', name: 'University of Guelph', shortName: 'U of G', city: 'Guelph', province: 'ON', type: 'University', founded: 1964, enrolment: 30000, tuition: 7400, macleans: 11, qs: 0, acceptanceRate: 72, programmes: 200, notableFor: 'Veterinary, Agriculture, Food Science', logoUrl: null },
  { slug: 'umanitoba', name: 'University of Manitoba', shortName: 'U of M', city: 'Winnipeg', province: 'MB', type: 'University', founded: 1877, enrolment: 32000, tuition: 4500, macleans: 16, qs: 0, acceptanceRate: 78, programmes: 100, notableFor: 'Agriculture, Medicine, Indigenous Studies', logoUrl: null },
  { slug: 'mun', name: 'Memorial University of Newfoundland', shortName: 'MUN', city: "St. John's", province: 'NL', type: 'University', founded: 1925, enrolment: 19000, tuition: 2800, macleans: 0, qs: 0, acceptanceRate: 84, programmes: 175, notableFor: 'Ocean Sciences, Engineering, Low Tuition', logoUrl: null },
  { slug: 'ryerson', name: 'Toronto Metropolitan University', shortName: 'TMU', city: 'Toronto', province: 'ON', type: 'University', founded: 1948, enrolment: 42000, tuition: 7600, macleans: 0, qs: 0, acceptanceRate: 78, programmes: 150, notableFor: 'Engineering, Ted Rogers Business, Downtown Toronto', logoUrl: null },
  { slug: 'laurier', name: 'Wilfrid Laurier University', shortName: 'Laurier', city: 'Waterloo', province: 'ON', type: 'University', founded: 1911, enrolment: 19000, tuition: 7200, macleans: 15, qs: 0, acceptanceRate: 75, programmes: 160, notableFor: 'Lazaridis Business, Music, Social Sciences', logoUrl: null },
  { slug: 'usask', name: 'University of Saskatchewan', shortName: 'USask', city: 'Saskatoon', province: 'SK', type: 'University', founded: 1907, enrolment: 24000, tuition: 7200, macleans: 13, qs: 0, acceptanceRate: 82, programmes: 200, notableFor: 'Agriculture, Veterinary, Canadian Light Source', logoUrl: null },
  { slug: 'bcit', name: 'BCIT', shortName: 'BCIT', city: 'Burnaby', province: 'BC', type: 'Polytechnic', founded: 1964, enrolment: 48000, tuition: 4500, macleans: 0, qs: 0, acceptanceRate: 55, programmes: 150, notableFor: 'Applied Tech, Health Sciences, Trades', logoUrl: null },
  { slug: 'seneca', name: 'Seneca Polytechnic', shortName: 'Seneca', city: 'Toronto', province: 'ON', type: 'College', founded: 1967, enrolment: 35000, tuition: 3800, macleans: 0, qs: 0, acceptanceRate: 88, programmes: 300, notableFor: 'Business, Animation, Technology', logoUrl: null },
  { slug: 'humber', name: 'Humber College', shortName: 'Humber', city: 'Etobicoke', province: 'ON', type: 'College', founded: 1967, enrolment: 30000, tuition: 3700, macleans: 0, qs: 0, acceptanceRate: 87, programmes: 250, notableFor: 'Creative Arts, Business, Social Services', logoUrl: null },
  { slug: 'sheridan', name: 'Sheridan College', shortName: 'Sheridan', city: 'Oakville', province: 'ON', type: 'College', founded: 1967, enrolment: 21000, tuition: 4100, macleans: 0, qs: 0, acceptanceRate: 80, programmes: 150, notableFor: 'Animation, VFX, Design, Business', logoUrl: null },
  { slug: 'georgebrown', name: 'George Brown College', shortName: 'George Brown', city: 'Toronto', province: 'ON', type: 'College', founded: 1967, enrolment: 28000, tuition: 3600, macleans: 0, qs: 0, acceptanceRate: 87, programmes: 160, notableFor: 'Culinary Arts, Construction, Nursing, Design', logoUrl: null },
  { slug: 'nait', name: 'NAIT', shortName: 'NAIT', city: 'Edmonton', province: 'AB', type: 'Polytechnic', founded: 1962, enrolment: 37000, tuition: 4800, macleans: 0, qs: 0, acceptanceRate: 85, programmes: 200, notableFor: 'Technology, Trades, Business, Health', logoUrl: null },
]

const METRICS: { key: keyof School; label: string; format: (v: unknown) => string; winner: 'min' | 'max' | null }[] = [
  { key: 'type', label: 'Type', format: (v) => String(v), winner: null },
  { key: 'city', label: 'Location', format: (v) => String(v), winner: null },
  { key: 'province', label: 'Province', format: (v) => String(v), winner: null },
  { key: 'founded', label: 'Founded', format: (v) => String(v), winner: null },
  { key: 'enrolment', label: 'Enrollment', format: (v) => Number(v).toLocaleString('en-CA') + ' students', winner: null },
  { key: 'tuition', label: 'Domestic Tuition (undergrad)', format: (v) => '$' + Number(v).toLocaleString('en-CA') + '/yr', winner: 'min' },
  { key: 'macleans', label: "Maclean's Rank", format: (v) => Number(v) > 0 ? '#' + v : '—', winner: 'min' },
  { key: 'qs', label: 'QS World Rank', format: (v) => Number(v) > 0 ? '#' + v : '—', winner: 'min' },
  { key: 'acceptanceRate', label: 'Acceptance Rate', format: (v) => Number(v) > 0 ? v + '%' : '—', winner: null },
  { key: 'programmes', label: 'Programmes', format: (v) => Number(v).toLocaleString('en-CA') + '+', winner: 'max' },
  { key: 'notableFor', label: 'Notable For', format: (v) => String(v), winner: null },
]

function findWinners(selected: School[], metric: typeof METRICS[0]): Set<string> {
  if (!metric.winner || selected.length < 2) return new Set()
  const vals = selected.map((s) => Number(s[metric.key]))
  const active = vals.filter((v) => v > 0)
  if (!active.length) return new Set()
  const best = metric.winner === 'min' ? Math.min(...active) : Math.max(...active)
  return new Set(selected.filter((s) => Number(s[metric.key]) === best).map((s) => s.slug))
}

interface Props {
  initialA?: string
  initialB?: string
  initialC?: string
}

export default function CompareClient({ initialA, initialB, initialC }: Props) {
  const [selectedA, setSelectedA] = useState(initialA ?? '')
  const [selectedB, setSelectedB] = useState(initialB ?? '')
  const [selectedC, setSelectedC] = useState(initialC ?? '')
  const [showThird, setShowThird] = useState(Boolean(initialC))

  useEffect(() => {
    if (initialA) setSelectedA(initialA)
    if (initialB) setSelectedB(initialB)
    if (initialC) { setSelectedC(initialC); setShowThird(true) }
  }, [initialA, initialB, initialC])

  const selected = [selectedA, selectedB, showThird ? selectedC : '']
    .filter(Boolean)
    .map((slug) => SCHOOLS.find((s) => s.slug === slug))
    .filter((s): s is School => Boolean(s))

  const hasComparison = selected.length >= 2

  const options = SCHOOLS.map((s) => (
    <option key={s.slug} value={s.slug}>{s.name} ({s.city}, {s.province})</option>
  ))

  return (
    <section className={styles.compareSection}>
      <div className={styles.inner}>
        <p className={styles.sectionTag}>Interactive comparison</p>
        <h2 className={styles.h2}>Compare side by side</h2>
        <p className={styles.compareSub}>Select 2 or 3 schools to see a full comparison.</p>

        <div className={styles.selectorRow}>
          <div className={styles.selectorSlot}>
            <label className={styles.selectorLabel}>School A</label>
            <select
              className={styles.selectorSelect}
              value={selectedA}
              onChange={(e) => setSelectedA(e.target.value)}
              aria-label="Select first school"
            >
              <option value="">Choose a school…</option>
              {options}
            </select>
          </div>

          <span className={styles.vsChip}>VS</span>

          <div className={styles.selectorSlot}>
            <label className={styles.selectorLabel}>School B</label>
            <select
              className={styles.selectorSelect}
              value={selectedB}
              onChange={(e) => setSelectedB(e.target.value)}
              aria-label="Select second school"
            >
              <option value="">Choose a school…</option>
              {options}
            </select>
          </div>

          {showThird ? (
            <>
              <span className={styles.vsChip}>VS</span>
              <div className={styles.selectorSlot}>
                <label className={styles.selectorLabel}>School C</label>
                <select
                  className={styles.selectorSelect}
                  value={selectedC}
                  onChange={(e) => setSelectedC(e.target.value)}
                  aria-label="Select third school"
                >
                  <option value="">Choose a school…</option>
                  {options}
                </select>
              </div>
            </>
          ) : (
            <button
              className={styles.addThirdBtn}
              onClick={() => setShowThird(true)}
              aria-label="Add a third school for comparison"
            >
              + Add third school
            </button>
          )}
        </div>

        {!hasComparison && (
          <div className={styles.emptyState}>
            <span className={styles.emptyIcon}>⚖️</span>
            <p className={styles.emptyText}>Select at least two schools above to see the comparison table.</p>
          </div>
        )}

        {hasComparison && (
          <div className={styles.tableWrap}>
            <table className={styles.compTable} aria-label="School comparison table">
              <thead>
                <tr>
                  <th className={styles.compThMetric}>Metric</th>
                  {selected.map((s) => (
                    <th key={s.slug} className={styles.compTh}>
                      {s.logoUrl ? (
                        // eslint-disable-next-line @next/next/no-img-element
                        <img src={s.logoUrl} alt={s.shortName + ' logo'} width={32} height={32} className={styles.thLogo} />
                      ) : (
                        <div className={styles.thInitial}>{s.shortName.charAt(0)}</div>
                      )}
                      <span className={styles.thName}>{s.shortName}</span>
                      <Link href={`/schools/${s.slug}`} className={styles.thLink}>View profile →</Link>
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {METRICS.map((metric) => {
                  const winners = findWinners(selected, metric)
                  return (
                    <tr key={metric.key} className={styles.compRow}>
                      <td className={styles.compTdLabel}>{metric.label}</td>
                      {selected.map((s) => (
                        <td
                          key={s.slug}
                          className={`${styles.compTd} ${winners.has(s.slug) ? styles.compWinner : ''}`}
                        >
                          {metric.format(s[metric.key])}
                          {winners.has(s.slug) && <span className={styles.winBadge}>Best</span>}
                        </td>
                      ))}
                    </tr>
                  )
                })}
              </tbody>
            </table>
          </div>
        )}

        {hasComparison && (
          <p className={styles.compareNote}>
            Data is approximate. Tuition shown is domestic undergraduate. Rankings from Maclean&apos;s and QS World University Rankings.{' '}
            <Link href="/about#data-sources" className={styles.compareNoteLink}>Data sources →</Link>
          </p>
        )}
      </div>
    </section>
  )
}
