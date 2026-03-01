import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"

export function middleware(request: NextRequest) {
  const url = request.nextUrl.clone()
  const pathname = url.pathname

  // =========================
  // 1) Protect ALL /admin routes (except /admin/login)
  // =========================
  const isAdminRoute = pathname.startsWith("/admin")
  const isLoginRoute = pathname === "/admin/login"

  if (isAdminRoute && !isLoginRoute) {
    const sessionToken = request.cookies.get("admin_session")?.value
    if (!sessionToken) {
      const loginUrl = new URL("/admin/login", request.url)
      return NextResponse.redirect(loginUrl)
    }
  }

  // =========================
  // 2) Feature toggles (PUBLIC SITE ONLY)
  // =========================
  // IMPORTANT: do not apply these redirects to /admin/*
  if (!isAdminRoute) {
    const websiteEnabled = process.env.DISABLE_WEBSITE !== "true"
    const servicesEnabled = process.env.DISABLE_SERVICES !== "true"
    const aboutEnabled = process.env.DISABLE_ABOUT !== "true"
    const contactEnabled = process.env.DISABLE_CONTACT !== "true"
    const resumeEnabled = process.env.DISABLE_RESUME !== "true"
    const projectsEnabled = process.env.DISABLE_PROJECTS !== "true"

    // If website is disabled, redirect all public routes to home page
    if (!websiteEnabled && pathname !== "/") {
      url.pathname = "/"
      return NextResponse.redirect(url)
    }

    if (pathname.startsWith("/services") && !servicesEnabled) {
      url.pathname = "/"
      return NextResponse.redirect(url)
    }

    if (pathname.startsWith("/about") && !aboutEnabled) {
      url.pathname = "/"
      return NextResponse.redirect(url)
    }

    if (pathname.startsWith("/contact") && !contactEnabled) {
      url.pathname = "/"
      return NextResponse.redirect(url)
    }

    if (pathname.startsWith("/projects") && !projectsEnabled) {
      url.pathname = "/"
      return NextResponse.redirect(url)
    }
  }

  return NextResponse.next()
}

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
}