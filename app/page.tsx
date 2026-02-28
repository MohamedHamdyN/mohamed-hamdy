import { lazy, Suspense } from "react"
import { redirect } from "next/navigation"
import Hero from "@/components/home/Hero"
import LazySection from "@/components/shared/LazySection"
import { getSiteSettings } from "@/lib/queries/other"
import { getProfile } from "@/lib/queries/profile"
import { getSkills } from "@/lib/queries/other"
import { getClients } from "@/lib/queries/other"
import { getFeaturedProjects } from "@/lib/queries/projects"
import { isDatabaseInitialized } from "@/lib/utils/db-check"

// Lazy load components
const Skills = lazy(() => import("@/components/home/Skills"))
const WhyWorkWithMe = lazy(() => import("@/components/home/WhyWorkWithMe"))
const Clients = lazy(() => import("@/components/home/Clients"))
const FeaturedProjects = lazy(() => import("@/components/home/FeaturedProjects"))
const ContactCTA = lazy(() => import("@/components/shared/ContactCTA"))

export const revalidate = 10 // ISR with 10 second revalidation

export default async function Home() {
  // Check if database is initialized
  const dbInitialized = await isDatabaseInitialized()
  
  if (!dbInitialized) {
    redirect("/setup")
  }

  // Fetch settings and data from database
  const [siteSettings, profile, skills, clients, featuredProjects] = await Promise.all([
    getSiteSettings(),
    getProfile(),
    getSkills(),
    getClients(),
    getFeaturedProjects(),
  ])

  const sections = []

  // Check if website is enabled
  if (siteSettings?.site_status === "maintenance") {
    return <Hero profile={profile} />
  }

  if (siteSettings?.skills_enabled && skills && skills.length > 0) {
    sections.push({
      component: (
        <LazySection key="skills" className="py-20">
          <Suspense fallback={<div>Loading...</div>}>
            <Skills skills={skills} />
          </Suspense>
        </LazySection>
      ),
      order: 1,
    })
  }

  if (siteSettings?.about_enabled && profile?.aboutSections && profile.aboutSections.length > 0) {
    sections.push({
      component: (
        <LazySection key="why-work-with-me" className="py-20">
          <Suspense fallback={<div>Loading...</div>}>
            <WhyWorkWithMe reasons={profile.aboutSections} />
          </Suspense>
        </LazySection>
      ),
      order: 2,
    })
  }

  if (siteSettings?.clients_enabled && clients && clients.length > 0) {
    sections.push({
      component: (
        <LazySection key="clients" className="py-20">
          <Suspense fallback={<div>Loading...</div>}>
            <Clients clients={clients} />
          </Suspense>
        </LazySection>
      ),
      order: 4,
    })
  }

  if (siteSettings?.projects_enabled && featuredProjects && featuredProjects.length > 0) {
    sections.push({
      component: (
        <LazySection key="featured-projects" className="py-20">
          <Suspense fallback={<div>Loading...</div>}>
            <FeaturedProjects projects={featuredProjects} />
          </Suspense>
        </LazySection>
      ),
      order: 3,
    })
  }

  if (siteSettings?.contact_enabled) {
    sections.push({
      component: (
        <LazySection key="contact-cta" className="py-20">
          <Suspense fallback={<div>Loading...</div>}>
            <ContactCTA />
          </Suspense>
        </LazySection>
      ),
      order: 5,
    })
  }

  sections.sort((a, b) => a.order - b.order)

  return (
    <>
      <Hero profile={profile} />
      {sections.map((section) => section.component)}
    </>
  )
}
