'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { getClients, createClient, updateClient, deleteClient } from '@/app/actions/cms'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Client } from '@/lib/db'

export default function AdminClientsPage() {
  const [clients, setClients] = useState<Client[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [editingId, setEditingId] = useState<number | null>(null)
  const [isCreating, setIsCreating] = useState(false)
  const [error, setError] = useState('')

  const [formData, setFormData] = useState({
    name: '',
    logo_url: '',
    testimonial: '',
    rating: 5,
    website: '',
    enabled: true,
    order: 0,
  })

  useEffect(() => {
    loadClients()
  }, [])

  async function loadClients() {
    try {
      const data = await getClients()
      setClients(data)
    } catch (error) {
      console.error('Error loading clients:', error)
      setError('Failed to load clients')
    } finally {
      setIsLoading(false)
    }
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setError('')

    try {
      if (editingId) {
        const result = await updateClient(editingId, formData)
        if (result.error) {
          setError(result.error)
        } else {
          await loadClients()
          resetForm()
        }
      } else {
        const result = await createClient({
          ...formData,
          order: clients.length,
        })
        if (result.error) {
          setError(result.error)
        } else {
          await loadClients()
          resetForm()
        }
      }
    } catch (error) {
      console.error('Error saving client:', error)
      setError('Failed to save client')
    }
  }

  function resetForm() {
    setEditingId(null)
    setIsCreating(false)
    setFormData({
      name: '',
      logo_url: '',
      testimonial: '',
      rating: 5,
      website: '',
      enabled: true,
      order: 0,
    })
  }

  async function handleEdit(client: Client) {
    setEditingId(client.id)
    setFormData({
      name: client.name,
      logo_url: client.logo_url,
      testimonial: client.testimonial || '',
      rating: client.rating,
      website: client.website || '',
      enabled: client.enabled,
      order: client.order,
    })
    setIsCreating(true)
  }

  async function handleDelete(id: number) {
    if (confirm('Are you sure you want to delete this client?')) {
      try {
        const result = await deleteClient(id)
        if (result.error) {
          setError(result.error)
        } else {
          await loadClients()
        }
      } catch (error) {
        console.error('Error deleting client:', error)
        setError('Failed to delete client')
      }
    }
  }

  return (
    <div className="min-h-screen bg-slate-900">
      <header className="border-b border-slate-700 bg-slate-800/50">
        <div className="container mx-auto px-4 py-6">
          <Link href="/admin/dashboard" className="text-slate-400 hover:text-slate-200 mb-4 inline-block">
            ← Back to Dashboard
          </Link>
          <h1 className="text-3xl font-bold text-white">Manage Clients</h1>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        {isCreating && (
          <div className="bg-slate-800 border border-slate-700 rounded-lg p-6 mb-8">
            <h2 className="text-xl font-bold text-white mb-4">
              {editingId ? 'Edit Client' : 'Create New Client'}
            </h2>

            <form onSubmit={handleSubmit} className="space-y-4">
              {error && (
                <div className="bg-red-500/10 border border-red-500 rounded-md p-3">
                  <p className="text-red-500 text-sm">{error}</p>
                </div>
              )}

              <div>
                <Label htmlFor="name" className="text-slate-200">
                  Name
                </Label>
                <Input
                  id="name"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  required
                  className="bg-slate-900 border-slate-600 text-white"
                />
              </div>

              <div>
                <Label htmlFor="logo_url" className="text-slate-200">
                  Logo URL
                </Label>
                <Input
                  id="logo_url"
                  type="url"
                  value={formData.logo_url}
                  onChange={(e) => setFormData({ ...formData, logo_url: e.target.value })}
                  required
                  className="bg-slate-900 border-slate-600 text-white"
                />
              </div>

              <div>
                <Label htmlFor="testimonial" className="text-slate-200">
                  Testimonial
                </Label>
                <textarea
                  id="testimonial"
                  value={formData.testimonial}
                  onChange={(e) => setFormData({ ...formData, testimonial: e.target.value })}
                  className="w-full bg-slate-900 border border-slate-600 text-white rounded-md p-2"
                  rows={3}
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="rating" className="text-slate-200">
                    Rating (1-5)
                  </Label>
                  <Input
                    id="rating"
                    type="number"
                    min="1"
                    max="5"
                    value={formData.rating}
                    onChange={(e) => setFormData({ ...formData, rating: parseInt(e.target.value) })}
                    className="bg-slate-900 border-slate-600 text-white"
                  />
                </div>

                <div>
                  <Label htmlFor="website" className="text-slate-200">
                    Website URL
                  </Label>
                  <Input
                    id="website"
                    type="url"
                    value={formData.website}
                    onChange={(e) => setFormData({ ...formData, website: e.target.value })}
                    className="bg-slate-900 border-slate-600 text-white"
                  />
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
                  {editingId ? 'Update Client' : 'Create Client'}
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
            <h2 className="text-xl font-bold text-white">Clients ({clients.length})</h2>
            {!isCreating && (
              <Button onClick={() => setIsCreating(true)} className="bg-green-600 hover:bg-green-700">
                + Add Client
              </Button>
            )}
          </div>

          {isLoading ? (
            <div className="p-6 text-center text-slate-400">Loading...</div>
          ) : clients.length === 0 ? (
            <div className="p-6 text-center text-slate-400">No clients found. Create your first client!</div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-slate-700">
                  <tr>
                    <th className="px-6 py-3 text-left text-sm font-semibold text-slate-200">Name</th>
                    <th className="px-6 py-3 text-left text-sm font-semibold text-slate-200">Rating</th>
                    <th className="px-6 py-3 text-left text-sm font-semibold text-slate-200">Enabled</th>
                    <th className="px-6 py-3 text-right text-sm font-semibold text-slate-200">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-700">
                  {clients.map((client) => (
                    <tr key={client.id} className="hover:bg-slate-700/50">
                      <td className="px-6 py-3 text-sm text-slate-300">{client.name}</td>
                      <td className="px-6 py-3 text-sm text-slate-300">{'⭐'.repeat(client.rating)}</td>
                      <td className="px-6 py-3 text-sm">
                        <span className={client.enabled ? 'text-green-400' : 'text-red-400'}>
                          {client.enabled ? 'Yes' : 'No'}
                        </span>
                      </td>
                      <td className="px-6 py-3 text-right text-sm space-x-2">
                        <button onClick={() => handleEdit(client)} className="text-blue-400 hover:text-blue-300">
                          Edit
                        </button>
                        <button
                          onClick={() => handleDelete(client.id)}
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
