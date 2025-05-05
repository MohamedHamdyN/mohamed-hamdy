"use client"

import { createContext, useContext, useState, useEffect, type ReactNode } from "react"
import { getCurrentLanguage, setLanguage as setLang, type Language } from "@/lib/language-utils"

interface LanguageContextProps {
  language: Language
  setLanguage: (language: Language) => void
  isRTL: boolean
}

// إنشاء سياق اللغة مع قيم افتراضية لتجنب الأخطاء
const LanguageContext = createContext<LanguageContextProps>({
  language: "en",
  setLanguage: () => {},
  isRTL: false,
})

interface LanguageProviderProps {
  children: ReactNode
}

export function LanguageProvider({ children }: LanguageProviderProps) {
  const defaultLang = getCurrentLanguage()
  const [language, setLangState] = useState<Language>(defaultLang)
  const [isRTL, setIsRTL] = useState(defaultLang === "ar")

  useEffect(() => {
    // تحديث الحالة عند تحميل المكون
    const currentLang = getCurrentLanguage()
    setLangState(currentLang)
    setIsRTL(currentLang === "ar")

    // الاستماع لأحداث التخزين (في حالة تغيير اللغة في علامة تبويب أخرى)
    const handleStorageChange = () => {
      const newLang = getCurrentLanguage()
      setLangState(newLang)
      setIsRTL(newLang === "ar")
    }

    window.addEventListener("storage", handleStorageChange)
    return () => window.removeEventListener("storage", handleStorageChange)
  }, [])

  // غلاف آمن لـ setLanguage
  const setLanguage = (newLang: Language) => {
    try {
      setLang(newLang)
      setLangState(newLang)
      setIsRTL(newLang === "ar")
    } catch (error) {
      console.error("Error setting language:", error)
    }
  }

  return <LanguageContext.Provider value={{ language, setLanguage, isRTL }}>{children}</LanguageContext.Provider>
}

export function useLanguage() {
  const context = useContext(LanguageContext)
  return context
}
