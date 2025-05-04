export const dynamic = "force-dynamic"

import Hero from "@/components/home/Hero"
import Skills from "@/components/home/Skills"
import WhyWorkWithMe from "@/components/home/WhyWorkWithMe"
import Clients from "@/components/home/Clients"
import FeaturedProjects from "@/components/home/FeaturedProjects"
import ContactCTA from "@/components/shared/ContactCTA"
import { Suspense } from "react"

// مكونات التحميل البسيطة
const SkillsLoading = () => <div className="h-96 bg-background animate-pulse"></div>
const WhyWorkWithMeLoading = () => <div className="h-96 bg-background animate-pulse"></div>
const ClientsLoading = () => <div className="h-96 bg-background animate-pulse"></div>
const FeaturedProjectsLoading = () => <div className="h-96 bg-background animate-pulse"></div>
const ContactCTALoading = () => <div className="h-96 bg-background animate-pulse"></div>

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
    sections.push({
      component: (
        <Suspense fallback={<SkillsLoading />}>
          <Skills key="skills" />
        </Suspense>
      ),
      order: 1,
    })
  }

  if (process.env.DISABLE_WHY_WORK_WITH_ME !== "true") {
    sections.push({
      component: (
        <Suspense fallback={<WhyWorkWithMeLoading />}>
          <WhyWorkWithMe key="why-work-with-me" />
        </Suspense>
      ),
      order: 2,
    })
  }

  if (process.env.DISABLE_CLIENTS !== "true") {
    sections.push({
      component: (
        <Suspense fallback={<ClientsLoading />}>
          <Clients key="clients" />
        </Suspense>
      ),
      order: 4,
    })
  }

  if (process.env.DISABLE_PROJECTS_HOME !== "true") {
    sections.push({
      component: (
        <Suspense fallback={<FeaturedProjectsLoading />}>
          <FeaturedProjects key="featured-projects" />
        </Suspense>
      ),
      order: 3,
    })
  }

  if (process.env.DISABLE_CONTACT_HOME !== "true") {
    sections.push({
      component: (
        <Suspense fallback={<ContactCTALoading />}>
          <ContactCTA key="contact-cta" />
        </Suspense>
      ),
      order: 5,
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
