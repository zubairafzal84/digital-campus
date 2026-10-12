export const APP_NAME = 'Digital Kampus'
export const APP_URL = process.env.NEXT_PUBLIC_APP_URL ?? 'https://digitalkampus.ca'
export const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL ?? ''
export const SUPABASE_ANON_KEY = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ?? ''

export const PROVINCES = [
  { code: 'AB', name: 'Alberta', nameFr: 'Alberta' },
  { code: 'BC', name: 'British Columbia', nameFr: 'Colombie-Britannique' },
  { code: 'MB', name: 'Manitoba', nameFr: 'Manitoba' },
  { code: 'NB', name: 'New Brunswick', nameFr: 'Nouveau-Brunswick' },
  { code: 'NL', name: 'Newfoundland and Labrador', nameFr: 'Terre-Neuve-et-Labrador' },
  { code: 'NS', name: 'Nova Scotia', nameFr: 'Nouvelle-Écosse' },
  { code: 'NT', name: 'Northwest Territories', nameFr: 'Territoires du Nord-Ouest' },
  { code: 'NU', name: 'Nunavut', nameFr: 'Nunavut' },
  { code: 'ON', name: 'Ontario', nameFr: 'Ontario' },
  { code: 'PE', name: 'Prince Edward Island', nameFr: 'Île-du-Prince-Édouard' },
  { code: 'QC', name: 'Quebec', nameFr: 'Québec' },
  { code: 'SK', name: 'Saskatchewan', nameFr: 'Saskatchewan' },
  { code: 'YT', name: 'Yukon', nameFr: 'Yukon' },
] as const

export const PROTECTED_ROUTES = ['/dashboard', '/profile', '/clubs', '/funding', '/housing/saved']
