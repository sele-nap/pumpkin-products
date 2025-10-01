import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'


export function middleware(req: NextRequest) {
  const token = req.cookies.get('token')?.value
  const isAuth = Boolean(token)
  const isAuthPage = req.nextUrl.pathname.startsWith('/login') || req.nextUrl.pathname.startsWith('/signup')


  if (!isAuth && !isAuthPage && req.nextUrl.pathname === '/') {
    const url = req.nextUrl.clone(); url.pathname = '/login';
    return NextResponse.redirect(url)
  }
  if (isAuth && isAuthPage) {
    const url = req.nextUrl.clone(); url.pathname = '/';
    return NextResponse.redirect(url)
  }
  return NextResponse.next()
}


export const config = { matcher: ['/', '/login', '/signup'] }