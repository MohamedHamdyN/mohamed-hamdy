export const dynamic = "force-dynamic"

import "./globals.css"
import { Inter } from "next/font/google"
import { Analytics } from "@vercel/analytics/react"
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
import { getProfile, getSiteSettings, getSocialLinks } from "@/app/actions/cms"
import Providers from "./providers"

import {
  Linkedin,
  Github,
  Twitter,
  Facebook,
  Instagram,
  ExternalLink,
} from "lucide-react"
import { headers } from "next/headers"

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
  preload: true,
})

function asString(v: unknown) {
  return typeof v === "string" ? v : ""
}

function toBoolean(v: unknown): boolean {
  if (typeof v === "boolean") return v
  if (typeof v === "number") return v === 1
  if (typeof v === "string") {
    const x = v.trim().toLowerCase()
    if (x === "true" || x === "1" || x === "yes" || x === "on") return true
    if (x === "false" || x === "0" || x === "no" || x === "off" || x === "") return false
  }
  return false
}

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
    alternates: { canonical: "/" },
    openGraph: {
      type: "website",
      locale: "en_US",
      url: dynamicMetadata.siteUrl,
      title: dynamicMetadata.title,
      description: dynamicMetadata.description,
      siteName: dynamicMetadata.title,
      images: [{ url: dynamicMetadata.ogImage, width: 1200, height: 630, alt: dynamicMetadata.title }],
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
    verification: { google: "google-site-verification-code" },
    robots: {
      index: true,
      follow: true,
      googleBot: { index: true, follow: true, "max-image-preview": "large", "max-snippet": -1 },
    },
    generator: "v0.app",
  }
}

