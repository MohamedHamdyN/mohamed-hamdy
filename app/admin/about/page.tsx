'use client'

export const dynamic = 'force-dynamic'

import { useState, useEffect } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Label } from '@/components/ui/label'
import { Trash2, Edit2, Plus } from 'lucide-react'
import {
  getStats,
  createStat,
  updateStat,
  deleteStat,
  getEducation,
  createEducationRecord,
  updateEducationRecord,
  deleteEducationRecord,
  getExperiences,
  createExperience,
  updateExperience,
  deleteExperience,
  getCertifications,
  createCertification,
  updateCertification,
  deleteCertification,
} from '@/app/actions/cms'

export default function AboutAdmin() {
  const [activeTab, setActiveTab] = useState<'stats' | 'education' | 'experience' | 'certifications'>('stats')
  
  // Stats
  const [stats, setStats] = useState<any[]>([])
  const [statForm, setStatForm] = useState({ title: '', value: '', description: '', icon: '', color_id: 1, sort_order: 0, status: true })
  const [editingStatId, setEditingStatId] = useState<number | null>(null)

  // Education
  const [education, setEducation] = useState<any[]>([])
  const [eduForm, setEduForm] = useState({ title: '', university: '', degree: '', start_date: '', end_date: '', status: true })
  const [editingEduId, setEditingEduId] = useState<number | null>(null)

  // Experience
  const [experience, setExperience] = useState<any[]>([])
  const [expForm, setExpForm] = useState({ job_title: '', company: '', description: '', start_date: '', end_date: '', logo: '', status: true })
  const [editingExpId, setEditingExpId] = useState<number | null>(null)

  // Certifications
  const [certs, setCerts] = useState<any[]>([])
  const [certForm, setCertForm] = useState({ title: '', issuer: '', issuer_date: '', url: '', description: '', status: true, sort_order: 0 })
  const [editingCertId, setEditingCertId] = useState<number | null>(null)

  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    loadAllData()
  }, [])

  const loadAllData = async () => {
    try {
      const [s, e, ex, c] = await Promise.all([
        getStats(),
        getEducation(),
        getExperiences(),
        getCertifications(),
      ])
      setStats(s || [])
      setEducation(e || [])
      setExperience(ex || [])
      setCerts(c || [])
    } catch (err) {
      console.error('Error loading data:', err)
    } finally {
      setIsLoading(false)
    }
  }

  // Stats handlers
  const handleSaveStat = async (e: React.FormEvent) => {
    e.preventDefault()
    try {
      if (editingStatId) {
        await updateStat(editingStatId, statForm)
        setEditingStatId(null)
      } else {
        await createStat(statForm)
      }
      setStatForm({ title: '', value: '', description: '', icon: '', color_id: 1, sort_order: 0, status: true })
      await loadAllData()
    } catch (err) {
      console.error('Error saving stat:', err)
    }
  }

  const handleDeleteStat = async (id: number) => {
    if (confirm('Delete this stat?')) {
      try {
        await deleteStat(id)
        await loadAllData()
      } catch (err) {
        console.error('Error deleting stat:', err)
      }
    }
  }

  // Education handlers
  const handleSaveEducation = async (e: React.FormEvent) => {
    e.preventDefault()
    try {
      if (editingEduId) {
        await updateEducationRecord(editingEduId, eduForm)
        setEditingEduId(null)
      } else {
        await createEducationRecord(eduForm)
      }
      setEduForm({ title: '', university: '', degree: '', start_date: '', end_date: '', status: true })
      await loadAllData()
    } catch (err) {
      console.error('Error saving education:', err)
    }
  }

  const handleDeleteEducation = async (id: number) => {
    if (confirm('Delete this education?')) {
      try {
        await deleteEducationRecord(id)
        await loadAllData()
      } catch (err) {
        console.error('Error deleting education:', err)
      }
    }
  }

  // Experience handlers
  const handleSaveExperience = async (e: React.FormEvent) => {
    e.preventDefault()
    try {
      if (editingExpId) {
        await updateExperience(editingExpId, expForm)
        setEditingExpId(null)
      } else {
        await createExperience(expForm)
      }
      setExpForm({ job_title: '', company: '', description: '', start_date: '', end_date: '', logo: '', status: true })
      await loadAllData()
    } catch (err) {
      console.error('Error saving experience:', err)
    }
  }

  const handleDeleteExperience = async (id: number) => {
    if (confirm('Delete this experience?')) {
      try {
        await deleteExperience(id)
        await loadAllData()
      } catch (err) {
        console.error('Error deleting experience:', err)
      }
    }
  }

  // Certification handlers
  const handleSaveCertification = async (e: React.FormEvent) => {
    e.preventDefault()
    try {
      if (editingCertId) {
        await updateCertification(editingCertId, certForm)
        setEditingCertId(null)
      } else {
        await createCertification(certForm)
      }
      setCertForm({ title: '', issuer: '', year: '' })
      await loadAllData()
    } catch (err) {
      console.error('Error saving certification:', err)
    }
  }

  const handleDeleteCertification = async (id: number) => {
    if (confirm('Delete this certification?')) {
      try {
        await deleteCertification(id)
        await loadAllData()
      } catch (err) {
        console.error('Error deleting certification:', err)
      }
    }
  }

  if (isLoading) return <div>جاري التحميل...</div>

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold mb-2">حول</h1>
        <p className="text-muted-foreground">إدارة بيانات صفحة حول</p>
      </div>

      {/* Tabs */}
      <div className="flex gap-2 border-b">
        {(['stats', 'education', 'experience', 'certifications'] as const).map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`px-4 py-2 font-medium border-b-2 transition-colors ${
              activeTab === tab
                ? 'border-primary text-foreground'
                : 'border-transparent text-muted-foreground hover:text-foreground'
            }`}
          >
            {tab === 'stats' && 'الإحصائيات'}
            {tab === 'education' && 'التعليم'}
            {tab === 'experience' && 'الخبرة'}
            {tab === 'certifications' && 'الشهادات'}
          </button>
        ))}
      </div>

      {/* Stats Tab */}
      {activeTab === 'stats' && (
        <div className="space-y-6">
          <div className="bg-card border rounded-lg p-6">
            <h2 className="text-xl font-semibold mb-4">
              {editingStatId ? 'تعديل إحصائية' : 'إضافة إحصائية جديدة'}
            </h2>
            <form onSubmit={handleSaveStat} className="space-y-4">
              <Input
                placeholder="التسمية (مثال: سنوات الخبرة)"
                value={statForm.label}
                onChange={(e) => setStatForm({ ...statForm, label: e.target.value })}
              />
              <Input
                placeholder="القيمة (مثال: 5)"
                value={statForm.value}
                onChange={(e) => setStatForm({ ...statForm, value: e.target.value })}
              />
              <Textarea placeholder="الوصف" value={statForm.description} onChange={(e) => setStatForm({ ...statForm, description: e.target.value })} />
              <div className="flex gap-2">
                <Button type="submit">{editingStatId ? 'تحديث' : 'إضافة'}</Button>
                {editingStatId && (
                  <Button variant="outline" onClick={() => { setEditingStatId(null); setStatForm({ label: '', value: '', description: '' }); }}>
                    إلغاء
                  </Button>
                )}
              </div>
            </form>
          </div>

          <div className="space-y-2">
            {stats.map((stat) => (
              <div key={stat.id} className="bg-card border rounded-lg p-4 flex justify-between items-center">
                <div>
                  <h3 className="font-semibold">{stat.label}</h3>
                  <p className="text-muted-foreground text-sm">{stat.value}</p>
                </div>
                <div className="flex gap-2">
                  <Button size="sm" variant="outline" onClick={() => { setEditingStatId(stat.id); setStatForm(stat); }}>
                    <Edit2 className="h-4 w-4" />
                  </Button>
                  <Button size="sm" variant="destructive" onClick={() => handleDeleteStat(stat.id)}>
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Education Tab */}
      {activeTab === 'education' && (
        <div className="space-y-6">
          <div className="bg-card border rounded-lg p-6">
            <h2 className="text-xl font-semibold mb-4">
              {editingEduId ? 'تعديل التعليم' : 'إضافة تعليم جديد'}
            </h2>
            <form onSubmit={handleSaveEducation} className="space-y-4">
              <Input placeholder="المدرسة/الجامعة" value={eduForm.school} onChange={(e) => setEduForm({ ...eduForm, school: e.target.value })} />
              <Input placeholder="الدرجة" value={eduForm.degree} onChange={(e) => setEduForm({ ...eduForm, degree: e.target.value })} />
              <Input placeholder="التخصص" value={eduForm.field} onChange={(e) => setEduForm({ ...eduForm, field: e.target.value })} />
              <Input placeholder="السنة" value={eduForm.year} onChange={(e) => setEduForm({ ...eduForm, year: e.target.value })} />
              <div className="flex gap-2">
                <Button type="submit">{editingEduId ? 'تحديث' : 'إضافة'}</Button>
                {editingEduId && (
                  <Button variant="outline" onClick={() => { setEditingEduId(null); setEduForm({ school: '', degree: '', field: '', year: '' }); }}>
                    إلغاء
                  </Button>
                )}
              </div>
            </form>
          </div>

          <div className="space-y-2">
            {education.map((edu) => (
              <div key={edu.id} className="bg-card border rounded-lg p-4 flex justify-between items-center">
                <div>
                  <h3 className="font-semibold">{edu.school}</h3>
                  <p className="text-muted-foreground text-sm">{edu.degree} - {edu.field}</p>
                </div>
                <div className="flex gap-2">
                  <Button size="sm" variant="outline" onClick={() => { setEditingEduId(edu.id); setEduForm(edu); }}>
                    <Edit2 className="h-4 w-4" />
                  </Button>
                  <Button size="sm" variant="destructive" onClick={() => handleDeleteEducation(edu.id)}>
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Experience Tab */}
      {activeTab === 'experience' && (
        <div className="space-y-6">
          <div className="bg-card border rounded-lg p-6">
            <h2 className="text-xl font-semibold mb-4">
              {editingExpId ? 'تعديل الخبرة' : 'إضافة خبرة جديدة'}
            </h2>
            <form onSubmit={handleSaveExperience} className="space-y-4">
              <Input placeholder="المسمى الوظيفي" value={expForm.title} onChange={(e) => setExpForm({ ...expForm, title: e.target.value })} />
              <Input placeholder="الشركة" value={expForm.company} onChange={(e) => setExpForm({ ...expForm, company: e.target.value })} />
              <Textarea placeholder="الوصف" value={expForm.description} onChange={(e) => setExpForm({ ...expForm, description: e.target.value })} />
              <Input placeholder="السنة" value={expForm.year} onChange={(e) => setExpForm({ ...expForm, year: e.target.value })} />
              <div className="flex gap-2">
                <Button type="submit">{editingExpId ? 'تحديث' : 'إضافة'}</Button>
                {editingExpId && (
                  <Button variant="outline" onClick={() => { setEditingExpId(null); setExpForm({ title: '', company: '', description: '', year: '' }); }}>
                    إلغاء
                  </Button>
                )}
              </div>
            </form>
          </div>

          <div className="space-y-2">
            {experience.map((exp) => (
              <div key={exp.id} className="bg-card border rounded-lg p-4 flex justify-between items-center">
                <div>
                  <h3 className="font-semibold">{exp.title}</h3>
                  <p className="text-muted-foreground text-sm">{exp.company}</p>
                </div>
                <div className="flex gap-2">
                  <Button size="sm" variant="outline" onClick={() => { setEditingExpId(exp.id); setExpForm(exp); }}>
                    <Edit2 className="h-4 w-4" />
                  </Button>
                  <Button size="sm" variant="destructive" onClick={() => handleDeleteExperience(exp.id)}>
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Certifications Tab */}
      {activeTab === 'certifications' && (
        <div className="space-y-6">
          <div className="bg-card border rounded-lg p-6">
            <h2 className="text-xl font-semibold mb-4">
              {editingCertId ? 'تعديل الشهادة' : 'إضافة شهادة جديدة'}
            </h2>
            <form onSubmit={handleSaveCertification} className="space-y-4">
              <Input placeholder="اسم الشهادة" value={certForm.title} onChange={(e) => setCertForm({ ...certForm, title: e.target.value })} />
              <Input placeholder="الجهة المصدرة" value={certForm.issuer} onChange={(e) => setCertForm({ ...certForm, issuer: e.target.value })} />
              <Input placeholder="السنة" value={certForm.year} onChange={(e) => setCertForm({ ...certForm, year: e.target.value })} />
              <div className="flex gap-2">
                <Button type="submit">{editingCertId ? 'تحديث' : 'إضافة'}</Button>
                {editingCertId && (
                  <Button variant="outline" onClick={() => { setEditingCertId(null); setCertForm({ title: '', issuer: '', year: '' }); }}>
                    إلغاء
                  </Button>
                )}
              </div>
            </form>
          </div>

          <div className="space-y-2">
            {certs.map((cert) => (
              <div key={cert.id} className="bg-card border rounded-lg p-4 flex justify-between items-center">
                <div>
                  <h3 className="font-semibold">{cert.title}</h3>
                  <p className="text-muted-foreground text-sm">{cert.issuer}</p>
                </div>
                <div className="flex gap-2">
                  <Button size="sm" variant="outline" onClick={() => { setEditingCertId(cert.id); setCertForm(cert); }}>
                    <Edit2 className="h-4 w-4" />
                  </Button>
                  <Button size="sm" variant="destructive" onClick={() => handleDeleteCertification(cert.id)}>
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}
