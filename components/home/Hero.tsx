"use client"

import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { useProfileSafe } from "@/context/useProfileSafe"
import { useTranslations } from "@/hooks/useTranslations"
import { useLanguage } from "@/context/language-context"
import {
  BarChart3,
  Database,
  LineChart,
  FolderOpen,
  User,
  ArrowRight,
  TrendingUp,
} from "lucide-react"
import Link from "next/link"
import { useState, useEffect, useRef, useCallback, useMemo } from "react"
import { universalSettings } from "@/admin/toggle"

function safeText(v: unknown): string {
  if (v === null || v === undefined) return ""
  const s = String(v).trim()
  if (!s) return ""
  const bad = ["null", "undefined", "0"]
  if (bad.includes(s.toLowerCase())) return ""
  return s
}

function HeroVisual({ easeOut }: { easeOut: readonly [number, number, number, number] }) {
  return (
    <motion.div
      className="mx-auto mt-16 flex max-w-2xl sm:mt-24 lg:ml-10 lg:mr-0 lg:mt-0 lg:max-w-none lg:flex-none xl:ml-24"
      initial={{ opacity: 0, scale: 0.92 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.8, delay: 0.5, ease: easeOut }}
    >
      <div className="relative h-[320px] w-[320px] sm:h-[430px] sm:w-[430px]">
        {/* background glow */}
        <div className="absolute inset-0">
          <div className="absolute top-6 left-8 h-40 w-40 rounded-full bg-primary/20 blur-3xl" />
          <div className="absolute bottom-8 right-8 h-40 w-40 rounded-full bg-secondary/20 blur-3xl" />
          <div className="absolute bottom-16 left-20 h-32 w-32 rounded-full bg-accent/20 blur-3xl" />
        </div>

        {/* Main card */}
        <motion.div
          className="absolute left-1/2 top-1/2 z-20 w-[260px] -translate-x-1/2 -translate-y-1/2 rounded-2xl border border-border/60 bg-background/80 p-5 shadow-2xl backdrop-blur-md"
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.65, ease: easeOut }}
          whileHover={{ y: -4, scale: 1.01 }}
        >
          <div className="mb-4 flex items-center justify-between">
            <div>
              <p className="text-[11px] uppercase tracking-[0.18em] text-muted-foreground">
                Analytics Overview
              </p>
              <h3 className="mt-1 text-lg font-semibold text-foreground">
                Financial Performance
              </h3>
            </div>
            <div className="rounded-xl bg-primary/10 p-2 text-primary">
              <BarChart3 className="h-5 w-5" />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div className="rounded-xl border border-border/50 bg-card/60 p-3">
              <p className="text-[11px] text-muted-foreground">Revenue</p>
              <p className="mt-1 text-lg font-bold text-foreground">$128K</p>
              <div className="mt-2 h-1.5 rounded-full bg-primary/15">
                <motion.div
                  className="h-1.5 rounded-full bg-primary"
                  initial={{ width: 0 }}
                  animate={{ width: "72%" }}
                  transition={{ duration: 0.8, delay: 0.9 }}
                />
              </div>
            </div>

            <div className="rounded-xl border border-border/50 bg-card/60 p-3">
              <p className="text-[11px] text-muted-foreground">Margin</p>
              <p className="mt-1 text-lg font-bold text-foreground">24.8%</p>
              <div className="mt-2 h-1.5 rounded-full bg-secondary/15">
                <motion.div
                  className="h-1.5 rounded-full bg-secondary"
                  initial={{ width: 0 }}
                  animate={{ width: "58%" }}
                  transition={{ duration: 0.8, delay: 1 }}
                />
              </div>
            </div>
          </div>

          <div className="mt-4 rounded-xl border border-border/50 bg-card/60 p-3">
            <div className="mb-2 flex items-center justify-between">
              <p className="text-[11px] text-muted-foreground">Monthly Trend</p>
              <LineChart className="h-4 w-4 text-accent" />
            </div>

            <div className="flex h-16 items-end gap-2">
              {[40, 55, 48, 72, 88, 68].map((height, idx) => (
                <motion.div
                  key={idx}
                  className={`w-5 rounded-t-md ${idx < 5 ? "bg-primary/70" : "bg-secondary/80"
                    }`}
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: `${height}%`, opacity: 1 }}
                  transition={{ duration: 0.45, delay: 1.05 + idx * 0.08 }}
                />
              ))}
            </div>
          </div>
        </motion.div>

        {/* Top right card */}
        <motion.div
          className="absolute right-0 top-8 z-30 w-[180px] rounded-2xl border border-border/60 bg-background/75 p-4 shadow-xl backdrop-blur-md"
          initial={{ x: 30, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 0.45, delay: 0.8, ease: easeOut }}
          whileHover={{ y: -3 }}
        >
          <div className="mb-3 flex items-center gap-2">
            <div className="rounded-lg bg-primary/10 p-2 text-primary">
              <Database className="h-4 w-4" />
            </div>
            <div>
              <p className="text-xs font-medium text-foreground">SQL & Data</p>
              <p className="text-[11px] text-muted-foreground">Clean • Query • Model</p>
            </div>
          </div>

          <div className="space-y-2">
            <div className="h-2 rounded-full bg-primary/20" />
            <div className="h-2 w-[85%] rounded-full bg-primary/15" />
            <div className="h-2 w-[65%] rounded-full bg-primary/10" />
          </div>
        </motion.div>

        {/* Bottom left card */}
        <motion.div
          className="absolute bottom-6 left-0 z-10 w-[190px] rounded-2xl border border-border/60 bg-background/75 p-4 shadow-xl backdrop-blur-md"
          initial={{ x: -30, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 0.45, delay: 0.9, ease: easeOut }}
          whileHover={{ y: -3 }}
        >
          <div className="mb-3 flex items-center gap-2">
            <div className="rounded-lg bg-secondary/10 p-2 text-secondary">
              <TrendingUp className="h-4 w-4" />
            </div>
            <div>
              <p className="text-xs font-medium text-foreground">Reporting</p>
              <p className="text-[11px] text-muted-foreground">Insights • KPIs</p>
            </div>
          </div>

          <div className="grid grid-cols-3 gap-2">
            <div className="rounded-lg bg-secondary/10 p-2 text-center">
              <p className="text-[10px] text-muted-foreground">CTR</p>
              <p className="text-xs font-semibold text-foreground">+12%</p>
            </div>
            <div className="rounded-lg bg-primary/10 p-2 text-center">
              <p className="text-[10px] text-muted-foreground">ROI</p>
              <p className="text-xs font-semibold text-foreground">+18%</p>
            </div>
            <div className="rounded-lg bg-accent/10 p-2 text-center">
              <p className="text-[10px] text-muted-foreground">Cost</p>
              <p className="text-xs font-semibold text-foreground">-9%</p>
            </div>
          </div>
        </motion.div>
      </div>
    </motion.div>
  )
}

