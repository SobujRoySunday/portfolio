import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";

const pathList = {
  onlyAuthPaths: ["/dashboard"],
  onlyNoAuthPaths: ["/login"],
};

export async function middleware(request: NextRequest) {
  const cookieStore = await cookies();
  const authToken = cookieStore.get("authToken")?.value;

  const isOnlyAuthPath = pathList.onlyAuthPaths.some((path) =>
    request.nextUrl.pathname.startsWith(path)
  );
  if (isOnlyAuthPath && !authToken) {
    const url = request.nextUrl.clone();
    url.pathname = "/";
    return NextResponse.redirect(url);
  }

  const isOnlyNoAuthPath = pathList.onlyNoAuthPaths.some((path) =>
    request.nextUrl.pathname.startsWith(path)
  );
  if (isOnlyNoAuthPath && authToken) {
    const url = request.nextUrl.clone();
    url.pathname = "/dashboard";
    return NextResponse.redirect(url);
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/dashboard", "/login"],
};
