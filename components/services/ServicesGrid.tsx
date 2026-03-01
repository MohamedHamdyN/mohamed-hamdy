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
        // تصفية الخدمات المفعلة
        const enabledServices = data.filter((service) => service.enabled)
        setServices(enabledServices)
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

  return (
    <section id="services-grid" className="py-20 bg-background relative">
      {/* خلفية متدرجة مع تأثيرات */}
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
          {enabledServices.map((service, index) => (
            <ServiceCard key={service.id} service={service} index={index} />
          ))}
        </motion.div>
      </div>
    </section>
  )
}
