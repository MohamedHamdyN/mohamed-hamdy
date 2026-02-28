'use client'

import { useEffect, useState } from 'react'
import { getSkills } from '@/app/actions/cms'
import { useTranslations } from '@/hooks/useTranslations'
import InfiniteSlider from '@/components/shared/InfiniteSlider'
import { Skill } from '@/lib/db'

export default function Skills() {
  const t = useTranslations()
  const [skills, setSkills] = useState<Skill[]>([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    async function loadSkills() {
      try {
        const data = await getSkills()
        // Filter enabled skills
        const enabledSkills = data.filter((skill) => skill.enabled !== false)
        setSkills(enabledSkills)
      } catch (error) {
        console.error('Error loading skills:', error)
        setSkills([])
      } finally {
        setIsLoading(false)
      }
    }

    loadSkills()
  }, [])

  if (isLoading) {
    return <div className="py-20 text-center text-slate-400">Loading skills...</div>
  }

  return (
    <InfiniteSlider
      items={skills}
      title={t?.skills?.title || 'My Skills'}
      description={t?.skills?.description || 'Specialized expertise in data analysis'}
      autoplaySpeed={3000}
      pauseOnHover={true}
      reverseDirection={false}
    />
  )
}
