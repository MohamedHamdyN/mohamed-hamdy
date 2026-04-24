'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { getServices } from '@/app/actions/cms'
import { useTranslations } from '@/hooks/useTranslations'
import ServiceCard from './ServiceCard'
import { Service } from '@/lib/db'

export default function ServicesGrid() {
  const t = useTranslations()
  const [services, setServices] = useState<Service[]>([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    async function loadServices() {
      try {
        const data = await getServices()
        // Filter enabled services
        setServices(data)
      } catch (error) {
        console.error('Error loading services:', error)
        setServices([])
      } finally {
        setIsLoading(false)
      }
    }

    loadServices()
  }, [])

  if (isLoading) {
    return (
      <section id="services-grid" className="py-20 bg-background">
        <div className="container mx-auto px-4 text-center text-slate-400">Loading services...</div>
      </section>
    )
  }

  const enabledServices = services

  if (enabledServices.length === 0) {
    return (
      <section id="services-grid" className="py-20 bg-background">
        <div className="container mx-auto px-4 text-center text-slate-400">No services available.</div>
      </section>
    )
  }

  return (
    <section id="services-grid" className="py-20 bg-background relative">
      {/* Gradient background effects */}
      <div className="absolute inset-0 -z-10 overflow-hidden">
        <div className="absolute top-0 left-1/4 w-64 h-64 bg-primary/5 rounded-full filter blur-3xl"></div>
        <div className="absolute bottom-0 right-1/4 w-80 h-80 bg-secondary/5 rounded-full filter blur-3xl"></div>
      </div>

      <div className="container mx-auto px-4 relative z-10 max-w-6xl">
        {/* Header */}
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4">{t?.services?.title || "Services"}</h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            {t?.services?.description || "Professional services tailored to your needs"}
          </p>
        </motion.div>

        {/* Services Grid */}
        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, staggerChildren: 0.1 }}
        >
          {enabledServices.map((service, index) => (
            <ServiceCard key={service.id} service={service} index={index} />
          ))}
        </motion.div>
      </div>
    </section>
  )
}
