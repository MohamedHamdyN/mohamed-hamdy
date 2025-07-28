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
    try {
      console.log("Fetching profile from database...")
      const { data, error } = await supabase.from("profile").select("*").single()

      if (error) {
        console.error("Database error fetching profile:", error)
        throw error
      }

      console.log("Profile fetched successfully:", data)
      return data
    } catch (error) {
      console.error("Error in getProfile:", error)
      throw error
    }
  },

  async updateProfile(profile: Partial<Profile>): Promise<Profile | null> {
    try {
      const serverClient = createServerClient()
      const { data, error } = await serverClient
        .from("profile")
        .update({ ...profile, updated_at: new Date().toISOString() })
        .eq("id", 1)
        .select()
        .single()

      if (error) {
        console.error("Error updating profile:", error)
        throw error
      }

      return data
    } catch (error) {
      console.error("Error in updateProfile:", error)
      throw error
    }
  },
}

// Skills services
export const skillsService = {
  async getSkills(): Promise<Skill[]> {
    try {
      console.log("Fetching skills from database...")
      const { data, error } = await supabase.from("skills").select("*").order("id")

      if (error) {
        console.error("Database error fetching skills:", error)
        throw error
      }

      console.log("Skills fetched successfully:", data?.length, "items")
      return data || []
    } catch (error) {
      console.error("Error in getSkills:", error)
      throw error
    }
  },

  async getEnabledSkills(): Promise<Skill[]> {
    try {
      console.log("Fetching enabled skills from database...")
      const { data, error } = await supabase.from("skills").select("*").eq("enabled", true).order("id")

      if (error) {
        console.error("Database error fetching enabled skills:", error)
        throw error
      }

      console.log("Enabled skills fetched successfully:", data?.length, "items")
      return data || []
    } catch (error) {
      console.error("Error in getEnabledSkills:", error)
      throw error
    }
  },
}

// Work reasons services
export const workReasonsService = {
  async getWorkReasons(): Promise<WorkReason[]> {
    try {
      console.log("Fetching work reasons from database...")
      const { data, error } = await supabase.from("work_reasons").select("*").order("id")

      if (error) {
        console.error("Database error fetching work reasons:", error)
        throw error
      }

      console.log("Work reasons fetched successfully:", data?.length, "items")
      return data || []
    } catch (error) {
      console.error("Error in getWorkReasons:", error)
      throw error
    }
  },

  async getEnabledWorkReasons(): Promise<WorkReason[]> {
    try {
      console.log("Fetching enabled work reasons from database...")
      const { data, error } = await supabase.from("work_reasons").select("*").eq("enabled", true).order("id")

      if (error) {
        console.error("Database error fetching enabled work reasons:", error)
        throw error
      }

      console.log("Enabled work reasons fetched successfully:", data?.length, "items")
      return data || []
    } catch (error) {
      console.error("Error in getEnabledWorkReasons:", error)
      throw error
    }
  },
}

// Clients services
export const clientsService = {
  async getClients(): Promise<Client[]> {
    try {
      console.log("Fetching clients from database...")
      const { data, error } = await supabase.from("clients").select("*").order("id")

      if (error) {
        console.error("Database error fetching clients:", error)
        throw error
      }

      console.log("Clients fetched successfully:", data?.length, "items")
      return data || []
    } catch (error) {
      console.error("Error in getClients:", error)
      throw error
    }
  },

  async getEnabledClients(): Promise<Client[]> {
    try {
      console.log("Fetching enabled clients from database...")
      const { data, error } = await supabase.from("clients").select("*").eq("enabled", true).order("id")

      if (error) {
        console.error("Database error fetching enabled clients:", error)
        throw error
      }

      console.log("Enabled clients fetched successfully:", data?.length, "items")
      return data || []
    } catch (error) {
      console.error("Error in getEnabledClients:", error)
      throw error
    }
  },
}

// Project categories services
export const projectCategoriesService = {
  async getProjectCategories(): Promise<ProjectCategory[]> {
    try {
      console.log("Fetching project categories from database...")
      const { data, error } = await supabase.from("project_categories").select("*").order("id")

      if (error) {
        console.error("Database error fetching project categories:", error)
        throw error
      }

      console.log("Project categories fetched successfully:", data?.length, "items")
      return data || []
    } catch (error) {
      console.error("Error in getProjectCategories:", error)
      throw error
    }
  },
}

