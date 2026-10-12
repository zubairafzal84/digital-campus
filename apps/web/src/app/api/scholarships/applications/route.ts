import { NextRequest, NextResponse } from 'next/server'
import { auth } from '@clerk/nextjs/server'
import { createClient } from '@/lib/supabase/server'

export const dynamic = 'force-dynamic'

// GET — list current user's applications, soonest deadline first
export async function GET() {
  const { userId } = await auth()
  if (!userId) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  const supabase = await createClient()
  const { data, error } = await supabase
    .from('scholarship_applications')
    .select('*')
    .eq('student_id', userId)
    .order('deadline_date', { ascending: true, nullsFirst: false })

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 })
  }

  return NextResponse.json({ applications: data ?? [] })
}

// POST — upsert an application
export async function POST(req: NextRequest) {
  const { userId } = await auth()
  if (!userId) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  const body = await req.json().catch(() => null)
  if (!body?.scholarship_id || !body?.scholarship_name) {
    return NextResponse.json({ error: 'scholarship_id and scholarship_name are required' }, { status: 400 })
  }

  const supabase = await createClient()
  const { data, error } = await supabase
    .from('scholarship_applications')
    .upsert(
      {
        student_id: userId,
        scholarship_id: body.scholarship_id,
        scholarship_name: body.scholarship_name,
        amount_max: body.amount_max ?? null,
        status: body.status ?? 'bookmarked',
        deadline_date: body.deadline_date ?? null,
        notes: body.notes ?? null,
        applied_at:
          body.status === 'submitted' || body.status === 'awarded'
            ? (body.applied_at ?? new Date().toISOString())
            : null,
      },
      { onConflict: 'student_id,scholarship_id' },
    )
    .select()
    .single()

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 })
  }

  return NextResponse.json({ application: data }, { status: 201 })
}

// DELETE — remove an application by scholarship_id query param
export async function DELETE(req: NextRequest) {
  const { userId } = await auth()
  if (!userId) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  const { searchParams } = new URL(req.url)
  const scholarshipId = searchParams.get('scholarship_id')
  if (!scholarshipId) {
    return NextResponse.json({ error: 'scholarship_id query param required' }, { status: 400 })
  }

  const supabase = await createClient()
  const { error } = await supabase
    .from('scholarship_applications')
    .delete()
    .eq('student_id', userId)
    .eq('scholarship_id', scholarshipId)

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 })
  }

  return NextResponse.json({ ok: true })
}
