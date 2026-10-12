-- Digital Kampus seed data
-- Run after migrations with: supabase db seed

-- ============================================================
-- Schools
-- ============================================================
INSERT INTO public.schools (id, slug, name, name_fr, province_code, city, type, website, founded_year, student_count, acceptance_rate, tuition_domestic, tuition_international, verified, status)
VALUES
  (gen_random_uuid(), 'ubc',   'University of British Columbia', 'Université de la Colombie-Britannique', 'BC', 'Vancouver',  'university', 'https://ubc.ca',     1908, 66000, 52, 6571,  39271, true, 'active'),
  (gen_random_uuid(), 'sfu',   'Simon Fraser University',        'Université Simon Fraser',               'BC', 'Burnaby',    'university', 'https://sfu.ca',     1965, 37000, 65, 6282,  26082, true, 'active'),
  (gen_random_uuid(), 'uoft',  'University of Toronto',          'Université de Toronto',                 'ON', 'Toronto',    'university', 'https://utoronto.ca',1827, 97000, 43, 6100,  57020, true, 'active'),
  (gen_random_uuid(), 'mcgill','McGill University',              'Université McGill',                     'QC', 'Montréal',   'university', 'https://mcgill.ca',  1821, 40000, 46, 4338,  25000, true, 'active'),
  (gen_random_uuid(), 'uwaterloo','University of Waterloo',      'Université de Waterloo',                'ON', 'Waterloo',   'university', 'https://uwaterloo.ca',1959,42000, 53, 6700,  37000, true, 'active'),
  (gen_random_uuid(), 'queens','Queen''s University',            'Université Queen''s',                   'ON', 'Kingston',   'university', 'https://queensu.ca', 1841, 25000, 42, 6500,  48000, true, 'active'),
  (gen_random_uuid(), 'ualberta','University of Alberta',        'Université de l''Alberta',              'AB', 'Edmonton',   'university', 'https://ualberta.ca',1908, 40000, 58, 5600,  28000, true, 'active'),
  (gen_random_uuid(), 'uvic',  'University of Victoria',         'Université de Victoria',                'BC', 'Victoria',   'university', 'https://uvic.ca',    1963, 22000, 70, 5660,  29000, true, 'active'),
  (gen_random_uuid(), 'dal',   'Dalhousie University',           'Université Dalhousie',                  'NS', 'Halifax',    'university', 'https://dal.ca',     1818, 19000, 62, 9000,  22000, true, 'active'),
  (gen_random_uuid(), 'bcit',  'British Columbia Institute of Technology','Institut de technologie de la C.-B.','BC','Burnaby','college', 'https://bcit.ca',    1964, 48000, 75, 4500,  18000, true, 'active'),
  (gen_random_uuid(), 'seneca','Seneca Polytechnic',             'Sénéca Polytechnique',                  'ON', 'Toronto',    'college',   'https://senecacollege.ca',1967,35000,80, 3800, 16500, true, 'active'),
  (gen_random_uuid(), 'humber','Humber College',                 'Collège Humber',                        'ON', 'Etobicoke',  'college',   'https://humber.ca',  1967, 30000, 78, 3700, 15800, true, 'active')
ON CONFLICT (slug) DO NOTHING;

