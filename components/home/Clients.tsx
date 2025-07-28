"use client"

import { useEffect, useState, useRef } from "react"
import { motion, useScroll, useTransform } from "framer-motion"
import { clientsService } from "@/lib/database"
import { useTranslations } from "@/hooks/useTranslations"
import { useLanguage } from "@/context/language-context"
import Image from "next/image"
import { Star, ExternalLink, FileCode } from "lucide-react"
import { Button } from "@/components/ui/button"
import type { Client } from "@/lib/supabase"

export default function Clients() {
  const [clients, setClients] = useState<Client[]>([])
  const [loading, setLoading] = useState(true)
  const t = useTranslations()
  const { isRTL } = useLanguage()
  const containerRef = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  })

  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0])
  const y = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [100, 0, 0, 100])

  useEffect(() => {
    async function fetchClients() {
      try {
        const data = await clientsService.getEnabledClients()
        setClients(data)
      } catch (error) {
        console.error("Error fetching clients:", error)
      } finally {
        setLoading(false)
      }
    }

    fetchClients()
  }, [])

  if (loading) {
    return (
      <section className="py-20 bg-background">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <div className="h-8 bg-muted animate-pulse rounded mb-4 max-w-md mx-auto"></div>
            <div className="h-4 bg-muted animate-pulse rounded max-w-lg mx-auto"></div>
          </div>
          <div className="flex overflow-x-auto pb-8 hide-scrollbar">
            <div className="flex space-x-6">
              {[...Array(3)].map((_, i) => (
                <div key={i} className="flex-shrink-0 w-80 p-6 rounded-xl border border-border bg-card">
                  <div className="flex items-center mb-4">
                    <div className="w-16 h-16 bg-muted animate-pulse rounded-full mr-4"></div>
                    <div>
                      <div className="h-5 bg-muted animate-pulse rounded mb-2 w-32"></div>
                      <div className="h-4 bg-muted animate-pulse rounded w-20"></div>
                    </div>
                  </div>
                  <div className="h-4 bg-muted animate-pulse rounded mb-2"></div>
                  <div className="h-4 bg-muted animate-pulse rounded mb-4 w-3/4"></div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    )
  }

  if (clients.length === 0) {
    return null
  }

  return (
    <section ref={containerRef} className="py-20 bg-background overflow-hidden">
      <div className="container mx-auto px-4">
        <motion.div className="text-center mb-16" style={{ opacity, y }}>
          <h2 className="text-3xl font-bold mb-4">{t?.clients?.title || "Trusted By"}</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            {t?.clients?.description || "Companies and organizations I've worked with"}
          </p>
        </motion.div>

        <div className="flex overflow-x-auto pb-8 hide-scrollbar">
          <div className="flex space-x-6 animate-scroll">
            {clients.map((client) => (
              <motion.div
                key={client.id}
                className="flex-shrink-0 w-80 p-6 rounded-xl border border-border bg-card hover:border-primary/50 transition-all duration-300"
                whileHover={{ y: -5, boxShadow: "0 10px 30px -15px rgba(0, 0, 0, 0.3)" }}
              >
                <div className="flex items-center mb-4">
                  <div className="relative w-16 h-16 mr-4 overflow-hidden rounded-full">
                    <Image
                      src={client.logo || "/placeholder.svg"}
                      alt={client.name}
                      fill
                      className="object-cover"
                      unoptimized
                    />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold">{client.name}</h3>
                    <div className="flex mt-1">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          className={`w-4 h-4 ${
                            i < client.rating ? "text-yellow-500 fill-yellow-500" : "text-gray-300"
                          }`}
                        />
                      ))}
                    </div>
                  </div>
                </div>
                {client.testimonial && <p className="text-muted-foreground italic mb-4">"{client.testimonial}"</p>}

                <div className="flex flex-col gap-2">
                  {client.website && (
                    <Button
                      variant="outline"
                      size="sm"
                      className="w-full flex items-center justify-center gap-2 bg-transparent"
                      onClick={() => window.open(client.website, "_blank")}
                    >
                      <ExternalLink className="h-4 w-4" />
                      Visit Website
                    </Button>
                  )}

                  {client.last_project && (
                    <Button
                      variant="outline"
                      size="sm"
                      className="w-full flex items-center justify-center gap-2 bg-transparent"
                      onClick={() => window.open(client.last_project, "_blank")}
                    >
                      <FileCode className="h-4 w-4" />
                      {t?.projects?.lastProject || "Last Project"}
                    </Button>
                  )}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
