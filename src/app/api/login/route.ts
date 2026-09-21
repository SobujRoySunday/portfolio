import crypto from "crypto";
import { NextRequest, NextResponse } from "next/server";
import {
  AUTH_COOKIE,
  AUTH_MAX_AGE_SECONDS,
  authCookieOptions,
  signAuthToken,
} from "@/lib/auth";

const MAX_ATTEMPTS = 5;
const WINDOW_MS = 15 * 60 * 1000;

/**
 * Per-process throttle. On a serverless host each instance keeps its own
 * counter, so this is a speed bump rather than a hard limit -- but it stops a
 * single client from running thousands of guesses against the one admin account.
 */
const attempts = new Map<string, { count: number; resetAt: number }>();

const getClientIp = (request: NextRequest) =>
  request.headers.get("x-forwarded-for")?.split(",")[0].trim() ||
  request.headers.get("x-real-ip") ||
  "unknown";

const isRateLimited = (ip: string) => {
  const now = Date.now();
  const entry = attempts.get(ip);

  if (!entry || entry.resetAt < now) {
    attempts.set(ip, { count: 1, resetAt: now + WINDOW_MS });
    return false;
  }

  entry.count += 1;
  return entry.count > MAX_ATTEMPTS;
};

const clearAttempts = (ip: string) => attempts.delete(ip);

/** Length-independent comparison, so a wrong password leaks no timing signal. */
const matches = (a: string, b: string) =>
  crypto.timingSafeEqual(
    crypto.createHash("sha256").update(a).digest(),
    crypto.createHash("sha256").update(b).digest()
  );

export async function POST(request: NextRequest) {
  try {
    const realUserId = process.env.USER_ID;
    const realPassword = process.env.PASSWORD;

    // Fail closed. Falling back to a hardcoded admin/adminPassword pair would
    // mean a misconfigured deploy ships with publicly known credentials.
    if (!realUserId || !realPassword) {
      console.error("USER_ID and/or PASSWORD are not configured.");
      return NextResponse.json(
        { message: "Authentication is not configured" },
        { status: 503 }
      );
    }

    const ip = getClientIp(request);
    if (isRateLimited(ip)) {
      return NextResponse.json(
        { message: "Too many attempts. Try again later." },
        { status: 429 }
      );
    }

    const { userId, password } = await request.json();

    if (typeof userId !== "string" || typeof password !== "string") {
      return NextResponse.json(
        { message: "Invalid credentials" },
        { status: 401 }
      );
    }

    // One generic message: distinguishing the two tells an attacker which
    // half they already have right.
    if (!matches(userId, realUserId) || !matches(password, realPassword)) {
      return NextResponse.json(
        { message: "Invalid credentials" },
        { status: 401 }
      );
    }

    clearAttempts(ip);

    const response = NextResponse.json(
      { message: "Login successful" },
      { status: 200 }
    );
    response.cookies.set(AUTH_COOKIE, signAuthToken(userId), {
      ...authCookieOptions,
      maxAge: AUTH_MAX_AGE_SECONDS,
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
