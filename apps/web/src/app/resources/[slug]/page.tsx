import type { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { SiteNav } from '@/components/layout/SiteNav'
import { SiteFooter } from '@/components/layout/SiteFooter'
import { ARTICLES, getArticleBySlug, getRelatedArticles } from '../articles-data'
import styles from './article.module.css'

const BASE = 'https://digitalkampus.ca'

interface Props {
  params: Promise<{ slug: string }>
}

export async function generateStaticParams() {
  return ARTICLES.map((a) => ({ slug: a.slug }))
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  const article = getArticleBySlug(slug)
  if (!article) return { title: 'Article Not Found' }

  return {
    title: `${article.title} | Digital Kampus`,
    description: article.excerpt,
    openGraph: {
      title: article.title,
      description: article.excerpt,
      url: `${BASE}/resources/${article.slug}`,
      type: 'article',
      publishedTime: article.publishedAt,
      tags: article.tags,
    },
    twitter: {
      card: 'summary_large_image',
      title: article.title,
      description: article.excerpt,
    },
  }
}

function badgeClass(category: string, s: Record<string, string>): string {
  const map: Record<string, string> = {
    Scholarships: s['badge-Scholarships'],
    Housing: s['badge-Housing'],
    'Student Finance': s['badge-StudentFinance'],
    'Career & Co-op': s['badge-CareerCoop'],
    'Campus Life': s['badge-CampusLife'],
    'Health & Wellness': s['badge-HealthWellness'],
    'Study Tips': s['badge-StudyTips'],
  }
  return map[category] ?? s['badge-StudyTips']
}

function formatDate(iso: string): string {
  return new Date(iso).toLocaleDateString('en-CA', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  })
}

/**
 * Very lightweight markdown-to-HTML renderer covering:
 * headings (##, ###, ####), bold, tables, unordered / ordered lists,
 * paragraphs, and horizontal rules.
 *
 * This avoids a full markdown dependency while keeping full content readable.
 */
function renderMarkdown(md: string): string {
  const lines = md.split('\n')
  const htmlLines: string[] = []
  let inTable = false
  let tableHeaderDone = false
  let inList: null | 'ul' | 'ol' = null

  function closePending() {
    if (inTable) { htmlLines.push('</tbody></table>'); inTable = false; tableHeaderDone = false }
    if (inList) { htmlLines.push(inList === 'ul' ? '</ul>' : '</ol>'); inList = null }
  }

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i]

    // Headings
    if (line.startsWith('#### ')) {
      closePending()
      htmlLines.push(`<h4>${escape(line.slice(5))}</h4>`)
      continue
    }
    if (line.startsWith('### ')) {
      closePending()
      htmlLines.push(`<h3>${escape(line.slice(4))}</h3>`)
      continue
    }
    if (line.startsWith('## ')) {
      closePending()
      htmlLines.push(`<h2>${escape(line.slice(3))}</h2>`)
      continue
    }

    // HR
    if (/^---+$/.test(line.trim())) {
      closePending()
      htmlLines.push('<hr />')
      continue
    }

    // Tables
    if (line.startsWith('|')) {
      const cells = line.split('|').filter((_, idx, arr) => idx > 0 && idx < arr.length - 1)
      if (!inTable) {
        closePending()
        inTable = true
        tableHeaderDone = false
        htmlLines.push('<table><thead><tr>')
        cells.forEach((c) => htmlLines.push(`<th>${inlineFormat(c.trim())}</th>`))
        htmlLines.push('</tr></thead><tbody>')
        tableHeaderDone = false
        continue
      }
      // separator row (---|---)
      if (cells.every((c) => /^[-: ]+$/.test(c))) continue
      if (!tableHeaderDone) { tableHeaderDone = true; continue }
      htmlLines.push('<tr>')
      cells.forEach((c) => htmlLines.push(`<td>${inlineFormat(c.trim())}</td>`))
      htmlLines.push('</tr>')
      continue
    }

    // Unordered list
    if (/^[-*] /.test(line)) {
      if (inList === 'ol') { htmlLines.push('</ol>'); inList = null }
      if (inTable) { htmlLines.push('</tbody></table>'); inTable = false }
      if (!inList) { htmlLines.push('<ul>'); inList = 'ul' }
      htmlLines.push(`<li>${inlineFormat(line.slice(2))}</li>`)
      continue
    }

    // Ordered list
    if (/^\d+\. /.test(line)) {
      if (inList === 'ul') { htmlLines.push('</ul>'); inList = null }
      if (inTable) { htmlLines.push('</tbody></table>'); inTable = false }
      if (!inList) { htmlLines.push('<ol>'); inList = 'ol' }
      htmlLines.push(`<li>${inlineFormat(line.replace(/^\d+\. /, ''))}</li>`)
      continue
    }

    // Empty line
    if (line.trim() === '') {
      closePending()
      continue
    }

    // Paragraph
    closePending()
    htmlLines.push(`<p>${inlineFormat(line)}</p>`)
  }

  closePending()
  return htmlLines.join('\n')
}

