"use client"

import { useMemo, useState } from "react"
import { motion } from "framer-motion"
import { useProfile } from "@/context/profile-context"
import { ArrowUpRight, Calendar, ExternalLink } from "lucide-react"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { useTranslations } from "@/hooks/useTranslations"
import { projectCategories, projectCategoriesName } from "@/admin/projects"

export default function ProjectCard({ project, onClick = () => { } }: any) {
  const t = useTranslations()
  const profile = useProfile()
  const [imageError, setImageError] = useState(false)

  const normalized = useMemo(() => {
    // ✅ normalize DB fields
    const categoryId = project.categoryId ?? project.category_id ?? project.category ?? null
    return {
      id: project.id,
      title: project.title ?? "Project Title",
      date: project.date ?? project.created_at ?? project.createdAt ?? "",
      image: project.image ?? project.image_url ?? project.imageUrl ?? "",
      shortDescription: project.shortDescription ?? project.short_description ?? "",
      description: project.description ?? "", // ✅ full description
      technologies: project.technologies ?? project.tech_stack ?? project.techStack ?? [],
      projectUrl: project.projectUrl ?? project.project_url ?? project.url ?? "",
      categoryId,
    }
  }, [project])

  const defaultProjectImage =
    (profile as any)?.defaultProjectImage ??
    (profile as any)?.default_project_image ??
    "/placeholder.jpg"

  const categoryName =
    projectCategoriesName[normalized.categoryId as keyof typeof projectCategoriesName] ||
    projectCategories[normalized.categoryId as keyof typeof projectCategories] ||
    "Category"

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
      onClick={(e) => {
        // لو الضغط كان على لينك/انكور جوّه الكارد، امنع الـ navigation
        const target = e.target as HTMLElement
        if (target.closest("a")) {
          e.preventDefault()
          e.stopPropagation()
          return
        }
        onClick(normalized)
      }}
    >
      <div className="relative h-48 overflow-hidden">
        <Image
          src={imageError ? defaultProjectImage : (normalized.image?.trim() || defaultProjectImage)}
          alt={normalized.title}
          className="object-cover transition-transform duration-500 group-hover:scale-110"
          onError={() => setImageError(true)}
          fill
          unoptimized
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
      </div>

      <div className="p-5 flex-grow flex flex-col">
        <div className="flex justify-between items-start mb-2">
          <h3 className="text-lg font-bold line-clamp-1">{normalized.title}</h3>
          <span className="text-xs bg-primary/10 text-primary px-2 py-1 rounded-full capitalize">
            {categoryName}
          </span>
        </div>

        {!!normalized.date && (
          <div className="flex items-center text-xs text-muted-foreground mb-3">
            <Calendar className="h-3 w-3 mr-1" />
            <time>{normalized.date}</time>
          </div>
        )}

        <p className="text-muted-foreground text-sm mb-4 line-clamp-2 flex-grow">
          {normalized.shortDescription || "Project description"}
        </p>

        <div className="flex flex-wrap gap-1 mb-4">
          {(normalized.technologies || []).slice(0, 3).map((tech: string, index: number) => (
            <span key={index} className={`text-xs px-2 py-1 rounded-full font-medium ${techColors[index % techColors.length]}`}>
              {tech}
            </span>
          ))}
          {(normalized.technologies || []).length > 3 && (
            <span className="text-xs bg-gray-100 text-gray-700 dark:bg-gray-800 dark:text-gray-300 px-2 py-1 rounded-full">
              +{normalized.technologies.length - 3}
            </span>
          )}
        </div>

        <div className="flex gap-2 mt-auto">
          <Button
            size="sm"
            className="flex-1 flex items-center justify-center gap-1"
            onClick={(e) => {
              e.preventDefault()
              e.stopPropagation()
              onClick(normalized)
            }}
          >
            <span>{t.projects.viewProject}</span>
            <ArrowUpRight className="h-3 w-3" />
          </Button>

          {!!normalized.projectUrl && (
            <Button
              variant="outline"
              size="icon"
              className="aspect-square"
              onClick={(e) => {
                e.stopPropagation()
                window.open(normalized.projectUrl, "_blank", "noopener,noreferrer")
              }}
              aria-label="Open project"
            >
              <ExternalLink className="h-4 w-4" />
            </Button>
          )}
        </div>
      </div>
    </motion.div>
  )
}