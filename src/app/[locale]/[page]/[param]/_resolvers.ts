import type { Locale } from "@/i18n/get_dictionary";

export async function resolveArticleId(slug: string, locale: Locale) {
  const lang = locale.toUpperCase();

  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_BASE}/api/article/resolve?slug=${slug}&lang=${lang}`,
    { cache: "no-store" }
  );

  if (!res.ok) return null;

  const data = await res.json();
  return data?.id ?? null;
}
