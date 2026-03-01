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
          {education.map((item, idx) => (
            <motion.div
              key={idx}
              className="bg-card border border-border rounded-xl p-6"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: idx * 0.05 }}
            >
              <div className="flex items-start justify-between gap-4">
                <div>
                  <h3 className="text-xl font-bold">{item.title || "Education Item"}</h3>
                  <p className="text-muted-foreground">{item.institution || ""}</p>
                </div>
                {item.year && <span className="text-sm font-medium text-primary">{item.year}</span>}
              </div>
              {item.description && <p className="mt-4 text-muted-foreground">{item.description}</p>}
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}