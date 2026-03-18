// Default settings - used as fallback when database is unavailable
const defaultSettings = {
  // Page toggles
  about_page: true,
  projects_page: true,
  services_page: true,
  contact_page: true,
  
  // Section toggles
  certifications_section: true,
  experience_section: true,
  education_section: true,
  clients_section: true,
  featured_projects: true,
  skills_section: true,
  testimonials_section: true,
  blog_section: false,
  
  // Feature toggles
  maintenance_mode: false,
}

// This object is used for backward compatibility and server-side checks
// It uses environment variables as fallback but should be replaced with database calls
export const toggleSettings = {
  about_page: true,
  projects_page: true,
  services_page: true,
  contact_page: true,
  certifications_section: true,
  experience_section: true,
  education_section: true,
  clients_section: true,
  featured_projects: true,
  skills_section: true,
  testimonials_section: true,
  blog_section: false,
  maintenance_mode: false,
}

// Universal settings for backward compatibility
export const universalSettings = {
  about_page: true,
  projects_page: true,
  services_page: true,
  contact_page: true,
  certifications_section: true,
  experience_section: true,
  education_section: true,
  clients_section: true,
  featured_projects: true,
  skills_section: true,
  testimonials_section: true,
  blog_section: false,
  maintenance_mode: false,
}

// Order of home page sections
export const homeSectionsOrder = {
  skills: 1,
  clients: 2,
  projects: 3,
  contact: 4,
}
