"use server"

import prisma from "@/lib/db/client"
import {
  skillSchema,
  clientSchema,
  serviceSchema,
  siteSettingsSchema,
} from "@/lib/schemas/other"
import {
  revalidateSkills,
  revalidateClients,
  revalidateServices,
  revalidateSettings,
} from "@/lib/utils/revalidate"
import { auth } from "@/auth"

// Skills
export async function createSkill(data: unknown) {
  const session = await auth()
  if (!session?.user) {
    return { success: false, error: "Unauthorized" }
  }

  try {
    const validated = skillSchema.parse(data)
    const skill = await prisma.skill.create({ data: validated })
    revalidateSkills()
    return { success: true, data: skill }
  } catch (error) {
    console.error("[v0] Create skill error:", error)
    return { success: false, error: "Failed to create skill" }
  }
}

export async function updateSkill(id: string, data: unknown) {
  const session = await auth()
  if (!session?.user) {
    return { success: false, error: "Unauthorized" }
  }

  try {
    const validated = skillSchema.partial().parse(data)
    const skill = await prisma.skill.update({ where: { id }, data: validated })
    revalidateSkills()
    return { success: true, data: skill }
  } catch (error) {
    console.error("[v0] Update skill error:", error)
    return { success: false, error: "Failed to update skill" }
  }
}

export async function deleteSkill(id: string) {
  const session = await auth()
  if (!session?.user) {
    return { success: false, error: "Unauthorized" }
  }

  try {
    await prisma.skill.delete({ where: { id } })
    revalidateSkills()
    return { success: true }
  } catch (error) {
    console.error("[v0] Delete skill error:", error)
    return { success: false, error: "Failed to delete skill" }
  }
}

// Clients
export async function createClient(data: unknown) {
  const session = await auth()
  if (!session?.user) {
    return { success: false, error: "Unauthorized" }
  }

  try {
    const validated = clientSchema.parse(data)
    const client = await prisma.client.create({ data: validated })
    revalidateClients()
    return { success: true, data: client }
  } catch (error) {
    console.error("[v0] Create client error:", error)
    return { success: false, error: "Failed to create client" }
  }
}

export async function updateClient(id: string, data: unknown) {
  const session = await auth()
  if (!session?.user) {
    return { success: false, error: "Unauthorized" }
  }

  try {
    const validated = clientSchema.partial().parse(data)
    const client = await prisma.client.update({ where: { id }, data: validated })
    revalidateClients()
    return { success: true, data: client }
  } catch (error) {
    console.error("[v0] Update client error:", error)
    return { success: false, error: "Failed to update client" }
  }
}

export async function deleteClient(id: string) {
  const session = await auth()
  if (!session?.user) {
    return { success: false, error: "Unauthorized" }
  }

  try {
    await prisma.client.delete({ where: { id } })
    revalidateClients()
    return { success: true }
  } catch (error) {
    console.error("[v0] Delete client error:", error)
    return { success: false, error: "Failed to delete client" }
  }
}

// Services
export async function createService(data: unknown) {
  const session = await auth()
  if (!session?.user) {
    return { success: false, error: "Unauthorized" }
  }

  try {
    const validated = serviceSchema.parse(data)
    const service = await prisma.service.create({ data: validated })
    revalidateServices()
    return { success: true, data: service }
  } catch (error) {
    console.error("[v0] Create service error:", error)
    return { success: false, error: "Failed to create service" }
  }
}

export async function updateService(id: string, data: unknown) {
  const session = await auth()
  if (!session?.user) {
    return { success: false, error: "Unauthorized" }
  }

  try {
    const validated = serviceSchema.partial().parse(data)
    const service = await prisma.service.update({ where: { id }, data: validated })
    revalidateServices()
    return { success: true, data: service }
  } catch (error) {
    console.error("[v0] Update service error:", error)
    return { success: false, error: "Failed to update service" }
  }
}

export async function deleteService(id: string) {
  const session = await auth()
  if (!session?.user) {
    return { success: false, error: "Unauthorized" }
  }

  try {
    await prisma.service.delete({ where: { id } })
    revalidateServices()
    return { success: true }
  } catch (error) {
    console.error("[v0] Delete service error:", error)
    return { success: false, error: "Failed to delete service" }
  }
}

// Site Settings
export async function updateSiteSettings(data: unknown) {
  const session = await auth()
  if (!session?.user) {
    return { success: false, error: "Unauthorized" }
  }

  try {
    const validated = siteSettingsSchema.partial().parse(data)
    const settings = await prisma.siteSettings.findFirst()

    if (!settings) {
      const newSettings = await prisma.siteSettings.create({ data: validated })
      revalidateSettings()
      return { success: true, data: newSettings }
    }

    const updated = await prisma.siteSettings.update({
      where: { id: settings.id },
      data: validated,
    })

    revalidateSettings()
    return { success: true, data: updated }
  } catch (error) {
    console.error("[v0] Update settings error:", error)
    return { success: false, error: "Failed to update settings" }
  }
}
