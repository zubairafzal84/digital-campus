import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase/server'
import { auth } from '@clerk/nextjs/server'

type RouteContext = { params: Promise<{ id: string }> }

type QuestionType =
  | 'multiple_choice'
  | 'checkbox'
  | 'rating'
  | 'nps'
  | 'short_text'
  | 'long_text'
  | 'yes_no'
  | 'scale'

interface SurveyQuestion {
  id: string
  question_text: string
  question_type: QuestionType
  options: string[] | null
  scale_min: number
  scale_max: number
  scale_min_label: string | null
  scale_max_label: string | null
  sort_order: number
}

// GET /api/surveys/[id]/results
// Survey results analytics — creator only.
// Returns per-question aggregations.
export async function GET(_request: NextRequest, { params }: RouteContext) {
  const { userId } = await auth()

  if (!userId) {
    return NextResponse.json({ error: 'Authentication required.' }, { status: 401 })
  }

  const { id: surveyId } = await params

  const supabase = await createClient()

  // Verify the caller is the survey creator
  const { data: survey, error: surveyError } = await supabase
    .from('surveys')
    .select('id, title, created_by, current_participants, max_participants, created_at')
    .eq('id', surveyId)
    .eq('created_by', userId)
    .single()

  if (surveyError || !survey) {
    return NextResponse.json({ error: 'Survey not found or access denied.' }, { status: 404 })
  }

  // Load questions
  const { data: questions, error: qError } = await supabase
    .from('survey_questions')
    .select('id, question_text, question_type, options, scale_min, scale_max, scale_min_label, scale_max_label, sort_order')
    .eq('survey_id', surveyId)
    .order('sort_order', { ascending: true })

  if (qError) {
    return NextResponse.json({ error: qError.message }, { status: 500 })
  }

  // Load all responses
  const { data: responses, error: rError } = await supabase
    .from('survey_responses')
    .select('answers, completed_at')
    .eq('survey_id', surveyId)

  if (rError) {
    return NextResponse.json({ error: rError.message }, { status: 500 })
  }

  const totalResponses = responses?.length ?? 0

  // Per-question aggregation
  const questionResults = (questions as SurveyQuestion[] ?? []).map((q) => {
    const rawAnswers = (responses ?? [])
      .map((r) => (r.answers as Record<string, unknown>)[q.id])
      .filter((a) => a !== undefined && a !== null && a !== '')

    const answeredCount = rawAnswers.length

    if (q.question_type === 'multiple_choice' || q.question_type === 'yes_no') {
      const counts: Record<string, number> = {}
      for (const answer of rawAnswers) {
        const key = String(answer)
        counts[key] = (counts[key] ?? 0) + 1
      }
      const distribution = Object.entries(counts).map(([option, count]) => ({
        option,
        count,
        percentage: answeredCount > 0 ? Math.round((count / answeredCount) * 100) : 0,
      }))
      return {
        question_id: q.id,
        question_text: q.question_text,
        question_type: q.question_type,
        answered_count: answeredCount,
        distribution,
      }
    }

    if (q.question_type === 'checkbox') {
      // answers may be arrays of selected options
      const counts: Record<string, number> = {}
      let totalSelections = 0
      for (const answer of rawAnswers) {
        const selections = Array.isArray(answer) ? answer : [answer]
        for (const sel of selections) {
          const key = String(sel)
          counts[key] = (counts[key] ?? 0) + 1
          totalSelections++
        }
      }
      const distribution = Object.entries(counts).map(([option, count]) => ({
        option,
        count,
        percentage: answeredCount > 0 ? Math.round((count / answeredCount) * 100) : 0,
      }))
      return {
        question_id: q.id,
        question_text: q.question_text,
        question_type: q.question_type,
        answered_count: answeredCount,
        total_selections: totalSelections,
        distribution,
      }
    }

    if (
      q.question_type === 'rating' ||
      q.question_type === 'scale' ||
      q.question_type === 'nps'
    ) {
      const numeric = rawAnswers.map(Number).filter((n) => !isNaN(n))
      const average =
        numeric.length > 0
          ? Math.round((numeric.reduce((a, b) => a + b, 0) / numeric.length) * 100) / 100
          : null

      // Distribution bucket per integer value
      const counts: Record<string, number> = {}
      for (const val of numeric) {
        const key = String(val)
        counts[key] = (counts[key] ?? 0) + 1
      }
      const distribution = Object.entries(counts)
        .sort(([a], [b]) => Number(a) - Number(b))
        .map(([value, count]) => ({
          value: Number(value),
          count,
          percentage: numeric.length > 0 ? Math.round((count / numeric.length) * 100) : 0,
        }))

      // NPS: promoters (9-10), passives (7-8), detractors (0-6)
      if (q.question_type === 'nps') {
        const promoters = numeric.filter((n) => n >= 9).length
        const passives = numeric.filter((n) => n >= 7 && n <= 8).length
        const detractors = numeric.filter((n) => n <= 6).length
        const npsScore =
          numeric.length > 0
            ? Math.round(((promoters - detractors) / numeric.length) * 100)
            : null
        return {
          question_id: q.id,
          question_text: q.question_text,
          question_type: q.question_type,
          answered_count: answeredCount,
          average,
          nps_score: npsScore,
          promoters,
          passives,
          detractors,
          distribution,
        }
      }

      return {
        question_id: q.id,
        question_text: q.question_text,
        question_type: q.question_type,
        answered_count: answeredCount,
        average,
        scale_min: q.scale_min,
        scale_max: q.scale_max,
        scale_min_label: q.scale_min_label,
        scale_max_label: q.scale_max_label,
        distribution,
      }
    }

    // short_text / long_text — return raw text array
    return {
      question_id: q.id,
      question_text: q.question_text,
      question_type: q.question_type,
      answered_count: answeredCount,
      responses: rawAnswers.map(String),
    }
  })

  // Completion rate: responses / max_participants (or 100% if no cap set)
  const completionRate =
    survey.max_participants != null && survey.max_participants > 0
      ? Math.round((totalResponses / survey.max_participants) * 100)
      : null

  return NextResponse.json({
    survey_id: surveyId,
    title: survey.title,
    total_responses: totalResponses,
    max_participants: survey.max_participants,
    completion_rate: completionRate,
    questions: questionResults,
  })
}
