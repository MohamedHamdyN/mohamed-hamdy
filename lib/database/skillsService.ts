import { supabase } from "../supabase"
import type { Skill } from "../supabase"

export const skillsService = {
  async getEnabledSkills(): Promise<Skill[]> {
    const { data, error } = await supabase
      .from("skills") // تأكد أن اسم الجدول هو skills
      .select("*")
      .eq("enabled", true)

    if (error) {
      console.error("❌ Error fetching skills:", error.message)
      return []
    }

    console.log(`✅ Enabled skills fetched successfully: ${data.length} items`)
    return data ?? []
  },
}
