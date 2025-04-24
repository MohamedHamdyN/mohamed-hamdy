"use client"

import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { useState, useEffect, useRef } from "react"
import { BarChartIcon as ChartBar, Database, LineChart, FolderOpen, User } from "lucide-react"
import Link from "next/link"

// Hardcode profile data to avoid import issues
const profile = {
  name: "Mohamed Hamdy",
  resumeUrl: "#",
  logo: "",
}

// Hardcode translations
const translations = {
  hero: {
    greeting: "Hello, I'm",
    title: "Data Analyst",
    title2: "Financial Accountant",
    description: "Transforming complex data into actionable insights that drive business decisions.",
    cta: "View My Work",
  },
  about: {
    title: "About Me",
  },
}

export default function Hero() {
  const [text, setText] = useState("")
  const [isDeleting, setIsDeleting] = useState(false)
  const [loopNum, setLoopNum] = useState(0)
  const [delta, setDelta] = useState(150) // Faster initial typing speed
  const websiteEnabled = true

  const period = 2000 // Wait time after typing
  const nameRef = useRef<HTMLSpanElement>(null)

  // Ensure we have default values for all properties
  const textArray = [
    translations.hero.title || "Data Analyst",
    translations.hero.title2 || "Financial Accountant",
    `${translations.hero.title || "Data Analyst"} & ${translations.hero.title2 || "Financial Accountant"}`,
  ]

  useEffect(() => {
    const ticker = setInterval(() => {
      tick()
    }, delta)

    return () => clearInterval(ticker)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [text, isDeleting, loopNum])

  const tick = () => {
    const i = loopNum % textArray.length
    const fullText = textArray[i]
    const updatedText = isDeleting ? fullText.substring(0, text.length - 1) : fullText.substring(0, text.length + 1)

    setText(updatedText)

    if (isDeleting) {
      setDelta(75) // Faster deleting speed
    } else {
      setDelta(150) // Faster typing speed
    }

    if (!isDeleting && updatedText === fullText) {
      setIsDeleting(true)
      setDelta(period) // Wait before deleting
    } else if (isDeleting && updatedText === "") {
      setIsDeleting(false)
      setLoopNum(loopNum + 1)
      setDelta(150) // Reset to typing speed
    }
  }

  // Button animations
  const buttonVariants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: (custom: number) => ({
      opacity: 1,
      scale: 1,
      transition: {
        delay: custom * 0.3,
        duration: 0.8,
        type: "spring",
        stiffness: 100,
      },
    }),
    hover: {
      scale: 1.05,
      boxShadow: "0px 5px 15px rgba(0, 0, 0, 0.2)",
      transition: {
        type: "spring",
        stiffness: 400,
        damping: 10,
      },
    },
    tap: {
      scale: 0.95,
    },
  }

  return (
    <div className="relative isolate overflow-hidden bg-background">
      {/* Background gradient effect */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute top-0 left-[10%] w-[500px] h-[500px] bg-primary/10 rounded-full filter blur-3xl opacity-30 animate-blob"></div>
        <div className="absolute bottom-0 right-[10%] w-[600px] h-[600px] bg-secondary/10 rounded-full filter blur-3xl opacity-20 animate-blob animation-delay-2000"></div>
      </div>

      <div className="mx-auto max-w-7xl px-6 py-24 sm:py-32 lg:flex lg:items-center lg:gap-x-10 lg:px-8 lg:py-40">
        <div className="mx-auto max-w-2xl lg:mx-0 lg:max-w-xl lg:flex-shrink-0">
          <motion.p
            className="text-base font-semibold leading-7 text-primary"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            {translations.hero.greeting || "Hello, I'm"}
          </motion.p>

          {/* Name with gradient and mask effect */}
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
                {profile.name || "Mohamed Hamdy"}
              </span>
            </motion.h1>
          </div>

          {/* Animated typing effect */}
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
            {translations.hero.description ||
              "I help businesses make data-driven decisions through expert financial analysis and reporting."}
          </motion.p>

          <div className="mt-10 flex items-center gap-x-6">
            <motion.div
              variants={buttonVariants}
              initial="hidden"
              animate="visible"
              whileHover="hover"
              whileTap="tap"
              custom={0}
            >
              <Link href="/projects">
                <Button size="lg" className="relative px-6 py-3 overflow-hidden group bg-primary hover:bg-primary/90">
                  <span className="absolute top-0 left-0 w-0 h-0 transition-all duration-500 border-t-2 border-l-2 border-white group-hover:w-[12px] group-hover:h-[12px]"></span>
                  <span className="absolute bottom-0 right-0 w-0 h-0 transition-all duration-500 border-b-2 border-r-2 border-white group-hover:w-[12px] group-hover:h-[12px]"></span>
                  <span className="absolute top-0 right-0 w-0 h-0 transition-all duration-500 border-t-2 border-r-2 border-white group-hover:w-[12px] group-hover:h-[12px]"></span>
                  <span className="absolute bottom-0 left-0 w-0 h-0 transition-all duration-500 border-b-2 border-l-2 border-white group-hover:w-[12px] group-hover:h-[12px]"></span>
                  <span className="flex items-center gap-2">
                    <FolderOpen className="h-4 w-4" />
                    {translations.hero.cta || "View My Work"}
                  </span>
                </Button>
              </Link>
            </motion.div>

            <motion.div
              variants={buttonVariants}
              initial="hidden"
              animate="visible"
              whileHover="hover"
              whileTap="tap"
              custom={1}
            >
              <Link href="/about">
                <Button
                  variant="outline"
                  size="lg"
                  className="relative px-6 py-2 overflow-hidden group bg-gradient-to-r from-secondary/10 to-primary/10 border-secondary/30 hover:bg-secondary/20"
                >
                  <span className="absolute top-0 left-0 w-0 h-0 transition-all duration-500 border-t-2 border-l-2 border-secondary group-hover:w-[12px] group-hover:h-[12px]"></span>
                  <span className="absolute bottom-0 right-0 w-0 h-0 transition-all duration-500 border-b-2 border-r-2 border-secondary group-hover:w-[12px] group-hover:h-[12px]"></span>
                  <span className="absolute top-0 right-0 w-0 h-0 transition-all duration-500 border-t-2 border-r-2 border-secondary group-hover:w-[12px] group-hover:h-[12px]"></span>
                  <span className="absolute bottom-0 left-0 w-0 h-0 transition-all duration-500 border-b-2 border-l-2 border-secondary group-hover:w-[12px] group-hover:h-[12px]"></span>
                  <span className="flex items-center gap-2">
                    <User className="h-4 w-4" />
                    {translations.about.title || "About Me"}
                  </span>
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
              <div className="absolute top-0 left-0 w-72 h-72 bg-primary/20 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob"></div>
              <div className="absolute top-0 right-0 w-72 h-72 bg-secondary/20 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-2000"></div>
              <div className="absolute bottom-0 left-20 w-72 h-72 bg-accent/20 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-4000"></div>

              <div className="absolute inset-0 flex items-center justify-center">
                <div className="relative w-64 h-64">
                  <motion.div
                    className="absolute top-0 left-0 bg-background/80 border border-border p-4 rounded-lg shadow-lg backdrop-blur-sm"
                    initial={{ x: -50, y: -50, opacity: 0 }}
                    animate={{ x: 0, y: 0, opacity: 1 }}
                    transition={{ duration: 0.5, delay: 0.7, type: "spring" }}
                  >
                    <ChartBar className="h-8 w-8 text-primary mb-2" />
                    <div className="w-32 h-2 bg-primary/30 rounded-full"></div>
                    <div className="w-24 h-2 bg-primary/20 rounded-full mt-2"></div>
                  </motion.div>

                  <motion.div
                    className="absolute bottom-0 left-0 bg-background/80 border border-border p-4 rounded-lg shadow-lg backdrop-blur-sm"
                    initial={{ x: -50, y: 50, opacity: 0 }}
                    animate={{ x: 0, y: 0, opacity: 1 }}
                    transition={{ duration: 0.5, delay: 0.9, type: "spring" }}
                  >
                    <Database className="h-8 w-8 text-secondary mb-2" />
                    <div className="w-32 h-2 bg-secondary/30 rounded-full"></div>
                    <div className="w-24 h-2 bg-secondary/20 rounded-full mt-2"></div>
                  </motion.div>

                  <motion.div
                    className="absolute top-1/2 right-0 transform -translate-y-1/2 bg-background/80 border border-border p-4 rounded-lg shadow-lg backdrop-blur-sm"
                    initial={{ x: 50, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{ duration: 0.5, delay: 0.8, type: "spring" }}
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
