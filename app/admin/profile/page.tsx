'use client'

export const dynamic = 'force-dynamic'

import { useState, useEffect } from 'react'
import { getProfile, updateProfile } from '@/app/actions/cms'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Label } from '@/components/ui/label'

export default function AdminProfilePage() {
  const [formData, setFormData] = useState({
    name: '',
    job_title_1: '',
    job_title_2: '',
    email: '',
    phone_number: '',
    location: '',
    hero_description: '',
    description: '',
    special_description: '',
    quote: '',
    resume_url: '',
    calendly_url: '',
  })

  const [isLoading, setIsLoading] = useState(true)
  const [isSaving, setIsSaving] = useState(false)
  const [error, setError] = useState('')
  const [success, setSuccess] = useState('')

  useEffect(() => {
    loadProfile()
  }, [])

  async function loadProfile() {
    try {
      const data = await getProfile()
      if (data) {
        setFormData(data)
      }
    } catch (err) {
      console.error('Error loading profile:', err)
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
      const result = await updateProfile(formData)
      if ((result as any)?.error) {
        setError((result as any).error)
      } else {
        setSuccess('تم حفظ البيانات بنجاح')
        await loadProfile()
      }
    } catch (err) {
      console.error('Error saving profile:', err)
      setError('خطأ في حفظ البيانات')
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
        <h1 className="text-3xl font-bold mb-2">الملف الشخصي</h1>
        <p className="text-muted-foreground">تحديث بيانات الملف الشخصي</p>
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
            <Label htmlFor="name">الاسم</Label>
            <Input
              id="name"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              placeholder="محمد حمدي"
            />
          </div>

          <div>
            <Label htmlFor="email">البريد الإلكتروني</Label>
            <Input
              id="email"
              type="email"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              placeholder="email@example.com"
            />
          </div>

          <div>
            <Label htmlFor="job_title_1">الوظيفة الأولى</Label>
            <Input
              id="job_title_1"
              value={formData.job_title_1}
              onChange={(e) => setFormData({ ...formData, job_title_1: e.target.value })}
              placeholder="مطور ويب"
            />
          </div>

          <div>
            <Label htmlFor="job_title_2">الوظيفة الثانية</Label>
            <Input
              id="job_title_2"
              value={formData.job_title_2}
              onChange={(e) => setFormData({ ...formData, job_title_2: e.target.value })}
              placeholder="مصمم UI/UX"
            />
          </div>

          <div>
            <Label htmlFor="phone_number">رقم الهاتف (أدخل 00 لإخفاءه)</Label>
            <Input
              id="phone_number"
              value={formData.phone_number}
              onChange={(e) => setFormData({ ...formData, phone_number: e.target.value })}
              placeholder="+966..."
            />
          </div>

          <div>
            <Label htmlFor="location">الموقع (أدخل 00 لإخفاءه)</Label>
            <Input
              id="location"
              value={formData.location}
              onChange={(e) => setFormData({ ...formData, location: e.target.value })}
              placeholder="الرياض، السعودية"
            />
          </div>

          <div>
            <Label htmlFor="resume_url">رابط السيرة الذاتية</Label>
            <Input
              id="resume_url"
              value={formData.resume_url}
              onChange={(e) => setFormData({ ...formData, resume_url: e.target.value })}
              placeholder="https://..."
            />
          </div>

          <div>
            <Label htmlFor="calendly_url">رابط Calendly (أدخل 00 لإخفاءه)</Label>
            <Input
              id="calendly_url"
              value={formData.calendly_url}
              onChange={(e) => setFormData({ ...formData, calendly_url: e.target.value })}
              placeholder="https://calendly.com/..."
            />
          </div>
        </div>

        <div>
          <Label htmlFor="hero_description">الوصف في الصفحة الرئيسية</Label>
          <Textarea
            id="hero_description"
            value={formData.hero_description}
            onChange={(e) => setFormData({ ...formData, hero_description: e.target.value })}
            placeholder="الوصف القصير في الصفحة الرئيسية"
            rows={3}
          />
        </div>

        <div>
          <Label htmlFor="special_description">الوصف الخاص (في صفحة About)</Label>
          <Textarea
            id="special_description"
            value={formData.special_description}
            onChange={(e) => setFormData({ ...formData, special_description: e.target.value })}
            placeholder="يظهر في أول صفحة About"
            rows={4}
          />
        </div>

        <div>
          <Label htmlFor="description">الوصف العام (في صفحة About)</Label>
          <Textarea
            id="description"
            value={formData.description}
            onChange={(e) => setFormData({ ...formData, description: e.target.value })}
            placeholder="يظهر أسفل special_description"
            rows={4}
          />
        </div>

        <div>
          <Label htmlFor="quote">الاقتباس أو الرسالة</Label>
          <Textarea
            id="quote"
            value={formData.quote}
            onChange={(e) => setFormData({ ...formData, quote: e.target.value })}
            placeholder="رسالة أو اقتباس يظهر بشكل مميز"
            maxLength={150}
            rows={3}
          />
          <p className="text-xs text-muted-foreground mt-1">{formData.quote.length}/150</p>
        </div>

        <Button type="submit" disabled={isSaving} className="w-full">
          {isSaving ? 'جاري الحفظ...' : 'حفظ البيانات'}
        </Button>
      </form>
    </div>
  )
}
