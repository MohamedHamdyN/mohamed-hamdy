import { supabase, createServerClient } from "./supabase"
import type {
  Profile,
  Skill,
  WorkReason,
  Client,
  Project,
  ProjectCategory,
  Service,
  Education,
  Journey,
  Certification,
  Stat,
  AboutFeature,
  FreelancePlatform,
  PaymentMethod,
  LanguageSettings,
} from "./supabase"

// Profile services
export const profileService = {
  async getProfile(): Promise<Profile | null> {
    const { data, error } = await supabase.from("profile").select("*").single()

    if (error) {
      console.error("Error fetching profile:", error)
      return null
    }

    return data
  },

  async updateProfile(profile: Partial<Profile>): Promise<Profile | null> {
    const serverClient = createServerClient()
    const { data, error } = await serverClient
      .from("profile")
      .update({ ...profile, updated_at: new Date().toISOString() })
      .eq("id", 1)
      .select()
      .single()

    if (error) {
      console.error("Error updating profile:", error)
      return null
    }

    return data
  },
}

// Skills services
export const skillsService = {
  async getSkills(): Promise<Skill[]> {
    const { data, error } = await supabase.from("skills").select("*").order("id")

    if (error) {
      console.error("Error fetching skills:", error)
      return []
    }

    return data || []
  },

  async getEnabledSkills(): Promise<Skill[]> {
    const { data, error } = await supabase.from("skills").select("*").eq("enabled", true).order("id")

    if (error) {
      console.error("Error fetching enabled skills:", error)
      return []
    }

    return data || []
  },
}

// Work reasons services
export const workReasonsService = {
  async getWorkReasons(): Promise<WorkReason[]> {
    const { data, error } = await supabase.from("work_reasons").select("*").order("id")

    if (error) {
      console.error("Error fetching work reasons:", error)
      return []
    }

    return data || []
  },

  async getEnabledWorkReasons(): Promise<WorkReason[]> {
    const { data, error } = await supabase.from("work_reasons").select("*").eq("enabled", true).order("id")

    if (error) {
      console.error("Error fetching enabled work reasons:", error)
      return []
    }

    return data || []
  },
}

// Clients services
export const clientsService = {
  async getClients(): Promise<Client[]> {
    const { data, error } = await supabase.from("clients").select("*").order("id")

    if (error) {
      console.error("Error fetching clients:", error)
      return []
    }

    return data || []
  },

  async getEnabledClients(): Promise<Client[]> {
    const { data, error } = await supabase.from("clients").select("*").eq("enabled", true).order("id")

    if (error) {
      console.error("Error fetching enabled clients:", error)
      return []
    }

    return data || []
  },
}

// Project categories services
export const projectCategoriesService = {
  async getProjectCategories(): Promise<ProjectCategory[]> {
    const { data, error } = await supabase.from("project_categories").select("*").order("id")

    if (error) {
      console.error("Error fetching project categories:", error)
      return []
    }

    return data || []
  },
}

// Projects services
export const projectsService = {
  async getProjects(): Promise<Project[]> {
    const { data, error } = await supabase
      .from("projects")
      .select(`
        *,
        project_categories (
          id,
          name,
          slug
        )
      `)
      .eq("enabled", true)
      .order("date", { ascending: false })

    if (error) {
      console.error("Error fetching projects:", error)
      return []
    }

    return data || []
  },

  async getFeaturedProjects(): Promise<Project[]> {
    const { data, error } = await supabase
      .from("projects")
      .select(`
        *,
        project_categories (
          id,
          name,
          slug
        )
      `)
      .eq("enabled", true)
      .eq("featured", true)
      .order("date", { ascending: false })

    if (error) {
      console.error("Error fetching featured projects:", error)
      return []
    }

    return data || []
  },

  async getProjectById(id: number): Promise<Project | null> {
    const { data, error } = await supabase
      .from("projects")
      .select(`
        *,
        project_categories (
          id,
          name,
          slug
        )
      `)
      .eq("id", id)
      .eq("enabled", true)
      .single()

    if (error) {
      console.error("Error fetching project:", error)
      return null
    }

    return data
  },
}

