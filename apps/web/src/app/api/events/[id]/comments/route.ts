import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase/server'
import { auth } from '@clerk/nextjs/server'

// GET /api/events/[id]/comments
// Returns comments for an event. Event must be public or unlisted.
export async function GET(
  _request: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  const { id: eventId } = await params
  const supabase = await createClient()

  // Verify event exists and comments are enabled
  const { data: event, error: eventError } = await supabase
    .from('events')
    .select('id, comments_enabled, visibility, is_published, created_by')
    .eq('id', eventId)
    .single()

  if (eventError || !event) {
    return NextResponse.json({ error: 'Event not found.' }, { status: 404 })
  }

  if (!event.comments_enabled) {
    return NextResponse.json({ comments: [] })
  }

  const { data: comments, error } = await supabase
    .from('event_comments')
    .select('id, user_id, content, created_at')
    .eq('event_id', eventId)
    .order('created_at', { ascending: true })
    .limit(200)

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 })
  }

  return NextResponse.json({ comments: comments ?? [] })
}

// POST /api/events/[id]/comments
// Auth required. Post a comment.
export async function POST(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  const { userId } = await auth()

  if (!userId) {
    return NextResponse.json({ error: 'Authentication required.' }, { status: 401 })
  }

  const { id: eventId } = await params
  const body = await request.json().catch(() => null)
  const content = body?.content?.trim()

  if (!content) {
    return NextResponse.json({ error: 'content is required.' }, { status: 400 })
  }

  if (content.length > 500) {
    return NextResponse.json({ error: 'Comment must be 500 characters or fewer.' }, { status: 400 })
  }

  const supabase = await createClient()

  // Verify event exists and comments are enabled
  const { data: event, error: eventError } = await supabase
    .from('events')
    .select('id, comments_enabled, visibility, is_published')
    .eq('id', eventId)
    .single()

  if (eventError || !event) {
    return NextResponse.json({ error: 'Event not found.' }, { status: 404 })
  }

  if (!event.comments_enabled) {
    return NextResponse.json({ error: 'Comments are disabled for this event.' }, { status: 403 })
  }

  const { data: comment, error } = await supabase
    .from('event_comments')
    .insert({ event_id: eventId, user_id: userId, content })
    .select('id, user_id, content, created_at')
    .single()

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 })
  }

  return NextResponse.json({ comment }, { status: 201 })
}

// DELETE /api/events/[id]/comments?comment_id=<uuid>
// Auth required. Delete own comment.
export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  const { userId } = await auth()

  if (!userId) {
    return NextResponse.json({ error: 'Authentication required.' }, { status: 401 })
  }

  const { id: eventId } = await params
  const commentId = request.nextUrl.searchParams.get('comment_id')

  if (!commentId) {
    return NextResponse.json({ error: 'comment_id query param is required.' }, { status: 400 })
  }

  const supabase = await createClient()

  const { error } = await supabase
    .from('event_comments')
    .delete()
    .eq('id', commentId)
    .eq('event_id', eventId)
    .eq('user_id', userId)

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 })
  }

  return NextResponse.json({ success: true })
}
