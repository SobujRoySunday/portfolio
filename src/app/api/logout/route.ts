import { NextResponse } from "next/server";

export async function GET() {
  try {
    const response = NextResponse.json(
      { message: "Logged out successfully" },
      { status: 200 }
    );
    response.cookies.set("authToken", "", { expires: new Date(0) });
    return response;
  } catch (error) {
    console.error("Error logging out:", error);
    return NextResponse.json({ message: "Error logging out" }, { status: 500 });
  }
}
