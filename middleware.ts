import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"

export function middleware(request: NextRequest) {
  // Simple middleware that doesn't rely on any external files
  const url = request.nextUrl.clone()

  // Get toggle settings from environment variables
  const websiteEnabled = process.env.DISABLE_WEBSITE !== "true"
  const servicesEnabled = process.env.DISABLE_SERVICES !== "true"
  const aboutEnabled = process.env.DISABLE_ABOUT !== "true"
  const contactEnabled = process.env.DISABLE_CONTACT !== "true"
  const resumeEnabled = process.env.DISABLE_RESUME !== "true"
  const projectsEnabled = process.env.DISABLE_PROJECTS !== "true"

  // If website is disabled, redirect all routes to home page
  if (!websiteEnabled && url.pathname !== "/") {
    url.pathname = "/"
    return NextResponse.redirect(url)
  }

  // Check environment variables directly
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

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
}
