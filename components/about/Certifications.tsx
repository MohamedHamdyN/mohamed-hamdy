"use client"

import { useEffect, useState } from "react"
import { motion } from "framer-motion"
import { certificationsService } from "@/lib/database"
import { useTranslations } from "@/hooks/useTranslations"
import { Award, ExternalLink, Calendar } from "lucide-react"
import { Button } from "@/components/ui/button"
import type { Certification } from "@/lib/supabase"

export default function Certifications() {
  const [certifications, setCertifications] = useState<Certification[]>([])
  const [loading, setLoading] = useState(true)
  const t = useTranslations()

  useEffect(() => {
    async function fetchCertifications() {
      try {
        const data = await certificationsService.getEnabledCertifications()
        setCertifications(data)
      } catch (error) {
        console.error("Error fetching certifications:", error)
      } finally {
        setLoading(false)
      }
    }

    fetchCertifications()
  }, [])

  if (loading) {
    return (
      <section className="py-20 bg-gradient-to-b from-background/50 to-background relative overflow-hidden">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <div className="h-8 bg-muted animate-pulse rounded mb-4 max-w-md mx-auto"></div>
            <div className="h-4 bg-muted animate-pulse rounded max-w-lg mx-auto"></div>
          </div>
          <div className="grid md:grid-cols-2 gap-6 max-w-4xl mx-auto">
            {[...Array(4)].map((_, i) => (
              <div key={i} className="bg-card border border-border rounded-xl p-6">
                <div className="flex justify-between items-start mb-4">
                  <div className="flex-1">
                    <div className="h-6 bg-muted animate-pulse rounded mb-2"></div>
                    <div className="h-4 bg-muted animate-pulse rounded w-2/3"></div>
                  </div>
                  <div className="h-6 w-20 bg-muted animate-pulse rounded-full"></div>
                </div>
                <div className="h-4 bg-muted animate-pulse rounded mb-4 w-full"></div>
                <div className="h-8 w-32 bg-muted animate-pulse rounded"></div>
              </div>
            ))}
          </div>
        </div>
      </section>
    )
  }

  // If no enabled certifications, don't show the section
  if (certifications.length === 0) {
    return null
  }

  return (
    <section className="py-20 bg-gradient-to-b from-background/50 to-background relative overflow-hidden">
      {/* Background elements */}
      <div className="absolute inset-0 -z-10 overflow-hidden">
        <div className="absolute top-1/4 right-1/4 w-64 h-64 bg-primary/5 rounded-full filter blur-3xl"></div>
        <div className="absolute bottom-1/4 left-1/4 w-80 h-80 bg-secondary/5 rounded-full filter blur-3xl"></div>
      </div>

      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-12"
        >
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="inline-flex items-center gap-2 bg-primary/10 text-primary px-4 py-2 rounded-full mb-6"
          >
            <Award className="h-4 w-4" />
            <span className="text-sm font-medium">Certifications</span>
          </motion.div>

          <motion.h2
            className="text-3xl md:text-4xl font-bold mb-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            Professional Certifications
          </motion.h2>

          <motion.p
            className="text-muted-foreground max-w-2xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            Credentials that validate my expertise and commitment to continuous learning
          </motion.p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-6 max-w-4xl mx-auto">
          {certifications.map((cert, index) => (
            <motion.div
              key={cert.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4 + index * 0.1 }}
              className="bg-card border border-border rounded-xl p-6 hover:shadow-lg hover:border-primary/30 transition-all duration-300"
            >
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h3 className="text-xl font-bold text-primary">{cert.title}</h3>
                  <p className="text-muted-foreground">{cert.issuer}</p>
                </div>
                <div className="flex items-center bg-primary/10 text-primary px-3 py-1 rounded-full text-sm">
                  <Calendar className="h-3 w-3 mr-1" />
                  <span>{cert.date}</span>
                </div>
              </div>

              <p className="text-muted-foreground mb-4">{cert.description}</p>

              {cert.credential_url && (
                <Button
                  variant="outline"
                  size="sm"
                  className="flex items-center gap-2 hover:bg-primary/10 bg-transparent"
                  onClick={() => window.open(cert.credential_url, "_blank", "noopener,noreferrer")}
                >
                  <span>View Credential</span>
                  <ExternalLink className="h-3 w-3" />
                </Button>
              )}
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
