"use client"

import { Calendar } from "@/components/ui/calendar"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { projects, projectCategories, projectCategoriesName } from "@/admin/projects"
import { profile } from "@/admin/profile"
import ProjectCard from "./ProjectCard"
import ProjectModal from "./ProjectModal"
import { useTranslations } from "@/hooks/useTranslations"
import { Search, SlidersHorizontal, Grid, List, Filter } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import Image from "next/image"

export default function ProjectsGrid() {
  const t = useTranslations()
  const [selectedProject, setSelectedProject] = useState<any>(null)
  const [selectedCategory, setSelectedCategory] = useState<string | number>("all")
  const [searchQuery, setSearchQuery] = useState("")
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid")
  const [sortOption, setSortOption] = useState("newest")
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [isFilterOpen, setIsFilterOpen] = useState(true)

  // Contar proyectos por categoría
  const projectCounts = {
    all: projects.length,
  } as Record<string | number, number>

  projects.forEach((project) => {
    projectCounts[project.categoryId] = (projectCounts[project.categoryId] || 0) + 1
  })

  // Get unique categories with counts
  const categories = [
    { id: "all", label: t.projects.filters.all, count: projectCounts.all },
    ...Object.entries(projectCategoriesName).map(([id, name]) => {
      return {
        id: Number(id),
        label: name,
        count: projectCounts[Number(id)] || 0,
      }
    }),
  ]

  // Filter projects based on category and search query
  const filteredProjects = projects.filter((project) => {
    const matchesCategory = selectedCategory === "all" || project.categoryId === selectedCategory
    const matchesSearch =
      project.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      project.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      project.shortDescription.toLowerCase().includes(searchQuery.toLowerCase())
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
              <div className="flex flex-wrap gap-2 py-4 bg-card rounded-xl p-4">
                {categories.map((category) => (
                  <Button
                    key={category.id}
                    variant={selectedCategory === category.id ? "default" : "ghost"}
                    size="sm"
                    onClick={() => setSelectedCategory(category.id)}
                    className={`rounded-full ${selectedCategory === category.id ? "bg-primary text-primary-foreground" : "bg-muted hover:bg-muted/80 text-foreground"}`}
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
                      src={project.image || profile.defaultProjectImage}
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
                        {projectCategoriesName[project.categoryId as keyof typeof projectCategoriesName] ||
                          projectCategories[project.categoryId as keyof typeof projectCategories]}
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
