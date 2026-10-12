import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase/server'

export async function GET(req: NextRequest) {
  const supabase = await createClient()
  const { searchParams } = new URL(req.url)

  const cause    = searchParams.get('cause')
  const province = searchParams.get('province')
  const school   = searchParams.get('school')
  const remote   = searchParams.get('remote')
  const one_time = searchParams.get('one_time')

  let query = supabase
    .from('volunteer_opportunities')
    .select('*')
    .eq('is_published', true)
    .order('created_at', { ascending: false })

  if (cause)    query = query.eq('cause', cause)
  if (province) query = query.eq('province', province)
  if (school)   query = query.eq('school_slug', school)
  if (remote === 'true')   query = query.eq('is_remote', true)
  if (one_time === 'true') query = query.eq('is_one_time', true)

  const { data, error } = await query

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 })
  }

  return NextResponse.json({ opportunities: data ?? [] })
}

export async function POST(req: NextRequest) {
  const supabase = await createClient()

  const { data: { user }, error: authError } = await supabase.auth.getUser()
  if (authError || !user) {
    return NextResponse.json({ error: 'Authentication required' }, { status: 401 })
  }

  const body = await req.json()

  const {
    title, organization_name, organization_type, description, cause,
    location, city, province, is_remote, school_slug,
    commitment_hours_week, commitment_duration, is_one_time,
    skills_needed, spots_available, application_url, application_email,
    deadline_date,
  } = body

  if (!title || !organization_name || !description) {
    return NextResponse.json({ error: 'title, organization_name, and description are required' }, { status: 400 })
  }

  const { data, error } = await supabase
    .from('volunteer_opportunities')
    .insert({
      title,
      organization_name,
      organization_type,
      description,
      cause,
      location,
      city,
      province,
      is_remote: Boolean(is_remote),
      school_slug,
      commitment_hours_week,
      commitment_duration,
      is_one_time: Boolean(is_one_time),
      skills_needed,
      spots_available,
      application_url,
      application_email,
      deadline_date,
      is_published: false, // admin reviews before publishing
      created_by: user.id,
    })
    .select()
    .single()

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 })
  }

  return NextResponse.json({ opportunity: data }, { status: 201 })
}
