"use client"

import { motion } from "framer-motion"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ArrowRight } from "lucide-react"

export default function FeaturedProjects() {
  // Hardcoded translations
  const translations = {
    projects: {
      title: "Projects",
      description: "Explore my data analysis work and case studies",
      viewAll: "View All Projects",
    },
  }

  return (
    <section className="py-20 bg-background">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <motion.h2
            className="text-3xl font-bold mb-4 inline-block relative"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            {translations.projects.title || "Projects"}
            <motion.span
              className="absolute -bottom-2 left-0 w-full h-1 bg-gradient-to-r from-primary to-secondary"
              initial={{ width: 0 }}
              whileInView={{ width: "100%" }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.3 }}
            ></motion.span>
          </motion.h2>
          <motion.p
            className="text-muted-foreground max-w-2xl mx-auto mb-8"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            {translations.projects.description || "Explore my work"}
          </motion.p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {/* Placeholder for projects */}
          {[1, 2, 3, 4, 5, 6].map((i) => (
            <motion.div
              key={i}
              className="bg-card border border-border rounded-xl overflow-hidden hover:shadow-lg transition-all duration-300"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
            >
              <div className="h-48 bg-muted"></div>
              <div className="p-6">
                <h3 className="text-xl font-bold mb-2">Project {i}</h3>
                <p className="text-muted-foreground mb-4">This is a placeholder for project description.</p>
                <div className="flex flex-wrap gap-2">
                  <span className="text-xs bg-primary/10 text-primary px-2 py-1 rounded-full">Data Analysis</span>
                  <span className="text-xs bg-secondary/10 text-secondary px-2 py-1 rounded-full">Visualization</span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        <div className="text-center mt-12">
          <Link href="/projects">
            <Button
              variant="outline"
              size="lg"
              className="group relative overflow-hidden border-primary/30 hover:border-primary"
            >
              <span className="relative z-10 flex items-center gap-2 transition-transform duration-300 group-hover:translate-x-[-5px]">
                {translations.projects.viewAll || "View All Projects"}
                <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
              </span>
              <span className="absolute inset-0 bg-gradient-to-r from-primary/20 to-secondary/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300"></span>
            </Button>
          </Link>
        </div>
      </div>
    </section>
  )
}
