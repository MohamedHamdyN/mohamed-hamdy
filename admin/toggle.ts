/**
 * Settings & Toggles Service
 * Uses default values. Can be extended to fetch from database on demand.
 */

// Default settings values
const DEFAULT_SETTINGS = {
  maintenance_mode: false,
  website: true,
  skills: true,
  why_work_with_me: true,
  projects_home: true,
  clients: true,
  contact_home: true,
  about_page: true,
  projects_page: true,
  services_page: true,
  contact_page: true,
  blog_section: false,
  certifications_section: true,
  experience_section: true,
  education_section: true,
  testimonials_section: true,
  calendly_feature: true,
  freelance_platforms: false,
  payment_methods: false,
}

// Export settings objects using defaults
export const toggleSettings = { ...DEFAULT_SETTINGS }

// Universal settings for backward compatibility
export const universalSettings = { ...DEFAULT_SETTINGS }

// Order of home page sections
export const homeSectionsOrder = {
  skills: 1,
  clients: 2,
  projects: 3,
  contact: 4,
}
