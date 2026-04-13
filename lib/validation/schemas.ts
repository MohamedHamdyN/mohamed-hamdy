import { z } from 'zod'

/**
 * Validation Schemas
 * Backend validation for all user inputs
 * Prevents invalid data from entering the database
 */

// ============================================
// PROFILE SCHEMA
// ============================================

export const ProfileSchema = z.object({
  name: z.string().min(2).max(255),
  job_title_1: z.string().max(255).optional().nullable(),
  job_title_2: z.string().max(255).optional().nullable(),
  email: z.string().email().max(255).optional().nullable(),
  phone_number: z.string().max(20).optional().nullable(),
  location: z.string().max(255).optional().nullable(),
  hero_description: z.string().max(1000).optional().nullable(),
  description: z.string().max(5000).optional().nullable(),
  special_description: z.string().max(5000).optional().nullable(),
  quote: z.string().max(1000).optional().nullable(),
  resume_url: z.string().url().max(2048).optional().nullable(),
  calendly_url: z.string().url().max(2048).optional().nullable(),
  avatar_url: z.string().url().max(2048).optional().nullable(),
  og_image_url: z.string().url().max(2048).optional().nullable(),
})

export type Profile = z.infer<typeof ProfileSchema>

// ============================================
// PROJECT SCHEMA
// ============================================

export const ProjectSchema = z.object({
  title: z.string().min(3).max(255),
  description: z.string().max(5000).optional().nullable(),
  category_id: z.number().int().positive().optional().nullable(),
  project_url: z.string().url().max(2048).optional().nullable(),
  linkedin_url: z.string().url().max(2048).optional().nullable(),
  presentation_url: z.string().url().max(2048).optional().nullable(),
  project_date: z.string().datetime().optional().nullable(),
  featured: z.boolean().default(false),
  image_url: z.string().url().max(2048).optional().nullable(),
  draft: z.boolean().default(true),
  order: z.number().int().min(0).default(0),
  technologies: z.array(z.number().int().positive()).default([]),
})

export type Project = z.infer<typeof ProjectSchema>

// ============================================
// SKILL SCHEMA
// ============================================

export const SkillSchema = z.object({
  name: z.string().min(2).max(255),
  color: z.string().regex(/^#[0-9A-F]{6}$/i),
  order: z.number().int().min(0).default(0),
  enabled: z.boolean().default(true),
})

export type Skill = z.infer<typeof SkillSchema>

// ============================================
// SERVICE SCHEMA
// ============================================

export const ServiceSchema = z.object({
  title: z.string().min(3).max(255),
  description: z.string().max(5000).optional().nullable(),
  icon: z.string().max(100).optional().nullable(),
  color: z.string().regex(/^#[0-9A-F]{6}$/i).optional().nullable(),
  order: z.number().int().min(0).default(0),
  enabled: z.boolean().default(true),
})

export type Service = z.infer<typeof ServiceSchema>

// ============================================
// CLIENT SCHEMA
// ============================================

export const ClientSchema = z.object({
  name: z.string().min(2).max(255),
  website: z.string().url().max(2048).optional().nullable(),
  rating: z.number().int().min(1).max(5).optional().nullable(),
  logo_url: z.string().url().max(2048).optional().nullable(),
  testimonial: z.string().max(1000).optional().nullable(),
  order: z.number().int().min(0).default(0),
  enabled: z.boolean().default(true),
})

export type Client = z.infer<typeof ClientSchema>

// ============================================
// CATEGORY SCHEMA
// ============================================

export const CategorySchema = z.object({
  name: z.string().min(2).max(255),
  slug: z.string().min(2).max(255).regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/),
  description: z.string().max(1000).optional().nullable(),
  order: z.number().int().min(0).default(0),
  enabled: z.boolean().default(true),
})

export type Category = z.infer<typeof CategorySchema>

// ============================================
// TECHNOLOGY SCHEMA
// ============================================

export const TechnologySchema = z.object({
  name: z.string().min(2).max(255),
  slug: z.string().min(2).max(255).regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/),
  icon: z.string().max(255).optional().nullable(),
})

export type Technology = z.infer<typeof TechnologySchema>

// ============================================
// EXPERIENCE SCHEMA
// ============================================

export const ExperienceSchema = z.object({
  title: z.string().min(3).max(255),
  company: z.string().max(255).optional().nullable(),
  description: z.string().max(2000).optional().nullable(),
  start_date: z.string().datetime().optional().nullable(),
  end_date: z.string().datetime().optional().nullable(),
  order: z.number().int().min(0).default(0),
  enabled: z.boolean().default(true),
})

export type Experience = z.infer<typeof ExperienceSchema>

// ============================================
// EDUCATION SCHEMA
// ============================================

export const EducationSchema = z.object({
  degree: z.string().min(2).max(255),
  institution: z.string().min(2).max(255),
  description: z.string().max(1000).optional().nullable(),
  order: z.number().int().min(0).default(0),
  enabled: z.boolean().default(true),
})

export type Education = z.infer<typeof EducationSchema>

// ============================================
// CERTIFICATION SCHEMA
// ============================================

export const CertificationSchema = z.object({
  title: z.string().min(3).max(255),
  issuer: z.string().min(2).max(255),
  issue_date: z.string().datetime().optional().nullable(),
  credential_url: z.string().url().max(2048).optional().nullable(),
  description: z.string().max(1000).optional().nullable(),
  order: z.number().int().min(0).default(0),
  enabled: z.boolean().default(true),
})

export type Certification = z.infer<typeof CertificationSchema>

// ============================================
// VALIDATION UTILITIES
// ============================================

export async function validateProfile(data: unknown) {
  try {
    return { success: true, data: ProfileSchema.parse(data) }
  } catch (error) {
    if (error instanceof z.ZodError) {
      return {
        success: false,
        errors: error.flatten().fieldErrors,
      }
    }
    return { success: false, errors: { _error: ['Validation failed'] } }
  }
}

export async function validateProject(data: unknown) {
  try {
    return { success: true, data: ProjectSchema.parse(data) }
  } catch (error) {
    if (error instanceof z.ZodError) {
      return {
        success: false,
        errors: error.flatten().fieldErrors,
      }
    }
    return { success: false, errors: { _error: ['Validation failed'] } }
  }
}

export async function validateSkill(data: unknown) {
  try {
    return { success: true, data: SkillSchema.parse(data) }
  } catch (error) {
    if (error instanceof z.ZodError) {
      return {
        success: false,
        errors: error.flatten().fieldErrors,
      }
    }
    return { success: false, errors: { _error: ['Validation failed'] } }
  }
}

export async function validateService(data: unknown) {
  try {
    return { success: true, data: ServiceSchema.parse(data) }
  } catch (error) {
    if (error instanceof z.ZodError) {
      return {
        success: false,
        errors: error.flatten().fieldErrors,
      }
    }
    return { success: false, errors: { _error: ['Validation failed'] } }
  }
}

export async function validateCategory(data: unknown) {
  try {
    return { success: true, data: CategorySchema.parse(data) }
  } catch (error) {
    if (error instanceof z.ZodError) {
      return {
        success: false,
        errors: error.flatten().fieldErrors,
      }
    }
    return { success: false, errors: { _error: ['Validation failed'] } }
  }
}
