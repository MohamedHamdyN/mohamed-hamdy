import { createClient } from "@supabase/supabase-js"

// Supabase configuration
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY

if (!supabaseUrl) {
  throw new Error("Missing NEXT_PUBLIC_SUPABASE_URL environment variable")
}

if (!supabaseAnonKey) {
  throw new Error("Missing NEXT_PUBLIC_SUPABASE_ANON_KEY environment variable")
}

// Client-side Supabase client
export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    persistSession: false,
    autoRefreshToken: false,
  },
})

// Server-side Supabase client (with service role key for admin operations)
export function createServerClient() {
  if (!supabaseServiceKey) {
    console.warn("SUPABASE_SERVICE_ROLE_KEY not found, using anon key")
    return createClient(supabaseUrl, supabaseAnonKey, {
      auth: {
        persistSession: false,
        autoRefreshToken: false,
      },
    })
  }

  return createClient(supabaseUrl, supabaseServiceKey, {
    auth: {
      persistSession: false,
      autoRefreshToken: false,
    },
  })
}

// Database types
export interface Profile {
  id: number
  name: string
  email: string
  phone?: string
  location?: string
  short_bio?: string
  long_bio?: string
  logo?: string
  resume_url?: string
  linkedin_url?: string
  github_url?: string
  twitter_url?: string
  instagram_url?: string
  facebook_url?: string
  youtube_url?: string
  behance_url?: string
  dribbble_url?: string
  website_url?: string
  calendly_url?: string
  created_at: string
  updated_at: string
}

export interface Skill {
  id: number
  name: string
  level: number
  icon?: string
  enabled: boolean
  created_at: string
  updated_at: string
}

export interface WorkReason {
  id: number
  title: string
  description: string
  icon?: string
  enabled: boolean
  created_at: string
  updated_at: string
}

export interface Client {
  id: number
  name: string
  logo?: string
  website_url?: string
  enabled: boolean
  created_at: string
  updated_at: string
}

export interface ProjectCategory {
  id: number
  name: string
  slug: string
  created_at: string
  updated_at: string
}

export interface Project {
  id: number
  title: string
  description: string
  long_description?: string
  image?: string
  gallery?: string[]
  technologies?: string[]
  live_url?: string
  github_url?: string
  category_id?: number
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
  icon?: string
  price?: string
  features?: string[]
  enabled: boolean
  created_at: string
  updated_at: string
}

export interface Education {
  id: number
  degree: string
  institution: string
  location?: string
  start_date: string
  end_date?: string
  description?: string
  created_at: string
  updated_at: string
}

export interface Journey {
  id: number
  year: number
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
  url?: string
  enabled: boolean
  created_at: string
  updated_at: string
}

export interface Stat {
  id: number
  label: string
  value: string
  icon?: string
  enabled: boolean
  created_at: string
  updated_at: string
}

export interface AboutFeature {
  id: number
  title: string
  description: string
  icon?: string
  created_at: string
  updated_at: string
}

export interface FreelancePlatform {
  id: number
  name: string
  url: string
  logo?: string
  enabled: boolean
  created_at: string
  updated_at: string
}

export interface PaymentMethod {
  id: number
  name: string
  icon?: string
  enabled: boolean
  created_at: string
  updated_at: string
}

export interface Setting {
  id: number
  key: string
  value: boolean
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

// Test connection function
export async function testSupabaseConnection() {
  try {
    const { data, error } = await supabase.from("profile").select("id").limit(1)

    if (error) {
      console.error("Supabase connection test failed:", error)
      return false
    }

    console.log("Supabase connection successful")
    return true
  } catch (error) {
    console.error("Supabase connection test error:", error)
    return false
  }
}
