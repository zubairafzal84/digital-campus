import { NextRequest, NextResponse } from 'next/server'
import { auth } from '@clerk/nextjs/server'
import { createClient } from '@/lib/supabase/server'

export async function GET(
  _request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  // Must be authenticated to look up a peer (conversation participants only)
  const { userId } = await auth()
  if (!userId) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

  const { id } = await params

  const supabase = await createClient()
  const { data, error } = await supabase
    .from('student_profiles')
    .select('display_name, avatar_url, institution_id')
    .eq('account_id', id)
    .maybeSingle()

  if (error) {
    return NextResponse.json(
      { displayName: null, avatarUrl: null, institution: null },
      { status: 200 }
    )
  }

  if (!data) {
    return NextResponse.json(
      { displayName: null, avatarUrl: null, institution: null },
      { status: 200 }
    )
  }

  return NextResponse.json({
    displayName: data.display_name ?? null,
    avatarUrl: data.avatar_url ?? null,
    institution: data.institution_id ?? null,
  })
}
