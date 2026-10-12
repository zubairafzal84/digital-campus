'use client'

import { useState, useMemo } from 'react'
import Link from 'next/link'
import { SiteNav } from '@/components/layout/SiteNav'
import { SiteFooter } from '@/components/layout/SiteFooter'
import { ARTICLES, CATEGORIES, FEATURED_ARTICLE } from './articles-data'
import styles from './resources.module.css'

const CATEGORY_ICONS: Record<string, string> = {
  Scholarships: '🎓',
  Housing: '🏠',
  'Student Finance': '💰',
  'Career & Co-op': '💼',
  'Campus Life': '🎉',
  'Health & Wellness': '💚',
  'Study Tips': '📚',
}

function badgeClass(category: string): string {
  const key = category.replace(/[^a-z]/gi, '') as string
  const map: Record<string, string> = {
    Scholarships: styles['badge-Scholarships'],
    Housing: styles['badge-Housing'],
    StudentFinance: styles['badge-StudentFinance'],
    CareerCoop: styles['badge-CareerCoop'],
    CampusLife: styles['badge-CampusLife'],
    HealthWellness: styles['badge-HealthWellness'],
    StudyTips: styles['badge-StudyTips'],
  }
  return map[key] ?? styles['badge-StudyTips']
}

function formatDate(iso: string): string {
  return new Date(iso).toLocaleDateString('en-CA', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  })
}

export default function ResourcesPage() {
  const [activeCategory, setActiveCategory] = useState<string>('All')

  const filtered = useMemo(() => {
    if (activeCategory === 'All') return ARTICLES
    return ARTICLES.filter((a) => a.category === activeCategory)
  }, [activeCategory])

  const nonFeatured = filtered.filter((a) => a.slug !== FEATURED_ARTICLE.slug)
  const showFeatured = activeCategory === 'All' || activeCategory === FEATURED_ARTICLE.category

  return (
    <>
      <SiteNav />
      <main>
        {/* ── Hero ── */}
        <section className={styles.hero}>
          <div className={styles.inner}>
            <nav className={styles.breadcrumb} aria-label="Breadcrumb">
              <Link href="/">Home</Link>
              <span>›</span>
              <span aria-current="page">Resources</span>
            </nav>
            <div className={styles.heroContent}>
              <h1 className={styles.h1}>
                Student <span className={styles.hi}>Resources</span>
              </h1>
              <p className={styles.sub}>
                Practical guides on scholarships, housing, budgeting, mental health, and
                everything else Canadian student life throws at you.
              </p>
            </div>
          </div>
        </section>

        {/* ── Category Tabs ── */}
        <div className={styles.tabsSection}>
          <div className={styles.tabsInner}>
            <div className={styles.tabs} role="tablist" aria-label="Filter by category">
              <button
                role="tab"
                aria-selected={activeCategory === 'All'}
                className={`${styles.tab}${activeCategory === 'All' ? ` ${styles.tabActive}` : ''}`}
                onClick={() => setActiveCategory('All')}
              >
                All
              </button>
              {CATEGORIES.map((cat) => (
                <button
                  key={cat}
                  role="tab"
                  aria-selected={activeCategory === cat}
                  className={`${styles.tab}${activeCategory === cat ? ` ${styles.tabActive}` : ''}`}
                  onClick={() => setActiveCategory(cat)}
                >
                  {CATEGORY_ICONS[cat]} {cat}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* ── Featured Article ── */}
        {showFeatured && (
          <section className={styles.featuredSection}>
            <div className={styles.inner}>
              <p className={styles.sectionLabel}>Featured</p>
              <Link href={`/resources/${FEATURED_ARTICLE.slug}`} className={styles.featuredCard}>
                <div className={styles.featuredLeft}>
                  <div>
                    <span className={`${styles.categoryBadge} ${badgeClass(FEATURED_ARTICLE.category)}`}>
                      {FEATURED_ARTICLE.category}
                    </span>
                    <h2 className={styles.featuredTitle}>{FEATURED_ARTICLE.title}</h2>
                    <p className={styles.featuredExcerpt}>{FEATURED_ARTICLE.excerpt}</p>
                  </div>
                  <div className={styles.featuredMeta}>
                    <span>{FEATURED_ARTICLE.readMinutes} min read</span>
                    <span>·</span>
                    <span>{formatDate(FEATURED_ARTICLE.publishedAt)}</span>
                    <span className={styles.readMore}>Read article →</span>
                  </div>
                </div>
                <div className={styles.featuredRight} aria-hidden>
                  <span className={styles.featuredIcon}>
                    {CATEGORY_ICONS[FEATURED_ARTICLE.category]}
                  </span>
                </div>
              </Link>
            </div>
          </section>
        )}

        {/* ── Articles Grid ── */}
        <section className={styles.gridSection}>
          <div className={styles.inner}>
            <div className={styles.gridHeader}>
              <h2 className={styles.h2}>
                {activeCategory === 'All' ? 'All Articles' : activeCategory}
              </h2>
              <span className={styles.resultsCount}>{filtered.length} articles</span>
            </div>

            {nonFeatured.length === 0 && !showFeatured ? (
              <div className={styles.noResults}>
                <p>No articles found in this category yet.</p>
                <button className={styles.resetBtn} onClick={() => setActiveCategory('All')}>
                  View all articles
                </button>
              </div>
            ) : (
              <div className={styles.grid}>
                {(showFeatured ? nonFeatured : filtered).map((article) => (
                  <Link
                    key={article.slug}
                    href={`/resources/${article.slug}`}
                    className={styles.card}
                  >
                    <div className={styles.cardTop}>
                      <span className={`${styles.categoryBadge} ${badgeClass(article.category)}`}>
                        {article.category}
                      </span>
                    </div>
                    <h3 className={styles.cardTitle}>{article.title}</h3>
                    <p className={styles.cardExcerpt}>{article.excerpt}</p>
                    <div className={styles.cardMeta}>
                      <div className={styles.cardMetaLeft}>
                        <span>{article.readMinutes} min read</span>
                        <span>·</span>
                        <span>{formatDate(article.publishedAt)}</span>
                      </div>
                      <span className={styles.cardLink}>Read more →</span>
                    </div>
                  </Link>
                ))}
              </div>
            )}
          </div>
        </section>
      </main>
      <SiteFooter />
    </>
  )
}
