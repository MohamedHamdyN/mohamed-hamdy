'use client'

export const dynamic = 'force-dynamic'

import { useState, useEffect } from 'react'
import { getSettings, updateSettings, getColors } from '@/app/actions/cms'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'

export default function AdminSettingsPage() {
  const [formData, setFormData] = useState({
    admin_limit: 2,
    dashboard_status: true,
    open_to_work: true,
    official_color_id: 1,
    notifications: null as any,
  })

  const [colors, setColors] = useState<any[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [isSaving, setIsSaving] = useState(false)
  const [error, setError] = useState('')
  const [success, setSuccess] = useState('')

  useEffect(() => {
    loadData()
  }, [])

  async function loadData() {
    try {
      const [settings, colorsList] = await Promise.all([
        getSettings(),
        getColors(),
      ])
      if (settings) {
        setFormData(settings)
      }
      setColors(colorsList || [])
    } catch (err) {
      console.error('Error loading data:', err)
      setError('فشل في تحميل البيانات')
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
      const result = await updateSettings(formData)
      if ((result as any)?.error) {
        setError((result as any).error)
      } else {
        setSuccess('تم حفظ الإعدادات بنجاح')
      }
    } catch (err) {
      console.error('Error saving settings:', err)
      setError('خطأ في حفظ الإعدادات')
    } finally {
      setIsSaving(false)
    }
  }

  if (isLoading) {
    return <div className="p-8 text-center">جاري التحميل...</div>
  }

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold mb-2">الإعدادات</h1>
        <p className="text-muted-foreground">إدارة إعدادات الموقع</p>
      </div>

      {error && (
        <div className="p-4 bg-red-500/10 border border-red-500 text-red-600 rounded-lg">
          {error}
        </div>
      )}

      {success && (
        <div className="p-4 bg-green-500/10 border border-green-500 text-green-600 rounded-lg">
          {success}
        </div>
      )}

      <form onSubmit={handleSubmit} className="bg-card border rounded-lg p-6 space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <Label htmlFor="admin_limit">عدد المشرفين المسموح</Label>
            <Input
              id="admin_limit"
              type="number"
              value={formData.admin_limit}
              onChange={(e) => setFormData({ ...formData, admin_limit: parseInt(e.target.value) || 2 })}
              min="1"
              max="10"
            />
            <p className="text-xs text-muted-foreground mt-1">عدد حسابات المشرفين التي يمكن إنشاؤها</p>
          </div>

          <div>
            <Label htmlFor="official_color_id">اللون الافتراضي</Label>
            <select
              id="official_color_id"
              value={formData.official_color_id}
              onChange={(e) => setFormData({ ...formData, official_color_id: parseInt(e.target.value) })}
              className="w-full px-3 py-2 border rounded-md bg-background text-foreground"
            >
              {colors.map((color) => (
                <option key={color.id} value={color.id}>
                  {color.name} ({color.code})
                </option>
              ))}
            </select>
          </div>

          <div className="flex items-center space-x-3">
            <input
              id="dashboard_status"
              type="checkbox"
              checked={formData.dashboard_status}
              onChange={(e) => setFormData({ ...formData, dashboard_status: e.target.checked })}
              className="w-4 h-4"
            />
            <Label htmlFor="dashboard_status" className="cursor-pointer mb-0">
              الموقع قيد التشغيل (إذا كانت مرة:False) ستظهر شاشة الصيانة
            </Label>
          </div>

          <div className="flex items-center space-x-3">
            <input
              id="open_to_work"
              type="checkbox"
              checked={formData.open_to_work}
              onChange={(e) => setFormData({ ...formData, open_to_work: e.target.checked })}
              className="w-4 h-4"
            />
            <Label htmlFor="open_to_work" className="cursor-pointer mb-0">
              مستعد للعمل
            </Label>
          </div>
        </div>

        <div>
          <Label htmlFor="notifications">الرسالة الفورية (إن وجدت)</Label>
          <textarea
            id="notifications"
            value={formData.notifications ? JSON.stringify(formData.notifications) : ''}
            onChange={(e) => {
              try {
                const parsed = e.target.value ? JSON.parse(e.target.value) : null
                setFormData({ ...formData, notifications: parsed })
              } catch {
                setFormData({ ...formData, notifications: e.target.value })
              }
            }}
            className="w-full px-3 py-2 border rounded-md bg-background text-foreground"
            placeholder='{"message": "رسالة مهمة", "type": "warning"}'
            rows={4}
          />
          <p className="text-xs text-muted-foreground mt-1">JSON format - ستظهر في منتصف الصفحة مع خلفية شفافة</p>
        </div>

        <Button type="submit" disabled={isSaving} className="w-full">
          {isSaving ? 'جاري الحفظ...' : 'حفظ الإعدادات'}
        </Button>
      </form>
    </div>
  )
}
