import { NextResponse } from 'next/server'

export async function middleware(req) {
  const token = req.cookies.get('sb-access-token') ||
    req.cookies.get('sb-refresh-token') ||
    [...req.cookies.getAll()].find(c => c.name.includes('supabase'))

  if (!token) {
    return NextResponse.redirect(new URL('/', req.url))
  }

  return NextResponse.next()
}

export const config = {
  matcher: ['/admin/:path*']
}