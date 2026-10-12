import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase/server'
import { auth } from '@clerk/nextjs/server'

// GET /api/events
// List events. Params: school, type, from_date, to_date, limit, created_by, rsvp.
// Returns upcoming published events by default (starts_at >= now).
// created_by=me — auth required, returns all events created by the current user (including drafts).
// rsvp=going    — auth required, returns events the current user RSVPd to as "going".
export async function GET(request: NextRequest) {
  const { searchParams } = request.nextUrl
  const school     = searchParams.get('school')
  const type       = searchParams.get('type')
  const from_date  = searchParams.get('from_date')
  const to_date    = searchParams.get('to_date')
  const created_by = searchParams.get('created_by')
  const rsvp       = searchParams.get('rsvp')
  const limit      = Math.min(parseInt(searchParams.get('limit') ?? '50', 10), 200)

  const supabase = await createClient()

  // Resolve current user when personalised filters are requested
  let userId: string | null = null
  if (created_by === 'me' || rsvp === 'going') {
    const session = await auth()
    userId = session.userId
    if (!userId) {
      return NextResponse.json({ events: [] })
    }
  }

  // For rsvp=going: fetch the event IDs the user has RSVPd to first
  if (rsvp === 'going') {
    const { data: rsvps } = await supabase
      .from('event_rsvps')
      .select('event_id')
      .eq('user_id', userId!)
      .eq('status', 'going')

    const eventIds = (rsvps ?? []).map((r: { event_id: string }) => r.event_id)
    if (eventIds.length === 0) {
      return NextResponse.json({ events: [] })
    }

    const { data, error } = await supabase
      .from('events')
      .select(`
        id,
        title,
        description,
        event_type,
        event_category,
        visibility,
        cover_emoji,
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
        is_published,
        created_by,
        created_at
      `)
      .in('id', eventIds)
      .order('starts_at', { ascending: true })
      .limit(limit)

    if (error) return NextResponse.json({ events: [] })
    return NextResponse.json({ events: data ?? [] })
  }

  let query = supabase
    .from('events')
    .select(`
      id,
      title,
      description,
      event_type,
      event_category,
      visibility,
      cover_emoji,
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
      is_published,
      created_by,
      created_at
    `)
    .order('starts_at', { ascending: true })
    .limit(limit)

  if (created_by === 'me') {
    // Show all own events (including drafts), no date filter by default
    query = query.eq('created_by', userId!)
  } else {
    // Public listing: published events only
    query = query.eq('is_published', true)
    // Default: upcoming events only (starts_at >= now)
    const now = new Date().toISOString()
    query = query.gte('starts_at', from_date ?? now)
  }

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
    event_category,
    visibility,
    cover_emoji,
    tags,
    comments_enabled,
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
      event_type: event_type ?? 'social',
      event_category: event_category ?? 'other',
      visibility: visibility ?? 'public',
      cover_emoji: cover_emoji ?? '🎉',
      tags: tags ?? [],
      comments_enabled: comments_enabled ?? true,
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
