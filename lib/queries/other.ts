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
  const skills = await prisma.skill.findMany({
    where: { enabled: true },
    orderBy: { order: "asc" },
  })
  return skills as SkillData[]
}

export async function getAllSkills(): Promise<SkillData[]> {
  const skills = await prisma.skill.findMany({
    orderBy: { order: "asc" },
  })
  return skills as SkillData[]
}

// Clients
export async function getClients(): Promise<ClientData[]> {
  const clients = await prisma.client.findMany({
    where: { enabled: true },
    orderBy: { order: "asc" },
  })
  return clients as ClientData[]
}

export async function getAllClients(): Promise<ClientData[]> {
  const clients = await prisma.client.findMany({
    orderBy: { order: "asc" },
  })
  return clients as ClientData[]
}

// Services
export async function getServices(): Promise<ServiceData[]> {
  const services = await prisma.service.findMany({
    where: { enabled: true },
    orderBy: { order: "asc" },
  })
  return services as ServiceData[]
}

export async function getAllServices(): Promise<ServiceData[]> {
  const services = await prisma.service.findMany({
    orderBy: { order: "asc" },
  })
  return services as ServiceData[]
}

// Site Settings
export async function getSiteSettings(): Promise<SiteSettingsData> {
  const settings = await prisma.siteSettings.findFirst()

  // If no settings exist, create defaults
  if (!settings) {
    return await prisma.siteSettings.create({
      data: {
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
      },
    }) as Promise<SiteSettingsData>
  }

  return settings as SiteSettingsData
}

export async function updateSiteSettings(
  data: Partial<SiteSettingsData>
): Promise<SiteSettingsData> {
  const settings = await getSiteSettings()

  const updated = await prisma.siteSettings.update({
    where: { id: settings.id },
    data,
  })

  return updated as SiteSettingsData
}
