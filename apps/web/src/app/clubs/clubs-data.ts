export type ClubCategory =
  | 'Student Government'
  | 'Academic'
  | 'Cultural'
  | 'Sports'
  | 'Arts'
  | 'Tech'
  | 'Community'
  | 'Environment'
  | 'Politics'
  | 'Media'

export interface ClubEvent {
  title: string
  date: string
  location: string
}

export interface Club {
  id: string
  name: string
  universitySlug: string
  university: string
  category: ClubCategory
  members: number
  description: string
  founded?: number
  website?: string
  nextEvent?: string
  events: ClubEvent[]
}

export const UNIVERSITIES: { slug: string; name: string }[] = [
  { slug: 'ubc', name: 'University of British Columbia' },
  { slug: 'sfu', name: 'Simon Fraser University' },
  { slug: 'uvic', name: 'University of Victoria' },
  { slug: 'uoft', name: 'University of Toronto' },
  { slug: 'yorku', name: 'York University' },
  { slug: 'ryerson', name: 'Toronto Metropolitan University' },
  { slug: 'mcgill', name: 'McGill University' },
  { slug: 'concordia', name: 'Concordia University' },
  { slug: 'uottawa', name: 'University of Ottawa' },
  { slug: 'carleton', name: 'Carleton University' },
  { slug: 'waterloo', name: 'University of Waterloo' },
  { slug: 'western', name: 'Western University' },
  { slug: 'mcmaster', name: 'McMaster University' },
  { slug: 'queens', name: "Queen's University" },
  { slug: 'guelphu', name: 'University of Guelph' },
  { slug: 'laurier', name: 'Wilfrid Laurier University' },
  { slug: 'ucalgary', name: 'University of Calgary' },
  { slug: 'ualberta', name: 'University of Alberta' },
  { slug: 'dal', name: 'Dalhousie University' },
  { slug: 'mun', name: 'Memorial University of Newfoundland' },
  { slug: 'unb', name: 'University of New Brunswick' },
  { slug: 'ocadu', name: 'OCAD University' },
  { slug: 'bcit', name: 'British Columbia Institute of Technology' },
  { slug: 'seneca', name: 'Seneca Polytechnic' },
  { slug: 'humber', name: 'Humber Polytechnic' },
  { slug: 'georgebrown', name: 'George Brown College' },
  { slug: 'algonquin', name: 'Algonquin College' },
]

export const ALL_CATEGORIES: ClubCategory[] = [
  'Student Government',
  'Academic',
  'Cultural',
  'Sports',
  'Arts',
  'Tech',
  'Community',
  'Environment',
  'Politics',
  'Media',
]

