"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { projectsService, projectCategoriesService } from "@/lib/database"
import ProjectCard from "./ProjectCard"
import ProjectModal from "./ProjectModal"
import { useTranslations } from "@/hooks/useTranslations"
import { Search, SlidersHorizontal, Grid, List, Filter, Calendar } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import Image from "next/image"
import { useTheme } from "next-themes"
import type { Project, ProjectCategory } from "@/lib/supabase"

export default function ProjectsGrid() {
  const [projects, setProjects] = useState<Project[]>([])
  const [categories, setCategories] = useState<ProjectCategory[]>([])
  const [loading, setLoading] = useState(true)
  const [selectedProject, setSelectedProject] = useState<any>(null)
  const [selectedCategory, setSelectedCategory] = useState<string | number>("all")
  const [searchQuery, setSearchQuery] = useState("")
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid")
  const [sortOption, setSortOption] = useState("newest")
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [isFilterOpen, setIsFilterOpen] = useState(true)
  const t = useTranslations()
  const { theme } = useTheme()

  useEffect(() => {
    async function fetchData() {
      try {
        const [projectsData, categoriesData] = await Promise.all([
          projectsService.getProjects(),
          projectCategoriesService.getProjectCategories(),
        ])
        setProjects(projectsData)
        setCategories(categoriesData)
      } catch (error) {
        console.error("Error fetching projects:", error)
      } finally {
        setLoading(false)
      }
    }

    fetchData()
  }, [])

  // Count projects by category
  const projectCounts = {
    all: projects.length,
  } as Record<string | number, number>

  projects.forEach((project) => {
    projectCounts[project.category_id] = (projectCounts[project.category_id] || 0) + 1
  })

  // Get unique categories with counts
  const filterCategories = [
    { id: "all", label: t.projects.filters.all, count: projectCounts.all },
    ...categories.map((category) => ({
      id: category.id,
      label: category.name,
      count: projectCounts[category.id] || 0,
    })),
  ]

  // Filter projects based on category and search query
  const filteredProjects = projects.filter((project) => {
    const matchesCategory = selectedCategory === "all" || project.category_id === selectedCategory
    const matchesSearch =
      project.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      project.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      project.short_description.toLowerCase().includes(searchQuery.toLowerCase())
    return matchesCategory && matchesSearch
  })

  // Sort projects
  const sortedProjects = [...filteredProjects].sort((a, b) => {
    if (sortOption === "newest") {
      return new Date(b.date).getTime() - new Date(a.date).getTime()
    } else if (sortOption === "oldest") {
      return new Date(a.date).getTime() - new Date(b.date).getTime()
    } else if (sortOption === "a-z") {
      return a.title.localeCompare(b.title)
    } else if (sortOption === "z-a") {
      return b.title.localeCompare(a.title)
    }
    return 0
  })

  const handleProjectClick = (project: any) => {
    setSelectedProject(project)
    setIsModalOpen(true)
  }

  const handleCloseModal = () => {
    setIsModalOpen(false)
  }

  // Close modal when escape key is pressed
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        handleCloseModal()
      }
    }
    window.addEventListener("keydown", handleKeyDown)
    return () => window.removeEventListener("keydown", handleKeyDown)
  }, [])

  if (loading) {
    return (
      <section className="py-12 bg-background">
        <div className="container mx-auto px-4">
          <div className="mb-8 flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
            <div>
              <div className="h-8 bg-muted animate-pulse rounded mb-2 w-48"></div>
              <div className="h-4 bg-muted animate-pulse rounded w-32"></div>
            </div>
            <div className="flex gap-3">
              <div className="h-10 w-64 bg-muted animate-pulse rounded"></div>
              <div className="h-10 w-40 bg-muted animate-pulse rounded"></div>
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
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

  return (
    <section className="py-12 bg-background">
      <div className="container mx-auto px-4">
        {/* Projects count and filters */}
        <div className="mb-8 flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <div>
            <h2 className="text-2xl font-bold mb-2">{t.projects.allProjects}</h2>
            <p className="text-muted-foreground">
              {filteredProjects.length} {filteredProjects.length === 1 ? t.projects.project : t.projects.projects}
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-3 w-full md:w-auto">
            <div className="relative w-full sm:w-64">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                type="text"
                placeholder={t.projects.searchProjects}
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-9 w-full"
              />
            </div>

            <div className="flex gap-2">
              <Select value={sortOption} onValueChange={setSortOption}>
                <SelectTrigger className="w-full sm:w-40">
                  <SlidersHorizontal className="h-4 w-4 mr-2" />
                  <SelectValue placeholder={t.projects.sort} />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="newest">{t.projects.newest}</SelectItem>
                  <SelectItem value="oldest">{t.projects.oldest}</SelectItem>
                  <SelectItem value="a-z">A-Z</SelectItem>
                  <SelectItem value="z-a">Z-A</SelectItem>
                </SelectContent>
              </Select>

              <Button
                variant="outline"
                size="icon"
                onClick={() => setIsFilterOpen(!isFilterOpen)}
                className={isFilterOpen ? "bg-primary/10 text-primary" : ""}
              >
                <Filter className="h-4 w-4" />
              </Button>

              <div className="flex gap-1 border rounded-md">
                <Button
                  variant={viewMode === "grid" ? "default" : "ghost"}
                  size="icon"
                  onClick={() => setViewMode("grid")}
                  className="rounded-r-none"
                >
                  <Grid className="h-4 w-4" />
                </Button>
                <Button
                  variant={viewMode === "list" ? "default" : "ghost"}
                  size="icon"
                  onClick={() => setViewMode("list")}
                  className="rounded-l-none"
                >
                  <List className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </div>
        </div>

        {/* Categories */}
        <AnimatePresence>
          {isFilterOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              className="overflow-hidden mb-8"
            >
              <div
                className={`flex flex-wrap gap-2 py-4 rounded-xl p-4 ${theme === "dark" ? "bg-card" : "bg-gray-50"}`}
              >
                {filterCategories.map((category) => (
                  <Button
                    key={category.id}
                    variant={selectedCategory === category.id ? "default" : "ghost"}
                    size="sm"
                    onClick={() => setSelectedCategory(category.id)}
                    className={`rounded-full ${
                      selectedCategory === category.id
                        ? "bg-primary text-primary-foreground"
                        : theme === "dark"
                          ? "bg-muted hover:bg-muted/80 text-foreground"
                          : "bg-white hover:bg-gray-100 text-foreground shadow-sm"
                    }`}
                  >
                    {category.label} ({category.count})
                  </Button>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Projects grid */}
        {viewMode === "grid" ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {sortedProjects.map((project, index) => (
              <motion.div
                key={project.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <ProjectCard project={project} onClick={() => handleProjectClick(project)} />
              </motion.div>
            ))}
          </div>
        ) : (
          <div className="space-y-4">
            {sortedProjects.map((project, index) => (
              <motion.div
                key={project.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="bg-card border border-border rounded-lg overflow-hidden hover:shadow-lg transition-all duration-300 cursor-pointer"
                onClick={() => handleProjectClick(project)}
              >
                <div className="flex flex-col md:flex-row">
                  <div className="md:w-1/4 h-48 md:h-auto relative">
                    <Image
                      src={project.image || "/placeholder.svg"}
                      alt={project.title}
                      className="object-cover"
                      fill
                      unoptimized
                    />
                  </div>
                  <div className="p-6 md:w-3/4">
                    <div className="flex justify-between items-start mb-2">
                      <h3 className="text-xl font-bold">{project.title}</h3>
                      <span className="text-xs bg-primary/10 text-primary px-2 py-1 rounded-full capitalize">
                        {categories.find((cat) => cat.id === project.category_id)?.name || "Category"}
                      </span>
                    </div>
                    <div className="flex items-center text-xs text-muted-foreground mb-3">
                      <Calendar className="h-3 w-3 mr-1" />
                      <time dateTime={project.date} className="tabular-nums">
                        {project.date}
                      </time>
                    </div>
                    <p className="text-muted-foreground mb-4 line-clamp-2">{project.description}</p>
                    <div className="flex flex-wrap gap-2 mb-4">
                      {project.technologies.map((tech) => (
                        <span key={tech} className="text-xs bg-secondary/10 text-secondary px-2 py-1 rounded-full">
                          {tech}
                        </span>
                      ))}
                    </div>
                    <Button>{t.projects.viewProject}</Button>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        )}

        {/* No projects found */}
        {filteredProjects.length === 0 && (
          <div className="text-center py-12">
            <h3 className="text-xl font-bold mb-2">{t.projects.noProjectsFound}</h3>
            <p className="text-muted-foreground">{t.projects.tryDifferentFilters}</p>
          </div>
        )}

        {/* Project modal */}
        {selectedProject && <ProjectModal project={selectedProject} isOpen={isModalOpen} onClose={handleCloseModal} />}
      </div>
    </section>
  )
}
