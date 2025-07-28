import { getSetting } from "@/lib/settings"
import { notFound } from "next/navigation"
import ProjectsGrid from "@/components/projects/ProjectsGrid"
import PageHero from "@/components/shared/PageHero"
import { BarChart3 } from "lucide-react"

export default async function ProjectsPage() {
  // Check if projects page is enabled
  const projectsEnabled = await getSetting("projects_page")

  if (!projectsEnabled) {
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
