import { NextResponse } from 'next/server'

export async function middleware(req) {
  const url = req.nextUrl.pathname
  const secret = req.nextUrl.searchParams.get('secret')

  if (url === '/admin/login') {
    if (secret !== process.env.ADMIN_SECRET) {
      return NextResponse.redirect(new URL('/', req.url))
    }
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