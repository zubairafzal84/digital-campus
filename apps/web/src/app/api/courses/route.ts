import { auth } from '@clerk/nextjs/server'
import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase/server'

export async function GET() {
  const { userId } = await auth()
  if (!userId) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  const supabase = await createClient()
  const { data, error } = await supabase
    .from('student_courses')
    .select('*')
    .eq('user_id', userId)
    .order('course_code')
  if (error) return NextResponse.json({ error: error.message }, { status: 500 })
  return NextResponse.json(data)
}

export async function POST(req: NextRequest) {
  const { userId } = await auth()
  if (!userId) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  const body = await req.json()
  const { course_code, course_name, professor, institution_slug, semester } = body
  if (!course_code || !institution_slug) {
    return NextResponse.json({ error: 'course_code and institution_slug required' }, { status: 400 })
  }
  const supabase = await createClient()
  const { data, error } = await supabase
    .from('student_courses')
    .insert({ user_id: userId, course_code, course_name, professor, institution_slug, semester: semester || '2025-F' })
    .select()
    .single()
  if (error) return NextResponse.json({ error: error.message }, { status: 500 })
  return NextResponse.json(data, { status: 201 })
}
