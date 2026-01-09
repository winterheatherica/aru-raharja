import { NextRequest, NextResponse } from "next/server";
import { COOKIE_NAME, cookieOpts, isLocale, DEFAULT_LOCALE } from "@/i18n/cookie";
import { routeSlugByLocale } from "@/i18n/routes";

function safeInternalPath(p: string) {
  if (!p) return "/";
  if (p.startsWith("/") && !p.startsWith("//")) return p;
  return "/";
}

export async function GET(req: NextRequest) {
  const url = new URL(req.url);
  const raw = url.searchParams.get("value");
  const redirectParam = safeInternalPath(
    url.searchParams.get("redirect") || "/"
  );

  const value = isLocale(raw) ? raw : DEFAULT_LOCALE;

  let nextPath = redirectParam;
  if (
    redirectParam === "/" ||
    redirectParam === "/id" ||
    redirectParam === "/en"
  ) {
    nextPath = `/${value}/${routeSlugByLocale[value].home}`;
  }

  const redirectUrl = req.nextUrl.clone();
  redirectUrl.pathname = nextPath;
  redirectUrl.search = "";

  const res = NextResponse.redirect(redirectUrl);

  res.cookies.set(COOKIE_NAME, value, {
    ...cookieOpts,
    secure: process.env.NODE_ENV === "production",
  });

  return res;
}
