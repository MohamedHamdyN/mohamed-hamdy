/**
 * Settings & Toggles Service
 * This file provides backward-compatible access to settings stored in Neon database
 * All settings are fetched from site_settings table
 */

import { 
  getSetting, 
  getPageEnabled, 
  getFeatureEnabled, 
  getSectionEnabled,
  getAllSettings 
} from "@/lib/services/settings-service"

// Default fallback values (used if database is unavailable)
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

// This object is used for backward compatibility and server-side checks
// Will be dynamically populated from database
export let toggleSettings = { ...DEFAULT_SETTINGS }

// Universal settings for backward compatibility
export let universalSettings = { ...DEFAULT_SETTINGS }

// Order of home page sections
export const homeSectionsOrder = {
  skills: 1,
  clients: 2,
  projects: 3,
  contact: 4,
}

/**
 * Initialize settings from database
 * Call this on app startup or when needed
 */
export async function initializeSettings() {
  try {
    const allSettings = await getAllSettings()
    
    // Merge with defaults
    toggleSettings = { ...DEFAULT_SETTINGS, ...allSettings }
    universalSettings = { ...DEFAULT_SETTINGS, ...allSettings }
  } catch (error) {
    console.warn('Failed to load settings from database, using defaults:', error)
    toggleSettings = { ...DEFAULT_SETTINGS }
    universalSettings = { ...DEFAULT_SETTINGS }
  }
}

/**
 * Get a single toggle/setting value
 */
export async function getSiteToggleValue(key: string): Promise<boolean> {
  try {
    const value = await getSetting(key, DEFAULT_SETTINGS[key as keyof typeof DEFAULT_SETTINGS] ?? true)
    return Boolean(value)
  } catch (error) {
    console.error(`Error getting toggle value for ${key}:`, error)
    return DEFAULT_SETTINGS[key as keyof typeof DEFAULT_SETTINGS] ?? true
  }
}

/**
 * Convenient accessors for common settings
 */
export async function getPageSettings(pageName: string): Promise<boolean> {
  return await getPageEnabled(pageName)
}

export async function getFeatureSettings(featureName: string): Promise<boolean> {
  return await getFeatureEnabled(featureName)
}

export async function getSectionSettings(sectionName: string): Promise<boolean> {
  return await getSectionEnabled(sectionName)
}
