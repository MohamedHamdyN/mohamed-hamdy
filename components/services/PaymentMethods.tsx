"use client"

import { motion } from "framer-motion"
import { paymentMethods, freelancePlatforms } from "@/admin/services"
import { toggleSettings } from "@/admin/toggle"
import { useTranslations } from "@/hooks/useTranslations"
import { useProfileSafe } from "@/context/useProfileSafe"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import * as LucideIcons from "lucide-react"
import { useState } from "react"

export default function PaymentMethods() {
  const t = useTranslations()
  const profile = useProfileSafe() // ✅ داخل component

  const defaultPlatformLogo =
    (profile as any)?.defaultPlatformLogo ??
    (profile as any)?.default_platform_logo ??
    "/placeholder.svg"

  const getIcon = (iconName: string) => {
    const Icon = (LucideIcons as any)[iconName] || LucideIcons.CreditCard
    return <Icon className="h-6 w-6" />
  }

  const enabledPlatforms = freelancePlatforms.filter((platform: any) => platform.enabled)

  const showAnySection = (toggleSettings as any)?.freelance_platforms || (toggleSettings as any)?.payment_methods
  if (!showAnySection) return null

  return (
    <section className="py-20 bg-gradient-to-b from-background to-background/50 relative overflow-hidden">
      <div className="absolute inset-0 -z-10 overflow-hidden">
        <div className="absolute top-0 left-1/4 w-64 h-64 bg-primary/5 rounded-full filter blur-3xl" />
        <div className="absolute bottom-0 right-1/4 w-80 h-80 bg-secondary/5 rounded-full filter blur-3xl" />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        {(toggleSettings as any)?.freelance_platforms && enabledPlatforms.length > 0 && (
          <div className="mb-20">
            <motion.h2
              className="text-3xl font-bold mb-8 text-center"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              {t?.services?.freelancePlatforms || "Freelance Platforms"}
            </motion.h2>

            <div className="flex flex-wrap justify-center gap-6">
              {enabledPlatforms.map((platform: any, index: number) => (
                <PlatformCard
                  key={platform.name}
                  platform={platform}
                  index={index}
                  defaultLogo={defaultPlatformLogo}
                />
              ))}
            </div>
          </div>
        )}

        {(toggleSettings as any)?.freelance_platforms && (toggleSettings as any)?.payment_methods && (
          <div className="w-full max-w-md mx-auto border-t border-border my-8" />
        )}

        {(toggleSettings as any)?.payment_methods && (
          <div>
            <motion.h2
              className="text-3xl font-bold mb-8 text-center"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              {t?.services?.paymentMethods || "Payment Methods"}
            </motion.h2>

            <div className="flex flex-wrap justify-center gap-6">
              {paymentMethods.map((method: any, index: number) => (
                <motion.div
                  key={method.name}
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
                    className="absolute inset-0 bg-gradient-to-br from-primary/5 to-secondary/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                    initial={{ opacity: 0 }}
                    whileHover={{ opacity: 1 }}
                  />
                  <motion.div
                    className="text-primary mb-3 bg-primary/10 p-3 rounded-full group-hover:scale-110 transition-all duration-300"
                    whileHover={{ rotate: [0, 5, -5, 0], transition: { duration: 0.5, repeat: 1 } }}
                  >
                    {getIcon(method.icon)}
                  </motion.div>
                  <motion.span className="text-sm font-medium group-hover:text-primary transition-colors duration-300">
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

function PlatformCard({ platform, index, defaultLogo }: any) {
  const [imgError, setImgError] = useState(false)

  return (
    <motion.div
      className="flex flex-col items-center p-6 rounded-xl border border-border bg-card hover:border-primary/30 transition-all duration-300 w-40 relative overflow-hidden group"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      whileHover={{
        y: -5,
        boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)",
      }}
    >
      <div className="relative w-12 h-12 mb-3">
        {!imgError ? (
          <Image
            src={platform.logo || defaultLogo}
            alt={platform.name}
            width={48}
            height={48}
            className="object-contain"
            unoptimized
            onError={() => setImgError(true)}
          />
        ) : (
          <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center font-bold text-primary">
            {platform.name?.charAt(0) || "P"}
          </div>
        )}
      </div>

      <span className="text-sm font-medium mb-2">{platform.name}</span>
      <Button variant="outline" size="sm" className="mt-2" onClick={() => window.open(platform.profileUrl, "_blank")}>
        View Profile
      </Button>
    </motion.div>
  )
}