export const dynamic = "force-dynamic"

import Hero from "@/components/home/Hero"
import Skills from "@/components/home/Skills"
import WhyWorkWithMe from "@/components/home/WhyWorkWithMe"
import Clients from "@/components/home/Clients"
import FeaturedProjects from "@/components/home/FeaturedProjects"
import ContactCTA from "@/components/shared/ContactCTA"
import { Suspense } from "react"
import { toggleSettings } from "@/admin/toggle"

// مكونات التحميل البسيطة
const SkillsLoading = () => <div className="h-96 bg-background animate-pulse"></div>
const WhyWorkWithMeLoading = () => <div className="h-96 bg-background animate-pulse"></div>
const ClientsLoading = () => <div className="h-96 bg-background animate-pulse"></div>
const FeaturedProjectsLoading = () => <div className="h-96 bg-background animate-pulse"></div>
const ContactCTALoading = () => <div className="h-96 bg-background animate-pulse"></div>

export default function Home() {
  // استخدام toggleSettings بدلاً من متغيرات البيئة مباشرة
  const websiteEnabled = toggleSettings.website

  // If website is disabled, only show the Hero component
  if (!websiteEnabled) {
    return <Hero />
  }

  // Create an array of sections to render based on toggle settings
  const sections = []

  // Add sections based on toggle settings
  if (toggleSettings.skills) {
    sections.push({
      id: "skills",
      component: (
        <Suspense key="skills" fallback={<SkillsLoading />}>
          <Skills />
        </Suspense>
      ),
      order: toggleSettings.homeSectionsOrder?.skills || 1,
    })
  }

  if (toggleSettings.why_work_with_me) {
    sections.push({
      id: "why-work-with-me",
      component: (
        <Suspense key="why-work-with-me" fallback={<WhyWorkWithMeLoading />}>
          <WhyWorkWithMe />
        </Suspense>
      ),
      order: toggleSettings.homeSectionsOrder?.why_work_with_me || 2,
    })
  }

  if (toggleSettings.clients) {
    sections.push({
      id: "clients",
      component: (
        <Suspense key="clients" fallback={<ClientsLoading />}>
          <Clients />
        </Suspense>
      ),
      order: toggleSettings.homeSectionsOrder?.clients || 4,
    })
  }

  if (toggleSettings.projects_home) {
    sections.push({
      id: "featured-projects",
      component: (
        <Suspense key="featured-projects" fallback={<FeaturedProjectsLoading />}>
          <FeaturedProjects />
        </Suspense>
      ),
      order: toggleSettings.homeSectionsOrder?.projects || 3,
    })
  }

  if (toggleSettings.contact_home) {
    sections.push({
      id: "contact-cta",
      component: (
        <Suspense key="contact-cta" fallback={<ContactCTALoading />}>
          <ContactCTA />
        </Suspense>
      ),
      order: toggleSettings.homeSectionsOrder?.contact || 5,
    })
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