// Projects services
export const projectsService = {
  async getProjects(): Promise<Project[]> {
    try {
      console.log("Fetching projects from database...")
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
        console.error("Database error fetching projects:", error)
        throw error
      }

      console.log("Projects fetched successfully:", data?.length, "items")
      return data || []
    } catch (error) {
      console.error("Error in getProjects:", error)
      throw error
    }
  },

  async getFeaturedProjects(): Promise<Project[]> {
    try {
      console.log("Fetching featured projects from database...")
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
        console.error("Database error fetching featured projects:", error)
        throw error
      }

      console.log("Featured projects fetched successfully:", data?.length, "items")
      return data || []
    } catch (error) {
      console.error("Error in getFeaturedProjects:", error)
      throw error
    }
  },

  async getProjectById(id: number): Promise<Project | null> {
    try {
      console.log("Fetching project by ID:", id)
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
        console.error("Database error fetching project:", error)
        throw error
      }

      console.log("Project fetched successfully:", data)
      return data
    } catch (error) {
      console.error("Error in getProjectById:", error)
      throw error
    }
  },
}

// Services services
export const servicesService = {
  async getServices(): Promise<Service[]> {
    try {
      console.log("Fetching services from database...")
      const { data, error } = await supabase.from("services").select("*").order("id")

      if (error) {
        console.error("Database error fetching services:", error)
        throw error
      }

      console.log("Services fetched successfully:", data?.length, "items")
      return data || []
    } catch (error) {
      console.error("Error in getServices:", error)
      throw error
    }
  },

  async getEnabledServices(): Promise<Service[]> {
    try {
      console.log("Fetching enabled services from database...")
      const { data, error } = await supabase.from("services").select("*").eq("enabled", true).order("id")

      if (error) {
        console.error("Database error fetching enabled services:", error)
        throw error
      }

      console.log("Enabled services fetched successfully:", data?.length, "items")
      return data || []
    } catch (error) {
      console.error("Error in getEnabledServices:", error)
      throw error
    }
  },
}

// Education services
export const educationService = {
  async getEducation(): Promise<Education[]> {
    try {
      console.log("Fetching education from database...")
      const { data, error } = await supabase.from("education").select("*").order("id")

      if (error) {
        console.error("Database error fetching education:", error)
        throw error
      }

      console.log("Education fetched successfully:", data?.length, "items")
      return data || []
    } catch (error) {
      console.error("Error in getEducation:", error)
      throw error
    }
  },
}

// Journey services
export const journeyService = {
  async getJourney(): Promise<Journey[]> {
    try {
      console.log("Fetching journey from database...")
      const { data, error } = await supabase.from("journey").select("*").order("year", { ascending: false })

      if (error) {
        console.error("Database error fetching journey:", error)
        throw error
      }

      console.log("Journey fetched successfully:", data?.length, "items")
      return data || []
    } catch (error) {
      console.error("Error in getJourney:", error)
      throw error
    }
  },
}

// Certifications services
export const certificationsService = {
  async getCertifications(): Promise<Certification[]> {
    try {
      console.log("Fetching certifications from database...")
      const { data, error } = await supabase.from("certifications").select("*").order("date", { ascending: false })

      if (error) {
        console.error("Database error fetching certifications:", error)
        throw error
      }

      console.log("Certifications fetched successfully:", data?.length, "items")
      return data || []
    } catch (error) {
      console.error("Error in getCertifications:", error)
      throw error
    }
  },

  async getEnabledCertifications(): Promise<Certification[]> {
    try {
      console.log("Fetching enabled certifications from database...")
      const { data, error } = await supabase
        .from("certifications")
        .select("*")
        .eq("enabled", true)
        .order("date", { ascending: false })

      if (error) {
        console.error("Database error fetching enabled certifications:", error)
        throw error
      }

      console.log("Enabled certifications fetched successfully:", data?.length, "items")
      return data || []
    } catch (error) {
      console.error("Error in getEnabledCertifications:", error)
      throw error
    }
  },
}

