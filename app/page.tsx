export const dynamic = "force-dynamic"

import { lazy } from "react"
import Hero from "@/components/home/Hero"
import LazySection from "@/components/shared/LazySection"
import { getSettings } from "@/lib/settings"

// Lazy load components
const Skills = lazy(() => import("@/components/home/Skills"))
const WhyWorkWithMe = lazy(() => import("@/components/home/WhyWorkWithMe"))
const Clients = lazy(() => import("@/components/home/Clients"))
const FeaturedProjects = lazy(() => import("@/components/home/FeaturedProjects"))
const ContactCTA = lazy(() => import("@/components/shared/ContactCTA"))

export default async function Home() {
  const settings = await getSettings()

  if (!settings.website) {
    return <Hero />
  }

  const sections = []

  if (settings.skills) {
    sections.push({
      component: (
        <LazySection key="skills" className="py-20">
          <Skills />
        </LazySection>
      ),
      order: 1,
    })
  }

  if (settings.why_work_with_me) {
    sections.push({
      component: (
        <LazySection key="why-work-with-me" className="py-20">
          <WhyWorkWithMe />
        </LazySection>
      ),
      order: 2,
    })
  }

  if (settings.clients) {
    sections.push({
      component: (
        <LazySection key="clients" className="py-20">
          <Clients />
        </LazySection>
      ),
      order: 4,
    })
  }

  if (settings.projects_home) {
    sections.push({
      component: (
        <LazySection key="featured-projects" className="py-20">
          <FeaturedProjects />
        </LazySection>
      ),
      order: 3,
    })
  }

  if (settings.contact_home) {
    sections.push({
      component: (
        <LazySection key="contact-cta" className="py-20">
          <ContactCTA />
        </LazySection>
      ),
      order: 5,
    })
  }

  sections.sort((a, b) => a.order - b.order)

  return (
    <>
      <Hero />
      {sections.map((section) => section.component)}
    </>
  )
}
