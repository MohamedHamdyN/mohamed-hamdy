import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"
import { getServerSettings } from "./lib/settings"

export async function middleware(request: NextRequest) {
  const url = request.nextUrl.clone()

  try {
    // Get settings from database
    const settings = await getServerSettings()

    // If website is disabled, redirect all routes to home page
    if (!settings.website && url.pathname !== "/") {
      url.pathname = "/"
      return NextResponse.redirect(url)
    }

    // Check database settings
    if (url.pathname.startsWith("/services") && !settings.services_page) {
      url.pathname = "/"
      return NextResponse.redirect(url)
    }

    if (url.pathname.startsWith("/about") && !settings.about_page) {
      url.pathname = "/"
      return NextResponse.redirect(url)
    }

    if (url.pathname.startsWith("/contact") && !settings.contact_page) {
      url.pathname = "/"
      return NextResponse.redirect(url)
    }

    if (url.pathname.startsWith("/resume") && !settings.resume_page) {
      url.pathname = "/"
      return NextResponse.redirect(url)
    }

    if (url.pathname.startsWith("/projects") && !settings.projects_page) {
      url.pathname = "/"
      return NextResponse.redirect(url)
    }

    return NextResponse.next()
  } catch (error) {
    console.error("Middleware error:", error)
    // Fallback to environment variables if database fails
    const websiteEnabled = process.env.DISABLE_WEBSITE !== "true"
    const servicesEnabled = process.env.DISABLE_SERVICES !== "true"
    const aboutEnabled = process.env.DISABLE_ABOUT !== "true"
    const contactEnabled = process.env.DISABLE_CONTACT !== "true"
    const resumeEnabled = process.env.DISABLE_RESUME !== "true"
    const projectsEnabled = process.env.DISABLE_PROJECTS !== "true"

    if (!websiteEnabled && url.pathname !== "/") {
      url.pathname = "/"
      return NextResponse.redirect(url)
    }

    if (url.pathname.startsWith("/services") && !servicesEnabled) {
      url.pathname = "/"
      return NextResponse.redirect(url)
    }

    if (url.pathname.startsWith("/about") && !aboutEnabled) {
      url.pathname = "/"
      return NextResponse.redirect(url)
    }

    if (url.pathname.startsWith("/contact") && !contactEnabled) {
      url.pathname = "/"
      return NextResponse.redirect(url)
    }

    if (url.pathname.startsWith("/resume") && !resumeEnabled) {
      url.pathname = "/"
      return NextResponse.redirect(url)
    }

    if (url.pathname.startsWith("/projects") && !projectsEnabled) {
      url.pathname = "/"
      return NextResponse.redirect(url)
    }

    return NextResponse.next()
  }
}

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
}
