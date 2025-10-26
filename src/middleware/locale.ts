import { NextResponse, type NextRequest } from "next/server";
import {
  COOKIE_NAME,
  LOCALES,
  DEFAULT_LOCALE,
  cookieOpts,
  detectLocale,
} from "@/i18n/cookie";

export function handleLocale(req: NextRequest): NextResponse | void {
  const { pathname } = req.nextUrl;

  if (
    pathname.startsWith("/_next") ||
    pathname.startsWith("/api") ||
    pathname.startsWith("/set-locale") ||
    /\.[^/]+$/.test(pathname)
  ) {
    return;
  }

  const hasLocalePrefix = LOCALES.some(
    (l) => pathname === `/${l}` || pathname.startsWith(`/${l}/`)
  );

  if (!hasLocalePrefix) {
    const loc = detectLocale(req) || DEFAULT_LOCALE;
    const url = new URL(`/${loc}${pathname}`, req.url);
    const res = NextResponse.redirect(url);
    if (!req.cookies.get(COOKIE_NAME)?.value) {
      res.cookies.set(COOKIE_NAME, loc, cookieOpts);
    }
    return res;
  }

  const currentLocale = pathname.split("/")[1] as (typeof LOCALES)[number];
  const cookieLocale = req.cookies.get(COOKIE_NAME)?.value;
  if (cookieLocale !== currentLocale) {
    const res = NextResponse.next();
    res.cookies.set(COOKIE_NAME, currentLocale, cookieOpts);
    return res;
  }
}
