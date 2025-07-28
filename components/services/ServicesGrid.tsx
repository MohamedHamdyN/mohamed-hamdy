"use client"

import { useEffect, useState } from "react"
import { motion } from "framer-motion"
import { servicesService } from "@/lib/database"
import { useTranslations } from "@/hooks/useTranslations"
import ServiceCard from "./ServiceCard"
import type { Service } from "@/lib/supabase"

export default function ServicesGrid() {
  const [services, setServices] = useState<Service[]>([])
  const [loading, setLoading] = useState(true)
  const t = useTranslations()

  useEffect(() => {
    async function fetchServices() {
      try {
        const data = await servicesService.getEnabledServices()
        setServices(data)
      } catch (error) {
        console.error("Error fetching services:", error)
      } finally {
        setLoading(false)
      }
    }

    fetchServices()
  }, [])

  if (loading) {
    return (
      <section className="py-20 bg-background relative">
        <div className="container mx-auto px-4 relative z-10">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[...Array(6)].map((_, i) => (
              <div key={i} className="bg-card rounded-xl border border-border overflow-hidden">
                <div className="h-20 bg-muted animate-pulse"></div>
                <div className="p-6">
                  <div className="h-6 bg-muted animate-pulse rounded mb-3"></div>
                  <div className="h-4 bg-muted animate-pulse rounded mb-6 w-3/4"></div>
                  <div className="space-y-2 mb-6">
                    {[...Array(3)].map((_, j) => (
                      <div key={j} className="h-4 bg-muted animate-pulse rounded w-full"></div>
                    ))}
                  </div>
                  <div className="h-10 bg-muted animate-pulse rounded"></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    )
  }

  if (services.length === 0) {
    return null
  }

  return (
    <section id="services-grid" className="py-20 bg-background relative">
      {/* Background gradient with effects */}
      <div className="absolute inset-0 -z-10 overflow-hidden">
        <div className="absolute top-0 left-1/4 w-64 h-64 bg-primary/5 rounded-full filter blur-3xl"></div>
        <div className="absolute bottom-0 right-1/4 w-80 h-80 bg-secondary/5 rounded-full filter blur-3xl"></div>
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          {services.map((service, index) => (
            <ServiceCard key={service.id} service={service} index={index} />
          ))}
        </motion.div>
      </div>
    </section>
  )
}
