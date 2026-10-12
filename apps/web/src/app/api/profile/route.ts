import { NextRequest, NextResponse } from 'next/server'
import { auth } from '@clerk/nextjs/server'
import { createClient } from '@/lib/supabase/server'

export async function PATCH(request: NextRequest) {
  const { userId } = await auth()
  if (!userId) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

  try {
    const body = await request.json()
    const allowed = ['institution_id', 'programme', 'year_of_study', 'preferred_language', 'is_profile_public']
    const update: Record<string, unknown> = {}
    for (const key of allowed) {
      if (key in body) update[key] = body[key]
    }

    const supabase = await createClient()
    const { error } = await supabase
      .from('student_profiles')
      .upsert({ account_id: userId, ...update }, { onConflict: 'account_id' })

    if (error) return NextResponse.json({ error: error.message }, { status: 400 })
    return NextResponse.json({ ok: true })
  } catch {
    return NextResponse.json({ error: 'Server error' }, { status: 500 })
  }
}

export async function GET() {
  const { userId } = await auth()
  if (!userId) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

  const supabase = await createClient()
  const { data } = await supabase
    .from('student_profiles')
    .select('institution_id, programme, year_of_study, preferred_language, is_profile_public, is_verified')
    .eq('account_id', userId)
    .maybeSingle()

  return NextResponse.json(data ?? {})
}
