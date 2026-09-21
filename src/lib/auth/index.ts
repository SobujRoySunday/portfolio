import crypto from "crypto";
import jwt, { JwtPayload } from "jsonwebtoken";
import { NextRequest, NextResponse } from "next/server";

import { AUTH_COOKIE, AUTH_MAX_AGE_SECONDS } from "./constants";

export { AUTH_COOKIE, AUTH_MAX_AGE_SECONDS };

/**
 * Signing secret for the admin session token.
 *
 * If JWT_SECRET is missing we fall back to a random per-process secret rather
 * than a hardcoded string: a well known default lets anyone forge an admin
 * token. The fallback keeps the app running, but sessions will not survive a
 * restart (or span serverless instances), so JWT_SECRET should always be set.
 */
const getJwtSecret = (() => {
  let cached: string | null = null;
  return () => {
    if (cached) return cached;
    const fromEnv = process.env.JWT_SECRET;
    if (fromEnv && fromEnv.length > 0) {
      cached = fromEnv;
    } else {
      console.warn(
        "JWT_SECRET is not set. Falling back to an ephemeral random secret; " +
          "sessions will be dropped on restart. Set JWT_SECRET in the environment."
      );
      cached = crypto.randomBytes(32).toString("hex");
    }
    return cached;
  };
})();

export const signAuthToken = (userId: string) =>
  jwt.sign({ userId }, getJwtSecret(), { expiresIn: AUTH_MAX_AGE_SECONDS });

/** Returns the decoded payload, or null when the token is absent/invalid/expired. */
export const verifyAuthToken = (token?: string): JwtPayload | null => {
  if (!token) return null;
  try {
    const payload = jwt.verify(token, getJwtSecret());
    return typeof payload === "string" ? null : payload;
  } catch {
    return null;
  }
};

export const isAuthenticated = (request: NextRequest) =>
  verifyAuthToken(request.cookies.get(AUTH_COOKIE)?.value) !== null;

/**
 * Guard for mutating API routes. Returns a 401 response to return early with,
 * or null when the caller holds a valid session.
 */
export const requireAuth = (request: NextRequest): NextResponse | null =>
  isAuthenticated(request)
    ? null
    : NextResponse.json({ message: "Unauthorized" }, { status: 401 });

export const authCookieOptions = {
  httpOnly: true,
  secure: process.env.NODE_ENV === "production",
  sameSite: "strict" as const,
  path: "/",
};
