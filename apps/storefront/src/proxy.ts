import { NextRequest, NextResponse } from 'next/server'

import { ROUTES } from './common/constants/routes'

export function proxy(request: NextRequest) {
  const cookie = request.cookies.get('session')

  if (!cookie) {
    return NextResponse.redirect(new URL(ROUTES.SIGN_IN, request.url))
  }
}

export const config = {
  matcher: '/profile/:path*'
}
