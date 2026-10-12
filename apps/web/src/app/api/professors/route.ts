import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase/server'
import { auth } from '@clerk/nextjs/server'

export async function GET(request: NextRequest) {
  const { searchParams } = request.nextUrl
  const school = searchParams.get('school') ?? ''
  const q = searchParams.get('q') ?? ''

  const supabase = await createClient()

  let query = supabase
    .from('professors')
    .select(`
      id,
      name,
      school,
      department,
      course_codes,
      ratings_count,
      avg_overall_rating,
      would_take_again_pct
    `)
    .eq('is_published', true)
    .order('avg_overall_rating', { ascending: false, nullsFirst: false })

  if (school) {
    query = query.eq('school', school)
  }

  if (q) {
    query = query.ilike('name', `%${q}%`)
  }

  const { data, error } = await query.limit(100)

  if (error) {
    // Table may not exist yet — return empty list gracefully
    return NextResponse.json({ professors: [] })
  }

  return NextResponse.json({ professors: data ?? [] })
}

export async function POST(request: NextRequest) {
  const { userId } = await auth()

  if (!userId) {
    return NextResponse.json({ error: 'Authentication required.' }, { status: 401 })
  }

  const body = await request.json().catch(() => null)

  if (!body || !body.name || !body.school || !body.department) {
    return NextResponse.json(
      { error: 'name, school, and department are required.' },
      { status: 400 },
    )
  }

  const { name, school, department, course_codes } = body

  const courseCodes: string[] = (course_codes ?? '')
    .split(',')
    .map((c: string) => c.trim().toUpperCase())
    .filter(Boolean)

  const supabase = await createClient()

  const { data, error } = await supabase
    .from('professors')
    .insert({
      name: name.trim(),
      school: school.trim(),
      department: department.trim(),
      course_codes: courseCodes,
      submitted_by: userId,
      is_published: false, // Requires admin review before going live
    })
    .select('id, name, school, department')
    .single()

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 })
  }

  return NextResponse.json({ professor: data }, { status: 201 })
}
