'use client'

export const dynamic = 'force-dynamic'

import { useState, useEffect } from 'react'
import { getColors, createColor, deleteColor } from '@/app/actions/cms'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Trash2 } from 'lucide-react'

export default function AdminColorsPage() {
  const [colors, setColors] = useState<any[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [isSaving, setIsSaving] = useState(false)
  const [error, setError] = useState('')

  const [formData, setFormData] = useState({
    name: '',
    code: '#000000',
  })

  useEffect(() => {
    loadColors()
  }, [])

  async function loadColors() {
    try {
      const data = await getColors()
      setColors(data || [])
    } catch (err) {
      console.error('Error loading colors:', err)
      setError('فشل في تحميل الألوان')
    } finally {
      setIsLoading(false)
    }
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setError('')

    if (!formData.name.trim()) {
      setError('اسم اللون مطلوب')
      return
    }

    try {
      setIsSaving(true)
      await createColor(formData)
      setFormData({ name: '', code: '#000000' })
      await loadColors()
    } catch (err) {
      console.error('Error creating color:', err)
      setError('خطأ في إضافة اللون')
    } finally {
      setIsSaving(false)
    }
  }

  async function handleDelete(id: number) {
    if (!window.confirm('هل أنت متأكد من حذف هذا اللون؟')) return

    setError('')
    try {
      await deleteColor(id)
      await loadColors()
    } catch (err) {
      console.error('Error deleting color:', err)
      setError('خطأ في حذف اللون')
    }
  }

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold mb-2">الألوان</h1>
        <p className="text-muted-foreground">إدارة ألوان الموقع</p>
      </div>

      {error && (
        <div className="p-4 bg-red-500/10 border border-red-500 text-red-600 rounded-lg">
          {error}
        </div>
      )}

      <div className="bg-card border rounded-lg p-6">
        <h2 className="text-xl font-semibold mb-4">إضافة لون جديد</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="name">اسم اللون</Label>
              <Input
                id="name"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                placeholder="أزرق أساسي"
              />
            </div>
            <div>
              <Label htmlFor="code">كود اللون</Label>
              <div className="flex gap-2">
                <Input
                  id="code"
                  type="color"
                  value={formData.code}
                  onChange={(e) => setFormData({ ...formData, code: e.target.value })}
                  className="w-16 h-10"
                />
                <Input
                  value={formData.code}
                  onChange={(e) => setFormData({ ...formData, code: e.target.value })}
                  placeholder="#000000"
                  className="flex-1"
                />
              </div>
            </div>
          </div>
          <Button type="submit" disabled={isSaving}>
            {isSaving ? 'جاري الإضافة...' : 'إضافة لون'}
          </Button>
        </form>
      </div>

      {isLoading ? (
        <div className="p-8 text-center text-muted-foreground">جاري التحميل...</div>
      ) : colors.length === 0 ? (
        <div className="p-8 text-center text-muted-foreground">لا توجد ألوان</div>
      ) : (
        <div className="bg-card border rounded-lg">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 p-6">
            {colors.map((color) => (
              <div key={color.id} className="border rounded-lg p-4 space-y-3">
                <div className="flex items-center gap-3">
                  <div
                    className="w-12 h-12 rounded border"
                    style={{ backgroundColor: color.code }}
                  />
                  <div className="flex-1">
                    <h3 className="font-semibold">{color.name}</h3>
                    <p className="text-sm text-muted-foreground">{color.code}</p>
                  </div>
                </div>
                <Button
                  variant="destructive"
                  size="sm"
                  onClick={() => handleDelete(color.id)}
                  className="w-full"
                >
                  <Trash2 className="h-4 w-4 mr-2" />
                  حذف
                </Button>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}
