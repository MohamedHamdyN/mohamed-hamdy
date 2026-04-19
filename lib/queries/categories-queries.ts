/**
 * Project Categories Queries
 * Handles fetching categories and related projects
 */

import { db } from '@/lib/db'

export type ProjectCategory = {
  id: number
  name: string
  slug: string
  description?: string
  enabled: boolean
  order: number
  created_at: string
  updated_at: string
}

export type CategoryWithProjects = ProjectCategory & {
  projectCount: number
}

/**
 * Get all enabled categories
 */
export async function getPublicCategories(): Promise<ProjectCategory[]> {
  try {
    const result = await db.query`
      SELECT 
        id,
        name,
        slug,
        description,
        enabled,
        "order",
        created_at,
        updated_at
      FROM project_categories
      WHERE enabled = true
      ORDER BY "order" ASC
    `
    return result as ProjectCategory[]
  } catch (error) {
    console.error('Error getting public categories:', error)
    return []
  }
}

/**
 * Get all categories including disabled ones (admin view)
 */
export async function getAllCategories(): Promise<ProjectCategory[]> {
  try {
    const result = await db.query`
      SELECT 
        id,
        name,
        slug,
        description,
        enabled,
        "order",
        created_at,
        updated_at
      FROM project_categories
      ORDER BY "order" ASC
    `
    return result as ProjectCategory[]
  } catch (error) {
    console.error('Error getting all categories:', error)
    return []
  }
}

/**
 * Get a single category by slug
 */
export async function getCategoryBySlug(slug: string): Promise<ProjectCategory | null> {
  try {
    const result = await db.query`
      SELECT 
        id,
        name,
        slug,
        description,
        enabled,
        "order",
        created_at,
        updated_at
      FROM project_categories
      WHERE slug = $1
      LIMIT 1
    `, [slug]
    return result[0] as ProjectCategory | undefined ?? null
  } catch (error) {
    console.error('Error getting category by slug:', error)
    return null
  }
}

/**
 * Get categories with project counts
 */
export async function getCategoriesWithCounts(): Promise<CategoryWithProjects[]> {
  try {
    const result = await db.query`
      SELECT 
        pc.id,
        pc.name,
        pc.slug,
        pc.description,
        pc.enabled,
        pc."order",
        pc.created_at,
        pc.updated_at,
        COUNT(p.id) as projectCount
      FROM project_categories pc
      LEFT JOIN projects p 
        ON p.category_id = pc.id AND p.draft = false
      WHERE pc.enabled = true
      GROUP BY pc.id
      ORDER BY pc."order" ASC
    `
    return result as CategoryWithProjects[]
  } catch (error) {
    console.error('Error getting categories with counts:', error)
    return []
  }
}

/**
 * Get projects filtered by category
 */
export async function getProjectsByCategory(categorySlug: string): Promise<any[]> {
  try {
    const result = await db.query`
      SELECT 
        p.*,
        pc.name as category_name
      FROM projects p
      INNER JOIN project_categories pc 
        ON p.category_id = pc.id
      WHERE pc.slug = $1 AND p.draft = false
      ORDER BY p.featured DESC, p."order" ASC
    `, [categorySlug]
    return result
  } catch (error) {
    console.error('Error getting projects by category:', error)
    return []
  }
}
