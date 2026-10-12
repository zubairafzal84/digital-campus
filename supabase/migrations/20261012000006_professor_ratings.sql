-- Professor ratings
-- Students can rate professors they have taken courses with.
-- Aggregates (avg scores, would_take_again_pct, rating_count) are kept
-- denormalised on the professors row via a trigger for fast reads.

-- ---- professors ----

CREATE TABLE IF NOT EXISTS professors (
  id                   uuid        DEFAULT gen_random_uuid() PRIMARY KEY,
  name                 text        NOT NULL,
  school_slug          text        NOT NULL,
  department           text        NOT NULL,
  courses              text[]      DEFAULT ARRAY[]::text[],
  avg_overall          numeric(3,2),
  avg_clarity          numeric(3,2),
  avg_helpfulness      numeric(3,2),
  avg_difficulty       numeric(3,2),
  would_take_again_pct int,
  rating_count         int         DEFAULT 0,
  is_published         boolean     DEFAULT true,
  created_by           text,
  created_at           timestamptz DEFAULT now()
);

CREATE INDEX IF NOT EXISTS professors_school_slug_idx
  ON professors (school_slug);

CREATE INDEX IF NOT EXISTS professors_school_dept_idx
  ON professors (school_slug, department);

-- ---- professor_ratings ----

CREATE TABLE IF NOT EXISTS professor_ratings (
  id               uuid        DEFAULT gen_random_uuid() PRIMARY KEY,
  professor_id     uuid        REFERENCES professors(id) ON DELETE CASCADE,
  reviewer_id      text        NOT NULL,
  course_code      text,
  overall_rating   int         CHECK (overall_rating BETWEEN 1 AND 5),
  clarity_rating   int         CHECK (clarity_rating BETWEEN 1 AND 5),
  helpfulness_rating int       CHECK (helpfulness_rating BETWEEN 1 AND 5),
  difficulty_rating  int       CHECK (difficulty_rating BETWEEN 1 AND 5),
  would_take_again boolean,
  review_text      text        CHECK (char_length(review_text) <= 500),
  grade_received   text        CHECK (
    grade_received IS NULL OR
    grade_received IN ('A+','A','A-','B+','B','B-','C+','C','C-','D','F','Drop','Audit')
  ),
  created_at       timestamptz DEFAULT now()
);

-- One rating per reviewer per professor
CREATE UNIQUE INDEX IF NOT EXISTS professor_ratings_one_per_reviewer
  ON professor_ratings (professor_id, reviewer_id);

CREATE INDEX IF NOT EXISTS professor_ratings_professor_id_idx
  ON professor_ratings (professor_id);

-- ---- Aggregate trigger ----

CREATE OR REPLACE FUNCTION update_professor_stats()
RETURNS TRIGGER
LANGUAGE plpgsql
AS $$
DECLARE
  target_professor_id uuid;
BEGIN
  -- Determine which professor to update
  IF TG_OP = 'DELETE' THEN
    target_professor_id := OLD.professor_id;
  ELSE
    target_professor_id := NEW.professor_id;
  END IF;

  UPDATE professors
  SET
    avg_overall          = (
      SELECT ROUND(AVG(overall_rating)::numeric, 2)
      FROM professor_ratings
      WHERE professor_id = target_professor_id
    ),
    avg_clarity          = (
      SELECT ROUND(AVG(clarity_rating)::numeric, 2)
      FROM professor_ratings
      WHERE professor_id = target_professor_id
    ),
    avg_helpfulness      = (
      SELECT ROUND(AVG(helpfulness_rating)::numeric, 2)
      FROM professor_ratings
      WHERE professor_id = target_professor_id
    ),
    avg_difficulty       = (
      SELECT ROUND(AVG(difficulty_rating)::numeric, 2)
      FROM professor_ratings
      WHERE professor_id = target_professor_id
    ),
    would_take_again_pct = (
      SELECT CASE
        WHEN COUNT(*) = 0 THEN NULL
        ELSE ROUND(100.0 * COUNT(*) FILTER (WHERE would_take_again = true) / COUNT(*))
      END
      FROM professor_ratings
      WHERE professor_id = target_professor_id
    ),
    rating_count         = (
      SELECT COUNT(*)
      FROM professor_ratings
      WHERE professor_id = target_professor_id
    )
  WHERE id = target_professor_id;

  RETURN NULL;
END;
$$;

DROP TRIGGER IF EXISTS trg_update_professor_stats ON professor_ratings;

CREATE TRIGGER trg_update_professor_stats
  AFTER INSERT OR DELETE ON professor_ratings
  FOR EACH ROW
  EXECUTE FUNCTION update_professor_stats();

-- ---- Row Level Security ----

ALTER TABLE professors ENABLE ROW LEVEL SECURITY;

-- Anyone can read published professors
CREATE POLICY "public_read_published_professors"
  ON professors
  FOR SELECT
  USING (is_published = true);

-- Authenticated users can create professor entries
CREATE POLICY "auth_insert_professors"
  ON professors
  FOR INSERT
  WITH CHECK (auth.uid() IS NOT NULL);

-- Only the creator (or service role) can update/delete
CREATE POLICY "creator_update_professors"
  ON professors
  FOR UPDATE
  USING (created_by = auth.uid()::text);

CREATE POLICY "creator_delete_professors"
  ON professors
  FOR DELETE
  USING (created_by = auth.uid()::text);

-- ---- RLS for professor_ratings ----

ALTER TABLE professor_ratings ENABLE ROW LEVEL SECURITY;

-- Anyone can read ratings
CREATE POLICY "public_read_professor_ratings"
  ON professor_ratings
  FOR SELECT
  USING (true);

-- Authenticated users can insert their own rating
CREATE POLICY "auth_insert_own_rating"
  ON professor_ratings
  FOR INSERT
  WITH CHECK (reviewer_id = auth.uid()::text);

-- Service-role (admin) can do everything — covered by service role bypass of RLS.
