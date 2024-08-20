import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  const protectedRoutes = ['/dashboard', '/session', '/api/logout'];

  const loginRoute = '/login';

  const authToken = request.cookies.get('authToken')?.toString();

  if (pathname.startsWith(loginRoute)) {
    if (authToken) {
      const url = request.nextUrl.clone();
      url.pathname = '/dashboard';
      return NextResponse.redirect(url);
    }
  }

  if (pathname === '/') {
    if (authToken) {
      const url = request.nextUrl.clone();
      url.pathname = '/dashboard';
      return NextResponse.redirect(url);
    } else {
      const url = request.nextUrl.clone();
      url.pathname = loginRoute;
      return NextResponse.redirect(url);
    }
  }

  if (protectedRoutes.some((route) => pathname.startsWith(route))) {
    if (!authToken) {
      const url = request.nextUrl.clone();
      url.pathname = loginRoute;
      return NextResponse.redirect(url);
    }
  }

  return NextResponse.next();
}
