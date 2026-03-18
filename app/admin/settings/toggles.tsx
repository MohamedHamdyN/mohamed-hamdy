'use client'

import { useEffect, useState } from 'react'
import { getSiteToggles, updateSiteToggle } from '@/app/actions/cms'

const TOGGLE_LABELS: Record<string, string> = {
  website: 'Website (Main Enable/Disable)',
  maintenance_mode: 'Maintenance Mode',
  about_page: 'About Page',
  projects_page: 'Projects Page',
  services_page: 'Services Page',
  contact_page: 'Contact Page',
  skills: 'Skills Section (Home)',
  why_work_with_me: 'Why Work With Me Section',
  projects_home: 'Featured Projects (Home)',
  clients: 'Clients Section',
  contact_home: 'Contact CTA (Home)',
  calendly_feature: 'Calendly Feature',
  freelance_platforms: 'Freelance Platforms',
  payment_methods: 'Payment Methods',
}

export default function TogglesSettings() {
  const [toggles, setToggles] = useState<Record<string, boolean>>({})
  const [isLoading, setIsLoading] = useState(true)
  const [isSaving, setIsSaving] = useState(false)
  const [message, setMessage] = useState('')

  useEffect(() => {
    loadToggles()
  }, [])

  async function loadToggles() {
    try {
      const data = await getSiteToggles()
      setToggles(data)
    } catch (error) {
      console.error('Error loading toggles:', error)
      setMessage('Failed to load toggles')
    } finally {
      setIsLoading(false)
    }
  }

  async function handleToggle(key: string, value: boolean) {
    setIsSaving(true)
    try {
      await updateSiteToggle(key, value)
      setToggles((prev) => ({ ...prev, [key]: value }))
      setMessage('Saved successfully')
      setTimeout(() => setMessage(''), 3000)
    } catch (error) {
      console.error('Error updating toggle:', error)
      setMessage('Failed to save')
    } finally {
      setIsSaving(false)
    }
  }

  if (isLoading) {
    return <div className="text-slate-400">Loading...</div>
  }

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-white mb-2">Site Toggles</h2>
        <p className="text-slate-400">Control which features and pages are visible on your portfolio</p>
      </div>

      {message && (
        <div className={`p-4 rounded-lg ${message.includes('Failed') ? 'bg-red-900/30' : 'bg-green-900/30'}`}>
          <p className={message.includes('Failed') ? 'text-red-300' : 'text-green-300'}>{message}</p>
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {Object.entries(TOGGLE_LABELS).map(([key, label]) => (
          <div key={key} className="flex items-center justify-between bg-slate-800/50 p-4 rounded-lg border border-slate-700">
            <label htmlFor={key} className="text-slate-200 font-medium cursor-pointer flex-1">
              {label}
            </label>
            <button
              type="button"
              role="switch"
              aria-checked={toggles[key] ?? true}
              onClick={() => handleToggle(key, !(toggles[key] ?? true))}
              disabled={isSaving}
              className={`ml-4 relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                toggles[key] ?? true ? 'bg-blue-600' : 'bg-slate-600'
              }`}
            >
              <span
                className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                  toggles[key] ?? true ? 'translate-x-6' : 'translate-x-1'
                }`}
              />
            </button>
          </div>
        ))}
      </div>
    </div>
  )
}
