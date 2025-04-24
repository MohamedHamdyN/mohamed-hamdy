export const dynamic = "force-dynamic"

// Import components directly without admin imports
import Hero from "@/components/home/Hero"
import Skills from "@/components/home/Skills"
import WhyWorkWithMe from "@/components/home/WhyWorkWithMe"
import Clients from "@/components/home/Clients"
import FeaturedProjects from "@/components/home/FeaturedProjects"
import ContactCTA from "@/components/shared/ContactCTA"

export default function Home() {
  // Hardcode website enabled for now
  const websiteEnabled = true

  // If website is disabled, only show the Hero component
  if (!websiteEnabled) {
    return <Hero />
  }

  // Define which sections to show and their order
  const sections = [
    { component: <Skills key="skills" />, order: 1 },
    { component: <WhyWorkWithMe key="why-work-with-me" />, order: 2 },
    { component: <FeaturedProjects key="featured-projects" />, order: 3 },
    { component: <Clients key="clients" />, order: 4 },
    { component: <ContactCTA key="contact-cta" />, order: 5 },
  ]

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
