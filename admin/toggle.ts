// Toggle settings for website sections and pages
// Server-side only settings
const serverSettings = {
  // Main website toggle (when off, only shows hero section)
  website: process.env.DISABLE_WEBSITE !== "true",

  // Page toggles (when off, removes from navigation and disables access)
  projects_page: process.env.DISABLE_PROJECTS !== "true",
  services_page: process.env.DISABLE_SERVICES !== "true",
  about_page: process.env.DISABLE_ABOUT !== "true",
  contact_page: process.env.DISABLE_CONTACT !== "true",

  // Home page section toggles
  projects_home: process.env.DISABLE_PROJECTS_HOME !== "true",
  services_home: process.env.DISABLE_SERVICES_HOME !== "true",
  about_home: true,
  skills: process.env.DISABLE_SKILLS !== "true",
  why_work_with_me: process.env.DISABLE_WHY_WORK_WITH_ME !== "true",
  clients: process.env.DISABLE_CLIENTS !== "true",
  contact_home: process.env.DISABLE_CONTACT_HOME !== "true",

  // Services page toggles
  freelance_platforms: true,
  payment_methods: true,

  // Contact page toggles
  contact_form: true,

  // Calendly feature toggle
  calendly_feature: true,
}

// Client-side safe settings
// These settings are duplicated for client-side usage with NEXT_PUBLIC_ prefix
export const clientSettings = {
  // Main website toggle (when off, only shows hero section)
  website: typeof window !== "undefined" ? process.env.NEXT_PUBLIC_DISABLE_WEBSITE !== "true" : true,

  // Page toggles (when off, removes from navigation and disables access)
  projects_page: typeof window !== "undefined" ? process.env.NEXT_PUBLIC_DISABLE_PROJECTS !== "true" : true,
  services_page: typeof window !== "undefined" ? process.env.NEXT_PUBLIC_DISABLE_SERVICES !== "true" : true,
  about_page: typeof window !== "undefined" ? process.env.NEXT_PUBLIC_DISABLE_ABOUT !== "true" : true,
  contact_page: typeof window !== "undefined" ? process.env.NEXT_PUBLIC_DISABLE_CONTACT !== "true" : true,

  // Home page section toggles
  projects_home: typeof window !== "undefined" ? process.env.NEXT_PUBLIC_DISABLE_PROJECTS_HOME !== "true" : true,
  services_home: typeof window !== "undefined" ? process.env.NEXT_PUBLIC_DISABLE_SERVICES_HOME !== "true" : true,
  about_home: true,
  skills: typeof window !== "undefined" ? process.env.NEXT_PUBLIC_DISABLE_SKILLS !== "true" : true,
  why_work_with_me: typeof window !== "undefined" ? process.env.NEXT_PUBLIC_DISABLE_WHY_WORK_WITH_ME !== "true" : true,
  clients: typeof window !== "undefined" ? process.env.NEXT_PUBLIC_DISABLE_CLIENTS !== "true" : true,
  contact_home: typeof window !== "undefined" ? process.env.NEXT_PUBLIC_DISABLE_CONTACT_HOME !== "true" : true,
}

// Export server settings for server components
export const toggleSettings = serverSettings

// Home page sections order (1-5)
export const homeSectionsOrder = {
  skills: 1,
  why_work_with_me: 2,
  clients: 4,
  projects: 3,
  contact: 5,
}
