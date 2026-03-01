'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { getServices, createService, updateService, deleteService } from '@/app/actions/cms'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Service } from '@/lib/db'

export default function AdminServicesPage() {
  const [services, setServices] = useState<Service[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [editingId, setEditingId] = useState<number | null>(null)
  const [isCreating, setIsCreating] = useState(false)
  const [error, setError] = useState('')
  const [featureInput, setFeatureInput] = useState('')

  const [formData, setFormData] = useState({
    title: '',
    description: '',
    icon: '',
    color: '',
    features: [] as string[],
    enabled: true,
    order: 0,
  })

  useEffect(() => {
    loadServices()
  }, [])

  async function loadServices() {
    try {
      const data = await getServices()
      setServices(data)
    } catch (error) {
      console.error('Error loading services:', error)
      setError('Failed to load services')
    } finally {
      setIsLoading(false)
    }
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setError('')

    try {
      if (editingId) {
        const result = await updateService(editingId, formData)
        if (result.error) {
          setError(result.error)
        } else {
          await loadServices()
          resetForm()
        }
      } else {
        const result = await createService({
          ...formData,
          order: services.length,
        })
        if (result.error) {
          setError(result.error)
        } else {
          await loadServices()
          resetForm()
        }
      }
    } catch (error) {
      console.error('Error saving service:', error)
      setError('Failed to save service')
    }
  }

  function resetForm() {
    setEditingId(null)
    setIsCreating(false)
    setFormData({
      title: '',
      description: '',
      icon: '',
      color: '',
      features: [],
      enabled: true,
      order: 0,
    })
    setFeatureInput('')
  }

  async function handleEdit(service: Service) {
    setEditingId(service.id)
    setFormData({
      title: service.title,
      description: service.description,
      icon: service.icon,
      color: service.color,
      features: service.features || [],
      enabled: service.enabled,
      order: service.order,
    })
    setIsCreating(true)
  }

  async function handleDelete(id: number) {
    if (confirm('Are you sure you want to delete this service?')) {
      try {
        const result = await deleteService(id)
        if (result.error) {
          setError(result.error)
        } else {
          await loadServices()
        }
      } catch (error) {
        console.error('Error deleting service:', error)
        setError('Failed to delete service')
      }
    }
  }

  function addFeature() {
    if (featureInput.trim() && !formData.features.includes(featureInput.trim())) {
      setFormData({
        ...formData,
        features: [...formData.features, featureInput.trim()],
      })
      setFeatureInput('')
    }
  }

  function removeFeature(feature: string) {
    setFormData({
      ...formData,
      features: formData.features.filter((f) => f !== feature),
    })
  }

  return (
    <div className="min-h-screen bg-slate-900">
      <header className="border-b border-slate-700 bg-slate-800/50">
        <div className="container mx-auto px-4 py-6">
          <Link href="/admin/dashboard" className="text-slate-400 hover:text-slate-200 mb-4 inline-block">
            ← Back to Dashboard
          </Link>
          <h1 className="text-3xl font-bold text-white">Manage Services</h1>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        {isCreating && (
          <div className="bg-slate-800 border border-slate-700 rounded-lg p-6 mb-8">
            <h2 className="text-xl font-bold text-white mb-4">
              {editingId ? 'Edit Service' : 'Create New Service'}
            </h2>

            <form onSubmit={handleSubmit} className="space-y-4">
              {error && (
                <div className="bg-red-500/10 border border-red-500 rounded-md p-3">
                  <p className="text-red-500 text-sm">{error}</p>
                </div>
              )}

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="title" className="text-slate-200">
                    Title
                  </Label>
                  <Input
                    id="title"
                    value={formData.title}
                    onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                    required
                    className="bg-slate-900 border-slate-600 text-white"
                  />
                </div>

                <div>
                  <Label htmlFor="icon" className="text-slate-200">
                    Icon (Lucide icon name)
                  </Label>
                  <Input
                    id="icon"
                    value={formData.icon}
                    onChange={(e) => setFormData({ ...formData, icon: e.target.value })}
                    placeholder="Briefcase"
                    className="bg-slate-900 border-slate-600 text-white"
                  />
                </div>
              </div>

              <div>
                <Label htmlFor="description" className="text-slate-200">
                  Description
                </Label>
                <textarea
                  id="description"
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  className="w-full bg-slate-900 border border-slate-600 text-white rounded-md p-2"
                  rows={3}
                />
              </div>

              <div>
                <Label htmlFor="color" className="text-slate-200">
                  Color (Tailwind class)
                </Label>
                <Input
                  id="color"
                  value={formData.color}
                  onChange={(e) => setFormData({ ...formData, color: e.target.value })}
                  placeholder="bg-blue-500"
                  className="bg-slate-900 border-slate-600 text-white"
                />
              </div>

              <div>
                <Label htmlFor="features" className="text-slate-200">
                  Features
                </Label>
                <div className="flex gap-2">
                  <Input
                    id="features"
                    value={featureInput}
                    onChange={(e) => setFeatureInput(e.target.value)}
                    onKeyPress={(e) => {
                      if (e.key === 'Enter') {
                        e.preventDefault()
                        addFeature()
                      }
                    }}
                    placeholder="Add feature and press Enter"
                    className="bg-slate-900 border-slate-600 text-white"
                  />
                  <Button type="button" onClick={addFeature} className="bg-blue-600 hover:bg-blue-700">
                    Add
                  </Button>
                </div>
                <div className="flex flex-wrap gap-2 mt-3">
                  {formData.features.map((feature) => (
                    <span
                      key={feature}
                      className="bg-slate-700 text-slate-200 px-3 py-1 rounded-full text-sm flex items-center gap-2"
                    >
                      {feature}
                      <button
                        type="button"
                        onClick={() => removeFeature(feature)}
                        className="hover:text-red-400"
                      >
                        ×
                      </button>
                    </span>
                  ))}
                </div>
              </div>

              <div className="flex items-center gap-4">
                <label className="flex items-center gap-2 text-slate-200">
                  <input
                    type="checkbox"
                    checked={formData.enabled}
                    onChange={(e) => setFormData({ ...formData, enabled: e.target.checked })}
                  />
                  Enabled
                </label>
              </div>

              <div className="flex gap-4">
                <Button type="submit" className="bg-blue-600 hover:bg-blue-700">
                  {editingId ? 'Update Service' : 'Create Service'}
                </Button>
                <Button type="button" onClick={resetForm} variant="outline" className="border-slate-600 text-slate-200">
                  Cancel
                </Button>
              </div>
            </form>
          </div>
        )}

        <div className="bg-slate-800 border border-slate-700 rounded-lg overflow-hidden">
          <div className="p-6 border-b border-slate-700 flex items-center justify-between">
            <h2 className="text-xl font-bold text-white">Services ({services.length})</h2>
            {!isCreating && (
              <Button onClick={() => setIsCreating(true)} className="bg-green-600 hover:bg-green-700">
                + Add Service
              </Button>
            )}
          </div>

          {isLoading ? (
            <div className="p-6 text-center text-slate-400">Loading...</div>
          ) : services.length === 0 ? (
            <div className="p-6 text-center text-slate-400">No services found. Create your first service!</div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-slate-700">
                  <tr>
                    <th className="px-6 py-3 text-left text-sm font-semibold text-slate-200">Title</th>
                    <th className="px-6 py-3 text-left text-sm font-semibold text-slate-200">Icon</th>
                    <th className="px-6 py-3 text-left text-sm font-semibold text-slate-200">Enabled</th>
                    <th className="px-6 py-3 text-right text-sm font-semibold text-slate-200">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-700">
                  {services.map((service) => (
                    <tr key={service.id} className="hover:bg-slate-700/50">
                      <td className="px-6 py-3 text-sm text-slate-300">{service.title}</td>
                      <td className="px-6 py-3 text-sm text-slate-300">{service.icon}</td>
                      <td className="px-6 py-3 text-sm">
                        <span className={service.enabled ? 'text-green-400' : 'text-red-400'}>
                          {service.enabled ? 'Yes' : 'No'}
                        </span>
                      </td>
                      <td className="px-6 py-3 text-right text-sm space-x-2">
                        <button onClick={() => handleEdit(service)} className="text-blue-400 hover:text-blue-300">
                          Edit
                        </button>
                        <button
                          onClick={() => handleDelete(service.id)}
                          className="text-red-400 hover:text-red-300"
                        >
                          Delete
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </main>
    </div>
  )
}
