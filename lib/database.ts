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
      const { data, error } = await supabase.from("profile").select("*").single()

      if (error) {
        console.error("Error fetching profile:", error)
        // Return default profile if database fails
        return {
          id: 1,
          name: "Mohamed Hamdy",
          title: "Data Analyst",
          title2: "Financial Accountant",
          bio: "Transforming complex data into actionable insights that drive business decisions.",
          short_bio: "Data Analyst & Financial Accountant",
          long_bio: "",
          email: "muhamedhamdynour@gmail.com",
          phone: "",
          location: "",
          logo: "",
          favicon: "",
          avatar: "",
          default_project_image: "",
          default_client_logo: "",
          default_platform_logo: "",
          og_image: "",
          resume_url: "",
          calendly_url: "",
          social_links: {},
          created_at: "",
          updated_at: "",
        }
      }

      return data
    } catch (error) {
      console.error("Error in getProfile:", error)
      return {
        id: 1,
        name: "Mohamed Hamdy",
        title: "Data Analyst",
        title2: "Financial Accountant",
        bio: "Transforming complex data into actionable insights that drive business decisions.",
        short_bio: "Data Analyst & Financial Accountant",
        long_bio: "",
        email: "muhamedhamdynour@gmail.com",
        phone: "",
        location: "",
        logo: "",
        favicon: "",
        avatar: "",
        default_project_image: "",
        default_client_logo: "",
        default_platform_logo: "",
        og_image: "",
        resume_url: "",
        calendly_url: "",
        social_links: {},
        created_at: "",
        updated_at: "",
      }
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
        return null
      }

      return data
    } catch (error) {
      console.error("Error in updateProfile:", error)
      return null
    }
  },
}

// Skills services
export const skillsService = {
  async getSkills(): Promise<Skill[]> {
    try {
      const { data, error } = await supabase.from("skills").select("*").order("id")

      if (error) {
        console.error("Error fetching skills:", error)
        return this.getDefaultSkills()
      }

      return data || this.getDefaultSkills()
    } catch (error) {
      console.error("Error in getSkills:", error)
      return this.getDefaultSkills()
    }
  },

  async getEnabledSkills(): Promise<Skill[]> {
    try {
      const { data, error } = await supabase.from("skills").select("*").eq("enabled", true).order("id")

      if (error) {
        console.error("Error fetching enabled skills:", error)
        return this.getDefaultSkills()
      }

      return data || this.getDefaultSkills()
    } catch (error) {
      console.error("Error in getEnabledSkills:", error)
      return this.getDefaultSkills()
    }
  },

  getDefaultSkills(): Skill[] {
    return [
      {
        id: 1,
        name: "Data Analysis",
        description: "Advanced data analysis using Python, R, and SQL",
        icon: "bar-chart",
        color: "text-blue-500",
        enabled: true,
        created_at: "",
        updated_at: "",
      },
      {
        id: 2,
        name: "Financial Modeling",
        description: "Creating comprehensive financial models and forecasts",
        icon: "calculator",
        color: "text-green-500",
        enabled: true,
        created_at: "",
        updated_at: "",
      },
      {
        id: 3,
        name: "Database Management",
        description: "Expert in SQL, PostgreSQL, and database optimization",
        icon: "database",
        color: "text-purple-500",
        enabled: true,
        created_at: "",
        updated_at: "",
      },
    ]
  },
}

