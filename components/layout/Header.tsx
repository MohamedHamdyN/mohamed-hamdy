"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { useTheme } from "next-themes"
import { motion } from "framer-motion"
import { usePathname } from "next/navigation"
import { Menu, X, FileText, Sun, Moon } from "lucide-react"
import FullScreenMenu from "@/components/layout/FullScreenMenu"
import Image from "next/image"
import SkipToContent from "./SkipToContent"

// Hardcode profile and language settings
const profile = {
  name: "Mohamed Hamdy",
  logo: "",
  resumeUrl: "#",
}

export default function Header() {
  const [mounted, setMounted] = useState(false)
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const { theme, setTheme } = useTheme()
  const [language, setLanguage] = useState("en")
  const pathname = usePathname()

  useEffect(() => setMounted(true), [])

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen)

  // Toggle language directly
  const toggleLanguage = () => {
    setLanguage(language === "en" ? "ar" : "en")
  }

  // Hardcoded translations
  const translations = {
    nav: {
      home: "Home",
      projects: "Projects",
      about: "About",
      services: "Services",
      contact: "Contact",
    },
  }

  // Create navigation items
  const navItems = [
    { name: translations.nav.home, href: "/", enabled: true },
    { name: translations.nav.projects, href: "/projects", enabled: true },
    { name: translations.nav.about, href: "/about", enabled: true },
    { name: translations.nav.services, href: "/services", enabled: true },
    { name: translations.nav.contact, href: "/contact", enabled: true },
  ].filter((item) => item.enabled)

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
            <Link href="/" className="-m-1.5 p-1.5" aria-label="Home">
              <span className="sr-only">{profile.name}</span>
              {profile.logo ? (
                <div className="relative h-8 w-8 overflow-hidden rounded-full border border-primary/20 bg-background/80 backdrop-blur-sm shadow-sm">
                  <Image
                    src={profile.logo || "/placeholder.svg"}
                    alt={profile.name}
                    width={32}
                    height={32}
                    className="h-full w-full object-contain p-1"
                    priority
                    unoptimized
                  />
                </div>
              ) : (
                <div className="text-xl font-bold text-primary">MH</div>
              )}
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex">
            <div className="relative bg-black/10 dark:bg-white/5 backdrop-blur-sm rounded-full p-1.5 flex space-x-1">
              {navItems.map((item) => (
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
                className="px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 bg-secondary text-white hover:bg-secondary/90 flex items-center gap-1.5"
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

            <button
              onClick={toggleLanguage}
              className="p-2 rounded-full bg-black/10 dark:bg-white/5 backdrop-blur-sm hover:bg-black/20 dark:hover:bg-white/10 transition-colors"
              aria-label={language === "en" ? "Switch to Arabic" : "Switch to English"}
            >
              <span className="font-bold text-sm">{language === "en" ? "ع" : "EN"}</span>
            </button>

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

      <FullScreenMenu isOpen={isMenuOpen} onClose={toggleMenu} items={navItems} />
    </>
  )
}
