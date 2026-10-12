-- Student courses
CREATE TABLE IF NOT EXISTS student_courses (
  id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id text NOT NULL,
  institution_slug text NOT NULL REFERENCES institutions(slug) ON DELETE CASCADE,
  course_code text NOT NULL,
  course_name text,
  professor text,
  semester text NOT NULL DEFAULT '2025-F',
  created_at timestamptz DEFAULT now(),
  UNIQUE(user_id, institution_slug, course_code, semester)
);

ALTER TABLE student_courses ENABLE ROW LEVEL SECURITY;

CREATE POLICY "students can manage own courses"
  ON student_courses FOR ALL
  USING (user_id = auth.uid()::text)
  WITH CHECK (user_id = auth.uid()::text);

-- Allow reading classmates (same course, same institution, same semester)
CREATE POLICY "students can see classmates courses"
  ON student_courses FOR SELECT
  USING (true);

-- Textbook marketplace
CREATE TABLE IF NOT EXISTS textbook_listings (
  id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  seller_id text NOT NULL,
  institution_slug text NOT NULL REFERENCES institutions(slug) ON DELETE CASCADE,
  course_code text,
  title text NOT NULL,
  author text,
  isbn text,
  edition text,
  condition text CHECK (condition IN ('new','like_new','good','fair','poor')) DEFAULT 'good',
  asking_price numeric(8,2),
  is_free boolean DEFAULT false,
  description text,
  cover_url text,
  status text CHECK (status IN ('available','sold','reserved')) DEFAULT 'available',
  created_at timestamptz DEFAULT now()
);

ALTER TABLE textbook_listings ENABLE ROW LEVEL SECURITY;

CREATE POLICY "anyone can view available textbooks"
  ON textbook_listings FOR SELECT
  USING (status = 'available');

CREATE POLICY "sellers manage own listings"
  ON textbook_listings FOR ALL
  USING (seller_id = auth.uid()::text)
  WITH CHECK (seller_id = auth.uid()::text);

-- Study groups (lightweight: a study session tied to a course)
CREATE TABLE IF NOT EXISTS study_groups (
  id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  organizer_id text NOT NULL,
  institution_slug text NOT NULL REFERENCES institutions(slug) ON DELETE CASCADE,
  course_code text NOT NULL,
  course_name text,
  title text NOT NULL,
  description text,
  location text,
  is_virtual boolean DEFAULT false,
  meeting_link text,
  scheduled_at timestamptz NOT NULL,
  duration_minutes int DEFAULT 90,
  max_members int DEFAULT 8,
  created_at timestamptz DEFAULT now()
);

ALTER TABLE study_groups ENABLE ROW LEVEL SECURITY;
CREATE POLICY "anyone can view study groups" ON study_groups FOR SELECT USING (true);
CREATE POLICY "organizer manages own groups" ON study_groups FOR ALL
  USING (organizer_id = auth.uid()::text)
  WITH CHECK (organizer_id = auth.uid()::text);

CREATE TABLE IF NOT EXISTS study_group_members (
  group_id uuid NOT NULL REFERENCES study_groups(id) ON DELETE CASCADE,
  user_id text NOT NULL,
  joined_at timestamptz DEFAULT now(),
  PRIMARY KEY (group_id, user_id)
);

ALTER TABLE study_group_members ENABLE ROW LEVEL SECURITY;
CREATE POLICY "members manage own membership" ON study_group_members FOR ALL
  USING (user_id = auth.uid()::text)
  WITH CHECK (user_id = auth.uid()::text);
CREATE POLICY "anyone can see group members" ON study_group_members FOR SELECT USING (true);

-- Indexes
CREATE INDEX IF NOT EXISTS idx_student_courses_user ON student_courses(user_id);
CREATE INDEX IF NOT EXISTS idx_student_courses_code ON student_courses(institution_slug, course_code, semester);
CREATE INDEX IF NOT EXISTS idx_textbooks_institution ON textbook_listings(institution_slug, status);
CREATE INDEX IF NOT EXISTS idx_textbooks_course ON textbook_listings(course_code, status);
CREATE INDEX IF NOT EXISTS idx_study_groups_course ON study_groups(institution_slug, course_code);
