import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase/server'
import { auth } from '@clerk/nextjs/server'

// GET /api/surveys
// List active surveys. Params: school (filter), limit (default 20).
// Returns surveys with question_count.
export async function GET(request: NextRequest) {
  const { searchParams } = request.nextUrl
  const school = searchParams.get('school')
  const limit = Math.min(parseInt(searchParams.get('limit') ?? '20', 10), 100)

  const supabase = await createClient()

  let query = supabase
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
      survey_questions ( count )
    `)
    .eq('status', 'active')
    .order('created_at', { ascending: false })
    .limit(limit)

  if (school) {
    // Filter: survey targets this school OR has no school targeting (null = all schools)
    query = query.or(`target_schools.is.null,target_schools.cs.{"${school}"}`)
  }

  const { data, error } = await query

  if (error) {
    return NextResponse.json({ surveys: [] })
  }

  // Flatten question count from the nested aggregate
  const surveys = (data ?? []).map((s) => {
    const { survey_questions, ...rest } = s as Record<string, unknown> & {
      survey_questions: { count: number }[]
    }
    return {
      ...rest,
      question_count: survey_questions?.[0]?.count ?? 0,
    }
  })

  return NextResponse.json({ surveys })
}

// POST /api/surveys
// Auth required. Create a survey (draft). Body: full survey object.
export async function POST(request: NextRequest) {
  const { userId } = await auth()

  if (!userId) {
    return NextResponse.json({ error: 'Authentication required.' }, { status: 401 })
  }

  const body = await request.json().catch(() => null)

  if (!body || !body.title || !body.organization_name) {
    return NextResponse.json(
      { error: 'title and organization_name are required.' },
      { status: 400 },
    )
  }

  const {
    title,
    description,
    organization_name,
    organization_logo_url,
    reward_description,
    target_schools,
    target_programmes,
    target_year_min,
    target_year_max,
    max_participants,
    estimated_minutes,
    closes_at,
    is_anonymous,
    questions,
  } = body

  const supabase = await createClient()

  // Insert the survey as a draft
  const { data: survey, error: surveyError } = await supabase
    .from('surveys')
    .insert({
      title: title.trim(),
      description: description?.trim() ?? null,
      organization_name: organization_name.trim(),
      organization_logo_url: organization_logo_url ?? null,
      created_by: userId,
      status: 'draft',
      reward_description: reward_description ?? null,
      target_schools: target_schools ?? null,
      target_programmes: target_programmes ?? null,
      target_year_min: target_year_min ?? null,
      target_year_max: target_year_max ?? null,
      max_participants: max_participants ?? null,
      estimated_minutes: estimated_minutes ?? 5,
      closes_at: closes_at ?? null,
      is_anonymous: is_anonymous ?? true,
    })
    .select('id')
    .single()

  if (surveyError) {
    return NextResponse.json({ error: surveyError.message }, { status: 500 })
  }

  // Insert questions if provided
  if (Array.isArray(questions) && questions.length > 0) {
    const questionRows = questions.map((q, idx) => ({
      survey_id: survey.id,
      question_text: q.question_text,
      question_type: q.question_type,
      options: q.options ?? null,
      scale_min: q.scale_min ?? 1,
      scale_max: q.scale_max ?? 5,
      scale_min_label: q.scale_min_label ?? null,
      scale_max_label: q.scale_max_label ?? null,
      is_required: q.is_required ?? true,
      sort_order: q.sort_order ?? idx,
    }))

    const { error: qError } = await supabase.from('survey_questions').insert(questionRows)

    if (qError) {
      return NextResponse.json({ error: qError.message }, { status: 500 })
    }
  }

  return NextResponse.json({ survey_id: survey.id }, { status: 201 })
}
