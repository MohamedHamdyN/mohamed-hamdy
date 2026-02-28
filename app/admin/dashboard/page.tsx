'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { logoutAdmin } from '@/app/actions/auth'
import { getProfile, getProjects, getSkills, getServices, getClients } from '@/app/actions/cms'

interface DashboardStats {
  projects: number
  skills: number
  services: number
  clients: number
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

  useEffect(() => {
    async function loadData() {
      try {
        const [profileData, projects, skills, services, clients] = await Promise.all([
          getProfile(),
          getProjects(true), // Include drafts
          getSkills(),
          getServices(),
          getClients(),
        ])

        setProfile(profileData)
        setStats({
          projects: projects.length,
          skills: skills.length,
          services: services.length,
          clients: clients.length,
        })
      } catch (error) {
        console.error('Error loading dashboard data:', error)
      } finally {
        setIsLoading(false)
      }
    }

    loadData()
  }, [])

  async function handleLogout() {
    try {
      await logoutAdmin()
      router.push('/admin/login')
    } catch (error) {
      console.error('Logout error:', error)
    }
  }

  return (
    <div className="min-h-screen bg-slate-900">
      <header className="border-b border-slate-700 bg-slate-800/50">
        <div className="container mx-auto px-4 py-6 flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-white">Admin Dashboard</h1>
            <p className="text-slate-400 mt-1">{profile?.name || 'Portfolio Management'}</p>
          </div>
          <Button
            onClick={handleLogout}
            variant="outline"
            className="border-slate-600 text-slate-200 hover:bg-slate-700"
          >
            Logout
          </Button>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        {isLoading ? (
          <div className="text-center text-slate-400">Loading...</div>
        ) : (
          <>
            {/* Statistics Grid */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
              <div className="bg-slate-800 border border-slate-700 rounded-lg p-6">
                <p className="text-slate-400 text-sm mb-2">Projects</p>
                <p className="text-3xl font-bold text-blue-400">{stats.projects}</p>
              </div>
              <div className="bg-slate-800 border border-slate-700 rounded-lg p-6">
                <p className="text-slate-400 text-sm mb-2">Skills</p>
                <p className="text-3xl font-bold text-purple-400">{stats.skills}</p>
              </div>
              <div className="bg-slate-800 border border-slate-700 rounded-lg p-6">
                <p className="text-slate-400 text-sm mb-2">Services</p>
                <p className="text-3xl font-bold text-green-400">{stats.services}</p>
              </div>
              <div className="bg-slate-800 border border-slate-700 rounded-lg p-6">
                <p className="text-slate-400 text-sm mb-2">Clients</p>
                <p className="text-3xl font-bold text-orange-400">{stats.clients}</p>
              </div>
            </div>

            {/* Management Sections */}
            <div className="bg-slate-800 border border-slate-700 rounded-lg p-8">
              <h2 className="text-2xl font-bold text-white mb-6">Management</h2>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                <Link
                  href="/admin/profile"
                  className="block p-4 bg-slate-700 hover:bg-slate-600 rounded-lg transition group"
                >
                  <h3 className="font-semibold text-white group-hover:text-blue-400 transition">
                    Profile
                  </h3>
                  <p className="text-sm text-slate-400 mt-1">Edit your profile information</p>
                </Link>

                <Link
                  href="/admin/skills"
                  className="block p-4 bg-slate-700 hover:bg-slate-600 rounded-lg transition group"
                >
                  <h3 className="font-semibold text-white group-hover:text-purple-400 transition">
                    Skills
                  </h3>
                  <p className="text-sm text-slate-400 mt-1">Manage your professional skills</p>
                </Link>

                <Link
                  href="/admin/projects"
                  className="block p-4 bg-slate-700 hover:bg-slate-600 rounded-lg transition group"
                >
                  <h3 className="font-semibold text-white group-hover:text-blue-400 transition">
                    Projects
                  </h3>
                  <p className="text-sm text-slate-400 mt-1">Create and manage projects</p>
                </Link>

                <Link
                  href="/admin/services"
                  className="block p-4 bg-slate-700 hover:bg-slate-600 rounded-lg transition group"
                >
                  <h3 className="font-semibold text-white group-hover:text-green-400 transition">
                    Services
                  </h3>
                  <p className="text-sm text-slate-400 mt-1">Manage your services</p>
                </Link>

                <Link
                  href="/admin/clients"
                  className="block p-4 bg-slate-700 hover:bg-slate-600 rounded-lg transition group"
                >
                  <h3 className="font-semibold text-white group-hover:text-orange-400 transition">
                    Clients
                  </h3>
                  <p className="text-sm text-slate-400 mt-1">Manage client testimonials</p>
                </Link>

                <Link
                  href="/admin/social"
                  className="block p-4 bg-slate-700 hover:bg-slate-600 rounded-lg transition group"
                >
                  <h3 className="font-semibold text-white group-hover:text-pink-400 transition">
                    Social Links
                  </h3>
                  <p className="text-sm text-slate-400 mt-1">Update social media links</p>
                </Link>

                <Link
                  href="/admin/settings"
                  className="block p-4 bg-slate-700 hover:bg-slate-600 rounded-lg transition group"
                >
                  <h3 className="font-semibold text-white group-hover:text-cyan-400 transition">
                    Site Settings
                  </h3>
                  <p className="text-sm text-slate-400 mt-1">Configure site-wide settings</p>
                </Link>
              </div>
            </div>
          </>
        )}
      </main>
    </div>
  )
}
