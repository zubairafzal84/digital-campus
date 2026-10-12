-- Digital Kampus seed data
-- Matches the schema in 20261012000001_initial_schema.sql

-- ============================================================
-- Institutions
-- ============================================================
INSERT INTO public.institutions (
  id, slug, name_en, name_fr, short_name, type, province, city,
  website_url, founded_year, total_enrolment, acceptance_rate,
  domestic_tuition_min, domestic_tuition_max,
  international_tuition_min, international_tuition_max,
  is_verified, is_published
)
VALUES
  (gen_random_uuid(), 'ubc',   'University of British Columbia', 'Université de la Colombie-Britannique', 'UBC', 'university', 'BC', 'Vancouver', 'https://ubc.ca', 1908, 66000, 52, 6571, 7571, 39271, 41271, true, true),
  (gen_random_uuid(), 'sfu',   'Simon Fraser University',        'Université Simon Fraser',                'SFU', 'university', 'BC', 'Burnaby',   'https://sfu.ca', 1965, 37000, 65, 6282, 7282, 26082, 28082, true, true),
  (gen_random_uuid(), 'uoft',  'University of Toronto',          'Université de Toronto',                  'UofT','university', 'ON', 'Toronto',   'https://utoronto.ca', 1827, 97000, 43, 6100, 7500, 57020, 59520, true, true),
  (gen_random_uuid(), 'mcgill','McGill University',              'Université McGill',                      'McGill','university','QC','Montréal',  'https://mcgill.ca',  1821, 40000, 46, 4338, 5338, 25000, 27000, true, true),
  (gen_random_uuid(), 'uwaterloo','University of Waterloo',      'Université de Waterloo',                 'UW',  'university', 'ON', 'Waterloo',  'https://uwaterloo.ca', 1959, 42000, 53, 6700, 7700, 37000, 39000, true, true),
  (gen_random_uuid(), 'queens','Queen''s University',            'Université Queen''s',                    'Queen''s','university','ON','Kingston', 'https://queensu.ca', 1841, 25000, 42, 6500, 7500, 48000, 50000, true, true),
  (gen_random_uuid(), 'ualberta','University of Alberta',        'Université de l''Alberta',               'UAlberta','university','AB','Edmonton', 'https://ualberta.ca', 1908, 40000, 58, 5600, 6600, 28000, 30000, true, true),
  (gen_random_uuid(), 'uvic',  'University of Victoria',         'Université de Victoria',                 'UVic', 'university','BC','Victoria',  'https://uvic.ca',    1963, 22000, 70, 5660, 6660, 29000, 31000, true, true),
  (gen_random_uuid(), 'dal',   'Dalhousie University',           'Université Dalhousie',                   'Dal', 'university', 'NS', 'Halifax',   'https://dal.ca',     1818, 19000, 62, 9000, 10000, 22000, 24000, true, true),
  (gen_random_uuid(), 'bcit',  'British Columbia Institute of Technology','Institut de technologie de la C.-B.','BCIT','polytechnic','BC','Burnaby','https://bcit.ca', 1964, 48000, 75, 4500, 5500, 18000, 20000, true, true),
  (gen_random_uuid(), 'seneca','Seneca Polytechnic',             'Sénéca Polytechnique',                   'Seneca','college',  'ON', 'Toronto',   'https://senecacollege.ca', 1967, 35000, 80, 3800, 4800, 16500, 18500, true, true),
  (gen_random_uuid(), 'humber','Humber College',                 'Collège Humber',                         'Humber','college', 'ON', 'Etobicoke', 'https://humber.ca',  1967, 30000, 78, 3700, 4700, 15800, 17800, true, true)
ON CONFLICT (slug) DO NOTHING;