// Services services
export const servicesService = {
  async getServices(): Promise<Service[]> {
    const { data, error } = await supabase.from("services").select("*").order("id")

    if (error) {
      console.error("Error fetching services:", error)
      return []
    }

    return data || []
  },

  async getEnabledServices(): Promise<Service[]> {
    const { data, error } = await supabase.from("services").select("*").eq("enabled", true).order("id")

    if (error) {
      console.error("Error fetching enabled services:", error)
      return []
    }

    return data || []
  },
}

// Education services
export const educationService = {
  async getEducation(): Promise<Education[]> {
    const { data, error } = await supabase.from("education").select("*").order("id")

    if (error) {
      console.error("Error fetching education:", error)
      return []
    }

    return data || []
  },
}

// Journey services
export const journeyService = {
  async getJourney(): Promise<Journey[]> {
    const { data, error } = await supabase.from("journey").select("*").order("year", { ascending: false })

    if (error) {
      console.error("Error fetching journey:", error)
      return []
    }

    return data || []
  },
}

// Certifications services
export const certificationsService = {
  async getCertifications(): Promise<Certification[]> {
    const { data, error } = await supabase.from("certifications").select("*").order("date", { ascending: false })

    if (error) {
      console.error("Error fetching certifications:", error)
      return []
    }

    return data || []
  },

  async getEnabledCertifications(): Promise<Certification[]> {
    const { data, error } = await supabase
      .from("certifications")
      .select("*")
      .eq("enabled", true)
      .order("date", { ascending: false })

    if (error) {
      console.error("Error fetching enabled certifications:", error)
      return []
    }

    return data || []
  },
}

// Stats services
export const statsService = {
  async getStats(): Promise<Stat[]> {
    const { data, error } = await supabase.from("stats").select("*").order("id")

    if (error) {
      console.error("Error fetching stats:", error)
      return []
    }

    return data || []
  },

  async getEnabledStats(): Promise<Stat[]> {
    const { data, error } = await supabase.from("stats").select("*").eq("enabled", true).order("id")

    if (error) {
      console.error("Error fetching enabled stats:", error)
      return []
    }

    return data || []
  },
}

// About features services
export const aboutFeaturesService = {
  async getAboutFeatures(): Promise<AboutFeature[]> {
    const { data, error } = await supabase.from("about_features").select("*").order("id").limit(6)

    if (error) {
      console.error("Error fetching about features:", error)
      return []
    }

    return data || []
  },
}

// Freelance platforms services
export const freelancePlatformsService = {
  async getFreelancePlatforms(): Promise<FreelancePlatform[]> {
    const { data, error } = await supabase.from("freelance_platforms").select("*").order("id")

    if (error) {
      console.error("Error fetching freelance platforms:", error)
      return []
    }

    return data || []
  },

  async getEnabledFreelancePlatforms(): Promise<FreelancePlatform[]> {
    const { data, error } = await supabase.from("freelance_platforms").select("*").eq("enabled", true).order("id")

    if (error) {
      console.error("Error fetching enabled freelance platforms:", error)
      return []
    }

    return data || []
  },
}

// Payment methods services
export const paymentMethodsService = {
  async getPaymentMethods(): Promise<PaymentMethod[]> {
    const { data, error } = await supabase.from("payment_methods").select("*").order("id")

    if (error) {
      console.error("Error fetching payment methods:", error)
      return []
    }

    return data || []
  },
}

