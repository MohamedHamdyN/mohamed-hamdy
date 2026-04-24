'use client'

import { useEffect, useState } from 'react'
import { getProfile, getSettings, getProjects, getSkills, getServices, getCategories, getStats, getSocialLinks, getClients } from '@/app/actions/cms'

export default function DiagnosticPage() {
  const [data, setData] = useState<Record<string, any>>({})
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchData = async () => {
      try {
        const results = {
          profile: await getProfile(),
          settings: await getSettings(),
          projects: await getProjects(),
          skills: await getSkills(),
          services: await getServices(),
          categories: await getCategories(),
          stats: await getStats(),
          socialLinks: await getSocialLinks(),
          clients: await getClients(),
        }
        
        setData(results)
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Unknown error')
      } finally {
        setLoading(false)
      }
    }

    fetchData()
  }, [])

  if (loading) return <div className="p-8">Loading diagnostic data...</div>
  if (error) return <div className="p-8 text-red-600">Error: {error}</div>

  return (
    <div className="p-8 bg-white">
      <h1 className="text-3xl font-bold mb-8">Database Diagnostic Report</h1>
      
      {Object.entries(data).map(([key, value]) => (
        <div key={key} className="mb-8 p-4 bg-gray-100 rounded">
          <h2 className="text-xl font-bold mb-2">{key}</h2>
          <div className="text-sm text-gray-600 mb-2">
            {value === null ? 'null' : Array.isArray(value) ? `${value.length} items` : typeof value}
          </div>
          <pre className="bg-gray-800 text-green-400 p-4 rounded overflow-auto max-h-96 text-xs">
            {JSON.stringify(value, null, 2)}
          </pre>
        </div>
      ))}
    </div>
  )
}
