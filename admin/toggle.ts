// Configuraciones predeterminadas - Se utilizan cuando no hay variables de entorno disponibles
const defaultSettings = {
  // Interruptor principal del sitio web
  website: true,
  // Interruptores de páginas
  projects_page: true,
  services_page: true,
  about_page: true,
  contact_page: true,
  resume_page: true,
  // Interruptores de secciones de la página de inicio
  projects_home: true,
  services_home: true,
  about_home: true,
  skills: true,
  why_work_with_me: true,
  clients: true,
  contact_home: true,
  // Interruptores de la página de servicios
  freelance_platforms: true,
  payment_methods: true,
  // Interruptores de la página de contacto
  contact_form: true,
  // Interruptor de la función Calendly
  calendly_feature: true,
}

// Configuraciones del servidor - Solo se utilizan en el lado del servidor
export const toggleSettings = {
  website: process.env.DISABLE_WEBSITE !== "true",
  projects_page: process.env.DISABLE_PROJECTS !== "true",
  services_page: process.env.DISABLE_SERVICES !== "true",
  about_page: process.env.DISABLE_ABOUT !== "true",
  contact_page: process.env.DISABLE_CONTACT !== "true",
  resume_page: process.env.DISABLE_RESUME !== "true",
  projects_home: process.env.DISABLE_PROJECTS_HOME !== "true",
  services_home: process.env.DISABLE_SERVICES_HOME !== "true",
  about_home: true,
  skills: process.env.DISABLE_SKILLS !== "true",
  why_work_with_me: process.env.DISABLE_WHY_WORK_WITH_ME !== "true",
  clients: process.env.DISABLE_CLIENTS !== "true",
  contact_home: process.env.DISABLE_CONTACT_HOME !== "true",
  freelance_platforms: true,
  payment_methods: true,
  contact_form: true,
  calendly_feature: true,
}

// Configuraciones del cliente - Solo se utilizan en el lado del cliente
// Solo utilizan variables de entorno que comienzan con NEXT_PUBLIC_
export const clientSettings = {
  website: typeof window !== "undefined" ? process.env.NEXT_PUBLIC_DISABLE_WEBSITE !== "true" : defaultSettings.website,

  projects_page:
    typeof window !== "undefined" ? process.env.NEXT_PUBLIC_DISABLE_PROJECTS !== "true" : defaultSettings.projects_page,

  services_page:
    typeof window !== "undefined" ? process.env.NEXT_PUBLIC_DISABLE_SERVICES !== "true" : defaultSettings.services_page,

  about_page:
    typeof window !== "undefined" ? process.env.NEXT_PUBLIC_DISABLE_ABOUT !== "true" : defaultSettings.about_page,

  contact_page:
    typeof window !== "undefined" ? process.env.NEXT_PUBLIC_DISABLE_CONTACT !== "true" : defaultSettings.contact_page,

  resume_page:
    typeof window !== "undefined" ? process.env.NEXT_PUBLIC_DISABLE_RESUME !== "true" : defaultSettings.resume_page,

  projects_home:
    typeof window !== "undefined"
      ? process.env.NEXT_PUBLIC_DISABLE_PROJECTS_HOME !== "true"
      : defaultSettings.projects_home,

  services_home:
    typeof window !== "undefined"
      ? process.env.NEXT_PUBLIC_DISABLE_SERVICES_HOME !== "true"
      : defaultSettings.services_home,

  about_home: defaultSettings.about_home,

  skills: typeof window !== "undefined" ? process.env.NEXT_PUBLIC_DISABLE_SKILLS !== "true" : defaultSettings.skills,

  why_work_with_me:
    typeof window !== "undefined"
      ? process.env.NEXT_PUBLIC_DISABLE_WHY_WORK_WITH_ME !== "true"
      : defaultSettings.why_work_with_me,

  clients: typeof window !== "undefined" ? process.env.NEXT_PUBLIC_DISABLE_CLIENTS !== "true" : defaultSettings.clients,

  contact_home:
    typeof window !== "undefined"
      ? process.env.NEXT_PUBLIC_DISABLE_CONTACT_HOME !== "true"
      : defaultSettings.contact_home,

  freelance_platforms: defaultSettings.freelance_platforms,
  payment_methods: defaultSettings.payment_methods,
  contact_form: defaultSettings.contact_form,
  calendly_feature: defaultSettings.calendly_feature,
}

// Orden de las secciones de la página de inicio
export const homeSectionsOrder = {
  skills: 1,
  why_work_with_me: 2,
  clients: 4,
  projects: 3,
  contact: 5,
}