-- ============================================================
-- Scholarships
-- ============================================================
INSERT INTO public.scholarships (
  id, name_en, name_fr, type, funder, funder_name,
  amount_min, amount_max, is_renewable, deadline,
  application_url, description_en, provinces,
  is_published, is_verified
)
VALUES
  (gen_random_uuid(),
   'Schulich Leader Scholarship', 'Bourse Schulich Leader',
   'scholarship', 'private', 'Schulich Foundation',
   100000, 100000, true, '2025-03-31',
   'https://schulichleaders.com',
   'Canada''s most coveted undergraduate STEM scholarship. Four-year award for students entering university with exceptional academic and leadership achievements.',
   ARRAY['AB','BC','MB','NB','NL','NS','ON','PE','QC','SK']::province[],
   true, true),

  (gen_random_uuid(),
   'TD Scholarship for Community Leadership', 'Bourse TD pour le leadership communautaire',
   'scholarship', 'foundation', 'TD Bank Group',
   70000, 70000, true, '2025-03-01',
   'https://td.com/scholarship',
   'Recognizes young Canadians who demonstrate outstanding commitment to community service. $17,500/year for four years.',
   ARRAY['AB','BC','MB','NB','NL','NS','ON','PE','QC','SK']::province[],
   true, true),

  (gen_random_uuid(),
   'Canada Student Grant for Full-Time Students', 'Bourse canadienne pour étudiants à temps plein',
   'grant', 'government', 'Government of Canada',
   3000, 4200, true, NULL,
   'https://canada.ca/student-grants',
   'Non-repayable federal grant for eligible low- and middle-income students in full-time post-secondary studies.',
   ARRAY['AB','BC','MB','NB','NL','NS','ON','PE','SK']::province[],
   true, true),

  (gen_random_uuid(),
   'Loran Award', 'Prix Loran',
   'award', 'foundation', 'Loran Scholars Foundation',
   100000, 100000, true, '2024-11-01',
   'https://loranscholar.ca',
   'Recognizes character, service, and leadership potential. Recipients receive mentorship, a summer stipend, and a national network of peers.',
   ARRAY['AB','BC','MB','NB','NL','NS','ON','PE','QC','SK']::province[],
   true, true),

  (gen_random_uuid(),
   'RBC Future Launch Scholarship', 'Bourse RBC Lancement de carrière',
   'bursary', 'foundation', 'Royal Bank of Canada',
   10000, 10000, false, '2025-02-15',
   'https://rbc.com/futurelaunch',
   'Supports young Canadians who face barriers to entering the workforce, with funding and mentorship.',
   ARRAY['AB','BC','MB','NB','NL','NS','ON','PE','QC','SK']::province[],
   true, true),

  (gen_random_uuid(),
   'BMO First Canadian Scholarship', 'Bourse BMO Premier Canadien',
   'scholarship', 'foundation', 'BMO Financial Group',
   5000, 5000, true, '2025-04-30',
   'https://bmo.com/scholarship',
   'Awarded to students from underrepresented communities entering their first year of post-secondary education at a Canadian institution. Covers tuition and living expenses.',
   ARRAY['AB','BC','MB','NB','NL','NS','ON','PE','QC','SK']::province[],
   true, true)
ON CONFLICT DO NOTHING;

-- ============================================================
-- Clubs
-- Requires institutions to exist first.
-- Using a subquery to look up institution by slug.
-- ============================================================
INSERT INTO public.clubs (id, institution_id, name, slug, category, description, member_count, is_published)
SELECT
  gen_random_uuid(),
  i.id,
  c.name,
  c.slug,
  c.category::club_category,
  c.description,
  c.member_count,
  true
FROM (VALUES
  ('ubc',    'UBC Robotics Club',             'ubc-robotics',      'technology', 'Design, build, and compete with autonomous robots. Weekly build sessions and national competitions.', 120),
  ('ubc',    'UBC Debate Society',            'ubc-debate',        'academic',   'Competitive and recreational debate in parliamentary formats. Open to all experience levels.',      85),
  ('ubc',    'UBC Photography Club',          'ubc-photography',   'arts',       'Weekly photo walks, darkroom workshops, and an annual exhibition. All skill levels welcome.',       67),
  ('uoft',   'UofT AI Club',                  'uoft-ai',           'technology', 'Reading groups, workshops, and project teams exploring machine learning and AI research.',           210),
  ('uoft',   'UofT Sustainability Network',   'uoft-sustainability','social',    'Campus sustainability initiatives, community gardens, and advocacy at UofT.',                        143),
  ('sfu',    'SFU Entrepreneurship Society',  'sfu-entrepreneurship','professional','Speaker series, startup pitch competitions, and mentorship from local founders.',                190)
) AS c (institution_slug, name, slug, category, description, member_count)
JOIN institutions i ON i.slug = c.institution_slug
ON CONFLICT DO NOTHING;
