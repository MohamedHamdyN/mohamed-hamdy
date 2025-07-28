"use client"

import type React from "react"
import { createContext, useContext, useState, useEffect } from "react"
import { getLanguageSettings } from "@/lib/settings"

type Language = "en" | "ar"

interface LanguageContextType {
  language: Language
  setLanguage: (lang: Language) => void
  isRTL: boolean
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined)

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [language, setLanguage] = useState<Language>("en")
  const [isRTL, setIsRTL] = useState<boolean>(false)
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    async function initializeLanguage() {
      try {
        const languageSettings = await getLanguageSettings()
        const defaultLang = (languageSettings.default_language as Language) || "en"

        // Check if there's a saved language preference
        if (typeof window !== "undefined") {
          const savedLanguage = localStorage.getItem("language") as Language
          if (savedLanguage) {
            setLanguage(savedLanguage)
          } else {
            setLanguage(defaultLang)
          }
        } else {
          setLanguage(defaultLang)
        }
      } catch (error) {
        console.error("Error initializing language:", error)
        setLanguage("en") // Fallback to English
      } finally {
        setMounted(true)
      }
    }

    initializeLanguage()
  }, [])

  useEffect(() => {
    if (!mounted) return

    // Update RTL state based on language
    setIsRTL(language === "ar")

    // Update HTML dir attribute
    if (typeof document !== "undefined") {
      document.documentElement.dir = language === "ar" ? "rtl" : "ltr"

      // Update font family based on language
      if (language === "ar") {
        document.documentElement.classList.add("font-cairo")
        document.documentElement.classList.remove("font-inter")
      } else {
        document.documentElement.classList.add("font-inter")
        document.documentElement.classList.remove("font-cairo")
      }

      // Save language preference
      localStorage.setItem("language", language)
    }
  }, [language, mounted])

  return <LanguageContext.Provider value={{ language, setLanguage, isRTL }}>{children}</LanguageContext.Provider>
}

export function useLanguage() {
  const context = useContext(LanguageContext)
  if (context === undefined) {
    throw new Error("useLanguage must be used within a LanguageProvider")
  }
  return context
}
