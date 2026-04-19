'use client'

export const dynamic = 'force-dynamic'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { logoutAdmin } from '@/app/actions/auth'
import { 
  getProjects,
  getSkills,
  getServices,
  getClients,
  getProfile,
} from '@/app/actions/cms'
import {
  LayoutDashboard,
  LogOut,
  User,
  FolderKanban,
  Sparkles,
  BriefcaseBusiness,
  Users,
  ArrowRight,
} from 'lucide-react'

export default function AdminDashboard() {
  const router = useRouter()
  const [stats, setStats] = useState({
    projects: 0,
    skills: 0,
    services: 0,
    clients: 0,
  })
  const [profile, setProfile] = useState<any>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    loadDashboard()
  }, [])

  async function loadDashboard() {
    try {
      const [profileData, projects, skills, services, clients] = await Promise.all([
        getProfile(),
        getProjects(),
        getSkills(),
        getServices(),
        getClients(),
      ])

      setProfile(profileData)
      setStats({
        projects: Array.isArray(projects) ? projects.length : 0,
        skills: Array.isArray(skills) ? skills.length : 0,
        services: Array.isArray(services) ? services.length : 0,
        clients: Array.isArray(clients) ? clients.length : 0,
      })
    } catch (e) {
      console.error('Dashboard load error:', e)
      setError('Failed to load dashboard')
    } finally {
      setIsLoading(false)
    }
  }

  async function handleLogout() {
    await logoutAdmin()
    router.push('/admin/login')
  }

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <div className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-primary border-t-transparent"></div>
          <p className="mt-4 text-muted-foreground">Loading dashboard...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8 max-w-6xl">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold flex items-center gap-2">
              <LayoutDashboard className="h-8 w-8" />
              Admin Dashboard
            </h1>
            <p className="text-muted-foreground mt-1">Welcome, {profile?.name || 'Admin'}</p>
          </div>
          <Button variant="outline" onClick={handleLogout}>
            <LogOut className="h-4 w-4 mr-2" />
            Logout
          </Button>
        </div>

        {error && (
          <div className="bg-destructive/10 border border-destructive rounded-lg p-4 mb-6">
            <p className="text-destructive text-sm">{error}</p>
          </div>
        )}

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
          <StatsCard
            icon={<FolderKanban className="h-6 w-6" />}
            label="Projects"
            value={stats.projects}
            href="/admin/projects"
          />
          <StatsCard
            icon={<Sparkles className="h-6 w-6" />}
            label="Skills"
            value={stats.skills}
            href="/admin/skills"
          />
          <StatsCard
            icon={<BriefcaseBusiness className="h-6 w-6" />}
            label="Services"
            value={stats.services}
            href="/admin/services"
          />
          <StatsCard
            icon={<Users className="h-6 w-6" />}
            label="Clients"
            value={stats.clients}
            href="/admin/clients"
          />
        </div>

        {/* Quick Navigation */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <NavCard href="/admin/projects" title="Manage Projects" icon={FolderKanban} />
          <NavCard href="/admin/skills" title="Manage Skills" icon={Sparkles} />
          <NavCard href="/admin/services" title="Manage Services" icon={BriefcaseBusiness} />
          <NavCard href="/admin/profile" title="Edit Profile" icon={User} />
        </div>
      </div>
    </div>
  )
}

function StatsCard({
  icon,
  label,
  value,
  href,
}: {
  icon: React.ReactNode
  label: string
  value: number
  href: string
}) {
  return (
    <Link href={href}>
      <div className="bg-card border rounded-lg p-6 hover:shadow-lg transition-shadow cursor-pointer">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-muted-foreground text-sm">{label}</p>
            <p className="text-3xl font-bold mt-2">{value}</p>
          </div>
          <div className="text-primary opacity-50">{icon}</div>
        </div>
      </div>
    </Link>
  )
}

function NavCard({
  href,
  title,
  icon: Icon,
}: {
  href: string
  title: string
  icon: any
}) {
  return (
    <Link href={href}>
      <div className="bg-card border rounded-lg p-6 hover:shadow-lg transition-shadow cursor-pointer group">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Icon className="h-6 w-6 text-primary group-hover:translate-x-1 transition-transform" />
            <h3 className="font-semibold">{title}</h3>
          </div>
          <ArrowRight className="h-5 w-5 text-muted-foreground group-hover:translate-x-1 transition-transform" />
        </div>
      </div>
    </Link>
  )
}
