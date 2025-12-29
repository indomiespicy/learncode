import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { getSessionCookie } from "better-auth/cookies";

export async function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Define protected routes
  const isAuthRoute = pathname.startsWith("/learn");
  const isAdminRoute = pathname.startsWith("/admin");

  // Only run logic for protected routes
  if (!isAuthRoute && !isAdminRoute) {
    return NextResponse.next();
  }

  const sessionCookie = getSessionCookie(request);

  if (!sessionCookie) {
    const url = request.nextUrl.clone();
    url.pathname = "/login";
    url.searchParams.set("reason", "unauthorized");
    return NextResponse.redirect(url);
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/learn/:path*", "/admin/:path*"],
};
