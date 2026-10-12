'use client'

import { useState, useMemo } from 'react'
import Link from 'next/link'
import styles from './SchoolExplorer.module.css'

interface SchoolItem {
  slug: string
  name: string
  shortName: string
  city: string
  province: string
  type: 'University' | 'College' | 'Polytechnic' | 'Institute of Technology'
  enrolment: number
  tuitionMin: number
  macleans: number // 0 = unranked
  programmes: number
  logoUrl: string | null
  verified: boolean
}

const SCHOOLS_OVERVIEW: SchoolItem[] = [
  // --- Ontario ---
  { slug: 'uoft', name: 'University of Toronto', shortName: 'U of T', city: 'Toronto', province: 'ON', type: 'University', enrolment: 97000, tuitionMin: 6100, macleans: 1, programmes: 700, logoUrl: 'https://upload.wikimedia.org/wikipedia/en/thumb/a/a6/University_of_Toronto_coat_of_arms.svg/120px-University_of_Toronto_coat_of_arms.svg.png', verified: true },
  { slug: 'queens', name: "Queen's University", shortName: "Queen's", city: 'Kingston', province: 'ON', type: 'University', enrolment: 25000, tuitionMin: 6500, macleans: 5, programmes: 200, logoUrl: 'https://upload.wikimedia.org/wikipedia/en/thumb/8/8b/Queens_University_CoA.svg/120px-Queens_University_CoA.svg.png', verified: true },
  { slug: 'uwaterloo', name: 'University of Waterloo', shortName: 'Waterloo', city: 'Waterloo', province: 'ON', type: 'University', enrolment: 42000, tuitionMin: 6700, macleans: 6, programmes: 250, logoUrl: 'https://upload.wikimedia.org/wikipedia/en/thumb/f/f3/University_of_Waterloo_seal.svg/120px-University_of_Waterloo_seal.svg.png', verified: true },
  { slug: 'mcmaster', name: 'McMaster University', shortName: 'McMaster', city: 'Hamilton', province: 'ON', type: 'University', enrolment: 37000, tuitionMin: 7700, macleans: 6, programmes: 300, logoUrl: 'https://upload.wikimedia.org/wikipedia/en/thumb/0/0a/McMaster_University_logo.svg/120px-McMaster_University_logo.svg.png', verified: true },
  { slug: 'western', name: 'University of Western Ontario', shortName: 'Western', city: 'London', province: 'ON', type: 'University', enrolment: 32000, tuitionMin: 7500, macleans: 9, programmes: 400, logoUrl: 'https://upload.wikimedia.org/wikipedia/en/thumb/4/4c/Western_University_London_Ontario_coat_of_arms.svg/120px-Western_University_London_Ontario_coat_of_arms.svg.png', verified: true },
  { slug: 'uottawa', name: 'University of Ottawa', shortName: 'uOttawa', city: 'Ottawa', province: 'ON', type: 'University', enrolment: 44000, tuitionMin: 6400, macleans: 11, programmes: 450, logoUrl: 'https://upload.wikimedia.org/wikipedia/en/thumb/6/6f/University_of_Ottawa_coat_of_arms.svg/120px-University_of_Ottawa_coat_of_arms.svg.png', verified: true },
  { slug: 'yorku', name: 'York University', shortName: 'York', city: 'Toronto', province: 'ON', type: 'University', enrolment: 55000, tuitionMin: 7000, macleans: 0, programmes: 300, logoUrl: null, verified: true },
  { slug: 'ryerson', name: 'Toronto Metropolitan University', shortName: 'TMU', city: 'Toronto', province: 'ON', type: 'University', enrolment: 42000, tuitionMin: 7600, macleans: 0, programmes: 150, logoUrl: null, verified: true },
  { slug: 'carleton', name: 'Carleton University', shortName: 'Carleton', city: 'Ottawa', province: 'ON', type: 'University', enrolment: 30000, tuitionMin: 6400, macleans: 14, programmes: 250, logoUrl: null, verified: true },
  { slug: 'guelphu', name: 'University of Guelph', shortName: 'U of G', city: 'Guelph', province: 'ON', type: 'University', enrolment: 30000, tuitionMin: 7400, macleans: 11, programmes: 200, logoUrl: null, verified: true },
  { slug: 'laurier', name: 'Wilfrid Laurier University', shortName: 'Laurier', city: 'Waterloo', province: 'ON', type: 'University', enrolment: 19000, tuitionMin: 7200, macleans: 15, programmes: 160, logoUrl: null, verified: true },
  { slug: 'brock', name: 'Brock University', shortName: 'Brock', city: 'St. Catharines', province: 'ON', type: 'University', enrolment: 19000, tuitionMin: 7000, macleans: 18, programmes: 170, logoUrl: null, verified: true },
  { slug: 'trent', name: 'Trent University', shortName: 'Trent', city: 'Peterborough', province: 'ON', type: 'University', enrolment: 10000, tuitionMin: 6800, macleans: 13, programmes: 100, logoUrl: null, verified: true },
  { slug: 'ontariotech', name: 'Ontario Tech University', shortName: 'Ontario Tech', city: 'Oshawa', province: 'ON', type: 'University', enrolment: 12000, tuitionMin: 7500, macleans: 0, programmes: 80, logoUrl: null, verified: true },
  { slug: 'nipissing', name: 'Nipissing University', shortName: 'Nipissing', city: 'North Bay', province: 'ON', type: 'University', enrolment: 6000, tuitionMin: 6600, macleans: 7, programmes: 60, logoUrl: null, verified: true },
  { slug: 'lakehead', name: 'Lakehead University', shortName: 'Lakehead', city: 'Thunder Bay', province: 'ON', type: 'University', enrolment: 10000, tuitionMin: 6800, macleans: 14, programmes: 90, logoUrl: null, verified: true },
  { slug: 'ocadu', name: 'OCAD University', shortName: 'OCAD U', city: 'Toronto', province: 'ON', type: 'University', enrolment: 5000, tuitionMin: 7500, macleans: 0, programmes: 60, logoUrl: null, verified: true },
  { slug: 'seneca', name: 'Seneca Polytechnic', shortName: 'Seneca', city: 'Toronto', province: 'ON', type: 'College', enrolment: 35000, tuitionMin: 3800, macleans: 0, programmes: 300, logoUrl: null, verified: true },
  { slug: 'humber', name: 'Humber College', shortName: 'Humber', city: 'Etobicoke', province: 'ON', type: 'College', enrolment: 30000, tuitionMin: 3700, macleans: 0, programmes: 250, logoUrl: null, verified: true },
  { slug: 'sheridan', name: 'Sheridan College', shortName: 'Sheridan', city: 'Oakville', province: 'ON', type: 'College', enrolment: 21000, tuitionMin: 4100, macleans: 0, programmes: 150, logoUrl: null, verified: true },
  { slug: 'georgebrown', name: 'George Brown College', shortName: 'George Brown', city: 'Toronto', province: 'ON', type: 'College', enrolment: 28000, tuitionMin: 3600, macleans: 0, programmes: 160, logoUrl: null, verified: true },
  { slug: 'centennial', name: 'Centennial College', shortName: 'Centennial', city: 'Toronto', province: 'ON', type: 'College', enrolment: 27000, tuitionMin: 3600, macleans: 0, programmes: 180, logoUrl: null, verified: true },
  { slug: 'mohawk', name: 'Mohawk College', shortName: 'Mohawk', city: 'Hamilton', province: 'ON', type: 'College', enrolment: 26000, tuitionMin: 3500, macleans: 0, programmes: 130, logoUrl: null, verified: true },
  { slug: 'conestoga', name: 'Conestoga College', shortName: 'Conestoga', city: 'Kitchener', province: 'ON', type: 'College', enrolment: 23000, tuitionMin: 4000, macleans: 0, programmes: 175, logoUrl: null, verified: true },
  { slug: 'algonquin', name: 'Algonquin College', shortName: 'Algonquin', city: 'Ottawa', province: 'ON', type: 'College', enrolment: 20000, tuitionMin: 3300, macleans: 0, programmes: 300, logoUrl: null, verified: true },
  { slug: 'flemingcollege', name: 'Fleming College', shortName: 'Fleming', city: 'Peterborough', province: 'ON', type: 'College', enrolment: 8000, tuitionMin: 3600, macleans: 0, programmes: 100, logoUrl: null, verified: true },
  { slug: 'georgiancollege', name: 'Georgian College', shortName: 'Georgian', city: 'Barrie', province: 'ON', type: 'College', enrolment: 12000, tuitionMin: 3500, macleans: 0, programmes: 130, logoUrl: null, verified: true },
  { slug: 'niagaracollege', name: 'Niagara College', shortName: 'Niagara', city: 'Welland', province: 'ON', type: 'College', enrolment: 10000, tuitionMin: 3600, macleans: 0, programmes: 130, logoUrl: null, verified: true },
  // --- BC ---
  { slug: 'ubc', name: 'University of British Columbia', shortName: 'UBC', city: 'Vancouver', province: 'BC', type: 'University', enrolment: 68000, tuitionMin: 5500, macleans: 3, programmes: 300, logoUrl: 'https://upload.wikimedia.org/wikipedia/en/thumb/8/83/University_of_British_Columbia_coat_of_arms.svg/120px-University_of_British_Columbia_coat_of_arms.svg.png', verified: true },
  { slug: 'sfu', name: 'Simon Fraser University', shortName: 'SFU', city: 'Burnaby', province: 'BC', type: 'University', enrolment: 35000, tuitionMin: 5200, macleans: 2, programmes: 200, logoUrl: null, verified: true },
  { slug: 'uvic', name: 'University of Victoria', shortName: 'UVic', city: 'Victoria', province: 'BC', type: 'University', enrolment: 22000, tuitionMin: 5660, macleans: 8, programmes: 160, logoUrl: null, verified: true },
  { slug: 'tru', name: 'Thompson Rivers University', shortName: 'TRU', city: 'Kamloops', province: 'BC', type: 'University', enrolment: 17000, tuitionMin: 5400, macleans: 0, programmes: 140, logoUrl: null, verified: true },
  { slug: 'viu', name: 'Vancouver Island University', shortName: 'VIU', city: 'Nanaimo', province: 'BC', type: 'University', enrolment: 18000, tuitionMin: 5200, macleans: 0, programmes: 120, logoUrl: null, verified: true },
  { slug: 'unbc', name: 'University of Northern BC', shortName: 'UNBC', city: 'Prince George', province: 'BC', type: 'University', enrolment: 4500, tuitionMin: 5400, macleans: 4, programmes: 50, logoUrl: null, verified: true },
  { slug: 'bcit', name: 'BCIT', shortName: 'BCIT', city: 'Burnaby', province: 'BC', type: 'Polytechnic', enrolment: 48000, tuitionMin: 4500, macleans: 0, programmes: 150, logoUrl: null, verified: true },
  { slug: 'kwantlen', name: 'Kwantlen Polytechnic University', shortName: 'KPU', city: 'Surrey', province: 'BC', type: 'Polytechnic', enrolment: 20000, tuitionMin: 5000, macleans: 0, programmes: 135, logoUrl: null, verified: true },
  { slug: 'langara', name: 'Langara College', shortName: 'Langara', city: 'Vancouver', province: 'BC', type: 'College', enrolment: 21000, tuitionMin: 4500, macleans: 0, programmes: 100, logoUrl: null, verified: true },
  { slug: 'capilano', name: 'Capilano University', shortName: 'CapU', city: 'North Vancouver', province: 'BC', type: 'University', enrolment: 13000, tuitionMin: 5200, macleans: 0, programmes: 90, logoUrl: null, verified: true },
  { slug: 'douglas', name: 'Douglas College', shortName: 'Douglas', city: 'New Westminster', province: 'BC', type: 'College', enrolment: 25000, tuitionMin: 4800, macleans: 0, programmes: 120, logoUrl: null, verified: true },
  { slug: 'okanagan', name: 'Okanagan College', shortName: 'OC', city: 'Kelowna', province: 'BC', type: 'College', enrolment: 18000, tuitionMin: 4500, macleans: 0, programmes: 100, logoUrl: null, verified: true },
  // --- Quebec ---
  { slug: 'mcgill', name: 'McGill University', shortName: 'McGill', city: 'Montréal', province: 'QC', type: 'University', enrolment: 40000, tuitionMin: 4338, macleans: 4, programmes: 300, logoUrl: 'https://upload.wikimedia.org/wikipedia/en/thumb/3/3b/McGill_University_CoA.svg/120px-McGill_University_CoA.svg.png', verified: true },
  { slug: 'udem', name: 'Université de Montréal', shortName: 'UdeM', city: 'Montréal', province: 'QC', type: 'University', enrolment: 66000, tuitionMin: 4500, macleans: 0, programmes: 650, logoUrl: null, verified: true },
  { slug: 'laval', name: 'Université Laval', shortName: 'Laval', city: 'Québec City', province: 'QC', type: 'University', enrolment: 43000, tuitionMin: 4200, macleans: 0, programmes: 500, logoUrl: null, verified: true },
  { slug: 'concordia', name: 'Concordia University', shortName: 'Concordia', city: 'Montréal', province: 'QC', type: 'University', enrolment: 51000, tuitionMin: 3500, macleans: 0, programmes: 300, logoUrl: null, verified: true },
  { slug: 'usherbrooke', name: 'Université de Sherbrooke', shortName: 'UdeS', city: 'Sherbrooke', province: 'QC', type: 'University', enrolment: 32000, tuitionMin: 4000, macleans: 0, programmes: 150, logoUrl: null, verified: true },
  { slug: 'uqam', name: 'UQAM', shortName: 'UQAM', city: 'Montréal', province: 'QC', type: 'University', enrolment: 40000, tuitionMin: 3000, macleans: 0, programmes: 300, logoUrl: null, verified: true },
  // --- Alberta ---
  { slug: 'ualberta', name: 'University of Alberta', shortName: 'U of A', city: 'Edmonton', province: 'AB', type: 'University', enrolment: 40000, tuitionMin: 5600, macleans: 7, programmes: 400, logoUrl: 'https://upload.wikimedia.org/wikipedia/en/thumb/a/a6/University_of_Alberta_coat_of_arms.svg/120px-University_of_Alberta_coat_of_arms.svg.png', verified: true },
  { slug: 'ucalgary', name: 'University of Calgary', shortName: 'UCalgary', city: 'Calgary', province: 'AB', type: 'University', enrolment: 33000, tuitionMin: 6800, macleans: 12, programmes: 250, logoUrl: 'https://upload.wikimedia.org/wikipedia/en/thumb/1/16/University_of_Calgary_arms.svg/120px-University_of_Calgary_arms.svg.png', verified: true },
  { slug: 'nait', name: 'NAIT', shortName: 'NAIT', city: 'Edmonton', province: 'AB', type: 'Polytechnic', enrolment: 37000, tuitionMin: 4800, macleans: 0, programmes: 200, logoUrl: null, verified: true },
  { slug: 'sait', name: 'SAIT', shortName: 'SAIT', city: 'Calgary', province: 'AB', type: 'Polytechnic', enrolment: 15000, tuitionMin: 5200, macleans: 0, programmes: 100, logoUrl: null, verified: true },
  { slug: 'macewan', name: 'MacEwan University', shortName: 'MacEwan', city: 'Edmonton', province: 'AB', type: 'University', enrolment: 19000, tuitionMin: 6200, macleans: 0, programmes: 65, logoUrl: null, verified: true },
  { slug: 'mountroyal', name: 'Mount Royal University', shortName: 'MRU', city: 'Calgary', province: 'AB', type: 'University', enrolment: 15000, tuitionMin: 6400, macleans: 0, programmes: 60, logoUrl: null, verified: true },
  { slug: 'ulethbridge', name: 'University of Lethbridge', shortName: 'U of L', city: 'Lethbridge', province: 'AB', type: 'University', enrolment: 9000, tuitionMin: 6000, macleans: 20, programmes: 80, logoUrl: null, verified: true },
  { slug: 'reddeerpoly', name: 'Red Deer Polytechnic', shortName: 'RDP', city: 'Red Deer', province: 'AB', type: 'Polytechnic', enrolment: 7000, tuitionMin: 5200, macleans: 0, programmes: 60, logoUrl: null, verified: true },
  // --- Manitoba ---
  { slug: 'umanitoba', name: 'University of Manitoba', shortName: 'U of M', city: 'Winnipeg', province: 'MB', type: 'University', enrolment: 32000, tuitionMin: 4500, macleans: 16, programmes: 100, logoUrl: null, verified: true },
  { slug: 'uwinipeg', name: 'University of Winnipeg', shortName: 'UWinnipeg', city: 'Winnipeg', province: 'MB', type: 'University', enrolment: 10000, tuitionMin: 4500, macleans: 0, programmes: 90, logoUrl: null, verified: true },
  { slug: 'brandon', name: 'Brandon University', shortName: 'BU', city: 'Brandon', province: 'MB', type: 'University', enrolment: 3500, tuitionMin: 4200, macleans: 0, programmes: 50, logoUrl: null, verified: true },
  // --- Saskatchewan ---
  { slug: 'usask', name: 'University of Saskatchewan', shortName: 'USask', city: 'Saskatoon', province: 'SK', type: 'University', enrolment: 24000, tuitionMin: 7200, macleans: 13, programmes: 200, logoUrl: null, verified: true },
  { slug: 'ureginaCA', name: 'University of Regina', shortName: 'U of R', city: 'Regina', province: 'SK', type: 'University', enrolment: 17000, tuitionMin: 6500, macleans: 0, programmes: 140, logoUrl: null, verified: true },
  // --- Nova Scotia ---
  { slug: 'dal', name: 'Dalhousie University', shortName: 'Dal', city: 'Halifax', province: 'NS', type: 'University', enrolment: 19000, tuitionMin: 9000, macleans: 11, programmes: 180, logoUrl: null, verified: true },
  { slug: 'acadia', name: 'Acadia University', shortName: 'Acadia', city: 'Wolfville', province: 'NS', type: 'University', enrolment: 4000, tuitionMin: 9800, macleans: 3, programmes: 80, logoUrl: null, verified: true },
  { slug: 'smucal', name: "Saint Mary's University", shortName: "Saint Mary's", city: 'Halifax', province: 'NS', type: 'University', enrolment: 8000, tuitionMin: 9200, macleans: 0, programmes: 100, logoUrl: null, verified: true },
  { slug: 'stfx', name: 'St. Francis Xavier University', shortName: 'StFX', city: 'Antigonish', province: 'NS', type: 'University', enrolment: 5000, tuitionMin: 10000, macleans: 1, programmes: 100, logoUrl: null, verified: true },
  { slug: 'capebreton', name: 'Cape Breton University', shortName: 'CBU', city: 'Sydney', province: 'NS', type: 'University', enrolment: 4500, tuitionMin: 9000, macleans: 0, programmes: 60, logoUrl: null, verified: true },
  { slug: 'nscc', name: 'Nova Scotia Community College', shortName: 'NSCC', city: 'Halifax', province: 'NS', type: 'College', enrolment: 10000, tuitionMin: 3800, macleans: 0, programmes: 130, logoUrl: null, verified: true },
  // --- New Brunswick ---
  { slug: 'unb', name: 'University of New Brunswick', shortName: 'UNB', city: 'Fredericton', province: 'NB', type: 'University', enrolment: 11000, tuitionMin: 8100, macleans: 0, programmes: 75, logoUrl: null, verified: true },
  { slug: 'mtallison', name: 'Mount Allison University', shortName: 'Mount A', city: 'Sackville', province: 'NB', type: 'University', enrolment: 2500, tuitionMin: 9500, macleans: 1, programmes: 50, logoUrl: null, verified: true },
  { slug: 'nbcc', name: 'New Brunswick Community College', shortName: 'NBCC', city: 'Fredericton', province: 'NB', type: 'College', enrolment: 15000, tuitionMin: 3800, macleans: 0, programmes: 100, logoUrl: null, verified: true },
  // --- Newfoundland ---
  { slug: 'mun', name: 'Memorial University of Newfoundland', shortName: 'MUN', city: "St. John's", province: 'NL', type: 'University', enrolment: 19000, tuitionMin: 2800, macleans: 0, programmes: 175, logoUrl: null, verified: true },
  // --- PEI ---
  { slug: 'upei', name: 'University of Prince Edward Island', shortName: 'UPEI', city: 'Charlottetown', province: 'PE', type: 'University', enrolment: 5000, tuitionMin: 8200, macleans: 0, programmes: 60, logoUrl: null, verified: true },
  { slug: 'holland', name: 'Holland College', shortName: 'Holland College', city: 'Charlottetown', province: 'PE', type: 'College', enrolment: 3000, tuitionMin: 3500, macleans: 0, programmes: 60, logoUrl: null, verified: true },
]

