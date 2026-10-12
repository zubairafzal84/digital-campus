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
  (gen_random_uuid(), 'humber','Humber College',                 'Collège Humber',                         'Humber','college', 'ON', 'Etobicoke', 'https://humber.ca',  1967, 30000, 78, 3700, 4700, 15800, 17800, true, true),
  -- Expanded universities
  (gen_random_uuid(), 'western',  'Western University',                  'Université Western',                         'Western',  'university',  'ON', 'London',      'https://uwo.ca',          1878, 32000, 58, 6800, 7800, 32000, 34000, true,  true),
  (gen_random_uuid(), 'mcmaster', 'McMaster University',                 'Université McMaster',                        'Mac',       'university',  'ON', 'Hamilton',    'https://mcmaster.ca',     1887, 37000, 55, 7200, 8200, 30000, 32000, true,  true),
  (gen_random_uuid(), 'ucalgary', 'University of Calgary',               'Université de Calgary',                      'UCalgary',  'university',  'AB', 'Calgary',     'https://ucalgary.ca',     1966, 35000, 60, 6000, 7000, 28500, 30500, true,  true),
  (gen_random_uuid(), 'umanitoba','University of Manitoba',              'Université du Manitoba',                     'UManitoba', 'university',  'MB', 'Winnipeg',    'https://umanitoba.ca',    1877, 30000, 65, 4600, 5600, 18500, 20500, true,  true),
  (gen_random_uuid(), 'uottawa',  'University of Ottawa',                'Université d''Ottawa',                       'UOttawa',   'university',  'ON', 'Ottawa',      'https://uottawa.ca',      1848, 44000, 68, 6800, 7800, 29000, 31000, true,  true),
  (gen_random_uuid(), 'carleton', 'Carleton University',                 'Université Carleton',                        'Carleton',  'university',  'ON', 'Ottawa',      'https://carleton.ca',     1942, 30000, 72, 6400, 7400, 27500, 29500, true,  true),
  (gen_random_uuid(), 'concordia','Concordia University',                'Université Concordia',                       'Concordia', 'university',  'QC', 'Montréal',    'https://concordia.ca',    1974, 51000, 66, 4700, 5700, 21000, 23000, true,  true),
  (gen_random_uuid(), 'yorku',    'York University',                     'Université York',                            'York',      'university',  'ON', 'Toronto',     'https://yorku.ca',        1959, 55000, 64, 6600, 7600, 31000, 33000, true,  true),
  (gen_random_uuid(), 'ryerson',  'Toronto Metropolitan University',     'Université métropolitaine de Toronto',       'TMU',       'university',  'ON', 'Toronto',     'https://torontomu.ca',    1948, 48000, 62, 7200, 8200, 29000, 31000, true,  true),
  (gen_random_uuid(), 'udem',     'Université de Montréal',              'Université de Montréal',                     'UdeM',      'university',  'QC', 'Montréal',    'https://umontreal.ca',    1878, 67000, 55, 4000, 5000, 20000, 22000, true,  true),
  (gen_random_uuid(), 'laval',    'Université Laval',                    'Université Laval',                           'Laval',     'university',  'QC', 'Québec City', 'https://ulaval.ca',       1852, 50000, 58, 3800, 4800, 19000, 21000, true,  true),
  (gen_random_uuid(), 'usask',    'University of Saskatchewan',          'Université de la Saskatchewan',              'USask',     'university',  'SK', 'Saskatoon',   'https://usask.ca',        1907, 26000, 68, 5600, 6600, 22000, 24000, true,  true),
  (gen_random_uuid(), 'mun',      'Memorial University of Newfoundland', 'Université Memorial de Terre-Neuve',         'MUN',       'university',  'NL', 'St. John''s', 'https://mun.ca',          1925, 19000, 70, 3200, 4200, 11500, 13500, true,  true),
  (gen_random_uuid(), 'unb',      'University of New Brunswick',         'Université du Nouveau-Brunswick',            'UNB',       'university',  'NB', 'Fredericton', 'https://unb.ca',          1785, 10000, 72, 7700, 8700, 17000, 19000, true,  true),
  -- Colleges & polytechnics
  (gen_random_uuid(), 'georgebrown','George Brown College',              'Collège George Brown',                       'GBC',       'college',     'ON', 'Toronto',     'https://georgebrown.ca',  1967, 31000, 80, 3900, 4900, 16000, 18000, false, true),
  (gen_random_uuid(), 'sheridan',  'Sheridan College',                   'Collège Sheridan',                           'Sheridan',  'college',     'ON', 'Brampton',    'https://sheridancollege.ca',1967,24000, 79, 3800, 4800, 15500, 17500, false, true),
  (gen_random_uuid(), 'algonquin', 'Algonquin College',                  'Collège Algonquin',                          'AC',        'college',     'ON', 'Ottawa',      'https://algonquincollege.com',1957,22000,82, 3600, 4600, 15000, 17000, false, true),
  (gen_random_uuid(), 'kwantlen',  'Kwantlen Polytechnic University',    'Université polytechnique Kwantlen',          'KPU',       'polytechnic', 'BC', 'Surrey',      'https://kpu.ca',          1981, 20000, 80, 4200, 5200, 17500, 19500, false, true)
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
   true, true),

  (gen_random_uuid(),
   'Vanier Canada Graduate Scholarship', 'Bourse d''études supérieures du Canada Vanier',
   'scholarship', 'government', 'Government of Canada (CIHR/NSERC/SSHRC)',
   50000, 50000, true, '2025-11-01',
   'https://vanier.gc.ca',
   'Canada''s most prestigious doctoral scholarship. Awarded to world-class doctoral students who demonstrate leadership skills and high academic achievement ($50,000/year for 3 years).',
   ARRAY['AB','BC','MB','NB','NL','NS','ON','PE','QC','SK']::province[],
   true, true),

  (gen_random_uuid(),
   'NSERC Postgraduate Scholarship – Doctoral (PGS D)', 'Bourse d''études supérieures du Canada au niveau du doctorat (BESC D) du CRSNG',
   'scholarship', 'government', 'Natural Sciences and Engineering Research Council of Canada',
   21000, 21000, true, '2025-10-17',
   'https://www.nserc-crsng.gc.ca/Students-Etudiants/PG-CS/PGSD-BESCD_eng.asp',
   'Supports full-time graduate students engaged in doctoral programs in natural sciences or engineering. Award provides $21,000/year for up to 3 years.',
   ARRAY['AB','BC','MB','NB','NL','NS','ON','PE','QC','SK']::province[],
   true, true),

  (gen_random_uuid(),
   'Pierre Elliott Trudeau Foundation Doctoral Scholarship', 'Bourse doctorale de la Fondation Pierre Elliott Trudeau',
   'scholarship', 'foundation', 'Pierre Elliott Trudeau Foundation',
   40000, 40000, true, '2025-12-01',
   'https://www.trudeaufoundation.ca',
   'Awarded to exceptional doctoral candidates in social sciences and humanities who demonstrate leadership, engagement with Canadian society, and a commitment to public dialogue.',
   ARRAY['AB','BC','MB','NB','NL','NS','ON','PE','QC','SK']::province[],
   true, true),

  (gen_random_uuid(),
   'Ontario Graduate Scholarship (OGS)', 'Bourse d''études supérieures de l''Ontario (BESO)',
   'scholarship', 'government', 'Government of Ontario',
   15000, 15000, true, '2025-01-14',
   'https://osap.gov.on.ca/OSAPPortal/en/OtherOSAPGrants/OSAP004117.html',
   'Merit-based provincial scholarship supporting master''s and doctoral students studying at an eligible Ontario university. $5,000/term for 3 terms.',
   ARRAY['ON']::province[],
   true, true),

  (gen_random_uuid(),
   'SSHRC Doctoral Fellowship', 'Bourse de doctorat du CRSH',
   'scholarship', 'government', 'Social Sciences and Humanities Research Council of Canada',
   20000, 20000, true, '2025-10-15',
   'https://www.sshrc-crsh.gc.ca/funding-financement/programs-programmes/fellowships/doctoral-doctorat-eng.aspx',
   'Supports Canadian citizens and permanent residents engaged in full-time doctoral programs in the social sciences and humanities. Valued at $20,000/year for up to 4 years.',
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

-- ============================================================
-- Professors
-- Generic academic names — not based on any real specific person.
-- rating_count = 0, all avg_ fields = NULL (no fabricated ratings).
-- ============================================================
INSERT INTO public.professors (name, school_slug, department, courses, is_published)
VALUES
  ('Dr. Sarah Chen',        'ubc',       'Computer Science',          ARRAY['CPSC 110', 'CPSC 313'],         true),
  ('Prof. James Okafor',    'uoft',      'Electrical Engineering',    ARRAY['ECE 302', 'ECE 410'],           true),
  ('Dr. Marie Tremblay',    'mcgill',    'Biochemistry',              ARRAY['BIOL 200', 'BIOL 460'],         true),
  ('Prof. Arun Sharma',     'uwaterloo', 'Mathematics',               ARRAY['MATH 135', 'MATH 235'],         true),
  ('Dr. Fatima Al-Hassan',  'ualberta',  'Economics',                 ARRAY['ECON 101', 'ECON 281'],         true),
  ('Prof. David Kowalski',  'dal',       'History',                   ARRAY['HIST 1001', 'HIST 2201'],       true),
  ('Dr. Priya Nair',        'sfu',       'Psychology',                ARRAY['PSYC 100', 'PSYC 280'],         true),
  ('Prof. Étienne Bouchard','uottawa',   'Political Science',         ARRAY['POL 1101', 'POL 2302'],         true),
  ('Dr. Kenji Watanabe',    'ubc',       'Physics & Astronomy',       ARRAY['PHYS 101', 'PHYS 301'],         true),
  ('Prof. Amara Diallo',    'mcmaster',  'Health Sciences',           ARRAY['HLTHSCI 2A06', 'HLTHSCI 3P03'], true)
ON CONFLICT DO NOTHING;

-- ============================================================
-- Campus Events (Nov – Dec 2026)
-- ============================================================
INSERT INTO public.events (
  title, description, event_type, school_slug, organizer_name,
  location, is_online, online_url, starts_at, ends_at,
  max_attendees, is_free, price_cents, is_published
)
VALUES
  (
    'UBC Involvement Fair',
    'Connect with 200+ clubs, teams, and student organizations at UBC''s annual Involvement Fair. Bring your student card and an open mind.',
    'social', 'ubc', 'UBC Student Services',
    'UBC Life Building, 6138 Student Union Blvd', false, NULL,
    '2026-11-03 11:00:00-08', '2026-11-03 15:00:00-08',
    2000, true, 0, true
  ),
  (
    'McGill Winter Carnival Kickoff',
    'Kick off McGill''s iconic Winter Carnival with live music, hot cocoa stations, and the lighting of the carnival tree on Lower Campus.',
    'social', 'mcgill', 'McGill Student Union',
    'McGill Lower Campus, Milton St', false, NULL,
    '2026-11-28 17:00:00-05', '2026-11-28 21:00:00-05',
    1500, true, 0, true
  ),
  (
    'Waterloo Co-op Info Session',
    'Everything you need to know about the Waterloo co-op program: how to apply, what employers look for, and how to ace WaterlooWorks.',
    'career', 'uwaterloo', 'Waterloo Centre for Career Action',
    'EV1 241, University of Waterloo', false, NULL,
    '2026-11-05 14:30:00-05', '2026-11-05 16:00:00-05',
    120, true, 0, true
  ),
  (
    'UofT Study Hall — Finals Prep',
    'Open study hall with peer tutors, free printing, and light snacks. All programs welcome.',
    'academic', 'uoft', 'UofT Student Success Centre',
    'Robarts Library, 3rd Floor Reading Room', false, NULL,
    '2026-11-25 09:00:00-05', '2026-11-25 22:00:00-05',
    300, true, 0, true
  ),
  (
    'Queen''s Homecoming Tailgate',
    'The official Queen''s Homecoming pre-game tailgate on Richardson Stadium grounds. Food trucks, merch, and Golden Gaels spirit.',
    'social', 'queens', 'Queen''s AMS',
    'Richardson Stadium, 98 Union St, Kingston', false, NULL,
    '2026-11-07 10:00:00-05', '2026-11-07 13:00:00-05',
    1000, false, 1500, true
  ),
  (
    'SFU Open House 2026',
    'Explore SFU Burnaby — campus tours, faculty showcases, admissions Q&A, and research demos. Perfect for prospective students and families.',
    'academic', 'sfu', 'SFU Undergraduate Admissions',
    'SFU Burnaby Mountain Campus', false, NULL,
    '2026-11-14 10:00:00-08', '2026-11-14 16:00:00-08',
    3000, true, 0, true
  ),
  (
    'McMaster Science Fair & Research Showcase',
    'Undergraduate and graduate students present research posters across biology, chemistry, physics, and engineering.',
    'academic', 'mcmaster', 'McMaster Faculty of Science',
    'Burke Science Building Atrium, McMaster University', false, NULL,
    '2026-11-19 13:00:00-05', '2026-11-19 17:00:00-05',
    400, true, 0, true
  ),
  (
    'Carleton Grad School Info Night',
    'Find out how to apply to Carleton graduate programs. Panel of current grad students and faculty supervisors.',
    'academic', 'carleton', 'Carleton School of Graduate and Postdoctoral Studies',
    'River Building 2200, Carleton University', false, NULL,
    '2026-11-10 18:00:00-05', '2026-11-10 20:00:00-05',
    200, true, 0, true
  ),
  (
    'UBC Intramural Basketball Championship',
    'Cheer on the finalists of UBC''s intramural basketball league. Free admission for all students with your UCard.',
    'sports', 'ubc', 'UBC Recreation',
    'UBC Thunderbird Arena — Practice Gym', false, NULL,
    '2026-11-21 14:00:00-08', '2026-11-21 18:00:00-08',
    500, true, 0, true
  ),
  (
    'Dalhousie Acoustic Night — Open Mic',
    'Grab a mic or just a seat. Monthly acoustic open mic night hosted by Dal Arts Society in the Grawood Lounge.',
    'arts', 'dal', 'Dalhousie Arts Society',
    'Grawood Lounge, Dalhousie Student Union', false, NULL,
    '2026-11-12 19:00:00-04', '2026-11-12 22:00:00-04',
    150, true, 0, true
  ),
  (
    'UAlberta Climate Action Volunteer Day',
    'Join fellow students to plant native trees and restore riparian habitat along the North Saskatchewan River.',
    'volunteer', 'ualberta', 'UAlberta Sustainability Council',
    'Kinsmen Park, Edmonton (meet at main gate)', false, NULL,
    '2026-11-08 08:30:00-07', '2026-11-08 14:00:00-07',
    80, true, 0, true
  ),
  (
    'Seneca Resume & LinkedIn Workshop',
    'Land your first co-op or full-time job. Hands-on workshop with Seneca Career Services advisors.',
    'career', 'seneca', 'Seneca Career Services',
    NULL, true, 'https://events.senecacollege.ca/resume-workshop',
    '2026-11-17 12:00:00-05', '2026-11-17 13:30:00-05',
    60, true, 0, true
  ),
  (
    'UVic Winter Arts Market',
    'Local student artists, ceramicists, photographers, and makers selling original work. Perfect for holiday gifts.',
    'arts', 'uvic', 'UVic Fine Arts Student Society',
    'UVic Student Union Building Atrium', false, NULL,
    '2026-12-05 10:00:00-08', '2026-12-05 17:00:00-08',
    800, true, 0, true
  ),
  (
    'Waterloo Startup Weekend',
    'Build a company in 54 hours. Teams pitch ideas Friday night, then sprint through the weekend with mentors from the Waterloo startup ecosystem.',
    'career', 'uwaterloo', 'Velocity — UW Entrepreneurship',
    'Velocity Garage, 200 University Ave W', false, NULL,
    '2026-12-11 18:00:00-05', '2026-12-13 21:00:00-05',
    120, false, 7500, true
  ),
  (
    'UofT Frosh Week End-of-Year Party',
    'Celebrate the end of first semester with the first-year class. DJ, photo booth, and year-end awards.',
    'frosh', 'uoft', 'University of Toronto Students'' Union',
    'Bahen Centre Atrium, 40 St George St', false, NULL,
    '2026-12-03 20:00:00-05', '2026-12-03 23:00:00-05',
    600, false, 1000, true
  )
ON CONFLICT DO NOTHING;


-- ============================================================
-- Surveys (sample active surveys from orgs)
-- created_by = 'seed' so no real Clerk user ID is needed here
-- (In production these would be real org user IDs)
-- ============================================================
INSERT INTO public.surveys (
  title,
  description,
  organization_name,
  created_by,
  status,
  reward_description,
  estimated_minutes,
  closes_at,
  max_participants,
  current_participants,
  is_anonymous,
  target_schools,
  tags,
  is_featured,
  plan
) VALUES
  (
    'Student Banking & Financial Literacy Study',
    'RBC wants to understand how Canadian students manage their finances, use banking apps, and plan for the future. Responses shape new student banking products.',
    'RBC Royal Bank', 'seed_rbc', 'active',
    '$25 Amazon gift card (draw entry)',
    8, now() + interval '45 days', 500, 312, true,
    NULL,
    ARRAY['finance', 'banking', 'student-life'],
    true, 'professional'
  ),
  (
    'Mental Health & Academic Stress Survey',
    'Research study from the University of Toronto examining the relationship between academic pressure, sleep, and student well-being across Canadian campuses.',
    'University of Toronto — Psychology Dept.', 'seed_uoft', 'active',
    'Entry into $200 draw',
    12, now() + interval '60 days', 1000, 671, true,
    ARRAY['uoft','mcgill','queens','ubc'],
    ARRAY['health', 'wellness', 'research'],
    true, 'professional'
  ),
  (
    'Campus Music Discovery Habits',
    'How do students find new music on campus? We''re looking at streaming habits, study playlists, and live event attendance.',
    'Spotify Canada', 'seed_spotify', 'active',
    '3 months Spotify Premium',
    5, now() + interval '30 days', 300, 288, true,
    NULL,
    ARRAY['entertainment', 'tech', 'student-life'],
    false, 'starter'
  ),
  (
    'Off-Campus Housing Satisfaction',
    'McGill''s Urban Planning Lab is studying off-campus housing affordability, conditions, and commute times among students in the greater Montreal area.',
    'McGill Urban Planning Lab', 'seed_mcgill', 'active',
    NULL,
    10, now() + interval '90 days', 400, 157, true,
    ARRAY['mcgill','concordia','udem','uqam'],
    ARRAY['housing', 'research', 'student-life'],
    false, 'free'
  ),
  (
    'Campus Menu Feedback — New Autumn Items',
    'Tim Hortons wants your honest opinion on our new autumn menu items piloted at campus locations. Timbits included.',
    'Tim Hortons', 'seed_timhortons', 'active',
    '$10 Tim Hortons card',
    4, now() + interval '21 days', 600, 203, true,
    NULL,
    ARRAY['food', 'campus-life'],
    false, 'starter'
  ),
  (
    'Student Commuting & Sustainable Transportation',
    'Which transit options do students actually use? UBC Sustainability wants to improve how students get around the Point Grey campus.',
    'UBC Sustainability Initiative', 'seed_ubc', 'active',
    NULL,
    7, now() + interval '60 days', 800, 442, true,
    ARRAY['ubc'],
    ARRAY['sustainability', 'campus-life', 'research'],
    false, 'free'
  ),
  (
    'Co-op & Internship Experience Survey',
    'Deloitte Canada is researching what students value most in a co-op placement — mentorship, compensation, remote flexibility, or industry exposure.',
    'Deloitte Canada', 'seed_deloitte', 'active',
    '$15 Starbucks gift card',
    9, now() + interval '40 days', 400, 88, true,
    NULL,
    ARRAY['career', 'coop', 'professional-development'],
    true, 'professional'
  ),
  (
    'Technology & AI Tools in Education',
    'How are Canadian students using AI tools like ChatGPT, Copilot, and Grammarly? Google Canada wants to understand student adoption and concerns.',
    'Google Canada', 'seed_google', 'active',
    'Google One storage (3 months)',
    6, now() + interval '50 days', 700, 391, true,
    NULL,
    ARRAY['technology', 'ai', 'education'],
    true, 'enterprise'
  )
ON CONFLICT DO NOTHING;

-- ---- Questions for the RBC survey ----
-- We use a sub-select to get the inserted survey ID dynamically
INSERT INTO public.survey_questions
  (survey_id, question_text, question_type, options, is_required, sort_order)
SELECT s.id, q.question_text, q.question_type, q.options, q.is_required, q.sort_order
FROM public.surveys s
CROSS JOIN (VALUES
  ('How do you primarily manage your money?',    'multiple_choice', '["RBC mobile app","Another bank app","Spreadsheet","I don''t actively track"]'::jsonb, true, 0),
  ('Which banking features matter most to you?', 'checkbox',        '["No-fee chequing","High-interest savings","Student line of credit","Cashback","Investment tools","Tap-to-pay"]'::jsonb, false, 1),
  ('How would you rate your current bank?',      'rating',          NULL, true, 2),
  ('How likely are you to switch banks this year?', 'nps',          NULL, true, 3),
  ('Have you ever used a robo-advisor or ETF?',  'yes_no',          NULL, false, 4),
  ('What financial skill do you wish schools taught better?', 'long_text', NULL, false, 5)
) AS q(question_text, question_type, options, is_required, sort_order)
WHERE s.created_by = 'seed_rbc'
ON CONFLICT DO NOTHING;
