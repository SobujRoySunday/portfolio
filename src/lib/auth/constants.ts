/**
 * Edge-safe constants. Kept separate from `@/lib/auth` so middleware can import
 * them without pulling in Node-only crypto.
 */
export const AUTH_COOKIE = "authToken";
export const AUTH_MAX_AGE_SECONDS = 60 * 60 * 24;
