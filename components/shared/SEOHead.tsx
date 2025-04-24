import Head from "next/head"
import { profile } from "@/admin/profile"

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
  description = profile.shortBio,
  keywords = "data analyst, financial accountant, data visualization, analytics",
  ogImage = "/og-image.jpg",
  ogType = "website",
  canonicalUrl,
}: SEOHeadProps) {
  const pageTitle = title ? `${title} | ${profile.name}` : `${profile.name} | ${profile.title}`

  return (
    <Head>
      <title>{pageTitle}</title>
      <meta name="description" content={description} />
      <meta name="keywords" content={keywords} />

      {/* Open Graph / Facebook */}
      <meta property="og:type" content={ogType} />
      <meta property="og:title" content={pageTitle} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={ogImage} />

      {/* Twitter */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={pageTitle} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={ogImage} />

      {/* Canonical URL */}
      {canonicalUrl && <link rel="canonical" href={canonicalUrl} />}

      {/* Favicon */}
      <link rel="icon" href={profile.favicon} />
      <link rel="apple-touch-icon" href={profile.favicon} />
    </Head>
  )
}
