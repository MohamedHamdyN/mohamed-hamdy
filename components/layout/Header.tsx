"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { useTheme } from "next-themes"
import { motion } from "framer-motion"
import { usePathname } from "next/navigation"
import { useLanguage } from "@/context/language-context"
import { useTranslations } from "@/hooks/useTranslations"
import { Menu, X, FileText, Sun, Moon } from "lucide-react"
import FullScreenMenu from "@/components/layout/FullScreenMenu"
import { profile } from "@/admin/profile"
import { clientSettings } from "@/admin/toggle"
import { languageSettings } from "@/admin/profile"
import Image from "next/image"
import SkipToContent from "./SkipToContent"

export default function Header() {
  const [mounted, setMounted] = useState(false)
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [logoError, setLogoError] = useState(false)
  const [logoLoaded, setLogoLoaded] = useState(false)
  const [navItems, setNavItems] = useState([{ name: "Home", href: "/", enabled: true }])
  const { theme, setTheme } = useTheme()
  const { language, setLanguage, isRTL } = useLanguage()
  const t = useTranslations()
  const pathname = usePathname()

  useEffect(() => {
    setMounted(true)

    // تحديث عناصر التنقل بناءً على clientSettings
    setNavItems([
      { name: t.nav.home, href: "/", enabled: true },
      { name: t.nav.projects, href: "/projects", enabled: clientSettings.projects_page },
      { name: t.nav.about, href: "/about", enabled: clientSettings.about_page },
      { name: t.nav.services, href: "/services", enabled: clientSettings.services_page },
      { name: t.nav.contact, href: "/contact", enabled: clientSettings.contact_page },
    ])
  }, [t, language])

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen)

  // Toggle language directly
  const toggleLanguage = () => {
    setLanguage(language === "en" ? "ar" : "en")
  }

  // تصفية عناصر التنقل المفعلة فقط
  const enabledNavItems = navItems.filter((item) => item.enabled)

  // معالجة تحميل الشعار
  const handleLogoLoad = () => {
    setLogoLoaded(true)
  }

  // معالجة خطأ تحميل الشعار
  const handleLogoError = () => {
    setLogoError(true)
  }

  return (
    <>
      <SkipToContent />
      <motion.header
        className="fixed top-0 left-0 right-0 z-50 bg-background/60 backdrop-blur-xl border-b border-border/30"
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <nav className="mx-auto flex max-w-7xl items-center justify-between p-4 lg:px-8" aria-label="Global">
          <div className="flex lg:flex-1">
            <Link href="/" className="-m-1.5 p-1.5 flex items-center gap-2" aria-label="Home">
              <span className="sr-only">{profile.name}</span>
              <div className="relative h-8 w-8 overflow-hidden rounded-full border border-primary/20 bg-background/80 backdrop-blur-sm shadow-sm">
                {!logoError ? (
                  <>
                    {!logoLoaded && (
                      <div className="absolute inset-0 flex items-center justify-center">
                        <div className="h-4 w-4 border-2 border-primary border-t-transparent rounded-full animate-spin"></div>
                      </div>
                    )}
                    <Image
                      src={profile.logo || "/placeholder.svg"}
                      alt={profile.name}
                      width={32}
                      height={32}
                      className={`h-full w-full object-contain p-1 transition-opacity duration-300 ${
                        logoLoaded ? "opacity-100" : "opacity-0"
                      }`}
                      priority
                      unoptimized
                      onLoad={handleLogoLoad}
                      onError={handleLogoError}
                    />
                  </>
                ) : (
                  <div className="h-full w-full flex items-center justify-center">
                    <span className="text-xl font-bold text-primary">MH</span>
                  </div>
                )}
              </div>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex">
            <div className="relative bg-black/10 dark:bg-white/5 backdrop-blur-sm rounded-full p-1.5 flex space-x-1">
              {enabledNavItems.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
                    pathname === item.href ? "bg-primary text-white" : "hover:bg-black/5 dark:hover:bg-white/5"
                  }`}
                  aria-current={pathname === item.href ? "page" : undefined}
                >
                  {item.name}
                </Link>
              ))}
              <Link
                href={profile.resumeUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 bg-secondary text-secondary-foreground hover:bg-secondary/90 flex items-center gap-1.5"
                aria-label="Download CV"
              >
                <FileText className="h-3.5 w-3.5" />
                CV
              </Link>
            </div>
          </div>

          <div className="flex items-center gap-4 lg:flex-1 lg:justify-end">
            {mounted && (
              <button
                onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
                className="p-2 rounded-full bg-black/10 dark:bg-white/5 backdrop-blur-sm hover:bg-black/20 dark:hover:bg-white/10 transition-colors"
                aria-label={theme === "dark" ? "Switch to light mode" : "Switch to dark mode"}
              >
                {theme === "dark" ? (
                  <Sun className="h-5 w-5 text-yellow-400" />
                ) : (
                  <Moon className="h-5 w-5 text-blue-500" />
                )}
              </button>
            )}

            {languageSettings.enableLanguageToggle && (
              <button
                onClick={toggleLanguage}
                className="p-2 rounded-full bg-black/10 dark:bg-white/5 backdrop-blur-sm hover:bg-black/20 dark:hover:bg-white/10 transition-colors"
                aria-label={language === "en" ? "Switch to Arabic" : "Switch to English"}
              >
                <span className="font-bold text-sm">{language === "en" ? "ع" : "EN"}</span>
              </button>
            )}

            <button
              className="lg:hidden rounded-full p-2 bg-black/10 dark:bg-white/5 text-primary backdrop-blur-sm hover:bg-black/20 dark:hover:bg-white/10 transition-colors"
              onClick={toggleMenu}
              aria-label={isMenuOpen ? "Close menu" : "Open menu"}
              aria-expanded={isMenuOpen}
            >
              {isMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </button>
          </div>
        </nav>
      </motion.header>

      <FullScreenMenu isOpen={isMenuOpen} onClose={toggleMenu} items={enabledNavItems} />
    </>
  )
}
