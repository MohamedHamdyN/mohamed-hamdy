"use client"

import type React from "react"
import { createContext, useContext, useState, useEffect } from "react"
import { languageSettings } from "@/admin/profile"

type Language = "en" | "ar"

interface LanguageContextType {
  language: Language
  setLanguage: (lang: Language) => void
  isRTL: boolean
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined)

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [language, setLanguage] = useState<Language>((languageSettings.defaultLanguage as Language) || "en")
  const [isRTL, setIsRTL] = useState<boolean>(false)

  useEffect(() => {
    // Check if there's a saved language preference
    const savedLanguage = localStorage.getItem("language") as Language
    if (savedLanguage) {
      setLanguage(savedLanguage)
    }
  }, [])

  useEffect(() => {
    // Update RTL state based on language
    setIsRTL(language === "ar")

    // Update HTML dir attribute
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
  }, [language])

  return <LanguageContext.Provider value={{ language, setLanguage, isRTL }}>{children}</LanguageContext.Provider>
}

export function useLanguage() {
  const context = useContext(LanguageContext)
  if (context === undefined) {
    throw new Error("useLanguage must be used within a LanguageProvider")
  }
  return context
}
