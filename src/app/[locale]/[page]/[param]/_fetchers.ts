import type { Locale } from "@/i18n/get_dictionary";

export async function fetchArticleById(id: string, locale: Locale) {
  const lang = locale.toUpperCase();

  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_BASE}/api/article/${id}?lang=${lang}`,
    { cache: "force-cache", next: { revalidate: 3600 } }
  );

  if (!res.ok) return null;
  return res.json();
}

export async function fetchRoomById(id: string, locale: Locale) {
  const lang = locale.toUpperCase();

  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_BASE}/api/room/${id}?lang=${lang}`,
    { cache: "force-cache", next: { revalidate: 3600 } }
  );

  if (!res.ok) return null;
  return res.json();
}