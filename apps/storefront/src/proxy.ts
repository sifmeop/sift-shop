import { NextRequest, NextResponse } from 'next/server'

import { env } from './common/constants/env'
import { ROUTES } from './common/constants/routes'

export function proxy(request: NextRequest) {
  const cookie = request.cookies.get(env.NEXT_PUBLIC_SESSION_COOKIE_NAME)

  if (!cookie) {
    return NextResponse.redirect(new URL(ROUTES.SIGN_IN, request.url))
  }
}

export const config = {
  matcher: '/profile/:path*'
}
