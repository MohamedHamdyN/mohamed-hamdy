"use client"

import React from "react"
import { ThemeProvider } from "next-themes"
import { ProfileProvider } from "@/context/profile-context"
import type { Profile } from "@/lib/db"

function normalizeProfile(p: any): Profile {
  if (!p) return p
  return {
    ...p,
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

  React.useEffect(() => {
    const shouldReload = (msg: string) =>
      msg.includes("ChunkLoadError") ||
      msg.includes("Loading chunk") ||
      msg.includes("dynamically imported") ||
      msg.includes("Failed to fetch dynamically imported module")

    const onError = (event: ErrorEvent) => {
      const msg = String(event?.message || "")
      if (shouldReload(msg)) {
        if (!sessionStorage.getItem("chunk_reload_once")) {
          sessionStorage.setItem("chunk_reload_once", "1")
          window.location.reload()
        }
      }
    }

    const onUnhandledRejection = (event: PromiseRejectionEvent) => {
      const msg = String((event?.reason as any)?.message || event?.reason || "")
      if (shouldReload(msg)) {
        if (!sessionStorage.getItem("chunk_reload_once")) {
          sessionStorage.setItem("chunk_reload_once", "1")
          window.location.reload()
        }
      }
    }

    window.addEventListener("error", onError)
    window.addEventListener("unhandledrejection", onUnhandledRejection)
    return () => {
      window.removeEventListener("error", onError)
      window.removeEventListener("unhandledrejection", onUnhandledRejection)
    }
  }, [])

  return (
    <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
      <ProfileProvider profile={normalized}>{children}</ProfileProvider>
    </ThemeProvider>
  )
}