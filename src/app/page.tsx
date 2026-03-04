import { cookies, headers } from "next/headers";
import { redirect } from "next/navigation";
import { routeSlugByLocale } from "@/i18n/routes";

const LOCALES = new Set(["id", "en"] as const);
type SupportedLocale = "id" | "en";
const DEFAULT_LOCALE: SupportedLocale = "id";

async function detectLocale(): Promise<SupportedLocale> {

  const cookieStore = await cookies();
  const cookieLocale = cookieStore.get("NEXT_LOCALE")?.value as
    | SupportedLocale
    | undefined;

  if (cookieLocale && LOCALES.has(cookieLocale)) {
    return cookieLocale;
  }

  const headerStore = await headers();
  const accept =
    headerStore.get("accept-language")?.toLowerCase() || "";

  const first = accept.split(",")[0]?.trim();
  const lang2 = first?.slice(0, 2) as SupportedLocale | undefined;

  if (lang2 && LOCALES.has(lang2)) {
    return lang2;
  }

  return DEFAULT_LOCALE;
}

export default async function RootRedirect() {
  const locale = await detectLocale();

  const homeSlug = routeSlugByLocale[locale].home;

  redirect(`/${locale}/${homeSlug}`);
}
