import React from "react"
export const dynamic = "force-dynamic"

import { Suspense } from "react"
import Hero from "@/components/home/Hero"
import LazySection from "@/components/shared/LazySection"
import { toggleSettings } from "@/admin/toggle"

// Lazy load components
const Skills = lazy(() => import("@/components/home/Skills"))
const WhyWorkWithMe = lazy(() => import("@/components/home/WhyWorkWithMe"))
const Clients = lazy(() => import("@/components/home/Clients"))
const FeaturedProjects = lazy(() => import("@/components/home/FeaturedProjects"))
const ContactCTA = lazy(() => import("@/components/shared/ContactCTA"))

function lazy<T extends React.ComponentType<any>>(
  importFunc: () => Promise<{ default: T }>,
): React.ComponentType<React.ComponentProps<T>> {
  const LazyComponent = React.lazy(importFunc)
  return function LazyWrapper(props: React.ComponentProps<T>) {
    return (
      <Suspense fallback={<div className="h-64 bg-muted animate-pulse rounded-lg" />}>
        <LazyComponent {...props} />
      </Suspense>
    )
  }
}

export default function Home() {
  const websiteEnabled = toggleSettings.website

  if (!websiteEnabled) {
    return <Hero />
  }

  const sections = []

  if (toggleSettings.skills) {
    sections.push({
      component: (
        <LazySection key="skills" className="py-20">
          <Skills />
        </LazySection>
      ),
      order: 1,
    })
  }

  if (toggleSettings.why_work_with_me) {
    sections.push({
      component: (
        <LazySection key="why-work-with-me" className="py-20">
          <WhyWorkWithMe />
        </LazySection>
      ),
      order: 2,
    })
  }

  if (toggleSettings.clients) {
    sections.push({
      component: (
        <LazySection key="clients" className="py-20">
          <Clients />
        </LazySection>
      ),
      order: 4,
    })
  }

  if (toggleSettings.projects_home) {
    sections.push({
      component: (
        <LazySection key="featured-projects" className="py-20">
          <FeaturedProjects />
        </LazySection>
      ),
      order: 3,
    })
  }

  if (toggleSettings.contact_home) {
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
