import { auth } from '@clerk/nextjs/server'
import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase/server'

export async function GET(req: NextRequest) {
  const { searchParams } = req.nextUrl
  const institution = searchParams.get('institution') || 'ubc'
  const course = searchParams.get('course')

  const supabase = await createClient()
  let query = supabase
    .from('textbook_listings')
    .select('*')
    .eq('institution_slug', institution)
    .eq('status', 'available')
    .order('created_at', { ascending: false })

  if (course) query = query.eq('course_code', course)

  const { data, error } = await query
  if (error) return NextResponse.json({ error: error.message }, { status: 500 })
  return NextResponse.json(data)
}

export async function POST(req: NextRequest) {
  const { userId } = await auth()
  if (!userId) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

  const body = await req.json()
  const { title, author, edition, course_code, condition, asking_price, is_free, description, institution_slug } = body

  if (!title?.trim() || !institution_slug) {
    return NextResponse.json({ error: 'title and institution_slug required' }, { status: 400 })
  }

  const supabase = await createClient()
  const { data, error } = await supabase
    .from('textbook_listings')
    .insert({
      seller_id: userId,
      institution_slug,
      course_code: course_code?.trim().toUpperCase() || null,
      title: title.trim(),
      author: author?.trim() || null,
      edition: edition?.trim() || null,
      condition: condition || 'good',
      asking_price: is_free ? null : (asking_price || null),
      is_free: !!is_free,
      description: description?.trim() || null,
    })
    .select()
    .single()

  if (error) return NextResponse.json({ error: error.message }, { status: 500 })
  return NextResponse.json(data, { status: 201 })
}
