import type { Metadata } from 'next'
import Link from 'next/link'
import { SiteNav } from '@/components/layout/SiteNav'
import { SiteFooter } from '@/components/layout/SiteFooter'
import { JsonLd } from '@/components/seo/JsonLd'
import styles from './fr.module.css'

export const metadata: Metadata = {
  title: 'Digital Kampus — Plateforme étudiante canadienne gratuite',
  description:
    'Suivez vos notes, trouvez un logement étudiant, découvrez des bourses, rejoignez des clubs et économisez sur des offres. Gratuit pour les étudiants des collèges et universités canadiens — en français et en anglais.',
  alternates: {
    canonical: 'https://digitalkampus.ca/fr',
    languages: {
      'en-CA': 'https://digitalkampus.ca',
      'fr-CA': 'https://digitalkampus.ca/fr',
    },
  },
}

const websiteFrLd = {
  '@context': 'https://schema.org',
  '@type': 'WebSite',
  name: 'Digital Kampus',
  url: 'https://digitalkampus.ca/fr',
  inLanguage: 'fr-CA',
  description: 'Plateforme bilingue (anglais/français) pour les étudiants des collèges et universités canadiens.',
}

const FEATURES = [
  { icon: '🎓', title: 'Bourses et aide financière', body: 'Trouvez et jumelez des bourses, subventions et bursaries auxquelles vous êtes admissible. Gratuit pour tous les étudiants, toujours.' },
  { icon: '🏠', title: 'Logement étudiant', body: 'Trouvez des logements à proximité de votre campus. Comparez les distances à pied, les prix et les commodités.' },
  { icon: '📚', title: 'Notes et GPA', body: 'Suivez vos notes de cours, calculez votre GPA et visualisez vos progrès académiques. Vos données restent privées.' },
  { icon: '🤝', title: 'Clubs et vie campus', body: 'Rejoignez des clubs, participez aux événements et connectez-vous avec d\'autres étudiants de votre établissement.' },
]

export default function FrenchHomePage() {
  return (
    <>
      <JsonLd data={websiteFrLd} />
      <SiteNav />
      <main>
        <section className={styles.hero}>
          <div className={styles.heroInner}>
            <div className={styles.badge}>🇨🇦 Bilingue — English / Français</div>
            <h1 className={styles.h1}>
              La plateforme étudiante<br />
              <span className={styles.hi}>du Canada</span>
            </h1>
            <p className={styles.lead}>
              Suivez vos notes, trouvez un logement, découvrez des bourses et connectez-vous avec votre campus — en français et en anglais. Gratuit pour les étudiants.
            </p>
            <div className={styles.ctaBtns}>
              <Link href="/signup" className={styles.ctaPrimary}>Créer un compte gratuit</Link>
              <Link href="/schools" className={styles.ctaSecondary}>Explorer les établissements</Link>
            </div>
          </div>
        </section>

        <section className={styles.features}>
          <div className={styles.inner}>
            <h2 className={styles.h2}>Tout pour la vie campus</h2>
            <div className={styles.grid}>
              {FEATURES.map(f => (
                <div key={f.title} className={styles.card}>
                  <span className={styles.cardIcon}>{f.icon}</span>
                  <h3 className={styles.cardTitle}>{f.title}</h3>
                  <p className={styles.cardBody}>{f.body}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className={styles.schools}>
          <div className={styles.inner}>
            <h2 className={styles.h2}>Universités et collèges</h2>
            <p className={styles.schoolsSub}>Plus de 200 établissements d'enseignement supérieur canadiens répertoriés.</p>
            <div className={styles.schoolChips}>
              {['Université McGill', 'Université de Montréal', 'Université Laval', 'UQAM', 'Université de Sherbrooke', 'Simon Fraser University'].map(s => (
                <Link key={s} href="/schools" className={styles.schoolChip}>{s}</Link>
              ))}
            </div>
            <Link href="/schools" className={styles.allSchools}>Voir tous les établissements →</Link>
          </div>
        </section>

        <section className={styles.scholarships}>
          <div className={styles.inner}>
            <div className={styles.schLeft}>
              <h2 className={styles.h2White}>Bourses et aide financière</h2>
              <p className={styles.schBody}>Nous jumelons vos critères avec des milliers de bourses, subventions et bursaries canadiennes. Le jumelage est gratuit pour tous les étudiants — toujours.</p>
              <Link href="/scholarships" className={styles.schCta}>Trouver des bourses gratuitement →</Link>
            </div>
            <div className={styles.schRight}>
              <div className={styles.schStat}>
                <span className={styles.schNum}>4,2 G$+</span>
                <span className={styles.schLabel}>en bourses répertoriées</span>
              </div>
              <div className={styles.schStat}>
                <span className={styles.schNum}>1 200+</span>
                <span className={styles.schLabel}>prix à travers le Canada</span>
              </div>
              <div className={styles.schStat}>
                <span className={styles.schNum}>Gratuit</span>
                <span className={styles.schLabel}>pour chaque étudiant·e</span>
              </div>
            </div>
          </div>
        </section>

        <section className={styles.cta}>
          <div className={styles.ctaInner}>
            <h2 className={styles.ctaH}>Rejoignez Digital Kampus</h2>
            <p className={styles.ctaBody}>Gratuit pour les étudiant·e·s. Toujours.</p>
            <Link href="/signup" className={styles.ctaBtn}>Créer un compte gratuit</Link>
          </div>
        </section>
      </main>
      <SiteFooter />
    </>
  )
}
