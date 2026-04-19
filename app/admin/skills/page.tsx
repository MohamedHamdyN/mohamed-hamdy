'use client'

export const dynamic = 'force-dynamic'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { getSkills, getColors, createSkill, updateSkill, deleteSkill } from '@/app/actions/cms'
import { Plus, Edit2, Trash2, ArrowLeft } from 'lucide-react'

export default function AdminSkillsPage() {
  const [skills, setSkills] = useState<any[]>([])
  const [colors, setColors] = useState<any[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [editingId, setEditingId] = useState<number | null>(null)
  const [showForm, setShowForm] = useState(false)
  const [error, setError] = useState('')
  const [success, setSuccess] = useState('')

  const [formData, setFormData] = useState({
    name: '',
    color_id: 1,
    status: true,
    sort_order: 0,
  })

  useEffect(() => {
    loadData()
  }, [])

  async function loadData() {
    try {
      const [skillsData, colorsData] = await Promise.all([
        getSkills(),
        getColors(),
      ])
      setSkills(skillsData || [])
      setColors(colorsData || [])
    } catch (e) {
      setError('Failed to load data')
    } finally {
      setIsLoading(false)
    }
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setError('')
    setSuccess('')

    try {
      if (editingId) {
        await updateSkill(editingId, formData)
        setSuccess('Skill updated')
      } else {
        await createSkill(formData)
        setSuccess('Skill created')
      }
      resetForm()
      await loadData()
    } catch (e: any) {
      setError(e.message)
    }
  }

  async function handleDelete(id: number) {
    if (!confirm('Delete this skill?')) return
    try {
      await deleteSkill(id)
      setSuccess('Skill deleted')
      await loadData()
    } catch (e: any) {
      setError(e.message)
    }
  }

  function resetForm() {
    setEditingId(null)
    setShowForm(false)
    setFormData({
      name: '',
      color_id: 1,
      status: true,
      sort_order: 0,
    })
  }

  if (isLoading) return <div>Loading...</div>

  return (
    <div className="min-h-screen bg-background p-6">
      <div className="max-w-4xl mx-auto">
        <div className="flex items-center justify-between mb-6">
          <Link href="/admin/dashboard" className="flex items-center gap-2 text-muted-foreground hover:text-foreground">
            <ArrowLeft className="h-4 w-4" />
            Back
          </Link>
          <h1 className="text-3xl font-bold">Skills</h1>
          <Button onClick={() => setShowForm(!showForm)}>
            <Plus className="h-4 w-4 mr-2" />
            New Skill
          </Button>
        </div>

        {error && <div className="bg-red-500/10 border border-red-500 p-3 rounded mb-4 text-red-700">{error}</div>}
        {success && <div className="bg-green-500/10 border border-green-500 p-3 rounded mb-4 text-green-700">{success}</div>}

        {showForm && (
          <div className="bg-card border rounded-lg p-6 mb-6">
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <Label>Name</Label>
                <Input
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  required
                  placeholder="e.g., React, Python, Design"
                />
              </div>

              <div>
                <Label>Color</Label>
                <select
                  className="w-full px-3 py-2 border rounded-md bg-background"
                  value={formData.color_id}
                  onChange={(e) => setFormData({ ...formData, color_id: parseInt(e.target.value) })}
                >
                  {colors.map((color) => (
                    <option key={color.id} value={color.id}>
                      {color.name} ({color.hex})
                    </option>
                  ))}
                </select>
              </div>

              <div className="flex gap-4">
                <label className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    checked={formData.status}
                    onChange={(e) => setFormData({ ...formData, status: e.target.checked })}
                  />
                  Active
                </label>
              </div>

              <div className="flex gap-2">
                <Button type="submit">Save</Button>
                <Button type="button" variant="outline" onClick={resetForm}>
                  Cancel
                </Button>
              </div>
            </form>
          </div>
        )}

        <div className="bg-card border rounded-lg overflow-hidden">
          <table className="w-full text-sm">
            <thead className="bg-muted border-b">
              <tr>
                <th className="px-4 py-3 text-left font-semibold">Name</th>
                <th className="px-4 py-3 text-left font-semibold">Color</th>
                <th className="px-4 py-3 text-left font-semibold">Status</th>
                <th className="px-4 py-3 text-right font-semibold">Actions</th>
              </tr>
            </thead>
            <tbody>
              {skills.map((skill) => (
                <tr key={skill.id} className="border-b hover:bg-muted/30">
                  <td className="px-4 py-3">{skill.name}</td>
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-2">
                      <div
                        className="w-4 h-4 rounded-full border"
                        style={{ backgroundColor: skill.color_hex || '#ccc' }}
                      />
                      {skill.color_name}
                    </div>
                  </td>
                  <td className="px-4 py-3">{skill.status ? 'Active' : 'Inactive'}</td>
                  <td className="px-4 py-3 text-right space-x-2">
                    <Button
                      size="sm"
                      variant="ghost"
                      onClick={() => {
                        setEditingId(skill.id)
                        setFormData({
                          name: skill.name,
                          color_id: skill.color_id,
                          status: skill.status,
                          sort_order: skill.sort_order,
                        })
                        setShowForm(true)
                      }}
                    >
                      <Edit2 className="h-4 w-4" />
                    </Button>
                    <Button
                      size="sm"
                      variant="ghost"
                      onClick={() => handleDelete(skill.id)}
                    >
                      <Trash2 className="h-4 w-4 text-red-500" />
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}
