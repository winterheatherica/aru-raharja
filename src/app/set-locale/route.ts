import { NextResponse } from "next/server";
import { COOKIE_NAME, cookieOpts, isLocale, DEFAULT_LOCALE } from "@/i18n/cookie";

export async function GET(req: Request) {
  const url = new URL(req.url);
  const raw = url.searchParams.get("value");
  const redirect = url.searchParams.get("redirect") || "/";

  const value = isLocale(raw) ? raw : DEFAULT_LOCALE;
  const target = new URL(redirect, url.origin);

  const res = NextResponse.redirect(target);
  res.cookies.set(COOKIE_NAME, value, cookieOpts);
  return res;
}
