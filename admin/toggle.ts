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

// Función para obtener variables de entorno del servidor de forma segura
function getServerEnvVar(key: string, defaultValue = true): boolean {
  if (typeof window !== "undefined") {
    // En el cliente, devolver el valor por defecto
    return defaultValue
  }

  try {
    return process.env[key] !== "true"
  } catch {
    return defaultValue
  }
}

// Función para obtener variables de entorno del cliente de forma segura
function getClientEnvVar(key: string, defaultValue = true): boolean {
  if (typeof window === "undefined") {
    // En el servidor, devolver el valor por defecto
    return defaultValue
  }

  try {
    // Solo acceder a variables NEXT_PUBLIC_ en el cliente
    const envValue = (window as any).__NEXT_DATA__?.props?.pageProps?.[key] || process.env[`NEXT_PUBLIC_${key}`]
    return envValue !== "true"
  } catch {
    return defaultValue
  }
}

// Configuraciones del servidor - Solo se utilizan en el lado del servidor
export const toggleSettings = {
  website: getServerEnvVar("DISABLE_WEBSITE", true),
  projects_page: getServerEnvVar("DISABLE_PROJECTS", true),
  services_page: getServerEnvVar("DISABLE_SERVICES", true),
  about_page: getServerEnvVar("DISABLE_ABOUT", true),
  contact_page: getServerEnvVar("DISABLE_CONTACT", true),
  resume_page: getServerEnvVar("DISABLE_RESUME", true),
  projects_home: getServerEnvVar("DISABLE_PROJECTS_HOME", true),
  services_home: getServerEnvVar("DISABLE_SERVICES_HOME", true),
  about_home: true,
  skills: getServerEnvVar("DISABLE_SKILLS", true),
  why_work_with_me: getServerEnvVar("DISABLE_WHY_WORK_WITH_ME", true),
  clients: getServerEnvVar("DISABLE_CLIENTS", true),
  contact_home: getServerEnvVar("DISABLE_CONTACT_HOME", true),
  freelance_platforms: true,
  payment_methods: true,
  contact_form: true,
  calendly_feature: true,
}

// Configuraciones del cliente - Solo se utilizan en el lado del cliente
// Utilizan variables de entorno que comienzan con NEXT_PUBLIC_
export const clientSettings = {
  website: getClientEnvVar("DISABLE_WEBSITE", defaultSettings.website),
  projects_page: getClientEnvVar("DISABLE_PROJECTS", defaultSettings.projects_page),
  services_page: getClientEnvVar("DISABLE_SERVICES", defaultSettings.services_page),
  about_page: getClientEnvVar("DISABLE_ABOUT", defaultSettings.about_page),
  contact_page: getClientEnvVar("DISABLE_CONTACT", defaultSettings.contact_page),
  resume_page: getClientEnvVar("DISABLE_RESUME", defaultSettings.resume_page),
  projects_home: getClientEnvVar("DISABLE_PROJECTS_HOME", defaultSettings.projects_home),
  services_home: getClientEnvVar("DISABLE_SERVICES_HOME", defaultSettings.services_home),
  about_home: defaultSettings.about_home,
  skills: getClientEnvVar("DISABLE_SKILLS", defaultSettings.skills),
  why_work_with_me: getClientEnvVar("DISABLE_WHY_WORK_WITH_ME", defaultSettings.why_work_with_me),
  clients: getClientEnvVar("DISABLE_CLIENTS", defaultSettings.clients),
  contact_home: getClientEnvVar("DISABLE_CONTACT_HOME", defaultSettings.contact_home),
  freelance_platforms: defaultSettings.freelance_platforms,
  payment_methods: defaultSettings.payment_methods,
  contact_form: defaultSettings.contact_form,
  calendly_feature: defaultSettings.calendly_feature,
}

// Configuraciones universales que funcionan tanto en servidor como cliente
export const universalSettings = {
  website: typeof window === "undefined" ? toggleSettings.website : clientSettings.website,
  projects_page: typeof window === "undefined" ? toggleSettings.projects_page : clientSettings.projects_page,
  services_page: typeof window === "undefined" ? toggleSettings.services_page : clientSettings.services_page,
  about_page: typeof window === "undefined" ? toggleSettings.about_page : clientSettings.about_page,
  contact_page: typeof window === "undefined" ? toggleSettings.contact_page : clientSettings.contact_page,
  resume_page: typeof window === "undefined" ? toggleSettings.resume_page : clientSettings.resume_page,
  projects_home: typeof window === "undefined" ? toggleSettings.projects_home : clientSettings.projects_home,
  services_home: typeof window === "undefined" ? toggleSettings.services_home : clientSettings.services_home,
  about_home: typeof window === "undefined" ? toggleSettings.about_home : clientSettings.about_home,
  skills: typeof window === "undefined" ? toggleSettings.skills : clientSettings.skills,
  why_work_with_me: typeof window === "undefined" ? toggleSettings.why_work_with_me : clientSettings.why_work_with_me,
  clients: typeof window === "undefined" ? toggleSettings.clients : clientSettings.clients,
  contact_home: typeof window === "undefined" ? toggleSettings.contact_home : clientSettings.contact_home,
  freelance_platforms:
    typeof window === "undefined" ? toggleSettings.freelance_platforms : clientSettings.freelance_platforms,
  payment_methods: typeof window === "undefined" ? toggleSettings.payment_methods : clientSettings.payment_methods,
  contact_form: typeof window === "undefined" ? toggleSettings.contact_form : clientSettings.contact_form,
  calendly_feature: typeof window === "undefined" ? toggleSettings.calendly_feature : clientSettings.calendly_feature,
}

// Orden de las secciones de la página de inicio
export const homeSectionsOrder = {
  skills: 1,
  why_work_with_me: 2,
  clients: 4,
  projects: 3,
  contact: 5,
}
