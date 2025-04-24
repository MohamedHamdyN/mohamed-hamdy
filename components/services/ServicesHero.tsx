"use client"

import { motion } from "framer-motion"
import { useTranslations } from "@/hooks/useTranslations"
import { Sparkles, ArrowDown } from "lucide-react"

export default function ServicesHero() {
  const t = useTranslations()

  const scrollToServices = () => {
    const servicesSection = document.getElementById("services-grid")
    if (servicesSection) {
      servicesSection.scrollIntoView({ behavior: "smooth" })
    }
  }

  return (
    <section className="relative py-20 overflow-hidden">
      {/* خلفية متدرجة مع تأثيرات */}
      <div className="absolute inset-0 bg-gradient-to-b from-background to-background/50 -z-10">
        <div className="absolute top-20 left-1/4 w-72 h-72 bg-primary/10 rounded-full mix-blend-multiply filter blur-3xl opacity-70"></div>
        <div className="absolute bottom-10 right-1/4 w-72 h-72 bg-secondary/10 rounded-full mix-blend-multiply filter blur-3xl opacity-70"></div>
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="inline-flex items-center gap-2 bg-primary/10 text-primary px-4 py-2 rounded-full mb-6"
          >
            <Sparkles className="h-4 w-4" />
            <span className="text-sm font-medium">{t.services.title}</span>
          </motion.div>

          <motion.h1
            className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-primary via-primary/80 to-secondary"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            {t.services.title}
          </motion.h1>

          <motion.p
            className="text-xl text-muted-foreground mb-10 max-w-2xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            {t.services.description}
          </motion.p>

          <motion.button
            onClick={scrollToServices}
            className="flex items-center justify-center mx-auto bg-primary/10 hover:bg-primary/20 text-primary w-12 h-12 rounded-full transition-colors duration-300"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            whileHover={{ y: 5 }}
            whileTap={{ scale: 0.95 }}
            aria-label="Scroll to services"
          >
            <ArrowDown className="h-5 w-5" />
          </motion.button>
        </div>
      </div>
    </section>
  )
}
