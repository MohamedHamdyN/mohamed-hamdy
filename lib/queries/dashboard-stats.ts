/**
 * Dashboard Statistics Queries
 * Provides aggregated data for admin dashboard
 */

import { db } from '@/lib/db'

export type DashboardStats = {
  totalProjects: number
  publishedProjects: number
  draftProjects: number
  featuredProjects: number
  totalSkills: number
  enabledSkills: number
  totalServices: number
  enabledServices: number
  totalClients: number
  enabledClients: number
  totalCategories: number
  enabledCategories: number
  totalTechnologies: number
}

/**
 * Get comprehensive dashboard statistics
 */
export async function getDashboardStats(): Promise<DashboardStats> {
  try {
    const results = await Promise.all([
      // Projects stats
      db.query`SELECT COUNT(*) as count FROM projects`,
      db.query`SELECT COUNT(*) as count FROM projects WHERE draft = false`,
      db.query`SELECT COUNT(*) as count FROM projects WHERE draft = true`,
      db.query`SELECT COUNT(*) as count FROM projects WHERE featured = true AND draft = false`,
      
      // Skills stats
      db.query`SELECT COUNT(*) as count FROM resume_skills`,
      db.query`SELECT COUNT(*) as count FROM resume_skills WHERE enabled = true`,
      
      // Services stats
      db.query`SELECT COUNT(*) as count FROM services`,
      db.query`SELECT COUNT(*) as count FROM services WHERE enabled = true`,
      
      // Clients stats
      db.query`SELECT COUNT(*) as count FROM clients`,
      db.query`SELECT COUNT(*) as count FROM clients WHERE enabled = true`,
      
      // Categories stats
      db.query`SELECT COUNT(*) as count FROM project_categories`,
      db.query`SELECT COUNT(*) as count FROM project_categories WHERE enabled = true`,
      
      // Technologies stats
      db.query`SELECT COUNT(*) as count FROM technologies`,
    ])

    return {
      totalProjects: Number(results[0][0]?.count || 0),
      publishedProjects: Number(results[1][0]?.count || 0),
      draftProjects: Number(results[2][0]?.count || 0),
      featuredProjects: Number(results[3][0]?.count || 0),
      totalSkills: Number(results[4][0]?.count || 0),
      enabledSkills: Number(results[5][0]?.count || 0),
      totalServices: Number(results[6][0]?.count || 0),
      enabledServices: Number(results[7][0]?.count || 0),
      totalClients: Number(results[8][0]?.count || 0),
      enabledClients: Number(results[9][0]?.count || 0),
      totalCategories: Number(results[10][0]?.count || 0),
      enabledCategories: Number(results[11][0]?.count || 0),
      totalTechnologies: Number(results[12][0]?.count || 0),
    }
  } catch (error) {
    console.error('Error getting dashboard stats:', error)
    return {
      totalProjects: 0,
      publishedProjects: 0,
      draftProjects: 0,
      featuredProjects: 0,
      totalSkills: 0,
      enabledSkills: 0,
      totalServices: 0,
      enabledServices: 0,
      totalClients: 0,
      enabledClients: 0,
      totalCategories: 0,
      enabledCategories: 0,
      totalTechnologies: 0,
    }
  }
}

/**
 * Get recent projects (last 5)
 */
export async function getRecentProjects() {
  try {
    const result = await db.query`
      SELECT 
        id,
        title,
        slug,
        draft,
        featured,
        date,
        created_at
      FROM projects
      ORDER BY created_at DESC
      LIMIT 5
    `
    return result
  } catch (error) {
    console.error('Error getting recent projects:', error)
    return []
  }
}

/**
 * Get projects by status
 */
export async function getProjectsByStatus() {
  try {
    const result = await db.query`
      SELECT 
        CASE 
          WHEN draft = true THEN 'Draft'
          WHEN featured = true THEN 'Featured'
          ELSE 'Published'
        END as status,
        COUNT(*) as count
      FROM projects
      GROUP BY draft, featured
    `
    return result
  } catch (error) {
    console.error('Error getting projects by status:', error)
    return []
  }
}

/**
 * Get content completeness score
 */
export async function getContentCompletenessScore(): Promise<number> {
  try {
    const profile = await db.query`SELECT * FROM profile LIMIT 1`
    
    if (!profile[0]) return 0

    const p = profile[0]
    let score = 0
    const fields = [
      p.name,
      p.title,
      p.bio,
      p.avatar_url,
      p.email,
      p.location,
    ]
    
    score += fields.filter(f => f && f.toString().trim()).length * (100 / fields.length)
    
    return Math.round(score)
  } catch (error) {
    console.error('Error calculating completeness score:', error)
    return 0
  }
}
