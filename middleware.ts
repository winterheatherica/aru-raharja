import { NextRequest, NextResponse } from "next/server";
import { handleLocale } from "@/middleware/locale";
import { handleAuth } from "@/middleware/auth";

export function middleware(req: NextRequest) {
  const localeResult = handleLocale(req);
  if (localeResult) return localeResult;

  const authResult = handleAuth(req);
  if (authResult) return authResult;

  return NextResponse.next();
}

export const config = {
  matcher: ["/", "/((?!_next|api|.*\\..*).*)"],
};
