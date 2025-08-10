import { createMiddlewareClient } from '@supabase/auth-helpers-nextjs';
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export async function middleware(req: NextRequest) {
  const res = NextResponse.next();
  const supabase = createMiddlewareClient({ req, res });

  const {
    data: { session },
  } = await supabase.auth.getSession();

  // Only protect /admin/* routes
  if (req.nextUrl.pathname.startsWith('/admin')) {
    // Redirect to /members if no session
    if (!session) {
      return NextResponse.redirect(new URL('/members', req.url));
    }
  }

  return res;
}

export const config = {
  matcher: ['/admin/:path*']
};