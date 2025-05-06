"use client"

import { motion } from "framer-motion"
import { paymentMethods } from "@/admin/services"
import { useTranslations } from "@/hooks/useTranslations"
import * as LucideIcons from "lucide-react"

export default function PaymentMethods() {
  const t = useTranslations()

  const getIcon = (iconName: string) => {
    // استخدام LucideIcons ديناميكيًا
    const Icon = LucideIcons[iconName as keyof typeof LucideIcons] || LucideIcons.CreditCard
    return <Icon className="h-6 w-6" />
  }

  return (
    <section className="py-20 bg-gradient-to-b from-background to-background/50 relative overflow-hidden">
      {/* خلفية متدرجة مع تأثيرات */}
      <div className="absolute inset-0 -z-10 overflow-hidden">
        <div className="absolute top-0 left-1/4 w-64 h-64 bg-primary/5 rounded-full filter blur-3xl"></div>
        <div className="absolute bottom-0 right-1/4 w-80 h-80 bg-secondary/5 rounded-full filter blur-3xl"></div>
      </div>

      <div className="container mx-auto px-4 relative z-10">
        {/* طرق الدفع */}
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
      </div>
    </section>
  )
}
