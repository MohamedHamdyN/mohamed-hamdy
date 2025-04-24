"use client"

import type React from "react"

import { motion, AnimatePresence } from "framer-motion"
import { type Project, projectCategories, projectCategoriesName } from "@/admin/projects"
import { useTranslations } from "@/hooks/useTranslations"
import { Button } from "@/components/ui/button"
import { X, ExternalLink, Linkedin, Calendar, Tag } from "lucide-react"
import { useEffect, useRef, useState } from "react"
import Image from "next/image"
import { profile } from "@/admin/profile"

interface ProjectModalProps {
  project: Project
  isOpen: boolean
  onClose: () => void
}

export default function ProjectModal({ project, isOpen, onClose }: ProjectModalProps) {
  const t = useTranslations()
  const modalRef = useRef<HTMLDivElement>(null)
  const [imageLoaded, setImageLoaded] = useState(false)
  const [imageError, setImageError] = useState(false)

  // Get category display name
  const categoryName =
    projectCategoriesName[project.categoryId as keyof typeof projectCategoriesName] ||
    projectCategories[project.categoryId as keyof typeof projectCategories]

  // Handle escape key press
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isOpen) {
        onClose()
      }
    }

    window.addEventListener("keydown", handleKeyDown)
    return () => window.removeEventListener("keydown", handleKeyDown)
  }, [isOpen, onClose])

  // Handle focus trap
  useEffect(() => {
    if (isOpen && modalRef.current) {
      const focusableElements = modalRef.current.querySelectorAll(
        'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])',
      )

      if (focusableElements.length > 0) {
        const firstElement = focusableElements[0] as HTMLElement
        const lastElement = focusableElements[focusableElements.length - 1] as HTMLElement

        firstElement.focus()

        const handleTabKey = (e: KeyboardEvent) => {
          if (e.key === "Tab") {
            if (e.shiftKey && document.activeElement === firstElement) {
              e.preventDefault()
              lastElement.focus()
            } else if (!e.shiftKey && document.activeElement === lastElement) {
              e.preventDefault()
              firstElement.focus()
            }
          }
        }

        modalRef.current.addEventListener("keydown", handleTabKey)
        return () => {
          if (modalRef.current) {
            modalRef.current.removeEventListener("keydown", handleTabKey)
          }
        }
      }
    }
  }, [isOpen])

  // Handle click outside to close
  const handleBackdropClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget) {
      onClose()
    }
  }

  const handleImageError = () => {
    setImageError(true)
  }

  return (
    <AnimatePresence>
      {isOpen && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm"
          role="dialog"
          aria-modal="true"
          aria-labelledby="modal-title"
          onClick={handleBackdropClick}
        >
          <motion.div
            ref={modalRef}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            transition={{ duration: 0.3 }}
            className="bg-card rounded-xl overflow-hidden border border-border max-w-2xl w-full max-h-[90vh] overflow-y-auto"
            onClick={(e) => e.stopPropagation()} // Prevent clicks inside modal from closing it
          >
            <div className="relative h-64">
              <Button
                variant="ghost"
                size="icon"
                className="absolute top-2 right-2 z-10 bg-background/80 backdrop-blur-sm hover:bg-background"
                onClick={onClose}
                aria-label="Close modal"
              >
                <X className="h-5 w-5" aria-hidden="true" />
              </Button>

              <div
                className="absolute inset-0 flex items-center justify-center bg-muted/20 backdrop-blur-sm z-10 transition-opacity duration-300"
                style={{ opacity: imageLoaded ? 0 : 1 }}
              >
                <div className="w-8 h-8 border-2 border-primary border-t-transparent rounded-full animate-spin"></div>
              </div>

              <Image
                src={imageError ? profile.defaultProjectImage : project.image || profile.defaultProjectImage}
                alt={`Project banner for ${project.title}`}
                fill
                className="object-cover"
                priority
                unoptimized
                onLoad={() => setImageLoaded(true)}
                onError={handleImageError}
              />
            </div>
            <div className="p-6">
              <h2 id="modal-title" className="text-2xl font-bold mb-2">
                {project.title}
              </h2>

              <div className="flex flex-wrap gap-2 mb-4">
                <div className="flex items-center text-sm text-muted-foreground">
                  <Calendar className="h-4 w-4 mr-1" aria-hidden="true" />
                  <time dateTime={project.date}>{project.date}</time>
                </div>
                <div className="flex items-center text-sm text-muted-foreground">
                  <Tag className="h-4 w-4 mr-1" aria-hidden="true" />
                  <span>{categoryName}</span>
                </div>
              </div>

              <p className="text-foreground mb-6">{project.description}</p>

              <div className="mb-6">
                <h3 className="text-lg font-semibold mb-2">Technologies</h3>
                <div className="flex flex-wrap gap-2">
                  {project.technologies.map((tech, index) => (
                    <span key={index} className="px-3 py-1 bg-primary/10 text-primary rounded-full text-sm">
                      {tech}
                    </span>
                  ))}
                </div>
              </div>

              <div className="flex flex-wrap gap-4">
                {project.linkedinUrl && (
                  <Button
                    variant="outline"
                    className="flex items-center gap-2 border-blue-500/30 text-blue-500 hover:bg-blue-500/10"
                    onClick={() => window.open(project.linkedinUrl, "_blank", "noopener noreferrer")}
                  >
                    <Linkedin className="h-5 w-5" aria-hidden="true" />
                    <span>{t.projects.viewOnLinkedIn}</span>
                  </Button>
                )}
                {project.projectUrl && (
                  <Button
                    variant="default"
                    className="flex items-center gap-2"
                    onClick={() => window.open(project.projectUrl, "_blank", "noopener noreferrer")}
                  >
                    <ExternalLink className="h-5 w-5" aria-hidden="true" />
                    <span>{t.projects.viewProject}</span>
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
