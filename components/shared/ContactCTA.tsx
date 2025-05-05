"use client"

import { motion } from "framer-motion"
import { useTranslations } from "@/hooks/useTranslations"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { ArrowRight } from "lucide-react"

export default function ContactCTA() {
  const t = useTranslations()

  return (
    <section className="py-20 bg-gradient-to-b from-background to-background/50 relative overflow-hidden">
      {/* Background elements */}
      <div className="absolute inset-0 -z-10 overflow-hidden">
        <div className="absolute top-0 left-1/4 w-64 h-64 bg-primary/5 rounded-full filter blur-3xl"></div>
        <div className="absolute bottom-0 right-1/4 w-80 h-80 bg-secondary/5 rounded-full filter blur-3xl"></div>
      </div>

      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto text-center">
          <motion.h2
            className="text-3xl md:text-4xl font-bold mb-6"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            {t.contact.cta.title}
          </motion.h2>

          <motion.p
            className="text-xl text-muted-foreground mb-8"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            {t.contact.cta.description}
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <Link href="/contact">
              <Button
                size="lg"
                className="group relative overflow-hidden rounded-full bg-primary hover:bg-primary/90 text-primary-foreground shadow-lg transition-all duration-300 hover:shadow-primary/25 hover:shadow-xl"
              >
                <span className="relative z-10 flex items-center gap-2">
                  {t.contact.cta.button}
                  <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                </span>
                <span className="absolute inset-0 z-0 bg-gradient-to-r from-primary via-primary/80 to-primary opacity-0 group-hover:opacity-100 transition-opacity duration-500"></span>
              </Button>
            </Link>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
