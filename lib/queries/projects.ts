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
  const projects = await prisma.project.findMany({
    where: { status: "published" },
    orderBy: { date: "desc" },
  })

  return projects as ProjectData[]
}

// Get featured projects only
export async function getFeaturedProjects(): Promise<ProjectData[]> {
  const projects = await prisma.project.findMany({
    where: { status: "published", featured: true },
    orderBy: { date: "desc" },
  })

  return projects as ProjectData[]
}

// Get single project by slug (published only)
export async function getProjectBySlug(slug: string): Promise<ProjectWithImages | null> {
  const project = await prisma.project.findFirst({
    where: { slug, status: "published" },
    include: {
      images: {
        orderBy: { order: "asc" },
      },
    },
  })

  return project as ProjectWithImages | null
}

// Get all projects including drafts (for admin)
export async function getAllProjects(): Promise<ProjectData[]> {
  const projects = await prisma.project.findMany({
    orderBy: { date: "desc" },
  })

  return projects as ProjectData[]
}

// Get single project by ID (for admin)
export async function getProjectById(id: string): Promise<ProjectWithImages | null> {
  const project = await prisma.project.findUnique({
    where: { id },
    include: {
      images: {
        orderBy: { order: "asc" },
      },
    },
  })

  return project as ProjectWithImages | null
}

// Get projects by category
export async function getProjectsByCategory(categoryId: number): Promise<ProjectData[]> {
  const projects = await prisma.project.findMany({
    where: { categoryId, status: "published" },
    orderBy: { date: "desc" },
  })

  return projects as ProjectData[]
}
