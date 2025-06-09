"use client"

import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { profile } from "@/admin/profile"
import { useTranslations } from "@/hooks/useTranslations"
import { useLanguage } from "@/context/language-context"
import { BarChartIcon as ChartBar, Database, LineChart, FolderOpen, User } from "lucide-react"
import Link from "next/link"
import { useState, useEffect, useRef, useCallback } from "react"
import { clientSettings } from "@/admin/toggle"
import Head from "next/head"

export default function Hero() {
  const t = useTranslations()
  const { isRTL } = useLanguage()
  const [text, setText] = useState("")
  const [isDeleting, setIsDeleting] = useState(false)
  const [loopNum, setLoopNum] = useState(0)
  const [delta, setDelta] = useState(150)
  const [websiteEnabled, setWebsiteEnabled] = useState(true)
  const [isVisible, setIsVisible] = useState(false)

  const period = 2000
  const nameRef = useRef<HTMLSpanElement>(null)

  // Preload critical resources
  useEffect(() => {
    // Preload critical images
    if (profile.logo) {
      const img = new Image()
      img.src = profile.logo
    }

    // Set visibility after mount to prevent hydration issues
    setIsVisible(true)
    setWebsiteEnabled(clientSettings.website)
  }, [])

  const textArray = [
    t?.hero?.title || "Data Analyst",
    t?.hero?.title2 || "Financial Accountant",
    `${t?.hero?.title || "Data Analyst"} & ${t?.hero?.title2 || "Financial Accountant"}`,
  ]

  const tick = useCallback(() => {
    const i = loopNum % textArray.length
    const fullText = textArray[i]
    const updatedText = isDeleting ? fullText.substring(0, text.length - 1) : fullText.substring(0, text.length + 1)

    setText(updatedText)

    if (isDeleting) {
      setDelta(75)
    } else {
      setDelta(150)
    }

    if (!isDeleting && updatedText === fullText) {
      setIsDeleting(true)
      setDelta(period)
    } else if (isDeleting && updatedText === "") {
      setIsDeleting(false)
      setLoopNum(loopNum + 1)
      setDelta(150)
    }
  }, [text, isDeleting, loopNum, period])

  useEffect(() => {
    if (!isVisible) return

    const ticker = setInterval(tick, delta)
    return () => clearInterval(ticker)
  }, [tick, delta, isVisible])

  // Optimized button variants with reduced complexity
  const buttonVariants = {
    hidden: { opacity: 0, scale: 0.9 },
    visible: (custom: number) => ({
      opacity: 1,
      scale: 1,
      transition: {
        delay: custom * 0.2,
        duration: 0.6,
        ease: "easeOut",
      },
    }),
    hover: {
      scale: 1.02,
      transition: {
        duration: 0.2,
        ease: "easeInOut",
      },
    },
  }

  if (!isVisible) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <div className="w-8 h-8 border-2 border-primary border-t-transparent rounded-full animate-spin" />
      </div>
    )
  }

  if (!websiteEnabled) {
    return (
      <div className="relative isolate overflow-hidden bg-[#020617] min-h-screen flex items-center">
        <Head>
          <link rel="preload" href={profile.logo} as="image" />
        </Head>

        <div className="absolute inset-0 -z-10">
          <div className="absolute top-0 left-[10%] w-[500px] h-[500px] bg-primary/10 rounded-full filter blur-3xl opacity-30"></div>
          <div className="absolute bottom-0 right-[10%] w-[600px] h-[600px] bg-secondary/10 rounded-full filter blur-3xl opacity-20"></div>
        </div>

        <div className="mx-auto max-w-7xl px-6 py-24 sm:py-32 lg:flex lg:items-center lg:gap-x-10 lg:px-8 lg:py-40">
          <div className="mx-auto max-w-2xl lg:mx-0 lg:max-w-xl lg:flex-shrink-0">
            <motion.p
              className="text-base font-semibold leading-7 text-primary"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              {t?.hero?.greeting || "Hello, I'm"}
            </motion.p>

            <div className="overflow-hidden">
              <motion.h1
                className="mt-2 text-4xl font-bold tracking-tight text-foreground sm:text-6xl"
                initial={{ y: 100 }}
                animate={{ y: 0 }}
                transition={{ duration: 0.8, delay: 0.1, type: "spring", stiffness: 100 }}
              >
                <span
                  ref={nameRef}
                  className="inline-block bg-clip-text text-transparent bg-gradient-to-r from-primary via-blue-400 to-secondary"
                >
                  {profile?.name || "Mohamed Hamdy"}
                </span>
              </motion.h1>
            </div>

            <motion.h2
              className="mt-4 text-2xl font-semibold tracking-tight sm:text-3xl min-h-[40px] text-primary"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <span className="inline-block">
                {text}
                <span className="animate-blink">|</span>
              </span>
            </motion.h2>

            <motion.p
              className="mt-6 text-lg leading-8 text-muted-foreground"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
            >
              {t?.hero?.description ||
                "Transforming complex data into actionable insights that drive business decisions."}
            </motion.p>

            <div className="mt-10 flex items-center gap-x-6">
              <motion.div variants={buttonVariants} initial="hidden" animate="visible" whileHover="hover" custom={0}>
                <a href="mailto:muhamedhamdynour@gmail.com">
                  <Button size="lg" className="bg-primary hover:bg-primary/90">
                    <FolderOpen className="h-4 w-4 mr-2" />
                    {t?.hero?.cta || "View My Work"}
                  </Button>
                </a>
              </motion.div>

              <motion.div variants={buttonVariants} initial="hidden" animate="visible" whileHover="hover" custom={1}>
                <a href={profile.resumeUrl} target="_blank" rel="noopener noreferrer">
                  <Button variant="outline" size="lg">
                    <User className="h-4 w-4 mr-2" />
                    {t?.about?.title || "About Me"}
                  </Button>
                </a>
              </motion.div>
            </div>
          </div>

          <motion.div
            className="mx-auto mt-16 flex max-w-2xl sm:mt-24 lg:ml-10 lg:mr-0 lg:mt-0 lg:max-w-none lg:flex-none xl:ml-32"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.5 }}
          >
            <div className="max-w-3xl flex-none sm:max-w-5xl lg:max-w-none">
              <div className="relative h-[300px] w-[300px] sm:h-[400px] sm:w-[400px]">
                <div className="absolute top-0 left-0 w-72 h-72 bg-primary/20 rounded-full mix-blend-multiply filter blur-xl opacity-70"></div>
                <div className="absolute top-0 right-0 w-72 h-72 bg-secondary/20 rounded-full mix-blend-multiply filter blur-xl opacity-70"></div>
                <div className="absolute bottom-0 left-20 w-72 h-72 bg-accent/20 rounded-full mix-blend-multiply filter blur-xl opacity-70"></div>

                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="relative w-64 h-64">
                    <motion.div
                      className="absolute top-0 left-0 bg-background/80 border border-border p-4 rounded-lg shadow-lg backdrop-blur-sm"
                      initial={{ x: -50, y: -50, opacity: 0 }}
                      animate={{ x: 0, y: 0, opacity: 1 }}
                      transition={{ duration: 0.5, delay: 0.7 }}
                    >
                      <ChartBar className="h-8 w-8 text-primary mb-2" />
                      <div className="w-32 h-2 bg-primary/30 rounded-full"></div>
                      <div className="w-24 h-2 bg-primary/20 rounded-full mt-2"></div>
                    </motion.div>

                    <motion.div
                      className="absolute bottom-0 left-0 bg-background/80 border border-border p-4 rounded-lg shadow-lg backdrop-blur-sm"
                      initial={{ x: -50, y: 50, opacity: 0 }}
                      animate={{ x: 0, y: 0, opacity: 1 }}
                      transition={{ duration: 0.5, delay: 0.9 }}
                    >
                      <Database className="h-8 w-8 text-secondary mb-2" />
                      <div className="w-32 h-2 bg-secondary/30 rounded-full"></div>
                      <div className="w-24 h-2 bg-secondary/20 rounded-full mt-2"></div>
                    </motion.div>

                    <motion.div
                      className="absolute top-1/2 right-0 transform -translate-y-1/2 bg-background/80 border border-border p-4 rounded-lg shadow-lg backdrop-blur-sm"
                      initial={{ x: 50, opacity: 0 }}
                      animate={{ x: 0, opacity: 1 }}
                      transition={{ duration: 0.5, delay: 0.8 }}
                    >
                      <LineChart className="h-8 w-8 text-accent mb-2" />
                      <div className="w-32 h-2 bg-accent/30 rounded-full"></div>
                      <div className="w-24 h-2 bg-accent/20 rounded-full mt-2"></div>
                    </motion.div>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    )
  }

  return (
    <div className="relative isolate overflow-hidden bg-background">
      <Head>
        <link rel="preload" href={profile.logo} as="image" />
        <link rel="dns-prefetch" href="//fonts.googleapis.com" />
      </Head>

      <div className="absolute inset-0 -z-10">
        <div className="absolute top-0 left-[10%] w-[500px] h-[500px] bg-primary/10 rounded-full filter blur-3xl opacity-30"></div>
        <div className="absolute bottom-0 right-[10%] w-[600px] h-[600px] bg-secondary/10 rounded-full filter blur-3xl opacity-20"></div>
      </div>

      <div className="mx-auto max-w-7xl px-6 py-24 sm:py-32 lg:flex lg:items-center lg:gap-x-10 lg:px-8 lg:py-40">
        <div className="mx-auto max-w-2xl lg:mx-0 lg:max-w-xl lg:flex-shrink-0">
          <motion.p
            className="text-base font-semibold leading-7 text-primary"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            {t?.hero?.greeting || "Hello, I'm"}
          </motion.p>

          <div className="overflow-hidden">
            <motion.h1
              className="mt-2 text-4xl font-bold tracking-tight text-foreground sm:text-6xl"
              initial={{ y: 100 }}
              animate={{ y: 0 }}
              transition={{ duration: 0.8, delay: 0.1, type: "spring", stiffness: 100 }}
            >
              <span
                ref={nameRef}
                className="inline-block bg-clip-text text-transparent bg-gradient-to-r from-primary via-blue-400 to-secondary"
              >
                {profile?.name || "Mohamed Hamdy"}
              </span>
            </motion.h1>
          </div>

          <motion.h2
            className="mt-4 text-2xl font-semibold tracking-tight sm:text-3xl min-h-[40px] text-primary"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <span className="inline-block">
              {text}
              <span className="animate-blink">|</span>
            </span>
          </motion.h2>

          <motion.p
            className="mt-6 text-lg leading-8 text-muted-foreground"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            {t?.hero?.description ||
              "I help businesses make data-driven decisions through expert financial analysis and reporting."}
          </motion.p>

          <div className="mt-10 flex items-center gap-x-6">
            <motion.div variants={buttonVariants} initial="hidden" animate="visible" whileHover="hover" custom={0}>
              <Link href="/projects">
                <Button size="lg" className="bg-primary hover:bg-primary/90">
                  <FolderOpen className="h-4 w-4 mr-2" />
                  {t?.hero?.cta || "View My Work"}
                </Button>
              </Link>
            </motion.div>

            <motion.div variants={buttonVariants} initial="hidden" animate="visible" whileHover="hover" custom={1}>
              <Link href="/about">
                <Button variant="outline" size="lg">
                  <User className="h-4 w-4 mr-2" />
                  {t?.about?.title || "About Me"}
                </Button>
              </Link>
            </motion.div>
          </div>
        </div>

        <motion.div
          className="mx-auto mt-16 flex max-w-2xl sm:mt-24 lg:ml-10 lg:mr-0 lg:mt-0 lg:max-w-none lg:flex-none xl:ml-32"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.5 }}
        >
          <div className="max-w-3xl flex-none sm:max-w-5xl lg:max-w-none">
            <div className="relative h-[300px] w-[300px] sm:h-[400px] sm:w-[400px]">
              <div className="absolute top-0 left-0 w-72 h-72 bg-primary/20 rounded-full mix-blend-multiply filter blur-xl opacity-70"></div>
              <div className="absolute top-0 right-0 w-72 h-72 bg-secondary/20 rounded-full mix-blend-multiply filter blur-xl opacity-70"></div>
              <div className="absolute bottom-0 left-20 w-72 h-72 bg-accent/20 rounded-full mix-blend-multiply filter blur-xl opacity-70"></div>

              <div className="absolute inset-0 flex items-center justify-center">
                <div className="relative w-64 h-64">
                  <motion.div
                    className="absolute top-0 left-0 bg-background/80 border border-border p-4 rounded-lg shadow-lg backdrop-blur-sm"
                    initial={{ x: -50, y: -50, opacity: 0 }}
                    animate={{ x: 0, y: 0, opacity: 1 }}
                    transition={{ duration: 0.5, delay: 0.7 }}
                  >
                    <ChartBar className="h-8 w-8 text-primary mb-2" />
                    <div className="w-32 h-2 bg-primary/30 rounded-full"></div>
                    <div className="w-24 h-2 bg-primary/20 rounded-full mt-2"></div>
                  </motion.div>

                  <motion.div
                    className="absolute bottom-0 left-0 bg-background/80 border border-border p-4 rounded-lg shadow-lg backdrop-blur-sm"
                    initial={{ x: -50, y: 50, opacity: 0 }}
                    animate={{ x: 0, y: 0, opacity: 1 }}
                    transition={{ duration: 0.5, delay: 0.9 }}
                  >
                    <Database className="h-8 w-8 text-secondary mb-2" />
                    <div className="w-32 h-2 bg-secondary/30 rounded-full"></div>
                    <div className="w-24 h-2 bg-secondary/20 rounded-full mt-2"></div>
                  </motion.div>

                  <motion.div
                    className="absolute top-1/2 right-0 transform -translate-y-1/2 bg-background/80 border border-border p-4 rounded-lg shadow-lg backdrop-blur-sm"
                    initial={{ x: 50, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{ duration: 0.5, delay: 0.8 }}
                  >
                    <LineChart className="h-8 w-8 text-accent mb-2" />
                    <div className="w-32 h-2 bg-accent/30 rounded-full"></div>
                    <div className="w-24 h-2 bg-accent/20 rounded-full mt-2"></div>
                  </motion.div>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  )
}
