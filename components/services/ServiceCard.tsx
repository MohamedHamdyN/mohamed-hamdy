"use client"

import { motion } from "framer-motion"
import { useTranslations } from "@/hooks/useTranslations"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import * as LucideIcons from "lucide-react"
import { Check } from "lucide-react"

interface ServiceCardProps {
  service: {
    id: number
    title: string
    description: string
    icon: string
    color: string
    features: string[]
  }
  index: number
}

export default function ServiceCard({ service, index }: ServiceCardProps) {
  const t = useTranslations()

  const getIcon = (iconName: string) => {
    // استخدام LucideIcons ديناميكيًا لدعم أي أيقونة
    const Icon = LucideIcons[iconName as keyof typeof LucideIcons] || LucideIcons.BarChart2
    return <Icon className="h-10 w-10" />
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      whileHover={{ y: -10, transition: { duration: 0.3 } }}
      className="group relative bg-card rounded-xl overflow-hidden border border-border hover:border-primary/30 transition-all duration-500 h-full flex flex-col"
    >
      {/* خلفية متحركة */}
      <div className="absolute inset-0 bg-gradient-to-br from-transparent to-primary/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>

      {/* رأس البطاقة مع الأيقونة */}
      <div className={`p-6 text-white ${service.color} relative overflow-hidden`}>
        <div className="relative z-10">{getIcon(service.icon)}</div>
        <div className="absolute top-0 right-0 w-24 h-24 bg-white/10 rounded-full -mr-12 -mt-12"></div>
        <div className="absolute bottom-0 left-0 w-16 h-16 bg-black/10 rounded-full -ml-8 -mb-8"></div>
      </div>

      {/* محتوى البطاقة */}
      <div className="p-6 flex-grow flex flex-col">
        <h3 className="text-xl font-bold mb-3 group-hover:text-primary transition-colors duration-300">
          {service.title}
        </h3>
        <p className="text-muted-foreground mb-6">{service.description}</p>

        <div className="mt-auto">
          <h4 className="font-semibold mb-3 text-foreground/80">{t.services.features || "Features"}:</h4>
          <ul className="space-y-2 mb-6">
            {service.features.map((feature, idx) => (
              <li key={idx} className="flex items-start">
                <span className={`mr-2 mt-1 flex-shrink-0 ${service.color.replace("bg-", "text-")} rounded-full`}>
                  <Check className="h-4 w-4" />
                </span>
                <span className="text-muted-foreground">{feature}</span>
              </li>
            ))}
          </ul>

          <Link href="/contact">
            <Button variant="outline" className="w-full group-hover:bg-primary/10 transition-colors duration-300">
              {t.services.cta}
            </Button>
          </Link>
        </div>
      </div>

      {/* زخرفة الزاوية */}
      <div className="absolute top-0 right-0 w-16 h-16 overflow-hidden">
        <div className={`absolute transform rotate-45 ${service.color} w-16 h-16 -top-8 -right-8 opacity-20`}></div>
      </div>
    </motion.div>
  )
}
