import { db } from "@/lib/db"

// Cache settings to reduce database calls
let cachedSettings: Record<string, any> = {}
let lastFetchTime = 0
const CACHE_DURATION = 5 * 60 * 1000 // 5 minutes

/**
 * Get a single setting from database
 */
export async function getSetting(key: string, defaultValue: any = null) {
  // Try cache first
  if (cachedSettings[key] !== undefined && Date.now() - lastFetchTime < CACHE_DURATION) {
    return cachedSettings[key]
  }

  try {
    const result = await db.query`
      SELECT value, type FROM site_settings WHERE key = $1
    `, [key]

    if (result.length === 0) {
      return defaultValue
    }

    const { value, type } = result[0]
    
    // Convert value based on type
    let parsedValue = value
    if (type === 'boolean') {
      parsedValue = value === 'true' || value === true
    } else if (type === 'integer') {
      parsedValue = parseInt(value, 10)
    } else if (type === 'json') {
      parsedValue = JSON.parse(value)
    }

    cachedSettings[key] = parsedValue
    return parsedValue
  } catch (error) {
    console.error(`Error getting setting ${key}:`, error)
    return defaultValue
  }
}

/**
 * Get all settings
 */
export async function getAllSettings() {
  // Return cache if valid
  if (Object.keys(cachedSettings).length > 0 && Date.now() - lastFetchTime < CACHE_DURATION) {
    return cachedSettings
  }

  try {
    const results = await db.query`SELECT key, value, type FROM site_settings`
    
    const settings: Record<string, any> = {}
    
    for (const { key, value, type } of results) {
      let parsedValue = value
      if (type === 'boolean') {
        parsedValue = value === 'true' || value === true
      } else if (type === 'integer') {
        parsedValue = parseInt(value, 10)
      } else if (type === 'json') {
        parsedValue = JSON.parse(value)
      }
      settings[key] = parsedValue
    }

    cachedSettings = settings
    lastFetchTime = Date.now()
    return settings
  } catch (error) {
    console.error('Error getting all settings:', error)
    return {}
  }
}

/**
 * Update a setting
 */
export async function updateSetting(key: string, value: any, type: string = 'string') {
  try {
    let stringValue = String(value)
    if (type === 'json') {
      stringValue = JSON.stringify(value)
    }

    await db.query`
      INSERT INTO site_settings (key, value, type)
      VALUES ($1, $2, $3)
      ON CONFLICT (key) DO UPDATE SET
        value = EXCLUDED.value,
        type = EXCLUDED.type,
        updated_at = NOW()
    `, [key, stringValue, type]

    // Clear cache
    cachedSettings = {}
    lastFetchTime = 0

    return { success: true }
  } catch (error) {
    console.error(`Error updating setting ${key}:`, error)
    return { success: false, error: String(error) }
  }
}

/**
 * Clear settings cache
 */
export function clearSettingsCache() {
  cachedSettings = {}
  lastFetchTime = 0
}

/**
 * Specific getter functions for common settings (backward compatible)
 */
export async function getWebsiteEnabled() {
  return await getSetting('website', true)
}

export async function getMaintenanceMode() {
  return await getSetting('maintenance_mode', false)
}

export async function getPageEnabled(pageName: string) {
  return await getSetting(`${pageName}_page`, true)
}

export async function getFeatureEnabled(featureName: string) {
  return await getSetting(`${featureName}_feature`, false)
}

export async function getSectionEnabled(sectionName: string) {
  return await getSetting(sectionName, true)
}
