# Digital Kampus — Codebase Guide

## Project overview

Digital Kampus is a bilingual (English / Canadian French) student-life platform for Canadian colleges and universities.

Monorepo managed with **Turborepo**.

| App | Port | Description |
|-----|------|-------------|
| `apps/web` | 3000 | Next.js 15 — public site + student dashboard |
| `apps/admin` | 3001 | Next.js — internal admin panel (noindex) |
| `apps/mobile` | — | Expo SDK 52 (React Native) |

Shared packages: `packages/ui`, `packages/database`, `packages/config`.

## Running locally

```bash
# Install all dependencies
pnpm install

# Start everything
pnpm dev

# Web only
pnpm --filter web dev

# Mobile (requires Expo Go or simulator)
pnpm --filter mobile start
```

## Tech stack

- **Framework**: Next.js 15 (App Router), Expo Router
- **Database**: Supabase (PostgreSQL + Row Level Security)
- **Auth**: Supabase Auth — email/password + OAuth
- **Styling**: CSS Modules with CSS custom properties (no Tailwind in `apps/web`)
- **Language**: TypeScript throughout

## CSS design tokens (apps/web)

```css
--navy:     #0A1F5D   /* primary headings, hero backgrounds */
--purple:   #6B3EF2   /* primary CTAs, active states */
--purple-hi:#8B5CFF   /* hover, gradients */
--lav:      #E9E2FF   /* light purple tint, backgrounds */
```

All components support dark mode via `@media (prefers-color-scheme: dark)`.

## Supabase helpers

```ts
// Server components / API routes
import { createClient } from '@/lib/supabase/server'
const supabase = await createClient()

// Client components
import { createBrowserClient } from '@supabase/ssr'
```

`createServerClient` is exported as an alias from `server.ts` for compatibility.

## Key schema facts

- Institutions table: `institutions` (NOT `schools`)
- Programmes table: `programmes` (NOT `programs`)
- Verifications table: `student_verifications`
- All bilingual text columns: `name_en`, `name_fr`
- Student profiles: `account_id` column (NOT `user_id`)
- Contact requests: `sender_id`, `recipient_id`
- Conversations: `participant_a`, `participant_b`
- Partner submissions: `partner_enquiries(type, data JSONB, status)`

## Auth flow

1. `POST /api/auth/login` → `supabase.auth.signInWithPassword`
2. `POST /api/auth/signup` → `supabase.auth.signUp`
3. OAuth: redirects to `/api/auth/callback` for code exchange
4. Password reset: `POST /api/auth/forgot-password` → `resetPasswordForEmail` → `/update-password`
5. Middleware protects `/dashboard` and `/profile`; redirects auth users away from `/login`, `/signup`

## Security constraints (non-negotiable)

- **Do not push to live/production** without explicit approval
- High school features: **disabled server-side** — no direct URL or API access
- Private student profiles: **noindex is not access control** — always protect server-side via RLS
- Contact requests: must be **accepted before** any 1:1 messaging
- Scholarships/bursaries/grants matching: **always free** to students
- E2EE: **do not claim E2EE** without independent security review
- No fake users, simulated activity, or fabricated statistics

## Bilingual (French) status

French is **infrastructure-ready but not active**. Keep these in place:
- `name_en` / `name_fr` columns in all relevant DB tables
- `alternates.languages` hreflang metadata on all pages
- `/fr/page.tsx` landing page (exists, keep it)
- Do **not** build `/fr/*` sub-routes until French is explicitly enabled

## Partner / club registrations

Forms that can't immediately map to a core table insert into `partner_enquiries(type, data JSONB)` with `status = 'pending'`. Admin reviews from `/admin/partner-enquiries`.

Types: `landlord`, `employer`, `merchant`, `club`.

## ISR pattern

Schools and scholarships pages use `export const revalidate = 3600`. Static fallback is the
in-file data array. School detail pages use `generateStaticParams` to pre-render all 12 slugs.

## Seed institutions (12 slugs)

`ubc`, `sfu`, `uoft`, `mcgill`, `uwaterloo`, `queens`, `ualberta`, `uvic`, `dal`, `bcit`, `seneca`, `humber`

## Admin panel

- Runs on port 3001
- All routes carry `robots: noindex`
- Uses `SUPABASE_SERVICE_ROLE_KEY` (never expose to client)
- Partner enquiries: `/admin/partner-enquiries`
- Institutions: `/admin/institutions`

## Mobile app

Expo Router file-based routing. Auth screens live in `app/(auth)/`. Tabs in `app/(tabs)/`.
Supabase client uses `AsyncStorage` for session persistence.
Environment variables: `EXPO_PUBLIC_SUPABASE_URL`, `EXPO_PUBLIC_SUPABASE_ANON_KEY`.
