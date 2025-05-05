"use client"

import { useEffect, useState } from "react"
import { toggleSettings } from "@/admin/toggle"
import Skills from "@/components/home/Skills"
import WhyWorkWithMe from "@/components/home/WhyWorkWithMe"
import Clients from "@/components/home/Clients"
import FeaturedProjects from "@/components/home/FeaturedProjects"
import ContactCTA from "@/components/shared/ContactCTA"

export default function ClientSideHome() {
  const [mounted, setMounted] = useState(false)

  // تأكد من أن الكود يعمل فقط بعد تحميل المكون على العميل
  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) {
    return null
  }

  // إنشاء مصفوفة الأقسام بناءً على إعدادات التبديل
  const sections = []

  // إضافة الأقسام بناءً على إعدادات التبديل
  if (toggleSettings.skills) {
    sections.push({
      id: "skills",
      component: <Skills />,
      order: 1,
    })
  }

  if (toggleSettings.why_work_with_me) {
    sections.push({
      id: "why-work-with-me",
      component: <WhyWorkWithMe />,
      order: 2,
    })
  }

  if (toggleSettings.projects_home) {
    sections.push({
      id: "featured-projects",
      component: <FeaturedProjects />,
      order: 3,
    })
  }

  if (toggleSettings.clients) {
    sections.push({
      id: "clients",
      component: <Clients />,
      order: 4,
    })
  }

  if (toggleSettings.contact_home) {
    sections.push({
      id: "contact-cta",
      component: <ContactCTA />,
      order: 5,
    })
  }

  // ترتيب الأقسام حسب الترتيب
  sections.sort((a, b) => a.order - b.order)

  return (
    <>
      {sections.map((section) => (
        <div key={section.id}>{section.component}</div>
      ))}
    </>
  )
}
