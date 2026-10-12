-- Survey system — paid B2B feature
-- Companies and organizations pay to survey Canadian students.
-- Students take surveys (optionally rewarded). Companies get analytics.

-- ---- surveys ----
CREATE TABLE IF NOT EXISTS surveys (
  id                    uuid        DEFAULT gen_random_uuid() PRIMARY KEY,
  title                 text        NOT NULL,
  description           text,
  organization_name     text        NOT NULL,
  organization_logo_url text,
  created_by            text        NOT NULL,  -- Clerk user ID of survey creator
  status                text        NOT NULL DEFAULT 'draft'
                          CHECK (status IN ('draft', 'active', 'paused', 'closed')),
  reward_description    text,                  -- e.g. "$5 Amazon gift card for completion"
  target_schools        text[],               -- null = all schools
  target_programmes     text[],               -- null = all programmes
  target_year_min       int,
  target_year_max       int,
  max_participants      int,
  current_participants  int         NOT NULL DEFAULT 0,
  estimated_minutes     int         NOT NULL DEFAULT 5,
  closes_at             timestamptz,
  is_anonymous          boolean     NOT NULL DEFAULT true,
  created_at            timestamptz NOT NULL DEFAULT now()
);

CREATE INDEX IF NOT EXISTS surveys_status_idx
  ON surveys (status);

CREATE INDEX IF NOT EXISTS surveys_created_by_idx
  ON surveys (created_by);

-- ---- survey_questions ----
CREATE TABLE IF NOT EXISTS survey_questions (
  id               uuid  DEFAULT gen_random_uuid() PRIMARY KEY,
  survey_id        uuid  NOT NULL REFERENCES surveys(id) ON DELETE CASCADE,
  question_text    text  NOT NULL,
  question_type    text  NOT NULL
                     CHECK (question_type IN (
                       'multiple_choice', 'checkbox', 'rating',
                       'nps', 'short_text', 'long_text', 'yes_no', 'scale'
                     )),
  options          jsonb,              -- for multiple_choice/checkbox: ["Option A", "Option B"]
  scale_min        int   NOT NULL DEFAULT 1,
  scale_max        int   NOT NULL DEFAULT 5,
  scale_min_label  text,
  scale_max_label  text,
  is_required      boolean NOT NULL DEFAULT true,
  sort_order       int   NOT NULL
);

CREATE INDEX IF NOT EXISTS survey_questions_survey_id_idx
  ON survey_questions (survey_id, sort_order);

-- ---- survey_responses ----
CREATE TABLE IF NOT EXISTS survey_responses (
  id             uuid        DEFAULT gen_random_uuid() PRIMARY KEY,
  survey_id      uuid        NOT NULL REFERENCES surveys(id) ON DELETE CASCADE,
  respondent_id  text,               -- Clerk user ID, or null if anonymous
  answers        jsonb       NOT NULL, -- {question_id: answer_value}
  completed_at   timestamptz NOT NULL DEFAULT now(),
  UNIQUE (survey_id, respondent_id)   -- one response per user per survey
);

CREATE INDEX IF NOT EXISTS survey_responses_survey_id_idx
  ON survey_responses (survey_id);

-- ---- Trigger: increment current_participants after each response ----
CREATE OR REPLACE FUNCTION increment_survey_participants()
RETURNS TRIGGER LANGUAGE plpgsql SECURITY DEFINER AS $$
BEGIN
  UPDATE surveys
  SET current_participants = current_participants + 1
  WHERE id = NEW.survey_id;
  RETURN NEW;
END;
$$;

DROP TRIGGER IF EXISTS trg_survey_response_increment ON survey_responses;
CREATE TRIGGER trg_survey_response_increment
  AFTER INSERT ON survey_responses
  FOR EACH ROW EXECUTE FUNCTION increment_survey_participants();

-- ---- Row Level Security ----
ALTER TABLE surveys          ENABLE ROW LEVEL SECURITY;
ALTER TABLE survey_questions ENABLE ROW LEVEL SECURITY;
ALTER TABLE survey_responses ENABLE ROW LEVEL SECURITY;

-- surveys: anyone can SELECT active surveys
CREATE POLICY "public_read_active_surveys"
  ON surveys
  FOR SELECT
  USING (status = 'active');

-- surveys: creator can SELECT their own surveys regardless of status
CREATE POLICY "creator_read_own_surveys"
  ON surveys
  FOR SELECT
  USING (created_by = auth.uid()::text);

-- surveys: authenticated user can INSERT (creates a draft)
CREATE POLICY "auth_insert_survey"
  ON surveys
  FOR INSERT
  WITH CHECK (created_by = auth.uid()::text);

-- surveys: only creator can UPDATE
CREATE POLICY "creator_update_survey"
  ON surveys
  FOR UPDATE
  USING (created_by = auth.uid()::text)
  WITH CHECK (created_by = auth.uid()::text);

-- surveys: only creator can DELETE
CREATE POLICY "creator_delete_survey"
  ON surveys
  FOR DELETE
  USING (created_by = auth.uid()::text);

-- survey_questions: public can read questions for active surveys
CREATE POLICY "public_read_active_survey_questions"
  ON survey_questions
  FOR SELECT
  USING (
    EXISTS (
      SELECT 1 FROM surveys s
      WHERE s.id = survey_questions.survey_id
        AND s.status = 'active'
    )
  );

-- survey_questions: creator can read questions for their surveys
CREATE POLICY "creator_read_own_survey_questions"
  ON survey_questions
  FOR SELECT
  USING (
    EXISTS (
      SELECT 1 FROM surveys s
      WHERE s.id = survey_questions.survey_id
        AND s.created_by = auth.uid()::text
    )
  );

-- survey_questions: creator can INSERT questions
CREATE POLICY "creator_insert_survey_questions"
  ON survey_questions
  FOR INSERT
  WITH CHECK (
    EXISTS (
      SELECT 1 FROM surveys s
      WHERE s.id = survey_questions.survey_id
        AND s.created_by = auth.uid()::text
    )
  );

-- survey_questions: creator can UPDATE questions
CREATE POLICY "creator_update_survey_questions"
  ON survey_questions
  FOR UPDATE
  USING (
    EXISTS (
      SELECT 1 FROM surveys s
      WHERE s.id = survey_questions.survey_id
        AND s.created_by = auth.uid()::text
    )
  );

-- survey_questions: creator can DELETE questions
CREATE POLICY "creator_delete_survey_questions"
  ON survey_questions
  FOR DELETE
  USING (
    EXISTS (
      SELECT 1 FROM surveys s
      WHERE s.id = survey_questions.survey_id
        AND s.created_by = auth.uid()::text
    )
  );

-- survey_responses: authenticated users can INSERT their own response
CREATE POLICY "auth_insert_survey_response"
  ON survey_responses
  FOR INSERT
  WITH CHECK (
    auth.uid() IS NOT NULL
    AND respondent_id = auth.uid()::text
  );

-- survey_responses: users can SELECT their own responses
CREATE POLICY "users_read_own_responses"
  ON survey_responses
  FOR SELECT
  USING (respondent_id = auth.uid()::text);

-- survey_responses: survey creator can SELECT all responses for their surveys
CREATE POLICY "creator_read_all_responses"
  ON survey_responses
  FOR SELECT
  USING (
    EXISTS (
      SELECT 1 FROM surveys s
      WHERE s.id = survey_responses.survey_id
        AND s.created_by = auth.uid()::text
    )
  );
