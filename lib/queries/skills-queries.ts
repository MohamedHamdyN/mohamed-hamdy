/**
 * Skills Queries with Colors Support
 * Queries for fetching skills with associated color information
 */

import { db } from '@/lib/db'

export type SkillWithColor = {
  id: number
  name: string
  description?: string
  icon?: string
  color?: string
  enabled: boolean
  order: number
  created_at: string
  updated_at: string
}

/**
 * Get all enabled skills with their color hex codes
 */
export async function getSkillsWithColors(): Promise<SkillWithColor[]> {
  try {
    const result = await db.query`
      SELECT 
        rs.id,
        rs.name,
        rs.description,
        rs.icon,
        COALESCE(rs.color, '#3B82F6') as color,
        rs.enabled,
        rs."order",
        rs.created_at,
        rs.updated_at
      FROM resume_skills rs
      WHERE rs.enabled = true
      ORDER BY rs."order" ASC
    `
    return result as SkillWithColor[]
  } catch (error) {
    console.error('Error getting skills with colors:', error)
    return []
  }
}

/**
 * Get all skills including disabled ones
 */
export async function getAllSkills(): Promise<SkillWithColor[]> {
  try {
    const result = await db.query`
      SELECT 
        rs.id,
        rs.name,
        rs.description,
        rs.icon,
        COALESCE(rs.color, '#3B82F6') as color,
        rs.enabled,
        rs."order",
        rs.created_at,
        rs.updated_at
      FROM resume_skills rs
      ORDER BY rs."order" ASC
    `
    return result as SkillWithColor[]
  } catch (error) {
    console.error('Error getting all skills:', error)
    return []
  }
}

/**
 * Get skills grouped by color for display purposes
 */
export async function getSkillsGroupedByColor() {
  try {
    const result = await db.query`
      SELECT 
        COALESCE(rs.color, '#3B82F6') as color,
        json_agg(json_build_object(
          'id', rs.id,
          'name', rs.name,
          'icon', rs.icon
        )) as skills
      FROM resume_skills rs
      WHERE rs.enabled = true
      GROUP BY COALESCE(rs.color, '#3B82F6')
      ORDER BY rs."order" ASC
    `
    return result
  } catch (error) {
    console.error('Error getting skills grouped by color:', error)
    return []
  }
}
