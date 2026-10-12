import type { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { JsonLd } from '@/components/seo/JsonLd'
import { SiteNav } from '@/components/layout/SiteNav'
import { SiteFooter } from '@/components/layout/SiteFooter'
import { Breadcrumbs } from '@/components/ui/Breadcrumbs'
import { FaqAccordion, type FaqItem } from '@/components/ui/FaqAccordion'
import styles from './school.module.css'

interface School {
  slug: string
  name: string
  shortName: string
  city: string
  province: string
  type: string
  founded: number
  enrolment: number
  programmes: number
  tuitionMin: number
  tuitionMax: number
  verified: boolean
  lastUpdated: string
  description: string
  rankings: { macleans: number; times: number; qs: number }
  faculties: string[]
  website: string
  logoUrl: string | null
}

const SCHOOLS: Record<string, School> = {
  ubc: {
    slug: 'ubc',
    name: 'University of British Columbia',
    shortName: 'UBC',
    city: 'Vancouver',
    province: 'BC',
    type: 'University',
    founded: 1908,
    enrolment: 68000,
    programmes: 300,
    tuitionMin: 5500,
    tuitionMax: 42000,
    verified: true,
    lastUpdated: '2026-10',
    description:
      `One of Canada's top research universities, UBC spans two campuses in Vancouver and Kelowna. Known for its world-class faculty, ocean-to-sky setting, and bilingual research output.`,
    rankings: { macleans: 3, times: 34, qs: 38 },
    faculties: ['Arts', 'Science', 'Commerce', 'Engineering', 'Law', 'Medicine', 'Forestry'],
    website: 'https://ubc.ca',
    logoUrl: 'https://upload.wikimedia.org/wikipedia/en/thumb/8/83/University_of_British_Columbia_coat_of_arms.svg/120px-University_of_British_Columbia_coat_of_arms.svg.png',
  },
  sfu: {
    slug: 'sfu',
    name: 'Simon Fraser University',
    shortName: 'SFU',
    city: 'Burnaby',
    province: 'BC',
    type: 'University',
    founded: 1965,
    enrolment: 35000,
    programmes: 200,
    tuitionMin: 5200,
    tuitionMax: 38000,
    verified: true,
    lastUpdated: '2026-10',
    description:
      `SFU is a Canadian public research university in Metro Vancouver. Its Burnaby mountain campus is an architectural landmark, and it consistently ranks among the top comprehensive universities in Canada.`,
    rankings: { macleans: 2, times: 251, qs: 328 },
    faculties: ['Arts & Social Sciences', 'Science', 'Business', 'Communication', 'Education', 'Engineering', 'Health Sciences'],
    website: 'https://sfu.ca',
    logoUrl: null,
  },
  uoft: {
    slug: 'uoft',
    name: 'University of Toronto',
    shortName: 'U of T',
    city: 'Toronto',
    province: 'ON',
    type: 'University',
    founded: 1827,
    enrolment: 97000,
    programmes: 700,
    tuitionMin: 6100,
    tuitionMax: 58000,
    verified: true,
    lastUpdated: '2026-10',
    description:
      `Canada's largest university and a global top-25 research institution. Three campuses across the Greater Toronto Area. Home to groundbreaking research in AI, medicine, and public policy.`,
    rankings: { macleans: 1, times: 21, qs: 25 },
    faculties: ['Arts & Science', 'Engineering', 'Rotman Commerce', 'Law', 'Medicine', 'Education', 'Architecture'],
    website: 'https://utoronto.ca',
    logoUrl: 'https://upload.wikimedia.org/wikipedia/en/thumb/a/a6/University_of_Toronto_coat_of_arms.svg/120px-University_of_Toronto_coat_of_arms.svg.png',
  },
  mcgill: {
    slug: 'mcgill',
    name: 'McGill University',
    shortName: 'McGill',
    city: 'Montréal',
    province: 'QC',
    type: 'University',
    founded: 1821,
    enrolment: 40000,
    programmes: 300,
    tuitionMin: 4338,
    tuitionMax: 27000,
    verified: true,
    lastUpdated: '2026-10',
    description:
      `McGill is one of Canada's most distinguished universities, renowned for its research in medicine, law, and natural sciences. Located in bilingual Montréal, it draws students from over 150 countries.`,
    rankings: { macleans: 4, times: 46, qs: 30 },
    faculties: ['Arts', 'Science', 'Medicine', 'Law', 'Engineering', 'Education', 'Management', 'Music'],
    website: 'https://mcgill.ca',
    logoUrl: 'https://upload.wikimedia.org/wikipedia/en/thumb/3/3b/McGill_University_CoA.svg/120px-McGill_University_CoA.svg.png',
  },
  uwaterloo: {
    slug: 'uwaterloo',
    name: 'University of Waterloo',
    shortName: 'Waterloo',
    city: 'Waterloo',
    province: 'ON',
    type: 'University',
    founded: 1959,
    enrolment: 42000,
    programmes: 250,
    tuitionMin: 6700,
    tuitionMax: 39000,
    verified: true,
    lastUpdated: '2026-10',
    description:
      `Home to the world's largest co-operative education program, Waterloo is a global leader in computer science, engineering, and mathematics. Its graduates are among the most recruited in tech.`,
    rankings: { macleans: 6, times: 201, qs: 173 },
    faculties: ['Mathematics', 'Engineering', 'Science', 'Arts', 'Environment', 'Health', 'Applied Health Sciences'],
    website: 'https://uwaterloo.ca',
    logoUrl: 'https://upload.wikimedia.org/wikipedia/en/thumb/f/f3/University_of_Waterloo_seal.svg/120px-University_of_Waterloo_seal.svg.png',
  },
  queens: {
    slug: 'queens',
    name: "Queen's University",
    shortName: "Queen's",
    city: 'Kingston',
    province: 'ON',
    type: 'University',
    founded: 1841,
    enrolment: 25000,
    programmes: 200,
    tuitionMin: 6500,
    tuitionMax: 50000,
    verified: true,
    lastUpdated: '2026-10',
    description:
      "One of Canada's oldest and most respected universities, Queen's offers a close-knit campus community in Kingston, Ontario. Smith School of Business and the Faculty of Law are among its most acclaimed.",
    rankings: { macleans: 5, times: 401, qs: 561 },
    faculties: ['Arts & Science', 'Engineering', 'Smith Commerce', 'Law', 'Education', 'Health Sciences', 'Computing'],
    website: 'https://queensu.ca',
    logoUrl: 'https://upload.wikimedia.org/wikipedia/en/thumb/8/8b/Queens_University_CoA.svg/120px-Queens_University_CoA.svg.png',
  },
  ualberta: {
    slug: 'ualberta',
    name: 'University of Alberta',
    shortName: 'U of A',
    city: 'Edmonton',
    province: 'AB',
    type: 'University',
    founded: 1908,
    enrolment: 40000,
    programmes: 400,
    tuitionMin: 5600,
    tuitionMax: 30000,
    verified: true,
    lastUpdated: '2026-10',
    description:
      `A leading Canadian research university, the University of Alberta is ranked among the top five in Canada. It excels in energy research, agriculture, and Indigenous studies, with strong co-op programs.`,
    rankings: { macleans: 7, times: 110, qs: 111 },
    faculties: ['Arts', 'Science', 'Engineering', 'Business', 'Law', 'Medicine', 'Education', 'Agriculture'],
    website: 'https://ualberta.ca',
    logoUrl: 'https://upload.wikimedia.org/wikipedia/en/thumb/a/a6/University_of_Alberta_coat_of_arms.svg/120px-University_of_Alberta_coat_of_arms.svg.png',
  },
  uvic: {
    slug: 'uvic',
    name: 'University of Victoria',
    shortName: 'UVic',
    city: 'Victoria',
    province: 'BC',
    type: 'University',
    founded: 1963,
    enrolment: 22000,
    programmes: 160,
    tuitionMin: 5660,
    tuitionMax: 31000,
    verified: true,
    lastUpdated: '2026-10',
    description:
      `UVic is a leading research university on southern Vancouver Island. Known for its co-op programs, ocean and climate science, and a commitment to reconciliation with Indigenous peoples.`,
    rankings: { macleans: 8, times: 601, qs: 651 },
    faculties: ['Humanities', 'Science', 'Engineering', 'Business', 'Law', 'Education', 'Social Sciences', 'Fine Arts'],
    website: 'https://uvic.ca',
    logoUrl: null,
  },
  dal: {
    slug: 'dal',
    name: 'Dalhousie University',
    shortName: 'Dal',
    city: 'Halifax',
    province: 'NS',
    type: 'University',
    founded: 1818,
    enrolment: 19000,
    programmes: 180,
    tuitionMin: 9000,
    tuitionMax: 24000,
    verified: true,
    lastUpdated: '2026-10',
    description:
      "Dalhousie is Atlantic Canada's leading research-intensive university, known for ocean sciences, law, and medicine. Halifax offers a vibrant, affordable student experience on Canada's East Coast.",
    rankings: { macleans: 11, times: 601, qs: 701 },
    faculties: ['Arts & Social Sciences', 'Science', 'Engineering', 'Management', 'Law', 'Medicine', 'Health'],
    website: 'https://dal.ca',
    logoUrl: null,
  },
  bcit: {
    slug: 'bcit',
    name: 'British Columbia Institute of Technology',
    shortName: 'BCIT',
    city: 'Burnaby',
    province: 'BC',
    type: 'Institute of Technology',
    founded: 1964,
    enrolment: 48000,
    programmes: 150,
    tuitionMin: 4500,
    tuitionMax: 20000,
    verified: true,
    lastUpdated: '2026-10',
    description:
      `BCIT is BC's largest post-secondary institution, offering applied and technical training that leads directly to careers. High employment rates and industry partnerships make it a top choice for career-focused students.`,
    rankings: { macleans: 0, times: 0, qs: 0 },
    faculties: ['Applied & Natural Sciences', 'Business & Media', 'Computing & IT', 'Engineering', 'Health Sciences', 'Trades & Apprenticeship'],
    website: 'https://bcit.ca',
    logoUrl: null,
  },
  seneca: {
    slug: 'seneca',
    name: 'Seneca Polytechnic',
    shortName: 'Seneca',
    city: 'Toronto',
    province: 'ON',
    type: 'College',
    founded: 1967,
    enrolment: 35000,
    programmes: 300,
    tuitionMin: 3800,
    tuitionMax: 18500,
    verified: true,
    lastUpdated: '2026-10',
    description:
      "Seneca Polytechnic is one of Canada's largest colleges, serving students across multiple Toronto-area campuses. Its business, technology, and animation programs enjoy strong industry reputations.",
    rankings: { macleans: 0, times: 0, qs: 0 },
    faculties: ['Business', 'Computing & IT', 'Engineering Technology', 'Communication Arts', 'Health Sciences', 'Liberal Arts'],
    website: 'https://senecapolytechnic.ca',
    logoUrl: null,
  },
  humber: {
    slug: 'humber',
    name: 'Humber College',
    shortName: 'Humber',
    city: 'Etobicoke',
    province: 'ON',
    type: 'College',
    founded: 1967,
    enrolment: 30000,
    programmes: 250,
    tuitionMin: 3700,
    tuitionMax: 17800,
    verified: true,
    lastUpdated: '2026-10',
    description:
      "Humber is one of Ontario's largest polytechnics, offering a blend of college credentials and degree pathways. Located in Toronto's west end, it is known for creative arts, business, and social service programs.",
    rankings: { macleans: 0, times: 0, qs: 0 },
    faculties: ['Business', 'Health Sciences', 'Liberal Arts & Sciences', 'Media Studies', 'Social & Community Services', 'Technology'],
    website: 'https://humber.ca',
    logoUrl: null,
  },

  // --- Expanded institutions ---

  western: {
    slug: 'western',
    name: 'University of Western Ontario',
    shortName: 'Western',
    city: 'London',
    province: 'ON',
    type: 'University',
    founded: 1878,
    enrolment: 32000,
    programmes: 400,
    tuitionMin: 7500,
    tuitionMax: 36000,
    verified: true,
    lastUpdated: '2026-10',
    description:
      `Western University in London, Ontario is a leading medical-doctoral research institution known for the Ivey Business School, outstanding law and medical programs, and a vibrant campus life. It ranks consistently among the top ten universities in Canada.`,
    rankings: { macleans: 9, times: 251, qs: 203 },
    faculties: ['Arts & Humanities', 'Science', 'Engineering', 'Ivey Business', 'Law', 'Medicine & Dentistry', 'Education', 'Social Science', 'Music'],
    website: 'https://uwo.ca',
    logoUrl: 'https://upload.wikimedia.org/wikipedia/en/thumb/4/4c/Western_University_London_Ontario_coat_of_arms.svg/120px-Western_University_London_Ontario_coat_of_arms.svg.png',
  },
  mcmaster: {
    slug: 'mcmaster',
    name: 'McMaster University',
    shortName: 'McMaster',
    city: 'Hamilton',
    province: 'ON',
    type: 'University',
    founded: 1887,
    enrolment: 37000,
    programmes: 300,
    tuitionMin: 7700,
    tuitionMax: 40000,
    verified: true,
    lastUpdated: '2026-10',
    description:
      `McMaster University in Hamilton, Ontario is globally recognized for its problem-based learning model, pioneered in its Faculty of Health Sciences. The DeGroote School of Business and Faculty of Engineering are among the strongest in Canada.`,
    rankings: { macleans: 6, times: 101, qs: 189 },
    faculties: ['Science', 'Engineering', 'DeGroote Business', 'Humanities', 'Social Sciences', 'Health Sciences'],
    website: 'https://mcmaster.ca',
    logoUrl: 'https://upload.wikimedia.org/wikipedia/en/thumb/0/0a/McMaster_University_logo.svg/120px-McMaster_University_logo.svg.png',
  },
  ucalgary: {
    slug: 'ucalgary',
    name: 'University of Calgary',
    shortName: 'UCalgary',
    city: 'Calgary',
    province: 'AB',
    type: 'University',
    founded: 1966,
    enrolment: 33000,
    programmes: 250,
    tuitionMin: 6800,
    tuitionMax: 28000,
    verified: true,
    lastUpdated: '2026-10',
    description:
      `The University of Calgary is a dynamic research university in Canada's energy capital. Its Haskayne School of Business and Schulich School of Engineering are highly regarded, and its proximity to the Rockies supports strong environmental and geoscience research.`,
    rankings: { macleans: 12, times: 201, qs: 235 },
    faculties: ['Arts', 'Science', 'Engineering', 'Haskayne Business', 'Law', 'Medicine', 'Education', 'Social Work', 'Kinesiology'],
    website: 'https://ucalgary.ca',
    logoUrl: 'https://upload.wikimedia.org/wikipedia/en/thumb/1/16/University_of_Calgary_arms.svg/120px-University_of_Calgary_arms.svg.png',
  },
  umanitoba: {
    slug: 'umanitoba',
    name: 'University of Manitoba',
    shortName: 'U of M',
    city: 'Winnipeg',
    province: 'MB',
    type: 'University',
    founded: 1877,
    enrolment: 32000,
    programmes: 100,
    tuitionMin: 4500,
    tuitionMax: 17000,
    verified: true,
    lastUpdated: '2026-10',
    description:
      `The University of Manitoba is western Canada's first university, offering a comprehensive range of undergraduate and graduate programs. It is a major research institution with strengths in agriculture, medicine, and Indigenous studies.`,
    rankings: { macleans: 16, times: 601, qs: 0 },
    faculties: ['Arts', 'Science', 'Engineering', 'Business', 'Law', 'Medicine', 'Education', 'Architecture'],
    website: 'https://umanitoba.ca',
    logoUrl: null,
  },
  usask: {
    slug: 'usask',
    name: 'University of Saskatchewan',
    shortName: 'USask',
    city: 'Saskatoon',
    province: 'SK',
    type: 'University',
    founded: 1907,
    enrolment: 24000,
    programmes: 200,
    tuitionMin: 7200,
    tuitionMax: 24000,
    verified: true,
    lastUpdated: '2026-10',
    description:
      `USask is Saskatchewan's flagship research university, globally recognized for plant sciences, agriculture, and veterinary medicine. Its synchrotron facility — the Canadian Light Source — is a national research landmark.`,
    rankings: { macleans: 13, times: 601, qs: 0 },
    faculties: ['Arts & Science', 'Engineering', 'Edwards Business', 'Law', 'Medicine', 'Education', 'Agriculture', 'Veterinary Medicine'],
    website: 'https://usask.ca',
    logoUrl: null,
  },
  uottawa: {
    slug: 'uottawa',
    name: 'University of Ottawa',
    shortName: 'uOttawa',
    city: 'Ottawa',
    province: 'ON',
    type: 'University',
    founded: 1848,
    enrolment: 44000,
    programmes: 450,
    tuitionMin: 6400,
    tuitionMax: 32000,
    verified: true,
    lastUpdated: '2026-10',
    description:
      `The University of Ottawa is the world's largest bilingual (French-English) university, located in the heart of Canada's capital. The Telfer School of Management, Faculty of Law, and Faculty of Medicine are highly respected across the country.`,
    rankings: { macleans: 11, times: 401, qs: 273 },
    faculties: ['Arts', 'Science', 'Engineering', 'Telfer Business', 'Law', 'Medicine', 'Education', 'Social Sciences', 'Health Sciences'],
    website: 'https://uottawa.ca',
    logoUrl: 'https://upload.wikimedia.org/wikipedia/en/thumb/6/6f/University_of_Ottawa_coat_of_arms.svg/120px-University_of_Ottawa_coat_of_arms.svg.png',
  },
  carleton: {
    slug: 'carleton',
    name: 'Carleton University',
    shortName: 'Carleton',
    city: 'Ottawa',
    province: 'ON',
    type: 'University',
    founded: 1942,
    enrolment: 30000,
    programmes: 250,
    tuitionMin: 6400,
    tuitionMax: 30000,
    verified: true,
    lastUpdated: '2026-10',
    description:
      `Carleton University in Ottawa is known for its journalism, public affairs, engineering, and computer science programs. Its location in the capital provides unique access to government, media, and technology industries.`,
    rankings: { macleans: 14, times: 601, qs: 0 },
    faculties: ['Arts & Social Sciences', 'Science', 'Engineering & Design', 'Sprott Business', 'Law', 'Public Affairs', 'Architecture & Urbanism'],
    website: 'https://carleton.ca',
    logoUrl: null,
  },
  concordia: {
    slug: 'concordia',
    name: 'Concordia University',
    shortName: 'Concordia',
    city: 'Montréal',
    province: 'QC',
    type: 'University',
    founded: 1974,
    enrolment: 51000,
    programmes: 300,
    tuitionMin: 3500,
    tuitionMax: 24000,
    verified: true,
    lastUpdated: '2026-10',
    description:
      `Concordia University is a comprehensive English-language university in the heart of Montréal, one of North America's most vibrant cities for arts and culture. Its John Molson School of Business and Faculty of Fine Arts are internationally recognized.`,
    rankings: { macleans: 0, times: 601, qs: 0 },
    faculties: ['Arts & Science', 'Engineering & Computer Science', 'Fine Arts', 'John Molson Business'],
    website: 'https://concordia.ca',
    logoUrl: null,
  },
  yorku: {
    slug: 'yorku',
    name: 'York University',
    shortName: 'York',
    city: 'Toronto',
    province: 'ON',
    type: 'University',
    founded: 1959,
    enrolment: 55000,
    programmes: 300,
    tuitionMin: 7000,
    tuitionMax: 32000,
    verified: true,
    lastUpdated: '2026-10',
    description:
      `York University is one of Canada's largest universities, offering diverse programs across multiple faculties in Toronto. The Schulich School of Business is ranked among the top business schools in Canada and internationally.`,
    rankings: { macleans: 0, times: 601, qs: 0 },
    faculties: ['Liberal Arts & Professional Studies', 'Schulich Business', 'Lassonde Engineering', 'Science', 'Osgoode Law', 'Education', 'Health', 'Fine Arts & Media'],
    website: 'https://yorku.ca',
    logoUrl: null,
  },
  ryerson: {
    slug: 'ryerson',
    name: 'Toronto Metropolitan University',
    shortName: 'TMU',
    city: 'Toronto',
    province: 'ON',
    type: 'University',
    founded: 1948,
    enrolment: 42000,
    programmes: 150,
    tuitionMin: 7600,
    tuitionMax: 31000,
    verified: true,
    lastUpdated: '2026-10',
    description:
      `Toronto Metropolitan University (formerly Ryerson) is a career-focused university in downtown Toronto, offering programs closely tied to professional practice. Its School of Engineering and Ted Rogers School of Management are particularly well regarded.`,
    rankings: { macleans: 0, times: 0, qs: 0 },
    faculties: ['Arts', 'Science', 'Engineering & Architectural Science', 'Lincoln Alexander Law', 'Ted Rogers Business', 'Community Services'],
    website: 'https://torontomu.ca',
    logoUrl: null,
  },
  udem: {
    slug: 'udem',
    name: 'Université de Montréal',
    shortName: 'UdeM',
    city: 'Montréal',
    province: 'QC',
    type: 'University',
    founded: 1878,
    enrolment: 66000,
    programmes: 650,
    tuitionMin: 4500,
    tuitionMax: 25000,
    verified: true,
    lastUpdated: '2026-10',
    description:
      `Université de Montréal is the largest French-language university in Canada and one of the top research universities in North America. Its affiliated schools — HEC Montréal (business) and Polytechnique Montréal (engineering) — are leading institutions in their fields.`,
    rankings: { macleans: 0, times: 201, qs: 141 },
    faculties: ['Arts & Sciences', 'Education', 'Law', 'Medicine', 'Pharmacy', 'Dentistry', 'Music', 'Social Sciences'],
    website: 'https://umontreal.ca',
    logoUrl: null,
  },
  laval: {
    slug: 'laval',
    name: 'Université Laval',
    shortName: 'Laval',
    city: 'Québec City',
    province: 'QC',
    type: 'University',
    founded: 1663,
    enrolment: 43000,
    programmes: 500,
    tuitionMin: 4200,
    tuitionMax: 22000,
    verified: true,
    lastUpdated: '2026-10',
    description:
      `Université Laval is the oldest institution of higher learning in Canada, tracing its roots to the Séminaire de Québec founded in 1663. A comprehensive research university, it is a leader in forestry, agriculture, and French-language legal studies.`,
    rankings: { macleans: 0, times: 401, qs: 0 },
    faculties: ['Arts & Social Sciences', 'Science & Engineering', 'Law', 'Medicine', 'Education', 'Agriculture & Food Science', 'Architecture', 'Business'],
    website: 'https://ulaval.ca',
    logoUrl: null,
  },
  usherbrooke: {
    slug: 'usherbrooke',
    name: 'Université de Sherbrooke',
    shortName: 'UdeS',
    city: 'Sherbrooke',
    province: 'QC',
    type: 'University',
    founded: 1954,
    enrolment: 32000,
    programmes: 150,
    tuitionMin: 4000,
    tuitionMax: 22000,
    verified: true,
    lastUpdated: '2026-10',
    description:
      `Université de Sherbrooke is a comprehensive French-language university in Quebec's Eastern Townships, widely known for its pioneering co-operative education model across all faculties. Its medical and law schools are highly regarded.`,
    rankings: { macleans: 0, times: 0, qs: 0 },
    faculties: ['Arts & Social Sciences', 'Sciences', 'Engineering', 'Law', 'Medicine', 'Education', 'Business', 'Physical Activity Sciences'],
    website: 'https://usherbrooke.ca',
    logoUrl: null,
  },
  uqam: {
    slug: 'uqam',
    name: 'UQAM — Université du Québec à Montréal',
    shortName: 'UQAM',
    city: 'Montréal',
    province: 'QC',
    type: 'University',
    founded: 1969,
    enrolment: 40000,
    programmes: 300,
    tuitionMin: 3000,
    tuitionMax: 22000,
    verified: true,
    lastUpdated: '2026-10',
    description:
      `UQAM is a major French-language research university in the heart of Montréal, known for its progressive academic culture and strengths in communication, fine arts, political science, and environmental sciences.`,
    rankings: { macleans: 0, times: 0, qs: 0 },
    faculties: ['Arts', 'Science', 'Political Science & Law', 'Communication', 'Education', 'Languages & Linguistics'],
    website: 'https://uqam.ca',
    logoUrl: null,
  },
  stfx: {
    slug: 'stfx',
    name: 'St. Francis Xavier University',
    shortName: 'StFX',
    city: 'Antigonish',
    province: 'NS',
    type: 'University',
    founded: 1853,
    enrolment: 5000,
    programmes: 100,
    tuitionMin: 10000,
    tuitionMax: 20000,
    verified: true,
    lastUpdated: '2026-10',
    description:
      `St. Francis Xavier University is a small liberal arts university in Antigonish, Nova Scotia, celebrated for its tight-knit community and internationally recognized Coady International Institute for community development. It consistently ranks among Canada's top primarily undergraduate universities.`,
    rankings: { macleans: 1, times: 0, qs: 0 },
    faculties: ['Arts', 'Science', 'Business', 'Education', 'Nursing'],
    website: 'https://stfx.ca',
    logoUrl: null,
  },
  mun: {
    slug: 'mun',
    name: 'Memorial University of Newfoundland',
    shortName: 'MUN',
    city: "St. John's",
    province: 'NL',
    type: 'University',
    founded: 1925,
    enrolment: 19000,
    programmes: 175,
    tuitionMin: 2800,
    tuitionMax: 12000,
    verified: true,
    lastUpdated: '2026-10',
    description:
      "Memorial University is Newfoundland and Labrador's only university, offering some of the lowest tuition in Canada. It is a comprehensive research institution renowned for ocean sciences, engineering, and folklore studies.",
    rankings: { macleans: 0, times: 601, qs: 0 },
    faculties: ['Arts', 'Science', 'Engineering', 'Business', 'Law', 'Medicine', 'Education', 'Social Work', 'Nursing'],
    website: 'https://mun.ca',
    logoUrl: null,
  },
  unb: {
    slug: 'unb',
    name: 'University of New Brunswick',
    shortName: 'UNB',
    city: 'Fredericton',
    province: 'NB',
    type: 'University',
    founded: 1785,
    enrolment: 11000,
    programmes: 75,
    tuitionMin: 8100,
    tuitionMax: 18000,
    verified: true,
    lastUpdated: '2026-10',
    description:
      "UNB is the oldest English-language university in Canada, founded in 1785. Located in Fredericton and Saint John, it is known for strong engineering, computer science, and forestry programs and a welcoming campus community.",
    rankings: { macleans: 0, times: 0, qs: 0 },
    faculties: ['Arts', 'Science', 'Engineering', 'Business', 'Computer Science', 'Law', 'Education', 'Nursing', 'Forestry & Environmental Management'],
    website: 'https://unb.ca',
    logoUrl: null,
  },
  upei: {
    slug: 'upei',
    name: 'University of Prince Edward Island',
    shortName: 'UPEI',
    city: 'Charlottetown',
    province: 'PE',
    type: 'University',
    founded: 1969,
    enrolment: 5000,
    programmes: 60,
    tuitionMin: 8200,
    tuitionMax: 18000,
    verified: true,
    lastUpdated: '2026-10',
    description:
      "UPEI is Canada's smallest province's university, offering a personalized learning environment in Charlottetown. It is home to the Atlantic Veterinary College, one of only five veterinary schools in Canada.",
    rankings: { macleans: 0, times: 0, qs: 0 },
    faculties: ['Arts', 'Science', 'Business', 'Education', 'Veterinary Medicine', 'Nursing', 'Law'],
    website: 'https://upei.ca',
    logoUrl: null,
  },
  georgebrown: {
    slug: 'georgebrown',
    name: 'George Brown College',
    shortName: 'George Brown',
    city: 'Toronto',
    province: 'ON',
    type: 'College',
    founded: 1967,
    enrolment: 28000,
    programmes: 160,
    tuitionMin: 3600,
    tuitionMax: 16000,
    verified: true,
    lastUpdated: '2026-10',
    description:
      `George Brown College is a leading urban college in the heart of Toronto, with campuses in the Waterfront, Casa Loma, and St. James neighbourhoods. It is particularly known for its culinary arts, construction management, nursing, and design programs.`,
    rankings: { macleans: 0, times: 0, qs: 0 },
    faculties: ['Arts, Design & IT', 'Business', 'Community Services & Early Childhood', 'Health Sciences', 'Hospitality & Culinary Arts', 'Construction & Engineering'],
    website: 'https://georgebrown.ca',
    logoUrl: null,
  },
  centennial: {
    slug: 'centennial',
    name: 'Centennial College',
    shortName: 'Centennial',
    city: 'Toronto',
    province: 'ON',
    type: 'College',
    founded: 1966,
    enrolment: 27000,
    programmes: 180,
    tuitionMin: 3600,
    tuitionMax: 17000,
    verified: true,
    lastUpdated: '2026-10',
    description:
      `Centennial College was Ontario's first college of applied arts and technology. With campuses across east Toronto, it offers programs in business, engineering, health, media, and transportation, with a strong focus on equity and community engagement.`,
    rankings: { macleans: 0, times: 0, qs: 0 },
    faculties: ['Business', 'Engineering Technology & Applied Science', 'Arts, Communication & Design', 'Health & Wellness', 'Hospitality, Tourism & Culinary', 'Transportation'],
    website: 'https://centennialcollege.ca',
    logoUrl: null,
  },
  mohawk: {
    slug: 'mohawk',
    name: 'Mohawk College',
    shortName: 'Mohawk',
    city: 'Hamilton',
    province: 'ON',
    type: 'College',
    founded: 1966,
    enrolment: 26000,
    programmes: 130,
    tuitionMin: 3500,
    tuitionMax: 14000,
    verified: true,
    lastUpdated: '2026-10',
    description:
      `Mohawk College serves the Hamilton-Wentworth region and is among Ontario's leading colleges for co-op education, skilled trades, and health sciences. Its Stoney Creek campus features one of the most advanced trades training facilities in Canada.`,
    rankings: { macleans: 0, times: 0, qs: 0 },
    faculties: ['Business', 'Health Sciences', 'Engineering & IT', 'Skilled Trades & Apprenticeship', 'Creative Arts & Fashion'],
    website: 'https://mohawkcollege.ca',
    logoUrl: null,
  },
  conestoga: {
    slug: 'conestoga',
    name: 'Conestoga College',
    shortName: 'Conestoga',
    city: 'Kitchener',
    province: 'ON',
    type: 'College',
    founded: 1967,
    enrolment: 23000,
    programmes: 175,
    tuitionMin: 4000,
    tuitionMax: 18000,
    verified: true,
    lastUpdated: '2026-10',
    description:
      `Conestoga College is one of Ontario's fastest-growing colleges, with campuses across the Waterloo Region. It offers degree, diploma, and apprenticeship programs in business, engineering, health, and the skilled trades.`,
    rankings: { macleans: 0, times: 0, qs: 0 },
    faculties: ['Business & Hospitality', 'Engineering & IT', 'Health & Life Sciences', 'Media & Design', 'Trades & Apprenticeship'],
    website: 'https://conestogac.on.ca',
    logoUrl: null,
  },
  algonquin: {
    slug: 'algonquin',
    name: 'Algonquin College',
    shortName: 'Algonquin',
    city: 'Ottawa',
    province: 'ON',
    type: 'College',
    founded: 1967,
    enrolment: 20000,
    programmes: 300,
    tuitionMin: 3300,
    tuitionMax: 17000,
    verified: true,
    lastUpdated: '2026-10',
    description:
      `Algonquin College in Ottawa is one of Ontario's largest colleges, known for excellence in health sciences, technology, and media programs. Its Ottawa campus is one of the most modern in the country.`,
    rankings: { macleans: 0, times: 0, qs: 0 },
    faculties: ['Business', 'Health & Community Studies', 'Technology & Trades', 'Arts, Media & Design', 'Language Institute'],
    website: 'https://algonquincollege.com',
    logoUrl: null,
  },
  sheridan: {
    slug: 'sheridan',
    name: 'Sheridan College',
    shortName: 'Sheridan',
    city: 'Oakville',
    province: 'ON',
    type: 'College',
    founded: 1967,
    enrolment: 21000,
    programmes: 150,
    tuitionMin: 4100,
    tuitionMax: 17000,
    verified: true,
    lastUpdated: '2026-10',
    description:
      `Sheridan College is internationally renowned for its animation and visual effects programs, which have produced alumni credited on major Hollywood productions. Located across Oakville, Brampton, and Mississauga, it also excels in design, business, and technology.`,
    rankings: { macleans: 0, times: 0, qs: 0 },
    faculties: ['Animation, Arts & Design', 'Business', 'Community & Liberal Studies', 'Humanities & Social Sciences', 'Pilon School of Business', 'Technology'],
    website: 'https://sheridancollege.ca',
    logoUrl: null,
  },
  langara: {
    slug: 'langara',
    name: 'Langara College',
    shortName: 'Langara',
    city: 'Vancouver',
    province: 'BC',
    type: 'College',
    founded: 1970,
    enrolment: 21000,
    programmes: 100,
    tuitionMin: 4500,
    tuitionMax: 18000,
    verified: true,
    lastUpdated: '2026-10',
    description:
      `Langara College in south Vancouver offers university-transfer, career, and continuing studies programs to a highly diverse student body. Its journalism and applied planning programs are well regarded, and it serves as a key transfer pathway to UBC and SFU.`,
    rankings: { macleans: 0, times: 0, qs: 0 },
    faculties: ['Arts', 'Science', 'Business', 'Applied Studies', 'Co-op Education'],
    website: 'https://langara.ca',
    logoUrl: null,
  },
  kwantlen: {
    slug: 'kwantlen',
    name: 'Kwantlen Polytechnic University',
    shortName: 'KPU',
    city: 'Surrey',
    province: 'BC',
    type: 'Polytechnic',
    founded: 1981,
    enrolment: 20000,
    programmes: 135,
    tuitionMin: 5000,
    tuitionMax: 22000,
    verified: true,
    lastUpdated: '2026-10',
    description:
      `Kwantlen Polytechnic University in the Metro Vancouver area is BC's only polytechnic university, combining degrees, diplomas, and trades training under one roof. It is known for sustainable agriculture, design, and business programs.`,
    rankings: { macleans: 0, times: 0, qs: 0 },
    faculties: ['Arts', 'Science & Horticulture', 'Business', 'Design', 'Trades & Technology', 'Agricultural Sciences'],
    website: 'https://kpu.ca',
    logoUrl: null,
  },
  nait: {
    slug: 'nait',
    name: 'NAIT — Northern Alberta Institute of Technology',
    shortName: 'NAIT',
    city: 'Edmonton',
    province: 'AB',
    type: 'Polytechnic',
    founded: 1962,
    enrolment: 37000,
    programmes: 200,
    tuitionMin: 4800,
    tuitionMax: 19000,
    verified: true,
    lastUpdated: '2026-10',
    description:
      `NAIT is a leading polytechnic in Edmonton, Alberta, providing applied education and research in technology, business, health, and the trades. With close ties to Alberta's energy and tech sectors, NAIT graduates enjoy some of the highest employment rates in the country.`,
    rankings: { macleans: 0, times: 0, qs: 0 },
    faculties: ['Technology', 'Trades & Apprenticeship', 'Business', 'Health Sciences'],
    website: 'https://nait.ca',
    logoUrl: null,
  },
  sait: {
    slug: 'sait',
    name: 'SAIT — Southern Alberta Institute of Technology',
    shortName: 'SAIT',
    city: 'Calgary',
    province: 'AB',
    type: 'Polytechnic',
    founded: 1916,
    enrolment: 15000,
    programmes: 100,
    tuitionMin: 5200,
    tuitionMax: 20000,
    verified: true,
    lastUpdated: '2026-10',
    description:
      "SAIT is one of Canada's leading polytechnics, offering hands-on programs in trades, technology, business, and health in Calgary. Founded in 1916, it has a century-long track record of preparing graduates for in-demand careers in Alberta's economy.",
    rankings: { macleans: 0, times: 0, qs: 0 },
    faculties: ['Business', 'Health & Public Safety', 'Information & Communications Technology', 'Manufacturing & Automation', 'Construction', 'Transportation'],
    website: 'https://sait.ca',
    logoUrl: null,
  },
  nscc: {
    slug: 'nscc',
    name: 'Nova Scotia Community College',
    shortName: 'NSCC',
    city: 'Halifax',
    province: 'NS',
    type: 'College',
    founded: 1988,
    enrolment: 10000,
    programmes: 130,
    tuitionMin: 3800,
    tuitionMax: 15000,
    verified: true,
    lastUpdated: '2026-10',
    description:
      `NSCC is the largest post-secondary institution in Atlantic Canada, with 13 campuses spanning the province. It offers applied programs in business, health, IT, skilled trades, and community studies, with strong industry and community connections.`,
    rankings: { macleans: 0, times: 0, qs: 0 },
    faculties: ['Business', 'Health', 'Information Technology', 'Trades & Transportation', 'Tourism & Hospitality', 'Justice & Community Studies', 'Applied Arts & New Media'],
    website: 'https://nscc.ca',
    logoUrl: null,
  },
}

function generateFaq(school: School): FaqItem[] {
  const tuition = school.tuitionMin.toLocaleString('en-CA')
  const intl = school.tuitionMax.toLocaleString('en-CA')
  const facultyList = school.faculties.slice(0, 3).join(', ')
  return [
    {
      q: `Is ${school.name} a good school?`,
      a: `${school.name} is a highly regarded ${school.type.toLowerCase()} in ${school.city}, ${school.province}. ${school.description.split('.')[0]}. It enrolls over ${school.enrolment.toLocaleString('en-CA')} students across ${school.programmes}+ programmes.`,
    },
    {
      q: `What is tuition at ${school.name}?`,
      a: `Domestic undergraduate tuition at ${school.shortName} starts at approximately $${tuition} per year. International student tuition ranges from $${tuition} to $${intl} depending on the programme. Costs vary by faculty, year of study, and student status. Financial aid and scholarships are available — use Digital Kampus to match funding opportunities for free.`,
    },
    {
      q: `How do I apply to ${school.name}?`,
      a: `Applications to ${school.name} are typically submitted through your provincial application portal (e.g., OUAC in Ontario, BCCAT in BC) or directly through ${school.shortName}'s admissions website at ${school.website}. Deadlines are usually in January–February for fall entry. Requirements vary by programme and include transcripts, a personal statement, and sometimes supplemental materials.`,
    },
    {
      q: `What programmes does ${school.name} offer?`,
      a: `${school.name} offers ${school.programmes}+ programmes across faculties including ${facultyList}${school.faculties.length > 3 ? `, and more` : ''}. Programme offerings range from undergraduate degrees and diplomas to graduate and professional degrees. Visit ${school.website} for a full programme directory.`,
    },
    {
      q: `What is student life like at ${school.name}?`,
      a: `Student life at ${school.shortName} is vibrant and diverse. The ${school.city} campus hosts hundreds of student clubs, intramural sports, cultural events, and leadership opportunities. Many students find housing nearby — browse listings on Digital Kampus. The city of ${school.city} offers a mix of urban amenities, outdoor recreation, and employment opportunities for students.`,
    },
  ]
}

function getRelatedSchools(current: School): School[] {
  return Object.values(SCHOOLS)
    .filter((s) => s.slug !== current.slug && s.province === current.province)
    .slice(0, 3)
}

export function generateStaticParams() {
  return Object.keys(SCHOOLS).map((slug) => ({ slug }))
}

type Props = { params: Promise<{ slug: string }> }

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  const school = SCHOOLS[slug]
  if (!school) return {}
  return {
    title: `${school.name} — Tuition, Programmes & Reviews | Digital Kampus`,
    description: `${school.name} in ${school.city}, ${school.province}. Tuition $${school.tuitionMin.toLocaleString()}–$${school.tuitionMax.toLocaleString()}, ${school.programmes}+ programmes. Student reviews and scholarship matching.`,
    alternates: {
      canonical: `https://digitalkampus.ca/schools/${slug}`,
      languages: {
        'en-CA': `https://digitalkampus.ca/schools/${slug}`,
        'fr-CA': `https://digitalkampus.ca/fr/etablissements/${slug}`,
      },
    },
  }
}

