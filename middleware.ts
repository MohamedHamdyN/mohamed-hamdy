import { auth } from "@/auth"

export const middleware = auth

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - api/auth (auth routes)
     * - public folder
     */
    "/((?!_next/static|_next/image|favicon.ico|api/auth|public).*)",
  ],
}
