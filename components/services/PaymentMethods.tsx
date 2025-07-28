"use client"

import { useEffect, useState } from "react"
import { motion } from "framer-motion"
import { paymentMethodsService, freelancePlatformsService } from "@/lib/database"
import { getSettings } from "@/lib/settings"
import { useTranslations } from "@/hooks/useTranslations"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import * as LucideIcons from "lucide-react"
import type { PaymentMethod, FreelancePlatform } from "@/lib/supabase"

export default function PaymentMethods() {
  const [paymentMethods, setPaymentMethods] = useState<PaymentMethod[]>([])
  const [freelancePlatforms, setFreelancePlatforms] = useState<FreelancePlatform[]>([])
  const [settings, setSettings] = useState<Record<string, boolean>>({})
  const [loading, setLoading] = useState(true)
  const t = useTranslations()

  useEffect(() => {
    async function fetchData() {
      try {
        const [paymentData, platformsData, settingsData] = await Promise.all([
          paymentMethodsService.getPaymentMethods(),
          freelancePlatformsService.getEnabledFreelancePlatforms(),
          getSettings(),
        ])
        setPaymentMethods(paymentData)
        setFreelancePlatforms(platformsData)
        setSettings(settingsData)
      } catch (error) {
        console.error("Error fetching payment data:", error)
      } finally {
        setLoading(false)
      }
    }

    fetchData()
  }, [])

  const getIcon = (iconName: string) => {
    const Icon = LucideIcons[iconName as keyof typeof LucideIcons] || LucideIcons.CreditCard
    return <Icon className="h-6 w-6" />
  }

  // Check if any section should be shown
  const showAnySection = settings.freelance_platforms || settings.payment_methods

  if (loading) {
    return (
      <section className="py-20 bg-gradient-to-b from-background to-background/50 relative overflow-hidden">
        <div className="container mx-auto px-4 relative z-10">
          <div className="h-8 bg-muted animate-pulse rounded mb-8 max-w-md mx-auto"></div>
          <div className="flex flex-wrap justify-center gap-6">
            {[...Array(4)].map((_, i) => (
              <div key={i} className="w-40 p-6 bg-card rounded-xl border border-border">
                <div className="w-12 h-12 bg-muted animate-pulse rounded-full mx-auto mb-3"></div>
                <div className="h-4 bg-muted animate-pulse rounded mx-auto w-20"></div>
              </div>
            ))}
          </div>
        </div>
      </section>
    )
  }

  if (!showAnySection) return null

  return (
    <section className="py-20 bg-gradient-to-b from-background to-background/50 relative overflow-hidden">
      {/* Background gradient with effects */}
      <div className="absolute inset-0 -z-10 overflow-hidden">
        <div className="absolute top-0 left-1/4 w-64 h-64 bg-primary/5 rounded-full filter blur-3xl"></div>
        <div className="absolute bottom-0 right-1/4 w-80 h-80 bg-secondary/5 rounded-full filter blur-3xl"></div>
      </div>

      <div className="container mx-auto px-4 relative z-10">
        {/* Freelance platforms */}
        {settings.freelance_platforms && freelancePlatforms.length > 0 && (
          <div className="mb-20">
            <motion.h2
              className="text-3xl font-bold mb-8 text-center"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              {t.services.freelancePlatforms}
            </motion.h2>

            <div className="flex flex-wrap justify-center gap-6">
              {freelancePlatforms.map((platform, index) => (
                <motion.div
                  key={platform.id}
                  className={`flex flex-col items-center p-6 rounded-xl border-2 ${platform.color} bg-card hover:border-opacity-100 transition-all duration-300 w-40 relative overflow-hidden group`}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  whileHover={{
                    y: -5,
                    boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)",
                  }}
                >
                  <div className="relative w-12 h-12 mb-3 group-hover:scale-110 transition-transform duration-300">
                    <div className="w-12 h-12 bg-background/50 rounded-full flex items-center justify-center overflow-hidden">
                      <Image
                        src={platform.logo || "/placeholder.svg"}
                        alt={platform.name}
                        width={48}
                        height={48}
                        className="object-contain"
                        unoptimized
                      />
                    </div>
                  </div>
                  <span className="text-sm font-medium mb-2 group-hover:text-primary transition-colors duration-300">
                    {platform.name}
                  </span>
                  <Button
                    variant="outline"
                    size="sm"
                    className="mt-2 relative z-10 group-hover:bg-primary group-hover:text-primary-foreground transition-colors duration-300 bg-transparent"
                    onClick={() => window.open(platform.profile_url, "_blank")}
                  >
                    View Profile
                  </Button>
                </motion.div>
              ))}
            </div>
          </div>
        )}

        {/* Separator (only if both sections are enabled) */}
        {settings.freelance_platforms && settings.payment_methods && (
          <div className="w-full max-w-md mx-auto border-t border-border my-8"></div>
        )}

        {/* Payment methods */}
        {settings.payment_methods && paymentMethods.length > 0 && (
          <div>
            <motion.h2
              className="text-3xl font-bold mb-8 text-center"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              {t.services.paymentMethods}
            </motion.h2>

            <div className="flex flex-wrap justify-center gap-6">
              {paymentMethods.map((method, index) => (
                <motion.div
                  key={method.id}
                  className="flex flex-col items-center p-6 bg-card rounded-xl border border-border hover:border-primary/30 transition-all duration-300 w-40 relative overflow-hidden group"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  whileHover={{
                    y: -5,
                    boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)",
                  }}
                >
                  <motion.div
                    className="text-primary mb-3 bg-primary/10 p-3 rounded-full group-hover:scale-110 transition-all duration-300"
                    whileHover={{
                      rotate: [0, 5, -5, 0],
                      transition: { duration: 0.5, repeat: 1 },
                    }}
                  >
                    {getIcon(method.icon)}
                  </motion.div>

                  <motion.span
                    className="text-sm font-medium group-hover:text-primary transition-colors duration-300"
                    whileHover={{
                      scale: 1.05,
                      transition: { duration: 0.3 },
                    }}
                  >
                    {method.name}
                  </motion.span>
                </motion.div>
              ))}
            </div>
          </div>
        )}
      </div>
    </section>
  )
}
