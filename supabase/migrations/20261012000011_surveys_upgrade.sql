-- surveys upgrade — adds B2B org features + discovery improvements
-- Adds: tags, is_featured, sponsor_url, plan columns.
-- Adds separate survey_reward_claims table for reward tracking.
-- Adds a survey_invites table so orgs can invite specific schools.

-- ---- surveys: new columns ----
ALTER TABLE surveys
  ADD COLUMN IF NOT EXISTS tags              text[]  DEFAULT '{}',
  ADD COLUMN IF NOT EXISTS is_featured       boolean NOT NULL DEFAULT false,
  ADD COLUMN IF NOT EXISTS sponsor_url       text,
  ADD COLUMN IF NOT EXISTS plan              text    NOT NULL DEFAULT 'free'
    CHECK (plan IN ('free', 'starter', 'professional', 'enterprise'));

CREATE INDEX IF NOT EXISTS surveys_tags_idx    ON surveys USING GIN (tags);
CREATE INDEX IF NOT EXISTS surveys_featured_idx ON surveys (is_featured) WHERE is_featured = true;

-- ---- survey_reward_claims ----
-- Tracks who has claimed a reward and the status of that claim.
CREATE TABLE IF NOT EXISTS survey_reward_claims (
  id             uuid        DEFAULT gen_random_uuid() PRIMARY KEY,
  survey_id      uuid        NOT NULL REFERENCES surveys(id) ON DELETE CASCADE,
  respondent_id  text        NOT NULL,
  status         text        NOT NULL DEFAULT 'pending'
                   CHECK (status IN ('pending', 'fulfilled', 'expired')),
  claimed_at     timestamptz NOT NULL DEFAULT now(),
  fulfilled_at   timestamptz,
  notes          text,
  UNIQUE (survey_id, respondent_id)
);

CREATE INDEX IF NOT EXISTS survey_reward_claims_survey_id_idx
  ON survey_reward_claims (survey_id);

ALTER TABLE survey_reward_claims ENABLE ROW LEVEL SECURITY;

-- respondent can see their own claims
CREATE POLICY "respondent_read_own_claims"
  ON survey_reward_claims FOR SELECT
  USING (respondent_id = auth.uid()::text);

-- survey creator can see and update claims for their surveys
CREATE POLICY "creator_read_claims"
  ON survey_reward_claims FOR SELECT
  USING (
    EXISTS (
      SELECT 1 FROM surveys s
      WHERE s.id = survey_reward_claims.survey_id
        AND s.created_by = auth.uid()::text
    )
  );

CREATE POLICY "creator_update_claims"
  ON survey_reward_claims FOR UPDATE
  USING (
    EXISTS (
      SELECT 1 FROM surveys s
      WHERE s.id = survey_reward_claims.survey_id
        AND s.created_by = auth.uid()::text
    )
  );

-- insert allowed by auth trigger (created by respond route)
CREATE POLICY "auth_insert_claim"
  ON survey_reward_claims FOR INSERT
  WITH CHECK (respondent_id = auth.uid()::text);

-- ---- survey_invites ----
-- Allows a survey creator to share a private link with specific emails / tokens.
CREATE TABLE IF NOT EXISTS survey_invites (
  id          uuid        DEFAULT gen_random_uuid() PRIMARY KEY,
  survey_id   uuid        NOT NULL REFERENCES surveys(id) ON DELETE CASCADE,
  token       text        NOT NULL UNIQUE DEFAULT encode(gen_random_bytes(18), 'base64url'),
  email       text,                       -- optional: pre-fill for the recipient
  used        boolean     NOT NULL DEFAULT false,
  created_at  timestamptz NOT NULL DEFAULT now()
);

CREATE INDEX IF NOT EXISTS survey_invites_survey_id_idx
  ON survey_invites (survey_id);

ALTER TABLE survey_invites ENABLE ROW LEVEL SECURITY;

CREATE POLICY "creator_manage_invites"
  ON survey_invites FOR ALL
  USING (
    EXISTS (
      SELECT 1 FROM surveys s
      WHERE s.id = survey_invites.survey_id
        AND s.created_by = auth.uid()::text
    )
  );

-- public can SELECT invite by token (for the take-survey flow)
CREATE POLICY "public_read_invite_by_token"
  ON survey_invites FOR SELECT
  USING (true);
