// middleware.ts
import { NextResponse } from 'next/server';
import { NextRequest } from 'next/server';

export function middleware(req: NextRequest) {
  const userId = req.cookies.get('user_id'); 
  if (!userId && req.nextUrl.pathname !== '/login' && req.nextUrl.pathname !== '/signup') {
    const url = req.nextUrl.clone();
    url.pathname = '/login'; 
    return NextResponse.redirect(url);
  }
  if (userId && (req.nextUrl.pathname === '/login' || req.nextUrl.pathname === '/signup')) {
    const url = req.nextUrl.clone();
    url.pathname = '/'; 
    return NextResponse.redirect(url);
  }

  return NextResponse.next();
}

export const config = {
    matcher: ['/', '/login', '/signup'], 
  };
  
