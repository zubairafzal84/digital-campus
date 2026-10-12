import type { Metadata } from 'next'
import { createServerClient } from '@supabase/ssr'
import { cookies } from 'next/headers'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import { InstitutionForm } from './InstitutionForm'
import styles from './edit.module.css'

export const metadata: Metadata = {
  title: 'Edit Institution | Admin',
  robots: { index: false, follow: false },
}

export const revalidate = 0

async function getInstitution(id: string) {
  const cookieStore = await cookies()
  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!,
    { cookies: { getAll: () => cookieStore.getAll() } },
  )

  const { data } = await supabase
    .from('institutions')
    .select('*')
    .eq('id', id)
    .single()

  return data
}

interface Props {
  params: Promise<{ id: string }>
}

export default async function EditInstitutionPage({ params }: Props) {
  const { id } = await params

  if (id === 'new') {
    return (
      <main className={styles.page}>
        <header className={styles.header}>
          <Link href="/institutions" className={styles.back}>← Institutions</Link>
          <h1 className={styles.h1}>Add institution</h1>
        </header>
        <InstitutionForm institution={null} />
      </main>
    )
  }

  const institution = await getInstitution(id)
  if (!institution) notFound()

  return (
    <main className={styles.page}>
      <header className={styles.header}>
        <Link href="/institutions" className={styles.back}>← Institutions</Link>
        <h1 className={styles.h1}>{institution.name_en}</h1>
      </header>
      <InstitutionForm institution={institution} />
    </main>
  )
}
