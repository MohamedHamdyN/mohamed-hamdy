"use client"
import React, { createContext, useContext } from "react"

type Language = "en"

type Ctx = {
  language: Language
  setLanguage: (l: Language) => void
  isRTL: boolean
  mounted: boolean
}

const LanguageContext = createContext<Ctx>({
  language: "en",
  setLanguage: () => { },
  isRTL: false,
  mounted: true,
})

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  return (
    <LanguageContext.Provider value={{ language: "en", setLanguage: () => { }, isRTL: false, mounted: true }}>
      {children}
    </LanguageContext.Provider>
  )
}

export function useLanguage() {
  return useContext(LanguageContext)
}