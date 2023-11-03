import { NextRequest, NextResponse } from 'next/server'

export const middleware = (req) => {
  const { pathname, origin } = req.nextUrl
  const token = req.cookies['token']
  
  if (token && (
    pathname.indexOf('/auth') !== -1
  )) {
    return NextResponse.redirect(`${origin}/`)
  }
  
  if (!token && (
    pathname === '/profile' ||
    pathname === '/profile/edit' ||
    pathname === '/profile/saved' ||
    pathname === '/profile/notifications' ||
    pathname.indexOf('/post/edit') !== -1 ||
    pathname.indexOf('/admin') !== -1
  )) {
    return NextResponse.redirect(`${origin}/`)
  }

  return NextResponse.next()
}