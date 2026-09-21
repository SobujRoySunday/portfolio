import { NextRequest, NextResponse } from "next/server";
import { AUTH_COOKIE, authCookieOptions } from "@/lib/auth";

export async function GET(request: NextRequest) {
  try {
    const url = request.nextUrl.clone();
    url.pathname = "/";
    const response = NextResponse.redirect(url);
    // Attributes must match the ones used when setting, or the browser keeps
    // the original cookie alive.
    response.cookies.set(AUTH_COOKIE, "", {
      ...authCookieOptions,
      maxAge: 0,
    });
    return response;
  } catch (error) {
    console.error("Error logging out:", error);
    return NextResponse.json({ message: "Error logging out" }, { status: 500 });
  }
}