const PROVINCES = [
  { code: 'BC', name: 'British Columbia' },
  { code: 'AB', name: 'Alberta' },
  { code: 'SK', name: 'Saskatchewan' },
  { code: 'MB', name: 'Manitoba' },
  { code: 'ON', name: 'Ontario' },
  { code: 'QC', name: 'Quebec' },
  { code: 'NS', name: 'Nova Scotia' },
  { code: 'NB', name: 'New Brunswick' },
  { code: 'NL', name: 'Newfoundland' },
  { code: 'PE', name: 'P.E.I.' },
]

const TYPES = ['University', 'College', 'Polytechnic'] as const
type TypeFilter = typeof TYPES[number] | 'All'
type SizeFilter = 'All' | 'Small' | 'Medium' | 'Large'
type RankFilter = 'All' | 'Top 5' | 'Top 10'

function sizeLabel(n: number): string {
  if (n < 5000) return 'Small'
  if (n <= 20000) return 'Medium'
  return 'Large'
}

export default function SchoolExplorer() {
  const [province, setProvince] = useState('All')
  const [type, setType] = useState<TypeFilter>('All')
  const [size, setSize] = useState<SizeFilter>('All')
  const [rank, setRank] = useState<RankFilter>('All')

  const filtered = useMemo(() => {
    return SCHOOLS_OVERVIEW.filter((s) => {
      if (province !== 'All' && s.province !== province) return false
      if (type !== 'All' && s.type !== type) return false
      if (size === 'Small' && s.enrolment >= 5000) return false
      if (size === 'Medium' && (s.enrolment < 5000 || s.enrolment > 20000)) return false
      if (size === 'Large' && s.enrolment <= 20000) return false
      if (rank === 'Top 5' && (s.macleans === 0 || s.macleans > 5)) return false
      if (rank === 'Top 10' && (s.macleans === 0 || s.macleans > 10)) return false
      return true
    })
  }, [province, type, size, rank])

  return (
    <section className={styles.explorer}>
      <div className={styles.inner}>
        <div className={styles.filterBar}>
          <div className={styles.filterGroup}>
            <label className={styles.filterLabel} htmlFor="province-filter">Province</label>
            <select
              id="province-filter"
              className={styles.filterSelect}
              value={province}
              onChange={(e) => setProvince(e.target.value)}
            >
              <option value="All">All provinces</option>
              {PROVINCES.map((p) => (
                <option key={p.code} value={p.code}>{p.name}</option>
              ))}
            </select>
          </div>

          <div className={styles.filterGroup}>
            <span className={styles.filterLabel}>Type</span>
            <div className={styles.chips} role="group" aria-label="Filter by institution type">
              <button
                className={`${styles.chip} ${type === 'All' ? styles.chipActive : ''}`}
                onClick={() => setType('All')}
              >All</button>
              {TYPES.map((t) => (
                <button
                  key={t}
                  className={`${styles.chip} ${type === t ? styles.chipActive : ''}`}
                  onClick={() => setType(t)}
                >{t}</button>
              ))}
            </div>
          </div>

          <div className={styles.filterGroup}>
            <span className={styles.filterLabel}>Size</span>
            <div className={styles.chips} role="group" aria-label="Filter by enrollment size">
              {(['All', 'Small', 'Medium', 'Large'] as const).map((s) => (
                <button
                  key={s}
                  className={`${styles.chip} ${size === s ? styles.chipActive : ''}`}
                  onClick={() => setSize(s)}
                >
                  {s === 'Small' ? 'Small (<5k)' : s === 'Medium' ? 'Medium (5–20k)' : s === 'Large' ? 'Large (>20k)' : 'All'}
                </button>
              ))}
            </div>
          </div>

          <div className={styles.filterGroup}>
            <span className={styles.filterLabel}>Ranking</span>
            <div className={styles.chips} role="group" aria-label="Filter by Maclean's ranking">
              {(['All', 'Top 5', 'Top 10'] as const).map((r) => (
                <button
                  key={r}
                  className={`${styles.chip} ${rank === r ? styles.chipActive : ''}`}
                  onClick={() => setRank(r)}
                >{r}</button>
              ))}
            </div>
          </div>
        </div>

        <p className={styles.resultCount}>
          Showing <strong>{filtered.length}</strong> of {SCHOOLS_OVERVIEW.length} schools
          {province !== 'All' || type !== 'All' || size !== 'All' || rank !== 'All' ? (
            <button className={styles.clearBtn} onClick={() => { setProvince('All'); setType('All'); setSize('All'); setRank('All') }}>
              Clear filters ×
            </button>
          ) : null}
        </p>

        {filtered.length === 0 ? (
          <div className={styles.noResults}>
            <p>No schools match your filters. <button className={styles.clearBtn} onClick={() => { setProvince('All'); setType('All'); setSize('All'); setRank('All') }}>Clear all filters</button></p>
          </div>
        ) : (
          <div className={styles.grid}>
            {filtered.map((s) => (
              <div key={s.slug} className={styles.card}>
                <div className={styles.cardTop}>
                  <div className={styles.cardLogoWrap}>
                    {s.logoUrl ? (
                      // eslint-disable-next-line @next/next/no-img-element
                      <img src={s.logoUrl} alt={s.shortName + ' logo'} width={36} height={36} className={styles.cardLogo} />
                    ) : (
                      <div className={styles.cardIcon}>{s.shortName.charAt(0)}</div>
                    )}
                  </div>
                  <div className={styles.cardBadges}>
                    <span className={`${styles.typeBadge} ${styles['type' + s.type.replace(/\s/g, '')]}`}>{s.type}</span>
                    {s.macleans > 0 && (
                      <span className={styles.rankBadge}>#{s.macleans} Maclean&apos;s</span>
                    )}
                  </div>
                </div>
                <h3 className={styles.cardName}>{s.name}</h3>
                <p className={styles.cardMeta}>{s.city}, {s.province}</p>
                <div className={styles.cardStats}>
                  <span className={styles.stat}>
                    <span className={styles.statLabel}>Enrolment</span>
                    <span className={styles.statVal}>{s.enrolment.toLocaleString('en-CA')}</span>
                  </span>
                  <span className={styles.stat}>
                    <span className={styles.statLabel}>From</span>
                    <span className={styles.statVal}>${s.tuitionMin.toLocaleString('en-CA')}/yr</span>
                  </span>
                  <span className={styles.stat}>
                    <span className={styles.statLabel}>Size</span>
                    <span className={styles.statVal}>{sizeLabel(s.enrolment)}</span>
                  </span>
                </div>
                <div className={styles.cardActions}>
                  <Link href={`/schools/${s.slug}`} className={styles.viewBtn}>View profile →</Link>
                  <Link href={`/compare?a=${s.slug}`} className={styles.compareBtn}>Compare</Link>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  )
}
