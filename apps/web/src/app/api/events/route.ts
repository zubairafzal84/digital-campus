import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase/server'
import { auth } from '@clerk/nextjs/server'

// GET /api/events
// List events. Params: school, type, from_date, to_date, limit.
// Returns upcoming published events by default (starts_at >= now).
export async function GET(request: NextRequest) {
  const { searchParams } = request.nextUrl
  const school    = searchParams.get('school')
  const type      = searchParams.get('type')
  const from_date = searchParams.get('from_date')
  const to_date   = searchParams.get('to_date')
  const limit     = Math.min(parseInt(searchParams.get('limit') ?? '50', 10), 200)

  const supabase = await createClient()

  let query = supabase
    .from('events')
    .select(`
      id,
      title,
      description,
      event_type,
      school_slug,
      organizer_name,
      location,
      is_online,
      online_url,
      starts_at,
      ends_at,
      max_attendees,
      current_attendees,
      is_free,
      price_cents,
      image_url,
      created_by,
      created_at
    `)
    .eq('is_published', true)
    .order('starts_at', { ascending: true })
    .limit(limit)

  // Default: upcoming events only (starts_at >= now)
  const now = new Date().toISOString()
  query = query.gte('starts_at', from_date ?? now)

  if (to_date) {
    query = query.lte('starts_at', to_date)
  }

  if (school) {
    query = query.eq('school_slug', school)
  }

  if (type && type !== 'all') {
    query = query.eq('event_type', type)
  }

  const { data, error } = await query

  if (error) {
    return NextResponse.json({ events: [] })
  }

  return NextResponse.json({ events: data ?? [] })
}

// POST /api/events
// Auth required. Create an event.
export async function POST(request: NextRequest) {
  const { userId } = await auth()

  if (!userId) {
    return NextResponse.json({ error: 'Authentication required.' }, { status: 401 })
  }

  const body = await request.json().catch(() => null)

  if (!body || !body.title || !body.starts_at) {
    return NextResponse.json(
      { error: 'title and starts_at are required.' },
      { status: 400 },
    )
  }

  const {
    title,
    description,
    event_type,
    school_slug,
    club_id,
    organizer_name,
    location,
    is_online,
    online_url,
    starts_at,
    ends_at,
    max_attendees,
    is_free,
    price_cents,
    image_url,
    is_published,
  } = body

  const supabase = await createClient()

  const { data: event, error } = await supabase
    .from('events')
    .insert({
      title: title.trim(),
      description: description?.trim() ?? null,
      event_type: event_type ?? 'other',
      school_slug: school_slug ?? null,
      club_id: club_id ?? null,
      organizer_name: organizer_name?.trim() ?? null,
      location: location?.trim() ?? null,
      is_online: is_online ?? false,
      online_url: online_url ?? null,
      starts_at,
      ends_at: ends_at ?? null,
      max_attendees: max_attendees ?? null,
      is_free: is_free ?? true,
      price_cents: price_cents ?? 0,
      image_url: image_url ?? null,
      created_by: userId,
      is_published: is_published ?? true,
    })
    .select('id')
    .single()

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 })
  }

  return NextResponse.json({ event_id: event.id }, { status: 201 })
}
