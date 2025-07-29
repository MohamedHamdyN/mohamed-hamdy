import { createClient } from "@supabase/supabase-js"

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error("Missing Supabase environment variables")
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    persistSession: false,
  },
})
console.log("🔍 PROD ENV URL:", process.env.NEXT_PUBLIC_SUPABASE_URL)
console.log("🔍 PROD ENV ANON KEY:", process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY)

// Server-side client for admin operations
export function createServerClient() {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
  const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY!

  return createClient(supabaseUrl, supabaseServiceKey, {
    auth: {
      persistSession: false,
    },
  })
}

// Database types
export interface Profile {
  id: number
  name: string
  title: string
  title2: string
  bio: string
  short_bio: string
  long_bio: string
  email: string
  phone: string
  location: string
  logo: string
  favicon: string
  avatar: string
  default_project_image: string
  default_client_logo: string
  default_platform_logo: string
  og_image: string
  resume_url: string
  calendly_url: string
  social_links: Record<string, string>
  created_at: string
  updated_at: string
}

export interface Skill {
  id: number
  name: string
  description: string
  icon: string
  color: string
  enabled: boolean
  created_at: string
  updated_at: string
}

export interface WorkReason {
  id: number
  title: string
  description: string
  icon: string
  color: string
  enabled: boolean
  created_at: string
  updated_at: string
}

export interface Client {
  id: number
  name: string
  logo: string
  website: string
  testimonial: string
  rating: number
  last_project: string
  enabled: boolean
  created_at: string
  updated_at: string
}

export interface ProjectCategory {
  id: number
  name: string
  slug: string
  description: string
  created_at: string
  updated_at: string
}

export interface Project {
  id: number
  title: string
  short_description: string
  long_description: string
  image: string
  images: string[]
  technologies: string[]
  project_url: string
  github_url: string
  linkedin_url: string
  category_id: number
  featured: boolean
  enabled: boolean
  date: string
  created_at: string
  updated_at: string
  project_categories?: ProjectCategory
}

export interface Service {
  id: number
  title: string
  description: string
  icon: string
  price: string
  features: string[]
  enabled: boolean
  created_at: string
  updated_at: string
}

export interface Education {
  id: number
  degree: string
  institution: string
  year: string
  description: string
  created_at: string
  updated_at: string
}

export interface Journey {
  id: number
  year: string
  title: string
  description: string
  created_at: string
  updated_at: string
}

export interface Certification {
  id: number
  name: string
  issuer: string
  date: string
  url: string
  enabled: boolean
  created_at: string
  updated_at: string
}

export interface Stat {
  id: number
  label: string
  value: string
  icon: string
  enabled: boolean
  created_at: string
  updated_at: string
}

export interface AboutFeature {
  id: number
  title: string
  description: string
  icon: string
  created_at: string
  updated_at: string
}

export interface FreelancePlatform {
  id: number
  name: string
  logo: string
  profile_url: string
  rating: number
  reviews_count: number
  enabled: boolean
  created_at: string
  updated_at: string
}

export interface PaymentMethod {
  id: number
  name: string
  logo: string
  details: string
  enabled: boolean
  created_at: string
  updated_at: string
}

export interface LanguageSettings {
  id: number
  enable_language_toggle: boolean
  default_language: string
  created_at: string
  updated_at: string
}