function escape(str: string): string {
  return str.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')
}

function inlineFormat(str: string): string {
  // Bold **text**
  let s = str.replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>')
  // Italic *text*
  s = s.replace(/\*(.+?)\*/g, '<em>$1</em>')
  // Inline code `code`
  s = s.replace(/`([^`]+)`/g, '<code>$1</code>')
  // Links [text](url)
  s = s.replace(/\[([^\]]+)\]\(([^)]+)\)/g, '<a href="$2">$1</a>')
  return s
}

export const revalidate = 86400

export default async function ArticlePage({ params }: Props) {
  const { slug } = await params
  const article = getArticleBySlug(slug)
  if (!article) notFound()

  const related = getRelatedArticles(article)
  const htmlContent = renderMarkdown(article.content)

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: article.title,
    description: article.excerpt,
    datePublished: article.publishedAt,
    dateModified: article.publishedAt,
    author: {
      '@type': 'Organization',
      name: 'Digital Kampus',
      url: BASE,
    },
    publisher: {
      '@type': 'Organization',
      name: 'Digital Kampus',
      url: BASE,
    },
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': `${BASE}/resources/${article.slug}`,
    },
    keywords: article.tags.join(', '),
    articleSection: article.category,
    timeRequired: `PT${article.readMinutes}M`,
  }

  return (
    <div className={styles.pageWrap}>
      <SiteNav />
      <main>
        {/* JSON-LD */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />

        {/* ── Hero ── */}
        <section className={styles.hero}>
          <div className={styles.inner}>
            <nav className={styles.breadcrumb} aria-label="Breadcrumb">
              <Link href="/">Home</Link>
              <span>›</span>
              <Link href="/resources">Resources</Link>
              <span>›</span>
              <span aria-current="page">{article.category}</span>
            </nav>
            <span className={`${styles.categoryBadge} ${badgeClass(article.category, styles)}`}>
              {article.category}
            </span>
            <h1 className={styles.h1}>{article.title}</h1>
            <div className={styles.meta}>
              <span>{article.readMinutes} min read</span>
              <span className={styles.metaDot}>·</span>
              <time dateTime={article.publishedAt}>{formatDate(article.publishedAt)}</time>
            </div>
          </div>
        </section>

        {/* ── Article Content ── */}
        <section className={styles.articleSection}>
          <article className={styles.inner}>
            <div
              className={styles.content}
              dangerouslySetInnerHTML={{ __html: htmlContent }}
            />

            {/* Tags */}
            {article.tags.length > 0 && (
              <div className={styles.tagsSection}>
                <p className={styles.tagsLabel}>Topics</p>
                <div className={styles.tags}>
                  {article.tags.map((tag) => (
                    <span key={tag} className={styles.tag}>
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            )}
          </article>
        </section>

        {/* ── Related Articles ── */}
        {related.length > 0 && (
          <section className={styles.relatedSection}>
            <div className={styles.relatedInner}>
              <h2 className={styles.h2}>Related Articles</h2>
              <div className={styles.relatedGrid}>
                {related.map((rel) => (
                  <Link key={rel.slug} href={`/resources/${rel.slug}`} className={styles.relatedCard}>
                    <span className={`${styles.categoryBadge} ${badgeClass(rel.category, styles)}`}>
                      {rel.category}
                    </span>
                    <p className={styles.relatedTitle}>{rel.title}</p>
                    <p className={styles.relatedMeta}>{rel.readMinutes} min read</p>
                  </Link>
                ))}
              </div>
            </div>
          </section>
        )}

        {/* ── Back Link ── */}
        <div className={styles.backSection}>
          <div className={styles.relatedInner}>
            <Link href="/resources" className={styles.backLink}>
              ← Back to Resources
            </Link>
          </div>
        </div>
      </main>
      <SiteFooter />
    </div>
  )
}