// Settings services
export const settingsService = {
  async getSettings(): Promise<Record<string, boolean>> {
    const { data, error } = await supabase.from("settings").select("key, value")

    if (error) {
      console.error("Error fetching settings:", error)
      return {}
    }

    const settings: Record<string, boolean> = {}
    data?.forEach((setting) => {
      settings[setting.key] = setting.value
    })

    return settings
  },

  async getSetting(key: string): Promise<boolean> {
    const { data, error } = await supabase.from("settings").select("value").eq("key", key).single()

    if (error) {
      console.error(`Error fetching setting ${key}:`, error)
      return true // Default to true
    }

    return data?.value ?? true
  },

  async updateSetting(key: string, value: boolean): Promise<boolean> {
    const serverClient = createServerClient()
    const { error } = await serverClient
      .from("settings")
      .update({ value, updated_at: new Date().toISOString() })
      .eq("key", key)

    if (error) {
      console.error(`Error updating setting ${key}:`, error)
      return false
    }

    return true
  },
}

// Language settings services
export const languageSettingsService = {
  async getLanguageSettings(): Promise<LanguageSettings | null> {
    const { data, error } = await supabase.from("language_settings").select("*").single()

    if (error) {
      console.error("Error fetching language settings:", error)
      return null
    }

    return data
  },
}

// Cache management
class CacheManager {
  private cache = new Map<string, { data: any; timestamp: number }>()
  private readonly TTL = 5 * 60 * 1000 // 5 minutes

  set(key: string, data: any) {
    this.cache.set(key, { data, timestamp: Date.now() })
  }

  get(key: string) {
    const cached = this.cache.get(key)
    if (!cached) return null

    if (Date.now() - cached.timestamp > this.TTL) {
      this.cache.delete(key)
      return null
    }

    return cached.data
  }

  clear() {
    this.cache.clear()
  }
}

export const cache = new CacheManager()

// Cached service functions
export const cachedServices = {
  async getProfile(): Promise<Profile | null> {
    const cacheKey = "profile"
    const cached = cache.get(cacheKey)
    if (cached) return cached

    const data = await profileService.getProfile()
    if (data) cache.set(cacheKey, data)
    return data
  },

  async getEnabledSkills(): Promise<Skill[]> {
    const cacheKey = "skills_enabled"
    const cached = cache.get(cacheKey)
    if (cached) return cached

    const data = await skillsService.getEnabledSkills()
    cache.set(cacheKey, data)
    return data
  },

  async getEnabledWorkReasons(): Promise<WorkReason[]> {
    const cacheKey = "work_reasons_enabled"
    const cached = cache.get(cacheKey)
    if (cached) return cached

    const data = await workReasonsService.getEnabledWorkReasons()
    cache.set(cacheKey, data)
    return data
  },

  async getEnabledClients(): Promise<Client[]> {
    const cacheKey = "clients_enabled"
    const cached = cache.get(cacheKey)
    if (cached) return cached

    const data = await clientsService.getEnabledClients()
    cache.set(cacheKey, data)
    return data
  },

  async getProjects(): Promise<Project[]> {
    const cacheKey = "projects"
    const cached = cache.get(cacheKey)
    if (cached) return cached

    const data = await projectsService.getProjects()
    cache.set(cacheKey, data)
    return data
  },

  async getFeaturedProjects(): Promise<Project[]> {
    const cacheKey = "projects_featured"
    const cached = cache.get(cacheKey)
    if (cached) return cached

    const data = await projectsService.getFeaturedProjects()
    cache.set(cacheKey, data)
    return data
  },

  async getEnabledServices(): Promise<Service[]> {
    const cacheKey = "services_enabled"
    const cached = cache.get(cacheKey)
    if (cached) return cached

    const data = await servicesService.getEnabledServices()
    cache.set(cacheKey, data)
    return data
  },

  async getSettings(): Promise<Record<string, boolean>> {
    const cacheKey = "settings"
    const cached = cache.get(cacheKey)
    if (cached) return cached

    const data = await settingsService.getSettings()
    cache.set(cacheKey, data)
    return data
  },
}
