"use client"

import React, { createContext, useContext, useMemo } from "react"
import type { Profile } from "@/lib/db"

type ProfileContextValue = {
  profile: Profile | null
  normalized: any | null
}

const ProfileContext = createContext<ProfileContextValue>({ profile: null, normalized: null })

export function ProfileProvider({
  profile,
  children,
}: {
  profile: Profile | null
  children: React.ReactNode
}) {
  const normalized = useMemo(() => {
    if (!profile) return null

    const p: any = profile

    const heroImageUrl = p.hero_image_url ?? ""
    const avatarUrl = p.avatar_url ?? ""

    return {
      ...p,

      // basics
      name: p.name ?? "Mohamed Hamdy",

      // titles
      title1: (p.title ?? "").trim(),
      title2: (p.short_title ?? "").trim(),

      // hero
      heroDescription: p.hero_description ?? "",
      heroImageType: p.hero_image_type ?? "logo",
      heroImageUrl,

      // ✅ IMPORTANT: this is what Header often uses
      // include hero_image_url FIRST then avatar_url
      logo: heroImageUrl || avatarUrl || p.logo || p.logo_url || "",

      // urls
      resumeUrl: p.resume_url ?? p.resumeUrl ?? "",
      calendlyUrl: p.calendly_url ?? p.calendlyUrl ?? "",

      // bios
      shortBio: p.short_bio ?? p.shortBio ?? "",
      longBio: p.long_bio ?? "",
      aboutIntro: p.about_intro ?? "",

      // expose avatar explicitly too
      avatarUrl,

      // favicon (لو عندك مصدره في settings خليه هناك، بس هنا fallback)
      favicon: p.favicon ?? "/favicon.ico",

      // social (ده مش هيشتغل من profile أصلاً عندك لأنه table منفصل — سيبه فاضي هنا)
      socialLinks: p.socialLinks ?? p.social_links ?? {},

      defaultProjectImage:
        p.defaultProjectImage ?? p.default_project_image ?? "/placeholder.svg?height=600&width=800",
      defaultPlatformLogo:
        p.defaultPlatformLogo ?? p.default_platform_logo ?? "/placeholder.svg",
    }
  }, [profile])

  return <ProfileContext.Provider value={{ profile, normalized }}>{children}</ProfileContext.Provider>
}

export function useProfile() {
  return useContext(ProfileContext).normalized
}