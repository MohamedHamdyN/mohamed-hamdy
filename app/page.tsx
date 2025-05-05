export const dynamic = "force-dynamic"

import Hero from "@/components/home/Hero"
import Skills from "@/components/home/Skills"
import WhyWorkWithMe from "@/components/home/WhyWorkWithMe"
import Clients from "@/components/home/Clients"
import FeaturedProjects from "@/components/home/FeaturedProjects"
import ContactCTA from "@/components/shared/ContactCTA"

export default function Home() {
  // Check if website is enabled from environment variable
  const websiteEnabled = process.env.DISABLE_WEBSITE !== "true"

  // If website is disabled, only show the Hero component
  if (!websiteEnabled) {
    return <Hero />
  }

  // Create an array of sections to render based on environment variables
  const sections = []

  // Add sections based on environment variables
  if (process.env.DISABLE_SKILLS !== "true") {
    sections.push({ component: <Skills key="skills" />, order: 1 })
  }

  if (process.env.DISABLE_WHY_WORK_WITH_ME !== "true") {
    sections.push({ component: <WhyWorkWithMe key="why-work-with-me" />, order: 2 })
  }

  if (process.env.DISABLE_CLIENTS !== "true") {
    sections.push({ component: <Clients key="clients" />, order: 4 })
  }

  if (process.env.DISABLE_PROJECTS_HOME !== "true") {
    sections.push({ component: <FeaturedProjects key="featured-projects" />, order: 3 })
  }

  if (process.env.DISABLE_CONTACT_HOME !== "true") {
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
