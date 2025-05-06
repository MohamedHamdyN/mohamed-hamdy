export const dynamic = "force-dynamic"

import Hero from "@/components/home/Hero"
import Skills from "@/components/home/Skills"
import WhyWorkWithMe from "@/components/home/WhyWorkWithMe"
import Clients from "@/components/home/Clients"
import FeaturedProjects from "@/components/home/FeaturedProjects"
import ContactCTA from "@/components/shared/ContactCTA"
import { clientSettings } from "@/admin/toggle"

export default function Home() {
  // Check if website is enabled from client settings
  const websiteEnabled = clientSettings.website

  // If website is disabled, only show the Hero component
  if (!websiteEnabled) {
    return <Hero />
  }

  // Create an array of sections to render based on client settings
  const sections = []

  // Add sections based on client settings
  if (clientSettings.skills) {
    sections.push({ component: <Skills key="skills" />, order: 1 })
  }

  if (clientSettings.why_work_with_me) {
    sections.push({ component: <WhyWorkWithMe key="why-work-with-me" />, order: 2 })
  }

  if (clientSettings.clients) {
    sections.push({ component: <Clients key="clients" />, order: 4 })
  }

  if (clientSettings.projects_home) {
    sections.push({ component: <FeaturedProjects key="featured-projects" />, order: 3 })
  }

  if (clientSettings.contact_home) {
    sections.push({ component: <ContactCTA key="contact-cta" />, order: 5 })
  }

  // Sort sections by order
  sections.sort((a, b) => a.order - b.order)

  return (
    <>
      <Hero />

      {/* Render sections in the specified order */}
      {sections.map((section) => section.component)}
    </>
  )
}
