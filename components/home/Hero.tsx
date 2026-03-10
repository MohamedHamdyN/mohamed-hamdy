"use client"

import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { useProfileSafe } from "@/context/useProfileSafe"
import { useTranslations } from "@/hooks/useTranslations"
import { useLanguage } from "@/context/language-context"
import {
  BarChart3,
  Database,
  FolderOpen,
  User,
  ArrowRight,
  TrendingUp,
  LineChart,
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
      className="mx-auto mt-16 flex max-w-2xl sm:mt-24 lg:ml-10 lg:mr-0 lg:mt-0 lg:max-w-none lg:flex-none xl:ml-20"
      initial={{ opacity: 0, scale: 0.96 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.8, delay: 0.45, ease: easeOut }}
    >
      <div className="relative h-[320px] w-[320px] sm:h-[430px] sm:w-[430px]">
        {/* soft background glow */}
        <div className="absolute inset-0">
          <div className="absolute top-10 left-10 h-32 w-32 rounded-full bg-primary/12 blur-3xl" />
          <div className="absolute bottom-10 right-10 h-36 w-36 rounded-full bg-secondary/10 blur-3xl" />
        </div>

        {/* main premium card */}
        <motion.div
          className="absolute right-0 top-1/2 z-20 w-[285px] -translate-y-1/2 rounded-[24px] border border-white/8 bg-background/70 p-5 shadow-[0_20px_60px_rgba(0,0,0,0.30)] backdrop-blur-xl sm:w-[320px] sm:p-6"
          initial={{ y: 18, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.55, delay: 0.65, ease: easeOut }}
          whileHover={{ y: -4 }}
        >
          <div className="mb-5 flex items-start justify-between">
            <div>
              <p className="text-[11px] uppercase tracking-[0.22em] text-muted-foreground/90">
                Performance Snapshot
              </p>
              <h3 className="mt-2 text-xl font-semibold text-foreground">
                Finance + Analytics
              </h3>
              <p className="mt-1 text-xs text-muted-foreground">
                Reporting, KPI tracking, and business insights
              </p>
            </div>

            <div className="rounded-2xl border border-primary/15 bg-primary/10 p-2.5 text-primary">
              <BarChart3 className="h-5 w-5" />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div className="rounded-2xl border border-white/8 bg-white/[0.03] p-4">
              <p className="text-[11px] text-muted-foreground">Revenue</p>
              <p className="mt-2 text-2xl font-semibold text-foreground">$128K</p>
              <div className="mt-3 h-1.5 rounded-full bg-primary/10">
                <motion.div
                  className="h-1.5 rounded-full bg-primary"
                  initial={{ width: 0 }}
                  animate={{ width: "74%" }}
                  transition={{ duration: 0.8, delay: 0.95 }}
                />
              </div>
            </div>

            <div className="rounded-2xl border border-white/8 bg-white/[0.03] p-4">
              <p className="text-[11px] text-muted-foreground">Margin</p>
              <p className="mt-2 text-2xl font-semibold text-foreground">24.8%</p>
              <div className="mt-3 h-1.5 rounded-full bg-secondary/10">
                <motion.div
                  className="h-1.5 rounded-full bg-secondary"
                  initial={{ width: 0 }}
                  animate={{ width: "58%" }}
                  transition={{ duration: 0.8, delay: 1.05 }}
                />
              </div>
            </div>
          </div>

          <div className="mt-5 rounded-2xl border border-white/8 bg-white/[0.03] p-4">
            <div className="mb-3 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <LineChart className="h-4 w-4 text-primary" />
                <p className="text-sm font-medium text-foreground">Monthly Trend</p>
              </div>
              <span className="text-[11px] text-muted-foreground">Last 6 months</span>
            </div>

            <div className="flex h-24 items-end gap-2">
              {[38, 50, 46, 64, 78, 60].map((height, idx) => (
                <motion.div
                  key={idx}
                  className={`flex-1 rounded-t-xl ${idx === 4
                      ? "bg-primary"
                      : idx === 5
                        ? "bg-secondary/85"
                        : "bg-primary/65"
                    }`}
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: `${height}%`, opacity: 1 }}
                  transition={{ duration: 0.45, delay: 1.1 + idx * 0.07 }}
                />
              ))}
            </div>
          </div>
        </motion.div>

        {/* floating mini card */}
        <motion.div
          className="absolute left-0 top-8 z-30 w-[180px] rounded-[22px] border border-white/8 bg-background/65 p-4 shadow-[0_16px_40px_rgba(0,0,0,0.26)] backdrop-blur-xl sm:w-[195px]"
          initial={{ x: -24, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.82, ease: easeOut }}
          whileHover={{ y: -3 }}
        >
          <div className="mb-3 flex items-center gap-2">
            <div className="rounded-xl border border-primary/15 bg-primary/10 p-2 text-primary">
              <Database className="h-4 w-4" />
            </div>
            <div>
              <p className="text-sm font-medium text-foreground">SQL & Data</p>
              <p className="text-[11px] text-muted-foreground">Clean • Query • Model</p>
            </div>
          </div>

          <div className="space-y-2.5">
            <div className="h-2 rounded-full bg-primary/18" />
            <div className="h-2 w-[86%] rounded-full bg-primary/14" />
            <div className="h-2 w-[68%] rounded-full bg-primary/10" />
          </div>

          <div className="mt-4 flex items-center gap-2 rounded-xl border border-white/8 bg-white/[0.03] px-3 py-2">
            <TrendingUp className="h-3.5 w-3.5 text-secondary" />
            <span className="text-[11px] text-muted-foreground">Insight-driven workflow</span>
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

    if (isDeleting) setDelta(70)
    else setDelta(145)

    if (!isDeleting && updatedText === fullText) {
      setIsDeleting(true)
      setDelta(period)
    } else if (isDeleting && updatedText === "") {
      setIsDeleting(false)
      setLoopNum((prev) => prev + 1)
      setDelta(145)
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
      <div className="flex min-h-screen items-center justify-center bg-background">
        <div className="h-8 w-8 animate-spin rounded-full border-2 border-primary border-t-transparent" />
      </div>
    )
  }

  const mainDescription = websiteEnabled
    ? t?.hero?.description ||
    "I help businesses make data-driven decisions through expert financial analysis and reporting."
    : heroDescription

  const primaryHref = websiteEnabled
    ? "/projects"
    : `mailto:${profile?.email ?? "muhamedhamdynour@gmail.com"}`

  const primaryLabel = websiteEnabled
    ? t?.hero?.cta || "View My Work"
    : "Contact Me"

  const secondaryHref = websiteEnabled ? "/about" : resumeUrl || "#"
  const secondaryLabel = t?.about?.title || "About Me"

  return (
    <div className={`relative isolate overflow-hidden ${websiteEnabled ? "bg-background" : "bg-[#020617]"}`}>
      <div className="absolute inset-0 -z-10">
        <div className="absolute left-[10%] top-0 h-[500px] w-[500px] rounded-full bg-primary/8 blur-3xl opacity-30" />
        <div className="absolute bottom-0 right-[10%] h-[560px] w-[560px] rounded-full bg-secondary/8 blur-3xl opacity-20" />
      </div>

      <div className="mx-auto max-w-7xl px-6 py-24 sm:py-32 lg:flex lg:items-center lg:gap-x-10 lg:px-8 lg:py-40">
        <div className="mx-auto max-w-2xl lg:mx-0 lg:max-w-xl lg:flex-shrink-0">
          <motion.p
            className="text-base font-semibold leading-7 text-primary"
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.45, ease: easeOut }}
          >
            {t?.hero?.greeting || "Hello, I'm"}
          </motion.p>

          <div className="overflow-hidden">
            <motion.h1
              className="mt-2 text-4xl font-bold tracking-tight text-foreground sm:text-6xl"
              initial={{ y: 100 }}
              animate={{ y: 0 }}
              transition={{ duration: 0.9, delay: 0.08, type: "spring", stiffness: 88 }}
            >
              <motion.span
                ref={nameRef}
                className="inline-block bg-gradient-to-r from-[#4f8cff] via-[#76a9ff] to-[#8bb8ff] bg-clip-text text-transparent [text-shadow:0_0_24px_rgba(79,140,255,0.08)]"
                initial={{ opacity: 0.88, scale: 0.985 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.75, delay: 0.18 }}
                whileHover={{ scale: 1.01 }}
              >
                {name}
              </motion.span>
            </motion.h1>
          </div>

          <motion.h2
            className="mt-4 min-h-[40px] text-2xl font-semibold tracking-tight text-primary sm:text-3xl"
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.45, delay: 0.18, ease: easeOut }}
          >
            <span className="inline-block">
              {text}
              <span className="animate-blink">|</span>
            </span>
          </motion.h2>

          <motion.p
            className="mt-6 max-w-xl text-lg leading-8 text-muted-foreground"
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.45, delay: 0.28, ease: easeOut }}
          >
            {mainDescription}
          </motion.p>

          <motion.div
            className={`mt-10 flex flex-wrap items-center gap-4 ${isRTL ? "lg:justify-start" : ""}`}
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.36, ease: easeOut }}
          >
            <motion.div whileHover={{ y: -2, scale: 1.015 }} whileTap={{ scale: 0.985 }}>
              {websiteEnabled ? (
                <Link href={primaryHref}>
                  <Button
                    size="lg"
                    className="group min-w-[180px] rounded-xl bg-primary text-primary-foreground shadow-[0_12px_34px_rgba(59,130,246,0.22)] transition-all duration-300 hover:bg-primary/90 hover:shadow-[0_16px_40px_rgba(59,130,246,0.30)]"
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
                    className="group min-w-[180px] rounded-xl bg-primary text-primary-foreground shadow-[0_12px_34px_rgba(59,130,246,0.22)] transition-all duration-300 hover:bg-primary/90 hover:shadow-[0_16px_40px_rgba(59,130,246,0.30)]"
                  >
                    <FolderOpen className="mr-2 h-4 w-4 transition-transform duration-300 group-hover:-translate-y-[1px]" />
                    {primaryLabel}
                    <ArrowRight className="ml-2 h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
                  </Button>
                </a>
              )}
            </motion.div>

            <motion.div whileHover={{ y: -2, scale: 1.015 }} whileTap={{ scale: 0.985 }}>
              {websiteEnabled ? (
                <Link href={secondaryHref}>
                  <Button
                    variant="outline"
                    size="lg"
                    className="group min-w-[170px] rounded-xl border-white/10 bg-white/[0.02] text-foreground backdrop-blur-sm transition-all duration-300 hover:border-primary/25 hover:bg-primary/[0.04]"
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
                    className="group min-w-[170px] rounded-xl border-white/10 bg-white/[0.02] text-foreground backdrop-blur-sm transition-all duration-300 hover:border-primary/25 hover:bg-primary/[0.04]"
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