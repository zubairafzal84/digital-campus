import type { Metadata } from 'next'
import { createServerClient } from '@supabase/ssr'
import { cookies } from 'next/headers'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import { ScholarshipForm } from './ScholarshipForm'
import styles from './edit.module.css'

export const metadata: Metadata = {
  title: 'Edit Scholarship | Admin',
  robots: { index: false, follow: false },
}

export const revalidate = 0

async function getScholarship(id: string) {
  const cookieStore = await cookies()
  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!,
    { cookies: { getAll: () => cookieStore.getAll() } },
  )

  const { data } = await supabase
    .from('scholarships')
    .select('*')
    .eq('id', id)
    .single()

  return data
}

interface Props {
  params: Promise<{ id: string }>
}

export default async function EditScholarshipPage({ params }: Props) {
  const { id } = await params

  if (id === 'new') {
    return (
      <main className={styles.page}>
        <header className={styles.header}>
          <Link href="/scholarships" className={styles.back}>← Scholarships</Link>
          <h1 className={styles.h1}>Add scholarship</h1>
        </header>
        <ScholarshipForm scholarship={null} />
      </main>
    )
  }

  const scholarship = await getScholarship(id)
  if (!scholarship) notFound()

  return (
    <main className={styles.page}>
      <header className={styles.header}>
        <Link href="/scholarships" className={styles.back}>← Scholarships</Link>
        <h1 className={styles.h1}>{scholarship.name_en}</h1>
      </header>
      <ScholarshipForm scholarship={scholarship} />
    </main>
  )
}
