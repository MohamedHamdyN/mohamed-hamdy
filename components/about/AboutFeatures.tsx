"use client"

import { motion } from "framer-motion"
import { aboutFeatures } from "@/admin/about-features"
import * as LucideIcons from "lucide-react"
import { PuzzlePiece } from "@/components/shared/CustomIcons"
import { useTranslations } from "@/hooks/useTranslations"

export default function AboutFeatures() {
  const t = useTranslations()

  // Only show up to 6 features
  const features = aboutFeatures.slice(0, 6)

  const getIcon = (iconName: string) => {
    if (iconName === "PuzzlePiece") {
      return <PuzzlePiece className="h-6 w-6" />
    }

    const Icon = LucideIcons[iconName as keyof typeof LucideIcons]
    if (Icon) {
      return <Icon className="h-6 w-6" />
    }
    return <LucideIcons.Star className="h-6 w-6" />
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
          <h2 className="text-3xl font-bold mb-4">My Skills & Expertise</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Key areas where I deliver exceptional value and results
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature, index) => (
            <motion.div
              key={feature.id}
              className="bg-card border border-border/40 rounded-xl p-6 hover:border-primary/30 transition-all duration-300 group"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              whileHover={{
                y: -5,
                boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)",
              }}
            >
              <div className="flex items-start gap-4">
                <div className={`${feature.color} p-3 rounded-lg bg-background/60`}>{getIcon(feature.icon)}</div>
                <div>
                  <h3 className="text-xl font-bold mb-2 group-hover:text-primary transition-colors">{feature.title}</h3>
                  <p className="text-muted-foreground text-sm">{feature.description}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
