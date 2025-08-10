import { createMiddlewareClient } from '@supabase/auth-helpers-nextjs';
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export async function middleware(req: NextRequest) {
  const res = NextResponse.next();
  const supabase = createMiddlewareClient({ req, res });

  const {
    data: { session },
  } = await supabase.auth.getSession();

  // Protect /members and /admin/* routes
  if (req.nextUrl.pathname.startsWith('/members') || req.nextUrl.pathname.startsWith('/admin')) {
    // Allow /members to show login form if no session
    if (req.nextUrl.pathname === '/members') {
      return res;
    }
    
    // For other protected routes, redirect to /members if no session
    if (!session) {
      return NextResponse.redirect(new URL('/members', req.url));
    }
  }

  return res;
}

export const config = {
  matcher: ['/members/:path*', '/admin/:path*']
};