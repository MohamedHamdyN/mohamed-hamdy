import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"

export function middleware(request: NextRequest) {
  // Middleware runs on Edge Runtime which doesn't support dynamic code (next-auth)
  // Authentication is handled server-side in API routes and server actions
  // This middleware is a pass-through - auth checks happen in protected routes
  return NextResponse.next()
}

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
