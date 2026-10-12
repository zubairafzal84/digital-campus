import { auth } from '@clerk/nextjs/server'
import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase/server'

export async function GET(req: NextRequest) {
  const { userId } = await auth()
  if (!userId) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

  const { searchParams } = req.nextUrl
  const institution = searchParams.get('institution') || 'ubc'
  const course = searchParams.get('course')

  const supabase = await createClient()

  // Get the requesting user's courses at this institution
  const { data: myCourses } = await supabase
    .from('student_courses')
    .select('course_code')
    .eq('user_id', userId)
    .eq('institution_slug', institution)

  const myCodes = (myCourses || []).map(c => c.course_code)
  if (myCodes.length === 0) return NextResponse.json([])

  const codesToSearch = course ? [course] : myCodes

  // Find other students in the same courses
  const { data: rows, error } = await supabase
    .from('student_courses')
    .select('user_id, course_code')
    .eq('institution_slug', institution)
    .in('course_code', codesToSearch)
    .neq('user_id', userId)

  if (error) return NextResponse.json({ error: error.message }, { status: 500 })

  if (!rows || rows.length === 0) return NextResponse.json([])

  const userIds = [...new Set(rows.map(r => r.user_id))]

  // Fetch public profile info — only name/program/year (no emails, no private info)
  const { data: profiles } = await supabase
    .from('student_profiles')
    .select('account_id, display_name, program, year, avatar_url')
    .in('account_id', userIds)

  const profileMap = Object.fromEntries((profiles || []).map(p => [p.account_id, p]))

  const classmates = rows.map(r => {
    const p = profileMap[r.user_id] || {}
    return {
      user_id: r.user_id,
      course_code: r.course_code,
      display_name: p.display_name || null,
      program: p.program || null,
      year: p.year || null,
      avatar_url: p.avatar_url || null,
    }
  })

  return NextResponse.json(classmates)
}
