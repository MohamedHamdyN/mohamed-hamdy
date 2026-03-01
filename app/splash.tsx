"use client"

import { motion } from "framer-motion"
import { useState, useEffect, useMemo } from "react"
import { useRouter } from "next/navigation"
import Image from "next/image"
import { useProfileSafe } from "@/context/useProfileSafe"

export default function SplashScreen() {
  const router = useRouter()
  const profile = useProfileSafe()

  const [loading, setLoading] = useState(true)
  const [progress, setProgress] = useState(0)

  const name = profile?.name ?? (profile as any)?.full_name ?? "Mohamed Hamdy"
  const title = (profile as any)?.title ?? (profile as any)?.headline ?? ""
  const title2 = (profile as any)?.title2 ?? ""
  const logo = (profile as any)?.logo ?? profile?.logo ?? ""

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval)
          setTimeout(() => {
            setLoading(false)
            setTimeout(() => router.push("/"), 500)
          }, 300)
          return 100
        }
        return prev + 5
      })
    }, 50)

    return () => clearInterval(interval)
  }, [router])

  const subtitle = useMemo(() => {
    if (title && title2) return `${title} & ${title2}`
    return title || title2 || ""
  }, [title, title2])

  return (
    <div className="fixed inset-0 bg-background flex items-center justify-center z-50">
      <div className="relative w-full h-full flex flex-col items-center justify-center">
        <div className="absolute w-[500px] h-[500px] bg-primary/10 rounded-full filter blur-3xl opacity-30" />
        <div className="absolute w-[300px] h-[300px] bg-secondary/20 rounded-full filter blur-xl opacity-20 -translate-x-40 translate-y-20" />
        <div className="absolute w-[400px] h-[400px] bg-primary/5 rounded-full filter blur-2xl opacity-20 translate-x-40 -translate-y-20" />

        <motion.div
          className="flex flex-col items-center relative z-10"
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: loading ? 1 : 1.1, opacity: loading ? 1 : 0 }}
          transition={{
            duration: 0.5,
            scale: { duration: 1.5, ease: "easeInOut" },
            opacity: { duration: 0.8, ease: "easeInOut" },
          }}
        >
          <div className="relative w-32 h-32 mb-6 overflow-hidden">
            {logo ? (
              <Image src={logo} alt={name} fill className="object-contain" unoptimized />
            ) : (
              <div className="w-full h-full flex items-center justify-center text-5xl font-bold text-primary">MH</div>
            )}
          </div>

          <motion.div
            className="text-3xl md:text-4xl font-bold text-foreground"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: loading ? 1 : 0, y: loading ? 0 : -20 }}
            transition={{ delay: 0.3, duration: 0.8 }}
          >
            {name}
          </motion.div>

          {subtitle && (
            <motion.div
              className="text-lg md:text-xl text-muted-foreground mt-2"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: loading ? 1 : 0, y: loading ? 0 : -20 }}
              transition={{ delay: 0.5, duration: 0.8 }}
            >
              {subtitle}
            </motion.div>
          )}
        </motion.div>

        <motion.div
          className="absolute bottom-20 flex flex-col items-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: loading ? 1 : 0 }}
          transition={{ duration: 0.3 }}
        >
          <div className="text-4xl font-bold text-primary mb-2">{progress}%</div>
          <div className="w-64 h-2 bg-muted overflow-hidden rounded-full">
            <motion.div className="h-full bg-primary" initial={{ width: 0 }} animate={{ width: `${progress}%` }} transition={{ duration: 0.1 }} />
          </div>
        </motion.div>
      </div>
    </div>
  )
}