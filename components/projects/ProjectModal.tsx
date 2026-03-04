"use client"

import { useEffect, useRef, useState } from "react"
import { AnimatePresence, motion } from "framer-motion"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { useProfile } from "@/context/profile-context"
import { useTranslations } from "@/hooks/useTranslations"
import { projectCategories, projectCategoriesName } from "@/admin/projects"
import { X, Linkedin, Calendar, Tag, BarChart } from "lucide-react"

type AnyProject = any

export default function ProjectModal({
  project,
  isOpen,
  onClose,
}: {
  project: AnyProject
  isOpen: boolean
  onClose: () => void
}) {
  const t = useTranslations()
  const profile = useProfile()
  const modalRef = useRef<HTMLDivElement>(null)

  const [imageLoaded, setImageLoaded] = useState(false)
  const [imageError, setImageError] = useState(false)

  // ✅ Normalize (يدعم DB snake_case + UI camelCase)
  const normalized = {
    title: project?.title ?? "Project",
    date: project?.date ?? project?.created_at ?? "",
    image: project?.image ?? project?.image_url ?? "",
    // ✅ هنا المهم: المودال لازم يستخدم description الكامل
    description: project?.description ?? "",
    shortDescription: project?.shortDescription ?? project?.short_description ?? "",
    technologies: project?.technologies ?? project?.tech_stack ?? [],
    projectUrl: project?.projectUrl ?? project?.project_url ?? "",
    linkedinUrl: project?.linkedinUrl ?? project?.linkedin_url ?? "",
    categoryId: project?.categoryId ?? project?.category_id ?? null,
  }

  const defaultProjectImage =
    (profile as any)?.defaultProjectImage ??
    (profile as any)?.default_project_image ??
    "/placeholder.jpg"

  const categoryName =
    projectCategoriesName[normalized.categoryId as keyof typeof projectCategoriesName] ||
    projectCategories[normalized.categoryId as keyof typeof projectCategories] ||
    "Category"

  // ESC close
  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isOpen) onClose()
    }
    window.addEventListener("keydown", onKeyDown)
    return () => window.removeEventListener("keydown", onKeyDown)
  }, [isOpen, onClose])

  // focus trap (اختياري بس مفيد)
  useEffect(() => {
    if (!isOpen || !modalRef.current) return
    const focusables = modalRef.current.querySelectorAll<HTMLElement>(
      'button,[href],input,select,textarea,[tabindex]:not([tabindex="-1"])'
    )
    if (!focusables.length) return
    focusables[0].focus()
  }, [isOpen])

  const handleBackdropClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget) onClose()
  }

  const techColors = [
    "bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-300",
    "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-300",
    "bg-purple-100 text-purple-700 dark:bg-purple-900/30 dark:text-purple-300",
    "bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-300",
    "bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-300",
    "bg-indigo-100 text-indigo-700 dark:bg-indigo-900/30 dark:text-indigo-300",
  ]

  return (
    <AnimatePresence>
      {isOpen && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm"
          role="dialog"
          aria-modal="true"
          onClick={handleBackdropClick}
        >
          <motion.div
            ref={modalRef}
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.2 }}
            className="bg-card rounded-xl overflow-hidden border border-border max-w-2xl w-full max-h-[90vh] overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="relative h-64">
              <Button
                variant="ghost"
                size="icon"
                className="absolute top-2 right-2 z-10 bg-background/80 backdrop-blur-sm hover:bg-background"
                onClick={onClose}
                aria-label="Close"
              >
                <X className="h-5 w-5" />
              </Button>

              {!imageLoaded && (
                <div className="absolute inset-0 flex items-center justify-center bg-muted/20 backdrop-blur-sm z-10">
                  <div className="w-8 h-8 border-2 border-primary border-t-transparent rounded-full animate-spin" />
                </div>
              )}

              <Image
                src={imageError ? defaultProjectImage : (normalized.image?.trim() || defaultProjectImage)}
                alt={normalized.title}
                fill
                className="object-cover"
                unoptimized
                priority
                onLoad={() => setImageLoaded(true)}
                onError={() => setImageError(true)}
              />
            </div>

            <div className="p-6">
              <h2 className="text-2xl font-bold mb-2">{normalized.title}</h2>

              <div className="flex flex-wrap gap-2 mb-4">
                {!!normalized.date && (
                  <div className="flex items-center text-sm text-muted-foreground">
                    <Calendar className="h-4 w-4 mr-1" />
                    <span>{normalized.date}</span>
                  </div>
                )}
                <div className="flex items-center text-sm text-muted-foreground">
                  <Tag className="h-4 w-4 mr-1" />
                  <span>{categoryName}</span>
                </div>
              </div>

              {/* ✅ هنا: description الكامل */}
              <p className="text-foreground mb-6 whitespace-pre-wrap">
                {normalized.description || normalized.shortDescription || "No description yet."}
              </p>

              {!!(normalized.technologies?.length) && (
                <div className="mb-6">
                  <h3 className="text-lg font-semibold mb-2">Technologies</h3>
                  <div className="flex flex-wrap gap-2">
                    {normalized.technologies.map((tech: string, index: number) => (
                      <span
                        key={`${tech}-${index}`}
                        className={`px-3 py-1 rounded-full text-sm font-medium ${techColors[index % techColors.length]}`}
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              <div className="flex flex-wrap gap-3">
                {!!normalized.linkedinUrl && (
                  <Button
                    variant="outline"
                    className="flex items-center gap-2"
                    onClick={() => window.open(normalized.linkedinUrl, "_blank", "noopener,noreferrer")}
                  >
                    <Linkedin className="h-5 w-5" />
                    <span>{t?.projects?.viewOnLinkedIn || "View on LinkedIn"}</span>
                  </Button>
                )}

                {!!normalized.projectUrl && (
                  <Button
                    className="flex items-center gap-2"
                    onClick={() => window.open(normalized.projectUrl, "_blank", "noopener,noreferrer")}
                  >
                    <BarChart className="h-5 w-5" />
                    <span>Preview Dashboard</span>
                  </Button>
                )}
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  )
}