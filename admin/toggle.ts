// Toggle settings for website sections and pages

// Server-side settings - المصدر الرئيسي للإعدادات
export const toggleSettings = {
  // Main website toggle (when off, only shows hero section)
  website: process.env.DISABLE_WEBSITE !== "true",

  // Page toggles (when off, removes from navigation and disables access)
  projects_page: process.env.DISABLE_PROJECTS !== "true",
  services_page: process.env.DISABLE_SERVICES !== "true",
  about_page: process.env.DISABLE_ABOUT !== "true",
  contact_page: process.env.DISABLE_CONTACT !== "true",
  resume_page: process.env.DISABLE_RESUME !== "true",

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

// Client-side safe settings - يستخدم للمكونات على جانب العميل
export const clientSettings = {
  // Main website toggle
  website: typeof window !== "undefined" ? process.env.NEXT_PUBLIC_DISABLE_WEBSITE !== "true" : toggleSettings.website,

  // Page toggles
  projects_page:
    typeof window !== "undefined" ? process.env.NEXT_PUBLIC_DISABLE_PROJECTS !== "true" : toggleSettings.projects_page,

  services_page:
    typeof window !== "undefined" ? process.env.NEXT_PUBLIC_DISABLE_SERVICES !== "true" : toggleSettings.services_page,

  about_page:
    typeof window !== "undefined" ? process.env.NEXT_PUBLIC_DISABLE_ABOUT !== "true" : toggleSettings.about_page,

  contact_page:
    typeof window !== "undefined" ? process.env.NEXT_PUBLIC_DISABLE_CONTACT !== "true" : toggleSettings.contact_page,

  resume_page:
    typeof window !== "undefined" ? process.env.NEXT_PUBLIC_DISABLE_RESUME !== "true" : toggleSettings.resume_page,

  // Home page section toggles
  projects_home:
    typeof window !== "undefined"
      ? process.env.NEXT_PUBLIC_DISABLE_PROJECTS_HOME !== "true"
      : toggleSettings.projects_home,

  services_home:
    typeof window !== "undefined"
      ? process.env.NEXT_PUBLIC_DISABLE_SERVICES_HOME !== "true"
      : toggleSettings.services_home,

  about_home: toggleSettings.about_home,

  skills: typeof window !== "undefined" ? process.env.NEXT_PUBLIC_DISABLE_SKILLS !== "true" : toggleSettings.skills,

  why_work_with_me:
    typeof window !== "undefined"
      ? process.env.NEXT_PUBLIC_DISABLE_WHY_WORK_WITH_ME !== "true"
      : toggleSettings.why_work_with_me,

  clients: typeof window !== "undefined" ? process.env.NEXT_PUBLIC_DISABLE_CLIENTS !== "true" : toggleSettings.clients,

  contact_home:
    typeof window !== "undefined"
      ? process.env.NEXT_PUBLIC_DISABLE_CONTACT_HOME !== "true"
      : toggleSettings.contact_home,
}

// Home page sections order (1-5)
export const homeSectionsOrder = {
  skills: 1,
  why_work_with_me: 2,
  clients: 4,
  projects: 3,
  contact: 5,
}
