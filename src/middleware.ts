import { NextRequest, NextResponse } from "next/server";
import { AUTH_COOKIE } from "@/lib/auth/constants";

const pathList = {
  onlyAuthPaths: ["/dashboard"],
  onlyNoAuthPaths: ["/login"],
};

/**
 * Redirect-only. Middleware runs on the Edge runtime, which cannot verify the
 * JWT signature, so this is a UX convenience and never a security boundary --
 * the real checks live in `dashboard/layout.tsx` and in each API route.
 */
export function middleware(request: NextRequest) {
  const hasAuthCookie = Boolean(request.cookies.get(AUTH_COOKIE)?.value);
  const { pathname } = request.nextUrl;

  const isOnlyAuthPath = pathList.onlyAuthPaths.some((path) =>
    pathname.startsWith(path)
  );
  if (isOnlyAuthPath && !hasAuthCookie) {
    const url = request.nextUrl.clone();
    url.pathname = "/login";
    return NextResponse.redirect(url);
  }

  const isOnlyNoAuthPath = pathList.onlyNoAuthPaths.some((path) =>
    pathname.startsWith(path)
  );
  if (isOnlyNoAuthPath && hasAuthCookie) {
    const url = request.nextUrl.clone();
    url.pathname = "/dashboard";
    return NextResponse.redirect(url);
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/dashboard/:path*", "/login"],
};
