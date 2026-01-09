import { NextResponse } from "next/server";
import { COOKIE_NAME, cookieOpts, isLocale, DEFAULT_LOCALE } from "@/i18n/cookie";
import { routeSlugByLocale } from "@/i18n/routes";

export async function GET(req: Request) {
  const url = new URL(req.url);
  const raw = url.searchParams.get("value");
  const redirectParam = url.searchParams.get("redirect") || "/";

  const value = isLocale(raw) ? raw : DEFAULT_LOCALE;

  let nextPath = redirectParam;
  if (
    redirectParam === "/" ||
    redirectParam === "/id" ||
    redirectParam === "/en"
  ) {
    nextPath = `/${value}/${routeSlugByLocale[value].home}`;
  }

  const res = NextResponse.redirect(nextPath);
  res.cookies.set(COOKIE_NAME, value, cookieOpts);
  return res;
}
