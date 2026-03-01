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

    // ✅ normalize snake_case -> camelCase here (ONLY here)
    const p: any = profile

    return {
      ...p,
      name: p.name ?? p.full_name ?? "Mohamed Hamdy",
      logo: p.logo ?? p.logo_url ?? p.avatar_url ?? "",
      resumeUrl: p.resumeUrl ?? p.resume_url ?? "",
      shortBio: p.shortBio ?? p.short_bio ?? "",
      favicon: p.favicon ?? "/favicon.ico",

      // ✅ social links normalized (use ONE key everywhere)
      socialLinks: p.socialLinks ?? p.social_links ?? {
        linkedin: p.linkedin ?? "",
        github: p.github ?? "",
        twitter: p.twitter ?? "",
        facebook: p.facebook ?? "",
        instagram: p.instagram ?? "",
      },

      // ✅ fallbacks
      defaultProjectImage: p.defaultProjectImage ?? p.default_project_image ?? "/placeholder.svg?height=600&width=800",
      defaultPlatformLogo: p.defaultPlatformLogo ?? p.default_platform_logo ?? "/placeholder.svg",
      calendlyUrl: p.calendlyUrl ?? p.calendly_url ?? "",
    }
  }, [profile])

  return (
    <ProfileContext.Provider value={{ profile, normalized }}>
      {children}
    </ProfileContext.Provider>
  )
}

export function useProfile() {
  return useContext(ProfileContext).normalized
}