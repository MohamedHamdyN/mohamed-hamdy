'use client'

import { useState, useEffect } from 'react'
import { getSkills } from '@/app/actions/cms'
import { Skill } from '@/lib/db'

export function useSkillsData() {
  const [skills, setSkills] = useState<Skill[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<Error | null>(null)

  useEffect(() => {
    async function loadSkills() {
      try {
        setIsLoading(true)
        const data = await getSkills()
        // Filter active skills only
        const activeSkills = (data ?? []).filter((skill) => skill.status !== false)
        setSkills(activeSkills)
      } catch (err) {
        console.error('Error loading skills:', err)
        setError(err instanceof Error ? err : new Error('Failed to load skills'))
        setSkills([])
      } finally {
        setIsLoading(false)
      }
    }

    loadSkills()
  }, [])

  return { skills, isLoading, error }
}
