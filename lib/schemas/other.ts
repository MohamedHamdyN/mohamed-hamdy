import { z } from "zod"

export const skillSchema = z.object({
  name: z.string().min(1, "Name is required"),
  description: z.string().min(5, "Description is required"),
  icon: z.string().min(1, "Icon is required"),
  color: z.string().min(1, "Color is required"),
  enabled: z.boolean().default(true),
  category: z.string().optional(),
  order: z.number().default(0),
})

export const clientSchema = z.object({
  name: z.string().min(1, "Name is required"),
  logo: z.string().url("Invalid URL"),
  testimonial: z.string().optional(),
  rating: z.number().int().min(1).max(5).default(5),
  website: z.string().url("Invalid URL").optional(),
  lastProject: z.string().url("Invalid URL").optional(),
  enabled: z.boolean().default(true),
  order: z.number().default(0),
})

export const serviceSchema = z.object({
  title: z.string().min(1, "Title is required"),
  description: z.string().min(10, "Description is required"),
  icon: z.string().min(1, "Icon is required"),
  color: z.string().min(1, "Color is required"),
  features: z.array(z.string()).default([]),
  enabled: z.boolean().default(true),
  order: z.number().default(0),
})

export const siteSettingsSchema = z.object({
  siteStatus: z.enum(["active", "maintenance"]).default("active"),
  defaultLanguage: z.enum(["en", "ar"]).default("en"),
  enableLanguageToggle: z.boolean().default(false),
  websiteEnabled: z.boolean().default(true),
  projectsPageEnabled: z.boolean().default(true),
  servicesPageEnabled: z.boolean().default(true),
  aboutPageEnabled: z.boolean().default(true),
  contactPageEnabled: z.boolean().default(true),
  resumePageEnabled: z.boolean().default(true),
  projectsHomeEnabled: z.boolean().default(true),
  servicesHomeEnabled: z.boolean().default(true),
  aboutHomeEnabled: z.boolean().default(true),
  skillsEnabled: z.boolean().default(true),
  whyWorkWithMeEnabled: z.boolean().default(true),
  clientsEnabled: z.boolean().default(true),
  contactHomeEnabled: z.boolean().default(true),
  freelancePlatformsEnabled: z.boolean().default(true),
  paymentMethodsEnabled: z.boolean().default(true),
  contactFormEnabled: z.boolean().default(true),
  calendlyFeatureEnabled: z.boolean().default(true),
})

export type SkillInput = z.infer<typeof skillSchema>
export type ClientInput = z.infer<typeof clientSchema>
export type ServiceInput = z.infer<typeof serviceSchema>
export type SiteSettingsInput = z.infer<typeof siteSettingsSchema>
