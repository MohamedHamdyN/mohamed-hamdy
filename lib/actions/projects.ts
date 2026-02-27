"use server"

import prisma from "@/lib/db/client"
import { projectSchema, projectImageSchema } from "@/lib/schemas/projects"
import { revalidateProjects } from "@/lib/utils/revalidate"
import { auth } from "@/auth"

export async function createProject(data: unknown) {
  const session = await auth()
  if (!session?.user) {
    return { success: false, error: "Unauthorized" }
  }

  try {
    const validated = projectSchema.parse(data)

    // Check if slug is unique
    const existing = await prisma.project.findUnique({
      where: { slug: validated.slug },
    })

    if (existing) {
      return { success: false, error: "Slug already exists" }
    }

    const project = await prisma.project.create({
      data: validated,
    })

    revalidateProjects()
    return { success: true, data: project }
  } catch (error) {
    console.error("[v0] Create project error:", error)
    return { success: false, error: "Failed to create project" }
  }
}

export async function updateProject(id: string, data: unknown) {
  const session = await auth()
  if (!session?.user) {
    return { success: false, error: "Unauthorized" }
  }

  try {
    const validated = projectSchema.partial().parse(data)

    // If slug is being changed, check uniqueness
    if (validated.slug) {
      const existing = await prisma.project.findUnique({
        where: { slug: validated.slug },
      })

      if (existing && existing.id !== id) {
        return { success: false, error: "Slug already exists" }
      }
    }

    const project = await prisma.project.update({
      where: { id },
      data: validated,
    })

    revalidateProjects()
    return { success: true, data: project }
  } catch (error) {
    console.error("[v0] Update project error:", error)
    return { success: false, error: "Failed to update project" }
  }
}

export async function deleteProject(id: string) {
  const session = await auth()
  if (!session?.user) {
    return { success: false, error: "Unauthorized" }
  }

  try {
    await prisma.project.delete({
      where: { id },
    })

    revalidateProjects()
    return { success: true }
  } catch (error) {
    console.error("[v0] Delete project error:", error)
    return { success: false, error: "Failed to delete project" }
  }
}

export async function addProjectImage(projectId: string, data: unknown) {
  const session = await auth()
  if (!session?.user) {
    return { success: false, error: "Unauthorized" }
  }

  try {
    const validated = projectImageSchema.parse(data)

    const image = await prisma.projectImage.create({
      data: {
        projectId,
        ...validated,
      },
    })

    revalidateProjects()
    return { success: true, data: image }
  } catch (error) {
    console.error("[v0] Add project image error:", error)
    return { success: false, error: "Failed to add image" }
  }
}

export async function deleteProjectImage(imageId: string) {
  const session = await auth()
  if (!session?.user) {
    return { success: false, error: "Unauthorized" }
  }

  try {
    await prisma.projectImage.delete({
      where: { id: imageId },
    })

    revalidateProjects()
    return { success: true }
  } catch (error) {
    console.error("[v0] Delete project image error:", error)
    return { success: false, error: "Failed to delete image" }
  }
}
