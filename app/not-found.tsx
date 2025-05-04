"use client"

import { motion } from "framer-motion"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Home, FileQuestion } from "lucide-react"
import { useTranslations } from "@/hooks/useTranslations"

export default function NotFound() {
  const t = useTranslations()

  return (
    <div className="min-h-screen flex items-center justify-center bg-background text-foreground p-4">
      <div className="max-w-md w-full text-center">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-8 flex justify-center"
        >
          <div className="relative">
            <div className="absolute inset-0 bg-primary/20 rounded-full blur-xl animate-pulse"></div>
            <div className="relative bg-card border border-border rounded-full p-6">
              <FileQuestion className="h-16 w-16 text-primary" />
            </div>
          </div>
        </motion.div>

        <motion.h1
          className="text-6xl font-bold mb-4 bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
        >
          404
        </motion.h1>

        <motion.h2
          className="text-2xl font-bold mb-4"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          {t.notFound?.title || "Page Not Found"}
        </motion.h2>

        <motion.p
          className="text-muted-foreground mb-8"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
        >
          {t.notFound?.description || "The page you are looking for does not exist or has been moved."}
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
        >
          <Link href="/">
            <Button className="gap-2">
              <Home className="h-4 w-4" />
              {t.notFound?.backHome || "Back to Home"}
            </Button>
          </Link>
        </motion.div>
      </div>
    </div>
  )
}
