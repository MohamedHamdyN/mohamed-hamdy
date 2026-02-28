"use client"

import { motion } from "framer-motion"
import { useTranslations } from "@/hooks/useTranslations"
import { Award, ExternalLink, Calendar } from "lucide-react"
import { Button } from "@/components/ui/button"

type CertificationItem = {
  id: number
  title: string
  issuer: string
  date?: string
  issue_date?: string | null
  description?: string | null
  credentialUrl?: string | null
  credential_url?: string | null
  enabled?: boolean
}

export default function Certifications({ items }: { items: CertificationItem[] }) {
  const t = useTranslations()

  const enabledItems = (items ?? []).filter((x) => x.enabled !== false)
  if (enabledItems.length === 0) return null

  return (
    <section className="py-20 bg-gradient-to-b from-background/50 to-background relative overflow-hidden">
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
          {enabledItems.map((cert, index) => {
            const date = cert.date ?? (cert.issue_date ? String(cert.issue_date).slice(0, 4) : "")
            const url = cert.credentialUrl ?? cert.credential_url ?? null

            return (
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
                  {date ? (
                    <div className="flex items-center bg-primary/10 text-primary px-3 py-1 rounded-full text-sm">
                      <Calendar className="h-3 w-3 mr-1" />
                      <span>{date}</span>
                    </div>
                  ) : null}
                </div>

                {cert.description ? <p className="text-muted-foreground mb-4">{cert.description}</p> : null}

                {url ? (
                  <Button
                    variant="outline"
                    size="sm"
                    className="flex items-center gap-2 hover:bg-primary/10"
                    onClick={() => window.open(url, "_blank", "noopener,noreferrer")}
                  >
                    <span>View Credential</span>
                    <ExternalLink className="h-3 w-3" />
                  </Button>
                ) : null}
              </motion.div>
            )
          })}
        </div>
      </div>
    </section>
  )
}