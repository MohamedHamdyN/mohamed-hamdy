import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"

// Instead of importing directly from admin files, hardcode the settings
// This prevents server/client mismatch issues
const websiteEnabled = true
const servicesEnabled = true
const aboutEnabled = true
const contactEnabled = true
const resumeEnabled = true
const projectsEnabled = true

export function middleware(request: NextRequest) {
  const url = request.nextUrl.clone()

  // If website is disabled, redirect all routes to home page
  if (!websiteEnabled && url.pathname !== "/") {
    url.pathname = "/"
    return NextResponse.redirect(url)
  }

  // Check environment variables directly
  if (url.pathname.startsWith("/services") && (process.env.DISABLE_SERVICES === "true" || !websiteEnabled)) {
    url.pathname = "/"
    return NextResponse.redirect(url)
  }

  if (url.pathname.startsWith("/about") && (process.env.DISABLE_ABOUT === "true" || !websiteEnabled)) {
    url.pathname = "/"
    return NextResponse.redirect(url)
  }

  if (url.pathname.startsWith("/contact") && (process.env.DISABLE_CONTACT === "true" || !websiteEnabled)) {
    url.pathname = "/"
    return NextResponse.redirect(url)
  }

  if (url.pathname.startsWith("/resume") && (process.env.DISABLE_RESUME === "true" || !websiteEnabled)) {
    url.pathname = "/"
    return NextResponse.redirect(url)
  }

  if (url.pathname.startsWith("/projects") && (process.env.DISABLE_PROJECTS === "true" || !websiteEnabled)) {
    url.pathname = "/"
    return NextResponse.redirect(url)
  }

  return NextResponse.next()
}

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
}
