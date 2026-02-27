import prisma from "@/lib/db/client"

export interface ProfileData {
  id: string
  name: string
  title: string
  title2: string | null
  email: string
  phone: string | null
  location: string | null
  bio: string
  shortBio: string
  longBio: string
  logo: string
  favicon: string
  avatar: string
  defaultProjectImage: string
  defaultClientLogo: string
  defaultPlatformLogo: string
  ogImage: string
  resumeUrl: string
  calendlyUrl: string | null
}

export interface ProfileWithRelations extends ProfileData {
  socialLinks: Array<{
    id: string
    platform: string
    url: string
    isActive: boolean
    order: number
  }>
  stats: Array<{
    id: string
    name: string
    value: string
    icon: string
    color: string
    enabled: boolean
    order: number
  }>
  certifications: Array<{
    id: string
    title: string
    issuer: string
    date: string
    credentialUrl: string
    description: string
    enabled: boolean
    order: number
  }>
  journeyEntries: Array<{
    id: string
    year: string
    title: string
    description: string
    details: string
    order: number
  }>
  educationEntries: Array<{
    id: string
    year: string
    institution: string
    degree: string
    details: string
    order: number
  }>
}

export async function getProfile(): Promise<ProfileWithRelations | null> {
  const profile = await prisma.profile.findFirst({
    include: {
      socialLinks: {
        where: { isActive: true },
        orderBy: { order: "asc" },
      },
      stats: {
        where: { enabled: true },
        orderBy: { order: "asc" },
      },
      certifications: {
        where: { enabled: true },
        orderBy: { order: "asc" },
      },
      journeyEntries: {
        orderBy: { order: "asc" },
      },
      educationEntries: {
        orderBy: { order: "asc" },
      },
    },
  })

  return profile as ProfileWithRelations | null
}

export async function updateProfile(data: Partial<ProfileData>): Promise<ProfileData> {
  const profile = await prisma.profile.update({
    where: { id: (await getProfile())?.id || "" },
    data,
  })

  return profile as ProfileData
}
