-- School reviews and ratings
-- Allows verified students to leave reviews of schools they attended.
-- Reviews are not published until an admin approves them (is_published = false by default).

CREATE TABLE IF NOT EXISTS school_reviews (
  id               uuid        DEFAULT gen_random_uuid() PRIMARY KEY,
  school_slug      text        NOT NULL,
  reviewer_id      text        NOT NULL,  -- Clerk user ID (auth.uid()::text via RLS)
  overall_rating   int         CHECK (overall_rating BETWEEN 1 AND 5),
  academics_rating int         CHECK (academics_rating BETWEEN 1 AND 5),
  campus_life_rating int       CHECK (campus_life_rating BETWEEN 1 AND 5),
  housing_rating   int         CHECK (housing_rating BETWEEN 1 AND 5),
  social_rating    int         CHECK (social_rating BETWEEN 1 AND 5),
  career_rating    int         CHECK (career_rating BETWEEN 1 AND 5),
  review_text      text        CHECK (char_length(review_text) <= 1000),
  year_of_study    int         CHECK (year_of_study BETWEEN 1 AND 6),
  programme        text,
  is_published     boolean     NOT NULL DEFAULT false,
  created_at       timestamptz NOT NULL DEFAULT now()
);

-- Index for fast per-school lookups of published reviews
CREATE INDEX IF NOT EXISTS school_reviews_slug_published_idx
  ON school_reviews (school_slug, is_published);

-- One review per user per school
CREATE UNIQUE INDEX IF NOT EXISTS school_reviews_one_per_user_per_school
  ON school_reviews (school_slug, reviewer_id);

-- ---- Row Level Security ----
ALTER TABLE school_reviews ENABLE ROW LEVEL SECURITY;

-- Anyone (including anonymous) can read published reviews
CREATE POLICY "public_read_published_reviews"
  ON school_reviews
  FOR SELECT
  USING (is_published = true);

-- Authenticated Clerk users can insert their own review
-- auth.uid() returns the Clerk sub claim when using the "supabase" JWT template
CREATE POLICY "users_insert_own_review"
  ON school_reviews
  FOR INSERT
  WITH CHECK (reviewer_id = auth.uid()::text);

-- Users can update their own review only while it is still unpublished
CREATE POLICY "users_update_own_unpublished_review"
  ON school_reviews
  FOR UPDATE
  USING (reviewer_id = auth.uid()::text AND is_published = false)
  WITH CHECK (reviewer_id = auth.uid()::text AND is_published = false);

-- Service-role (admin) can do everything — covered by service role bypass of RLS.
