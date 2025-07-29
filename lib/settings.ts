import { createServerClient } from './supabase'

// ✅ Supabase Client مخصص للسيرفر باستخدام service role
const supabase = createServerClient()

console.log("🔑 Supabase URL:", process.env.NEXT_PUBLIC_SUPABASE_URL)
console.log("🔑 Supabase Key:", process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY)

const { data, error } = await supabase
  .from("skills")
  .select("*")
  .eq("enabled", true)

console.log("📦 Data:", data)
console.log("⚠️ Error:", error)

// ✅ إعدادات افتراضية (fallback)
const DEFAULT_SETTINGS = {
  website: true,
  projects_page: true,
  services_page: true,
  about_page: true,
  contact_page: true,
  resume_page: true,
  projects_home: true,
  services_home: true,
  about_home: true,
  skills: true,
  why_work_with_me: true,
  clients: true,
  contact_home: true,
  freelance_platforms: true,
  payment_methods: true,
  contact_form: true,
  calendly_feature: true,
}

// ✅ دالة رئيسية للحصول على الإعدادات كلها
export async function getSettings(): Promise<Record<string, boolean>> {
  try {
    const supabase = createServerClient()
    const { data, error } = await supabase.from("settings").select("key, value")

    if (error || !data) {
      console.error("⚠️ Error fetching settings:", error?.message || "No data")
      return DEFAULT_SETTINGS
    }

    const settingsFromDB: Record<string, boolean> = {}
    for (const row of data) {
      settingsFromDB[row.key] = row.value === true
    }

    return {
      ...DEFAULT_SETTINGS,
      ...settingsFromDB,
    }
  } catch (err) {
    console.error("❌ Unexpected error in getSettings():", err)
    return DEFAULT_SETTINGS
  }
}

// ✅ دالة فردية للحصول على إعداد معيّن
export async function getSetting(key: string): Promise<boolean> {
  try {
    const { data, error } = await supabase
      .from('settings')
      .select('value')
      .eq('key', key)
      .limit(1)
      .maybeSingle()

    if (error || !data) {
      console.error(`❌ Error fetching setting "${key}":`, error?.message || 'No data found')
      return DEFAULT_SETTINGS[key as keyof typeof DEFAULT_SETTINGS] ?? true
    }

    return data.value === true
  } catch (error) {
    console.error(`❌ Unexpected error in getSetting "${key}":`, error)
    return DEFAULT_SETTINGS[key as keyof typeof DEFAULT_SETTINGS] ?? true
  }
}

// ✅ إعدادات اللغة
export async function getLanguageSettings() {
  try {
    const { data, error } = await supabase
      .from('language_settings')
      .select('*')
      .limit(1)
      .maybeSingle()

    if (error || !data) {
      console.error('⚠️ Error fetching language settings:', error?.message || 'No data')
      return {
        enable_language_toggle: false,
        default_language: 'en',
      }
    }

    return data
  } catch (error) {
    console.error('❌ Unexpected error in getLanguageSettings():', error)
    return {
      enable_language_toggle: false,
      default_language: 'en',
    }
  }
}

// ✅ إعدادات السيرفر (middleware)
export async function getServerSettings(): Promise<Record<string, boolean>> {
  try {
    const dbSettings = await getSettings()

    return {
      website: process.env.DISABLE_WEBSITE !== 'true' && dbSettings.website,
      projects_page: process.env.DISABLE_PROJECTS !== 'true' && dbSettings.projects_page,
      services_page: process.env.DISABLE_SERVICES !== 'true' && dbSettings.services_page,
      about_page: process.env.DISABLE_ABOUT !== 'true' && dbSettings.about_page,
      contact_page: process.env.DISABLE_CONTACT !== 'true' && dbSettings.contact_page,
      resume_page: process.env.DISABLE_RESUME !== 'true' && dbSettings.resume_page,
      projects_home: process.env.DISABLE_PROJECTS_HOME !== 'true' && dbSettings.projects_home,
      services_home: process.env.DISABLE_SERVICES_HOME !== 'true' && dbSettings.services_home,
      about_home: dbSettings.about_home,
      skills: process.env.DISABLE_SKILLS !== 'true' && dbSettings.skills,
      why_work_with_me: process.env.DISABLE_WHY_WORK_WITH_ME !== 'true' && dbSettings.why_work_with_me,
      clients: process.env.DISABLE_CLIENTS !== 'true' && dbSettings.clients,
      contact_home: process.env.DISABLE_CONTACT_HOME !== 'true' && dbSettings.contact_home,
      freelance_platforms: dbSettings.freelance_platforms,
      payment_methods: dbSettings.payment_methods,
      contact_form: dbSettings.contact_form,
      calendly_feature: dbSettings.calendly_feature,
    }
  } catch (error) {
    console.error('❌ Error fetching server settings:', error)

    return {
      website: process.env.DISABLE_WEBSITE !== 'true',
      projects_page: process.env.DISABLE_PROJECTS !== 'true',
      services_page: process.env.DISABLE_SERVICES !== 'true',
      about_page: process.env.DISABLE_ABOUT !== 'true',
      contact_page: process.env.DISABLE_CONTACT !== 'true',
      resume_page: process.env.DISABLE_RESUME !== 'true',
      projects_home: process.env.DISABLE_PROJECTS_HOME !== 'true',
      services_home: process.env.DISABLE_SERVICES_HOME !== 'true',
      about_home: true,
      skills: process.env.DISABLE_SKILLS !== 'true',
      why_work_with_me: process.env.DISABLE_WHY_WORK_WITH_ME !== 'true',
      clients: process.env.DISABLE_CLIENTS !== 'true',
      contact_home: process.env.DISABLE_CONTACT_HOME !== 'true',
      freelance_platforms: true,
      payment_methods: true,
      contact_form: true,
      calendly_feature: true,
    }
  }
}
