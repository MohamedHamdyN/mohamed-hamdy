import { toggleSettings } from "@/admin/toggle"
import { notFound } from "next/navigation"
import ProjectsGrid from "@/components/projects/ProjectsGrid"
import PageHero from "@/components/shared/PageHero"
import { BarChart3 } from "lucide-react"

export default function ProjectsPage() {
  // If projects page is disabled, return 404
  if (!toggleSettings.projects_page) {
    notFound()
  }

  return (
    <>
      <PageHero
        title="Projects"
        description="Explore my data analysis work and case studies"
        icon={<BarChart3 className="h-4 w-4" />}
      />
      <ProjectsGrid />
    </>
  )
}
