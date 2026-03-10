'use client'

import { useEffect, useMemo, useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { logoutAdmin } from '@/app/actions/auth'
import { getProfile, getProjects, getSkills, getServices, getClients } from '@/app/actions/cms'
import {
  LayoutDashboard,
  LogOut,
  User,
  FolderKanban,
  Sparkles,
  BriefcaseBusiness,
  Users,
  Share2,
  Settings,
  Info,
  ArrowRight,
  Shield,
} from 'lucide-react'

type DashboardStats = {
  projects: number
  skills: number
  services: number
  clients: number
}

function cn(...x: Array<string | false | null | undefined>) {
  return x.filter(Boolean).join(' ')
}

export default function AdminDashboard() {
  const router = useRouter()

  const [stats, setStats] = useState<DashboardStats>({
    projects: 0,
    skills: 0,
    services: 0,
    clients: 0,
  })

  const [profile, setProfile] = useState<any>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string>('')

  useEffect(() => {
    let mounted = true

    async function loadData() {
      try {
        setError('')
        setIsLoading(true)

        const [profileData, projects, skills, services, clients] = await Promise.all([
          getProfile(),
          getProjects(true),
          getSkills(),
          getServices(),
          getClients(),
        ])

        if (!mounted) return

        setProfile(profileData)
        setStats({
          projects: Array.isArray(projects) ? projects.length : 0,
          skills: Array.isArray(skills) ? skills.length : 0,
          services: Array.isArray(services) ? services.length : 0,
          clients: Array.isArray(clients) ? clients.length : 0,
        })
      } catch (e) {
        console.error('Error loading dashboard data:', e)
        if (!mounted) return
        setError('Failed to load dashboard data. Please refresh.')
      } finally {
        if (mounted) setIsLoading(false)
      }
    }

    loadData()
    return () => {
      mounted = false
    }
  }, [])

  async function handleLogout() {
    try {
      await logoutAdmin()
      router.push('/admin/login')
    } catch (e) {
      console.error('Logout error:', e)
      setError('Logout failed. Try again.')
    }
  }

  const quickLinks = useMemo(
    () => [
      {
        href: '/admin/profile',
        title: 'Profile',
        desc: 'Name, titles, bios, hero fields, contact links',
        icon: User,
        accent: 'group-hover:text-blue-400',
      },
      {
        href: '/admin/projects',
        title: 'Projects',
        desc: 'Create/edit projects, drafts, featured',
        icon: FolderKanban,
        accent: 'group-hover:text-cyan-400',
      },
      {
        href: '/admin/skills',
        title: 'Skills',
        desc: 'Manage skills list & ordering',
        icon: Sparkles,
        accent: 'group-hover:text-purple-400',
      },
      {
        href: '/admin/services',
        title: 'Services',
        desc: 'Edit your service offerings',
        icon: BriefcaseBusiness,
        accent: 'group-hover:text-green-400',
      },
      {
        href: '/admin/clients',
        title: 'Clients',
        desc: 'Testimonials and client logos',
        icon: Users,
        accent: 'group-hover:text-orange-400',
      },
      {
        href: '/admin/social',
        title: 'Social Links',
        desc: 'Update socials shown across site',
        icon: Share2,
        accent: 'group-hover:text-pink-400',
      },
      {
        href: '/admin/about',
        title: 'About Page',
        desc: 'Stats, experience, education, certifications',
        icon: Info,
        accent: 'group-hover:text-indigo-400',
      },
      {
        href: '/admin/settings',
        title: 'Site Settings',
        desc: 'SEO, OG image, maintenance mode + admin creds',
        icon: Settings,
        accent: 'group-hover:text-teal-400',
      },
    ],
    []
  )

  const statCards = useMemo(
    () => [
      { label: 'Projects', value: stats.projects, icon: FolderKanban, tone: 'text-cyan-300' },
      { label: 'Skills', value: stats.skills, icon: Sparkles, tone: 'text-purple-300' },
      { label: 'Services', value: stats.services, icon: BriefcaseBusiness, tone: 'text-green-300' },
      { label: 'Clients', value: stats.clients, icon: Users, tone: 'text-orange-300' },
    ],
    [stats]
  )

  const displayName = profile?.name || 'Portfolio Management'
  const displayTitle = profile?.title || ''

  return (
    <div className="min-h-screen bg-slate-900">
      {/* Header */}
      <header className="border-b border-slate-700 bg-slate-800/50">
        <div className="container mx-auto px-4 py-6">
          <div className="flex items-start justify-between gap-4">
            <div className="flex items-start gap-3">
              <div className="mt-1 rounded-lg border border-slate-700 bg-slate-900/60 p-2">
                <LayoutDashboard className="h-5 w-5 text-slate-200" />
              </div>

              <div>
                <h1 className="text-3xl font-bold text-white">Admin Dashboard</h1>
                <p className="text-slate-400 mt-1">
                  {displayName}
                  {displayTitle ? <span className="text-slate-500"> • {displayTitle}</span> : null}
                </p>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <Link
                href="/"
                className="hidden sm:inline-flex items-center gap-2 rounded-md border border-slate-700 bg-slate-900/40 px-3 py-2 text-slate-200 hover:bg-slate-800"
              >
                View Site <ArrowRight className="h-4 w-4" />
              </Link>

              <Button
                onClick={handleLogout}
                variant="outline"
                className="border-slate-600 text-slate-200 hover:bg-slate-700"
              >
                <LogOut className="h-4 w-4 mr-2" />
                Logout
              </Button>
            </div>
          </div>

          {/* Status line */}
          <div className="mt-5 flex flex-wrap items-center gap-2 text-xs">
            <span className="rounded-full border border-slate-700 bg-slate-900/40 px-3 py-1 text-slate-300">
              Session: <span className="text-slate-200">Active</span>
            </span>
            <span className="rounded-full border border-slate-700 bg-slate-900/40 px-3 py-1 text-slate-300">
              Mode:{' '}
              <span className={profile?.open_to_work ? 'text-green-300' : 'text-slate-200'}>
                {profile?.open_to_work ? 'Open to Work' : 'Normal'}
              </span>
            </span>
            <span className="rounded-full border border-slate-700 bg-slate-900/40 px-3 py-1 text-slate-300">
              Security: <span className="text-slate-200">Admins + Sessions</span>
              <Shield className="inline-block h-3.5 w-3.5 ml-1 text-slate-300" />
            </span>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        {error ? (
          <div className="mb-6 rounded-lg border border-red-500/40 bg-red-500/10 p-4">
            <p className="text-red-300 text-sm">{error}</p>
          </div>
        ) : null}

        {/* Loading */}
        {isLoading ? (
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              {Array.from({ length: 4 }).map((_, i) => (
                <div key={i} className="rounded-lg border border-slate-700 bg-slate-800 p-6">
                  <div className="h-4 w-24 bg-slate-700/60 rounded mb-3 animate-pulse" />
                  <div className="h-8 w-16 bg-slate-700/60 rounded animate-pulse" />
                </div>
              ))}
            </div>

            <div className="rounded-lg border border-slate-700 bg-slate-800 p-8">
              <div className="h-5 w-40 bg-slate-700/60 rounded mb-4 animate-pulse" />
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {Array.from({ length: 6 }).map((_, i) => (
                  <div key={i} className="rounded-lg bg-slate-700/40 p-4">
                    <div className="h-4 w-28 bg-slate-700/60 rounded mb-2 animate-pulse" />
                    <div className="h-3 w-48 bg-slate-700/60 rounded animate-pulse" />
                  </div>
                ))}
              </div>
            </div>
          </div>
        ) : (
          <>
            {/* Stats */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
              {statCards.map((s) => {
                const Icon = s.icon
                return (
                  <div
                    key={s.label}
                    className="rounded-lg border border-slate-700 bg-slate-800 p-6 hover:bg-slate-800/80 transition"
                  >
                    <div className="flex items-center justify-between">
                      <p className="text-slate-400 text-sm">{s.label}</p>
                      <Icon className={cn('h-5 w-5', s.tone)} />
                    </div>
                    <p className={cn('mt-3 text-3xl font-bold', s.tone)}>{s.value}</p>
                    <p className="mt-2 text-xs text-slate-500">Total items in database</p>
                  </div>
                )
              })}
            </div>

            {/* Management */}
            <div className="rounded-lg border border-slate-700 bg-slate-800 p-8">
              <div className="flex items-center justify-between gap-4">
                <div>
                  <h2 className="text-2xl font-bold text-white">Management</h2>
                  <p className="text-slate-400 mt-1">Everything you need to keep the site synced with the database.</p>
                </div>

                <Link
                  href="/admin/settings"
                  className="hidden md:inline-flex items-center gap-2 rounded-md border border-slate-700 bg-slate-900/40 px-3 py-2 text-slate-200 hover:bg-slate-800"
                >
                  Security & Settings <ArrowRight className="h-4 w-4" />
                </Link>
              </div>

              <div className="mt-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {quickLinks.map((x) => {
                  const Icon = x.icon
                  return (
                    <Link
                      key={x.href}
                      href={x.href}
                      className="group block rounded-lg bg-slate-700/40 hover:bg-slate-700/60 border border-slate-700/60 p-5 transition"
                    >
                      <div className="flex items-start justify-between gap-4">
                        <div>
                          <h3 className={cn('font-semibold text-white transition', x.accent)}>{x.title}</h3>
                          <p className="text-sm text-slate-400 mt-1">{x.desc}</p>
                        </div>
                        <div className="rounded-md border border-slate-700 bg-slate-900/40 p-2">
                          <Icon className="h-5 w-5 text-slate-200" />
                        </div>
                      </div>

                      <div className="mt-4 flex items-center justify-end text-sm text-slate-300">
                        Open <ArrowRight className="ml-2 h-4 w-4 text-slate-400 group-hover:text-slate-200 transition" />
                      </div>
                    </Link>
                  )
                })}
              </div>

              {/* Footer actions */}
              <div className="mt-8 border-t border-slate-700 pt-6 flex flex-col md:flex-row md:items-center md:justify-between gap-3">
                <p className="text-sm text-slate-400">
                  Tip: Keep <span className="text-slate-200">Profile</span> as the single source of truth for hero/about
                  texts (short bio / long bio / hero description).
                </p>

                <div className="flex gap-2">
                  <Link href="/admin/profile">
                    <Button className="bg-blue-600 hover:bg-blue-700">Edit Profile</Button>
                  </Link>
                  <Link href="/admin/projects">
                    <Button variant="outline" className="border-slate-600 text-slate-200 hover:bg-slate-700">
                      Manage Projects
                    </Button>
                  </Link>
                </div>
              </div>
            </div>
          </>
        )}
      </main>
    </div>
  )
}