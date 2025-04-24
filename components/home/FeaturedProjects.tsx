"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { projects, projectCategoriesName } from "@/admin/projects"
import { useTranslations } from "@/hooks/useTranslations"
import { useLanguage } from "@/context/language-context"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import ProjectCard from "@/components/projects/ProjectCard"
import ProjectModal from "@/components/projects/ProjectModal"
import { ArrowRight } from "lucide-react"

export default function FeaturedProjects() {
  const t = useTranslations()
  const { isRTL } = useLanguage()
  const [filter, setFilter] = useState<number | "all">("all")
  const [hoveredFilter, setHoveredFilter] = useState<string | null>(null)
  const [selectedProject, setSelectedProject] = useState<any>(null)
  const [isModalOpen, setIsModalOpen] = useState(false)

  // Contar proyectos por categoría
  const projectCounts = {
    all: projects.filter((p) => p.featured).length,
  } as Record<string | number, number>

  projects
    .filter((p) => p.featured)
    .forEach((project) => {
      projectCounts[project.categoryId] = (projectCounts[project.categoryId] || 0) + 1
    })

  // Create categories for the filter with counts
  const categories = [
    { id: "all", label: t?.projects?.filters?.all || "All", count: projectCounts.all },
    ...Object.entries(projectCategoriesName).map(([id, name]) => {
      return {
        id,
        label: name,
        count: projectCounts[Number(id)] || 0,
      }
    }),
  ]

  // Filter featured projects based on the category selected
  const filteredProjects =
    filter === "all"
      ? projects.filter((project) => project.featured)
      : projects.filter((project) => project.categoryId === filter && project.featured)

  // Limit to 6 projects maximum
  const displayedProjects = filteredProjects.slice(0, 6)

  const handleProjectClick = (project: any) => {
    setSelectedProject(project)
    setIsModalOpen(true)
  }

  const handleCloseModal = () => {
    setIsModalOpen(false)
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
            {t?.projects?.title || "Projects"}
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
            {t?.projects?.description || "Explore my work"}
          </motion.p>

          <div className="flex justify-center mb-12">
            <div className="bg-[#0a0d16] p-2 rounded-full flex flex-wrap justify-center">
              {categories
                .filter((cat) => cat.count > 0)
                .map((category) => {
                  const isActive = filter === (category.id === "all" ? "all" : Number.parseInt(category.id))

                  return (
                    <motion.button
                      key={category.id}
                      onClick={() => setFilter(category.id === "all" ? "all" : Number.parseInt(category.id))}
                      className={`relative px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
                        isActive ? "bg-primary text-white" : "bg-[#1a1d26] text-foreground hover:text-primary"
                      } mx-1 my-1`}
                      onHoverStart={() => setHoveredFilter(category.id)}
                      onHoverEnd={() => setHoveredFilter(null)}
                    >
                      {category.label} ({category.count})
                    </motion.button>
                  )
                })}
            </div>
          </div>
        </div>

        <motion.div layout className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <AnimatePresence>
            {displayedProjects.map((project) => (
              <motion.div
                key={project.id}
                layout
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.5 }}
              >
                <ProjectCard project={project} onClick={() => handleProjectClick(project)} />
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>

        {projects.filter((p) => p.featured).length > 0 && (
          <div className="text-center mt-12">
            <Link href="/projects">
              <Button
                variant="outline"
                size="lg"
                className="group relative overflow-hidden border-primary/30 hover:border-primary"
              >
                <span className="relative z-10 flex items-center gap-2 transition-transform duration-300 group-hover:translate-x-[-5px]">
                  {t?.projects?.viewAll || "View All Projects"}
                  <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
                </span>
                <span className="absolute inset-0 bg-gradient-to-r from-primary/20 to-secondary/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300"></span>
              </Button>
            </Link>
          </div>
        )}

        {/* Project modal */}
        {selectedProject && <ProjectModal project={selectedProject} isOpen={isModalOpen} onClose={handleCloseModal} />}
      </div>
    </section>
  )
}
