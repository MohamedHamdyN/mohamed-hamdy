import { neon } from '@neondatabase/serverless'

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
export interface Profile {
  id: number
  name: string
  title: string
  email: string
  bio: string
  avatar_url: string
  resume_url: string
  calendly_url: string
  location: string
  phone: string
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
