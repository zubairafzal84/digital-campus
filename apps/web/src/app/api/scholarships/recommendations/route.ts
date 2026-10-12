import { NextResponse } from 'next/server'
import { auth } from '@clerk/nextjs/server'
import { createClient } from '@/lib/supabase/server'
import {
  SCHOLARSHIPS,
  matchScholarships,
  type StudentProfile,
} from '@/app/scholarships/scholarships-data'

export const dynamic = 'force-dynamic'

export async function GET() {
  const { userId } = await auth()
  if (!userId) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  const supabase = await createClient()

  // Fetch student profile to personalise recommendations
  const { data: profileRow } = await supabase
    .from('student_profiles')
    .select(
      `
      year_of_study,
      institution:institutions ( slug ),
      programme:programmes ( name_en )
    `,
    )
    .eq('account_id', userId)
    .maybeSingle()

  // Build a StudentProfile for the matcher.
  // We don't store province / gpa / identity flags in student_profiles yet,
  // so we leave them null / false — the matcher handles nulls gracefully.
  const profile: StudentProfile = {
    province: null,
    schoolSlug: (profileRow?.institution as { slug?: string } | null)?.slug ?? null,
    yearOfStudy:
      profileRow?.year_of_study !== null && profileRow?.year_of_study !== undefined
        ? String(profileRow.year_of_study)
        : null,
    programme:
      (profileRow?.programme as { name_en?: string } | null)?.name_en ?? null,
    gpa: null,
    financialNeed: false,
    isIndigenous: false,
    isDisabled: false,
    isWomanInStem: false,
    isInternational: false,
  }

  const matched = matchScholarships(profile)
  const top10 = matched.slice(0, 10)

  return NextResponse.json({
    scholarships: top10,
    profileComplete: !!profileRow,
    total: SCHOLARSHIPS.length,
  })
}
