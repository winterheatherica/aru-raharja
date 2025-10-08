import { redirect } from "next/navigation";
import { getRouteMap, normalizeLocale } from "@/i18n/routes";

export default function LocaleRoot({
  params: { locale },
}: {
  params: { locale: string };
}) {
  const safe = normalizeLocale(locale);
  const homeSlug = getRouteMap(safe).home;
  redirect(`/${safe}/${homeSlug}`);
}
