"use client"

import { motion } from "framer-motion"
import { paymentMethods, freelancePlatforms } from "@/admin/services"
import { toggleSettings } from "@/admin/toggle"
import { useTranslations } from "@/hooks/useTranslations"
import { profile } from "@/admin/profile"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import * as LucideIcons from "lucide-react"

export default function PaymentMethods() {
  const t = useTranslations()

  const getIcon = (iconName: string) => {
    // استخدام LucideIcons ديناميكيًا
    const Icon = LucideIcons[iconName as keyof typeof LucideIcons] || LucideIcons.CreditCard
    return <Icon className="h-6 w-6" />
  }

  // تصفية المنصات المفعلة
  const enabledPlatforms = freelancePlatforms.filter((platform) => platform.enabled)

  // التحقق مما إذا كان يجب عرض أي من القسمين
  const showAnySection = toggleSettings.freelance_platforms || toggleSettings.payment_methods

  if (!showAnySection) return null

  return (
    <section className="py-20 bg-gradient-to-b from-background to-background/50 relative overflow-hidden">
      {/* خلفية متدرجة مع تأثيرات */}
      <div className="absolute inset-0 -z-10 overflow-hidden">
        <div className="absolute top-0 left-1/4 w-64 h-64 bg-primary/5 rounded-full filter blur-3xl"></div>
        <div className="absolute bottom-0 right-1/4 w-80 h-80 bg-secondary/5 rounded-full filter blur-3xl"></div>
      </div>

      <div className="container mx-auto px-4 relative z-10">
        {/* منصات العمل الحر */}
        {toggleSettings.freelance_platforms && enabledPlatforms.length > 0 && (
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
              {enabledPlatforms.map((platform, index) => (
                <motion.div
                  key={platform.name}
                  className={`flex flex-col items-center p-6 rounded-xl border-2 ${platform.color} bg-card hover:border-opacity-100 transition-all duration-300 w-40 relative overflow-hidden`}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  whileHover={{
                    y: -5,
                    boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)",
                  }}
                >
                  {/* تأثير الحدود */}
                  <motion.div
                    className={`absolute inset-0 ${platform.color} opacity-20`}
                    animate={{
                      background: [
                        `linear-gradient(0deg, transparent 0%, ${platform.color} 50%, transparent 100%)`,
                        `linear-gradient(90deg, transparent 0%, ${platform.color} 50%, transparent 100%)`,
                        `linear-gradient(180deg, transparent 0%, ${platform.color} 50%, transparent 100%)`,
                        `linear-gradient(270deg, transparent 0%, ${platform.color} 50%, transparent 100%)`,
                        `linear-gradient(0deg, transparent 0%, ${platform.color} 50%, transparent 100%)`,
                      ],
                    }}
                    transition={{
                      duration: 4,
                      repeat: Number.POSITIVE_INFINITY,
                      repeatType: "loop",
                    }}
                  />
                  <div className="relative w-12 h-12 mb-3">
                    <Image
                      src={platform.logo || profile.defaultPlatformLogo}
                      alt={platform.name}
                      fill
                      className="object-contain"
                      unoptimized
                    />
                  </div>
                  <span className="text-sm font-medium mb-2">{platform.name}</span>
                  <Button
                    variant="outline"
                    size="sm"
                    className="mt-2 relative z-10"
                    onClick={() => window.open(platform.profileUrl, "_blank")}
                  >
                    View Profile
                  </Button>
                </motion.div>
              ))}
            </div>
          </div>
        )}

        {/* فاصل (فقط إذا كان كلا القسمين مفعلين) */}
        {toggleSettings.freelance_platforms && toggleSettings.payment_methods && (
          <div className="w-full max-w-md mx-auto border-t border-border my-8"></div>
        )}

        {/* طرق الدفع */}
        {toggleSettings.payment_methods && (
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
                  key={method.name}
                  className="flex flex-col items-center p-6 bg-card rounded-xl border border-border hover:border-primary/30 transition-all duration-300 w-40 relative overflow-hidden"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  whileHover={{
                    y: -5,
                    boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)",
                  }}
                >
                  {/* Add animated background */}
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-br from-primary/5 to-secondary/5 opacity-0"
                    initial={{ opacity: 0 }}
                    whileHover={{ opacity: 1 }}
                    transition={{ duration: 0.3 }}
                  />

                  {/* Add animated icon */}
                  <motion.div
                    className="text-primary mb-3 bg-primary/10 p-3 rounded-full"
                    whileHover={{
                      scale: 1.1,
                      rotate: [0, 5, -5, 0],
                      transition: { duration: 0.5 },
                    }}
                  >
                    {getIcon(method.icon)}
                  </motion.div>

                  {/* Add animated text */}
                  <motion.span
                    className="text-sm font-medium"
                    whileHover={{
                      scale: 1.05,
                      color: "var(--primary)",
                      transition: { duration: 0.3 },
                    }}
                  >
                    {method.name}
                  </motion.span>

                  {/* Add animated particles */}
                  <motion.div
                    className="absolute w-2 h-2 bg-primary/30 rounded-full"
                    initial={{ x: 0, y: 0, opacity: 0 }}
                    whileHover={{
                      opacity: [0, 1, 0],
                      x: [0, -20, -30],
                      y: [0, -20, -40],
                      transition: {
                        duration: 1.5,
                        repeat: Number.POSITIVE_INFINITY,
                        repeatType: "loop",
                      },
                    }}
                  />
                  <motion.div
                    className="absolute w-2 h-2 bg-secondary/30 rounded-full"
                    initial={{ x: 0, y: 0, opacity: 0 }}
                    whileHover={{
                      opacity: [0, 1, 0],
                      x: [0, 20, 30],
                      y: [0, -20, -40],
                      transition: {
                        duration: 1.5,
                        delay: 0.2,
                        repeat: Number.POSITIVE_INFINITY,
                        repeatType: "loop",
                      },
                    }}
                  />
                </motion.div>
              ))}
            </div>
          </div>
        )}
      </div>
    </section>
  )
}
