import { supabase } from "./supabase"

export const skillsService = {
  async getEnabledSkills() {
    const { data, error } = await supabase
      .from("skills")
      .select("*")
      .eq("enabled", true)  // جرب حذف هذا السطر مؤقتًا لو ما ظهرتش البيانات

    if (error) {
      console.error("❌ Error in getEnabledSkills:", error)
      throw error
    }

    return data
  }
}
