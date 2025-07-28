"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { projectsService, projectCategoriesService } from "@/lib/database"
import { useTranslations } from "@/hooks/useTranslations"
import { useLanguage } from "@/context/language-context"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import ProjectCard from "@/components/projects/ProjectCard"
import ProjectModal from "@/components/projects/ProjectModal"
import { ArrowRight } from "lucide-react"
import { useTheme } from "next-themes"
import type { Project, ProjectCategory } from "@/lib/supabase"

export default function FeaturedProjects() {
  const [projects, setProjects] = useState<Project[]>([])
  const [categories, setCategories] = useState<ProjectCategory[]>([])
  const [loading, setLoading] = useState(true)
  const [filter, setFilter] = useState<number | "all">("all")
  const [selectedProject, setSelectedProject] = useState<any>(null)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const t = useTranslations()
  const { isRTL } = useLanguage()
  const { theme } = useTheme()

  useEffect(() => {
    async function fetchData() {
      try {
        const [projectsData, categoriesData] = await Promise.all([
          projectsService.getFeaturedProjects(),
          projectCategoriesService.getProjectCategories(),
        ])
        setProjects(projectsData)
        setCategories(categoriesData)
      } catch (error) {
        console.error("Error fetching featured projects:", error)
      } finally {
        setLoading(false)
      }
    }

    fetchData()
  }, [])

  if (loading) {
    return (
      <section className="py-20 bg-background">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <div className="h-8 bg-muted animate-pulse rounded mb-4 max-w-md mx-auto"></div>
            <div className="h-4 bg-muted animate-pulse rounded max-w-lg mx-auto mb-8"></div>
            <div className="flex justify-center mb-12">
              <div className="flex gap-2">
                {[...Array(4)].map((_, i) => (
                  <div key={i} className="h-8 w-20 bg-muted animate-pulse rounded-full"></div>
                ))}
              </div>
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[...Array(6)].map((_, i) => (
              <div key={i} className="bg-card rounded-xl border border-border overflow-hidden">
                <div className="h-48 bg-muted animate-pulse"></div>
                <div className="p-5">
                  <div className="h-6 bg-muted animate-pulse rounded mb-2"></div>
                  <div className="h-4 bg-muted animate-pulse rounded mb-4 w-3/4"></div>
                  <div className="flex gap-2 mb-4">
                    {[...Array(3)].map((_, j) => (
                      <div key={j} className="h-6 w-16 bg-muted animate-pulse rounded-full"></div>
                    ))}
                  </div>
                  <div className="h-10 bg-muted animate-pulse rounded"></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    )
  }

  if (projects.length === 0) {
    return null
  }

  // Count projects by category
  const projectCounts = {
    all: projects.length,
  } as Record<string | number, number>

  projects.forEach((project) => {
    projectCounts[project.category_id] = (projectCounts[project.category_id] || 0) + 1
  })

  // Create categories for the filter with counts
  const filterCategories = [
    { id: "all", label: t?.projects?.filters?.all || "All", count: projectCounts.all },
    ...categories.map((category) => ({
      id: category.id,
      label: category.name,
      count: projectCounts[category.id] || 0,
    })),
  ]

  // Filter projects based on the category selected
  const filteredProjects = filter === "all" ? projects : projects.filter((project) => project.category_id === filter)

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
            <div
              className={`p-2 rounded-full flex flex-wrap justify-center ${theme === "dark" ? "bg-[#0a0d16]" : "bg-gray-100"}`}
            >
              {filterCategories
                .filter((cat) => cat.count > 0)
                .map((category) => {
                  const isActive = filter === category.id

                  return (
                    <motion.button
                      key={category.id}
                      onClick={() => setFilter(category.id)}
                      className={`relative px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
                        isActive
                          ? "bg-primary text-white"
                          : theme === "dark"
                            ? "bg-[#1a1d26] text-foreground hover:text-primary"
                            : "bg-white text-foreground hover:text-primary shadow-sm"
                      } mx-1 my-1`}
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

        {projects.length > 0 && (
          <div className="text-center mt-12">
            <Link href="/projects">
              <Button
                variant="outline"
                size="lg"
                className="group relative overflow-hidden border-primary/30 hover:border-primary bg-transparent"
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