export default async function SchoolPage({ params }: Props) {
  const { slug } = await params
  const school = SCHOOLS[slug]
  if (!school) notFound()

  const ldJson = {
    '@context': 'https://schema.org',
    '@type': 'EducationalOrganization',
    name: school.name,
    url: school.website,
    address: { '@type': 'PostalAddress', addressLocality: school.city, addressRegion: school.province, addressCountry: 'CA' },
    foundingDate: school.founded.toString(),
    numberOfEmployees: { '@type': 'QuantitativeValue', value: school.enrolment },
    description: school.description,
    ...(school.logoUrl ? { logo: school.logoUrl } : {}),
  }

  const faqItems = generateFaq(school)
  const faqLd = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqItems.map((item) => ({
      '@type': 'Question',
      name: item.q,
      acceptedAnswer: { '@type': 'Answer', text: item.a },
    })),
  }

  const relatedSchools = getRelatedSchools(school)

  return (
    <>
      <JsonLd data={ldJson} />
      <JsonLd data={faqLd} />
      <SiteNav />
      <main>
        <section className={styles.hero}>
          <div className={styles.inner}>
            <Breadcrumbs items={[
              { label: 'Home', href: '/' },
              { label: 'Schools', href: '/schools' },
              { label: school.shortName },
            ]} />
            <div className={styles.heroContent}>
              <div className={styles.heroLeft}>
                {school.logoUrl ? (
                  <div className={styles.logoWrap}>
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={school.logoUrl}
                      alt={school.name + ' logo'}
                      width={80}
                      height={80}
                      className={styles.schoolLogo}
                      style={{ objectFit: 'contain' }}
                    />
                  </div>
                ) : (
                  <div className={styles.logoFallback}>{school.shortName.charAt(0)}</div>
                )}
                <div>
                  <div className={styles.heroMeta}>
                    {school.city}, {school.province} · {school.type} · Est. {school.founded}
                  </div>
                  <h1 className={styles.h1}>{school.name}</h1>
                  {school.verified && (
                    <span className={styles.verified}>✓ Verified institution · Last updated {school.lastUpdated}</span>
                  )}
                </div>
              </div>
              <div className={styles.heroCtas}>
                <Link href={`/compare?a=${slug}`} className={styles.btnOutline}>Compare schools</Link>
                <Link href="/signup" className={styles.btnPrimary}>Match scholarships free →</Link>
              </div>
            </div>
          </div>
        </section>

        <div className={styles.body}>
          <div className={styles.inner}>
            <div className={styles.layout}>
              <div className={styles.main}>
                <section className={styles.card}>
                  <h2 className={styles.cardH}>About {school.shortName}</h2>
                  <p className={styles.cardP}>{school.description}</p>
                </section>

                <section className={styles.card}>
                  <h2 className={styles.cardH}>Faculties & Schools</h2>
                  <div className={styles.tagCloud}>
                    {school.faculties.map((f) => (
                      <span key={f} className={styles.tag}>{f}</span>
                    ))}
                  </div>
                </section>

                {(school.rankings.macleans > 0 || school.rankings.times > 0 || school.rankings.qs > 0) && (
                  <section className={styles.card}>
                    <h2 className={styles.cardH}>Rankings</h2>
                    <div className={styles.rankRow}>
                      {school.rankings.macleans > 0 && (
                        <div className={styles.rankItem}>
                          <span className={styles.rankNum}>#{school.rankings.macleans}</span>
                          <span className={styles.rankLabel}>Maclean&apos;s</span>
                        </div>
                      )}
                      {school.rankings.times > 0 && (
                        <div className={styles.rankItem}>
                          <span className={styles.rankNum}>#{school.rankings.times}</span>
                          <span className={styles.rankLabel}>Times World</span>
                        </div>
                      )}
                      {school.rankings.qs > 0 && (
                        <div className={styles.rankItem}>
                          <span className={styles.rankNum}>#{school.rankings.qs}</span>
                          <span className={styles.rankLabel}>QS World</span>
                        </div>
                      )}
                    </div>
                    <p className={styles.rankNote}>
                      Rankings sourced from Maclean&apos;s Education, Times Higher Education, and QS World University Rankings.
                      <Link href="/about#data-sources" className={styles.inlineLink}> Data sources →</Link>
                    </p>
                  </section>
                )}

                <section className={styles.card}>
                  <h2 className={styles.cardH}>Clubs at {school.shortName}</h2>
                  <p className={styles.cardP}>
                    Browse student clubs and organizations active at {school.name}. From academic societies to cultural groups, sports clubs, and student government — find your community.
                  </p>
                  <Link href={`/clubs?school=${slug}`} className={styles.btnPrimary} style={{ marginTop: '16px', display: 'inline-flex' }}>
                    Browse {school.shortName} clubs →
                  </Link>
                </section>

                <section className={styles.card}>
                  <h2 className={styles.cardH}>Housing near {school.shortName}</h2>
                  <p className={styles.cardP}>
                    Find student housing, apartments, and homestays near {school.name} in {school.city}. Compare listings by price, distance to campus, and amenities.
                  </p>
                  <Link href={`/housing?near=${slug}`} className={styles.btnPrimary} style={{ marginTop: '16px', display: 'inline-flex' }}>
                    Find housing near {school.shortName} →
                  </Link>
                </section>

                <section className={styles.card}>
                  <h2 className={styles.cardH}>Frequently Asked Questions</h2>
                  <FaqAccordion items={faqItems} />
                </section>

                {relatedSchools.length > 0 && (
                  <section className={styles.card}>
                    <h2 className={styles.cardH}>Compare {school.shortName} with</h2>
                    <p className={styles.cardP}>
                      Other {school.type === 'University' ? 'universities' : 'institutions'} in {school.province} you may want to consider:
                    </p>
                    <div className={styles.relatedGrid}>
                      {relatedSchools.map((rel) => (
                        <Link key={rel.slug} href={`/schools/${rel.slug}`} className={styles.relatedCard}>
                          {rel.logoUrl ? (
                            // eslint-disable-next-line @next/next/no-img-element
                            <img src={rel.logoUrl} alt={rel.name + ' logo'} width={40} height={40} style={{ objectFit: 'contain' }} />
                          ) : (
                            <div className={styles.relatedInitial}>{rel.shortName.charAt(0)}</div>
                          )}
                          <div className={styles.relatedInfo}>
                            <strong className={styles.relatedName}>{rel.shortName}</strong>
                            <span className={styles.relatedCity}>{rel.city}, {rel.province}</span>
                          </div>
                          <span className={styles.relatedArrow}>→</span>
                        </Link>
                      ))}
                    </div>
                  </section>
                )}
              </div>

              <aside className={styles.sidebar}>
                <div className={styles.sideCard}>
                  <h3 className={styles.sideH}>Quick facts</h3>
                  <dl className={styles.dl}>
                    <dt>Enrolment</dt>
                    <dd>{school.enrolment.toLocaleString()} students</dd>
                    <dt>Programmes</dt>
                    <dd>{school.programmes}+</dd>
                    <dt>Domestic tuition</dt>
                    <dd>${school.tuitionMin.toLocaleString()} / yr</dd>
                    <dt>International tuition</dt>
                    <dd>from ${school.tuitionMax.toLocaleString()} / yr</dd>
                    <dt>Location</dt>
                    <dd>{school.city}, {school.province}</dd>
                    <dt>Type</dt>
                    <dd>{school.type}</dd>
                  </dl>
                </div>

                <div className={styles.sideCard}>
                  <h3 className={styles.sideH}>Compare</h3>
                  <p className={styles.sideP}>See how {school.shortName} stacks up against similar schools.</p>
                  {slug === 'ubc' && (
                    <Link href="/compare/ubc-vs-sfu" className={styles.compareLink}>UBC vs SFU →</Link>
                  )}
                  {slug === 'sfu' && (
                    <Link href="/compare/ubc-vs-sfu" className={styles.compareLink}>UBC vs SFU →</Link>
                  )}
                  {slug === 'uoft' && (
                    <Link href="/compare/uoft-vs-ubc" className={styles.compareLink}>U of T vs UBC →</Link>
                  )}
                  {slug === 'western' && (
                    <Link href="/compare/western-vs-mcmaster" className={styles.compareLink}>Western vs McMaster →</Link>
                  )}
                  {slug === 'mcmaster' && (
                    <Link href="/compare/western-vs-mcmaster" className={styles.compareLink}>McMaster vs Western →</Link>
                  )}
                  <Link href="/compare" className={styles.compareLinkMuted}>All comparisons →</Link>
                </div>

                <div className={styles.sideCard}>
                  <h3 className={styles.sideH}>Scholarships at {school.shortName}</h3>
                  <p className={styles.sideP}>Find funding matched to your programme and background.</p>
                  <Link href="/signup" className={styles.btnPrimary} style={{ display: 'block', textAlign: 'center' }}>
                    Match scholarships free →
                  </Link>
                </div>
              </aside>
            </div>
          </div>
        </div>

        <section className={styles.connectSection}>
          <div className={styles.inner}>
            <h2 className={styles.connectH}>Meet students at {school.name}</h2>
            <div className={styles.connectCard}>
              <div className={styles.connectText}>
                <p className={styles.connectBody}>
                  Find and connect with students at {school.name} through student profiles.
                </p>
              </div>
              <Link href={`/students?school=${slug}`} className={styles.btnConnectPrimary}>
                Browse students →
              </Link>
            </div>
          </div>
        </section>
      </main>
      <SiteFooter />
    </>
  )
}
