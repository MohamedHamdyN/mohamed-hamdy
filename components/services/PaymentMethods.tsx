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
                  {/* Enhanced border effect */}
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

                  {/* Add a glow effect on hover */}
                  <motion.div
                    className="absolute inset-0 opacity-0 group-hover:opacity-30 transition-opacity duration-300"
                    style={{
                      background: `radial-gradient(circle at center, ${platform.color}, transparent 70%)`,
                    }}
                  />

                  <div className="relative w-12 h-12 mb-3 group-hover:scale-110 transition-transform duration-300">
                    {/* تحسين عرض الشعار مع معالجة الأخطاء */}
                    <div className="w-12 h-12 bg-background/50 rounded-full flex items-center justify-center overflow-hidden">
                      <Image
                        src={platform.logo || profile.defaultPlatformLogo || "/placeholder.svg"}
                        alt={platform.name}
                        width={48}
                        height={48}
                        className="object-contain"
                        unoptimized
                        onError={(e) => {
                          // في حالة فشل تحميل الصورة، استخدم الأيقونة الافتراضية
                          const target = e.target as HTMLImageElement
                          target.style.display = "none"
                          const parent = target.parentElement
                          if (parent) {
                            const icon = document.createElement("div")
                            icon.className = "text-primary text-2xl font-bold"
                            icon.textContent = platform.name.charAt(0)
                            parent.appendChild(icon)
                          }
                        }}
                      />
                    </div>
                  </div>
                  <span className="text-sm font-medium mb-2 group-hover:text-primary transition-colors duration-300">
                    {platform.name}
                  </span>
                  <Button
                    variant="outline"
                    size="sm"
                    className="mt-2 relative z-10 group-hover:bg-primary group-hover:text-primary-foreground transition-colors duration-300"
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
                  {/* Add animated background */}
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-br from-primary/5 to-secondary/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                    initial={{ opacity: 0 }}
                    whileHover={{ opacity: 1 }}
                  />

                  {/* Add animated icon */}
                  <motion.div
                    className="text-primary mb-3 bg-primary/10 p-3 rounded-full group-hover:scale-110 transition-all duration-300"
                    whileHover={{
                      rotate: [0, 5, -5, 0],
                      transition: { duration: 0.5, repeat: 1 },
                    }}
                  >
                    {getIcon(method.icon)}
                  </motion.div>

                  {/* Add animated text */}
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
