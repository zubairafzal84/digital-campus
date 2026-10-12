-- Volunteer Opportunities
-- Digital Kampus — 2026-10-12

-- ============================================================
-- Tables
-- ============================================================

CREATE TABLE IF NOT EXISTS public.volunteer_opportunities (
  id                      uuid        DEFAULT gen_random_uuid() PRIMARY KEY,
  title                   text        NOT NULL,
  organization_name       text        NOT NULL,
  organization_type       text        CHECK (organization_type IN ('nonprofit','government','hospital','school','community','environment','other')),
  description             text        NOT NULL,
  cause                   text        CHECK (cause IN ('environment','education','health','community','arts','animals','seniors','youth','food','crisis','international','other')),
  location                text,
  city                    text,
  province                text,
  is_remote               boolean     DEFAULT false,
  school_slug             text,
  commitment_hours_week   int,
  commitment_duration     text,
  is_one_time             boolean     DEFAULT false,
  skills_needed           text[],
  spots_available         int,
  spots_filled            int         DEFAULT 0,
  application_url         text,
  application_email       text,
  deadline_date           date,
  is_published            boolean     DEFAULT true,
  created_by              text,
  created_at              timestamptz DEFAULT now()
);

CREATE TABLE IF NOT EXISTS public.volunteer_signups (
  id               uuid  DEFAULT gen_random_uuid() PRIMARY KEY,
  opportunity_id   uuid  REFERENCES public.volunteer_opportunities(id) ON DELETE CASCADE,
  user_id          text  NOT NULL,
  message          text,
  status           text  CHECK (status IN ('pending','accepted','waitlisted','declined')) DEFAULT 'pending',
  created_at       timestamptz DEFAULT now(),
  UNIQUE(opportunity_id, user_id)
);

-- ============================================================
-- Indexes
-- ============================================================

CREATE INDEX IF NOT EXISTS volunteer_opportunities_cause_idx    ON public.volunteer_opportunities(cause);
CREATE INDEX IF NOT EXISTS volunteer_opportunities_province_idx ON public.volunteer_opportunities(province);
CREATE INDEX IF NOT EXISTS volunteer_opportunities_school_idx   ON public.volunteer_opportunities(school_slug);
CREATE INDEX IF NOT EXISTS volunteer_opportunities_remote_idx   ON public.volunteer_opportunities(is_remote);
CREATE INDEX IF NOT EXISTS volunteer_opportunities_created_idx  ON public.volunteer_opportunities(created_at DESC);
CREATE INDEX IF NOT EXISTS volunteer_signups_user_idx           ON public.volunteer_signups(user_id);
CREATE INDEX IF NOT EXISTS volunteer_signups_opp_idx            ON public.volunteer_signups(opportunity_id);

-- ============================================================
-- Row Level Security
-- ============================================================

ALTER TABLE public.volunteer_opportunities ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.volunteer_signups        ENABLE ROW LEVEL SECURITY;

-- volunteer_opportunities: anyone can SELECT published rows
CREATE POLICY "volunteer_opportunities_select_public"
  ON public.volunteer_opportunities
  FOR SELECT
  USING (is_published = true);

-- volunteer_opportunities: creator can INSERT
CREATE POLICY "volunteer_opportunities_insert_own"
  ON public.volunteer_opportunities
  FOR INSERT
  WITH CHECK (created_by = auth.uid()::text);

-- volunteer_opportunities: creator can UPDATE their own rows
CREATE POLICY "volunteer_opportunities_update_own"
  ON public.volunteer_opportunities
  FOR UPDATE
  USING (created_by = auth.uid()::text)
  WITH CHECK (created_by = auth.uid()::text);

-- volunteer_signups: user can SELECT their own signups
CREATE POLICY "volunteer_signups_select_own"
  ON public.volunteer_signups
  FOR SELECT
  USING (user_id = auth.uid()::text);

-- volunteer_signups: user can INSERT for themselves
CREATE POLICY "volunteer_signups_insert_own"
  ON public.volunteer_signups
  FOR INSERT
  WITH CHECK (user_id = auth.uid()::text);

-- volunteer_signups: user can DELETE (cancel) their own
CREATE POLICY "volunteer_signups_delete_own"
  ON public.volunteer_signups
  FOR DELETE
  USING (user_id = auth.uid()::text);

-- volunteer_signups: user can UPDATE (e.g. message) their own
CREATE POLICY "volunteer_signups_update_own"
  ON public.volunteer_signups
  FOR UPDATE
  USING (user_id = auth.uid()::text);
