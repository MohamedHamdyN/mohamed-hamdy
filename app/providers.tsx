"use client"

import React from "react"
import { ThemeProvider } from "next-themes"
import { LanguageProvider } from "@/context/language-context"
import { ProfileProvider } from "@/context/profile-context"
import type { Profile } from "@/lib/db"

function normalizeProfile(p: any): Profile {
  if (!p) return p

  return {
    ...p,
    // توحيد أسماء الحقول
    name: p.name ?? p.full_name ?? "Mohamed Hamdy",
    title: p.title ?? p.job_title ?? "",
    title2: p.title2 ?? p.job_title_2 ?? "",
    logo: p.logo ?? p.logo_url ?? "",
    resumeUrl: p.resumeUrl ?? p.resume_url ?? "",
    shortBio: p.shortBio ?? p.short_bio ?? "",
    email: p.email ?? "",
    phone: p.phone ?? "",
    location: p.location ?? "",
    favicon: p.favicon ?? "/favicon.ico",

    // Social
    socialLinks: p.socialLinks ?? p.social_links ?? {},
  }
}

export default function Providers({
  children,
  profile,
}: {
  children: React.ReactNode
  profile: Profile | null
}) {
  const normalized = profile ? normalizeProfile(profile) : null

  return (
    <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
      <LanguageProvider>
        <ProfileProvider profile={normalized}>{children}</ProfileProvider>
      </LanguageProvider>
    </ThemeProvider>
  )
}