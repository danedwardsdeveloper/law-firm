import { NextResponse } from 'next/server'
import type { MiddlewareConfig, NextRequest } from 'next/server'

export function middleware(request: NextRequest) {
  if (request.nextUrl.pathname === '/') {
    return NextResponse.redirect(new URL('/admin', request.url))
  }
}

export const config: MiddlewareConfig = {
  matcher: '/',
}
