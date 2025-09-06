import type { NextRequest } from "next/server";

export const COOKIE_NAME = "NEXT_LOCALE" as const;
export const LOCALES = ["id", "en"] as const;
export type Locale = (typeof LOCALES)[number];
export const DEFAULT_LOCALE: Locale = "id";

export const cookieOpts = {
  path: "/",
  maxAge: 60 * 60 * 24 * 365,
  sameSite: "lax" as const,
  httpOnly: true,
  secure: process.env.NODE_ENV === "production",
};

export function isLocale(v: unknown): v is Locale {
  return typeof v === "string" && (LOCALES as readonly string[]).includes(v);
}

export function detectLocale(req: NextRequest): Locale {
  const fromCookie = req.cookies.get(COOKIE_NAME)?.value;
  if (isLocale(fromCookie)) return fromCookie;

  const accept = (req.headers.get("accept-language") || "").toLowerCase();
  if (accept.startsWith("en")) return "en";

  return DEFAULT_LOCALE;
}
