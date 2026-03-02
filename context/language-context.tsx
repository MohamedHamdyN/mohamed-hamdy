"use client"
import React, { createContext, useContext } from "react"

type Language = "en"

const Ctx = createContext({ language: "en" as Language, setLanguage: (_: Language) => { }, isRTL: false, mounted: true })

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  return <Ctx.Provider value={{ language: "en", setLanguage: () => { }, isRTL: false, mounted: true }}>{children}</Ctx.Provider>
}

export function useLanguage() {
  return useContext(Ctx)
}