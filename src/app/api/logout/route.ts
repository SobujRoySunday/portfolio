import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  try {
    const url = request.nextUrl.clone();
    url.pathname = "/";
    const response = NextResponse.redirect(url);
    response.cookies.set("authToken", "", { expires: new Date(0) });
    return response;
  } catch (error) {
    console.error("Error logging out:", error);
    return NextResponse.json({ message: "Error logging out" }, { status: 500 });
  }
}