// Work reasons services
export const workReasonsService = {
  async getWorkReasons(): Promise<WorkReason[]> {
    try {
      const { data, error } = await supabase.from("work_reasons").select("*").order("id")

      if (error) {
        console.error("Error fetching work reasons:", error)
        return this.getDefaultWorkReasons()
      }

      return data || this.getDefaultWorkReasons()
    } catch (error) {
      console.error("Error in getWorkReasons:", error)
      return this.getDefaultWorkReasons()
    }
  },

  async getEnabledWorkReasons(): Promise<WorkReason[]> {
    try {
      const { data, error } = await supabase.from("work_reasons").select("*").eq("enabled", true).order("id")

      if (error) {
        console.error("Error fetching enabled work reasons:", error)
        return this.getDefaultWorkReasons()
      }

      return data || this.getDefaultWorkReasons()
    } catch (error) {
      console.error("Error in getEnabledWorkReasons:", error)
      return this.getDefaultWorkReasons()
    }
  },

  getDefaultWorkReasons(): WorkReason[] {
    return [
      {
        id: 1,
        title: "Expert Analysis",
        description: "Deep expertise in data analysis and financial modeling",
        icon: "bar-chart-3",
        color: "text-blue-500",
        enabled: true,
        created_at: "",
        updated_at: "",
      },
      {
        id: 2,
        title: "Reliable Results",
        description: "Consistent delivery of accurate and actionable insights",
        icon: "calculator",
        color: "text-green-500",
        enabled: true,
        created_at: "",
        updated_at: "",
      },
    ]
  },
}

// Clients services
export const clientsService = {
  async getClients(): Promise<Client[]> {
    try {
      const { data, error } = await supabase.from("clients").select("*").order("id")

      if (error) {
        console.error("Error fetching clients:", error)
        return this.getDefaultClients()
      }

      return data || this.getDefaultClients()
    } catch (error) {
      console.error("Error in getClients:", error)
      return this.getDefaultClients()
    }
  },

  async getEnabledClients(): Promise<Client[]> {
    try {
      const { data, error } = await supabase.from("clients").select("*").eq("enabled", true).order("id")

      if (error) {
        console.error("Error fetching enabled clients:", error)
        return this.getDefaultClients()
      }

      return data || this.getDefaultClients()
    } catch (error) {
      console.error("Error in getEnabledClients:", error)
      return this.getDefaultClients()
    }
  },

  getDefaultClients(): Client[] {
    return [
      {
        id: 1,
        name: "Tech Solutions Inc",
        logo: "/placeholder.svg?height=64&width=64",
        website: "https://example.com",
        testimonial: "Excellent data analysis and insights provided",
        rating: 5,
        last_project: "https://example.com/project",
        enabled: true,
        created_at: "",
        updated_at: "",
      },
    ]
  },
}

// Project categories services
export const projectCategoriesService = {
  async getProjectCategories(): Promise<ProjectCategory[]> {
    try {
      const { data, error } = await supabase.from("project_categories").select("*").order("id")

      if (error) {
        console.error("Error fetching project categories:", error)
        return this.getDefaultCategories()
      }

      return data || this.getDefaultCategories()
    } catch (error) {
      console.error("Error in getProjectCategories:", error)
      return this.getDefaultCategories()
    }
  },

  getDefaultCategories(): ProjectCategory[] {
    return [
      {
        id: 1,
        name: "Data Analysis",
        slug: "data-analysis",
        description: "Data analysis projects",
        created_at: "",
        updated_at: "",
      },
      {
        id: 2,
        name: "Financial Modeling",
        slug: "financial-modeling",
        description: "Financial modeling projects",
        created_at: "",
        updated_at: "",
      },
    ]
  },
}

