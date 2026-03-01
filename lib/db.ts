import { neon } from '@neondatabase/serverless'
import { profile } from 'console'

if (!process.env.DATABASE_URL) {
  throw new Error('DATABASE_URL environment variable is not set')
}
const query = neon(process.env.DATABASE_URL)

export const db = {
  query,
}

export type QueryResult<T> = {
  rows: T[]
}

// Helper types
export type Profile = {
  id: number
  name: string
  title: string | null
  short_title: string | null
  hero_description: string | null
  hero_image_type: string | null
  hero_image_url: string | null
  location: string | null
  open_to_work: boolean
  email: string | null
  phone: string | null
  bio: string | null
  short_bio: string | null
  long_bio: string | null
  about_intro: string | null
  resume_url: string | null
  calendly_url: string | null
  avatar_url: string | null
  og_image_url: string | null
  created_at?: string
  updated_at?: string
}

export interface Skill {
  id: number
  name: string
  description: string
  icon: string
  color: string
  enabled: boolean
  order: number
  created_at: string
  updated_at: string
}

export interface Project {
  id: number
  title: string
  slug: string
  description: string
  short_description: string
  category_id: number
  image_url: string
  project_url: string | null
  linkedin_url: string | null
  technologies: string[]
  date: string
  featured: boolean
  draft: boolean
  order: number
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
  order: number
  created_at: string
  updated_at: string
}

export interface Client {
  id: number
  name: string
  logo_url: string
  testimonial: string | null
  rating: number
  website: string | null
  enabled: boolean
  order: number
  created_at: string
  updated_at: string
}

export interface SocialLink {
  id: number
  platform: string
  url: string
  enabled: boolean
  order: number
  created_at: string
  updated_at: string
}

export interface SiteSettings {
  id: number
  key: string
  value: string
  type: 'string' | 'json' | 'boolean'
  updated_at: string
}

export interface Admin {
  id: number
  email: string
  password_hash: string
  created_at: string
  updated_at: string
}

console.log(profile)