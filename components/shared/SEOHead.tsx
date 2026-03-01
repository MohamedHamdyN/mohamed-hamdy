"use client"

import Head from "next/head"
import { useProfile } from "@/context/profile-context"

interface SEOHeadProps {
  title?: string
  description?: string
  keywords?: string
  ogImage?: string
  ogType?: "website" | "article"
  canonicalUrl?: string
}

export default function SEOHead({
  title,
  description,
  keywords = "data analyst, financial accountant, data visualization, analytics",
  ogImage = "/og-image.jpg",
  ogType = "website",
  canonicalUrl,
}: SEOHeadProps) {
  const profile = useProfile()

  const name = profile?.name ?? (profile as any)?.full_name ?? "Mohamed Hamdy"
  const profileTitle = (profile as any)?.title ?? profile?.title ?? "Data Analyst"
  const shortBio = (profile as any)?.shortBio ?? (profile as any)?.short_bio ?? profile?.short_bio ?? ""
  const favicon = (profile as any)?.favicon ?? "/favicon.ico"

  const finalDescription = description ?? shortBio
  const pageTitle = title ? `${title} | ${name}` : `${name} | ${profileTitle}`

  return (
    <Head>
      <title>{pageTitle}</title>
      <meta name="description" content={finalDescription} />
      <meta name="keywords" content={keywords} />

      <meta property="og:type" content={ogType} />
      <meta property="og:title" content={pageTitle} />
      <meta property="og:description" content={finalDescription} />
      <meta property="og:image" content={ogImage} />

      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={pageTitle} />
      <meta name="twitter:description" content={finalDescription} />
      <meta name="twitter:image" content={ogImage} />

      {canonicalUrl && <link rel="canonical" href={canonicalUrl} />}

      <link rel="icon" href={favicon} />
      <link rel="apple-touch-icon" href={favicon} />
    </Head>
  )
}