// Stats services
export const statsService = {
  async getStats(): Promise<Stat[]> {
    try {
      console.log("Fetching stats from database...")
      const { data, error } = await supabase.from("stats").select("*").order("id")

      if (error) {
        console.error("Database error fetching stats:", error)
        throw error
      }

      console.log("Stats fetched successfully:", data?.length, "items")
      return data || []
    } catch (error) {
      console.error("Error in getStats:", error)
      throw error
    }
  },

  async getEnabledStats(): Promise<Stat[]> {
    try {
      console.log("Fetching enabled stats from database...")
      const { data, error } = await supabase.from("stats").select("*").eq("enabled", true).order("id")

      if (error) {
        console.error("Database error fetching enabled stats:", error)
        throw error
      }

      console.log("Enabled stats fetched successfully:", data?.length, "items")
      return data || []
    } catch (error) {
      console.error("Error in getEnabledStats:", error)
      throw error
    }
  },
}

// About features services
export const aboutFeaturesService = {
  async getAboutFeatures(): Promise<AboutFeature[]> {
    try {
      console.log("Fetching about features from database...")
      const { data, error } = await supabase.from("about_features").select("*").order("id").limit(6)

      if (error) {
        console.error("Database error fetching about features:", error)
        throw error
      }

      console.log("About features fetched successfully:", data?.length, "items")
      return data || []
    } catch (error) {
      console.error("Error in getAboutFeatures:", error)
      throw error
    }
  },
}

// Freelance platforms services
export const freelancePlatformsService = {
  async getFreelancePlatforms(): Promise<FreelancePlatform[]> {
    try {
      console.log("Fetching freelance platforms from database...")
      const { data, error } = await supabase.from("freelance_platforms").select("*").order("id")

      if (error) {
        console.error("Database error fetching freelance platforms:", error)
        throw error
      }

      console.log("Freelance platforms fetched successfully:", data?.length, "items")
      return data || []
    } catch (error) {
      console.error("Error in getFreelancePlatforms:", error)
      throw error
    }
  },

  async getEnabledFreelancePlatforms(): Promise<FreelancePlatform[]> {
    try {
      console.log("Fetching enabled freelance platforms from database...")
      const { data, error } = await supabase.from("freelance_platforms").select("*").eq("enabled", true).order("id")

      if (error) {
        console.error("Database error fetching enabled freelance platforms:", error)
        throw error
      }

      console.log("Enabled freelance platforms fetched successfully:", data?.length, "items")
      return data || []
    } catch (error) {
      console.error("Error in getEnabledFreelancePlatforms:", error)
      throw error
    }
  },
}

// Payment methods services
export const paymentMethodsService = {
  async getPaymentMethods(): Promise<PaymentMethod[]> {
    try {
      console.log("Fetching payment methods from database...")
      const { data, error } = await supabase.from("payment_methods").select("*").order("id")

      if (error) {
        console.error("Database error fetching payment methods:", error)
        throw error
      }

      console.log("Payment methods fetched successfully:", data?.length, "items")
      return data || []
    } catch (error) {
      console.error("Error in getPaymentMethods:", error)
      throw error
    }
  },
}

// Settings services
export const settingsService = {
  async getSettings(): Promise<Record<string, boolean>> {
    try {
      console.log("Fetching settings from database...")
      const { data, error } = await supabase.from("settings").select("key, value")

      if (error) {
        console.error("Database error fetching settings:", error)
        throw error
      }

      const settings: Record<string, boolean> = {}
      data?.forEach((setting) => {
        settings[setting.key] = setting.value
      })

      console.log("Settings fetched successfully:", Object.keys(settings).length, "settings")
      return settings
    } catch (error) {
      console.error("Error in getSettings:", error)
      throw error
    }
  },

  async getSetting(key: string): Promise<boolean> {
    try {
      console.log("Fetching setting:", key)
      const { data, error } = await supabase.from("settings").select("value").eq("key", key).single()

      if (error) {
        console.error(`Database error fetching setting ${key}:`, error)
        throw error
      }

      console.log(`Setting ${key} fetched successfully:`, data?.value)
      return data?.value ?? true
    } catch (error) {
      console.error(`Error in getSetting ${key}:`, error)
      throw error
    }
  },

  async updateSetting(key: string, value: boolean): Promise<boolean> {
    try {
      const serverClient = createServerClient()
      const { error } = await serverClient
        .from("settings")
        .update({ value, updated_at: new Date().toISOString() })
        .eq("key", key)

      if (error) {
        console.error(`Error updating setting ${key}:`, error)
        throw error
      }

      return true
    } catch (error) {
      console.error(`Error in updateSetting ${key}:`, error)
      throw error
    }
  },
}

