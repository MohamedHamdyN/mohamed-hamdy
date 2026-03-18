"use client"

import { motion } from "framer-motion"
import { useProfileSafe } from "@/context/useProfileSafe"
import { useTranslations } from "@/hooks/useTranslations"

type EducationItem = {
  title?: string
  institution?: string
  year?: string
  description?: string
}

export default function Education() {
  const t = useTranslations()
  const profile = useProfileSafe()

  const education: EducationItem[] =
    (profile as any)?.education ??
    (profile as any)?.educations ??
    (profile as any)?.education_history ??
    []

  if (!education || education.length === 0) {
    return (
      <section className="py-20 bg-background">
        <div className="container mx-auto px-4 text-center text-muted-foreground">
          "No education items to display"
        </div>
      </section>
    )
  }

  return (
    <section className="py-20 bg-background">
      <div className="container mx-auto px-4">
        <motion.div
          className="text-center mb-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <h2 className="text-3xl font-bold mb-3">{t?.about?.education || "Education"}</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            {t.about.description}
          </p>
        </motion.div>

        <div className="max-w-4xl mx-auto grid gap-6">
          {education.map((item, idx) => {
            const colors = [
              { border: 'border-blue-500/30', bg: 'bg-gradient-to-br from-blue-500/10 to-blue-600/5', icon: 'bg-blue-500/20', text: 'text-blue-400' },
              { border: 'border-purple-500/30', bg: 'bg-gradient-to-br from-purple-500/10 to-purple-600/5', icon: 'bg-purple-500/20', text: 'text-purple-400' },
              { border: 'border-green-500/30', bg: 'bg-gradient-to-br from-green-500/10 to-green-600/5', icon: 'bg-green-500/20', text: 'text-green-400' },
              { border: 'border-orange-500/30', bg: 'bg-gradient-to-br from-orange-500/10 to-orange-600/5', icon: 'bg-orange-500/20', text: 'text-orange-400' },
            ]
            const color = colors[idx % colors.length]
            
            return (
              <motion.div
                key={idx}
                className={`border rounded-xl p-6 overflow-hidden relative ${color.border} ${color.bg} hover:border-opacity-60 transition-all duration-300 group`}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: idx * 0.05 }}
              >
                <div className="relative z-10 flex items-start justify-between gap-4">
                  <div className="flex-1">
                    <h3 className="text-xl font-bold text-foreground">{item.title || "Education Item"}</h3>
                    <p className={color.text}>{item.institution || ""}</p>
                  </div>
                  {item.year && <span className={`text-sm font-medium whitespace-nowrap ${color.text}`}>{item.year}</span>}
                </div>
                {item.description && <p className="mt-4 text-muted-foreground">{item.description}</p>}
                
                <div className={`absolute -right-10 -top-10 w-32 h-32 rounded-full ${color.icon} blur-2xl group-hover:blur-3xl transition-all duration-300`} />
              </motion.div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
