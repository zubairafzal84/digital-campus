import { auth } from '@clerk/nextjs/server'
import { createClient as createSupabaseClient } from '@supabase/supabase-js'
import type { Database } from '@dk/database'

/**
 * Creates a Supabase client authenticated with the current Clerk session.
 *
 * Clerk's JWT template named "supabase" must be configured in the Clerk
 * Dashboard (Configure → JWT Templates → Add → Supabase). The template
 * generates a JWT that Supabase verifies using Clerk's JWKS endpoint.
 * auth.uid() in RLS policies returns the Clerk user ID (sub claim).
 *
 * For unauthenticated requests (public API routes) the client falls back
 * to the anon key without an Authorization header.
 */
export async function createClient() {
  const { getToken } = await auth()
  const token = await getToken({ template: 'supabase' }).catch(() => null)

  return createSupabaseClient<Database>(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      global: {
        headers: token ? { Authorization: `Bearer ${token}` } : {},
      },
    },
  )
}

export { createClient as createServerClient }
