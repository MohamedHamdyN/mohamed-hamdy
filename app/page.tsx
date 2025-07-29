export const dynamic = "force-dynamic"

import { lazy, Suspense } from "react"
import Hero from "@/components/home/Hero"
import LazySection from "@/components/shared/LazySection"
import { getSettings } from "@/lib/settings"
import Skills from "@/components/home/Skills"

const WhyWorkWithMe = lazy(() => import("@/components/home/WhyWorkWithMe"))
const Clients = lazy(() => import("@/components/home/Clients"))
const FeaturedProjects = lazy(() => import("@/components/home/FeaturedProjects"))
const ContactCTA = lazy(() => import("@/components/shared/ContactCTA"))

export default async function Home() {
  const settings = await getSettings()

  // 🔍 دي للتأكد فقط، تقدر تشيلها بعد التجربة
  console.log("💡 Settings loaded:", settings)

  if (!settings.website) {
    return <Hero />
  }

  const sections = []

  // ✅ Skills Section
  if (settings.skills) {
    sections.push({
      component: (
        <Suspense fallback={<div>Loading Skills...</div>} key="skills">
          <LazySection className="py-20">
            <Skills />
          </LazySection>
        </Suspense>
      ),
      order: 1,
    })
  }

  // ✅ Why Work With Me Section
  if (settings.why_work_with_me) {
    sections.push({
      component: (
        <Suspense fallback={<div>Loading Why Work With Me...</div>} key="why-work-with-me">
          <LazySection className="py-20">
            <WhyWorkWithMe />
          </LazySection>
        </Suspense>
      ),
      order: 2,
    })
  }

  // ✅ Clients Section
  if (settings.clients) {
    sections.push({
      component: (
        <Suspense fallback={<div>Loading Clients...</div>} key="clients">
          <LazySection className="py-20">
            <Clients />
          </LazySection>
        </Suspense>
      ),
      order: 4,
    })
  }

  // ✅ Featured Projects Section
  if (settings.projects_home) {
    sections.push({
      component: (
        <Suspense fallback={<div>Loading Featured Projects...</div>} key="featured-projects">
          <LazySection className="py-20">
            <FeaturedProjects />
          </LazySection>
        </Suspense>
      ),
      order: 3,
    })
  }

  // ✅ Contact CTA Section
  if (settings.contact_home) {
    sections.push({
      component: (
        <Suspense fallback={<div>Loading Contact Section...</div>} key="contact-cta">
          <LazySection className="py-20">
            <ContactCTA />
          </LazySection>
        </Suspense>
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