export const CLUBS: Club[] = [
  // ── UBC ─────────────────────────────────────────────────────────────────
  {
    id: 'ubc-ams',
    name: 'Alma Mater Society (AMS)',
    universitySlug: 'ubc',
    university: 'University of British Columbia',
    category: 'Student Government',
    members: 55000,
    description:
      'The AMS is the student government for all undergraduates at UBC Vancouver, providing services, clubs support, and student advocacy since 1915.',
    founded: 1915,
    website: 'https://www.ams.ubc.ca',
    nextEvent: 'AMS General Meeting — Nov 5',
    events: [
      { title: 'AMS General Meeting', date: 'Nov 5, 2026', location: 'SUB Council Chambers' },
      { title: 'AMS Clubs Funding Workshop', date: 'Nov 19, 2026', location: 'SUB 206' },
    ],
  },
  {
    id: 'ubc-engineering-undergraduate-society',
    name: 'UBC Engineering Undergraduate Society',
    universitySlug: 'ubc',
    university: 'University of British Columbia',
    category: 'Student Government',
    members: 8200,
    description:
      'The EUS represents all undergraduate engineering students at UBC, running Engineering Week, formal dinners, and the annual career fair.',
    founded: 1915,
    website: 'https://www.ubcengineers.ca',
    nextEvent: 'Engineering Week Kickoff — Nov 10',
    events: [
      { title: 'Engineering Week Kickoff', date: 'Nov 10, 2026', location: 'Kaiser Building Atrium' },
      { title: 'Engineering Career Fair', date: 'Nov 25, 2026', location: 'Nest Building' },
    ],
  },
  {
    id: 'ubc-science-undergraduate-society',
    name: 'UBC Science Undergraduate Society',
    universitySlug: 'ubc',
    university: 'University of British Columbia',
    category: 'Academic',
    members: 12000,
    description:
      'The SUS represents over 12,000 science undergraduates at UBC, advocating for academic excellence and organising social, volunteer, and professional development events.',
    founded: 1918,
    website: 'https://sus.ubc.ca',
    nextEvent: 'SUS Fall Social — Nov 7',
    events: [
      { title: 'SUS Fall Social', date: 'Nov 7, 2026', location: 'SUB Atrium' },
      { title: 'Research Symposium', date: 'Dec 3, 2026', location: 'Wesbrook 100' },
    ],
  },
  {
    id: 'ubc-debate-club',
    name: 'UBC Debate Club',
    universitySlug: 'ubc',
    university: 'University of British Columbia',
    category: 'Academic',
    members: 280,
    description:
      'One of the oldest clubs at UBC, the Debate Club trains students in competitive parliamentary debate and hosts weekly practices and inter-university tournaments.',
    founded: 1919,
    website: 'https://ubcdebate.ca',
    nextEvent: 'Fall Open Tournament — Nov 14',
    events: [
      { title: 'Fall Open Tournament', date: 'Nov 14–15, 2026', location: 'Buchanan A Block' },
      { title: 'Weekly Practice', date: 'Every Tuesday 6 PM', location: 'Buchanan B310' },
    ],
  },
  {
    id: 'ubc-film-society',
    name: 'UBC Film Society',
    universitySlug: 'ubc',
    university: 'University of British Columbia',
    category: 'Arts',
    members: 420,
    description:
      'The UBC Film Society screens classic, indie, and contemporary films on campus, and runs student filmmaking workshops and a production fund.',
    founded: 1968,
    website: 'https://ubcfilmsociety.ca',
    nextEvent: 'Kubrick Retrospective Night — Nov 8',
    events: [
      { title: 'Kubrick Retrospective Night', date: 'Nov 8, 2026 7 PM', location: 'Norm Theatre' },
      { title: 'Student Film Showcase', date: 'Dec 6, 2026', location: 'Norm Theatre' },
    ],
  },
  {
    id: 'ubc-alpine-club',
    name: 'UBC Alpine Club',
    universitySlug: 'ubc',
    university: 'University of British Columbia',
    category: 'Sports',
    members: 600,
    description:
      'The UBC Alpine Club offers ski and snowboard trips, avalanche safety courses, and backcountry tours across BC mountains all winter long.',
    founded: 1936,
    website: 'https://ubcalpine.ca',
    nextEvent: 'Whistler Season Opener — Nov 28',
    events: [
      { title: 'Whistler Season Opener', date: 'Nov 28, 2026', location: 'Whistler Mountain' },
      { title: 'Avalanche Safety Course', date: 'Dec 12, 2026', location: 'UBC Nest Meeting Room' },
    ],
  },
  {
    id: 'ubc-sailing-club',
    name: 'UBC Sailing Club',
    universitySlug: 'ubc',
    university: 'University of British Columbia',
    category: 'Sports',
    members: 310,
    description:
      'Based at the UBC Sailing Centre on Jericho Beach, the club offers lessons, racing programs, and social sailing on English Bay for students of all skill levels.',
    founded: 1950,
    website: 'https://ubcsailing.ca',
    nextEvent: 'End of Season Regatta — Nov 1',
    events: [
      { title: 'End of Season Regatta', date: 'Nov 1, 2026', location: 'Jericho Beach Sailing Centre' },
      { title: 'Winter Social', date: 'Nov 22, 2026', location: 'Jericho Sailing Centre Clubhouse' },
    ],
  },
  {
    id: 'ubc-photography-club',
    name: 'UBC Photography Club',
    universitySlug: 'ubc',
    university: 'University of British Columbia',
    category: 'Arts',
    members: 195,
    description:
      'The UBC Photography Club hosts weekly photo walks, darkroom sessions, and an annual gallery exhibition showcasing student photography in every genre.',
    nextEvent: 'Photo Walk — Spanish Banks — Nov 9',
    events: [
      { title: 'Photo Walk — Spanish Banks', date: 'Nov 9, 2026 2 PM', location: 'Spanish Banks Parking Lot' },
      { title: 'Annual Gallery Exhibition', date: 'Dec 1, 2026', location: 'UBC Nest Gallery' },
    ],
  },
  {
    id: 'ubc-muslim-students-association',
    name: 'UBC Muslim Students Association',
    universitySlug: 'ubc',
    university: 'University of British Columbia',
    category: 'Cultural',
    members: 870,
    description:
      "The UBC MSA provides a welcoming community for Muslim students through weekly Jumu'ah prayers, halal food events, interfaith dialogues, and social gatherings.",
    founded: 1964,
    website: 'https://ubcmsa.ca',
    nextEvent: 'Halal Food Festival — Nov 6',
    events: [
      { title: 'Halal Food Festival', date: 'Nov 6, 2026 11 AM–3 PM', location: 'UBC Nest Plaza' },
      { title: 'Interfaith Dialogue Night', date: 'Nov 20, 2026', location: 'Irving K. Barber Centre' },
    ],
  },
  {
    id: 'ubc-indian-students-association',
    name: 'UBC Indian Students Association',
    universitySlug: 'ubc',
    university: 'University of British Columbia',
    category: 'Cultural',
    members: 540,
    description:
      'UBCISA celebrates South Asian culture through Diwali events, Holi celebrations, Bollywood nights, and mentorship programs for incoming students.',
    website: 'https://ubcisa.ca',
    nextEvent: 'Diwali Gala — Nov 15',
    events: [
      { title: 'Diwali Gala', date: 'Nov 15, 2026', location: 'UBC Nest Ballroom' },
      { title: 'Classical Dance Workshop', date: 'Dec 5, 2026', location: 'Swing Space Room 221' },
    ],
  },
  {
    id: 'ubc-cssa',
    name: 'UBC Chinese Students & Scholars Association',
    universitySlug: 'ubc',
    university: 'University of British Columbia',
    category: 'Cultural',
    members: 1200,
    description:
      'CSSA supports Chinese students and scholars at UBC through orientation services, cultural events including the Spring Festival Gala, and academic networking.',
    founded: 1985,
    website: 'https://ubccssa.ca',
    nextEvent: 'Autumn Moon Festival — Nov 3',
    events: [
      { title: 'Autumn Moon Festival', date: 'Nov 3, 2026', location: 'UBC Nest Ballroom' },
      { title: 'Spring Festival Gala Planning', date: 'Nov 17, 2026', location: 'UBC Nest 206' },
    ],
  },

  // ── University of Toronto ────────────────────────────────────────────────
  {
    id: 'uoft-utsu',
    name: 'University of Toronto Students Union (UTSU)',
    universitySlug: 'uoft',
    university: 'University of Toronto',
    category: 'Student Government',
    members: 66000,
    description:
      'UTSU is the student union representing over 66,000 undergraduates at UTSG, providing advocacy, services, health insurance, and clubs funding.',
    founded: 1902,
    website: 'https://www.utsu.ca',
    nextEvent: 'UTSU Town Hall — Nov 12',
    events: [
      { title: 'UTSU Town Hall', date: 'Nov 12, 2026', location: 'Sidney Smith Hall 1073' },
      { title: 'Student Leadership Summit', date: 'Nov 26, 2026', location: 'University College' },
    ],
  },
  {
    id: 'uoft-engsoc',
    name: 'Engineering Society (EngSoc)',
    universitySlug: 'uoft',
    university: 'University of Toronto',
    category: 'Student Government',
    members: 6500,
    description:
      "EngSoc is the student society for U of T's Faculty of Applied Science and Engineering, organising Godiva Week, career fairs, and the Iron Ring ceremony.",
    founded: 1885,
    website: 'https://engsoc.skule.ca',
    nextEvent: 'Cannon Guard Event — Nov 4',
    events: [
      { title: 'Cannon Guard Event', date: 'Nov 4, 2026', location: 'Engineering Quad' },
      { title: 'Iron Ring Ceremony', date: 'Nov 22, 2026', location: 'Convocation Hall' },
    ],
  },
  {
    id: 'uoft-uc-debating-union',
    name: 'UC Debating Union',
    universitySlug: 'uoft',
    university: 'University of Toronto',
    category: 'Academic',
    members: 190,
    description:
      'The University College Debating Union is one of the oldest debating societies in North America, competing nationally and internationally in parliamentary debate.',
    founded: 1854,
    website: 'https://ucdebating.ca',
    nextEvent: 'Competitive Training Session — Nov 4',
    events: [
      { title: 'Competitive Training Session', date: 'Nov 4, 2026 7 PM', location: 'University College 179' },
      { title: 'Hart House Invitational', date: 'Nov 21–22, 2026', location: 'Hart House' },
    ],
  },
  {
    id: 'uoft-hart-house',
    name: 'Hart House',
    universitySlug: 'uoft',
    university: 'University of Toronto',
    category: 'Community',
    members: 9500,
    description:
      "Hart House is U of T's historic cultural and recreational centre, offering art, music, debates, fitness, and community programming to students, staff, and alumni.",
    founded: 1919,
    website: 'https://harthouse.ca',
    nextEvent: 'Hart House Debates — Nov 13',
    events: [
      { title: 'Hart House Debates', date: 'Nov 13, 2026 7 PM', location: 'Hart House Debates Room' },
      { title: 'Winter Art Exhibition Opening', date: 'Dec 4, 2026', location: 'Hart House Art Gallery' },
    ],
  },
  {
    id: 'uoft-victoria-usac',
    name: 'Victoria University Students Administrative Council',
    universitySlug: 'uoft',
    university: 'University of Toronto',
    category: 'Student Government',
    members: 4200,
    description:
      'VUSAC is the student government for Victoria University students, running Victoria College events, clubs, and student services on the St. George campus.',
    founded: 1912,
    website: 'https://vusac.ca',
    nextEvent: 'Vic Formals — Nov 19',
    events: [
      { title: 'Vic Formals', date: 'Nov 19, 2026 6 PM', location: 'Old Vic Common Room' },
      { title: 'VUSAC Council Meeting', date: 'Nov 3, 2026', location: 'Victoria College 215' },
    ],
  },
  {
    id: 'uoft-film-society',
    name: 'U of T Film Society',
    universitySlug: 'uoft',
    university: 'University of Toronto',
    category: 'Arts',
    members: 350,
    description:
      'The U of T Film Society screens independent and art-house films on campus and hosts director Q&As, student film showcases, and filmmaker workshops throughout the year.',
    founded: 1948,
    website: 'https://uoftfilmsociety.ca',
    nextEvent: 'French New Wave Screening — Nov 7',
    events: [
      { title: 'French New Wave Screening', date: 'Nov 7, 2026 7 PM', location: 'Innis Town Hall' },
      { title: 'Student Shorts Festival', date: 'Dec 5, 2026', location: 'Innis Town Hall' },
    ],
  },
  {
    id: 'uoft-essu',
    name: 'Engineering Science Students Union (ESSU)',
    universitySlug: 'uoft',
    university: 'University of Toronto',
    category: 'Student Government',
    members: 1100,
    description:
      "ESSU represents Engineering Science students at U of T, organising EngSci-specific events, academic support sessions, and the famous EngSci Banquet.",
    founded: 1957,
    website: 'https://essu.skule.ca',
    nextEvent: 'EngSci Banquet — Nov 29',
    events: [
      { title: 'EngSci Banquet', date: 'Nov 29, 2026', location: 'U of T Faculty Club' },
      { title: 'Fall Academic Mixer', date: 'Nov 6, 2026', location: 'Engineering Building Atrium' },
    ],
  },
  {
    id: 'uoft-trinity-literary-institute',
    name: 'Trinity College Literary Institute',
    universitySlug: 'uoft',
    university: 'University of Toronto',
    category: 'Academic',
    members: 380,
    description:
      "One of Canada's oldest debating and intellectual societies, the Trinity Literary Institute hosts weekly debates, guest lectures, and the annual Address Dinner.",
    founded: 1852,
    website: 'https://trinitycollegeutoronto.ca',
    nextEvent: 'Weekly Debate — Nov 6',
    events: [
      { title: 'Weekly Debate', date: 'Nov 6, 2026 8 PM', location: 'Trinity College Strachan Hall' },
      { title: 'Annual Address Dinner', date: 'Nov 27, 2026', location: 'Strachan Hall' },
    ],
  },
  {
    id: 'uoft-skule-nite',
    name: 'Skule Nite',
    universitySlug: 'uoft',
    university: 'University of Toronto',
    category: 'Arts',
    members: 150,
    description:
      "Skule Nite is U of T Engineering's annual comedy variety show, entirely written, directed, and performed by engineering students. Running continuously since 1927.",
    founded: 1927,
    website: 'https://skulenite.skule.ca',
    nextEvent: 'Auditions — Nov 2',
    events: [
      { title: 'Auditions', date: 'Nov 2, 2026 6 PM', location: 'Engineering Atrium' },
      { title: 'Skule Nite 2027 Performances', date: 'Jan 30, 2027', location: 'Isabel Bader Theatre' },
    ],
  },

  // ── McGill ───────────────────────────────────────────────────────────────
  {
    id: 'mcgill-ssmu',
    name: 'Students Society of McGill University (SSMU)',
    universitySlug: 'mcgill',
    university: 'McGill University',
    category: 'Student Government',
    members: 24000,
    description:
      'SSMU is the official undergraduate student government at McGill, providing clubs support, advocacy, health and wellness services, and campus-wide events.',
    founded: 1908,
    website: 'https://ssmu.ca',
    nextEvent: 'SSMU Council Meeting — Nov 5',
    events: [
      { title: 'SSMU Council Meeting', date: 'Nov 5, 2026', location: 'Shatner Building Council Chambers' },
      { title: 'Clubs & Services Fair', date: 'Nov 18, 2026', location: 'SSMU Ballroom' },
    ],
  },
  {
    id: 'mcgill-dps',
    name: 'McGill Debating Union (DPS)',
    universitySlug: 'mcgill',
    university: 'McGill University',
    category: 'Academic',
    members: 230,
    description:
      'The Debating and Public Speaking Society is one of the oldest clubs at McGill, competing nationally and internationally with weekly practice debates in English and French.',
    founded: 1905,
    website: 'https://mcgilldebating.com',
    nextEvent: 'McGill Open Tournament — Nov 14',
    events: [
      { title: 'McGill Open Tournament', date: 'Nov 14–15, 2026', location: 'Leacock Building' },
      { title: 'Weekly Practice', date: 'Every Wednesday 7 PM', location: 'Leacock 14' },
    ],
  },
  {
    id: 'mcgill-eus',
    name: 'Engineering Undergraduate Society (EUS)',
    universitySlug: 'mcgill',
    university: 'McGill University',
    category: 'Student Government',
    members: 5200,
    description:
      'The EUS represents undergraduate engineering students at McGill, organising E-Week, the Engineering Games, academic support, and the annual EUS Ball.',
    founded: 1913,
    website: 'https://eusmc.ca',
    nextEvent: 'E-Week Opening Ceremony — Nov 16',
    events: [
      { title: 'E-Week Opening Ceremony', date: 'Nov 16, 2026', location: 'McConnell Engineering Building' },
      { title: 'EUS Ball', date: 'Nov 29, 2026', location: 'Hilton Bonaventure Hotel, Montreal' },
    ],
  },
  {
    id: 'mcgill-tribune',
    name: 'McGill Tribune',
    universitySlug: 'mcgill',
    university: 'McGill University',
    category: 'Media',
    members: 165,
    description:
      'The McGill Tribune is a student-run biweekly newspaper covering campus news, arts, science, and opinion, published since 1980 in print and online.',
    founded: 1980,
    website: 'https://www.mcgilltribune.com',
    nextEvent: 'Editorial Meeting — Nov 4',
    events: [
      { title: 'Editorial Meeting', date: 'Nov 4, 2026 6 PM', location: 'Tribune Office, Shatner B-19' },
      { title: 'Spring Recruitment Fair', date: 'Nov 18, 2026', location: 'Shatner Building Atrium' },
    ],
  },
  {
    id: 'mcgill-daily',
    name: 'The McGill Daily',
    universitySlug: 'mcgill',
    university: 'McGill University',
    category: 'Media',
    members: 140,
    description:
      "Founded in 1911, The McGill Daily is one of Canada's oldest student newspapers, publishing twice weekly with a focus on investigative journalism and social justice.",
    founded: 1911,
    website: 'https://www.mcgilldaily.com',
    nextEvent: 'Editorial Training — Nov 3',
    events: [
      { title: 'Editorial Training', date: 'Nov 3, 2026 5 PM', location: 'Daily Office, Shatner B-26' },
      { title: 'End of Semester Gala', date: 'Dec 4, 2026', location: 'Montreal venue TBC' },
    ],
  },
  {
    id: 'mcgill-international-students-network',
    name: 'McGill International Students Network',
    universitySlug: 'mcgill',
    university: 'McGill University',
    category: 'Cultural',
    members: 1600,
    description:
      'MISN connects international students at McGill through cultural events, an orientation buddy program, language exchanges, and social outings across Montreal.',
    website: 'https://misn.ca',
    nextEvent: 'Cultural Fusion Night — Nov 8',
    events: [
      { title: 'Cultural Fusion Night', date: 'Nov 8, 2026 6 PM', location: 'Shatner Ballroom' },
      { title: 'Montreal City Exploration', date: 'Nov 22, 2026', location: 'Meeting at Sherbrooke Metro' },
    ],
  },
  {
    id: 'mcgill-philosophy-students-association',
    name: 'McGill Philosophy Students Association',
    universitySlug: 'mcgill',
    university: 'McGill University',
    category: 'Academic',
    members: 210,
    description:
      'The PSA hosts philosophy talks, reading groups, discussion panels, and the annual Trent Symposium for undergraduate philosophy students across Quebec.',
    founded: 1970,
    nextEvent: 'Consciousness Colloquium — Nov 11',
    events: [
      { title: 'Consciousness Colloquium', date: 'Nov 11, 2026 7 PM', location: 'Leacock 927' },
      { title: "Reading Group: Rawls' Theory of Justice", date: 'Nov 25, 2026 5 PM', location: 'Leacock 419' },
    ],
  },
  {
    id: 'mcgill-music-undergraduate-association',
    name: 'McGill Music Undergraduate Association',
    universitySlug: 'mcgill',
    university: 'McGill University',
    category: 'Arts',
    members: 380,
    description:
      'The MUA represents music undergraduates at the Schulich School of Music, organising recitals, festivals, academic panels, and student ensemble showcases.',
    founded: 1923,
    website: 'https://mcgillmua.ca',
    nextEvent: 'Fall Recital Series — Nov 10',
    events: [
      { title: 'Fall Recital Series', date: 'Nov 10, 2026 7:30 PM', location: 'Pollack Concert Hall' },
      { title: 'MUA Mixer', date: 'Nov 17, 2026', location: 'Schulich School Lounge' },
    ],
  },

  // ── University of Waterloo ───────────────────────────────────────────────
  {
    id: 'waterloo-feds',
    name: 'Federation of Students (Feds)',
    universitySlug: 'waterloo',
    university: 'University of Waterloo',
    category: 'Student Government',
    members: 38000,
    description:
      'Feds is the official undergraduate student government at UWaterloo, running student services, the SLC, campus events, and clubs administration.',
    founded: 1967,
    website: 'https://wusa.ca',
    nextEvent: 'Feds Council Meeting — Nov 6',
    events: [
      { title: 'Feds Council Meeting', date: 'Nov 6, 2026', location: 'Student Life Centre' },
      { title: 'Clubs Day', date: 'Nov 20, 2026', location: 'SLC Great Hall' },
    ],
  },
  {
    id: 'waterloo-engsoc',
    name: 'Engineering Society (EngSoc)',
    universitySlug: 'waterloo',
    university: 'University of Waterloo',
    category: 'Student Government',
    members: 10000,
    description:
      'EngSoc represents Waterloo Engineering students, organising Orientation, WEEF funding, the Iron Warrior newspaper, and faculty-wide events throughout the academic year.',
    founded: 1963,
    website: 'https://engsoc.uwaterloo.ca',
    nextEvent: 'Iron Ring Ceremony — Nov 21',
    events: [
      { title: 'Iron Ring Ceremony', date: 'Nov 21, 2026', location: 'Engineering 5 Atrium' },
      { title: 'EngSoc Games Night', date: 'Nov 7, 2026', location: 'CPH 3607' },
    ],
  },
  {
    id: 'waterloo-mathsoc',
    name: 'Mathematics Society (MathSoc)',
    universitySlug: 'waterloo',
    university: 'University of Waterloo',
    category: 'Academic',
    members: 9000,
    description:
      'MathSoc is the student society for Math faculty students at UWaterloo, providing the tutorial centre, Pi Day celebrations, math competitions, and social events.',
    founded: 1967,
    website: 'https://mathsoc.uwaterloo.ca',
    nextEvent: 'Midterm Study Jam — Nov 3',
    events: [
      { title: 'Midterm Study Jam', date: 'Nov 3, 2026 6 PM', location: 'MC 2035' },
      { title: 'Pi Day Fundraiser Planning', date: 'Nov 17, 2026', location: 'Math 3 Lounge' },
    ],
  },
  {
    id: 'waterloo-csc',
    name: 'Computer Science Club (CSC)',
    universitySlug: 'waterloo',
    university: 'University of Waterloo',
    category: 'Tech',
    members: 2100,
    description:
      'The CSC is a hub for CS and tech enthusiasts at UWaterloo, running industry talks, hackathons, competitive programming sessions, and the popular CS Coffee & Code.',
    founded: 1978,
    website: 'https://csclub.uwaterloo.ca',
    nextEvent: 'Google Engineers Talk — Nov 9',
    events: [
      { title: 'Google Engineers Talk', date: 'Nov 9, 2026 5 PM', location: 'MC 2054' },
      { title: 'Fall Hackathon', date: 'Nov 22–23, 2026', location: 'Engineering 5 & 7' },
    ],
  },
  {
    id: 'waterloo-data-science-club',
    name: 'Waterloo Data Science Club',
    universitySlug: 'waterloo',
    university: 'University of Waterloo',
    category: 'Tech',
    members: 760,
    description:
      'The Waterloo Data Science Club connects students passionate about ML, AI, and data analysis through workshops, Kaggle teams, and industry speaker events.',
    website: 'https://uwdatascience.ca',
    nextEvent: 'ML Workshop: Transformers — Nov 5',
    events: [
      { title: 'ML Workshop: Transformers', date: 'Nov 5, 2026 6 PM', location: 'QNC 1501' },
      { title: 'Data Science Case Competition', date: 'Nov 27, 2026', location: 'Engineering 5' },
    ],
  },
  {
    id: 'waterloo-science-society',
    name: 'Science Society',
    universitySlug: 'waterloo',
    university: 'University of Waterloo',
    category: 'Academic',
    members: 5500,
    description:
      'The UWaterloo Science Society represents science faculty undergrads, coordinating academic resources, social events, and the annual Science Olympics competition.',
    founded: 1970,
    website: 'https://sciencesociety.uwaterloo.ca',
    nextEvent: 'Science Olympics — Nov 15',
    events: [
      { title: 'Science Olympics', date: 'Nov 15, 2026', location: 'Biology Building' },
      { title: 'Science Formal', date: 'Nov 28, 2026', location: 'Delta Hotel Waterloo' },
    ],
  },
  {
    id: 'waterloo-arts-student-union',
    name: 'Arts Student Union',
    universitySlug: 'waterloo',
    university: 'University of Waterloo',
    category: 'Student Government',
    members: 4800,
    description:
      'The ASU is the student government for UWaterloo Arts faculty students, hosting film nights, lecture series, and the annual Arts Formal.',
    founded: 1972,
    website: 'https://asuonline.ca',
    nextEvent: 'Arts Faculty Mixer — Nov 12',
    events: [
      { title: 'Arts Faculty Mixer', date: 'Nov 12, 2026 5 PM', location: 'Hagey Hall Foyer' },
      { title: 'Arts Formal', date: 'Nov 28, 2026', location: 'UW Grad House' },
    ],
  },
  {
    id: 'waterloo-midnight-sun',
    name: 'Midnight Sun Solar Car Team',
    universitySlug: 'waterloo',
    university: 'University of Waterloo',
    category: 'Tech',
    members: 420,
    description:
      'One of the top solar vehicle teams in North America, Midnight Sun designs, builds, and races solar-powered cars in the Bridgestone World Solar Challenge in Australia.',
    founded: 1988,
    website: 'https://uwmidsun.com',
    nextEvent: 'Car Testing Day — Nov 8',
    events: [
      { title: 'Car Testing Day', date: 'Nov 8, 2026', location: 'Engineering Parking Lot C' },
      { title: 'Technical Review', date: 'Nov 22, 2026', location: 'E5 Design Lab' },
    ],
  },

  // ── Western University ───────────────────────────────────────────────────
  {
    id: 'western-usc',
    name: 'University Students Council (USC)',
    universitySlug: 'western',
    university: 'Western University',
    category: 'Student Government',
    members: 32000,
    description:
      "The USC is Western's undergraduate student government, delivering student services, clubs funding, health & dental coverage, and major campus events including Homecoming.",
    founded: 1921,
    website: 'https://westernusc.ca',
    nextEvent: 'USC Council Meeting — Nov 4',
    events: [
      { title: 'USC Council Meeting', date: 'Nov 4, 2026', location: 'UCC 300A' },
      { title: 'Western Winter Wonderland', date: 'Dec 5, 2026', location: 'UCC Atrium' },
    ],
  },
  {
    id: 'western-engineering-society',
    name: 'Western Engineering Society',
    universitySlug: 'western',
    university: 'Western University',
    category: 'Student Government',
    members: 5200,
    description:
      "WES represents engineering undergraduates at Western, running Engineering Frosh Week, the Engineering Student Centre, and the annual Engineer's Ball.",
    founded: 1920,
    website: 'https://westernengineering.ca',
    nextEvent: 'Engineers Without Borders Info Night — Nov 11',
    events: [
      { title: 'Engineers Without Borders Info Night', date: 'Nov 11, 2026 6 PM', location: 'SEB 1200' },
      { title: "Engineer's Ball", date: 'Nov 28, 2026', location: 'London Convention Centre' },
    ],
  },
  {
    id: 'western-debate-society',
    name: 'Western Debate Society',
    universitySlug: 'western',
    university: 'Western University',
    category: 'Academic',
    members: 230,
    description:
      'The Western Debate Society competes in parliamentary debate across North America and runs workshops on public speaking and argumentation open to all students.',
    founded: 1970,
    website: 'https://westerndebate.ca',
    nextEvent: 'Western Fall Open — Nov 14',
    events: [
      { title: 'Western Fall Open', date: 'Nov 14–15, 2026', location: 'University Community Centre' },
      { title: 'Skills Workshop', date: 'Nov 5, 2026 7 PM', location: 'SSC 4210' },
    ],
  },
  {
    id: 'western-film-society',
    name: 'Western Film Society',
    universitySlug: 'western',
    university: 'Western University',
    category: 'Arts',
    members: 310,
    description:
      'The Western Film Society screens art house, international, and cult classics on campus, and hosts the annual Reel Diversity Film Festival celebrating global cinema.',
    founded: 1969,
    website: 'https://westernfilm.ca',
    nextEvent: 'Bergman Retrospective — Nov 6',
    events: [
      { title: 'Bergman Retrospective', date: 'Nov 6, 2026 7 PM', location: 'UCC Theatres' },
      { title: 'Student Director Showcase', date: 'Nov 27, 2026', location: 'Arts and Humanities Building' },
    ],
  },
  {
    id: 'western-mustangs-fan-club',
    name: 'Western Mustangs Fan Club',
    universitySlug: 'western',
    university: 'Western University',
    category: 'Sports',
    members: 3800,
    description:
      'The Western Mustangs Fan Club organises student attendance at varsity games, pre-game tailgates, spirit events, and travel to away games for football, basketball, and hockey.',
    nextEvent: 'Homecoming Football Tailgate — Nov 1',
    events: [
      { title: 'Homecoming Football Tailgate', date: 'Nov 1, 2026 12 PM', location: 'Alumni Field Lot' },
      { title: 'Basketball Spirit Night', date: 'Nov 19, 2026', location: 'Alumni Hall' },
    ],
  },
  {
    id: 'western-medical-science-society',
    name: 'Western Medical Science Society',
    universitySlug: 'western',
    university: 'Western University',
    category: 'Academic',
    members: 1800,
    description:
      'The WMSS supports pre-med students at Western with MCAT prep resources, medical school application workshops, shadowing opportunities, and healthcare volunteer placements.',
    nextEvent: 'MCAT Strategy Workshop — Nov 9',
    events: [
      { title: 'MCAT Strategy Workshop', date: 'Nov 9, 2026 5 PM', location: 'MSB 384' },
      { title: 'Med School Application Panel', date: 'Nov 23, 2026 6 PM', location: 'Kresge Building' },
    ],
  },
  {
    id: 'western-psychology-students-association',
    name: 'Psychology Students Association',
    universitySlug: 'western',
    university: 'Western University',
    category: 'Academic',
    members: 1400,
    description:
      'PSA connects psychology students at Western through research nights, mental health awareness events, professor panels, and a peer mentorship program for first-year students.',
    nextEvent: 'Research Night — Nov 17',
    events: [
      { title: 'Research Night', date: 'Nov 17, 2026 5:30 PM', location: 'Westminster Hall' },
      { title: 'Mental Health Awareness Week', date: 'Nov 3, 2026', location: 'UCC Atrium' },
    ],
  },

  // ── McMaster University ──────────────────────────────────────────────────
  {
    id: 'mcmaster-msu',
    name: 'McMaster Students Union (MSU)',
    universitySlug: 'mcmaster',
    university: 'McMaster University',
    category: 'Student Government',
    members: 23000,
    description:
      "The MSU is McMaster's undergraduate student government, operating the MUSC student centre, clubs administration, health insurance, and university advocacy.",
    founded: 1918,
    website: 'https://msumcmaster.ca',
    nextEvent: 'MSU Board Meeting — Nov 4',
    events: [
      { title: 'MSU Board Meeting', date: 'Nov 4, 2026', location: 'MUSC 201' },
      { title: 'Clubs and Societies Fair', date: 'Nov 19, 2026', location: 'MUSC Great Hall' },
    ],
  },
  {
    id: 'mcmaster-engsoc',
    name: 'Engineering Society (EngSoc)',
    universitySlug: 'mcmaster',
    university: 'McMaster University',
    category: 'Student Government',
    members: 7800,
    description:
      "McMaster EngSoc is the student society for all engineering undergrads, running Engineering Orientation, the Iron Ring ceremony, career fairs, and the annual Eng Ball.",
    founded: 1917,
    website: 'https://macengsociety.ca',
    nextEvent: 'EngSoc Formal — Nov 22',
    events: [
      { title: 'EngSoc Formal', date: 'Nov 22, 2026', location: 'Hamilton Convention Centre' },
      { title: 'Design Team Showcase', date: 'Nov 8, 2026', location: 'CIBC Hall' },
    ],
  },
  {
    id: 'mcmaster-debate-society',
    name: 'McMaster Debate Society',
    universitySlug: 'mcmaster',
    university: 'McMaster University',
    category: 'Academic',
    members: 175,
    description:
      "McMaster's competitive debate team competes nationally in Canadian university circuits and runs weekly workshops plus an annual open tournament hosted on campus.",
    nextEvent: 'McMaster Open — Nov 13',
    events: [
      { title: 'McMaster Open', date: 'Nov 13–14, 2026', location: 'University Hall' },
      { title: 'Public Speaking Boot Camp', date: 'Nov 6, 2026 6 PM', location: 'Togo Salmon Hall 117' },
    ],
  },
  {
    id: 'mcmaster-silhouette',
    name: 'The Silhouette',
    universitySlug: 'mcmaster',
    university: 'McMaster University',
    category: 'Media',
    members: 120,
    description:
      "The Silhouette is McMaster's independent student newspaper, published weekly since 1930, covering campus news, investigations, sports, arts, and student life.",
    founded: 1930,
    website: 'https://www.thesil.ca',
    nextEvent: 'Weekly Meeting — Nov 3',
    events: [
      { title: 'Weekly Editorial Meeting', date: 'Nov 3, 2026 5 PM', location: 'MUSC 225' },
      { title: 'Photography Workshop', date: 'Nov 10, 2026', location: 'MUSC 225' },
    ],
  },
  {
    id: 'mcmaster-international-student-society',
    name: 'McMaster International Student Society',
    universitySlug: 'mcmaster',
    university: 'McMaster University',
    category: 'Cultural',
    members: 1900,
    description:
      'MISS supports international students at McMaster through cultural festivals, an airport pickup program, language partner exchange, and social and networking events.',
    website: 'https://missmcmaster.ca',
    nextEvent: 'International Cultural Night — Nov 15',
    events: [
      { title: 'International Cultural Night', date: 'Nov 15, 2026 5 PM', location: 'MUSC Great Hall' },
      { title: 'Language Exchange Mixer', date: 'Nov 29, 2026', location: 'MUSC Atrium' },
    ],
  },
  {
    id: 'mcmaster-macengineers',
    name: 'MacEngineers',
    universitySlug: 'mcmaster',
    university: 'McMaster University',
    category: 'Tech',
    members: 840,
    description:
      "MacEngineers is McMaster's tech-focused club for engineering innovators, running design sprints, robotics showcases, hackathons, and industry partnership events.",
    nextEvent: 'MacHacks Hackathon — Nov 22',
    events: [
      { title: 'MacHacks Hackathon', date: 'Nov 22–23, 2026', location: 'CIBC Hall' },
      { title: 'Industry Tech Talk: Shopify', date: 'Nov 8, 2026', location: 'JHE 264' },
    ],
  },
  {
    id: 'mcmaster-science-society',
    name: 'Science Society',
    universitySlug: 'mcmaster',
    university: 'McMaster University',
    category: 'Academic',
    members: 4500,
    description:
      "The McMaster Science Society represents science faculty undergraduates, providing academic support, socials, research networking nights, and science-focused career fairs.",
    founded: 1957,
    website: 'https://sciencesociety.mcmaster.ca',
    nextEvent: 'Science Formal — Nov 29',
    events: [
      { title: 'Science Formal', date: 'Nov 29, 2026', location: 'Liuna Station Hamilton' },
      { title: 'Research Fair', date: 'Nov 13, 2026', location: 'Burke Science Building' },
    ],
  },

  // ── Queen's University ───────────────────────────────────────────────────
  {
    id: 'queens-ams',
    name: 'Alma Mater Society (AMS)',
    universitySlug: 'queens',
    university: "Queen's University",
    category: 'Student Government',
    members: 24000,
    description:
      "The AMS is Queen's student government, one of the oldest in North America, delivering student services, clubs support, health & dental, and the iconic Orientation Week.",
    founded: 1858,
    website: 'https://myams.org',
    nextEvent: 'AMS Assembly — Nov 5',
    events: [
      { title: 'AMS Assembly', date: 'Nov 5, 2026', location: 'AMS Council Chambers, JDUC' },
      { title: 'Winter Carnival Planning Night', date: 'Nov 19, 2026', location: 'JDUC Ballroom' },
    ],
  },
  {
    id: 'queens-engsoc',
    name: 'Engineering Society (EngSoc)',
    universitySlug: 'queens',
    university: "Queen's University",
    category: 'Student Government',
    members: 5000,
    description:
      "Queen's EngSoc runs the Engineering Frosh Week, formal dinner series, the charity Bed Race, and provides academic and professional development resources for engineering students.",
    founded: 1908,
    website: 'https://engsoc.queensu.ca',
    nextEvent: 'EngSoc Formal Dinner — Nov 20',
    events: [
      { title: 'EngSoc Formal Dinner', date: 'Nov 20, 2026', location: 'Ban Righ Hall' },
      { title: 'Charity Bed Race', date: 'Nov 12, 2026', location: 'University Ave' },
    ],
  },
  {
    id: 'queens-asus',
    name: 'Arts and Science Undergraduate Society (ASUS)',
    universitySlug: 'queens',
    university: "Queen's University",
    category: 'Student Government',
    members: 12000,
    description:
      "ASUS represents Arts and Science students at Queen's, running the faculty Orientation Week, Tricolour Weekend, and academic resource programs.",
    founded: 1924,
    website: 'https://asusqueens.ca',
    nextEvent: 'Tricolour Weekend Study Break — Nov 7',
    events: [
      { title: 'Tricolour Weekend Study Break', date: 'Nov 7, 2026', location: 'John Deutsch University Centre' },
      { title: 'ASUS Council Meeting', date: 'Nov 14, 2026', location: 'ASUS Office, JDUC 242' },
    ],
  },
  {
    id: 'queens-debating-union',
    name: "Queen's Debating Union",
    universitySlug: 'queens',
    university: "Queen's University",
    category: 'Academic',
    members: 210,
    description:
      "Queen's Debating Union is one of Canada's premier debate societies, fielding competitive teams nationally and hosting the annual Queen's Invitational Tournament.",
    founded: 1877,
    website: 'https://queensdebating.ca',
    nextEvent: "Queen's Invitational Tournament — Nov 14",
    events: [
      { title: "Queen's Invitational Tournament", date: 'Nov 14–15, 2026', location: 'Theological Hall' },
      { title: 'Weekly Practice', date: 'Every Thursday 6 PM', location: 'Theological Hall' },
    ],
  },
  {
    id: 'queens-journal',
    name: "Queen's Journal",
    universitySlug: 'queens',
    university: "Queen's University",
    category: 'Media',
    members: 140,
    description:
      "Canada's oldest continuously published student newspaper, founded in 1873. The Journal covers Queen's campus, Kingston, and national student news in print and digital.",
    founded: 1873,
    website: 'https://queensjournal.ca',
    nextEvent: 'Writers Meeting — Nov 3',
    events: [
      { title: 'Writers Meeting', date: 'Nov 3, 2026 5 PM', location: 'Journal Office, JDUC 149' },
      { title: 'Photography Masterclass', date: 'Nov 10, 2026', location: 'JDUC 149' },
    ],
  },
  {
    id: 'queens-film-and-media',
    name: "Queen's Film and Media",
    universitySlug: 'queens',
    university: "Queen's University",
    category: 'Arts',
    members: 270,
    description:
      "Queen's Film and Media screens films, hosts scriptwriting workshops, and showcases student short films at its annual Film Festival.",
    nextEvent: 'Documentary Screening Night — Nov 6',
    events: [
      { title: 'Documentary Screening Night', date: 'Nov 6, 2026 7 PM', location: 'Stirling Hall Theatre' },
      { title: 'Student Film Festival', date: 'Dec 4, 2026', location: 'Isabel Bader Centre' },
    ],
  },
  {
    id: 'queens-model-united-nations',
    name: "Queen's Model United Nations",
    universitySlug: 'queens',
    university: "Queen's University",
    category: 'Politics',
    members: 320,
    description:
      "QMUN is one of Canada's largest MUN teams, competing internationally and hosting the annual Queen's Model United Nations Conference each spring.",
    founded: 1993,
    website: 'https://qmun.ca',
    nextEvent: 'QMUN Fall Training Day — Nov 5',
    events: [
      { title: 'QMUN Fall Training Day', date: 'Nov 5, 2026', location: 'Dunning Hall' },
      { title: 'Harvard HMUN Preparation', date: 'Nov 18, 2026 6 PM', location: 'Political Studies Lounge' },
    ],
  },

  // ── University of Calgary ────────────────────────────────────────────────
  {
    id: 'ucalgary-students-union',
    name: "Students' Union (SU)",
    universitySlug: 'ucalgary',
    university: 'University of Calgary',
    category: 'Student Government',
    members: 31000,
    description:
      "The UCalgary SU is the student government for undergraduates, running campus services, clubs support, the Dinos Loyalty Program, and advocacy to UCalgary administration.",
    founded: 1966,
    website: 'https://su.ucalgary.ca',
    nextEvent: 'SU Council Meeting — Nov 3',
    events: [
      { title: 'SU Council Meeting', date: 'Nov 3, 2026', location: 'MacEwan Student Centre 368' },
      { title: 'Fall Clubs Day', date: 'Nov 17, 2026', location: 'MacEwan Student Centre' },
    ],
  },
  {
    id: 'ucalgary-engineering-students-society',
    name: 'Engineering Students Society',
    universitySlug: 'ucalgary',
    university: 'University of Calgary',
    category: 'Student Government',
    members: 6300,
    description:
      "The UCalgary ESS represents all engineering undergrads and runs Frosh Week, the Iron Ring ceremony, Schulich Engineering Outreach, and the annual Engineers Ball.",
    founded: 1953,
    website: 'https://ess.ucalgary.ca',
    nextEvent: 'Engineers Ball — Nov 22',
    events: [
      { title: 'Engineers Ball', date: 'Nov 22, 2026', location: 'Hotel Arts Calgary' },
      { title: 'Engineering Expo', date: 'Nov 8, 2026', location: 'ICT Building Atrium' },
    ],
  },
  {
    id: 'ucalgary-debate-club',
    name: 'UCalgary Debate Club',
    universitySlug: 'ucalgary',
    university: 'University of Calgary',
    category: 'Academic',
    members: 145,
    description:
      'The UCalgary Debate Club trains students in competitive parliamentary debate, competing at regional and national tournaments and hosting inter-department debates on campus.',
    nextEvent: 'Debate Practice — Nov 4',
    events: [
      { title: 'Debate Practice', date: 'Nov 4, 2026 7 PM', location: 'MacEwan Student Centre 206' },
      { title: 'Calgary Invitational', date: 'Nov 21–22, 2026', location: 'Social Sciences Building' },
    ],
  },
  {
    id: 'ucalgary-science-students-association',
    name: 'Science Students Association',
    universitySlug: 'ucalgary',
    university: 'University of Calgary',
    category: 'Academic',
    members: 5800,
    description:
      'The SSA represents science undergrads at UCalgary, running the annual SciPalooza event, tutoring services, research symposiums, and a competitive scholarship program.',
    founded: 1965,
    nextEvent: 'SciPalooza — Nov 18',
    events: [
      { title: 'SciPalooza Science Social', date: 'Nov 18, 2026', location: 'MacEwan Student Centre Ballroom' },
      { title: 'Research Symposium', date: 'Dec 3, 2026', location: 'Science Theatres' },
    ],
  },
  {
    id: 'ucalgary-dinos-athletics-club',
    name: 'Dinos Athletics Club',
    universitySlug: 'ucalgary',
    university: 'University of Calgary',
    category: 'Sports',
    members: 2100,
    description:
      'The Dinos Athletics Club organises student attendance, spirit events, and volunteer opportunities at UCalgary Dinos varsity games across football, hockey, basketball, and swimming.',
    nextEvent: 'Dinos vs. UAlberta Hockey — Nov 7',
    events: [
      { title: 'Dinos vs. UAlberta Hockey', date: 'Nov 7, 2026 7 PM', location: 'Father David Bauer Arena' },
      { title: 'Dinos Football Playoffs', date: 'Nov 14, 2026', location: 'McMahon Stadium' },
    ],
  },
  {
    id: 'ucalgary-business-students-association',
    name: 'Business Students Association',
    universitySlug: 'ucalgary',
    university: 'University of Calgary',
    category: 'Academic',
    members: 3500,
    description:
      'The Haskayne BSA connects business students at UCalgary with industry, running case competitions, networking mixers, mentorship programs, and the Haskayne Speaker Series.',
    founded: 1970,
    website: 'https://haskaynebs.ca',
    nextEvent: 'Business Case Competition — Nov 14',
    events: [
      { title: 'Business Case Competition', date: 'Nov 14, 2026', location: 'Scurfield Hall' },
      { title: 'Haskayne Speaker Series', date: 'Nov 26, 2026 12 PM', location: 'Scurfield Hall 225' },
    ],
  },

  // ── University of Alberta ────────────────────────────────────────────────
  {
    id: 'ualberta-students-union',
    name: "Students' Union (SU)",
    universitySlug: 'ualberta',
    university: 'University of Alberta',
    category: 'Student Government',
    members: 38000,
    description:
      "The UAlberta SU is one of Canada's oldest and largest student governments, operating the Students' Union Building, clubs, health plan, and student advocacy services.",
    founded: 1912,
    website: 'https://www.su.ualberta.ca',
    nextEvent: 'SU Council Meeting — Nov 4',
    events: [
      { title: 'SU Council Meeting', date: 'Nov 4, 2026', location: 'SUB 6-59' },
      { title: 'Student Rights Awareness Week', date: 'Nov 17, 2026', location: 'SUB Main Floor' },
    ],
  },
  {
    id: 'ualberta-engineering-students-society',
    name: 'Engineering Students Society (ESS)',
    universitySlug: 'ualberta',
    university: 'University of Alberta',
    category: 'Student Government',
    members: 8100,
    description:
      "The UAlberta ESS represents all undergraduate engineering students, organising E-Week, the Iron Ring ceremony, career fairs, and the annual Grand Prix Go-Kart Race.",
    founded: 1907,
    website: 'https://ess.engineering.ualberta.ca',
    nextEvent: 'E-Week Opening Night — Nov 9',
    events: [
      { title: 'E-Week Opening Night', date: 'Nov 9, 2026', location: 'ETLC Atrium' },
      { title: 'Grand Prix Go-Kart Race', date: 'Nov 14, 2026', location: 'North Parking Lot' },
    ],
  },
  {
    id: 'ualberta-science-students-association',
    name: 'Science Students Association',
    universitySlug: 'ualberta',
    university: 'University of Alberta',
    category: 'Academic',
    members: 6400,
    description:
      'The UAlberta SSA runs academic support services, social events, and research networking opportunities for undergraduate science students across all departments.',
    founded: 1960,
    nextEvent: 'Study Hall Session — Nov 5',
    events: [
      { title: 'Study Hall Session', date: 'Nov 5, 2026 6 PM', location: 'CCIS L2-190' },
      { title: 'Science Formal', date: 'Nov 28, 2026', location: 'Hotel Macdonald' },
    ],
  },
  {
    id: 'ualberta-gateway',
    name: 'The Gateway',
    universitySlug: 'ualberta',
    university: 'University of Alberta',
    category: 'Media',
    members: 110,
    description:
      "The Gateway is the University of Alberta's student newspaper, published since 1910, covering campus news, investigations, culture, and opinion in print and online.",
    founded: 1910,
    website: 'https://www.thegatewayonline.ca',
    nextEvent: 'News Team Meeting — Nov 3',
    events: [
      { title: 'News Team Meeting', date: 'Nov 3, 2026 5 PM', location: 'Gateway Office, SUB 3-04' },
      { title: 'Journalism Workshop', date: 'Nov 17, 2026', location: 'Hub Mall' },
    ],
  },
  {
    id: 'ualberta-international-students-association',
    name: 'International Students Association',
    universitySlug: 'ualberta',
    university: 'University of Alberta',
    category: 'Cultural',
    members: 2300,
    description:
      'The UAlberta ISA supports international students through orientation programs, cultural nights, visa and immigration help sessions, and social meetups across Edmonton.',
    website: 'https://ualbertaisa.ca',
    nextEvent: 'Cultural Night — Nov 12',
    events: [
      { title: 'Cultural Night', date: 'Nov 12, 2026 6 PM', location: 'SUB Ballroom' },
      { title: 'Winter Survival Guide for Newcomers', date: 'Nov 4, 2026', location: 'SUB Main Floor' },
    ],
  },
  {
    id: 'ualberta-students-for-sustainability',
    name: 'Students for Sustainability',
    universitySlug: 'ualberta',
    university: 'University of Alberta',
    category: 'Environment',
    members: 390,
    description:
      'Students for Sustainability at UAlberta campaigns on climate action, runs the campus community garden, coordinates plastic-free initiatives, and connects with local environmental groups.',
    website: 'https://sfsualberta.ca',
    nextEvent: 'Climate Action Rally — Nov 7',
    events: [
      { title: 'Climate Action Rally', date: 'Nov 7, 2026 12 PM', location: 'Convocation Plaza' },
      { title: 'Community Garden Winterizing', date: 'Nov 1, 2026', location: 'East Campus Garden' },
    ],
  },
  {
    id: 'ualberta-computing-science-student-society',
    name: 'Computing Science Student Society (CS3)',
    universitySlug: 'ualberta',
    university: 'University of Alberta',
    category: 'Tech',
    members: 1650,
    description:
      'CS3 is the student society for Computing Science students at UAlberta, running hackathons, industry talks, a competitive programming club, and the annual CS Games qualifier.',
    website: 'https://cs3ualberta.ca',
    nextEvent: 'Industry Networking Night — Nov 10',
    events: [
      { title: 'Industry Networking Night', date: 'Nov 10, 2026 5:30 PM', location: 'Computing Science Centre' },
      { title: 'Competitive Programming Round', date: 'Nov 24, 2026', location: 'CS Lab CSC 259' },
    ],
  },

  // ── Carleton University ──────────────────────────────────────────────────
  {
    id: 'carleton-cusa',
    name: 'Carleton University Students Association (CUSA)',
    universitySlug: 'carleton',
    university: 'Carleton University',
    category: 'Student Government',
    members: 25000,
    description:
      'CUSA is the undergraduate student government at Carleton, operating student clubs, the CUSA Pub (Roosters), student services, and advocacy with the university.',
    founded: 1942,
    website: 'https://www.cusaonline.ca',
    nextEvent: 'CUSA Council Meeting — Nov 4',
    events: [
      { title: 'CUSA Council Meeting', date: 'Nov 4, 2026', location: 'Unicentre 508' },
      { title: 'Fall Carnival', date: 'Nov 18, 2026', location: 'Unicentre Atrium' },
    ],
  },
  {
    id: 'carleton-film-society',
    name: 'Carleton Film Society',
    universitySlug: 'carleton',
    university: 'Carleton University',
    category: 'Arts',
    members: 135,
    description:
      'The Carleton Film Society screens classic cinema, runs student filmmaking workshops, and hosts the annual Ravens Reel Film Competition for student short films.',
    founded: 1969,
    nextEvent: 'Italian Neorealism Night — Nov 6',
    events: [
      { title: 'Italian Neorealism Night', date: 'Nov 6, 2026 7 PM', location: 'Richcraft Hall 2400' },
      { title: 'Ravens Reel Competition', date: 'Dec 3, 2026', location: 'Richcraft Hall Theatre' },
    ],
  },
  {
    id: 'carleton-debate-club',
    name: 'Carleton Debate Club',
    universitySlug: 'carleton',
    university: 'Carleton University',
    category: 'Academic',
    members: 160,
    description:
      'The Carleton Debate Club fields competitive parliamentary debate teams at regional, national, and international tournaments and runs open public debates on campus.',
    nextEvent: 'Weekly Practice — Nov 5',
    events: [
      { title: 'Weekly Practice', date: 'Nov 5, 2026 7 PM', location: 'Paterson Hall 246' },
      { title: 'Carleton Open Invitational', date: 'Nov 20–21, 2026', location: 'Richcraft Hall' },
    ],
  },
  {
    id: 'carleton-engineering-students-society',
    name: 'Carleton Engineering Students Society',
    universitySlug: 'carleton',
    university: 'Carleton University',
    category: 'Student Government',
    members: 4800,
    description:
      'CESS represents engineering students at Carleton, running Frosh Week, the Iron Ring ceremony, engineering competitions, and social events throughout the year.',
    founded: 1964,
    website: 'https://cesscarleton.ca',
    nextEvent: 'Robotics Showcase — Nov 13',
    events: [
      { title: 'Robotics Showcase', date: 'Nov 13, 2026', location: 'Canal Building Atrium' },
      { title: 'Engineering Formal', date: 'Nov 28, 2026', location: 'Shaw Centre Ottawa' },
    ],
  },
  {
    id: 'carleton-architecture-students-society',
    name: 'Architecture Students Society',
    universitySlug: 'carleton',
    university: 'Carleton University',
    category: 'Academic',
    members: 580,
    description:
      "The ASS represents students at Carleton's Azrieli School of Architecture & Urbanism, organising studio critiques, design competitions, and architectural site tours.",
    nextEvent: 'Midterm Critique Night — Nov 9',
    events: [
      { title: 'Midterm Critique Night', date: 'Nov 9, 2026', location: 'Architecture Building Studio' },
      { title: 'Studio Culture Night', date: 'Nov 23, 2026', location: 'Architecture Building' },
    ],
  },
  {
    id: 'carleton-journalism-students-association',
    name: 'Journalism Students Association',
    universitySlug: 'carleton',
    university: 'Carleton University',
    category: 'Media',
    members: 290,
    description:
      "The JSA represents students in Carleton's nationally renowned Journalism school, hosting industry panels, CBC and Globe & Mail career workshops, and an annual journalism awards gala.",
    founded: 1945,
    nextEvent: 'Journalism Panel: Digital Media — Nov 11',
    events: [
      { title: 'Journalism Panel: Digital Media', date: 'Nov 11, 2026 5 PM', location: 'River Building 3224' },
      { title: 'Annual Journalism Awards Gala', date: 'Nov 28, 2026', location: 'Alumni Theatre' },
    ],
  },

  // ── Simon Fraser University ──────────────────────────────────────────────
  {
    id: 'sfu-sfss',
    name: 'Simon Fraser Student Society (SFSS)',
    universitySlug: 'sfu',
    university: 'Simon Fraser University',
    category: 'Student Government',
    members: 35000,
    description:
      'The SFSS is the undergraduate student society at SFU, delivering clubs support, health & dental coverage, student advocacy, and campus programming across all three campuses.',
    founded: 1965,
    website: 'https://sfss.ca',
    nextEvent: 'SFSS General Meeting — Nov 5',
    events: [
      { title: 'SFSS General Meeting', date: 'Nov 5, 2026', location: 'MBC 2270, Burnaby' },
      { title: 'Clubs Day', date: 'Nov 19, 2026', location: 'Maggie Benson Centre' },
    ],
  },
  {
    id: 'sfu-esss',
    name: 'SFU Engineering Science Student Society (ESSS)',
    universitySlug: 'sfu',
    university: 'Simon Fraser University',
    category: 'Student Government',
    members: 4500,
    description:
      'The ESSS represents undergraduate engineering science students at SFU, organising orientation, the Iron Ring ceremony, design showcases, and the annual Engineering Banquet.',
    founded: 1970,
    website: 'https://sfuess.ca',
    nextEvent: 'Engineering Banquet — Nov 22',
    events: [
      { title: 'Engineering Banquet', date: 'Nov 22, 2026', location: 'Harbour Centre, Vancouver' },
      { title: 'Design Showcase', date: 'Nov 8, 2026', location: 'TASC1 Atrium' },
    ],
  },
  {
    id: 'sfu-debate-society',
    name: 'SFU Debate Society',
    universitySlug: 'sfu',
    university: 'Simon Fraser University',
    category: 'Academic',
    members: 180,
    description:
      'The SFU Debate Society competes in British Columbia Universities Debating (BCUD) and national tournaments, running weekly practices and public debates on campus.',
    nextEvent: 'Weekly Practice — Nov 4',
    events: [
      { title: 'Weekly Practice', date: 'Nov 4, 2026 7 PM', location: 'AQ 3149' },
      { title: 'SFU Open Tournament', date: 'Nov 21–22, 2026', location: 'Academic Quadrangle' },
    ],
  },
  {
    id: 'sfu-film-society',
    name: 'SFU Film Society',
    universitySlug: 'sfu',
    university: 'Simon Fraser University',
    category: 'Arts',
    members: 220,
    description:
      'The SFU Film Society screens international, indie, and classic films on campus and supports student filmmakers through production workshops and an annual short-film showcase.',
    nextEvent: 'Werner Herzog Night — Nov 7',
    events: [
      { title: 'Werner Herzog Night', date: 'Nov 7, 2026 7 PM', location: 'AQ Screening Room' },
      { title: 'Student Film Showcase', date: 'Dec 5, 2026', location: 'Goldcorp Centre for the Arts' },
    ],
  },
  {
    id: 'sfu-science-student-society',
    name: 'SFU Science Student Society',
    universitySlug: 'sfu',
    university: 'Simon Fraser University',
    category: 'Academic',
    members: 6500,
    description:
      'The SSS represents all science undergraduates at SFU, providing academic support, networking events, research symposiums, and the annual Science Formal.',
    founded: 1971,
    website: 'https://sfusss.ca',
    nextEvent: 'Science Formal — Nov 28',
    events: [
      { title: 'Science Formal', date: 'Nov 28, 2026', location: 'Lonsdale Quay Market, North Van' },
      { title: 'Research Showcase', date: 'Nov 13, 2026', location: 'TASC2 Concourse' },
    ],
  },
  {
    id: 'sfu-msa',
    name: 'SFU Muslim Students Association',
    universitySlug: 'sfu',
    university: 'Simon Fraser University',
    category: 'Cultural',
    members: 650,
    description:
      "The SFU MSA provides a welcoming community for Muslim students through weekly Jumu'ah prayers, Ramadan iftars, interfaith events, and social gatherings on all campuses.",
    website: 'https://sfumsa.ca',
    nextEvent: 'Halal Food Fair — Nov 6',
    events: [
      { title: 'Halal Food Fair', date: 'Nov 6, 2026 11 AM–3 PM', location: 'MBC Concourse' },
      { title: 'Interfaith Dialogue Night', date: 'Nov 20, 2026', location: 'Cornerstone Building' },
    ],
  },
  {
    id: 'sfu-hiking-outdoor-club',
    name: 'SFU Hiking and Outdoor Club',
    universitySlug: 'sfu',
    university: 'Simon Fraser University',
    category: 'Sports',
    members: 480,
    description:
      'The SFU Hiking and Outdoor Club organises weekly hikes, trail runs, and camping trips across the North Shore Mountains, Garibaldi, and beyond for all experience levels.',
    nextEvent: 'Garibaldi Lake Hike — Nov 1',
    events: [
      { title: 'Garibaldi Lake Day Hike', date: 'Nov 1, 2026', location: 'Departure: SFU Bus Loop 7 AM' },
      { title: 'Winter Snowshoeing Intro', date: 'Nov 22, 2026', location: 'Cypress Mountain' },
    ],
  },
  {
    id: 'sfu-ski-snowboard-club',
    name: 'SFU Ski and Snowboard Club',
    universitySlug: 'sfu',
    university: 'Simon Fraser University',
    category: 'Sports',
    members: 340,
    description:
      'The SFU Ski and Snowboard Club runs discounted season pass programs, weekly trips to Whistler and Cypress Mountain, and an annual club race day for all ability levels.',
    nextEvent: 'Season Pass Info Night — Nov 10',
    events: [
      { title: 'Season Pass Info Night', date: 'Nov 10, 2026 6 PM', location: 'West Mall Centre 3515' },
      { title: 'Opening Day Trip — Cypress', date: 'Nov 28, 2026', location: 'Cypress Mountain' },
    ],
  },

  // ── University of Victoria ────────────────────────────────────────────────
  {
    id: 'uvic-uvss',
    name: 'University of Victoria Students Society (UVSS)',
    universitySlug: 'uvic',
    university: 'University of Victoria',
    category: 'Student Government',
    members: 21000,
    description:
      'The UVSS is the undergraduate student society at UVic, operating the Student Union Building, clubs funding, student advocacy, health plan, and the popular on-campus events program.',
    founded: 1964,
    website: 'https://uvss.ca',
    nextEvent: 'UVSS Board Meeting — Nov 4',
    events: [
      { title: 'UVSS Board Meeting', date: 'Nov 4, 2026', location: 'Student Union Building B 116' },
      { title: 'Clubs Fair', date: 'Nov 18, 2026', location: 'Student Union Building Atrium' },
    ],
  },
  {
    id: 'uvic-ess',
    name: 'UVic Engineering Students Society',
    universitySlug: 'uvic',
    university: 'University of Victoria',
    category: 'Student Government',
    members: 3200,
    description:
      'The UVic ESS represents undergraduate engineering students, running Engineering Week, the Iron Ring ceremony, design competitions, and the annual Engineering Banquet.',
    founded: 1962,
    website: 'https://uvicengineers.ca',
    nextEvent: 'Engineering Week Kickoff — Nov 9',
    events: [
      { title: 'Engineering Week Kickoff', date: 'Nov 9, 2026', location: 'Engineering & Computer Science Building' },
      { title: 'Engineering Banquet', date: 'Nov 27, 2026', location: 'Victoria Convention Centre' },
    ],
  },
  {
    id: 'uvic-debate-club',
    name: 'UVic Debate Club',
    universitySlug: 'uvic',
    university: 'University of Victoria',
    category: 'Academic',
    members: 140,
    description:
      'The UVic Debate Club trains students in parliamentary debate, competes across Western Canada, and runs an open debate series on campus welcoming participants of all skill levels.',
    nextEvent: 'Weekly Practice — Nov 3',
    events: [
      { title: 'Weekly Practice', date: 'Nov 3, 2026 7 PM', location: 'Cornett A225' },
      { title: 'Pacific Rim Invitational', date: 'Nov 14–15, 2026', location: 'Cornett Building' },
    ],
  },
  {
    id: 'uvic-film-society',
    name: 'UVic Film Society',
    universitySlug: 'uvic',
    university: 'University of Victoria',
    category: 'Arts',
    members: 195,
    description:
      'The UVic Film Society screens art-house and independent films, hosts filmmaker talks, and runs student production workshops culminating in the annual Reel Victoria film festival.',
    nextEvent: 'Ozu Retrospective Night — Nov 6',
    events: [
      { title: 'Ozu Retrospective Night', date: 'Nov 6, 2026 7:30 PM', location: 'Clearihue Screening Room' },
      { title: 'Reel Victoria Film Festival', date: 'Dec 5, 2026', location: 'Cinecenta, SUB' },
    ],
  },
  {
    id: 'uvic-outdoor-club',
    name: 'UVic Outdoor Club',
    universitySlug: 'uvic',
    university: 'University of Victoria',
    category: 'Sports',
    members: 520,
    description:
      "The UVic Outdoor Club organises hiking, kayaking, rock climbing, cycling, and backcountry skiing trips across Vancouver Island and BC's coast for all experience levels.",
    website: 'https://uvicoutdoorclub.ca',
    nextEvent: 'Mt. Finlayson Hike — Nov 2',
    events: [
      { title: 'Mt. Finlayson Hike', date: 'Nov 2, 2026 8 AM', location: 'Meeting at UVic Ring Road' },
      { title: 'Kayaking Day — Elk/Beaver Lake', date: 'Nov 16, 2026', location: 'Elk Lake Regional Park' },
    ],
  },
  {
    id: 'uvic-students-for-climate-action',
    name: 'UVic Students for Climate Action',
    universitySlug: 'uvic',
    university: 'University of Victoria',
    category: 'Environment',
    members: 310,
    description:
      'UVic Students for Climate Action campaigns for campus sustainability, fossil-fuel divestment, and climate justice through rallies, workshops, and collaboration with local environmental groups.',
    nextEvent: 'Climate Justice Town Hall — Nov 7',
    events: [
      { title: 'Climate Justice Town Hall', date: 'Nov 7, 2026 5 PM', location: 'David Turpin Building A144' },
      { title: 'Repair Café and Zero-Waste Workshop', date: 'Nov 21, 2026', location: 'Student Union Building' },
    ],
  },
  {
    id: 'uvic-pre-law-society',
    name: 'UVic Pre-Law Society',
    universitySlug: 'uvic',
    university: 'University of Victoria',
    category: 'Academic',
    members: 380,
    description:
      'The UVic Pre-Law Society prepares undergraduate students for law school through LSAT workshops, law school panels, moot court practice, and networking with UVic Law alumni.',
    nextEvent: 'LSAT Strategy Workshop — Nov 10',
    events: [
      { title: 'LSAT Strategy Workshop', date: 'Nov 10, 2026 5:30 PM', location: 'Cornett B129' },
      { title: 'Law School Panel Night', date: 'Nov 24, 2026', location: 'Fraser Building 159' },
    ],
  },

  // ── University of Ottawa ─────────────────────────────────────────────────
  {
    id: 'uottawa-sfuo',
    name: 'Student Federation of the University of Ottawa (SFUO)',
    universitySlug: 'uottawa',
    university: 'University of Ottawa',
    category: 'Student Government',
    members: 42000,
    description:
      'The SFUO is the bilingual undergraduate student federation at uOttawa, providing clubs support, student advocacy, health and dental coverage, and cultural programming in English and French.',
    founded: 1968,
    website: 'https://sfuo.ca',
    nextEvent: 'SFUO General Assembly — Nov 5',
    events: [
      { title: 'SFUO General Assembly', date: 'Nov 5, 2026', location: 'UCU Building Soleil Room' },
      { title: 'Clubs and Services Fair', date: 'Nov 19, 2026', location: 'UCU Atrium' },
    ],
  },
  {
    id: 'uottawa-esa',
    name: 'uOttawa Engineering Students Association',
    universitySlug: 'uottawa',
    university: 'University of Ottawa',
    category: 'Student Government',
    members: 5800,
    description:
      'The uOttawa ESA represents engineering undergraduates, running Engineering Week, the Iron Ring ceremony, the annual Engineering Gala, and co-op networking events.',
    founded: 1954,
    website: 'https://esa.uottawa.ca',
    nextEvent: 'Engineering Gala — Nov 21',
    events: [
      { title: 'Engineering Gala', date: 'Nov 21, 2026', location: 'Shaw Centre Ottawa' },
      { title: 'Design Team Showcase', date: 'Nov 7, 2026', location: 'SITE Building Atrium' },
    ],
  },
  {
    id: 'uottawa-debate-society',
    name: 'uOttawa Debate Society',
    universitySlug: 'uottawa',
    university: 'University of Ottawa',
    category: 'Academic',
    members: 165,
    description:
      'The uOttawa Debate Society competes in bilingual parliamentary debate at national and international tournaments and runs open debate events in both English and French.',
    nextEvent: 'Weekly Practice — Nov 3',
    events: [
      { title: 'Weekly Practice', date: 'Nov 3, 2026 7 PM', location: 'Desmarais Hall 1170' },
      { title: 'Ottawa Invitational — Nov 20', date: 'Nov 20–21, 2026', location: 'Tabaret Hall' },
    ],
  },
  {
    id: 'uottawa-fulcrum',
    name: 'The Fulcrum',
    universitySlug: 'uottawa',
    university: 'University of Ottawa',
    category: 'Media',
    members: 130,
    description:
      "The Fulcrum is the University of Ottawa's independent English-language student newspaper, covering campus news, culture, sports, and opinion in print and online since 1942.",
    founded: 1942,
    website: 'https://thefulcrum.ca',
    nextEvent: 'Editorial Meeting — Nov 3',
    events: [
      { title: 'Editorial Meeting', date: 'Nov 3, 2026 5 PM', location: 'UCU Building Room 106' },
      { title: 'Investigative Journalism Workshop', date: 'Nov 17, 2026', location: 'Fulcrum Office' },
    ],
  },
  {
    id: 'uottawa-isa',
    name: 'uOttawa International Students Association',
    universitySlug: 'uottawa',
    university: 'University of Ottawa',
    category: 'Cultural',
    members: 2100,
    description:
      'The ISA at uOttawa supports international students through orientation, cultural festivals, immigration help sessions, language exchanges, and social events in the national capital.',
    website: 'https://uottawaisa.ca',
    nextEvent: 'International Night — Nov 12',
    events: [
      { title: 'International Night', date: 'Nov 12, 2026 6 PM', location: 'UCU Soleil Room' },
      { title: 'Language Exchange Mixer', date: 'Nov 26, 2026', location: 'UCU Atrium' },
    ],
  },
  {
    id: 'uottawa-premed-society',
    name: 'uOttawa Pre-Med Society',
    universitySlug: 'uottawa',
    university: 'University of Ottawa',
    category: 'Academic',
    members: 720,
    description:
      'The uOttawa Pre-Med Society supports aspiring physicians with MCAT prep workshops, clinical volunteering placements, medical school interview prep, and physician speaker panels.',
    nextEvent: 'Med School Application Night — Nov 9',
    events: [
      { title: 'Med School Application Night', date: 'Nov 9, 2026 5:30 PM', location: 'Lamoureux Hall 220' },
      { title: 'MCAT Prep Session', date: 'Nov 23, 2026', location: 'FTX 147' },
    ],
  },
  {
    id: 'uottawa-law-students-association',
    name: 'uOttawa Law Students Association',
    universitySlug: 'uottawa',
    university: 'University of Ottawa',
    category: 'Academic',
    members: 850,
    description:
      'The uOttawa LSA represents common and civil law students, organising moot courts, legal clinics, bar nights, and the Annual Law Formal at one of Canada\'s top bilingual law schools.',
    founded: 1960,
    website: 'https://uottawalsa.ca',
    nextEvent: 'Law Formal — Nov 28',
    events: [
      { title: 'Law Formal', date: 'Nov 28, 2026', location: 'Château Laurier, Ottawa' },
      { title: 'Moot Court Practice', date: 'Nov 5, 2026 6 PM', location: 'Fauteux Hall Moot Courtroom' },
    ],
  },

  // ── Dalhousie University ─────────────────────────────────────────────────
  {
    id: 'dal-dsu',
    name: 'Dalhousie Student Union (DSU)',
    universitySlug: 'dal',
    university: 'Dalhousie University',
    category: 'Student Government',
    members: 19000,
    description:
      'The DSU is the undergraduate student government at Dalhousie, operating student services, clubs support, health and dental coverage, and student advocacy in Halifax.',
    founded: 1910,
    website: 'https://dsu.ca',
    nextEvent: 'DSU Council Meeting — Nov 4',
    events: [
      { title: 'DSU Council Meeting', date: 'Nov 4, 2026', location: 'Student Union Building Room 308' },
      { title: 'Fall Clubs Fair', date: 'Nov 18, 2026', location: 'SUB Mezzanine' },
    ],
  },
  {
    id: 'dal-engineering-society',
    name: 'Dal Engineering Society',
    universitySlug: 'dal',
    university: 'Dalhousie University',
    category: 'Student Government',
    members: 2800,
    description:
      'The Dal Engineering Society represents all undergraduate engineering students, organising E-Week, the Iron Ring ceremony, design team support, and the annual Engineers Formal.',
    founded: 1952,
    website: 'https://engsoc.dal.ca',
    nextEvent: 'Engineers Formal — Nov 22',
    events: [
      { title: 'Engineers Formal', date: 'Nov 22, 2026', location: 'Halifax Marriott Harbourfront' },
      { title: 'E-Week Kickoff', date: 'Nov 9, 2026', location: 'Sexton Campus Gym' },
    ],
  },
  {
    id: 'dal-debate-club',
    name: 'Dal Debate Club',
    universitySlug: 'dal',
    university: 'Dalhousie University',
    category: 'Academic',
    members: 120,
    description:
      "Dal's Debate Club competes in parliamentary debate at regional and national tournaments and runs weekly practice sessions open to students at all experience levels.",
    nextEvent: 'Practice Session — Nov 3',
    events: [
      { title: 'Practice Session', date: 'Nov 3, 2026 7 PM', location: 'McCain Building 2021' },
      { title: 'Dal Invitational', date: 'Nov 20–21, 2026', location: 'Henry Hicks Building' },
    ],
  },
  {
    id: 'dal-gazette',
    name: 'The Gazette',
    universitySlug: 'dal',
    university: 'Dalhousie University',
    category: 'Media',
    members: 110,
    description:
      "The Dalhousie Gazette is one of Canada's oldest student newspapers, published since 1869, covering Dal campus news, Halifax events, sports, arts, and student opinion.",
    founded: 1869,
    website: 'https://dalgazette.com',
    nextEvent: 'Pitch Meeting — Nov 3',
    events: [
      { title: 'Pitch Meeting', date: 'Nov 3, 2026 5 PM', location: 'Gazette Office, SUB Room 312' },
      { title: 'Photography Skills Workshop', date: 'Nov 17, 2026', location: 'SUB Room 312' },
    ],
  },
  {
    id: 'dal-isa',
    name: 'Dal International Students Association',
    universitySlug: 'dal',
    university: 'Dalhousie University',
    category: 'Cultural',
    members: 1600,
    description:
      'Dal ISA connects international students in Halifax through cultural festivals, orientation programs, immigration information sessions, and social outings across Nova Scotia.',
    website: 'https://dalisa.ca',
    nextEvent: 'International Cultural Showcase — Nov 14',
    events: [
      { title: 'International Cultural Showcase', date: 'Nov 14, 2026 5 PM', location: 'Dalhousie Arts Centre' },
      { title: 'Halifax City Tour', date: 'Nov 1, 2026', location: 'Departing from SUB' },
    ],
  },
  {
    id: 'dal-medical-students-society',
    name: 'Dal Medical Students Society',
    universitySlug: 'dal',
    university: 'Dalhousie University',
    category: 'Academic',
    members: 480,
    description:
      'The Dal MSS represents medical students across Atlantic Canada, organising clinical skills workshops, wellness initiatives, research symposiums, and advocacy with Dalhousie Medicine.',
    founded: 1969,
    website: 'https://dalmss.ca',
    nextEvent: 'Clinical Skills Night — Nov 6',
    events: [
      { title: 'Clinical Skills Night', date: 'Nov 6, 2026 6 PM', location: 'Tupper Medical Building' },
      { title: 'Student Research Day', date: 'Nov 27, 2026', location: 'CHEB Building' },
    ],
  },
  {
    id: 'dal-law-students-society',
    name: 'Dal Law Students Society',
    universitySlug: 'dal',
    university: 'Dalhousie University',
    category: 'Academic',
    members: 560,
    description:
      'The Dalhousie Law Students Society represents JD and LLM students at the Schulich School of Law, running moot competitions, bar nights, pro bono clinics, and the annual Law Formal.',
    website: 'https://dallss.ca',
    nextEvent: 'Law Formal — Nov 29',
    events: [
      { title: 'Law Formal', date: 'Nov 29, 2026', location: 'Halifax Marriott Harbourfront' },
      { title: 'Moot Training Session', date: 'Nov 7, 2026 5 PM', location: 'Weldon Law Building Moot Court' },
    ],
  },

  // ── Concordia University ─────────────────────────────────────────────────
  {
    id: 'concordia-csu',
    name: 'Concordia Student Union (CSU)',
    universitySlug: 'concordia',
    university: 'Concordia University',
    category: 'Student Government',
    members: 35000,
    description:
      "The CSU is Concordia's undergraduate student government, running student services, clubs, the People's Potato free lunch, legal advocacy, and the annual campus events program.",
    founded: 1974,
    website: 'https://csu.qc.ca',
    nextEvent: 'CSU General Assembly — Nov 5',
    events: [
      { title: 'CSU General Assembly', date: 'Nov 5, 2026', location: 'Hall Building H-110' },
      { title: "People's Potato Weekly Lunch", date: 'Every Wednesday 12 PM', location: 'Hall Building H-760' },
    ],
  },
  {
    id: 'concordia-eca',
    name: 'Engineering & Computer Science Association (ECA)',
    universitySlug: 'concordia',
    university: 'Concordia University',
    category: 'Student Government',
    members: 7200,
    description:
      'The ECA represents engineering and computer science undergraduates at Concordia, running E-Week, the Iron Ring ceremony, hackathons, and faculty networking events.',
    founded: 1952,
    website: 'https://encs.concordia.ca/eca',
    nextEvent: 'ECA Hackathon — Nov 15',
    events: [
      { title: 'ECA Hackathon', date: 'Nov 15–16, 2026', location: 'EV Building' },
      { title: 'E-Week Kickoff', date: 'Nov 8, 2026', location: 'EV Atrium' },
    ],
  },
  {
    id: 'concordia-fasa',
    name: 'Fine Arts Student Alliance (FASA)',
    universitySlug: 'concordia',
    university: 'Concordia University',
    category: 'Arts',
    members: 2800,
    description:
      "FASA represents Concordia's Fine Arts faculty students, advocating for arts funding and organising gallery openings, art fairs, and the annual FASA Art Market.",
    founded: 1971,
    website: 'https://fasaconcordia.com',
    nextEvent: 'FASA Art Market — Nov 14',
    events: [
      { title: 'FASA Art Market', date: 'Nov 14, 2026 11 AM–6 PM', location: 'Grey Nuns Building Atrium' },
      { title: 'Student Exhibition Opening', date: 'Nov 21, 2026', location: 'VAV Gallery' },
    ],
  },
  {
    id: 'concordia-cjlo',
    name: 'CJLO — Concordia Campus Radio',
    universitySlug: 'concordia',
    university: 'Concordia University',
    category: 'Media',
    members: 210,
    description:
      "CJLO 1690 AM is Concordia's campus and community radio station, broadcasting music, talk, and arts programming 24/7 and training students in radio production.",
    founded: 1997,
    website: 'https://cjlo.com',
    nextEvent: 'CJLO Fall Volunteer Orientation — Nov 3',
    events: [
      { title: 'CJLO Fall Volunteer Orientation', date: 'Nov 3, 2026 6 PM', location: 'Hall Building H-648' },
      { title: 'Radiothon Fundraiser', date: 'Nov 20, 2026', location: 'Live on Air — 1690 AM' },
    ],
  },
  {
    id: 'concordia-documentary-film-association',
    name: 'Concordia Documentary Film Association',
    universitySlug: 'concordia',
    university: 'Concordia University',
    category: 'Arts',
    members: 180,
    description:
      'The CDFA supports documentary filmmaking at Concordia through screenings, practitioner talks, equipment workshops, and the annual Docurama film showcase.',
    nextEvent: 'Docurama Showcase — Nov 18',
    events: [
      { title: 'Docurama Showcase', date: 'Nov 18, 2026 6 PM', location: "Concordia Cinema, J.A. DeSève" },
      { title: 'Documentary Filmmaking Masterclass', date: 'Nov 7, 2026', location: 'Visual Arts Building VA-114' },
    ],
  },

  // ── York University ──────────────────────────────────────────────────────
  {
    id: 'yorku-yfs',
    name: 'York Federation of Students (YFS)',
    universitySlug: 'yorku',
    university: 'York University',
    category: 'Student Government',
    members: 55000,
    description:
      'The YFS is the undergraduate student government at York University, providing student advocacy, clubs support, health and dental coverage, and campus programming across all faculties.',
    founded: 1973,
    website: 'https://yfs.ca',
    nextEvent: 'YFS Council Meeting — Nov 5',
    events: [
      { title: 'YFS Council Meeting', date: 'Nov 5, 2026', location: 'Student Centre Room 313' },
      { title: 'Fall Clubs Fair', date: 'Nov 19, 2026', location: 'Vari Hall' },
    ],
  },
  {
    id: 'yorku-engineering-society',
    name: 'York Engineering Society',
    universitySlug: 'yorku',
    university: 'York University',
    category: 'Student Government',
    members: 4200,
    description:
      'The York Engineering Society represents Lassonde School of Engineering undergraduates, running Engineering Week, design showcases, the Iron Ring ceremony, and the annual Engineering Banquet.',
    founded: 1992,
    website: 'https://yorkengsoc.ca',
    nextEvent: 'Engineering Banquet — Nov 20',
    events: [
      { title: 'Engineering Banquet', date: 'Nov 20, 2026', location: 'International Banquet Hall, Vaughan' },
      { title: 'Design Team Showcase', date: 'Nov 6, 2026', location: 'Lassonde Building Atrium' },
    ],
  },
  {
    id: 'yorku-debate-society',
    name: 'York Debate Society',
    universitySlug: 'yorku',
    university: 'York University',
    category: 'Academic',
    members: 155,
    description:
      'The York Debate Society competes in parliamentary debate at regional and national tournaments and hosts open debate nights and public-speaking workshops for all York students.',
    nextEvent: 'Weekly Practice — Nov 4',
    events: [
      { title: 'Weekly Practice', date: 'Nov 4, 2026 7 PM', location: 'Ross Building S612' },
      { title: 'York Open Tournament', date: 'Nov 21–22, 2026', location: 'Schulich School of Business' },
    ],
  },
  {
    id: 'yorku-excalibur',
    name: 'Excalibur Publications',
    universitySlug: 'yorku',
    university: 'York University',
    category: 'Media',
    members: 135,
    description:
      "Excalibur is York University's independent student newspaper, published since 1966, covering campus news, arts, culture, sports, and opinion in print and online.",
    founded: 1966,
    website: 'https://excal.on.ca',
    nextEvent: 'Editorial Meeting — Nov 3',
    events: [
      { title: 'Editorial Meeting', date: 'Nov 3, 2026 5 PM', location: 'Student Centre Room 009' },
      { title: 'Design and Layout Workshop', date: 'Nov 17, 2026', location: 'Excalibur Office' },
    ],
  },
  {
    id: 'yorku-isa',
    name: 'York International Students Association',
    universitySlug: 'yorku',
    university: 'York University',
    category: 'Cultural',
    members: 3200,
    description:
      'The York ISA supports the large international student community through cultural events, orientation programs, immigration info sessions, and social gatherings in the Greater Toronto Area.',
    nextEvent: 'International Cultural Night — Nov 12',
    events: [
      { title: 'International Cultural Night', date: 'Nov 12, 2026 6 PM', location: 'Vari Hall' },
      { title: 'Toronto Exploration Day', date: 'Nov 22, 2026', location: 'Departing from York Lanes' },
    ],
  },
  {
    id: 'yorku-film-studies-club',
    name: 'York Film Studies Club',
    universitySlug: 'yorku',
    university: 'York University',
    category: 'Arts',
    members: 265,
    description:
      'The York Film Studies Club screens and discusses international cinema, hosts filmmaker Q&As, and supports student productions through its annual Short Film Competition.',
    nextEvent: 'Fellini Double Bill — Nov 7',
    events: [
      { title: 'Fellini Double Bill', date: 'Nov 7, 2026 7 PM', location: 'Nat Taylor Cinema' },
      { title: 'Short Film Competition Submissions Due', date: 'Nov 30, 2026', location: 'Online Submission' },
    ],
  },
  {
    id: 'yorku-business-students-association',
    name: 'York Business Students Association',
    universitySlug: 'yorku',
    university: 'York University',
    category: 'Academic',
    members: 1800,
    description:
      'The York BSA connects Schulich and LA&PS business students with industry through case competitions, networking events, mentorship programs, and the Schulich Speaker Series.',
    nextEvent: 'Case Competition — Nov 14',
    events: [
      { title: 'Case Competition', date: 'Nov 14, 2026', location: 'Schulich School of Business' },
      { title: 'Industry Networking Mixer', date: 'Nov 27, 2026 5 PM', location: 'Seymour Schulich Building Atrium' },
    ],
  },

  // ── Toronto Metropolitan University (TMU / Ryerson) ──────────────────────
  {
    id: 'ryerson-tmsu',
    name: 'Toronto Metropolitan Students Union (TMSU)',
    universitySlug: 'ryerson',
    university: 'Toronto Metropolitan University',
    category: 'Student Government',
    members: 45000,
    description:
      'The TMSU is the undergraduate student government at TMU, providing clubs support, student advocacy, health and dental coverage, and campus programming in downtown Toronto.',
    founded: 1942,
    website: 'https://tmsu.ca',
    nextEvent: 'TMSU Council Meeting — Nov 5',
    events: [
      { title: 'TMSU Council Meeting', date: 'Nov 5, 2026', location: 'Student Campus Centre 211' },
      { title: 'Fall Clubs & Activities Fair', date: 'Nov 19, 2026', location: 'Quad (Gould Street)' },
    ],
  },
  {
    id: 'ryerson-ess',
    name: 'TMU Engineering Students Society',
    universitySlug: 'ryerson',
    university: 'Toronto Metropolitan University',
    category: 'Student Government',
    members: 5100,
    description:
      'The TMU ESS represents all engineering undergraduates, organising Engineering Week, the Iron Ring ceremony, design showcases, and the annual Engineering Formal in downtown Toronto.',
    founded: 1965,
    website: 'https://tmuess.ca',
    nextEvent: 'Engineering Formal — Nov 22',
    events: [
      { title: 'Engineering Formal', date: 'Nov 22, 2026', location: 'Toronto Convention Centre' },
      { title: 'E-Week Opening — Nov 9', date: 'Nov 9, 2026', location: 'Kerr Hall Atrium' },
    ],
  },
  {
    id: 'ryerson-chang-school-association',
    name: 'Chang School Students Association',
    universitySlug: 'ryerson',
    university: 'Toronto Metropolitan University',
    category: 'Academic',
    members: 2800,
    description:
      'The Chang School Students Association represents continuing education students at TMU, providing academic support, networking events, and community for mature and part-time learners.',
    nextEvent: 'Continuing Ed Networking Night — Nov 10',
    events: [
      { title: 'Continuing Ed Networking Night', date: 'Nov 10, 2026 6 PM', location: 'Chang School, Heaslip House' },
      { title: 'Academic Success Workshop', date: 'Nov 24, 2026', location: 'Heaslip House 104' },
    ],
  },
  {
    id: 'ryerson-debate-club',
    name: 'TMU Debate Club',
    universitySlug: 'ryerson',
    university: 'Toronto Metropolitan University',
    category: 'Academic',
    members: 145,
    description:
      'The TMU Debate Club trains students in competitive parliamentary debate, participates in Ontario and national circuits, and runs open debate events at the heart of downtown Toronto.',
    nextEvent: 'Weekly Practice — Nov 3',
    events: [
      { title: 'Weekly Practice', date: 'Nov 3, 2026 7 PM', location: 'Jorgenson Hall JOR-1410' },
      { title: 'TMU Open Invitational', date: 'Nov 20–21, 2026', location: 'Jorgenson Hall' },
    ],
  },
  {
    id: 'ryerson-eyeopener',
    name: 'The Eyeopener',
    universitySlug: 'ryerson',
    university: 'Toronto Metropolitan University',
    category: 'Media',
    members: 125,
    description:
      "The Eyeopener is TMU's independent student newspaper, published since 1967, covering campus news, Toronto culture, sports, and opinion in print and online.",
    founded: 1967,
    website: 'https://theeyeopener.com',
    nextEvent: 'Editorial Meeting — Nov 3',
    events: [
      { title: 'Editorial Meeting', date: 'Nov 3, 2026 5 PM', location: 'SCC 203' },
      { title: 'Investigative Writing Workshop', date: 'Nov 17, 2026', location: 'Eyeopener Office' },
    ],
  },
  {
    id: 'ryerson-international-students',
    name: 'TMU International Students',
    universitySlug: 'ryerson',
    university: 'Toronto Metropolitan University',
    category: 'Cultural',
    members: 4500,
    description:
      'TMU International Students supports one of the most diverse campuses in Canada through orientation programs, cultural festivals, immigration workshops, and social events in Toronto.',
    nextEvent: 'International Orientation — Nov 1',
    events: [
      { title: 'International Orientation', date: 'Nov 1, 2026 2 PM', location: 'Student Campus Centre Auditorium' },
      { title: 'Global Cultures Night', date: 'Nov 14, 2026', location: 'Ryerson Image Centre' },
    ],
  },
  {
    id: 'ryerson-commerce-society',
    name: 'TMU Commerce Society',
    universitySlug: 'ryerson',
    university: 'Toronto Metropolitan University',
    category: 'Academic',
    members: 2100,
    description:
      'The TMU Commerce Society connects Ted Rogers School of Management students with industry through case competitions, networking events, and the annual Business Week speaker series.',
    nextEvent: 'Business Week Kickoff — Nov 9',
    events: [
      { title: 'Business Week Kickoff', date: 'Nov 9, 2026 12 PM', location: 'Ted Rogers School of Management' },
      { title: 'Bay Street Networking Night', date: 'Nov 25, 2026 6 PM', location: 'TRSM 1-076' },
    ],
  },
  {
    id: 'ryerson-film-society',
    name: 'TMU Film Society',
    universitySlug: 'ryerson',
    university: 'Toronto Metropolitan University',
    category: 'Arts',
    members: 280,
    description:
      'The TMU Film Society supports student filmmakers at one of Canada\'s top film schools through screenings, production workshops, industry guest talks, and the annual TMU Short Film Showcase.',
    nextEvent: 'New Wave Cinema Night — Nov 7',
    events: [
      { title: 'New Wave Cinema Night', date: 'Nov 7, 2026 7 PM', location: 'Ryerson Image Centre Screening Room' },
      { title: 'Short Film Showcase', date: 'Dec 4, 2026', location: 'Rogers Communications Centre' },
    ],
  },

  // ── Memorial University of Newfoundland ──────────────────────────────────
  {
    id: 'mun-munsu',
    name: 'Memorial University Students Union (MUNSU)',
    universitySlug: 'mun',
    university: 'Memorial University of Newfoundland',
    category: 'Student Government',
    members: 19000,
    description:
      'MUNSU is the undergraduate student government at Memorial University, delivering student advocacy, clubs support, health and dental coverage, and campus events in St. John\'s.',
    founded: 1959,
    website: 'https://munsu.ca',
    nextEvent: 'MUNSU Council Meeting — Nov 4',
    events: [
      { title: 'MUNSU Council Meeting', date: 'Nov 4, 2026', location: 'Thomson Student Centre Room 3000' },
      { title: 'Fall Clubs Night', date: 'Nov 18, 2026', location: 'Thomson Student Centre Atrium' },
    ],
  },
  {
    id: 'mun-engineering-society',
    name: 'MUN Engineering Society',
    universitySlug: 'mun',
    university: 'Memorial University of Newfoundland',
    category: 'Student Government',
    members: 2400,
    description:
      "The MUN Engineering Society represents undergraduate engineering students, running Engineering Week, the Iron Ring ceremony, design team support, and the annual Engineers' Ball.",
    founded: 1965,
    website: 'https://munengineering.ca',
    nextEvent: "Engineers' Ball — Nov 21",
    events: [
      { title: "Engineers' Ball", date: 'Nov 21, 2026', location: 'Delta Hotels St. John\'s' },
      { title: 'E-Week Opening', date: 'Nov 9, 2026', location: 'Engineering Building EN-2000' },
    ],
  },
  {
    id: 'mun-debate-club',
    name: 'MUN Debate Club',
    universitySlug: 'mun',
    university: 'Memorial University of Newfoundland',
    category: 'Academic',
    members: 110,
    description:
      'The MUN Debate Club competes in national parliamentary debate circuits, runs weekly practices, and hosts the annual Atlantic Invitational Tournament on campus in St. John\'s.',
    nextEvent: 'Weekly Practice — Nov 3',
    events: [
      { title: 'Weekly Practice', date: 'Nov 3, 2026 7 PM', location: 'Arts & Administration Building A-1049' },
      { title: 'Atlantic Invitational', date: 'Nov 20–21, 2026', location: 'Arts & Admin Building' },
    ],
  },
  {
    id: 'mun-the-muse',
    name: 'The Muse',
    universitySlug: 'mun',
    university: 'Memorial University of Newfoundland',
    category: 'Media',
    members: 95,
    description:
      "The Muse is Memorial University's independent student newspaper, published since 1969, covering campus life, St. John's culture, sports, arts, and student opinion.",
    founded: 1969,
    website: 'https://themusenl.com',
    nextEvent: 'Editorial Meeting — Nov 3',
    events: [
      { title: 'Editorial Meeting', date: 'Nov 3, 2026 5 PM', location: 'Muse Office, Thomson Student Centre 2000' },
      { title: 'Pitching Workshop for New Writers', date: 'Nov 17, 2026', location: 'Muse Office' },
    ],
  },
  {
    id: 'mun-isa',
    name: 'MUN International Students Association',
    universitySlug: 'mun',
    university: 'Memorial University of Newfoundland',
    category: 'Cultural',
    members: 1400,
    description:
      'The MUN ISA welcomes international students to Newfoundland through orientation programs, cultural showcases, immigration workshops, and social events across St. John\'s.',
    nextEvent: 'Welcome to St. Johns Night — Nov 1',
    events: [
      { title: "Welcome to St. John's Night", date: 'Nov 1, 2026 5 PM', location: 'Thomson Student Centre Atrium' },
      { title: 'Cultural Diversity Showcase', date: 'Nov 15, 2026', location: 'Arts & Culture Centre' },
    ],
  },
  {
    id: 'mun-premed-club',
    name: 'MUN Pre-Med Club',
    universitySlug: 'mun',
    university: 'Memorial University of Newfoundland',
    category: 'Academic',
    members: 340,
    description:
      'The MUN Pre-Med Club supports aspiring physicians with MCAT resources, clinical volunteering placements, medical school panels, and connections to Memorial\'s Faculty of Medicine.',
    nextEvent: 'Med School Info Night — Nov 9',
    events: [
      { title: 'Med School Info Night', date: 'Nov 9, 2026 5:30 PM', location: 'Health Sciences Centre' },
      { title: 'MCAT Strategy Workshop', date: 'Nov 23, 2026', location: 'Science Building SN-2109' },
    ],
  },

  // ── University of New Brunswick ──────────────────────────────────────────
  {
    id: 'unb-unbsu',
    name: 'University of New Brunswick Students Union (UNBSU)',
    universitySlug: 'unb',
    university: 'University of New Brunswick',
    category: 'Student Government',
    members: 9500,
    description:
      'The UNBSU is the undergraduate student government at UNB Fredericton, providing student advocacy, clubs support, health and dental coverage, and campus services for the UNB community.',
    founded: 1948,
    website: 'https://unbsu.ca',
    nextEvent: 'UNBSU Council Meeting — Nov 4',
    events: [
      { title: 'UNBSU Council Meeting', date: 'Nov 4, 2026', location: 'Student Union Building Room 105' },
      { title: 'Fall Clubs Night', date: 'Nov 18, 2026', location: 'Student Union Building' },
    ],
  },
  {
    id: 'unb-engineering-society',
    name: 'UNB Engineering Society',
    universitySlug: 'unb',
    university: 'University of New Brunswick',
    category: 'Student Government',
    members: 2100,
    description:
      "The UNB Engineering Society represents Fredericton engineering undergraduates, organising Engineering Week, the Iron Ring ceremony, design competitions, and the Engineers' Ball.",
    founded: 1920,
    nextEvent: "Engineers' Ball — Nov 21",
    events: [
      { title: "Engineers' Ball", date: 'Nov 21, 2026', location: 'Fredericton Convention Centre' },
      { title: 'E-Week Design Challenge', date: 'Nov 9, 2026', location: 'Head Hall Atrium' },
    ],
  },
  {
    id: 'unb-debate-club',
    name: 'UNB Debate Club',
    universitySlug: 'unb',
    university: 'University of New Brunswick',
    category: 'Academic',
    members: 95,
    description:
      'The UNB Debate Club participates in Atlantic and national parliamentary debate circuits, runs weekly practice sessions, and hosts debate events open to the wider UNB community.',
    nextEvent: 'Practice Session — Nov 3',
    events: [
      { title: 'Practice Session', date: 'Nov 3, 2026 7 PM', location: 'Tilley Hall 301' },
      { title: 'Atlantic Open', date: 'Nov 21–22, 2026', location: 'Tilley Hall' },
    ],
  },
  {
    id: 'unb-brunswickan',
    name: 'The Brunswickan',
    universitySlug: 'unb',
    university: 'University of New Brunswick',
    category: 'Media',
    members: 105,
    description:
      "The Brunswickan is the oldest student newspaper in Canada, founded in 1867, covering UNB campus news, Fredericton events, sports, arts, and student life in print and online.",
    founded: 1867,
    website: 'https://www.thebrunswickan.com',
    nextEvent: 'Editorial Meeting — Nov 3',
    events: [
      { title: 'Editorial Meeting', date: 'Nov 3, 2026 5 PM', location: 'Brunswickan Office, SUB Room 35' },
      { title: '157th Anniversary Celebration', date: 'Nov 14, 2026', location: 'SUB Ballroom' },
    ],
  },
  {
    id: 'unb-isa',
    name: 'UNB International Students Association',
    universitySlug: 'unb',
    university: 'University of New Brunswick',
    category: 'Cultural',
    members: 1100,
    description:
      'The UNB ISA supports international students in Fredericton through orientation programs, cultural events, immigration information sessions, and social activities across New Brunswick.',
    nextEvent: 'International Cultural Night — Nov 12',
    events: [
      { title: 'International Cultural Night', date: 'Nov 12, 2026 6 PM', location: 'Wu Conference Centre' },
      { title: 'Fredericton City Tour', date: 'Nov 1, 2026', location: 'Departing from SUB' },
    ],
  },

  // ── University of Guelph ─────────────────────────────────────────────────
  {
    id: 'guelphu-csa',
    name: 'Central Student Association (CSA)',
    universitySlug: 'guelphu',
    university: 'University of Guelph',
    category: 'Student Government',
    members: 26000,
    description:
      'The CSA is the undergraduate student government at the University of Guelph, operating student services, clubs funding, health and dental, and advocacy for all undergraduates.',
    founded: 1966,
    website: 'https://csaonline.ca',
    nextEvent: 'CSA Board Meeting — Nov 4',
    events: [
      { title: 'CSA Board Meeting', date: 'Nov 4, 2026', location: 'University Centre UC-264' },
      { title: 'Fall Clubs Night', date: 'Nov 18, 2026', location: 'University Centre Atrium' },
    ],
  },
  {
    id: 'guelphu-engineering-society',
    name: 'Guelph Engineering Society',
    universitySlug: 'guelphu',
    university: 'University of Guelph',
    category: 'Student Government',
    members: 2900,
    description:
      'The Guelph Engineering Society represents College of Engineering and Physical Sciences undergraduates, running Engineering Week, the Iron Ring ceremony, and the annual Engineers Formal.',
    founded: 1965,
    website: 'https://guelphengsoc.ca',
    nextEvent: 'Engineers Formal — Nov 22',
    events: [
      { title: 'Engineers Formal', date: 'Nov 22, 2026', location: 'Guelph Marriott Hotel' },
      { title: 'E-Week Kickoff', date: 'Nov 9, 2026', location: 'Reynolds Building Atrium' },
    ],
  },
  {
    id: 'guelphu-debate-club',
    name: 'Guelph Debate Club',
    universitySlug: 'guelphu',
    university: 'University of Guelph',
    category: 'Academic',
    members: 130,
    description:
      'The Guelph Debate Club competes in parliamentary debate circuits across Ontario and hosts weekly practice sessions and an annual invitational open to all Ontario universities.',
    nextEvent: 'Practice Session — Nov 3',
    events: [
      { title: 'Practice Session', date: 'Nov 3, 2026 7 PM', location: 'MacKinnon Building 113' },
      { title: 'Guelph Invitational', date: 'Nov 20–21, 2026', location: 'University Centre' },
    ],
  },
  {
    id: 'guelphu-ontarion',
    name: 'The Ontarion',
    universitySlug: 'guelphu',
    university: 'University of Guelph',
    category: 'Media',
    members: 115,
    description:
      "The Ontarion is the University of Guelph's independent student newspaper, published since 1962, covering campus news, Guelph events, arts, sports, and student opinion.",
    founded: 1962,
    website: 'https://theontarion.com',
    nextEvent: 'Editorial Meeting — Nov 3',
    events: [
      { title: 'Editorial Meeting', date: 'Nov 3, 2026 5 PM', location: 'Ontarion Office, UC-264' },
      { title: 'Photography Workshop', date: 'Nov 17, 2026', location: 'Ontarion Office' },
    ],
  },
  {
    id: 'guelphu-agriculture-students-association',
    name: 'Guelph Agricultural Students Association',
    universitySlug: 'guelphu',
    university: 'University of Guelph',
    category: 'Academic',
    members: 1200,
    description:
      "Guelph's Agricultural Students Association supports Ontario Agricultural College students through agri-food industry tours, networking events, and the annual OAC Formal.",
    founded: 1949,
    website: 'https://oac.uoguelph.ca/asa',
    nextEvent: 'OAC Formal — Nov 28',
    events: [
      { title: 'OAC Formal', date: 'Nov 28, 2026', location: 'Guelph Gryphons Athletics Centre' },
      { title: 'Agri-Food Industry Tour', date: 'Nov 6, 2026', location: 'Ontario Agri-Food Facility, Guelph' },
    ],
  },
  {
    id: 'guelphu-vet-students-association',
    name: 'Guelph Veterinary Students Association',
    universitySlug: 'guelphu',
    university: 'University of Guelph',
    category: 'Academic',
    members: 650,
    description:
      "The Ontario Veterinary College Student Council represents students at one of North America's top vet schools, organising clinical skills workshops, mentorship, and the annual Vet Formal.",
    founded: 1966,
    website: 'https://ovcsga.uoguelph.ca',
    nextEvent: 'Vet Formal — Nov 29',
    events: [
      { title: 'Vet Formal', date: 'Nov 29, 2026', location: 'Cutten Club, Guelph' },
      { title: 'Clinical Skills Workshop', date: 'Nov 8, 2026', location: 'OVC Anatomy Suite' },
    ],
  },

  // ── Wilfrid Laurier University ────────────────────────────────────────────
  {
    id: 'laurier-wlusu',
    name: 'Wilfrid Laurier University Students Union (WLUSU)',
    universitySlug: 'laurier',
    university: 'Wilfrid Laurier University',
    category: 'Student Government',
    members: 18000,
    description:
      'WLUSU is the undergraduate student government at Laurier, operating the Fred Nichols Campus Centre, student clubs, health and dental coverage, and advocacy across Waterloo and Brantford campuses.',
    founded: 1973,
    website: 'https://wlusu.com',
    nextEvent: 'WLUSU Board Meeting — Nov 4',
    events: [
      { title: 'WLUSU Board Meeting', date: 'Nov 4, 2026', location: 'FNCC Room 1-105' },
      { title: 'Fall Clubs Fair', date: 'Nov 18, 2026', location: 'Concourse Atrium' },
    ],
  },
  {
    id: 'laurier-business-students-association',
    name: 'Laurier Business Students Association',
    universitySlug: 'laurier',
    university: 'Wilfrid Laurier University',
    category: 'Academic',
    members: 2400,
    description:
      'The Laurier BSA connects Lazaridis School of Business students with industry through case competitions, networking nights, a mentorship program, and the annual Business Week.',
    website: 'https://laurierbsa.ca',
    nextEvent: 'Business Week Kickoff — Nov 9',
    events: [
      { title: 'Business Week Kickoff', date: 'Nov 9, 2026 12 PM', location: 'Lazaridis School Atrium' },
      { title: 'Case Competition', date: 'Nov 21, 2026', location: 'Lazaridis School' },
    ],
  },
  {
    id: 'laurier-debate-club',
    name: 'Laurier Debate Club',
    universitySlug: 'laurier',
    university: 'Wilfrid Laurier University',
    category: 'Academic',
    members: 145,
    description:
      'The Laurier Debate Club competes in Ontario and national parliamentary debate circuits and hosts public debate events and public-speaking workshops on the Waterloo campus.',
    nextEvent: 'Weekly Practice — Nov 3',
    events: [
      { title: 'Weekly Practice', date: 'Nov 3, 2026 7 PM', location: 'Arts Building 1E1' },
      { title: 'Laurier Invitational', date: 'Nov 20–21, 2026', location: 'Science Building' },
    ],
  },
  {
    id: 'laurier-the-cord',
    name: 'The Cord',
    universitySlug: 'laurier',
    university: 'Wilfrid Laurier University',
    category: 'Media',
    members: 125,
    description:
      "The Cord is Wilfrid Laurier University's independent student newspaper, published since 1926, covering campus news, Waterloo events, arts, sports, and student opinion.",
    founded: 1926,
    website: 'https://thecord.ca',
    nextEvent: 'Editorial Meeting — Nov 3',
    events: [
      { title: 'Editorial Meeting', date: 'Nov 3, 2026 5 PM', location: 'Fred Nichols Campus Centre 2-108' },
      { title: 'Multimedia Journalism Workshop', date: 'Nov 17, 2026', location: 'Cord Office' },
    ],
  },
  {
    id: 'laurier-international-students',
    name: 'Laurier International Students',
    universitySlug: 'laurier',
    university: 'Wilfrid Laurier University',
    category: 'Cultural',
    members: 1300,
    description:
      'Laurier International Students supports newcomers through orientation, cultural nights, immigration workshops, a buddy program, and social events across the Waterloo campus.',
    nextEvent: 'International Night — Nov 12',
    events: [
      { title: 'International Night', date: 'Nov 12, 2026 6 PM', location: 'Turret Nightclub, FNCC' },
      { title: 'Winter Survival Guide', date: 'Nov 4, 2026', location: 'Concourse Atrium' },
    ],
  },
  {
    id: 'laurier-accounting-students',
    name: 'Laurier Accounting Students',
    universitySlug: 'laurier',
    university: 'Wilfrid Laurier University',
    category: 'Academic',
    members: 890,
    description:
      'The Laurier Accounting Students Association prepares students for CPA designations through exam prep workshops, Big Four networking nights, and the annual Accounting Case Competition.',
    nextEvent: 'CPA Exam Prep Session — Nov 5',
    events: [
      { title: 'CPA Exam Prep Session', date: 'Nov 5, 2026 5:30 PM', location: 'Lazaridis School BA 201' },
      { title: 'Big Four Accounting Night', date: 'Nov 19, 2026', location: 'Lazaridis Atrium' },
    ],
  },

  // ── OCAD University ───────────────────────────────────────────────────────
  {
    id: 'ocadu-ocad-su',
    name: 'OCAD University Students Union (OCAD SU)',
    universitySlug: 'ocadu',
    university: 'OCAD University',
    category: 'Student Government',
    members: 4500,
    description:
      'The OCAD SU is the student government at OCAD University, supporting student clubs, advocacy, health and dental coverage, and campus programming at Canada\'s largest art and design university.',
    founded: 1968,
    website: 'https://ocadsu.org',
    nextEvent: 'OCAD SU Annual General Meeting — Nov 5',
    events: [
      { title: 'OCAD SU Annual General Meeting', date: 'Nov 5, 2026', location: '100 McCaul Street, Great Hall' },
      { title: 'Clubs and Collectives Fair', date: 'Nov 19, 2026', location: 'OCADU 100 McCaul Atrium' },
    ],
  },
  {
    id: 'ocadu-photography-society',
    name: 'OCAD Photography Society',
    universitySlug: 'ocadu',
    university: 'OCAD University',
    category: 'Arts',
    members: 280,
    description:
      'The OCAD Photography Society connects photography students through darkroom workshops, studio critiques, gallery visits, and the annual OCAD Photography Exhibition at 100 McCaul.',
    nextEvent: 'Darkroom Workshop — Nov 6',
    events: [
      { title: 'Darkroom Workshop', date: 'Nov 6, 2026 4 PM', location: 'OCAD Photography Studio, Room 236' },
      { title: 'Annual Photography Exhibition', date: 'Dec 3, 2026', location: 'OCADU Student Gallery' },
    ],
  },
  {
    id: 'ocadu-illustration-club',
    name: 'OCAD Illustration Club',
    universitySlug: 'ocadu',
    university: 'OCAD University',
    category: 'Arts',
    members: 220,
    description:
      'The OCAD Illustration Club brings together illustration students for life drawing sessions, portfolio reviews, publisher talks, and the annual Illustration Zine Exchange.',
    nextEvent: 'Life Drawing Session — Nov 4',
    events: [
      { title: 'Life Drawing Session', date: 'Nov 4, 2026 5 PM', location: 'OCADU Drawing Studio, Room 510' },
      { title: 'Portfolio Review Night', date: 'Nov 18, 2026', location: 'OCADU Illustration Department' },
    ],
  },
  {
    id: 'ocadu-graphic-design-students',
    name: 'OCAD Graphic Design Students',
    universitySlug: 'ocadu',
    university: 'OCAD University',
    category: 'Academic',
    members: 310,
    description:
      'OCAD Graphic Design Students connects design undergraduates through portfolio crits, industry speaker series, type workshops, and the annual Grad Show design showcase.',
    nextEvent: 'Type Workshop — Nov 7',
    events: [
      { title: 'Type Workshop', date: 'Nov 7, 2026 4 PM', location: 'OCADU Design Studio, Room 410' },
      { title: 'Industry Talk: Pentagram', date: 'Nov 21, 2026', location: 'OCAD Great Hall' },
    ],
  },
  {
    id: 'ocadu-game-arts-club',
    name: 'OCAD Game Arts Club',
    universitySlug: 'ocadu',
    university: 'OCAD University',
    category: 'Tech',
    members: 195,
    description:
      'The OCAD Game Arts Club unites game design and digital futures students through game jams, playtesting sessions, industry visits, and participation in the Global Game Jam.',
    nextEvent: 'OCAD Game Jam — Nov 14',
    events: [
      { title: 'OCAD Game Jam', date: 'Nov 14–16, 2026', location: 'OCADU Digital Futures Studio' },
      { title: 'Indie Dev Talk Series', date: 'Nov 7, 2026 4 PM', location: 'OCADU Room 230' },
    ],
  },

  // ── BCIT ─────────────────────────────────────────────────────────────────
  {
    id: 'bcit-bcitsa',
    name: 'BCIT Student Association (BCITSA)',
    universitySlug: 'bcit',
    university: 'British Columbia Institute of Technology',
    category: 'Student Government',
    members: 55000,
    description:
      'The BCITSA is the student association at BCIT, representing all full- and part-time students, operating the SE12 Building, student services, clubs, health plan, and campus events.',
    founded: 1956,
    website: 'https://bcitsa.ca',
    nextEvent: 'BCITSA Council Meeting — Nov 4',
    events: [
      { title: 'BCITSA Council Meeting', date: 'Nov 4, 2026', location: 'SE12 Room 100' },
      { title: 'Fall Clubs Day', date: 'Nov 18, 2026', location: 'SE12 Gymnasium' },
    ],
  },
  {
    id: 'bcit-engineering-club',
    name: 'BCIT Engineering Club',
    universitySlug: 'bcit',
    university: 'British Columbia Institute of Technology',
    category: 'Academic',
    members: 620,
    description:
      'The BCIT Engineering Club connects civil, mechanical, and electrical technology students through design projects, industry site tours, technical workshops, and networking events.',
    nextEvent: 'Structural Design Challenge — Nov 8',
    events: [
      { title: 'Structural Design Challenge', date: 'Nov 8, 2026', location: 'NE Building Workshop' },
      { title: 'Industry Site Tour', date: 'Nov 22, 2026', location: 'Vancouver Metro Construction Site' },
    ],
  },
  {
    id: 'bcit-it-club',
    name: 'BCIT IT Club',
    universitySlug: 'bcit',
    university: 'British Columbia Institute of Technology',
    category: 'Tech',
    members: 480,
    description:
      'The BCIT IT Club supports computing and network technology students through hackathons, cybersecurity workshops, coding challenges, and industry networking events across Metro Vancouver.',
    nextEvent: 'Cybersecurity CTF Challenge — Nov 9',
    events: [
      { title: 'Cybersecurity CTF Challenge', date: 'Nov 9, 2026', location: 'SW1 Computer Lab' },
      { title: 'Hackathon — BrainHack BCIT', date: 'Nov 22–23, 2026', location: 'NW4 Building' },
    ],
  },

  // ── Seneca Polytechnic ────────────────────────────────────────────────────
  {
    id: 'seneca-student-federation',
    name: 'Seneca Student Federation',
    universitySlug: 'seneca',
    university: 'Seneca Polytechnic',
    category: 'Student Government',
    members: 30000,
    description:
      'The Seneca Student Federation represents students across all Seneca campuses, providing student advocacy, clubs support, health and dental coverage, and campus services in the GTA.',
    founded: 1970,
    website: 'https://theseneca.ca',
    nextEvent: 'SSF Council Meeting — Nov 4',
    events: [
      { title: 'SSF Council Meeting', date: 'Nov 4, 2026', location: 'Newnham Campus Student Centre' },
      { title: 'Fall Clubs and Societies Fair', date: 'Nov 18, 2026', location: 'Newnham Campus Atrium' },
    ],
  },
  {
    id: 'seneca-tech-club',
    name: 'Seneca Tech Club',
    universitySlug: 'seneca',
    university: 'Seneca Polytechnic',
    category: 'Tech',
    members: 380,
    description:
      'The Seneca Tech Club brings together software development, cybersecurity, and IT students through hackathons, coding workshops, industry guest talks, and collaborative project teams.',
    nextEvent: 'Seneca Hackathon — Nov 15',
    events: [
      { title: 'Seneca Hackathon', date: 'Nov 15–16, 2026', location: 'Newnham Campus T Building' },
      { title: 'Web Dev Workshop', date: 'Nov 4, 2026 5 PM', location: 'Seneca Labs T-2021' },
    ],
  },
  {
    id: 'seneca-business-society',
    name: 'Seneca Business Society',
    universitySlug: 'seneca',
    university: 'Seneca Polytechnic',
    category: 'Academic',
    members: 560,
    description:
      'The Seneca Business Society connects business and accounting students with industry through case competitions, networking nights, mentorship with Seneca alumni, and the annual Business Week.',
    nextEvent: 'Business Week Kickoff — Nov 9',
    events: [
      { title: 'Business Week Kickoff', date: 'Nov 9, 2026 12 PM', location: 'Seneca Business School Atrium' },
      { title: 'Alumni Networking Night', date: 'Nov 25, 2026', location: 'King Campus Boardroom' },
    ],
  },

  // ── Humber Polytechnic ────────────────────────────────────────────────────
  {
    id: 'humber-students-federation',
    name: "Humber Students' Federation",
    universitySlug: 'humber',
    university: 'Humber Polytechnic',
    category: 'Student Government',
    members: 28000,
    description:
      "The Humber Students' Federation represents students at all Humber campuses, providing student advocacy, clubs support, health and dental coverage, and campus programming in the GTA.",
    founded: 1969,
    website: 'https://humberstudents.ca',
    nextEvent: 'HSF Council Meeting — Nov 4',
    events: [
      { title: 'HSF Council Meeting', date: 'Nov 4, 2026', location: 'North Campus Student Centre' },
      { title: 'Fall Clubs Fair', date: 'Nov 18, 2026', location: 'North Campus Main Street' },
    ],
  },
  {
    id: 'humber-media-arts-club',
    name: 'Humber Media Arts Club',
    universitySlug: 'humber',
    university: 'Humber Polytechnic',
    category: 'Arts',
    members: 310,
    description:
      'The Humber Media Arts Club supports film, photography, journalism, and digital media students through screenings, portfolio workshops, industry visits, and an annual student media showcase.',
    nextEvent: 'Student Media Showcase — Nov 14',
    events: [
      { title: 'Student Media Showcase', date: 'Nov 14, 2026 5 PM', location: 'Humber Lakeshore Campus Cinema' },
      { title: 'Documentary Workshop', date: 'Nov 5, 2026', location: 'Media Arts Studio B' },
    ],
  },
  {
    id: 'humber-business-club',
    name: 'Humber Business Club',
    universitySlug: 'humber',
    university: 'Humber Polytechnic',
    category: 'Academic',
    members: 490,
    description:
      'The Humber Business Club connects business administration and marketing students with GTA industry through case competitions, networking events, and the annual Humber Business Challenge.',
    nextEvent: 'Humber Business Challenge — Nov 20',
    events: [
      { title: 'Humber Business Challenge', date: 'Nov 20, 2026', location: 'Business School A Building' },
      { title: 'Industry Panel Night', date: 'Nov 6, 2026 5 PM', location: 'North Campus LRC Auditorium' },
    ],
  },

  // ── George Brown College ──────────────────────────────────────────────────
  {
    id: 'georgebrown-gsa',
    name: 'George Brown Student Association',
    universitySlug: 'georgebrown',
    university: 'George Brown College',
    category: 'Student Government',
    members: 33000,
    description:
      'The George Brown Student Association represents students across St. James, Casa Loma, and Waterfront campuses, providing advocacy, clubs support, and student services in downtown Toronto.',
    founded: 1971,
    website: 'https://gsa.georgebrown.ca',
    nextEvent: 'GSA Council Meeting — Nov 4',
    events: [
      { title: 'GSA Council Meeting', date: 'Nov 4, 2026', location: 'St. James Campus Room 230' },
      { title: 'Clubs and Activities Fair', date: 'Nov 18, 2026', location: 'Casa Loma Campus Main Hall' },
    ],
  },
  {
    id: 'georgebrown-culinary-club',
    name: 'GBC Culinary Club',
    universitySlug: 'georgebrown',
    university: 'George Brown College',
    category: 'Academic',
    members: 420,
    description:
      "The George Brown Culinary Club celebrates food culture through chef demonstrations, pop-up dinners, visits to Toronto's best restaurants, and industry networking for hospitality students.",
    nextEvent: 'Chef Demo Night — Nov 7',
    events: [
      { title: 'Chef Demo Night', date: 'Nov 7, 2026 5 PM', location: 'Waterfront Campus Chef School Kitchen' },
      { title: 'Student Pop-Up Dinner', date: 'Nov 21, 2026', location: 'Waterfront Campus Dining Room' },
    ],
  },
  {
    id: 'georgebrown-ece-society',
    name: 'GBC Early Childhood Education Society',
    universitySlug: 'georgebrown',
    university: 'George Brown College',
    category: 'Academic',
    members: 280,
    description:
      'The GBC ECE Society supports Early Childhood Education students through practicum prep workshops, resource sharing, peer mentorship, and advocacy for the ECE profession in Ontario.',
    nextEvent: 'ECE Career Night — Nov 10',
    events: [
      { title: 'ECE Career Night', date: 'Nov 10, 2026 5 PM', location: 'St. James Campus Room 118-D' },
      { title: 'Practicum Prep Workshop', date: 'Nov 24, 2026', location: 'Child Development Centre' },
    ],
  },

  // ── Algonquin College ─────────────────────────────────────────────────────
  {
    id: 'algonquin-students-association',
    name: 'Algonquin Students Association',
    universitySlug: 'algonquin',
    university: 'Algonquin College',
    category: 'Student Government',
    members: 18000,
    description:
      'The Algonquin Students Association represents students at all Algonquin College campuses, providing advocacy, clubs support, health and dental coverage, and campus services in Ottawa.',
    founded: 1967,
    website: 'https://algonquinsa.com',
    nextEvent: 'ASA Board Meeting — Nov 4',
    events: [
      { title: 'ASA Board Meeting', date: 'Nov 4, 2026', location: 'Student Commons SA Building' },
      { title: 'Fall Clubs Fair', date: 'Nov 18, 2026', location: 'Marketplace Food Court' },
    ],
  },
  {
    id: 'algonquin-media-design-club',
    name: 'Algonquin Media and Design Club',
    universitySlug: 'algonquin',
    university: 'Algonquin College',
    category: 'Arts',
    members: 260,
    description:
      'The Algonquin Media and Design Club connects graphic design, advertising, and media communications students through portfolio workshops, design jams, and industry field trips in Ottawa.',
    nextEvent: 'Design Jam — Nov 8',
    events: [
      { title: 'Design Jam', date: 'Nov 8, 2026 2 PM', location: 'Centre for Construction Excellence D Building' },
      { title: 'Portfolio Review Night', date: 'Nov 22, 2026', location: 'Algonquin Design Studio' },
    ],
  },
  {
    id: 'algonquin-business-club',
    name: 'Algonquin Business Club',
    universitySlug: 'algonquin',
    university: 'Algonquin College',
    category: 'Academic',
    members: 380,
    description:
      'The Algonquin Business Club supports business administration, marketing, and accounting students through case competitions, networking events, and speaker nights with Ottawa business leaders.',
    nextEvent: 'Ottawa Business Speaker Night — Nov 10',
    events: [
      { title: 'Ottawa Business Speaker Night', date: 'Nov 10, 2026 5 PM', location: 'Algonquin Commons Theatre' },
      { title: 'Business Case Competition', date: 'Nov 21, 2026', location: 'P Building Boardroom' },
    ],
  },
]
