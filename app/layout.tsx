import type React from "react"
import type { Metadata } from "next"
import { Inter, Cairo } from "next/font/google"
import { ThemeProvider } from "@/components/theme-provider"
import { Toaster } from "@/components/ui/toaster"
import { profile } from "@/admin/profile"
import { toggleSettings } from "@/admin/toggle"
import { HeaderErrorBoundary } from "@/components/layout/HeaderErrorBoundary"
import Header from "@/components/layout/Header"
import Footer from "@/components/layout/Footer"
import SkipToContent from "@/components/layout/SkipToContent"
import "./globals.css"
import Script from "next/script"

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-inter",
})

const cairo = Cairo({
  subsets: ["arabic"],
  display: "swap",
  variable: "--font-cairo",
})

export const metadata: Metadata = {
  title: {
    default: profile.name,
    template: `%s | ${profile.name}`,
  },
  description: profile.bio,
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000"),
  icons: {
    icon: "/favicon.ico",
    apple: "/apple-touch-icon.png",
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000",
    title: profile.name,
    description: profile.bio,
    siteName: profile.name,
    images: [
      {
        url: profile.ogImage || `${process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000"}/og-image.jpg`,
        width: 1200,
        height: 630,
        alt: profile.name,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: profile.name,
    description: profile.bio,
    images: [profile.ogImage || `${process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000"}/og-image.jpg`],
    creator: "@username",
  },
    generator: 'v0.dev'
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  // استخدام toggleSettings بدلاً من متغيرات البيئة مباشرة
  const isWebsiteDisabled = !toggleSettings.website

  return (
    <html lang="en" suppressHydrationWarning className={`${inter.variable} ${cairo.variable}`}>
      <head>
        <Script id="language-script" strategy="beforeInteractive">
          {`
            (function() {
              try {
                var lang = localStorage.getItem('language') || '${profile.defaultLanguage || "en"}';
                document.documentElement.dir = lang === 'ar' ? 'rtl' : 'ltr';
                document.documentElement.classList.add(lang === 'ar' ? 'font-cairo' : 'font-inter');
              } catch (e) {}
            })();
          `}
        </Script>
        <Script src="/noflash.js" strategy="beforeInteractive" />
        <link rel="preload" href="/logo.svg" as="image" type="image/svg+xml" />
      </head>
      <body>
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange>
          <SkipToContent />
          {!isWebsiteDisabled && (
            <HeaderErrorBoundary>
              <Header />
            </HeaderErrorBoundary>
          )}
          <div id="main-content">{children}</div>
          {!isWebsiteDisabled && <Footer />}
          <Toaster />
        </ThemeProvider>
      </body>
    </html>
  )
}
