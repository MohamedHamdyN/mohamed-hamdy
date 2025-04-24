import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"
import { toggleSettings } from "@/admin/toggle"

export function middleware(request: NextRequest) {
  // Simple middleware that doesn't rely on any external files
  const url = request.nextUrl.clone()

  // If website is disabled, redirect all routes to home page
  if (!toggleSettings.website && url.pathname !== "/") {
    url.pathname = "/"
    return NextResponse.redirect(url)
  }

  // Check environment variables directly
  if (
    url.pathname.startsWith("/services") &&
    (process.env.DISABLE_SERVICES === "true" || !toggleSettings.services_page)
  ) {
    url.pathname = "/"
    return NextResponse.redirect(url)
  }

  if (url.pathname.startsWith("/about") && (process.env.DISABLE_ABOUT === "true" || !toggleSettings.about_page)) {
    url.pathname = "/"
    return NextResponse.redirect(url)
  }

  if (url.pathname.startsWith("/contact") && (process.env.DISABLE_CONTACT === "true" || !toggleSettings.contact_page)) {
    url.pathname = "/"
    return NextResponse.redirect(url)
  }

  if (url.pathname.startsWith("/resume") && (process.env.DISABLE_RESUME === "true" || !toggleSettings.website)) {
    url.pathname = "/"
    return NextResponse.redirect(url)
  }

  if (
    url.pathname.startsWith("/projects") &&
    (process.env.DISABLE_PROJECTS === "true" || !toggleSettings.projects_page)
  ) {
    url.pathname = "/"
    return NextResponse.redirect(url)
  }

  return NextResponse.next()
}

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
}
