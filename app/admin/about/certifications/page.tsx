'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import {
  getCertifications,
  createCertification,
  updateCertification,
  deleteCertification,
  type Certification,
} from '@/app/actions/cms'

const emptyForm = {
  title: '',
  issuer: '',
  issue_date: '',
  credential_url: '',
  description: '',
  enabled: true,
  order: 0,
}

export default function CertificationsAdminPage() {
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [ok, setOk] = useState<string | null>(null)

  const [items, setItems] = useState<Certification[]>([])
  const [editingId, setEditingId] = useState<number | null>(null)
  const [form, setForm] = useState({ ...emptyForm })

  async function load() {
    try {
      setLoading(true)
      setError(null)
      const data = await getCertifications()
      setItems(data ?? [])
    } catch {
      setError('Failed to load certifications')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    load()
  }, [])

  function startAdd() {
    setEditingId(null)
    setForm({ ...emptyForm })
  }

  function startEdit(x: Certification) {
    setEditingId(x.id)
    setForm({
      title: x.title ?? '',
      issuer: x.issuer ?? '',
      issue_date: x.issue_date ?? '',
      credential_url: x.credential_url ?? '',
      description: x.description ?? '',
      enabled: x.enabled !== false,
      order: Number(x.order ?? 0),
    })
  }

  async function save() {
    try {
      setSaving(true)
      setError(null)

      if (!form.title.trim() || !form.issuer.trim()) {
        setError('Title and Issuer are required.')
        return
      }

      const payload = {
        title: form.title.trim(),
        issuer: form.issuer.trim(),
        issue_date: form.issue_date.trim() ? form.issue_date.trim() : null,
        credential_url: form.credential_url.trim() ? form.credential_url.trim() : null,
        description: form.description.trim() ? form.description.trim() : null,
        enabled: Boolean(form.enabled),
        order: Number(form.order ?? 0),
      }

      const res = editingId
        ? await updateCertification(editingId, payload as any)
        : await createCertification(payload as any)

      if ((res as any)?.error) {
        setError((res as any).error)
        return
      }

      setOk('Saved ✅')
      setTimeout(() => setOk(null), 1500)
      startAdd()
      await load()
    } catch {
      setError('Failed to save')
    } finally {
      setSaving(false)
    }
  }

  async function remove(id: number) {
    if (!confirm('Delete this certification?')) return
    try {
      setSaving(true)
      const res = await deleteCertification(id)
      if ((res as any)?.error) {
        setError((res as any).error)
        return
      }
      await load()
    } finally {
      setSaving(false)
    }
  }

  return (
    <div className="min-h-screen bg-slate-900">
      <div className="container mx-auto px-4 py-8">
        <Link href="/admin/dashboard" className="text-slate-300 hover:text-white">
          ← Back to Dashboard
        </Link>

        <div className="flex items-center justify-between mt-4">
          <h1 className="text-3xl font-bold text-white">Certifications</h1>
          <Button onClick={startAdd} className="bg-slate-700 hover:bg-slate-600">
            + Add New
          </Button>
        </div>

        {error && <p className="text-red-400 mt-4">{error}</p>}
        {ok && <p className="text-green-400 mt-4">{ok}</p>}

        {/* Form */}
        <div className="mt-6 bg-slate-800 border border-slate-700 rounded-lg p-6">
          <h2 className="text-white font-semibold mb-4">
            {editingId ? `Edit #${editingId}` : 'Add New'}
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <input
              value={form.title}
              onChange={(e) => setForm((p) => ({ ...p, title: e.target.value }))}
              placeholder="Title"
              className="w-full rounded-md bg-slate-900 border border-slate-700 px-3 py-2 text-slate-100"
            />
            <input
              value={form.issuer}
              onChange={(e) => setForm((p) => ({ ...p, issuer: e.target.value }))}
              placeholder="Issuer"
              className="w-full rounded-md bg-slate-900 border border-slate-700 px-3 py-2 text-slate-100"
            />
            <input
              value={form.issue_date}
              onChange={(e) => setForm((p) => ({ ...p, issue_date: e.target.value }))}
              placeholder="Issue Date (e.g. 2025 or 2025-08)"
              className="w-full rounded-md bg-slate-900 border border-slate-700 px-3 py-2 text-slate-100"
            />
            <input
              value={form.credential_url}
              onChange={(e) => setForm((p) => ({ ...p, credential_url: e.target.value }))}
              placeholder="Credential URL"
              className="w-full rounded-md bg-slate-900 border border-slate-700 px-3 py-2 text-slate-100"
            />
            <input
              type="number"
              value={form.order}
              onChange={(e) => setForm((p) => ({ ...p, order: Number(e.target.value) }))}
              placeholder="Order"
              className="w-full rounded-md bg-slate-900 border border-slate-700 px-3 py-2 text-slate-100"
            />
            <label className="flex items-center gap-2 text-slate-200">
              <input
                type="checkbox"
                checked={form.enabled}
                onChange={(e) => setForm((p) => ({ ...p, enabled: e.target.checked }))}
              />
              Enabled
            </label>
          </div>

          <textarea
            value={form.description}
            onChange={(e) => setForm((p) => ({ ...p, description: e.target.value }))}
            placeholder="Description"
            className="mt-4 w-full min-h-[140px] rounded-md bg-slate-900 border border-slate-700 px-3 py-2 text-slate-100"
          />

          <Button onClick={save} disabled={saving} className="mt-4 bg-green-600 hover:bg-green-700">
            {saving ? 'Saving...' : 'Save'}
          </Button>
        </div>

        {/* List */}
        <div className="mt-8 bg-slate-800 border border-slate-700 rounded-lg p-6">
          <h2 className="text-white font-semibold mb-4">Items ({items.length})</h2>

          {loading ? (
            <p className="text-slate-400">Loading...</p>
          ) : items.length === 0 ? (
            <p className="text-slate-400">No items yet.</p>
          ) : (
            <div className="space-y-3">
              {items.map((x) => (
                <div key={x.id} className="p-4 bg-slate-900/40 rounded-lg flex items-start justify-between gap-4">
                  <div>
                    <p className="text-white font-semibold">
                      {x.title} — {x.issuer} {x.enabled ? '' : <span className="text-slate-400">(disabled)</span>}
                    </p>
                    {x.issue_date ? <p className="text-slate-400 text-sm mt-1">date: {x.issue_date}</p> : null}
                    {x.credential_url ? <p className="text-slate-400 text-sm mt-1 break-all">{x.credential_url}</p> : null}
                    {x.description ? <p className="text-slate-300 text-sm mt-2 whitespace-pre-line">{x.description}</p> : null}
                    <p className="text-slate-500 text-xs mt-2">order: {x.order}</p>
                  </div>

                  <div className="flex gap-3">
                    <button className="text-blue-400 hover:text-blue-300" onClick={() => startEdit(x)}>
                      Edit
                    </button>
                    <button className="text-red-400 hover:text-red-300" onClick={() => remove(x.id)}>
                      Delete
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

      </div>
    </div>
  )
}