export default function Hero() {
  const t = useTranslations()
  const { isRTL } = useLanguage()
  const profile = useProfileSafe()

  const [text, setText] = useState("")
  const [isDeleting, setIsDeleting] = useState(false)
  const [loopNum, setLoopNum] = useState(0)
  const [delta, setDelta] = useState(150)
  const [websiteEnabled, setWebsiteEnabled] = useState(true)
  const [isVisible, setIsVisible] = useState(false)

  const period = 2000
  const nameRef = useRef<HTMLSpanElement>(null)

  const name = safeText(profile?.name) || "Mohamed Hamdy"

  const title1 = safeText((profile as any)?.title) || "Data Analyst"

  const title2 =
    safeText((profile as any)?.shortTitle) ||
    safeText((profile as any)?.short_title) ||
    "Financial Accountant"

  const heroDescription =
    safeText((profile as any)?.heroDescription) ||
    safeText((profile as any)?.hero_description) ||
    "Transforming complex data into actionable insights that drive business decisions."

  const resumeUrl =
    safeText((profile as any)?.resumeUrl) ||
    safeText((profile as any)?.resume_url)

  const logoOrAvatar =
    safeText((profile as any)?.logo) ||
    safeText((profile as any)?.avatar_url)

  useEffect(() => {
    if (logoOrAvatar) {
      const img = new window.Image()
      img.src = logoOrAvatar
    }

    setIsVisible(true)
    setWebsiteEnabled(universalSettings.website)
  }, [logoOrAvatar])

  const textArray = useMemo(() => {
    const arr = [title1, title2, `${title1} & ${title2}`].filter(Boolean)
    return arr.length
      ? arr
      : ["Data Analyst", "Financial Accountant", "Data Analyst & Financial Accountant"]
  }, [title1, title2])

  const tick = useCallback(() => {
    const i = loopNum % textArray.length
    const fullText = textArray[i]
    const updatedText = isDeleting
      ? fullText.substring(0, text.length - 1)
      : fullText.substring(0, text.length + 1)

    setText(updatedText)

    if (isDeleting) setDelta(75)
    else setDelta(150)

    if (!isDeleting && updatedText === fullText) {
      setIsDeleting(true)
      setDelta(period)
    } else if (isDeleting && updatedText === "") {
      setIsDeleting(false)
      setLoopNum((prev) => prev + 1)
      setDelta(150)
    }
  }, [text, isDeleting, loopNum, period, textArray])

  useEffect(() => {
    if (!isVisible) return
    const ticker = setInterval(tick, delta)
    return () => clearInterval(ticker)
  }, [tick, delta, isVisible])

  const easeOut = [0.16, 1, 0.3, 1] as const

  if (!isVisible) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <div className="h-8 w-8 animate-spin rounded-full border-2 border-primary border-t-transparent" />
      </div>
    )
  }

  const mainDescription = websiteEnabled
    ? t?.hero?.description ||
    "I help businesses make data-driven decisions through expert financial analysis and reporting."
    : heroDescription

  const primaryHref = websiteEnabled ? "/projects" : `mailto:${profile?.email ?? "muhamedhamdynour@gmail.com"}`
  const primaryLabel = t?.hero?.cta || "View My Work"
  const secondaryHref = websiteEnabled ? "/about" : resumeUrl || "#"
  const secondaryLabel = t?.about?.title || "About Me"

  return (
    <div className={`relative isolate overflow-hidden ${websiteEnabled ? "bg-background" : "bg-[#020617]"}`}>
      <div className="absolute inset-0 -z-10">
        <div className="absolute top-0 left-[10%] h-[500px] w-[500px] rounded-full bg-primary/10 blur-3xl opacity-30" />
        <div className="absolute bottom-0 right-[10%] h-[600px] w-[600px] rounded-full bg-secondary/10 blur-3xl opacity-20" />
      </div>

      <div className="mx-auto max-w-7xl px-6 py-24 sm:py-32 lg:flex lg:items-center lg:gap-x-10 lg:px-8 lg:py-40">
        <div className="mx-auto max-w-2xl lg:mx-0 lg:max-w-xl lg:flex-shrink-0">
          <motion.p
            className="text-base font-semibold leading-7 text-primary"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: easeOut }}
          >
            {t?.hero?.greeting || "Hello, I'm"}
          </motion.p>

          <div className="overflow-hidden">
            <motion.h1
              className="mt-2 text-4xl font-bold tracking-tight text-foreground sm:text-6xl"
              initial={{ y: 100 }}
              animate={{ y: 0 }}
              transition={{ duration: 0.9, delay: 0.1, type: "spring", stiffness: 90 }}
            >
              <motion.span
                ref={nameRef}
                className="inline-block bg-gradient-to-r from-primary via-blue-400 to-secondary bg-clip-text text-transparent drop-shadow-[0_0_18px_rgba(59,130,246,0.18)]"
                initial={{ opacity: 0.85, scale: 0.98 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.7, delay: 0.2 }}
                whileHover={{ scale: 1.015 }}
              >
                {name}
              </motion.span>
            </motion.h1>
          </div>

          <motion.h2
            className="mt-4 min-h-[40px] text-2xl font-semibold tracking-tight text-primary sm:text-3xl"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2, ease: easeOut }}
          >
            <span className="inline-block">
              {text}
              <span className="animate-blink">|</span>
            </span>
          </motion.h2>

          <motion.p
            className="mt-6 max-w-xl text-lg leading-8 text-muted-foreground"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3, ease: easeOut }}
          >
            {mainDescription}
          </motion.p>

          <motion.div
            className={`mt-10 flex flex-wrap items-center gap-4 ${isRTL ? "lg:justify-start" : ""}`}
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55, delay: 0.38, ease: easeOut }}
          >
            <motion.div whileHover={{ y: -2, scale: 1.02 }} whileTap={{ scale: 0.98 }}>
              {websiteEnabled ? (
                <Link href={primaryHref}>
                  <Button
                    size="lg"
                    className="group min-w-[170px] bg-primary text-primary-foreground shadow-[0_10px_30px_rgba(59,130,246,0.25)] transition-all duration-300 hover:bg-primary/90 hover:shadow-[0_14px_34px_rgba(59,130,246,0.35)]"
                  >
                    <FolderOpen className="mr-2 h-4 w-4 transition-transform duration-300 group-hover:-translate-y-[1px]" />
                    {primaryLabel}
                    <ArrowRight className="ml-2 h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
                  </Button>
                </Link>
              ) : (
                <a href={primaryHref}>
                  <Button
                    size="lg"
                    className="group min-w-[170px] bg-primary text-primary-foreground shadow-[0_10px_30px_rgba(59,130,246,0.25)] transition-all duration-300 hover:bg-primary/90 hover:shadow-[0_14px_34px_rgba(59,130,246,0.35)]"
                  >
                    <FolderOpen className="mr-2 h-4 w-4 transition-transform duration-300 group-hover:-translate-y-[1px]" />
                    {primaryLabel}
                    <ArrowRight className="ml-2 h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
                  </Button>
                </a>
              )}
            </motion.div>

            <motion.div whileHover={{ y: -2, scale: 1.02 }} whileTap={{ scale: 0.98 }}>
              {websiteEnabled ? (
                <Link href={secondaryHref}>
                  <Button
                    variant="outline"
                    size="lg"
                    className="group min-w-[170px] border-border/70 bg-background/40 backdrop-blur-sm transition-all duration-300 hover:border-primary/40 hover:bg-primary/5"
                  >
                    <User className="mr-2 h-4 w-4 transition-transform duration-300 group-hover:scale-105" />
                    {secondaryLabel}
                  </Button>
                </Link>
              ) : (
                <a href={secondaryHref} target="_blank" rel="noopener noreferrer">
                  <Button
                    variant="outline"
                    size="lg"
                    disabled={!resumeUrl}
                    className="group min-w-[170px] border-border/70 bg-background/40 backdrop-blur-sm transition-all duration-300 hover:border-primary/40 hover:bg-primary/5"
                  >
                    <User className="mr-2 h-4 w-4 transition-transform duration-300 group-hover:scale-105" />
                    {secondaryLabel}
                  </Button>
                </a>
              )}
            </motion.div>
          </motion.div>
        </div>

        <HeroVisual easeOut={easeOut} />
      </div>
    </div>
  )
}