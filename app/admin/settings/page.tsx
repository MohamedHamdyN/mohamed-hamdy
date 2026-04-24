'use client'

export const dynamic = 'force-dynamic'

import { useState, useEffect } from 'react'
import { getSettings, updateSettings, getColors } from '@/app/actions/cms'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'

export default function AdminSettingsPage() {
  const [settings, setSettings] = useState<any>(null)
  const [colors, setColors] = useState<any[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [isSaving, setIsSaving] = useState(false)
  const [error, setError] = useState('')
  const [success, setSuccess] = useState('')

  const [formData, setFormData] = useState({
    admin_limit: 2,
    dashboard_status: true,
    open_to_work: true,
    official_color_id: 1,
    notifications: null as any,
  })

  useEffect(() => {
    loadData()
  }, [])

  async function loadData() {
    try {
      const [settingsData, colorsData] = await Promise.all([
        getSettings(),
        getColors(),
      ])
      if (settingsData) {
        setSettings(settingsData)
        setFormData({
          admin_limit: settingsData.admin_limit || 2,
          dashboard_status: settingsData.dashboard_status !== false,
          open_to_work: settingsData.open_to_work !== false,
          official_color_id: settingsData.official_color_id || 1,
          notifications: settingsData.notifications,
        })
      }
      setColors(colorsData || [])
    } catch (err) {
      console.error('Error loading settings:', err)
      setError('Failed to load settings')
    } finally {
      setIsLoading(false)
    }
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setError('')
    setSuccess('')

    try {
      setIsSaving(true)
      await updateSettings(formData)
      setSuccess('Settings saved successfully!')
      await loadData()
    } catch (err) {
      console.error('Error saving settings:', err)
      setError('Error saving settings')
    } finally {
      setIsSaving(false)
    }
  }

  if (isLoading) {
    return <div className="p-8 text-center">Loading settings...</div>
  }

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold mb-2">Site Settings</h1>
        <p className="text-muted-foreground">Manage global website settings</p>
      </div>

      {error && <div className="p-4 bg-red-500/10 border border-red-500 text-red-600 rounded-lg">{error}</div>}
      {success && <div className="p-4 bg-green-500/10 border border-green-500 text-green-600 rounded-lg">{success}</div>}

      <form onSubmit={handleSubmit} className="space-y-6 bg-card border rounded-lg p-6">
        <div>
          <Label htmlFor="admin_limit">Admin User Limit</Label>
          <Input
            id="admin_limit"
            type="number"
            value={formData.admin_limit}
            onChange={(e) => setFormData({ ...formData, admin_limit: parseInt(e.target.value) || 2 })}
            min="1"
            max="10"
          />
          <p className="text-xs text-muted-foreground mt-1">Maximum number of admin accounts allowed</p>
        </div>

        <div>
          <Label htmlFor="official_color_id">Default Color Theme</Label>
          <select
            id="official_color_id"
            value={formData.official_color_id}
            onChange={(e) => setFormData({ ...formData, official_color_id: parseInt(e.target.value) })}
            className="w-full px-3 py-2 border rounded-md bg-background"
          >
            {colors.map((color) => (
              <option key={color.id} value={color.id}>
                {color.name}
              </option>
            ))}
          </select>
        </div>

        <div className="space-y-4">
          <h3 className="font-semibold">Website Status</h3>
          
          <div className="flex items-center gap-3">
            <input
              type="checkbox"
              id="dashboard_status"
              checked={formData.dashboard_status}
              onChange={(e) => setFormData({ ...formData, dashboard_status: e.target.checked })}
              className="h-4 w-4 rounded border-gray-300"
            />
            <div>
              <Label htmlFor="dashboard_status" className="text-base cursor-pointer">Dashboard Active</Label>
              <p className="text-sm text-muted-foreground">Allow access to admin dashboard</p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <input
              type="checkbox"
              id="open_to_work"
              checked={formData.open_to_work}
              onChange={(e) => setFormData({ ...formData, open_to_work: e.target.checked })}
              className="h-4 w-4 rounded border-gray-300"
            />
            <div>
              <Label htmlFor="open_to_work" className="text-base cursor-pointer">Open to Work</Label>
              <p className="text-sm text-muted-foreground">Show availability for new projects</p>
            </div>
          </div>
        </div>

        <div>
          <Label htmlFor="notifications">Notification Message</Label>
          <textarea
            id="notifications"
            value={formData.notifications || ''}
            onChange={(e) => setFormData({ ...formData, notifications: e.target.value || null })}
            placeholder="Leave empty to disable notifications"
            className="w-full px-3 py-2 border rounded-md bg-background"
            rows={3}
          />
          <p className="text-xs text-muted-foreground mt-1">Message displayed in modal popup on website</p>
        </div>

        <Button type="submit" disabled={isSaving}>
          {isSaving ? 'Saving...' : 'Save Settings'}
        </Button>
      </form>
    </div>
  )
}
