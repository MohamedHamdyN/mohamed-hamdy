"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { profile } from "@/admin/profile"
import { projectCategories, projectCategoriesName } from "@/admin/projects"
import { useTranslations } from "@/hooks/useTranslations"
import { ArrowUpRight, Calendar, ExternalLink } from "lucide-react"
import Image from "next/image"
import { Button } from "@/components/ui/button"

export default function ProjectCard({ project, onClick = () => {} }) {
  const t = useTranslations()
  const [imageError, setImageError] = useState(false)

  const handleImageError = () => {
    setImageError(true)
  }

  // Get category name from the new file
  const categoryName =
    projectCategoriesName[project.categoryId as keyof typeof projectCategoriesName] ||
    projectCategories[project.categoryId as keyof typeof projectCategories]

  // Define technology colors
  const techColors = [
    "bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-300",
    "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-300",
    "bg-purple-100 text-purple-700 dark:bg-purple-900/30 dark:text-purple-300",
    "bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-300",
    "bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-300",
    "bg-indigo-100 text-indigo-700 dark:bg-indigo-900/30 dark:text-indigo-300",
  ]

  return (
    <motion.div
      className="group relative bg-card border border-border rounded-xl overflow-hidden hover:shadow-lg transition-all duration-300 h-full flex flex-col cursor-pointer"
      whileHover={{ y: -5 }}
      onClick={() => onClick(project)}
    >
      <div className="relative h-48 overflow-hidden">
        <Image
          src={imageError ? profile.defaultProjectImage : project.image || profile.defaultProjectImage}
          alt={project.title || "Project"}
          className="object-cover transition-transform duration-500 group-hover:scale-110"
          onError={handleImageError}
          fill
          unoptimized
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
      </div>
      <div className="p-5 flex-grow flex flex-col">
        <div className="flex justify-between items-start mb-2">
          <h3 className="text-lg font-bold line-clamp-1">{project.title || "Project Title"}</h3>
          <span className="text-xs bg-primary/10 text-primary px-2 py-1 rounded-full capitalize">{categoryName}</span>
        </div>
        <div className="flex items-center text-xs text-muted-foreground mb-3">
          <Calendar className="h-3 w-3 mr-1" />
          <time dateTime={project.date}>{project.date}</time>
        </div>
        <p className="text-muted-foreground text-sm mb-4 line-clamp-2 flex-grow">
          {project.shortDescription || project.description || "Project description"}
        </p>

        {/* Technologies with better visibility */}
        <div className="flex flex-wrap gap-1 mb-4">
          {project.technologies?.slice(0, 3).map((tech, index) => (
            <span
              key={index}
              className={`text-xs px-2 py-1 rounded-full font-medium ${techColors[index % techColors.length]}`}
            >
              {tech}
            </span>
          )) || <span className="text-xs bg-secondary/10 text-secondary px-2 py-1 rounded-full">Technology</span>}
          {project.technologies?.length > 3 && (
            <span className="text-xs bg-gray-100 text-gray-700 dark:bg-gray-800 dark:text-gray-300 px-2 py-1 rounded-full">
              +{project.technologies.length - 3}
            </span>
          )}
        </div>

        {/* Action buttons */}
        <div className="flex gap-2 mt-auto">
          <Button
            size="sm"
            className="flex-1 flex items-center justify-center gap-1"
            onClick={(e) => {
              e.stopPropagation()
              onClick(project)
            }}
          >
            <span>Preview Dashboard</span>
            <ArrowUpRight className="h-3 w-3" />
          </Button>

          {project.projectUrl && (
            <Button
              variant="outline"
              size="icon"
              className="aspect-square"
              onClick={(e) => {
                e.stopPropagation()
                window.open(project.projectUrl, "_blank", "noopener,noreferrer")
              }}
            >
              <ExternalLink className="h-4 w-4" />
            </Button>
          )}
        </div>
      </div>
    </motion.div>
  )
}
