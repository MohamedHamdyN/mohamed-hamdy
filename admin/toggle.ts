// الإعدادات الافتراضية - تُستخدم عندما لا تتوفر متغيرات البيئة
const defaultSettings = {
  // Main website toggle
  website: true,
  // Page toggles
  projects_page: true,
  services_page: true,
  about_page: true,
  contact_page: true,
  resume_page: true,
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
  contact_form: true,
  // Calendly feature toggle
  calendly_feature: true,
}

// إعدادات الخادم - تُستخدم فقط على جانب الخادم
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

// إعدادات العميل - تُستخدم فقط على جانب العميل
// تستخدم فقط متغيرات البيئة التي تبدأ بـ NEXT_PUBLIC_
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

// ترتيب أقسام الصفحة الرئيسية
export const homeSectionsOrder = {
  skills: 1,
  why_work_with_me: 2,
  clients: 4,
  projects: 3,
  contact: 5,
}
