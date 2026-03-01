"use client"

import { useProfile } from "@/context/profile-context"

type SocialLinks = Record<string, string>

export type SafeProfile = {
  name: string
  title: string
  title2: string
  logo: string
  resumeUrl: string
  email: string
  phone: string
  location: string
  calendlyUrl: string
  favicon: string
  shortBio: string
  socialLinks: SocialLinks
  defaultProjectImage: string
  defaultPlatformLogo: string
  journey: any[]
}

const FALLBACK: SafeProfile = {
  name: "Mohamed Hamdy",
  title: "Data Analyst",
  title2: "Financial Accountant",
  logo: "",
  resumeUrl: "",
  email: "",
  phone: "",
  location: "",
  calendlyUrl: "",
  favicon: "/favicon.ico",
  shortBio: "",
  socialLinks: {},
  defaultProjectImage: "/placeholder.svg",
  defaultPlatformLogo: "/placeholder.svg",
  journey: [],
}

export function useProfileSafe(): SafeProfile {
  const profile = useProfile()

  // ✅ توحيد أسماء الحقول بين أي schema قديم/جديد
  const name = (profile as any)?.name ?? (profile as any)?.full_name ?? FALLBACK.name
  const title = (profile as any)?.title ?? FALLBACK.title
  const title2 = (profile as any)?.title2 ?? (profile as any)?.title_2 ?? FALLBACK.title2
  const logo = (profile as any)?.logo ?? (profile as any)?.avatar_url ?? ""
  const resumeUrl =
    (profile as any)?.resumeUrl ?? (profile as any)?.resume_url ?? (profile as any)?.resumeURL ?? ""
  const email = (profile as any)?.email ?? ""
  const phone = (profile as any)?.phone ?? ""
  const location = (profile as any)?.location ?? ""
  const calendlyUrl = (profile as any)?.calendlyUrl ?? (profile as any)?.calendly_url ?? ""
  const favicon = (profile as any)?.favicon ?? FALLBACK.favicon
  const shortBio = (profile as any)?.shortBio ?? (profile as any)?.short_bio ?? ""
  const socialLinks = (profile as any)?.socialLinks ?? (profile as any)?.social_links ?? {}
  const defaultProjectImage =
    (profile as any)?.defaultProjectImage ?? (profile as any)?.default_project_image ?? FALLBACK.defaultProjectImage
  const defaultPlatformLogo =
    (profile as any)?.defaultPlatformLogo ?? (profile as any)?.default_platform_logo ?? FALLBACK.defaultPlatformLogo
  const journey = (profile as any)?.journey ?? []

  return {
    name,
    title,
    title2,
    logo,
    resumeUrl,
    email,
    phone,
    location,
    calendlyUrl,
    favicon,
    shortBio,
    socialLinks,
    defaultProjectImage,
    defaultPlatformLogo,
    journey,
  }
}