import { NextRequest, NextResponse } from 'next/server'
import { auth } from '@clerk/nextjs/server'
import { createClient } from '@/lib/supabase/server'

export async function GET() {
  const { userId } = await auth()
  if (!userId) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

  const supabase = await createClient()
  const { data, error } = await supabase
    .from('student_profiles')
    .select('grade_data')
    .eq('account_id', userId)
    .maybeSingle()

  if (error) return NextResponse.json({ error: error.message }, { status: 400 })

  const gradeData = data?.grade_data ?? { courses: [] }
  return NextResponse.json(gradeData)
}

export async function PATCH(request: NextRequest) {
  const { userId } = await auth()
  if (!userId) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

  try {
    const body = await request.json()
    const { grade_data } = body as { grade_data: unknown }

    if (!grade_data || typeof grade_data !== 'object') {
      return NextResponse.json({ error: 'Invalid grade_data' }, { status: 400 })
    }

    const supabase = await createClient()
    const { error } = await supabase
      .from('student_profiles')
      .upsert(
        { account_id: userId, grade_data },
        { onConflict: 'account_id' },
      )

    if (error) return NextResponse.json({ error: error.message }, { status: 400 })
    return NextResponse.json({ ok: true })
  } catch {
    return NextResponse.json({ error: 'Server error' }, { status: 500 })
  }
}
