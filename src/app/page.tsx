import { cookies, headers } from "next/headers";
import { redirect } from "next/navigation";
import { routeSlugByLocale } from "@/i18n/routes";

const LOCALES = new Set(["id", "en"] as const);
type SupportedLocale = "id" | "en";
const DEFAULT_LOCALE: SupportedLocale = "id";

function detectLocale(): SupportedLocale {
  const cookieStore = cookies();
  const c = cookieStore.get("NEXT_LOCALE")?.value as SupportedLocale | undefined;
  if (c && LOCALES.has(c)) return c;

  const accept = headers().get("accept-language")?.toLowerCase() || "";
  const first = accept.split(",")[0]?.trim();
  const lang2 = first?.slice(0, 2) as SupportedLocale | undefined;

  if (lang2 && LOCALES.has(lang2)) return lang2;
  return DEFAULT_LOCALE;
}

export default function RootRedirect() {
  const target = detectLocale();
  const homeSlug = routeSlugByLocale[target].home;
  redirect(`/${target}/${homeSlug}`);
}
