'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { getSiteSettings, updateSiteSettings } from '@/app/actions/cms'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'

export default function AdminSettingsPage() {
  const [settings, setSettings] = useState<Record<string, any>>({})
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState('')
  const [success, setSuccess] = useState('')
  const [isSaving, setIsSaving] = useState(false)

  const [formData, setFormData] = useState({
    site_title: '',
    site_description: '',
    og_image: '',
    site_url: '',
    maintenance_mode: false,
  })

  useEffect(() => {
    loadSettings()
  }, [])

  async function loadSettings() {
    try {
      const data = await getSiteSettings()
      setSettings(data)
      setFormData({
        site_title: data.site_title || '',
        site_description: data.site_description || '',
        og_image: data.og_image || '',
        site_url: data.site_url || 'https://yourdomain.com',
        maintenance_mode: data.maintenance_mode === 'true' || false,
      })
    } catch (error) {
      console.error('Error loading settings:', error)
      setError('Failed to load settings')
    } finally {
      setIsLoading(false)
    }
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setError('')
    setSuccess('')
    setIsSaving(true)

    try {
      await Promise.all([
        updateSiteSettings('site_title', formData.site_title, 'string'),
        updateSiteSettings('site_description', formData.site_description, 'string'),
        updateSiteSettings('og_image', formData.og_image, 'string'),
        updateSiteSettings('site_url', formData.site_url, 'string'),
        updateSiteSettings('maintenance_mode', formData.maintenance_mode ? 'true' : 'false', 'boolean'),
      ])

      setSuccess('Settings updated successfully!')
      await loadSettings()
    } catch (error) {
      console.error('Error updating settings:', error)
      setError('Failed to update settings')
    } finally {
      setIsSaving(false)
    }
  }

  return (
    <div className="min-h-screen bg-slate-900">
      <header className="border-b border-slate-700 bg-slate-800/50">
        <div className="container mx-auto px-4 py-6">
          <Link href="/admin/dashboard" className="text-slate-400 hover:text-slate-200 mb-4 inline-block">
            ← Back to Dashboard
          </Link>
          <h1 className="text-3xl font-bold text-white">Site Settings</h1>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8 max-w-2xl">
        {isLoading ? (
          <div className="text-center text-slate-400">Loading settings...</div>
        ) : (
          <div className="bg-slate-800 border border-slate-700 rounded-lg p-8">
            <form onSubmit={handleSubmit} className="space-y-6">
              {error && (
                <div className="bg-red-500/10 border border-red-500 rounded-md p-3">
                  <p className="text-red-500 text-sm">{error}</p>
                </div>
              )}

              {success && (
                <div className="bg-green-500/10 border border-green-500 rounded-md p-3">
                  <p className="text-green-500 text-sm">{success}</p>
                </div>
              )}

              <div>
                <Label htmlFor="site_title" className="text-slate-200">
                  Site Title
                </Label>
                <Input
                  id="site_title"
                  value={formData.site_title}
                  onChange={(e) => setFormData({ ...formData, site_title: e.target.value })}
                  required
                  className="bg-slate-900 border-slate-600 text-white"
                />
              </div>

              <div>
                <Label htmlFor="site_description" className="text-slate-200">
                  Site Description
                </Label>
                <textarea
                  id="site_description"
                  value={formData.site_description}
                  onChange={(e) => setFormData({ ...formData, site_description: e.target.value })}
                  className="w-full bg-slate-900 border border-slate-600 text-white rounded-md p-2"
                  rows={4}
                />
              </div>

              <div>
                <Label htmlFor="og_image" className="text-slate-200">
                  OG Image URL (for social sharing)
                </Label>
                <Input
                  id="og_image"
                  type="url"
                  value={formData.og_image}
                  onChange={(e) => setFormData({ ...formData, og_image: e.target.value })}
                  className="bg-slate-900 border-slate-600 text-white"
                />
              </div>

              <div>
                <Label htmlFor="site_url" className="text-slate-200">
                  Site URL
                </Label>
                <Input
                  id="site_url"
                  type="url"
                  value={formData.site_url}
                  onChange={(e) => setFormData({ ...formData, site_url: e.target.value })}
                  required
                  className="bg-slate-900 border-slate-600 text-white"
                />
              </div>

              <div className="border-t border-slate-700 pt-6">
                <h2 className="text-lg font-bold text-white mb-4">Maintenance Mode</h2>
                <label className="flex items-center gap-3 text-slate-200">
                  <input
                    type="checkbox"
                    checked={formData.maintenance_mode}
                    onChange={(e) => setFormData({ ...formData, maintenance_mode: e.target.checked })}
                    className="w-4 h-4"
                  />
                  <span>Enable Maintenance Mode</span>
                </label>
                <p className="text-sm text-slate-400 mt-2">
                  When enabled, visitors will see a maintenance page instead of your site.
                </p>
              </div>

              <Button type="submit" disabled={isSaving} className="w-full bg-blue-600 hover:bg-blue-700">
                {isSaving ? 'Saving...' : 'Save Settings'}
              </Button>
            </form>
          </div>
        )}
      </main>
    </div>
  )
}
