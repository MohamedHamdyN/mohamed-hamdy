import { supabase, createServerClient, testSupabaseConnection } from "./supabase"
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

// Connection check
let connectionTested = false
let connectionWorking = false

async function ensureConnection() {
  if (!connectionTested) {
    connectionWorking = await testSupabaseConnection()
    connectionTested = true
  }
  return connectionWorking
}

// Profile services
export const profileService = {
  async getProfile(): Promise<Profile | null> {
    try {
      const isConnected = await ensureConnection()
      if (!isConnected) {
        console.warn("Supabase connection not available, returning default profile")
        return {
          id: 1,
          name: "Mohamed Hamdy",
          email: "muhamedhamdynour@gmail.com",
          phone: "+20 123 456 7890",
          location: "Egypt",
          short_bio:
            "Data Analyst & Financial Accountant with expertise in transforming complex data into actionable insights.",
          long_bio:
            "Experienced Data Analyst and Financial Accountant with a passion for turning complex data into actionable business insights. Specialized in financial modeling, data visualization, and business intelligence solutions.",
          logo: "/placeholder.svg?height=100&width=100&text=MH",
          resume_url: "#",
          linkedin_url: "https://linkedin.com/in/mohamed-hamdy",
          github_url: "https://github.com/mohamed-hamdy",
          created_at: new Date().toISOString(),
          updated_at: new Date().toISOString(),
        }
      }

      const { data, error } = await supabase.from("profile").select("*").single()

      if (error) {
        console.error("Error fetching profile:", error)
        return null
      }

      return data
    } catch (error) {
      console.error("Profile service error:", error)
      return null
    }
  },

  async updateProfile(profile: Partial<Profile>): Promise<Profile | null> {
    try {
      const isConnected = await ensureConnection()
      if (!isConnected) {
        console.warn("Supabase connection not available")
        return null
      }

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
    } catch (error) {
      console.error("Update profile service error:", error)
      return null
    }
  },
}

// Skills services
export const skillsService = {
  async getSkills(): Promise<Skill[]> {
    try {
      const isConnected = await ensureConnection()
      if (!isConnected) {
        return []
      }

      const { data, error } = await supabase.from("skills").select("*").order("id")

      if (error) {
        console.error("Error fetching skills:", error)
        return []
      }

      return data || []
    } catch (error) {
      console.error("Skills service error:", error)
      return []
    }
  },

  async getEnabledSkills(): Promise<Skill[]> {
    try {
      const isConnected = await ensureConnection()
      if (!isConnected) {
        return []
      }

      const { data, error } = await supabase.from("skills").select("*").eq("enabled", true).order("id")

      if (error) {
        console.error("Error fetching enabled skills:", error)
        return []
      }

      return data || []
    } catch (error) {
      console.error("Enabled skills service error:", error)
      return []
    }
  },
}

// Work reasons services
export const workReasonsService = {
  async getWorkReasons(): Promise<WorkReason[]> {
    try {
      const isConnected = await ensureConnection()
      if (!isConnected) {
        return []
      }

      const { data, error } = await supabase.from("work_reasons").select("*").order("id")

      if (error) {
        console.error("Error fetching work reasons:", error)
        return []
      }

      return data || []
    } catch (error) {
      console.error("Work reasons service error:", error)
      return []
    }
  },

  async getEnabledWorkReasons(): Promise<WorkReason[]> {
    try {
      const isConnected = await ensureConnection()
      if (!isConnected) {
        return []
      }

      const { data, error } = await supabase.from("work_reasons").select("*").eq("enabled", true).order("id")

      if (error) {
        console.error("Error fetching enabled work reasons:", error)
        return []
      }

      return data || []
    } catch (error) {
      console.error("Enabled work reasons service error:", error)
      return []
    }
  },
}

// Clients services
export const clientsService = {
  async getClients(): Promise<Client[]> {
    try {
      const isConnected = await ensureConnection()
      if (!isConnected) {
        return []
      }

      const { data, error } = await supabase.from("clients").select("*").order("id")

      if (error) {
        console.error("Error fetching clients:", error)
        return []
      }

      return data || []
    } catch (error) {
      console.error("Clients service error:", error)
      return []
    }
  },

  async getEnabledClients(): Promise<Client[]> {
    try {
      const isConnected = await ensureConnection()
      if (!isConnected) {
        return []
      }

      const { data, error } = await supabase.from("clients").select("*").eq("enabled", true).order("id")

      if (error) {
        console.error("Error fetching enabled clients:", error)
        return []
      }

      return data || []
    } catch (error) {
      console.error("Enabled clients service error:", error)
      return []
    }
  },
}

