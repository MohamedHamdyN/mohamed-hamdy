import { z } from "zod"

export const profileSchema = z.object({
  name: z.string().min(1, "Name is required"),
  title: z.string().min(1, "Title is required"),
  title2: z.string().optional(),
  email: z.string().email("Invalid email"),
  phone: z.string().optional(),
  location: z.string().optional(),
  bio: z.string().min(10, "Bio must be at least 10 characters"),
  shortBio: z.string().min(10, "Short bio must be at least 10 characters"),
  longBio: z.string().min(20, "Long bio must be at least 20 characters"),
  logo: z.string().url("Invalid URL"),
  favicon: z.string().url("Invalid URL"),
  avatar: z.string().url("Invalid URL"),
  defaultProjectImage: z.string().url("Invalid URL"),
  defaultClientLogo: z.string().url("Invalid URL"),
  defaultPlatformLogo: z.string().url("Invalid URL"),
  ogImage: z.string().url("Invalid URL"),
  resumeUrl: z.string().url("Invalid URL"),
  calendlyUrl: z.string().url("Invalid URL").optional(),
})

export const statSchema = z.object({
  name: z.string().min(1),
  value: z.string().min(1),
  icon: z.string().min(1),
  color: z.string().min(1),
  enabled: z.boolean().default(true),
  order: z.number().default(0),
})

export const certificationSchema = z.object({
  title: z.string().min(1),
  issuer: z.string().min(1),
  date: z.string().min(4), // YYYY format
  credentialUrl: z.string().url("Invalid URL"),
  description: z.string().min(10),
  enabled: z.boolean().default(true),
  order: z.number().default(0),
})

export const journeyEntrySchema = z.object({
  year: z.string().min(4),
  title: z.string().min(1),
  description: z.string().min(1),
  details: z.string().min(10),
  order: z.number().default(0),
})

export const educationEntrySchema = z.object({
  year: z.string().min(1),
  institution: z.string().min(1),
  degree: z.string().min(1),
  details: z.string().min(10),
  order: z.number().default(0),
})

export const socialLinkSchema = z.object({
  platform: z.string().min(1),
  url: z.string().url("Invalid URL"),
  isActive: z.boolean().default(true),
  order: z.number().default(0),
})

export type ProfileInput = z.infer<typeof profileSchema>
export type StatInput = z.infer<typeof statSchema>
export type CertificationInput = z.infer<typeof certificationSchema>
export type JourneyEntryInput = z.infer<typeof journeyEntrySchema>
export type EducationEntryInput = z.infer<typeof educationEntrySchema>
export type SocialLinkInput = z.infer<typeof socialLinkSchema>