function platformIcon(platform: string, cls: string) {
  const key = platform.trim().toLowerCase()
  if (key.includes("linkedin")) return <Linkedin className={cls} />
  if (key.includes("github")) return <Github className={cls} />
  if (key.includes("twitter") || key === "x") return <Twitter className={cls} />
  if (key.includes("facebook")) return <Facebook className={cls} />
  if (key.includes("instagram")) return <Instagram className={cls} />
  return <ExternalLink className={cls} />
}

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  const websiteEnabled = toggleSettings.website

  const h = headers()

  // ✅ Best-effort admin bypass (عشان لوحة التحكم تفضل شغالة)
  // بعض البيئات بتوفر واحد من دول
  const path =
    h.get("x-invoke-path") ||
    h.get("x-matched-path") ||
    h.get("next-url") ||
    ""

  const isAdminRoute = path.startsWith("/admin")

  const [dbProfile, siteSettings, socialLinks] = await Promise.all([
    getProfile(),
    getSiteSettings(),
    getSocialLinks(),
  ])

  // ✅ IMPORTANT: toBoolean بدل Boolean() عشان "false" مايبقاش true
  const maintenanceMode = !isAdminRoute && toBoolean((siteSettings as any)?.maintenance_mode)

  // بيانات الهيرو (من DB)
  const name = asString((dbProfile as any)?.name) || "Portfolio"
  const title = asString((dbProfile as any)?.title) || "Data Analyst"
  const heroDescription =
    asString((dbProfile as any)?.hero_description) ||
    "Transforming complex data into actionable insights that drive business decisions."

  const enabledSocial = (socialLinks ?? [])
    .filter((x: any) => x && x.enabled !== false && x.url && String(x.url).trim())
    .sort((a: any, b: any) => Number(a.order ?? 0) - Number(b.order ?? 0))

  return (
    <html lang="en" className="scroll-smooth">
      <body className={`${inter.variable} min-h-screen bg-background text-foreground font-sans`}>
        <Providers profile={dbProfile}>
          <ErrorBoundary>
            <SkipToContent />

            {/* ✅ Maintenance gate */}
            {maintenanceMode ? (
              <main id="main-content" className="min-h-screen bg-[#020617]">
                <div className="relative isolate overflow-hidden min-h-screen flex items-center">
                  {/* background blobs */}
                  <div className="absolute inset-0 -z-10">
                    <div className="absolute top-0 left-[10%] w-[500px] h-[500px] bg-primary/10 rounded-full filter blur-3xl opacity-30" />
                    <div className="absolute bottom-0 right-[10%] w-[600px] h-[600px] bg-secondary/10 rounded-full filter blur-3xl opacity-20" />
                  </div>

                  <div className="mx-auto max-w-7xl px-6 py-24 sm:py-32 lg:flex lg:items-center lg:gap-x-10 lg:px-8 lg:py-40">
                    <div className="mx-auto max-w-2xl lg:mx-0 lg:max-w-xl lg:flex-shrink-0">
                      <p className="text-base font-semibold leading-7 text-primary">Hello, I&apos;m</p>

                      <h1 className="mt-2 text-4xl font-bold tracking-tight text-foreground sm:text-6xl">
                        <span className="inline-block bg-clip-text text-transparent bg-gradient-to-r from-primary via-blue-400 to-secondary">
                          {name}
                        </span>
                      </h1>

                      <h2 className="mt-4 text-2xl font-semibold tracking-tight sm:text-3xl text-primary">
                        {title}
                      </h2>

                      <p className="mt-6 text-lg leading-8 text-muted-foreground">
                        {heroDescription}
                      </p>

                      {/* ✅ بدل الأزرار: Social icons from DB */}
                      <div className="mt-10 flex flex-wrap gap-3">
                        {enabledSocial.length === 0 ? (
                          <p className="text-sm text-slate-400">
                            (No social links enabled)
                          </p>
                        ) : (
                          enabledSocial.map((x: any) => (
                            <a
                              key={x.id}
                              href={x.url}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="p-3 rounded-full bg-white/5 border border-white/10 hover:bg-white/10 transition"
                              aria-label={`Visit ${x.platform}`}
                              title={x.platform}
                            >
                              {platformIcon(String(x.platform ?? ""), "h-6 w-6")}
                            </a>
                          ))
                        )}
                      </div>

                      <p className="mt-6 text-sm text-slate-400">
                        This website is currently under maintenance.
                      </p>
                    </div>

                    {/* right side visuals */}
                    <div className="mx-auto mt-16 flex max-w-2xl sm:mt-24 lg:ml-10 lg:mr-0 lg:mt-0 lg:max-w-none lg:flex-none xl:ml-32">
                      <div className="max-w-3xl flex-none sm:max-w-5xl lg:max-w-none">
                        <div className="relative h-[300px] w-[300px] sm:h-[400px] sm:w-[400px]">
                          <div className="absolute top-0 left-0 w-72 h-72 bg-primary/20 rounded-full mix-blend-multiply filter blur-xl opacity-70" />
                          <div className="absolute top-0 right-0 w-72 h-72 bg-secondary/20 rounded-full mix-blend-multiply filter blur-xl opacity-70" />
                          <div className="absolute bottom-0 left-20 w-72 h-72 bg-accent/20 rounded-full mix-blend-multiply filter blur-xl opacity-70" />

                          <div className="absolute inset-0 flex items-center justify-center">
                            <div className="relative w-64 h-64">
                              <div className="absolute top-0 left-0 bg-background/80 border border-border p-4 rounded-lg shadow-lg backdrop-blur-sm">
                                <div className="h-8 w-8 bg-primary/40 rounded mb-2" />
                                <div className="w-32 h-2 bg-primary/30 rounded-full" />
                                <div className="w-24 h-2 bg-primary/20 rounded-full mt-2" />
                              </div>

                              <div className="absolute bottom-0 left-0 bg-background/80 border border-border p-4 rounded-lg shadow-lg backdrop-blur-sm">
                                <div className="h-8 w-8 bg-secondary/40 rounded mb-2" />
                                <div className="w-32 h-2 bg-secondary/30 rounded-full" />
                                <div className="w-24 h-2 bg-secondary/20 rounded-full mt-2" />
                              </div>

                              <div className="absolute top-1/2 right-0 -translate-y-1/2 bg-background/80 border border-border p-4 rounded-lg shadow-lg backdrop-blur-sm">
                                <div className="h-8 w-8 bg-accent/40 rounded mb-2" />
                                <div className="w-32 h-2 bg-accent/30 rounded-full" />
                                <div className="w-24 h-2 bg-accent/20 rounded-full mt-2" />
                              </div>
                            </div>
                          </div>

                        </div>
                      </div>
                    </div>

                  </div>
                </div>
              </main>
            ) : (
              <>
                {websiteEnabled && <Header />}
                <main className={websiteEnabled ? "pt-16" : ""} id="main-content">
                  {children}
                </main>
                {websiteEnabled && <Footer />}
                <FloatingActionButton />
                <SpeedInsightsWrapper />
                <Analytics />
              </>
            )}
          </ErrorBoundary>
        </Providers>
      </body>
    </html>
  )
}