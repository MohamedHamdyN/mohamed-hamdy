"use client"

import { useEffect, useState } from "react"
import { getSkills } from "@/app/actions/cms"
import type { Skill } from "@/lib/db"

export function useSkillsData() {
  const [skills, setSkills] = useState<Skill[]>([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    let alive = true

    async function load() {
      try {
        const data = await getSkills()
        if (!alive) return

        const enabled = (data || [])
          .filter((s: any) => s.enabled !== false)
          .sort((a: any, b: any) => (a.order ?? 0) - (b.order ?? 0))

        setSkills(enabled)
      } catch (e) {
        console.error("getSkills failed:", e)
        setSkills([])
      } finally {
        if (!alive) return
        setIsLoading(false)
      }
    }

    load()
    return () => {
      alive = false
    }
  }, [])

  return { skills, isLoading }
}