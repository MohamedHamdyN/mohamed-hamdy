import { ReactNode } from 'react'
import Link from 'next/link'
import { getAdminFromSession } from '@/lib/auth'
import { redirect } from 'next/navigation'
import {
  LayoutDashboard,
  User,
  FolderKanban,
  Sparkles,
  BriefcaseBusiness,
  Users,
  Settings,
  Palette,
  FileText,
  Share2,
  LogOut,
  Menu,
} from 'lucide-react'
import { Button } from '@/components/ui/button'

const ADMIN_NAVIGATION = [
  { label: 'Dashboard', href: '/admin/dashboard', icon: LayoutDashboard },
  { label: 'Profile', href: '/admin/profile', icon: User },
  { label: 'Projects', href: '/admin/projects', icon: FolderKanban },
  { label: 'Skills', href: '/admin/skills', icon: Sparkles },
  { label: 'Services', href: '/admin/services', icon: BriefcaseBusiness },
  { label: 'Categories', href: '/admin/categories', icon: FileText },
  { label: 'Colors', href: '/admin/colors', icon: Palette },
  { label: 'Clients', href: '/admin/clients', icon: Users },
  { label: 'Social Media', href: '/admin/social', icon: Share2 },
  { label: 'About', href: '/admin/about', icon: FileText },
  { label: 'Pages', href: '/admin/pages', icon: FileText },
  { label: 'Settings', href: '/admin/settings', icon: Settings },
]

export default async function AdminLayout({ children }: { children: ReactNode }) {
  const admin = await getAdminFromSession()

  if (!admin) {
    redirect('/admin/login')
  }

  return (
    <div className="flex h-screen bg-background">
      {/* Sidebar */}
      <aside className="w-64 border-r border-border bg-card">
        <div className="flex h-full flex-col">
          {/* Logo */}
          <div className="border-b border-border px-6 py-6">
            <Link href="/admin/dashboard" className="flex items-center gap-2 font-bold text-lg">
              <LayoutDashboard className="h-6 w-6" />
              Admin Panel
            </Link>
          </div>

          {/* Navigation */}
          <nav className="flex-1 overflow-y-auto px-3 py-6">
            <ul className="space-y-2">
              {ADMIN_NAVIGATION.map((item) => {
                const Icon = item.icon
                return (
                  <li key={item.href}>
                    <Link href={item.href}>
                      <div className="flex items-center gap-3 rounded-md px-3 py-2 text-sm font-medium transition-colors hover:bg-accent hover:text-accent-foreground">
                        <Icon className="h-4 w-4" />
                        {item.label}
                      </div>
                    </Link>
                  </li>
                )
              })}
            </ul>
          </nav>

          {/* User Info & Logout */}
          <div className="border-t border-border px-6 py-4">
            <div className="flex items-center justify-between">
              <div className="text-sm text-muted-foreground">
                <p className="font-medium text-foreground">Admin</p>
                <p className="text-xs">{admin.email}</p>
              </div>
              <form action={async () => {
                'use server'
                const { logoutAdmin } = await import('@/app/actions/auth')
                await logoutAdmin()
              }}>
                <button type="submit" className="p-1 text-muted-foreground hover:text-foreground transition-colors">
                  <LogOut className="h-4 w-4" />
                </button>
              </form>
            </div>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 overflow-y-auto">
        <div className="mx-auto max-w-7xl px-6 py-8">
          {children}
        </div>
      </main>
    </div>
  )
}
