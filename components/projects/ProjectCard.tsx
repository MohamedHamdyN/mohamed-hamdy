"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { profile } from "@/admin/profile"
import { projectCategories, projectCategoriesName } from "@/admin/projects"
import { useTranslations } from "@/hooks/useTranslations"
import { ArrowUpRight, Calendar } from "lucide-react"
import Image from "next/image"

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
        <div className="absolute bottom-4 right-4 bg-primary text-primary-foreground rounded-full p-2 opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-y-4 group-hover:translate-y-0">
          <ArrowUpRight className="h-5 w-5" />
        </div>
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
        <div className="flex flex-wrap gap-1 mt-auto">
          {project.technologies?.slice(0, 3).map((tech, index) => (
            <span key={index} className="text-xs bg-secondary/10 text-secondary px-2 py-1 rounded-full">
              {tech}
            </span>
          )) || <span className="text-xs bg-secondary/10 text-secondary px-2 py-1 rounded-full">Technology</span>}
          {project.technologies?.length > 3 && (
            <span className="text-xs bg-secondary/10 text-secondary px-2 py-1 rounded-full">
              +{project.technologies.length - 3}
            </span>
          )}
        </div>
      </div>
    </motion.div>
  )
}
