import { createClient } from '@supabase/supabase-js'
import { settingsService, languageSettingsService } from './database'

// ✅ Supabase Client مباشر
const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
)

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

// ✅ دالة رئيسية للحصول على الإعدادات
export async function getSettings(): Promise<Record<string, boolean>> {
  try {
    const { data, error } = await supabase
      .from('settings')
      .select('*')
      .limit(1)
      .maybeSingle()

    if (error || !data) {
      console.error('⚠️ Supabase error in getSettings():', error?.message || 'No data found')
      return DEFAULT_SETTINGS
    }

    console.log('✅ Settings from Supabase:', data)
    return { ...DEFAULT_SETTINGS, ...data }
  } catch (error) {
    console.error('❌ Unexpected error in getSettings():', error)
    return DEFAULT_SETTINGS
  }
}


// ✅ دالة فردية لإعداد معين
export async function getSetting(key: string): Promise<boolean> {
  try {
    return await settingsService.getSetting(key)
  } catch (error) {
    console.error(`Error fetching setting ${key}:`, error)
    return DEFAULT_SETTINGS[key as keyof typeof DEFAULT_SETTINGS] ?? true
  }
}

// ✅ إعدادات اللغة
export async function getLanguageSettings() {
  try {
    const settings = await languageSettingsService.getLanguageSettings()
    return (
      settings || {
        enable_language_toggle: false,
        default_language: 'en',
      }
    )
  } catch (error) {
    console.error('Error fetching language settings:', error)
    return {
      enable_language_toggle: false,
      default_language: 'en',
    }
  }
}

// ✅ إعدادات للسيرفر / middleware
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
    console.error('Error fetching server settings:', error)

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
