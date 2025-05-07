import "./globals.css"
import { Inter, Cairo } from "next/font/google"
import { ThemeProvider } from "@/context/theme-context"
import { LanguageProvider } from "@/context/language-context"
import { profile } from "@/admin/profile"
import Header from "@/components/layout/Header"
import Footer from "@/components/layout/Footer"
import FloatingActionButton from "@/components/shared/FloatingActionButton"
import SkipToContent from "@/components/layout/SkipToContent"
import type React from "react"
import { ErrorBoundary } from "@/components/shared/ErrorBoundary"
import type { Metadata } from "next"
import { SpeedInsights } from "@vercel/speed-insights/next"

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

// Define metadata for better SEO
export const metadata: Metadata = {
  title: {
    template: `%s | ${profile.name || "Portfolio"}`,
    default: `${profile.name || "Portfolio"} | ${profile.title || "Data Analyst"}`,
  },
  description: profile.shortBio || "Professional portfolio",
  keywords: ["data analyst", "financial accountant", "data visualization", "analytics", profile.name || "portfolio"],
  authors: [{ name: profile.name || "Author" }],
  creator: profile.name || "Creator",
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || "https://yourwebsite.com"),
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
    url: process.env.NEXT_PUBLIC_SITE_URL || "https://yourwebsite.com",
    title: `${profile.name || "Portfolio"} | ${profile.title || "Data Analyst"}`,
    description: profile.shortBio || "Professional portfolio",
    siteName: `${profile.name || "Portfolio"} | Portfolio`,
    images: [
      {
        url: profile.ogImage || "/logo.png",
        width: 1200,
        height: 630,
        alt: profile.name || "Portfolio",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: `${profile.name || "Portfolio"} | ${profile.title || "Data Analyst"}`,
    description: profile.shortBio || "Professional portfolio",
    creator: profile.name || "Creator",
    images: [profile.ogImage || "/logo.png"],
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
    google: "google-site-verification-code", // Replace with your verification code
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
    generator: 'v0.dev'
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  // Check if website is enabled from environment variable
  const websiteEnabled = process.env.DISABLE_WEBSITE !== "true"

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
            <ErrorBoundary>
              <SkipToContent />
              {websiteEnabled && <Header />}
              <main className={websiteEnabled ? "pt-16" : ""} id="main-content">
                {children}
              </main>
              {websiteEnabled && <Footer />}
              <FloatingActionButton />
              <SpeedInsights />
            </ErrorBoundary>
          </LanguageProvider>
        </ThemeProvider>
      </body>
    </html>
  )
}
