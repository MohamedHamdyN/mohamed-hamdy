import prisma from "@/lib/db/client"

/**
 * Check if the database schema is initialized
 * Returns true if at least one table exists
 */
export async function isDatabaseInitialized(): Promise<boolean> {
  try {
    // Try to check if site_settings table exists
    await prisma.$queryRaw`SELECT 1 FROM public.site_settings LIMIT 1`
    return true
  } catch (error) {
    // Table doesn't exist
    return false
  }
}

/**
 * Get database initialization status with details
 */
export async function getDatabaseStatus(): Promise<{
  initialized: boolean
  tablesExist: Record<string, boolean>
}> {
  const tables = [
    "profiles",
    "site_settings",
    "projects",
    "skills",
    "clients",
    "services",
    "social_links",
  ]

  const tablesExist: Record<string, boolean> = {}

  for (const table of tables) {
    try {
      await prisma.$queryRawUnsafe(`SELECT 1 FROM public.${table} LIMIT 1`)
      tablesExist[table] = true
    } catch {
      tablesExist[table] = false
    }
  }

  const initialized = Object.values(tablesExist).some((exists) => exists)

  return {
    initialized,
    tablesExist,
  }
}
