import type { Locale } from "@/i18n/get_dictionary";

export async function fetchArticleById(id: string, locale: Locale) {
  const lang = locale.toUpperCase();

  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_BASE}/api/article/${id}?lang=${lang}`,
    { cache: "no-store" }
  );

  if (!res.ok) return null;
  return res.json();
}

export async function fetchServiceSite(locale: Locale) {
  const lang = locale.toUpperCase();

  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_BASE}/api/service?lang=${lang}`,
    { cache: "no-store" }
  );

  if (!res.ok) return null;

  return res.json();
}
