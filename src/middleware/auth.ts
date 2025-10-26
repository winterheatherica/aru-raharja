import { NextResponse, type NextRequest } from "next/server";
import { routeSlugByLocale, canonicalBySlug, normalizeLocale } from "@/i18n/routes";

export function handleAuth(req: NextRequest): NextResponse | void {
  const parts = req.nextUrl.pathname.split("/").filter(Boolean);
  if (parts.length < 2) return;

  const [maybeLocale, visiblePage] = parts;
  const locale = normalizeLocale(maybeLocale);

  const canonical = canonicalBySlug(locale)[visiblePage];
  if (canonical === "admin") {
    const token = req.cookies.get("session")?.value;
    if (!token) {
      const loginSlug = routeSlugByLocale[locale]?.login ?? "login";
      const redirectUrl = new URL(`/${locale}/${loginSlug}`, req.url);
      return NextResponse.redirect(redirectUrl);
    }
  }
}