// Language settings services
export const languageSettingsService = {
  async getLanguageSettings(): Promise<LanguageSettings | null> {
    try {
      console.log("Fetching language settings from database...")
      const { data, error } = await supabase.from("language_settings").select("*").single()

      if (error) {
        console.error("Database error fetching language settings:", error)
        throw error
      }

      console.log("Language settings fetched successfully:", data)
      return data
    } catch (error) {
      console.error("Error in getLanguageSettings:", error)
      throw error
    }
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

// Cached service functions with fallback to direct database calls
export const cachedServices = {
  async getProfile(): Promise<Profile | null> {
    const cacheKey = "profile"
    const cached = cache.get(cacheKey)
    if (cached) return cached

    try {
      const data = await profileService.getProfile()
      if (data) cache.set(cacheKey, data)
      return data
    } catch (error) {
      console.error("Failed to fetch profile from database:", error)
      return null
    }
  },

  async getEnabledSkills(): Promise<Skill[]> {
    const cacheKey = "skills_enabled"
    const cached = cache.get(cacheKey)
    if (cached) return cached

    try {
      const data = await skillsService.getEnabledSkills()
      cache.set(cacheKey, data)
      return data
    } catch (error) {
      console.error("Failed to fetch skills from database:", error)
      return []
    }
  },

  async getEnabledWorkReasons(): Promise<WorkReason[]> {
    const cacheKey = "work_reasons_enabled"
    const cached = cache.get(cacheKey)
    if (cached) return cached

    try {
      const data = await workReasonsService.getEnabledWorkReasons()
      cache.set(cacheKey, data)
      return data
    } catch (error) {
      console.error("Failed to fetch work reasons from database:", error)
      return []
    }
  },

  async getEnabledClients(): Promise<Client[]> {
    const cacheKey = "clients_enabled"
    const cached = cache.get(cacheKey)
    if (cached) return cached

    try {
      const data = await clientsService.getEnabledClients()
      cache.set(cacheKey, data)
      return data
    } catch (error) {
      console.error("Failed to fetch clients from database:", error)
      return []
    }
  },

  async getProjects(): Promise<Project[]> {
    const cacheKey = "projects"
    const cached = cache.get(cacheKey)
    if (cached) return cached

    try {
      const data = await projectsService.getProjects()
      cache.set(cacheKey, data)
      return data
    } catch (error) {
      console.error("Failed to fetch projects from database:", error)
      return []
    }
  },

  async getFeaturedProjects(): Promise<Project[]> {
    const cacheKey = "projects_featured"
    const cached = cache.get(cacheKey)
    if (cached) return cached

    try {
      const data = await projectsService.getFeaturedProjects()
      cache.set(cacheKey, data)
      return data
    } catch (error) {
      console.error("Failed to fetch featured projects from database:", error)
      return []
    }
  },

  async getEnabledServices(): Promise<Service[]> {
    const cacheKey = "services_enabled"
    const cached = cache.get(cacheKey)
    if (cached) return cached

    try {
      const data = await servicesService.getEnabledServices()
      cache.set(cacheKey, data)
      return data
    } catch (error) {
      console.error("Failed to fetch services from database:", error)
      return []
    }
  },

  async getSettings(): Promise<Record<string, boolean>> {
    const cacheKey = "settings"
    const cached = cache.get(cacheKey)
    if (cached) return cached

    try {
      const data = await settingsService.getSettings()
      cache.set(cacheKey, data)
      return data
    } catch (error) {
      console.error("Failed to fetch settings from database:", error)
      return {
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
    }
  },
}
