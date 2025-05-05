// Toggle settings for website sections and pages
export const toggleSettings = {
  // Main website toggle (when off, only shows hero section)
  website: true,

  // Page toggles (when off, removes from navigation and disables access)
  projects_page: true,
  services_page: true,
  about_page: true,
  contact_page: true,

  // Home page section toggles
  projects_home: true,
  services_home: true,
  about_home: true,
  skills: true,
  why_work_with_me: true,
  clients: true,
  contact_home: true,

  // Services page toggles
  freelance_platforms: true,
  payment_methods: true,

  // Contact page toggles
  contact_form: true, // تم تغييره من false إلى true

  // Calendly feature toggle
  calendly_feature: true,
}

// Home page sections order (1-5)
export const homeSectionsOrder = {
  skills: 1,
  why_work_with_me: 2,
  clients: 4,
  projects: 3,
  contact: 5,
}
