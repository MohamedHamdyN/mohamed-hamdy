import { revalidateTag } from "next/cache"

export const CACHE_TAGS = {
  PROFILE: "profile",
  PROJECTS: "projects",
  SKILLS: "skills",
  CLIENTS: "clients",
  SERVICES: "services",
  SETTINGS: "settings",
} as const

export function revalidateProfile() {
  revalidateTag(CACHE_TAGS.PROFILE)
}

export function revalidateProjects() {
  revalidateTag(CACHE_TAGS.PROJECTS)
}

export function revalidateSkills() {
  revalidateTag(CACHE_TAGS.SKILLS)
}

export function revalidateClients() {
  revalidateTag(CACHE_TAGS.CLIENTS)
}

export function revalidateServices() {
  revalidateTag(CACHE_TAGS.SERVICES)
}

export function revalidateSettings() {
  revalidateTag(CACHE_TAGS.SETTINGS)
}

// Revalidate multiple tags at once
export function revalidateMultiple(...tags: (typeof CACHE_TAGS[keyof typeof CACHE_TAGS])[]) {
  tags.forEach((tag) => revalidateTag(tag))
}
