import { notFound, redirect } from "next/navigation";
import { cookies } from "next/headers";
import type { Locale, Dictionary } from "@/i18n/get_dictionary";
import { getDictionary } from "@/i18n/get_dictionary";
import { routeSlugByLocale } from "@/i18n/routes";

import HeroCreatePage from "@/components/pages/Admin/HeroPage/HeroCreatePage";
import HeroDetailPage from "@/components/pages/Admin/HeroPage/HeroDetailPage";

const API_BASE = process.env.NEXT_PUBLIC_API_BASE!.replace(/\/$/, "");
const ME_URL = `${API_BASE}/api/me`;

type Params = {
  locale: Locale;
  page: string;
  param: string;
  param2: string;
};

export default async function PageWithParam2({ params }: { params: Promise<Params> }) {
  const { locale, page, param, param2 } = await params;
  const dict: Dictionary = await getDictionary(locale);
  const adminBase = routeSlugByLocale[locale]?.admin ?? "admin";

  if (page !== adminBase || param !== "hero") notFound();

  const loginHref = `/${locale}/${routeSlugByLocale[locale]?.login ?? "login"}`;
  const session = (await cookies()).get("session")?.value;

  if (!session) redirect(loginHref);

  const meRes = await fetch(ME_URL, {
    headers: { Cookie: `session=${session}` },
    cache: "no-store",
  });

  if (!meRes.ok) redirect(loginHref);

  if (param2 === "create") {
    return <HeroCreatePage dict={dict} locale={locale} />;
  }

  return <HeroDetailPage dict={dict} locale={locale} heroId={param2} />;
}
