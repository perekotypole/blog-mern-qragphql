import { NextRequest, NextResponse } from 'next/server'

export const middleware = (req) => {
  const { pathname, origin } = req.nextUrl
  const token = req.cookies['token']
  
  if (token && (pathname === '/auth/login' || pathname === '/auth/register')) {
    return NextResponse.redirect(`${origin}/`)
  }
  
  if (!token && (pathname === '/profile')) {
    return NextResponse.redirect(`${origin}/`)
  }

  return NextResponse.next()
}