// Projects services
export const projectsService = {
  async getProjects(): Promise<Project[]> {
    try {
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
        return this.getDefaultProjects()
      }

      return data || this.getDefaultProjects()
    } catch (error) {
      console.error("Error in getProjects:", error)
      return this.getDefaultProjects()
    }
  },

  async getFeaturedProjects(): Promise<Project[]> {
    try {
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
        return this.getDefaultProjects()
      }

      return data || this.getDefaultProjects()
    } catch (error) {
      console.error("Error in getFeaturedProjects:", error)
      return this.getDefaultProjects()
    }
  },

  async getProjectById(id: number): Promise<Project | null> {
    try {
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
      console.error("Error in getProjectById:", error)
      return null
    }
  },

  getDefaultProjects(): Project[] {
    return [
      {
        id: 1,
        title: "Sales Data Analysis Dashboard",
        short_description: "Interactive dashboard for sales performance analysis",
        long_description: "Comprehensive sales analysis dashboard built with Python and Tableau",
        image: "/placeholder.svg?height=200&width=400",
        images: [],
        technologies: ["Python", "Tableau", "SQL"],
        project_url: "https://example.com",
        github_url: "",
        linkedin_url: "",
        category_id: 1,
        featured: true,
        enabled: true,
        date: "2024-01-01",
        created_at: "",
        updated_at: "",
      },
      {
        id: 2,
        title: "Financial Forecast Model",
        short_description: "Advanced financial forecasting model for budget planning",
        long_description: "Sophisticated financial model for 5-year budget forecasting",
        image: "/placeholder.svg?height=200&width=400",
        images: [],
        technologies: ["Excel", "Python", "R"],
        project_url: "https://example.com",
        github_url: "",
        linkedin_url: "",
        category_id: 2,
        featured: true,
        enabled: true,
        date: "2024-02-01",
        created_at: "",
        updated_at: "",
      },
    ]
  },
}

// Services services
export const servicesService = {
  async getServices(): Promise<Service[]> {
    try {
      const { data, error } = await supabase.from("services").select("*").order("id")

      if (error) {
        console.error("Error fetching services:", error)
        return this.getDefaultServices()
      }

      return data || this.getDefaultServices()
    } catch (error) {
      console.error("Error in getServices:", error)
      return this.getDefaultServices()
    }
  },

  async getEnabledServices(): Promise<Service[]> {
    try {
      const { data, error } = await supabase.from("services").select("*").eq("enabled", true).order("id")

      if (error) {
        console.error("Error fetching enabled services:", error)
        return this.getDefaultServices()
      }

      return data || this.getDefaultServices()
    } catch (error) {
      console.error("Error in getEnabledServices:", error)
      return this.getDefaultServices()
    }
  },

  getDefaultServices(): Service[] {
    return [
      {
        id: 1,
        title: "Data Analysis",
        description: "Comprehensive data analysis and visualization services",
        icon: "bar-chart",
        price: "$500",
        features: ["Data cleaning", "Statistical analysis", "Visualization"],
        enabled: true,
        created_at: "",
        updated_at: "",
      },
      {
        id: 2,
        title: "Financial Modeling",
        description: "Advanced financial modeling and forecasting",
        icon: "calculator",
        price: "$800",
        features: ["Budget planning", "Forecasting", "Risk analysis"],
        enabled: true,
        created_at: "",
        updated_at: "",
      },
    ]
  },
}

// Education services
export const educationService = {
  async getEducation(): Promise<Education[]> {
    try {
      const { data, error } = await supabase.from("education").select("*").order("id")

      if (error) {
        console.error("Error fetching education:", error)
        return []
      }

      return data || []
    } catch (error) {
      console.error("Error in getEducation:", error)
      return []
    }
  },
}

// Journey services
export const journeyService = {
  async getJourney(): Promise<Journey[]> {
    try {
      const { data, error } = await supabase.from("journey").select("*").order("year", { ascending: false })

      if (error) {
        console.error("Error fetching journey:", error)
        return []
      }

      return data || []
    } catch (error) {
      console.error("Error in getJourney:", error)
      return []
    }
  },
}

// Certifications services
export const certificationsService = {
  async getCertifications(): Promise<Certification[]> {
    try {
      const { data, error } = await supabase.from("certifications").select("*").order("date", { ascending: false })

      if (error) {
        console.error("Error fetching certifications:", error)
        return []
      }

      return data || []
    } catch (error) {
      console.error("Error in getCertifications:", error)
      return []
    }
  },

  async getEnabledCertifications(): Promise<Certification[]> {
    try {
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
      console.error("Error in getEnabledCertifications:", error)
      return []
    }
  },
}

