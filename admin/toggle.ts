// Default settings - used as fallback when database is unavailable
const defaultSettings = {
  // Website enable/disable
  website: true,
  maintenance_mode: false,
  
  // Page toggles
  about_page: true,
  projects_page: true,
  services_page: true,
  contact_page: true,
  
  // Home page sections
  skills: true,
  why_work_with_me: true,
  projects_home: true,
  clients: true,
  contact_home: true,
  
  // Other sections
  certifications_section: true,
  experience_section: true,
  education_section: true,
  testimonials_section: true,
  blog_section: false,
  
  // Feature toggles
  calendly_feature: true,
  freelance_platforms: true,
  payment_methods: true,
}

// This object is used for backward compatibility and server-side checks
// It uses environment variables as fallback but should be replaced with database calls
export const toggleSettings = {
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
}

// Universal settings for backward compatibility
export const universalSettings = {
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
}

// Order of home page sections
export const homeSectionsOrder = {
  skills: 1,
  clients: 2,
  projects: 3,
  contact: 4,
}

// Helper function to safely get toggle value
export async function getSiteToggleValue(key: string): Promise<boolean> {
  try {
    const { getSiteToggle } = await import('@/app/actions/cms')
    return await getSiteToggle(key)
  } catch (error) {
    console.warn(`Failed to get toggle for ${key}:`, error)
    return toggleSettings[key as keyof typeof toggleSettings] ?? true
  }
}