// Project categories services
export const projectCategoriesService = {
  async getProjectCategories(): Promise<ProjectCategory[]> {
    try {
      const isConnected = await ensureConnection()
      if (!isConnected) {
        return []
      }

      const { data, error } = await supabase.from("project_categories").select("*").order("id")

      if (error) {
        console.error("Error fetching project categories:", error)
        return []
      }

      return data || []
    } catch (error) {
      console.error("Project categories service error:", error)
      return []
    }
  },
}

// Projects services
export const projectsService = {
  async getProjects(): Promise<Project[]> {
    try {
      const isConnected = await ensureConnection()
      if (!isConnected) {
        return []
      }

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
    } catch (error) {
      console.error("Projects service error:", error)
      return []
    }
  },

  async getFeaturedProjects(): Promise<Project[]> {
    try {
      const isConnected = await ensureConnection()
      if (!isConnected) {
        return []
      }

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
    } catch (error) {
      console.error("Featured projects service error:", error)
      return []
    }
  },

  async getProjectById(id: number): Promise<Project | null> {
    try {
      const isConnected = await ensureConnection()
      if (!isConnected) {
        return null
      }

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
    } catch (error) {
      console.error("Project by ID service error:", error)
      return null
    }
  },
}

// Services services
export const servicesService = {
  async getServices(): Promise<Service[]> {
    try {
      const isConnected = await ensureConnection()
      if (!isConnected) {
        return []
      }

      const { data, error } = await supabase.from("services").select("*").order("id")

      if (error) {
        console.error("Error fetching services:", error)
        return []
      }

      return data || []
    } catch (error) {
      console.error("Services service error:", error)
      return []
    }
  },

  async getEnabledServices(): Promise<Service[]> {
    try {
      const isConnected = await ensureConnection()
      if (!isConnected) {
        return []
      }

      const { data, error } = await supabase.from("services").select("*").eq("enabled", true).order("id")

      if (error) {
        console.error("Error fetching enabled services:", error)
        return []
      }

      return data || []
    } catch (error) {
      console.error("Enabled services service error:", error)
      return []
    }
  },
}

// Education services
export const educationService = {
  async getEducation(): Promise<Education[]> {
    try {
      const isConnected = await ensureConnection()
      if (!isConnected) {
        return []
      }

      const { data, error } = await supabase.from("education").select("*").order("id")

      if (error) {
        console.error("Error fetching education:", error)
        return []
      }

      return data || []
    } catch (error) {
      console.error("Education service error:", error)
      return []
    }
  },
}

// Journey services
export const journeyService = {
  async getJourney(): Promise<Journey[]> {
    try {
      const isConnected = await ensureConnection()
      if (!isConnected) {
        return []
      }

      const { data, error } = await supabase.from("journey").select("*").order("year", { ascending: false })

      if (error) {
        console.error("Error fetching journey:", error)
        return []
      }

      return data || []
    } catch (error) {
      console.error("Journey service error:", error)
      return []
    }
  },
}

// Certifications services
export const certificationsService = {
  async getCertifications(): Promise<Certification[]> {
    try {
      const isConnected = await ensureConnection()
      if (!isConnected) {
        return []
      }

      const { data, error } = await supabase.from("certifications").select("*").order("date", { ascending: false })

      if (error) {
        console.error("Error fetching certifications:", error)
        return []
      }

      return data || []
    } catch (error) {
      console.error("Certifications service error:", error)
      return []
    }
  },

  async getEnabledCertifications(): Promise<Certification[]> {
    try {
      const isConnected = await ensureConnection()
      if (!isConnected) {
        return []
      }

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
    } catch (error) {
      console.error("Enabled certifications service error:", error)
      return []
    }
  },
}

