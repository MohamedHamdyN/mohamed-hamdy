import { toggleSettings } from "@/admin/toggle"
import { notFound } from "next/navigation"
import ProjectsGrid from "@/components/projects/ProjectsGrid"
import PageHeader from "@/components/shared/PageHeader"

export default function ProjectsPage() {
  // If projects page is disabled, return 404
  if (!toggleSettings.projects_page) {
    notFound()
  }

  return (
    <>
      <PageHeader title="Projects" description="Explore my data analysis work and case studies" />
      <ProjectsGrid />
    </>
  )
}
