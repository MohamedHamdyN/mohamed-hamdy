export const dynamic = "force-dynamic"

import "./globals.css"
import { Inter, Cairo } from "next/font/google"
import { Analytics } from "@vercel/analytics/react"
import { ThemeProvider } from "@/context/theme-context"
import Header from "@/components/layout/Header"
import Footer from "@/components/layout/Footer"
import FloatingActionButton from "@/components/shared/FloatingActionButton"
import SkipToContent from "@/components/layout/SkipToContent"
import type React from "react"
import { ErrorBoundary } from "@/components/shared/ErrorBoundary"
import type { Metadata } from "next"
import SpeedInsightsWrapper from "@/components/shared/SpeedInsightsWrapper"
import { toggleSettings } from "@/admin/toggle"
import { getDynamicMetadata } from "@/lib/seo"
import { ProfileProvider } from "@/context/profile-context"
import { getProfile } from "@/app/actions/cms"
import Providers from "./providers"

// Optimize font loading
const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
  preload: true,
})

// Dynamic metadata from database
export async function generateMetadata(): Promise<Metadata> {
  const [dynamicMetadata, profile] = await Promise.all([getDynamicMetadata(), getProfile()])

  const authorName = profile?.name || "Author"

  return {
    title: {
      template: `%s | ${dynamicMetadata.title}`,
      default: dynamicMetadata.title,
    },
    description: dynamicMetadata.description,
    keywords: ["data analyst", "financial accountant", "data visualization", "analytics", authorName],
    authors: [{ name: authorName }],
    creator: authorName,
    metadataBase: new URL(dynamicMetadata.siteUrl),
    alternates: {
      canonical: "/",
    },
    openGraph: {
      type: "website",
      locale: "en_US",
      url: dynamicMetadata.siteUrl,
      title: dynamicMetadata.title,
      description: dynamicMetadata.description,
      siteName: dynamicMetadata.title,
      images: [
        {
          url: dynamicMetadata.ogImage,
          width: 1200,
          height: 630,
          alt: dynamicMetadata.title,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: dynamicMetadata.title,
      description: dynamicMetadata.description,
      creator: authorName,
      images: [dynamicMetadata.ogImage],
    },
    icons: {
      icon: [{ url: "/favicon.svg", type: "image/svg+xml" }],
    },
    verification: {
      google: "google-site-verification-code",
    },
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        "max-image-preview": "large",
        "max-snippet": -1,
      },
    },
    generator: "v0.app",
  }
}

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  const websiteEnabled = toggleSettings.website
  const dbProfile = await getProfile()

  return (
    <html lang="en" className="scroll-smooth">
      <body className={`${inter.variable}  min-h-screen bg-background text-foreground font-sans`}>
        <Providers profile={dbProfile}>
          <ErrorBoundary>
            <SkipToContent />
            {websiteEnabled && <Header />}
            <main className={websiteEnabled ? "pt-16" : ""} id="main-content">
              {children}
            </main>
            {websiteEnabled && <Footer />}
            <FloatingActionButton />
            <SpeedInsightsWrapper />
            <Analytics />
          </ErrorBoundary>
        </Providers>
      </body>
    </html>
  )
}
