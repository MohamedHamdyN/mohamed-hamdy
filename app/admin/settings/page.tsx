'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { getSiteSettings, updateSiteSettings } from '@/app/actions/cms'
import { updateCurrentAdminCredentials } from '@/app/actions/auth'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'

export default function AdminSettingsPage() {
  const [isLoading, setIsLoading] = useState(true)

  // site settings states
  const [settingsError, setSettingsError] = useState('')
  const [settingsSuccess, setSettingsSuccess] = useState('')
  const [isSavingSettings, setIsSavingSettings] = useState(false)

  const [formData, setFormData] = useState({
    site_title: '',
    site_description: '',
    og_image: '',
    site_url: '',
    maintenance_mode: false,
  })

  // admin credentials states
  const [adminError, setAdminError] = useState('')
  const [adminSuccess, setAdminSuccess] = useState('')
  const [isSavingAdmin, setIsSavingAdmin] = useState(false)

  const [adminForm, setAdminForm] = useState({
    oldPassword: '',
    newEmail: '',
    newPassword: '',
    confirmNewPassword: '',
  })

  useEffect(() => {
    loadSettings()
  }, [])

  async function loadSettings() {
    try {
      const data = await getSiteSettings()

      setFormData({
        site_title: String(data.site_title ?? ''),
        site_description: String(data.site_description ?? ''),
        og_image: String(data.og_image ?? ''),
        site_url: String(data.site_url ?? 'https://yourdomain.com'),
        maintenance_mode: Boolean(data.maintenance_mode ?? false),
      })
    } catch (error) {
      console.error('Error loading settings:', error)
      setSettingsError('Failed to load settings')
    } finally {
      setIsLoading(false)
    }
  }

  async function handleSubmitSettings(e: React.FormEvent) {
    e.preventDefault()
    setSettingsError('')
    setSettingsSuccess('')
    setIsSavingSettings(true)

    try {
      await Promise.all([
        updateSiteSettings('site_title', formData.site_title, 'string'),
        updateSiteSettings('site_description', formData.site_description, 'string'),
        updateSiteSettings('og_image', formData.og_image, 'string'),
        updateSiteSettings('site_url', formData.site_url, 'string'),
        updateSiteSettings('maintenance_mode', formData.maintenance_mode, 'boolean'),
      ])

      setSettingsSuccess('Settings updated successfully!')
      await loadSettings()
    } catch (error) {
      console.error('Error updating settings:', error)
      setSettingsError('Failed to update settings')
    } finally {
      setIsSavingSettings(false)
    }
  }

  async function handleSubmitAdmin(e: React.FormEvent) {
    e.preventDefault()
    setAdminError('')
    setAdminSuccess('')
    setIsSavingAdmin(true)

    try {
      const oldPassword = adminForm.oldPassword
      const newEmail = adminForm.newEmail.trim()
      const newPassword = adminForm.newPassword
      const confirmNewPassword = adminForm.confirmNewPassword

      if (!oldPassword) {
        setAdminError('Old password is required')
        return
      }

      if (!newEmail && !newPassword) {
        setAdminError('Provide a new email or a new password')
        return
      }

      if (newPassword) {
        if (newPassword.length < 8) {
          setAdminError('New password must be at least 8 characters')
          return
        }
        if (newPassword !== confirmNewPassword) {
          setAdminError('New passwords do not match')
          return
        }
      }

      const result = await updateCurrentAdminCredentials({
        oldPassword,
        newEmail: newEmail ? newEmail : undefined,
        newPassword: newPassword ? newPassword : undefined,
      })

      if ((result as any)?.error) {
        setAdminError((result as any).error)
        return
      }

      setAdminSuccess('Admin credentials updated successfully!')
      setAdminForm({
        oldPassword: '',
        newEmail: '',
        newPassword: '',
        confirmNewPassword: '',
      })
    } catch (error) {
      console.error('Error updating admin credentials:', error)
      setAdminError('Failed to update admin credentials')
    } finally {
      setIsSavingAdmin(false)
    }
  }

  return (
    <div className="min-h-screen bg-slate-900">
      <header className="border-b border-slate-700 bg-slate-800/50">
        <div className="container mx-auto px-4 py-6">
          <Link href="/admin/dashboard" className="text-slate-400 hover:text-slate-200 mb-4 inline-block">
            ← Back to Dashboard
          </Link>
          <h1 className="text-3xl font-bold text-white">Settings</h1>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8 max-w-2xl space-y-8">
        {isLoading ? (
          <div className="text-center text-slate-400">Loading settings...</div>
        ) : (
          <>
            {/* ============= Site Settings ============= */}
            <div className="bg-slate-800 border border-slate-700 rounded-lg p-8">
              <h2 className="text-xl font-bold text-white mb-6">Site Settings</h2>

              <form onSubmit={handleSubmitSettings} className="space-y-6">
                {settingsError && (
                  <div className="bg-red-500/10 border border-red-500 rounded-md p-3">
                    <p className="text-red-500 text-sm">{settingsError}</p>
                  </div>
                )}

                {settingsSuccess && (
                  <div className="bg-green-500/10 border border-green-500 rounded-md p-3">
                    <p className="text-green-500 text-sm">{settingsSuccess}</p>
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
                  <h3 className="text-lg font-bold text-white mb-4">Maintenance Mode</h3>
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

                <Button type="submit" disabled={isSavingSettings} className="w-full bg-blue-600 hover:bg-blue-700">
                  {isSavingSettings ? 'Saving...' : 'Save Site Settings'}
                </Button>
              </form>
            </div>

            {/* ============= Admin Credentials ============= */}
            <div className="bg-slate-800 border border-slate-700 rounded-lg p-8">
              <h2 className="text-xl font-bold text-white mb-2">Admin Credentials</h2>
              <p className="text-slate-400 text-sm mb-6">
                Changing email/password requires your current (old) password.
              </p>

              <form onSubmit={handleSubmitAdmin} className="space-y-6">
                {adminError && (
                  <div className="bg-red-500/10 border border-red-500 rounded-md p-3">
                    <p className="text-red-500 text-sm">{adminError}</p>
                  </div>
                )}

                {adminSuccess && (
                  <div className="bg-green-500/10 border border-green-500 rounded-md p-3">
                    <p className="text-green-500 text-sm">{adminSuccess}</p>
                  </div>
                )}

                <div>
                  <Label htmlFor="oldPassword" className="text-slate-200">
                    Old Password
                  </Label>
                  <Input
                    id="oldPassword"
                    type="password"
                    value={adminForm.oldPassword}
                    onChange={(e) => setAdminForm({ ...adminForm, oldPassword: e.target.value })}
                    required
                    className="bg-slate-900 border-slate-600 text-white"
                  />
                </div>

                <div>
                  <Label htmlFor="newEmail" className="text-slate-200">
                    New Email (optional)
                  </Label>
                  <Input
                    id="newEmail"
                    type="email"
                    value={adminForm.newEmail}
                    onChange={(e) => setAdminForm({ ...adminForm, newEmail: e.target.value })}
                    placeholder="new-admin@example.com"
                    className="bg-slate-900 border-slate-600 text-white"
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="newPassword" className="text-slate-200">
                      New Password (optional)
                    </Label>
                    <Input
                      id="newPassword"
                      type="password"
                      value={adminForm.newPassword}
                      onChange={(e) => setAdminForm({ ...adminForm, newPassword: e.target.value })}
                      className="bg-slate-900 border-slate-600 text-white"
                    />
                    <p className="text-xs text-slate-400 mt-2">Min 8 characters if provided.</p>
                  </div>

                  <div>
                    <Label htmlFor="confirmNewPassword" className="text-slate-200">
                      Confirm New Password
                    </Label>
                    <Input
                      id="confirmNewPassword"
                      type="password"
                      value={adminForm.confirmNewPassword}
                      onChange={(e) => setAdminForm({ ...adminForm, confirmNewPassword: e.target.value })}
                      className="bg-slate-900 border-slate-600 text-white"
                      disabled={!adminForm.newPassword}
                    />
                  </div>
                </div>

                <Button
                  type="submit"
                  disabled={isSavingAdmin}
                  className="w-full bg-indigo-600 hover:bg-indigo-700"
                >
                  {isSavingAdmin ? 'Saving...' : 'Update Admin Credentials'}
                </Button>
              </form>
            </div>
          </>
        )}
      </main>
    </div>
  )
}