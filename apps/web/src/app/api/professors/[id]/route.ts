import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase/server'

export async function GET(
  _request: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  const { id } = await params
  const supabase = await createClient()

  const { data: professor, error: profErr } = await supabase
    .from('professors')
    .select(`
      id,
      name,
      school,
      department,
      course_codes,
      ratings_count,
      avg_overall_rating,
      avg_clarity_rating,
      avg_helpfulness_rating,
      avg_difficulty_rating,
      would_take_again_pct,
      is_published
    `)
    .eq('id', id)
    .eq('is_published', true)
    .single()

  if (profErr || !professor) {
    return NextResponse.json({ error: 'Professor not found.' }, { status: 404 })
  }

  const { data: reviews } = await supabase
    .from('professor_ratings')
    .select(`
      id,
      course_code,
      grade_received,
      overall_rating,
      clarity_rating,
      helpfulness_rating,
      difficulty_rating,
      would_take_again,
      review_text,
      created_at
    `)
    .eq('professor_id', id)
    .order('created_at', { ascending: false })
    .limit(50)

  return NextResponse.json({ professor, reviews: reviews ?? [] })
}
