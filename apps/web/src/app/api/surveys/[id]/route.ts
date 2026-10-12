import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase/server'
import { auth } from '@clerk/nextjs/server'

type RouteContext = { params: Promise<{ id: string }> }

// GET /api/surveys/[id]
// Survey detail with questions. Returns survey + questions ordered by sort_order.
export async function GET(_request: NextRequest, { params }: RouteContext) {
  const { id } = await params

  const supabase = await createClient()

  const { data: survey, error } = await supabase
    .from('surveys')
    .select(`
      id,
      title,
      description,
      organization_name,
      organization_logo_url,
      status,
      reward_description,
      target_schools,
      target_programmes,
      target_year_min,
      target_year_max,
      max_participants,
      current_participants,
      estimated_minutes,
      closes_at,
      is_anonymous,
      created_at,
      survey_questions (
        id,
        question_text,
        question_type,
        options,
        scale_min,
        scale_max,
        scale_min_label,
        scale_max_label,
        is_required,
        sort_order
      )
    `)
    .eq('id', id)
    .single()

  if (error || !survey) {
    return NextResponse.json({ error: 'Survey not found.' }, { status: 404 })
  }

  // Sort questions by sort_order (RLS SELECT may return in any order)
  const questions = (
    (survey as unknown as { survey_questions: { sort_order: number }[] }).survey_questions ?? []
  ).sort((a, b) => a.sort_order - b.sort_order)

  return NextResponse.json({
    survey: {
      ...(survey as Record<string, unknown>),
      survey_questions: undefined,
      questions,
    },
  })
}

// PATCH /api/surveys/[id]
// Update survey (creator only). Can change status, title, description, and other fields.
export async function PATCH(request: NextRequest, { params }: RouteContext) {
  const { userId } = await auth()

  if (!userId) {
    return NextResponse.json({ error: 'Authentication required.' }, { status: 401 })
  }

  const { id } = await params

  const body = await request.json().catch(() => null)

  if (!body) {
    return NextResponse.json({ error: 'Request body is required.' }, { status: 400 })
  }

  // Whitelist updatable fields
  const allowed = [
    'title',
    'description',
    'status',
    'reward_description',
    'organization_name',
    'organization_logo_url',
    'target_schools',
    'target_programmes',
    'target_year_min',
    'target_year_max',
    'max_participants',
    'estimated_minutes',
    'closes_at',
    'is_anonymous',
  ]

  const updates: Record<string, unknown> = {}
  for (const key of allowed) {
    if (key in body) {
      updates[key] = body[key]
    }
  }

  if (Object.keys(updates).length === 0) {
    return NextResponse.json({ error: 'No valid fields to update.' }, { status: 400 })
  }

  const supabase = await createClient()

  // RLS will enforce created_by = auth.uid()::text — a mismatch returns no rows
  const { data, error } = await supabase
    .from('surveys')
    .update(updates)
    .eq('id', id)
    .eq('created_by', userId)
    .select('id, title, status')
    .single()

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 })
  }

  if (!data) {
    return NextResponse.json({ error: 'Survey not found or access denied.' }, { status: 404 })
  }

  return NextResponse.json({ survey: data })
}
