/**
 * Cache Revalidation Times
 * Used for Next.js ISR (Incremental Static Regeneration)
 * and HTTP cache headers
 */

export const CACHE_REVALIDATE = {
  // Public pages - can be cached longer
  HOME: 300,           // 5 minutes
  PROJECTS: 600,       // 10 minutes
  ABOUT: 600,          // 10 minutes
  SERVICES: 600,       // 10 minutes
  CONTACT: 3600,       // 1 hour

  // Admin pages - no caching
  ADMIN: 0,            // No cache
  ADMIN_DASHBOARD: 0,
  ADMIN_PROFILE: 0,
  ADMIN_PROJECTS: 0,
  ADMIN_CATEGORIES: 0,
  ADMIN_SETTINGS: 0,

  // API endpoints
  API_HOME_DATA: 300,
  API_PROJECTS: 600,
  API_CATEGORIES: 1800, // 30 minutes
}

/**
 * HTTP Cache Headers
 * For additional caching control in API responses
 */
export const CACHE_HEADERS = {
  public: {
    'Cache-Control': 'public, s-maxage=300, stale-while-revalidate=600',
  },
  private: {
    'Cache-Control': 'private, max-age=0, must-revalidate',
  },
  static: {
    'Cache-Control': 'public, max-age=31536000, immutable',
  },
}

/**
 * Tag-based revalidation paths
 * Used with revalidateTag() for granular cache invalidation
 */
export const CACHE_TAGS = {
  PROFILE: 'profile',
  PROJECTS: 'projects',
  CATEGORIES: 'categories',
  SERVICES: 'services',
  SKILLS: 'skills',
  CLIENTS: 'clients',
  HOME: 'home-data',
}
