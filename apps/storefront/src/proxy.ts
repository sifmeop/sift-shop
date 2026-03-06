import { cookies } from 'next/headers'
import { NextRequest, NextResponse } from 'next/server'

import { env } from './common/constants/env'
import { ROUTES } from './common/constants/routes'

export async function proxy(req: NextRequest) {
  const cookieStore = await cookies()
  const session = cookieStore.get(env.NEXT_PUBLIC_SESSION_COOKIE_NAME)

  console.debug('[Proxy]: session:', session)

  if (!session && req.nextUrl.pathname.startsWith('/profile')) {
    return NextResponse.redirect(new URL(ROUTES.SIGN_IN, req.url))
  }

  if (session && req.nextUrl.pathname.startsWith('/auth')) {
    return NextResponse.redirect(new URL(ROUTES.ORDERS, req.url))
  }

  return NextResponse.next()
}

export const config = {
  matcher: ['/profile/:path*', '/auth/:path*']
}
