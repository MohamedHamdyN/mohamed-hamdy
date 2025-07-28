import { createClient } from "@supabase/supabase-js"

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!

// Client-side Supabase client
export const supabase = createClient(supabaseUrl, supabaseAnonKey)

// Server-side Supabase client (for server actions)
export const createServerClient = () => {
  return createClient(process.env.NEXT_PUBLIC_SUPABASE_URL!, process.env.SUPABASE_SERVICE_ROLE_KEY!)
}

// Database types
export interface Profile {
  id: number
  name: string
  title: string
  title2: string
  email: string
  phone: string
  location: string
  bio: string
  short_bio: string
  long_bio: string
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
  testimonial: string
  rating: number
  website: string
  last_project: string
  enabled: boolean
  created_at: string
  updated_at: string
}

export interface Project {
  id: number
  title: string
  description: string
  short_description: string
  category_id: number
  image: string
  project_url: string
  linkedin_url: string
  technologies: string[]
  date: string
  featured: boolean
  enabled: boolean
  created_at: string
  updated_at: string
}

export interface ProjectCategory {
  id: number
  name: string
  slug: string
  enabled: boolean
  created_at: string
  updated_at: string
}

export interface Service {
  id: number
  title: string
  description: string
  icon: string
  color: string
  features: string[]
  enabled: boolean
  created_at: string
  updated_at: string
}

export interface Education {
  id: number
  year: string
  institution: string
  degree: string
  details: string
  created_at: string
  updated_at: string
}

export interface Journey {
  id: number
  year: string
  title: string
  description: string
  details: string
  created_at: string
  updated_at: string
}

export interface Certification {
  id: number
  title: string
  issuer: string
  date: string
  credential_url: string
  description: string
  enabled: boolean
  created_at: string
  updated_at: string
}

export interface Stat {
  id: number
  name: string
  value: string
  icon: string
  color: string
  enabled: boolean
  created_at: string
  updated_at: string
}

export interface AboutFeature {
  id: number
  title: string
  description: string
  icon: string
  color: string
  created_at: string
  updated_at: string
}

export interface FreelancePlatform {
  id: number
  name: string
  profile_url: string
  logo: string
  color: string
  enabled: boolean
  created_at: string
  updated_at: string
}

export interface PaymentMethod {
  id: number
  name: string
  icon: string
  created_at: string
  updated_at: string
}

export interface Settings {
  id: number
  key: string
  value: boolean
  description: string
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
