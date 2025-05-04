import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"

export function middleware(request: NextRequest) {
  // تعيين نوع المحتوى الصحيح للملفات
  const { pathname } = request.nextUrl

  // إضافة نوع المحتوى الصحيح للملفات JavaScript
  if (pathname.endsWith(".js")) {
    const response = NextResponse.next()
    response.headers.set("Content-Type", "application/javascript; charset=utf-8")
    return response
  }

  // إضافة نوع المحتوى الصحيح للملفات CSS
  if (pathname.endsWith(".css")) {
    const response = NextResponse.next()
    response.headers.set("Content-Type", "text/css; charset=utf-8")
    return response
  }

  // إضافة نوع المحتوى الصحيح للملفات SVG
  if (pathname.endsWith(".svg")) {
    const response = NextResponse.next()
    response.headers.set("Content-Type", "image/svg+xml")
    return response
  }

  return NextResponse.next()
}

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
}
