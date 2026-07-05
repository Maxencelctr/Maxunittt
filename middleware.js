import { createServerClient } from '@supabase/ssr'
import { NextResponse } from 'next/server'

const ADMIN_UID = '00ab613b-ecb9-4c9d-b20c-c4af0c3da903'

export async function middleware(req) {
  let res = NextResponse.next({ request: req })

  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
    {
      cookies: {
        getAll() {
          return req.cookies.getAll()
        },
        setAll(cookiesToSet) {
          cookiesToSet.forEach(({ name, value }) =>
            req.cookies.set(name, value)
          )
          res = NextResponse.next({ request: req })
          cookiesToSet.forEach(({ name, value, options }) =>
            res.cookies.set(name, value, options)
          )
        },
      },
    }
  )

  const { data: { user } } = await supabase.auth.getUser()
  const estAdmin = user && user.id === ADMIN_UID
  const estPageLogin = req.nextUrl.pathname === '/admin/login'

  if (estPageLogin) {
    if (estAdmin) {
      return NextResponse.redirect(new URL('/admin', req.url))
    }
    const secret = req.nextUrl.searchParams.get('secret')
    if (secret !== process.env.ADMIN_SECRET) {
      return NextResponse.redirect(new URL('/', req.url))
    }
    return res
  }

  if (!estAdmin) {
    return NextResponse.redirect(new URL('/', req.url))
  }

  return res
}

export const config = {
  matcher: ['/admin/:path*'],
}