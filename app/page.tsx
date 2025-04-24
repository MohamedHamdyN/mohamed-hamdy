export const dynamic = "force-dynamic"

import { toggleSettings, homeSectionsOrder } from "@/admin/toggle"
import Hero from "@/components/home/Hero"
import Skills from "@/components/home/Skills"
import WhyWorkWithMe from "@/components/home/WhyWorkWithMe"
import Clients from "@/components/home/Clients"
import FeaturedProjects from "@/components/home/FeaturedProjects"
import ContactCTA from "@/components/shared/ContactCTA"

export default function Home() {
  // If website is disabled, only show the Hero component
  if (!toggleSettings.website) {
    return <Hero />
  }

  // Create an array of sections to render
  const sections = []

  // Add sections based on toggle settings and order
  if (toggleSettings.skills) {
    sections.push({ component: <Skills key="skills" />, order: homeSectionsOrder.skills })
  }

  if (toggleSettings.why_work_with_me) {
    sections.push({ component: <WhyWorkWithMe key="why-work-with-me" />, order: homeSectionsOrder.why_work_with_me })
  }

  if (toggleSettings.clients) {
    sections.push({ component: <Clients key="clients" />, order: homeSectionsOrder.clients })
  }

  if (toggleSettings.projects_home) {
    sections.push({ component: <FeaturedProjects key="featured-projects" />, order: homeSectionsOrder.projects })
  }

  if (toggleSettings.contact_home) {
    sections.push({ component: <ContactCTA key="contact-cta" />, order: homeSectionsOrder.contact })
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