// Stats services
export const statsService = {
  async getStats(): Promise<Stat[]> {
    try {
      const isConnected = await ensureConnection()
      if (!isConnected) {
        return []
      }

      const { data, error } = await supabase.from("stats").select("*").order("id")

      if (error) {
        console.error("Error fetching stats:", error)
        return []
      }

      return data || []
    } catch (error) {
      console.error("Stats service error:", error)
      return []
    }
  },

  async getEnabledStats(): Promise<Stat[]> {
    try {
      const isConnected = await ensureConnection()
      if (!isConnected) {
        return []
      }

      const { data, error } = await supabase.from("stats").select("*").eq("enabled", true).order("id")

      if (error) {
        console.error("Error fetching enabled stats:", error)
        return []
      }

      return data || []
    } catch (error) {
      console.error("Enabled stats service error:", error)
      return []
    }
  },
}

// About features services
export const aboutFeaturesService = {
  async getAboutFeatures(): Promise<AboutFeature[]> {
    try {
      const isConnected = await ensureConnection()
      if (!isConnected) {
        return []
      }

      const { data, error } = await supabase.from("about_features").select("*").order("id").limit(6)

      if (error) {
        console.error("Error fetching about features:", error)
        return []
      }

      return data || []
    } catch (error) {
      console.error("About features service error:", error)
      return []
    }
  },
}

// Freelance platforms services
export const freelancePlatformsService = {
  async getFreelancePlatforms(): Promise<FreelancePlatform[]> {
    try {
      const isConnected = await ensureConnection()
      if (!isConnected) {
        return []
      }

      const { data, error } = await supabase.from("freelance_platforms").select("*").order("id")

      if (error) {
        console.error("Error fetching freelance platforms:", error)
        return []
      }

      return data || []
    } catch (error) {
      console.error("Freelance platforms service error:", error)
      return []
    }
  },

  async getEnabledFreelancePlatforms(): Promise<FreelancePlatform[]> {
    try {
      const isConnected = await ensureConnection()
      if (!isConnected) {
        return []
      }

      const { data, error } = await supabase.from("freelance_platforms").select("*").eq("enabled", true).order("id")

      if (error) {
        console.error("Error fetching enabled freelance platforms:", error)
        return []
      }

      return data || []
    } catch (error) {
      console.error("Enabled freelance platforms service error:", error)
      return []
    }
  },
}

// Payment methods services
export const paymentMethodsService = {
  async getPaymentMethods(): Promise<PaymentMethod[]> {
    try {
      const isConnected = await ensureConnection()
      if (!isConnected) {
        return []
      }

      const { data, error } = await supabase.from("payment_methods").select("*").order("id")

      if (error) {
        console.error("Error fetching payment methods:", error)
        return []
      }

      return data || []
    } catch (error) {
      console.error("Payment methods service error:", error)
      return []
    }
  },
}

// Settings services
export const settingsService = {
  async getSettings(): Promise<Record<string, boolean>> {
    try {
      const isConnected = await ensureConnection()
      if (!isConnected) {
        console.warn("Supabase connection not available, returning default settings")
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
    } catch (error) {
      console.error("Settings service error:", error)
      return {}
    }
  },

  async getSetting(key: string): Promise<boolean> {
    try {
      const isConnected = await ensureConnection()
      if (!isConnected) {
        return true // Default to true
      }

      const { data, error } = await supabase.from("settings").select("value").eq("key", key).single()

      if (error) {
        console.error(`Error fetching setting ${key}:`, error)
        return true // Default to true
      }

      return data?.value ?? true
    } catch (error) {
      console.error(`Setting ${key} service error:`, error)
      return true
    }
  },

  async updateSetting(key: string, value: boolean): Promise<boolean> {
    try {
      const isConnected = await ensureConnection()
      if (!isConnected) {
        return false
      }

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
    } catch (error) {
      console.error(`Update setting ${key} service error:`, error)
      return false
    }
  },
}

// Language settings services
export const languageSettingsService = {
  async getLanguageSettings(): Promise<LanguageSettings | null> {
    try {
      const isConnected = await ensureConnection()
      if (!isConnected) {
        console.warn("Supabase connection not available, returning default language settings")
        return {
          id: 1,
          enable_language_toggle: false,
          default_language: "en",
          created_at: new Date().toISOString(),
          updated_at: new Date().toISOString(),
        }
      }

      const { data, error } = await supabase.from("language_settings").select("*").single()

      if (error) {
        console.error("Error fetching language settings:", error)
        return null
      }

      return data
    } catch (error) {
      console.error("Language settings service error:", error)
      return null
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
