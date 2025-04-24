"use client"

import { motion } from "framer-motion"
import { useInView } from "react-intersection-observer"
import { useTranslations } from "@/hooks/useTranslations"
import { profile } from "@/admin/profile"

export default function Education() {
  const t = useTranslations()
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  })

  return (
    <section className="py-16 bg-gradient-to-b from-background/50 to-background relative overflow-hidden">
      {/* Background elements */}
      <div className="absolute inset-0 -z-10 overflow-hidden">
        <div className="absolute top-1/4 right-1/4 w-64 h-64 bg-primary/5 rounded-full filter blur-3xl"></div>
        <div className="absolute bottom-1/4 left-1/4 w-80 h-80 bg-secondary/5 rounded-full filter blur-3xl"></div>
      </div>

      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-12"
        >
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="inline-flex items-center gap-2 bg-primary/10 text-primary px-4 py-2 rounded-full mb-6"
          >
            <span className="text-sm font-medium">{t.about.education}</span>
          </motion.div>

          <motion.h2
            className="text-3xl md:text-4xl font-bold mb-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            {t.about.education}
          </motion.h2>
        </motion.div>

        <motion.div ref={ref} initial="hidden" animate={inView ? "visible" : "hidden"} className="max-w-4xl mx-auto">
          {profile.education.map((item, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 + index * 0.1 }}
              className="bg-card border border-border rounded-2xl p-6 mb-6 hover:shadow-lg transition-all duration-300"
            >
              <div className="flex flex-col md:flex-row justify-between mb-4">
                <div>
                  <h3 className="text-xl font-bold text-primary">{item.degree}</h3>
                  <p className="text-muted-foreground">{item.institution}</p>
                </div>
                <div className="mt-2 md:mt-0">
                  <span className="inline-block bg-primary/10 text-primary px-3 py-1 rounded-full text-sm">
                    {item.year}
                  </span>
                </div>
              </div>
              <p className="text-muted-foreground">{item.details}</p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
