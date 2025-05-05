import Hero from "@/components/home/Hero"
import { Suspense } from "react"
import { toggleSettings } from "@/admin/toggle"
import ClientSideHome from "@/components/home/ClientSideHome"

// مكونات التحميل البسيطة
const SkillsLoading = () => <div className="h-96 bg-background animate-pulse"></div>
const WhyWorkWithMeLoading = () => <div className="h-96 bg-background animate-pulse"></div>
const ClientsLoading = () => <div className="h-96 bg-background animate-pulse"></div>
const FeaturedProjectsLoading = () => <div className="h-96 bg-background animate-pulse"></div>
const ContactCTALoading = () => <div className="h-96 bg-background animate-pulse"></div>

export default function Home() {
  // إذا كان الموقع معطلاً، عرض Hero فقط
  if (!toggleSettings.website) {
    return <Hero />
  }

  return (
    <>
      <Hero />
      <Suspense fallback={<div className="h-20"></div>}>
        <ClientSideHome />
      </Suspense>
    </>
  )
}
