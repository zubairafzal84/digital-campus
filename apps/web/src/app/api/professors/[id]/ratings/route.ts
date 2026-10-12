import { auth } from '@clerk/nextjs/server'
import { NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase/server'

const VALID_GRADES = new Set([
  'A+', 'A', 'A-',
  'B+', 'B', 'B-',
  'C+', 'C', 'C-',
  'D', 'F', 'Drop', 'Audit',
])

export async function GET(
  _request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params

  const supabase = await createClient()

  const { data, error } = await supabase
    .from('professor_ratings')
    .select('*')
    .eq('professor_id', id)
    .order('created_at', { ascending: false })

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 })
  }

  return NextResponse.json({ ratings: data ?? [] })
}

export async function POST(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { userId } = await auth()
  if (!userId) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  const { id: professorId } = await params

  let body: {
    overall_rating?: unknown
    clarity_rating?: unknown
    helpfulness_rating?: unknown
    difficulty_rating?: unknown
    would_take_again?: unknown
    review_text?: unknown
    course_code?: unknown
    grade_received?: unknown
  }

  try {
    body = await request.json()
  } catch {
    return NextResponse.json({ error: 'Invalid JSON body' }, { status: 400 })
  }

  const {
    overall_rating,
    clarity_rating,
    helpfulness_rating,
    difficulty_rating,
    would_take_again,
    review_text,
    course_code,
    grade_received,
  } = body

  // Validate integer ratings 1-5 (all required)
  for (const [field, value] of [
    ['overall_rating', overall_rating],
    ['clarity_rating', clarity_rating],
    ['helpfulness_rating', helpfulness_rating],
    ['difficulty_rating', difficulty_rating],
  ] as [string, unknown][]) {
    if (typeof value !== 'number' || !Number.isInteger(value) || value < 1 || value > 5) {
      return NextResponse.json(
        { error: `${field} must be an integer between 1 and 5` },
        { status: 400 }
      )
    }
  }

  // Validate would_take_again (required boolean)
  if (typeof would_take_again !== 'boolean') {
    return NextResponse.json({ error: 'would_take_again must be a boolean' }, { status: 400 })
  }

  // Validate review_text length
  if (review_text !== undefined && review_text !== null) {
    if (typeof review_text !== 'string') {
      return NextResponse.json({ error: 'review_text must be a string' }, { status: 400 })
    }
    if (review_text.length > 500) {
      return NextResponse.json(
        { error: 'review_text must be 500 characters or fewer' },
        { status: 400 }
      )
    }
  }

  // Validate grade_received
  if (grade_received !== undefined && grade_received !== null) {
    if (typeof grade_received !== 'string' || !VALID_GRADES.has(grade_received)) {
      return NextResponse.json(
        {
          error:
            'grade_received must be one of: A+, A, A-, B+, B, B-, C+, C, C-, D, F, Drop, Audit',
        },
        { status: 400 }
      )
    }
  }

  // Validate course_code
  if (course_code !== undefined && course_code !== null && typeof course_code !== 'string') {
    return NextResponse.json({ error: 'course_code must be a string' }, { status: 400 })
  }

  const supabase = await createClient()

  // Verify professor exists and is published
  const { data: professor, error: profError } = await supabase
    .from('professors')
    .select('id')
    .eq('id', professorId)
    .eq('is_published', true)
    .single()

  if (profError || !professor) {
    return NextResponse.json({ error: 'Professor not found' }, { status: 404 })
  }

  const { data, error } = await supabase
    .from('professor_ratings')
    .insert({
      professor_id: professorId,
      reviewer_id: userId,
      course_code: course_code ?? null,
      overall_rating: overall_rating as number,
      clarity_rating: clarity_rating as number,
      helpfulness_rating: helpfulness_rating as number,
      difficulty_rating: difficulty_rating as number,
      would_take_again: would_take_again as boolean,
      review_text: review_text ?? null,
      grade_received: grade_received ?? null,
    })
    .select('*')
    .single()

  if (error) {
    // Unique constraint violation — user already rated this professor
    if (error.code === '23505') {
      return NextResponse.json(
        { error: 'You have already submitted a rating for this professor' },
        { status: 409 }
      )
    }
    return NextResponse.json({ error: error.message }, { status: 500 })
  }

  return NextResponse.json({ rating: data }, { status: 201 })
}
