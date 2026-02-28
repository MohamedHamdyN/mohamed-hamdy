'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { getSkills, createSkill, updateSkill, deleteSkill } from '@/app/actions/cms'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Skill } from '@/lib/db'

export default function AdminSkillsPage() {
  const [skills, setSkills] = useState<Skill[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [editingId, setEditingId] = useState<number | null>(null)
  const [isCreating, setIsCreating] = useState(false)
  const [error, setError] = useState('')

  const [formData, setFormData] = useState({
    name: '',
    description: '',
    icon: '',
    color: '',
    enabled: true,
    order: 0,
  })

  useEffect(() => {
    loadSkills()
  }, [])

  async function loadSkills() {
    try {
      const data = await getSkills()
      setSkills(data)
    } catch (error) {
      console.error('Error loading skills:', error)
      setError('Failed to load skills')
    } finally {
      setIsLoading(false)
    }
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setError('')

    try {
      if (editingId) {
        const result = await updateSkill(editingId, formData)
        if (result.error) {
          setError(result.error)
        } else {
          await loadSkills()
          setEditingId(null)
          setFormData({
            name: '',
            description: '',
            icon: '',
            color: '',
            enabled: true,
            order: 0,
          })
        }
      } else {
        const result = await createSkill({
          ...formData,
          order: skills.length,
        })
        if (result.error) {
          setError(result.error)
        } else {
          await loadSkills()
          setFormData({
            name: '',
            description: '',
            icon: '',
            color: '',
            enabled: true,
            order: 0,
          })
        }
      }
    } catch (error) {
      console.error('Error saving skill:', error)
      setError('Failed to save skill')
    }
  }

  async function handleEdit(skill: Skill) {
    setEditingId(skill.id)
    setFormData({
      name: skill.name,
      description: skill.description,
      icon: skill.icon,
      color: skill.color,
      enabled: skill.enabled,
      order: skill.order,
    })
    setIsCreating(true)
  }

  async function handleDelete(id: number) {
    if (confirm('Are you sure you want to delete this skill?')) {
      try {
        const result = await deleteSkill(id)
        if (result.error) {
          setError(result.error)
        } else {
          await loadSkills()
        }
      } catch (error) {
        console.error('Error deleting skill:', error)
        setError('Failed to delete skill')
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
          <h1 className="text-3xl font-bold text-white">Manage Skills</h1>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        {/* Create/Edit Form */}
        {isCreating && (
          <div className="bg-slate-800 border border-slate-700 rounded-lg p-6 mb-8">
            <h2 className="text-xl font-bold text-white mb-4">
              {editingId ? 'Edit Skill' : 'Create New Skill'}
            </h2>

            <form onSubmit={handleSubmit} className="space-y-4">
              {error && (
                <div className="bg-red-500/10 border border-red-500 rounded-md p-3">
                  <p className="text-red-500 text-sm">{error}</p>
                </div>
              )}

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
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
                  <Label htmlFor="icon" className="text-slate-200">
                    Icon (Lucide icon name)
                  </Label>
                  <Input
                    id="icon"
                    value={formData.icon}
                    onChange={(e) => setFormData({ ...formData, icon: e.target.value })}
                    placeholder="BarChart2"
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

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="color" className="text-slate-200">
                    Color (Tailwind class)
                  </Label>
                  <Input
                    id="color"
                    value={formData.color}
                    onChange={(e) => setFormData({ ...formData, color: e.target.value })}
                    placeholder="text-blue-500"
                    className="bg-slate-900 border-slate-600 text-white"
                  />
                </div>

                <div>
                  <Label htmlFor="order" className="text-slate-200">
                    Order
                  </Label>
                  <Input
                    id="order"
                    type="number"
                    value={formData.order}
                    onChange={(e) => setFormData({ ...formData, order: parseInt(e.target.value) })}
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
                  {editingId ? 'Update Skill' : 'Create Skill'}
                </Button>
                <Button
                  type="button"
                  onClick={() => {
                    setIsCreating(false)
                    setEditingId(null)
                    setFormData({
                      name: '',
                      description: '',
                      icon: '',
                      color: '',
                      enabled: true,
                      order: 0,
                    })
                  }}
                  variant="outline"
                  className="border-slate-600 text-slate-200"
                >
                  Cancel
                </Button>
              </div>
            </form>
          </div>
        )}

        {/* Skills List */}
        <div className="bg-slate-800 border border-slate-700 rounded-lg overflow-hidden">
          <div className="p-6 border-b border-slate-700 flex items-center justify-between">
            <h2 className="text-xl font-bold text-white">Skills ({skills.length})</h2>
            {!isCreating && (
              <Button onClick={() => setIsCreating(true)} className="bg-green-600 hover:bg-green-700">
                + Add Skill
              </Button>
            )}
          </div>

          {isLoading ? (
            <div className="p-6 text-center text-slate-400">Loading...</div>
          ) : skills.length === 0 ? (
            <div className="p-6 text-center text-slate-400">No skills found. Create your first skill!</div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-slate-700">
                  <tr>
                    <th className="px-6 py-3 text-left text-sm font-semibold text-slate-200">Name</th>
                    <th className="px-6 py-3 text-left text-sm font-semibold text-slate-200">Icon</th>
                    <th className="px-6 py-3 text-left text-sm font-semibold text-slate-200">Enabled</th>
                    <th className="px-6 py-3 text-right text-sm font-semibold text-slate-200">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-700">
                  {skills.map((skill) => (
                    <tr key={skill.id} className="hover:bg-slate-700/50">
                      <td className="px-6 py-3 text-sm text-slate-300">{skill.name}</td>
                      <td className="px-6 py-3 text-sm text-slate-300">{skill.icon}</td>
                      <td className="px-6 py-3 text-sm">
                        <span className={skill.enabled ? 'text-green-400' : 'text-red-400'}>
                          {skill.enabled ? 'Yes' : 'No'}
                        </span>
                      </td>
                      <td className="px-6 py-3 text-right text-sm space-x-2">
                        <button
                          onClick={() => handleEdit(skill)}
                          className="text-blue-400 hover:text-blue-300"
                        >
                          Edit
                        </button>
                        <button
                          onClick={() => handleDelete(skill.id)}
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
