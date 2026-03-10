export const dynamic = "force-dynamic"

import dynamicImport from "next/dynamic"
import Hero from "@/components/home/Hero"
import LazySection from "@/components/shared/LazySection"
import { universalSettings } from "@/admin/toggle"

// ✅ Next dynamic imports (safe with App Router)
const Skills = dynamicImport(() => import("@/components/home/Skills"), { ssr: true })
const AboutStats = dynamicImport(() => import("@/components/home/AboutStats"), { ssr: true })
const Clients = dynamicImport(() => import("@/components/home/Clients"), { ssr: true })
const FeaturedProjects = dynamicImport(() => import("@/components/home/FeaturedProjects"), { ssr: true })
const ContactCTA = dynamicImport(() => import("@/components/shared/ContactCTA"), { ssr: true })

export default function HomePage() {
  const websiteEnabled = universalSettings.website

  // لو الموقع مقفول من التوجل القديم
  if (!websiteEnabled) {
    return <Hero />
  }

  const sections: { order: number; component: JSX.Element }[] = []

  if (universalSettings.skills) {
    sections.push({
      order: 1,
      component: (
        <LazySection key="skills" className="py-20">
          <Skills />
        </LazySection>
      ),
    })
  }

  if (universalSettings.why_work_with_me) {
    sections.push({
      order: 2,
      component: (
        <LazySection key="about-stats" className="py-20">
          <AboutStats />
        </LazySection>
      ),
    })
  }

  if (universalSettings.projects_home) {
    sections.push({
      order: 3,
      component: (
        <LazySection key="featured-projects" className="py-20">
          <FeaturedProjects />
        </LazySection>
      ),
    })
  }

  if (universalSettings.clients) {
    sections.push({
      order: 4,
      component: (
        <LazySection key="clients" className="py-20">
          <Clients />
        </LazySection>
      ),
    })
  }

  if (universalSettings.contact_home) {
    sections.push({
      order: 5,
      component: (
        <LazySection key="contact-cta" className="py-20">
          <ContactCTA />
        </LazySection>
      ),
    })
  }

  sections.sort((a, b) => a.order - b.order)

  return (
    <>
      <Hero />
      {sections.map((s) => s.component)}
    </>
  )
}