import { NextRequest, NextResponse } from 'next/server'
import { auth } from '@clerk/nextjs/server'
import { createClient } from '@/lib/supabase/server'

export async function POST(request: NextRequest) {
  const { userId } = await auth()
  if (!userId) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

  try {
    const body = await request.json()
    const { institution_id, student_email, programme, year_of_study } = body

    if (!institution_id || !student_email) {
      return NextResponse.json({ error: 'institution_id and student_email are required.' }, { status: 400 })
    }

    const emailDomain = student_email.split('@')[1] ?? ''
    // Edu emails get automatic pending status; others need manual review
    const method = emailDomain.endsWith('.ca') || emailDomain.endsWith('.edu') ? 'email' : 'manual'

    const supabase = await createClient()

    const { error } = await supabase
      .from('student_verifications')
      .upsert(
        {
          account_id:     userId,
          institution_id,
          student_email,
          programme:      programme ?? null,
          year_of_study:  year_of_study ?? null,
          method,
          status:         'pending',
          submitted_at:   new Date().toISOString(),
        },
        { onConflict: 'account_id' },
      )

    if (error) return NextResponse.json({ error: error.message }, { status: 400 })

    return NextResponse.json({ ok: true, method })
  } catch {
    return NextResponse.json({ error: 'Server error' }, { status: 500 })
  }
}

export async function GET() {
  const { userId } = await auth()
  if (!userId) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

  const supabase = await createClient()
  const { data } = await supabase
    .from('student_verifications')
    .select('status, method, submitted_at, institution_id')
    .eq('account_id', userId)
    .maybeSingle()

  return NextResponse.json(data ?? { status: null })
}
