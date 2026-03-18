'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { getSiteToggles, updateSiteToggle } from '@/app/actions/cms'
import { Button } from '@/components/ui/button'
import { ArrowLeft } from 'lucide-react'

interface Toggle {
  key: string
  value: boolean
  description?: string
}

export default function AdminTogglesPage() {
  const [toggles, setToggles] = useState<Toggle[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [isSaving, setIsSaving] = useState(false)
  const [error, setError] = useState('')
  const [success, setSuccess] = useState('')

  const toggleDescriptions: Record<string, string> = {
    website: 'Enable/disable the entire website',
    projects_page: 'Show/hide projects page',
    services_page: 'Show/hide services page',
    about_page: 'Show/hide about page',
    contact_page: 'Show/hide contact page',
    resume_page: 'Show/hide resume page',
    projects_home: 'Show/hide projects section on home page',
    services_home: 'Show/hide services section on home page',
    about_home: 'Show/hide about section on home page',
    skills: 'Show/hide skills section',
    why_work_with_me: 'Show/hide "Why work with me" section',
    clients: 'Show/hide clients/testimonials section',
    contact_home: 'Show/hide contact section on home page',
    freelance_platforms: 'Show/hide freelance platforms on services page',
    payment_methods: 'Show/hide payment methods on services page',
    contact_form: 'Show/hide contact form',
    calendly_feature: 'Enable/disable Calendly feature',
  }

  useEffect(() => {
    loadToggles()
  }, [])

  async function loadToggles() {
    try {
      setIsLoading(true)
      const data = await getSiteToggles()
      const togglesList = Object.entries(data).map(([key, value]) => ({
        key,
        value: Boolean(value),
        description: toggleDescriptions[key],
      }))
      setToggles(togglesList)
    } catch (error) {
      console.error('Error loading toggles:', error)
      setError('Failed to load toggles')
    } finally {
      setIsLoading(false)
    }
  }

  async function handleToggle(key: string) {
    setError('')
    setSuccess('')
    setIsSaving(true)

    try {
      const currentToggle = toggles.find(t => t.key === key)
      if (!currentToggle) return

      const result = await updateSiteToggle(key, !currentToggle.value)

      if ((result as any)?.error) {
        setError((result as any).error)
      } else {
        setSuccess(`Toggle "${key}" updated successfully!`)
        await loadToggles()
        setTimeout(() => setSuccess(''), 3000)
      }
    } catch (error) {
      console.error('Error updating toggle:', error)
      setError('Failed to update toggle')
    } finally {
      setIsSaving(false)
    }
  }

  return (
    <div className="min-h-screen bg-slate-900">
      <header className="border-b border-slate-700 bg-slate-800/50">
        <div className="container mx-auto px-4 py-6">
          <Link href="/admin/dashboard" className="text-slate-400 hover:text-slate-200 mb-4 inline-flex items-center gap-2">
            <ArrowLeft size={20} />
            Back to Dashboard
          </Link>
          <h1 className="text-4xl font-bold text-white">Site Toggles</h1>
          <p className="text-slate-400 mt-2">Manage which sections and features are visible on your site</p>
        </div>
      </header>

      <main className="container mx-auto px-4 py-12">
        {error && (
          <div className="mb-6 p-4 bg-red-500/20 border border-red-500 text-red-300 rounded-lg">
            {error}
          </div>
        )}
        {success && (
          <div className="mb-6 p-4 bg-green-500/20 border border-green-500 text-green-300 rounded-lg">
            {success}
          </div>
        )}

        {isLoading ? (
          <div className="text-center py-12">
            <p className="text-slate-400">Loading toggles...</p>
          </div>
        ) : toggles.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-slate-400">No toggles found</p>
          </div>
        ) : (
          <div className="grid gap-4">
            {toggles.map((toggle) => (
              <div
                key={toggle.key}
                className="bg-slate-800 border border-slate-700 rounded-lg p-6 flex items-center justify-between hover:bg-slate-750 transition-colors"
              >
                <div className="flex-1">
                  <h3 className="text-white font-semibold capitalize">
                    {toggle.key.replace(/_/g, ' ')}
                  </h3>
                  {toggle.description && (
                    <p className="text-slate-400 text-sm mt-1">{toggle.description}</p>
                  )}
                </div>
                <button
                  onClick={() => handleToggle(toggle.key)}
                  disabled={isSaving}
                  className={`ml-4 px-4 py-2 rounded-lg font-medium transition-colors ${
                    toggle.value
                      ? 'bg-green-500 text-white hover:bg-green-600 disabled:opacity-50'
                      : 'bg-slate-700 text-slate-300 hover:bg-slate-600 disabled:opacity-50'
                  }`}
                >
                  {toggle.value ? 'Enabled' : 'Disabled'}
                </button>
              </div>
            ))}
          </div>
        )}
      </main>
    </div>
  )
}
