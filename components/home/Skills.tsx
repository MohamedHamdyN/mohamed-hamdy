import { skillsService } from "@/lib/database"
import InfiniteSlider from "@/components/shared/InfiniteSlider"
import type { Skill } from "@/lib/supabase"

export default async function Skills() {
  // ✅ جلب البيانات مباشرة من السيرفر
  let skills: Skill[] = []

  try {
    skills = await skillsService.getEnabledSkills()
  } catch (error) {
    console.error("❌ Error fetching skills:", error)
    return null
  }

  // ✅ إخفاء المكون لو مفيش بيانات
  if (!skills || skills.length === 0) {
    return null
  }
   const t = await getTranslations()

  return (
    <InfiniteSlider
      items={skills}
      title={t.skills?.title || "My Skills"}
      description={t.skills?.description || "Specialized expertise in data analysis"}
      autoplaySpeed={3000}
      pauseOnHover={true}
      reverseDirection={false}
    />
  )
}
