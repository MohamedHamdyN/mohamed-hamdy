/**
 * Technologies Queries
 * Handles fetching and managing technologies and their relationships
 */

import { db } from '@/lib/db'

export type Technology = {
  id: number
  name: string
  slug: string
  icon?: string
  color_id?: number
  created_at: string
  updated_at: string
}

export type ProjectWithTechnologies = {
  id: number
  title: string
  slug: string
  description?: string
  short_description?: string
  category_id?: number
  image_url?: string
  project_url?: string
  linkedin_url?: string
  date?: string
  featured: boolean
  draft: boolean
  order: number
  created_at: string
  updated_at: string
  technologies: Technology[]
}

/**
 * Get all technologies available in the system
 */
export async function getTechnologies(): Promise<Technology[]> {
  try {
    const result = await db.query`
      SELECT 
        t.id,
        t.name,
        t.slug,
        t.icon,
        t.color_id,
        t.created_at,
        t.updated_at
      FROM technologies t
      ORDER BY t.name ASC
    `
    return result as Technology[]
  } catch (error) {
    console.error('Error getting technologies:', error)
    return []
  }
}

/**
 * Get technologies for a specific project
 */
export async function getProjectTechnologies(projectId: number): Promise<Technology[]> {
  try {
    const result = await db.query`
      SELECT 
        t.id,
        t.name,
        t.slug,
        t.icon,
        t.color_id,
        t.created_at,
        t.updated_at
      FROM technologies t
      INNER JOIN entity_technologies et 
        ON et.technology_id = t.id
      WHERE et.entity_type = 'project' 
        AND et.entity_id = $1
      ORDER BY t.name ASC
    `, [projectId]
    return result as Technology[]
  } catch (error) {
    console.error('Error getting project technologies:', error)
    return []
  }
}

/**
 * Get projects with their associated technologies
 * @param draft - if true, include draft projects; if false, only published
 */
export async function getProjectsWithTechnologies(draft: boolean = false): Promise<ProjectWithTechnologies[]> {
  try {
    const whereClause = draft ? '' : 'WHERE p.draft = false'
    
    const result = await db.query`
      SELECT 
        p.id,
        p.title,
        p.slug,
        p.description,
        p.short_description,
        p.category_id,
        p.image_url,
        p.project_url,
        p.linkedin_url,
        p.date,
        p.featured,
        p.draft,
        p."order",
        p.created_at,
        p.updated_at,
        COALESCE(
          json_agg(json_build_object(
            'id', t.id,
            'name', t.name,
            'slug', t.slug,
            'icon', t.icon,
            'color_id', t.color_id
          )) FILTER (WHERE t.id IS NOT NULL),
          '[]'::json
        ) as technologies
      FROM projects p
      LEFT JOIN entity_technologies et 
        ON et.entity_type = 'project' AND et.entity_id = p.id
      LEFT JOIN technologies t 
        ON et.technology_id = t.id
      ${whereClause}
      GROUP BY p.id
      ORDER BY p.featured DESC, p."order" ASC
    `
    return result as ProjectWithTechnologies[]
  } catch (error) {
    console.error('Error getting projects with technologies:', error)
    return []
  }
}

/**
 * Add a technology to a project
 */
export async function addProjectTechnology(projectId: number, technologyId: number): Promise<boolean> {
  try {
    await db.query`
      INSERT INTO entity_technologies (entity_type, entity_id, technology_id)
      VALUES ('project', $1, $2)
      ON CONFLICT DO NOTHING
    `, [projectId, technologyId]
    return true
  } catch (error) {
    console.error('Error adding project technology:', error)
    return false
  }
}

/**
 * Remove a technology from a project
 */
export async function removeProjectTechnology(projectId: number, technologyId: number): Promise<boolean> {
  try {
    await db.query`
      DELETE FROM entity_technologies
      WHERE entity_type = 'project' 
        AND entity_id = $1 
        AND technology_id = $2
    `, [projectId, technologyId]
    return true
  } catch (error) {
    console.error('Error removing project technology:', error)
    return false
  }
}

/**
 * Replace all technologies for a project
 */
export async function setProjectTechnologies(projectId: number, technologyIds: number[]): Promise<boolean> {
  try {
    // Delete existing
    await db.query`
      DELETE FROM entity_technologies
      WHERE entity_type = 'project' AND entity_id = $1
    `, [projectId]
    
    // Insert new ones if provided
    if (technologyIds.length > 0) {
      for (const techId of technologyIds) {
        await db.query`
          INSERT INTO entity_technologies (entity_type, entity_id, technology_id)
          VALUES ('project', $1, $2)
        `, [projectId, techId]
      }
    }
    
    return true
  } catch (error) {
    console.error('Error setting project technologies:', error)
    return false
  }
}