// Stats services
export const statsService = {
  async getStats(): Promise<Stat[]> {
    try {
      const { data, error } = await supabase.from("stats").select("*").order("id")

      if (error) {
        console.error("Error fetching stats:", error)
        return []
      }

      return data || []
    } catch (error) {
      console.error("Error in getStats:", error)
      return []
    }
  },

  async getEnabledStats(): Promise<Stat[]> {
    try {
      const { data, error } = await supabase.from("stats").select("*").eq("enabled", true).order("id")

      if (error) {
        console.error("Error fetching enabled stats:", error)
        return []
      }

      return data || []
    } catch (error) {
      console.error("Error in getEnabledStats:", error)
      return []
    }
  },
}

// About features services
export const aboutFeaturesService = {
  async getAboutFeatures(): Promise<AboutFeature[]> {
    try {
      const { data, error } = await supabase.from("about_features").select("*").order("id").limit(6)

      if (error) {
        console.error("Error fetching about features:", error)
        return []
      }

      return data || []
    } catch (error) {
      console.error("Error in getAboutFeatures:", error)
      return []
    }
  },
}

// Freelance platforms services
export const freelancePlatformsService = {
  async getFreelancePlatforms(): Promise<FreelancePlatform[]> {
    try {
      const { data, error } = await supabase.from("freelance_platforms").select("*").order("id")

      if (error) {
        console.error("Error fetching freelance platforms:", error)
        return []
      }

      return data || []
    } catch (error) {
      console.error("Error in getFreelancePlatforms:", error)
      return []
    }
  },

  async getEnabledFreelancePlatforms(): Promise<FreelancePlatform[]> {
    try {
      const { data, error } = await supabase.from("freelance_platforms").select("*").eq("enabled", true).order("id")

      if (error) {
        console.error("Error fetching enabled freelance platforms:", error)
        return []
      }

      return data || []
    } catch (error) {
      console.error("Error in getEnabledFreelancePlatforms:", error)
      return []
    }
  },
}

// Payment methods services
export const paymentMethodsService = {
  async getPaymentMethods(): Promise<PaymentMethod[]> {
    try {
      const { data, error } = await supabase.from("payment_methods").select("*").order("id")

      if (error) {
        console.error("Error fetching payment methods:", error)
        return []
      }

      return data || []
    } catch (error) {
      console.error("Error in getPaymentMethods:", error)
      return []
    }
  },
}

// Settings services
export const settingsService = {
  async getSettings(): Promise<Record<string, boolean>> {
    try {
      const { data, error } = await supabase.from("settings").select("key, value")

      if (error) {
        console.error("Error fetching settings:", error)
        return this.getDefaultSettings()
      }

      const settings: Record<string, boolean> = {}
      data?.forEach((setting) => {
        settings[setting.key] = setting.value
      })

      return { ...this.getDefaultSettings(), ...settings }
    } catch (error) {
      console.error("Error in getSettings:", error)
      return this.getDefaultSettings()
    }
  },

  async getSetting(key: string): Promise<boolean> {
    try {
      const { data, error } = await supabase.from("settings").select("value").eq("key", key).single()

      if (error) {
        console.error(`Error fetching setting ${key}:`, error)
        return true // Default to true
      }

      return data?.value ?? true
    } catch (error) {
      console.error(`Error in getSetting ${key}:`, error)
      return true
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
        return false
      }

      return true
    } catch (error) {
      console.error(`Error in updateSetting ${key}:`, error)
      return false
    }
  },

  getDefaultSettings(): Record<string, boolean> {
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
  },
}

// Language settings services
export const languageSettingsService = {
  async getLanguageSettings(): Promise<LanguageSettings | null> {
    try {
      const { data, error } = await supabase.from("language_settings").select("*").single()

      if (error) {
        console.error("Error fetching language settings:", error)
        return null
      }

      return data
    } catch (error) {
      console.error("Error in getLanguageSettings:", error)
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
