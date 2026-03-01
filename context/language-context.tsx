"use client"

import type React from "react"
import { createContext, useContext, useEffect, useMemo, useState } from "react"
import { languageSettings } from "@/admin/profile"

type Language = "en" | "ar"

interface LanguageContextType {
  language: Language
  setLanguage: (lang: Language) => void
  isRTL: boolean
  mounted: boolean
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined)

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const defaultLang = (languageSettings.defaultLanguage as Language) || "en"

  // ✅ start with a stable value to match SSR
  const [language, setLanguage] = useState<Language>(defaultLang)
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
    const saved = localStorage.getItem("language") as Language | null
    if (saved === "en" || saved === "ar") {
      setLanguage(saved)
    }
  }, [])

  const isRTL = useMemo(() => language === "ar", [language])

  useEffect(() => {
    if (!mounted) return

    document.documentElement.dir = isRTL ? "rtl" : "ltr"

    if (isRTL) {
      document.documentElement.classList.add("font-cairo")
      document.documentElement.classList.remove("font-inter")
    } else {
      document.documentElement.classList.add("font-inter")
      document.documentElement.classList.remove("font-cairo")
    }

    localStorage.setItem("language", language)
  }, [language, isRTL, mounted])

  return (
    <LanguageContext.Provider value={{ language, setLanguage, isRTL, mounted }}>
      {children}
    </LanguageContext.Provider>
  )
}

export function useLanguage() {
  const context = useContext(LanguageContext)
  if (!context) throw new Error("useLanguage must be used within a LanguageProvider")
  return context
}