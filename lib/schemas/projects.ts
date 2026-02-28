import { z } from "zod"

export const projectSchema = z.object({
  title: z.string().min(1, "Title is required"),
  description: z.string().min(10, "Description must be at least 10 characters"),
  shortDescription: z.string().min(5, "Short description is required"),
  slug: z.string().min(1).regex(/^[a-z0-9-]+$/, "Slug must be lowercase with dashes"),
  categoryId: z.number().int().positive("Category is required"),
  image: z.string().url("Invalid URL").optional(),
  projectUrl: z.string().url("Invalid URL").optional(),
  linkedinUrl: z.string().url("Invalid URL").optional(),
  technologies: z.array(z.string()).default([]),
  date: z.string().regex(/^\d{4}-\d{2}$/, "Date must be in YYYY-MM format"),
  featured: z.boolean().default(false),
  status: z.enum(["published", "draft"]).default("published"),
})

export const projectImageSchema = z.object({
  imageUrl: z.string().url("Invalid URL"),
  caption: z.string().optional(),
  order: z.number().default(0),
})

export type ProjectInput = z.infer<typeof projectSchema>
export type ProjectImageInput = z.infer<typeof projectImageSchema>
