"use client"

import { useEffect, useState } from "react"
import { skillsService } from "@/lib/database"
import type { Skill } from "@/lib/supabase"

export default function Skills() {
  const [skills, setSkills] = useState<Skill[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function fetchSkills() {
      try {
        const data = await skillsService.getEnabledSkills()
        console.log("🧠 Skills fetched:", data)
        setSkills(data)
      } catch (error) {
        console.error("❌ Error fetching skills:", error)
      } finally {
        setLoading(false)
      }
    }

    fetchSkills()
  }, [])

  if (loading) {
    return <p>Loading skills...</p>
  }

  if (skills.length === 0) {
    return <p>No skills found.</p>
  }

  return (
    <section className="bg-background p-4">
      <h2 className="text-xl font-bold mb-4">Skills:</h2>
      <ul className="list-disc pl-6 space-y-2">
        {skills.map((skill) => (
          <li key={skill.id}>
            <strong>{skill.name}</strong>: {skill.description}
          </li>
        ))}
      </ul>
    </section>
  )
}
