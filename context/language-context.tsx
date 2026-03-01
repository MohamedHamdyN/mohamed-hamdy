"use client"

import React, { createContext, useContext, useEffect, useMemo, useState } from "react"
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

  const [language, setLanguage] = useState<Language>(defaultLang)
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    const saved = localStorage.getItem("language") as Language | null
    if (saved === "en" || saved === "ar") setLanguage(saved)
    setMounted(true)
  }, [])

  useEffect(() => {
    if (!mounted) return

    document.documentElement.dir = language === "ar" ? "rtl" : "ltr"

    // الأفضل: بلاش تلعب في html classList نهائيًا وقت الهيدرشن
    // خليه على body class داخل layout/client wrapper (هنقولها تحت)
    localStorage.setItem("language", language)
  }, [language, mounted])

  const value = useMemo(
    () => ({ language, setLanguage, isRTL: language === "ar", mounted }),
    [language]
  )

  // ده يمنع mismatch: نفس HTML اللي السيرفر عمله لحد ما العميل يثبت
  if (!mounted) return null

  return <LanguageContext.Provider value={value}>{children}</LanguageContext.Provider>
}

export function useLanguage() {
  const ctx = useContext(LanguageContext)
  if (!ctx) throw new Error("useLanguage must be used within a LanguageProvider")
  return ctx
}