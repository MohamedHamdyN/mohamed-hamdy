import prisma from "@/lib/db/client"

export interface ProjectData {
  id: string
  title: string
  description: string
  shortDescription: string
  slug: string
  categoryId: number
  image: string | null
  projectUrl: string | null
  linkedinUrl: string | null
  technologies: string[]
  date: string
  featured: boolean
  status: string
  createdAt: Date
  updatedAt: Date
}

export interface ProjectWithImages extends ProjectData {
  images: Array<{
    id: string
    imageUrl: string
    caption: string | null
    order: number
  }>
}

// Get all published projects
export async function getProjects(): Promise<ProjectData[]> {
  try {
    const projects = await prisma.project.findMany({
      where: { status: "published" },
      orderBy: { date: "desc" },
    })

    return projects as ProjectData[]
  } catch (error) {
    console.error("[v0] Error fetching projects:", error instanceof Error ? error.message : error)
    return []
  }
}

// Get featured projects only
export async function getFeaturedProjects(): Promise<ProjectData[]> {
  try {
    const projects = await prisma.project.findMany({
      where: { status: "published", featured: true },
      orderBy: { date: "desc" },
    })

    return projects as ProjectData[]
  } catch (error) {
    console.error("[v0] Error fetching featured projects:", error instanceof Error ? error.message : error)
    return []
  }
}

// Get single project by slug (published only)
export async function getProjectBySlug(slug: string): Promise<ProjectWithImages | null> {
  try {
    const project = await prisma.project.findFirst({
      where: { slug, status: "published" },
      include: {
        images: {
          orderBy: { order: "asc" },
        },
      },
    })

    return project as ProjectWithImages | null
  } catch (error) {
    console.error("[v0] Error fetching project by slug:", error instanceof Error ? error.message : error)
    return null
  }
}

// Get all projects including drafts (for admin)
export async function getAllProjects(): Promise<ProjectData[]> {
  try {
    const projects = await prisma.project.findMany({
      orderBy: { date: "desc" },
    })

    return projects as ProjectData[]
  } catch (error) {
    console.error("[v0] Error fetching all projects:", error instanceof Error ? error.message : error)
    return []
  }
}

// Get single project by ID (for admin)
export async function getProjectById(id: string): Promise<ProjectWithImages | null> {
  try {
    const project = await prisma.project.findUnique({
      where: { id },
      include: {
        images: {
          orderBy: { order: "asc" },
        },
      },
    })

    return project as ProjectWithImages | null
  } catch (error) {
    console.error("[v0] Error fetching project by ID:", error instanceof Error ? error.message : error)
    return null
  }
}

// Get projects by category
export async function getProjectsByCategory(categoryId: number): Promise<ProjectData[]> {
  try {
    const projects = await prisma.project.findMany({
      where: { categoryId, status: "published" },
      orderBy: { date: "desc" },
    })

    return projects as ProjectData[]
  } catch (error) {
    console.error("[v0] Error fetching projects by category:", error instanceof Error ? error.message : error)
    return []
  }
}
