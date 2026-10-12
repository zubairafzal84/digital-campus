import { auth } from '@clerk/nextjs/server'
import { NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase/server'

type Params = { params: Promise<{ slug: string }> }

// ------------------------------------------------------------------
// GET /api/schools/[slug]/reviews
// Returns published reviews and aggregated ratings (when >= 3 exist).
// ------------------------------------------------------------------
export async function GET(_req: Request, { params }: Params) {
  const { slug } = await params

  if (!slug || typeof slug !== 'string') {
    return NextResponse.json({ error: 'Invalid school slug' }, { status: 400 })
  }

  const supabase = await createClient()

  const { data: reviews, error } = await supabase
    .from('school_reviews')
    .select(
      'id, school_slug, overall_rating, academics_rating, campus_life_rating, housing_rating, social_rating, career_rating, review_text, year_of_study, programme, created_at',
    )
    .eq('school_slug', slug)
    .eq('is_published', true)
    .order('created_at', { ascending: false })

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 })
  }

  const reviewList = reviews ?? []

  // Only compute aggregates when there are at least 3 published reviews
  let aggregates: Record<string, number> | null = null
  if (reviewList.length >= 3) {
    const avg = (field: keyof (typeof reviewList)[0]) => {
      const vals = reviewList
        .map((r) => r[field] as number | null)
        .filter((v): v is number => v != null)
      if (vals.length === 0) return null
      return Math.round((vals.reduce((a, b) => a + b, 0) / vals.length) * 10) / 10
    }

    aggregates = {
      count: reviewList.length,
      overall: avg('overall_rating') ?? 0,
      academics: avg('academics_rating') ?? 0,
      campusLife: avg('campus_life_rating') ?? 0,
      housing: avg('housing_rating') ?? 0,
      social: avg('social_rating') ?? 0,
      career: avg('career_rating') ?? 0,
    }
  }

  return NextResponse.json({ reviews: reviewList, aggregates, count: reviewList.length })
}

// ------------------------------------------------------------------
// POST /api/schools/[slug]/reviews
// Auth required. Validates and inserts a new review (unpublished).
// One review per user per school enforced by DB unique index.
// ------------------------------------------------------------------
export async function POST(req: Request, { params }: Params) {
  const { slug } = await params
  const { userId } = await auth()

  if (!userId) {
    return NextResponse.json({ error: 'You must be signed in to leave a review.' }, { status: 401 })
  }

  if (!slug || typeof slug !== 'string') {
    return NextResponse.json({ error: 'Invalid school slug' }, { status: 400 })
  }

  let body: Record<string, unknown>
  try {
    body = await req.json()
  } catch {
    return NextResponse.json({ error: 'Invalid JSON body' }, { status: 400 })
  }

  const {
    overall_rating,
    academics_rating,
    campus_life_rating,
    housing_rating,
    social_rating,
    career_rating,
    review_text,
    year_of_study,
    programme,
  } = body

  // Validate required field
  if (
    typeof overall_rating !== 'number' ||
    overall_rating < 1 ||
    overall_rating > 5
  ) {
    return NextResponse.json(
      { error: 'overall_rating must be an integer between 1 and 5.' },
      { status: 422 },
    )
  }

  // Validate optional rating fields
  const ratingFields: Record<string, unknown> = {
    academics_rating,
    campus_life_rating,
    housing_rating,
    social_rating,
    career_rating,
  }
  for (const [field, val] of Object.entries(ratingFields)) {
    if (val !== undefined && val !== null) {
      if (typeof val !== 'number' || val < 1 || val > 5) {
        return NextResponse.json(
          { error: `${field} must be an integer between 1 and 5.` },
          { status: 422 },
        )
      }
    }
  }

  if (review_text !== undefined && review_text !== null) {
    if (typeof review_text !== 'string' || review_text.length > 1000) {
      return NextResponse.json(
        { error: 'review_text must be a string of at most 1000 characters.' },
        { status: 422 },
      )
    }
  }

  if (year_of_study !== undefined && year_of_study !== null) {
    if (
      typeof year_of_study !== 'number' ||
      year_of_study < 1 ||
      year_of_study > 6
    ) {
      return NextResponse.json(
        { error: 'year_of_study must be between 1 and 6.' },
        { status: 422 },
      )
    }
  }

  if (programme !== undefined && programme !== null && typeof programme !== 'string') {
    return NextResponse.json({ error: 'programme must be a string.' }, { status: 422 })
  }

  const supabase = await createClient()

  const { error } = await supabase.from('school_reviews').insert({
    school_slug: slug,
    reviewer_id: userId,
    overall_rating: overall_rating as number,
    academics_rating: (academics_rating as number | null) ?? null,
    campus_life_rating: (campus_life_rating as number | null) ?? null,
    housing_rating: (housing_rating as number | null) ?? null,
    social_rating: (social_rating as number | null) ?? null,
    career_rating: (career_rating as number | null) ?? null,
    review_text: (review_text as string | null) ?? null,
    year_of_study: (year_of_study as number | null) ?? null,
    programme: (programme as string | null) ?? null,
    is_published: false,
  })

  if (error) {
    // Unique violation: user already reviewed this school
    if (error.code === '23505') {
      return NextResponse.json(
        { error: 'You have already submitted a review for this school.' },
        { status: 409 },
      )
    }
    return NextResponse.json({ error: error.message }, { status: 500 })
  }

  return NextResponse.json(
    {
      success: true,
      message:
        'Your review has been submitted and is pending approval. Thank you!',
    },
    { status: 201 },
  )
}
