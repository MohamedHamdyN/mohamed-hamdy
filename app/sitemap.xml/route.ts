import type { MetadataRoute } from "next"
import { toggleSettings } from "@/admin/toggle"
import { projects } from "@/admin/projects"

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL

  const routes = [
    {
      url: `${baseUrl}`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 1,
    },
  ]

  // Add enabled pages
  if (toggleSettings.projects_page) {
    routes.push({
      url: `${baseUrl}/projects`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.8,
    })

    // Add individual project pages if they exist
    projects.forEach((project) => {
      if (project.projectUrl && project.projectUrl.startsWith(baseUrl)) {
        routes.push({
          url: project.projectUrl,
          lastModified: new Date(project.date),
          changeFrequency: "monthly",
          priority: 0.7,
        })
      }
    })
  }

  if (toggleSettings.about_page) {
    routes.push({
      url: `${baseUrl}/about`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.8,
    })
  }

  if (toggleSettings.services_page) {
    routes.push({
      url: `${baseUrl}/services`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.8,
    })
  }

  if (toggleSettings.contact_page) {
    routes.push({
      url: `${baseUrl}/contact`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.7,
    })
  }

  return routes as any
}
