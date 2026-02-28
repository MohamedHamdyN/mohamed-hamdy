import prisma from "@/lib/db/client"

export interface SkillData {
  id: string
  name: string
  description: string
  icon: string
  color: string
  enabled: boolean
  category: string | null
  order: number
  createdAt: Date
  updatedAt: Date
}

export interface ClientData {
  id: string
  name: string
  logo: string
  testimonial: string | null
  rating: number
  website: string | null
  lastProject: string | null
  enabled: boolean
  order: number
}

export interface ServiceData {
  id: string
  title: string
  description: string
  icon: string
  color: string
  features: string[]
  enabled: boolean
  order: number
  createdAt: Date
  updatedAt: Date
}

export interface SiteSettingsData {
  id: string
  siteStatus: string
  defaultLanguage: string
  enableLanguageToggle: boolean
  websiteEnabled: boolean
  projectsPageEnabled: boolean
  servicesPageEnabled: boolean
  aboutPageEnabled: boolean
  contactPageEnabled: boolean
  resumePageEnabled: boolean
  projectsHomeEnabled: boolean
  servicesHomeEnabled: boolean
  aboutHomeEnabled: boolean
  skillsEnabled: boolean
  whyWorkWithMeEnabled: boolean
  clientsEnabled: boolean
  contactHomeEnabled: boolean
  freelancePlatformsEnabled: boolean
  paymentMethodsEnabled: boolean
  contactFormEnabled: boolean
  calendlyFeatureEnabled: boolean
}

// Skills
export async function getSkills(): Promise<SkillData[]> {
  try {
    const skills = await prisma.skill.findMany({
      where: { enabled: true },
      orderBy: { order: "asc" },
    })
    return skills as SkillData[]
  } catch (error) {
    console.error("[v0] Error fetching skills:", error instanceof Error ? error.message : error)
    return []
  }
}

export async function getAllSkills(): Promise<SkillData[]> {
  try {
    const skills = await prisma.skill.findMany({
      orderBy: { order: "asc" },
    })
    return skills as SkillData[]
  } catch (error) {
    console.error("[v0] Error fetching all skills:", error instanceof Error ? error.message : error)
    return []
  }
}

// Clients
export async function getClients(): Promise<ClientData[]> {
  try {
    const clients = await prisma.client.findMany({
      where: { enabled: true },
      orderBy: { order: "asc" },
    })
    return clients as ClientData[]
  } catch (error) {
    console.error("[v0] Error fetching clients:", error instanceof Error ? error.message : error)
    return []
  }
}

export async function getAllClients(): Promise<ClientData[]> {
  try {
    const clients = await prisma.client.findMany({
      orderBy: { order: "asc" },
    })
    return clients as ClientData[]
  } catch (error) {
    console.error("[v0] Error fetching all clients:", error instanceof Error ? error.message : error)
    return []
  }
}

// Services
export async function getServices(): Promise<ServiceData[]> {
  try {
    const services = await prisma.service.findMany({
      where: { enabled: true },
      orderBy: { order: "asc" },
    })
    return services as ServiceData[]
  } catch (error) {
    console.error("[v0] Error fetching services:", error instanceof Error ? error.message : error)
    return []
  }
}

export async function getAllServices(): Promise<ServiceData[]> {
  try {
    const services = await prisma.service.findMany({
      orderBy: { order: "asc" },
    })
    return services as ServiceData[]
  } catch (error) {
    console.error("[v0] Error fetching all services:", error instanceof Error ? error.message : error)
    return []
  }
}

// Site Settings
export async function getSiteSettings(): Promise<SiteSettingsData | null> {
  try {
    const settings = await prisma.siteSettings.findFirst()

    // If no settings exist, return default settings (don't create yet)
    if (!settings) {
      return {
        id: "default",
        siteStatus: "active",
        defaultLanguage: "en",
        enableLanguageToggle: false,
        websiteEnabled: true,
        projectsPageEnabled: true,
        servicesPageEnabled: true,
        aboutPageEnabled: true,
        contactPageEnabled: true,
        resumePageEnabled: true,
        projectsHomeEnabled: true,
        servicesHomeEnabled: true,
        aboutHomeEnabled: true,
        skillsEnabled: true,
        whyWorkWithMeEnabled: true,
        clientsEnabled: true,
        contactHomeEnabled: true,
        freelancePlatformsEnabled: true,
        paymentMethodsEnabled: true,
        contactFormEnabled: true,
        calendlyFeatureEnabled: true,
      } as SiteSettingsData
    }

    return settings as SiteSettingsData
  } catch (error) {
    console.error("[v0] Error fetching site settings:", error instanceof Error ? error.message : error)
    // Return safe defaults to allow app to load
    return {
      id: "default",
      siteStatus: "active",
      defaultLanguage: "en",
      enableLanguageToggle: false,
      websiteEnabled: true,
      projectsPageEnabled: true,
      servicesPageEnabled: true,
      aboutPageEnabled: true,
      contactPageEnabled: true,
      resumePageEnabled: true,
      projectsHomeEnabled: true,
      servicesHomeEnabled: true,
      aboutHomeEnabled: true,
      skillsEnabled: true,
      whyWorkWithMeEnabled: true,
      clientsEnabled: true,
      contactHomeEnabled: true,
      freelancePlatformsEnabled: true,
      paymentMethodsEnabled: true,
      contactFormEnabled: true,
      calendlyFeatureEnabled: true,
    } as SiteSettingsData
  }
}

export async function updateSiteSettings(
  data: Partial<SiteSettingsData>
): Promise<SiteSettingsData> {
  try {
    const settings = await getSiteSettings()

    if (!settings || settings.id === "default") {
      throw new Error("Site settings not initialized in database")
    }

    const updated = await prisma.siteSettings.update({
      where: { id: settings.id },
      data,
    })

    return updated as SiteSettingsData
  } catch (error) {
    console.error("[v0] Error updating site settings:", error instanceof Error ? error.message : error)
    throw error
  }
}
