export const dynamic = "force-dynamic"

import "./globals.css"
import { Inter, Cairo } from "next/font/google"
import { Analytics } from "@vercel/analytics/react"
import { ThemeProvider } from "@/context/theme-context"
import { LanguageProvider } from "@/context/language-context"
import { ProfileProvider } from "@/context/profile-context"
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
import { getProfile } from "@/app/actions/cms"

// Optimize font loading
const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
  preload: true,
})

const cairo = Cairo({
  subsets: ["arabic"],
  variable: "--font-cairo",
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
      languages: {
        "en-US": "/en",
        "ar-EG": "/ar",
      },
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
      icon: [
        { url: "/favicon.ico", sizes: "any" },
        { url: "/icon.png", type: "image/png" },
      ],
      apple: [{ url: "/apple-icon.png" }],
      shortcut: ["/shortcut-icon.png"],
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

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const websiteEnabled = toggleSettings.website

  // ✅ جلب الـProfile مرة واحدة لكل رندر
  const profile = await getProfile()

  return (
    <html lang="en" suppressHydrationWarning className="dark scroll-smooth">
      <head>
        <link rel="icon" href="/favicon.ico" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta name="theme-color" content="#000000" />
      </head>

      <body className={`${inter.variable} ${cairo.variable} min-h-screen bg-background text-foreground font-sans`}>
        <ThemeProvider attribute="class" defaultTheme="dark" enableSystem>
          <LanguageProvider>
            <ProfileProvider profile={profile}>
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
            </ProfileProvider>
          </LanguageProvider>
        </ThemeProvider>
      </body>
    </html>
  )
}