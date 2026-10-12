import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase/server'
import { auth } from '@clerk/nextjs/server'

// GET /api/events/[id]
// Returns a single event. Private events require auth + ownership.
// Unlisted events are accessible by anyone (share token is validated client-side via query param).
export async function GET(
  _request: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  const { id: eventId } = await params
  const supabase = await createClient()
  const { userId } = await auth()

  const { data: event, error } = await supabase
    .from('events')
    .select(`
      id,
      title,
      description,
      event_type,
      event_category,
      visibility,
      cover_emoji,
      tags,
      comments_enabled,
      share_token,
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
    .eq('id', eventId)
    .single()

  if (error || !event) {
    return NextResponse.json({ error: 'Event not found.' }, { status: 404 })
  }

  // Private events: only accessible by the creator
  if (event.visibility === 'private' && event.created_by !== userId) {
    return NextResponse.json({ error: 'Event not found.' }, { status: 404 })
  }

  // Strip share_token from response unless the viewer is the creator
  const sanitized = {
    ...event,
    share_token: event.created_by === userId ? event.share_token : undefined,
  }

  return NextResponse.json({ event: sanitized })
}
