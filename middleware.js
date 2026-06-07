import { NextResponse } from 'next/server'

export async function middleware(req) {
  const url = req.nextUrl.pathname

  if (url === '/admin/login') {
    return NextResponse.next()
  }

  const cookies = req.cookies.getAll()
  const isConnected = cookies.some(c =>
    c.name.includes('supabase') || c.name.includes('sb-')
  )

  if (!isConnected) {
    return NextResponse.redirect(new URL('/', req.url))
  }

  return NextResponse.next()
}

export const config = {
  matcher: ['/admin/:path*']
}