-- ============================================================
-- Scholarships
-- ============================================================
INSERT INTO public.scholarships (id, name, name_fr, provider, amount, currency, type, deadline, renewable, gpa_minimum, eligible_provinces, description, url, verified)
VALUES
  (gen_random_uuid(),
   'Schulich Leader Scholarship',
   'Bourse Schulich Leader',
   'Schulich Foundation',
   100000, 'CAD', 'merit',
   '2025-03-31',
   true, 3.7,
   ARRAY['AB','BC','MB','NB','NL','NS','ON','PE','QC','SK'],
   'Canada''s most coveted undergraduate STEM scholarship. Four-year award for students entering university with exceptional academic and leadership achievements.',
   'https://schulichleaders.com',
   true),

  (gen_random_uuid(),
   'TD Scholarship for Community Leadership',
   'Bourse TD pour le leadership communautaire',
   'TD Bank Group',
   70000, 'CAD', 'merit',
   '2025-03-01',
   true, 0,
   ARRAY['AB','BC','MB','NB','NL','NS','ON','PE','QC','SK'],
   'Recognizes young Canadians who demonstrate outstanding commitment to community service. $17,500/year for four years.',
   'https://td.com/scholarship',
   true),

  (gen_random_uuid(),
   'Canada Student Grant for Full-Time Students',
   'Bourse canadienne pour étudiants à temps plein',
   'Government of Canada',
   4200, 'CAD', 'government',
   NULL,
   true, 0,
   ARRAY['AB','BC','MB','NB','NL','NS','ON','PE','SK'],
   'Non-repayable federal grant for eligible low- and middle-income students in full-time post-secondary studies. Does not need to be repaid.',
   'https://canada.ca/student-grants',
   true),

  (gen_random_uuid(),
   'Loran Award',
   'Prix Loran',
   'Loran Scholars Foundation',
   100000, 'CAD', 'merit',
   '2024-11-01',
   true, 0,
   ARRAY['AB','BC','MB','NB','NL','NS','ON','PE','QC','SK'],
   'Recognizes character, service, and leadership potential. Recipients receive mentorship, a summer stipend, and a national network of peers.',
   'https://loranscholar.ca',
   true),

  (gen_random_uuid(),
   'RBC Future Launch Scholarship',
   'Bourse RBC Lancement de carrière',
   'Royal Bank of Canada',
   10000, 'CAD', 'needs-based',
   '2025-02-15',
   false, 0,
   ARRAY['AB','BC','MB','NB','NL','NS','ON','PE','QC','SK'],
   'Supports young Canadians who face barriers to entering the workforce, with funding and mentorship.',
   'https://rbc.com/futurelaunch',
   true),

  (gen_random_uuid(),
   'UBC Trek Excellence Scholarship',
   'Bourse Trek Excellence UBC',
   'University of British Columbia',
   5000, 'CAD', 'entrance',
   '2025-04-30',
   false, 3.8,
   ARRAY['BC'],
   'Awarded to exceptional domestic students entering UBC for the first time. Based on academic achievement in Grade 12.',
   'https://students.ubc.ca/enrolment/finances/awards-scholarships',
   true)
ON CONFLICT DO NOTHING;

-- ============================================================
-- Sample clubs (no auth required for clubs table)
-- ============================================================
INSERT INTO public.clubs (id, school_slug, name, category, description, member_count, meeting_schedule, status)
VALUES
  (gen_random_uuid(), 'ubc', 'UBC Robotics Club', 'technology', 'Design, build, and compete with autonomous robots. We compete in national competitions and run weekly build sessions.', 120, 'Wednesdays 6–9 PM, ICICS 246', 'active'),
  (gen_random_uuid(), 'ubc', 'UBC Debate Society', 'academic', 'Competitive and recreational debate in parliamentary and British Parliamentary formats. Open to all experience levels.', 85, 'Tuesdays 7 PM, BUCH A202', 'active'),
  (gen_random_uuid(), 'ubc', 'UBC Photography Club', 'arts', 'Weekly photo walks, darkroom workshops, and an annual exhibition. Beginners welcome.', 67, 'Thursdays 5 PM, Student Nest', 'active'),
  (gen_random_uuid(), 'uoft', 'UofT AI Club', 'technology', 'Reading groups, workshops, and project teams exploring machine learning and AI research.', 210, 'Fridays 4 PM, BA1190', 'active'),
  (gen_random_uuid(), 'uoft', 'UofT Sustainability Network', 'environmental', 'Campus sustainability initiatives, community gardens, and advocacy work on the UofT campus.', 143, 'Mondays 6 PM, UC146', 'active'),
  (gen_random_uuid(), 'sfu', 'SFU Entrepreneurship Society', 'professional', 'Speaker series, startup pitch competitions, and mentorship from local founders.', 190, 'Thursdays 7 PM, SFU Surrey', 'active')
ON CONFLICT DO NOTHING;
