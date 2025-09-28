"use client"

import { motion } from "framer-motion"
import { services } from "@/admin/services"
import { useTranslations } from "@/hooks/useTranslations"
import ServiceCard from "./ServiceCard"

export default function ServicesGrid() {
  const t = useTranslations()

  // تصفية الخدمات المفعلة
  const enabledServices = services.filter((service) => service.enabled)

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
