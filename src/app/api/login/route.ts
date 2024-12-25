import { NextResponse } from "next/server";
import jwt from "jsonwebtoken";

export async function POST(request: Request) {
  try {
    const { userId, password } = await request.json();

    const realUserID = process.env.USER_ID || "admin";
    const realPassword = process.env.PASSWORD || "adminPassword";
    const JWT_SECRET = process.env.JWT_SECRET || "somerandomsecret";

    if (userId !== realUserID)
      return NextResponse.json(
        { message: "Invalid username" },
        { status: 401 }
      );

    if (password !== realPassword)
      return NextResponse.json(
        { message: "Invalid password" },
        { status: 401 }
      );

    const authToken = jwt.sign({ userId }, JWT_SECRET, {
      expiresIn: "1d",
    });

    const response = NextResponse.json(
      { message: "Login successful", authToken },
      { status: 200 }
    );
    response.cookies.set("authToken", authToken, {
      httpOnly: true,
      secure: true,
      sameSite: "strict",
      maxAge: 60 * 60 * 24,
    });

    return response;
  } catch (error) {
    console.error("Error logging in:", error);
    return NextResponse.json(
      { message: "An error occurred while logging in" },
      { status: 500 }
    );
  }
}
