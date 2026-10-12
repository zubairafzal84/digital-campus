import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase/server'
import { auth } from '@clerk/nextjs/server'

type RouteContext = { params: Promise<{ id: string }> }

// POST /api/surveys/[id]/respond
// Submit a survey response. Auth required.
// Validates all required questions are answered. Checks not already responded.
export async function POST(request: NextRequest, { params }: RouteContext) {
  const { userId } = await auth()

  if (!userId) {
    return NextResponse.json({ error: 'Authentication required.' }, { status: 401 })
  }

  const { id: surveyId } = await params

  const body = await request.json().catch(() => null)

  if (!body || typeof body.answers !== 'object' || body.answers === null) {
    return NextResponse.json(
      { error: 'answers object is required.' },
      { status: 400 },
    )
  }

  const supabase = await createClient()

  // 1. Load the survey to confirm it is active
  const { data: survey, error: surveyError } = await supabase
    .from('surveys')
    .select('id, status, max_participants, current_participants, closes_at')
    .eq('id', surveyId)
    .single()

  if (surveyError || !survey) {
    return NextResponse.json({ error: 'Survey not found.' }, { status: 404 })
  }

  if (survey.status !== 'active') {
    return NextResponse.json({ error: 'This survey is not currently accepting responses.' }, { status: 409 })
  }

  if (survey.closes_at && new Date(survey.closes_at) < new Date()) {
    return NextResponse.json({ error: 'This survey has closed.' }, { status: 409 })
  }

  if (
    survey.max_participants !== null &&
    survey.current_participants >= survey.max_participants
  ) {
    return NextResponse.json({ error: 'This survey has reached its maximum number of participants.' }, { status: 409 })
  }

  // 2. Check user has not already responded
  const { data: existing } = await supabase
    .from('survey_responses')
    .select('id')
    .eq('survey_id', surveyId)
    .eq('respondent_id', userId)
    .maybeSingle()

  if (existing) {
    return NextResponse.json({ error: 'You have already responded to this survey.' }, { status: 409 })
  }

  // 3. Load questions to validate required answers
  const { data: questions, error: qError } = await supabase
    .from('survey_questions')
    .select('id, is_required')
    .eq('survey_id', surveyId)

  if (qError) {
    return NextResponse.json({ error: qError.message }, { status: 500 })
  }

  const answers: Record<string, unknown> = body.answers

  const missingRequired = (questions ?? []).filter(
    (q) => q.is_required && (answers[q.id] === undefined || answers[q.id] === null || answers[q.id] === ''),
  )

  if (missingRequired.length > 0) {
    return NextResponse.json(
      {
        error: 'All required questions must be answered.',
        missing_question_ids: missingRequired.map((q) => q.id),
      },
      { status: 422 },
    )
  }

  // 4. Insert the response — trigger will increment current_participants
  const { data: response, error: insertError } = await supabase
    .from('survey_responses')
    .insert({
      survey_id: surveyId,
      respondent_id: userId,
      answers,
    })
    .select('id, completed_at')
    .single()

  if (insertError) {
    // Unique constraint violation = already responded (race condition guard)
    if (insertError.code === '23505') {
      return NextResponse.json({ error: 'You have already responded to this survey.' }, { status: 409 })
    }
    return NextResponse.json({ error: insertError.message }, { status: 500 })
  }

  return NextResponse.json({ response_id: response.id, completed_at: response.completed_at }, { status: 201 })
}
