import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  const isAdmin = request.cookies.get('isAdmin')?.value;
  const { pathname } = request.nextUrl;

  if (pathname.startsWith('/admin')) {
    
    if (!isAdmin || isAdmin !== 'true') {
      return NextResponse.redirect(new URL('/', request.url));
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    '/admin/:path*', 
  ],
};