import type { Locale, Dictionary } from "@/i18n/get_dictionary";
import { dynamicSegmentByLocale } from "@/i18n/param_routes";
import { resolveArticleId, resolveRoomId } from "./_resolvers";
import { fetchArticleById, fetchRoomById } from "./_fetchers";
import { fetchService } from "../_fetchers";
import { BRAND, SERVICE_SOLUTIONS } from "./_constants";
import { buildSocialMeta } from "../_metadata";

const SITE_URL = "https://aruraharja.co.id";

function toAbsoluteUrl(url?: string) {
  if (!url) return undefined;
  if (url.startsWith("http://") || url.startsWith("https://")) return url;
  return `${SITE_URL}${url.startsWith("/") ? "" : "/"}${url}`;
}

function extractImagesFromHtml(html?: string): string[] {
  if (!html) return [];
  const matches = Array.from(html.matchAll(/<img[^>]+src=["']([^"']+)["'][^>]*>/gi));
  return matches.map((m) => m[1]).filter(Boolean);
}

function tryISODate(raw?: string): string | undefined {
  if (!raw) return undefined;
  const d = new Date(raw);
  return Number.isNaN(d.getTime()) ? undefined : d.toISOString();
}

const LOCALE_OG_MAP: Record<string, string> = { id: "id_ID", en: "en_US" };

function ogLocaleFor(locale: Locale) {
  return LOCALE_OG_MAP[locale] ?? "id_ID";
}

function ogAlternateLocalesFor(locale: Locale) {
  return Object.entries(LOCALE_OG_MAP)
    .filter(([k]) => k !== locale)
    .map(([, v]) => v);
}

const MAX_CONTENT_OG_IMAGES = 5;

function pickServiceImages(serviceData: any): Array<{ src: string; alt?: string }> {
  const gallery = (serviceData?.gallery ?? [])
    .filter((item: any) => item?.media_type === "IMAGE" && item?.src)
    .sort(
      (a: any, b: any) =>
        (Number(b?.order ?? b?.sort ?? b?.priority ?? 0) || 0) -
        (Number(a?.order ?? a?.sort ?? a?.priority ?? 0) || 0)
    );

  return gallery.map((item: any) => ({
    src: item.src,
    alt: item?.alt || item?.title || item?.caption,
  }));
}

export async function generateParamMetadata(
  locale: Locale,
  page: string,
  param: string,
  dict: Dictionary
) {
  const localeMap =
    (dynamicSegmentByLocale as any)[locale] ??
    (dynamicSegmentByLocale as any)["id"];

  const articleBase = localeMap?.article;
  const roomBase = localeMap?.room;
  const serviceBase = localeMap?.service;

  if (page === articleBase) {
    try {
      const articleId = await resolveArticleId(param);
      if (!articleId) return {};

      const article = await fetchArticleById(String(articleId), locale);
      if (!article) return {};

      const title = `${article.title ?? "Article"} - ${BRAND}`;
      const description = article.meta?.description ?? article.excerpt ?? undefined;

      const categoryNames: string[] = Array.isArray(article.categories)
        ? article.categories.map((c: any) => c?.name).filter(Boolean)
        : [];
      const keywordsFromMeta: string[] = Array.isArray(article.meta?.keywords)
        ? article.meta.keywords.filter(Boolean)
        : [];
      const merged = [...keywordsFromMeta, ...categoryNames];
      const keywords = (article.category as string | undefined)
        ?? (merged.length > 0 ? merged.join(", ") : undefined);

      const cover = toAbsoluteUrl(article.image_url);
      const contentImages = extractImagesFromHtml(article.content)
        .slice(0, MAX_CONTENT_OG_IMAGES)
        .map(toAbsoluteUrl)
        .filter((u): u is string => Boolean(u));

      const seen = new Set<string>();
      const combined = [cover, ...contentImages]
        .filter((u): u is string => Boolean(u))
        .filter((u) => (seen.has(u) ? false : (seen.add(u), true)));

      const images = combined.length > 0
        ? combined.map((url) => ({ url, alt: article.title ?? "Article" }))
        : [{ url: `${SITE_URL}/images/general/logo/aru.png`, alt: article.title ?? "Article" }];

      return buildSocialMeta({
        title,
        description,
        images,
        keywords,
        type: "article",
        article: {
          publishedTime: tryISODate(article.published_at),
          modifiedTime: tryISODate(article.updated_at),
          authors: article.published_by ? [article.published_by] : undefined,
          section: categoryNames[0],
          tags: categoryNames.length > 0 ? categoryNames : undefined,
        },
        locale: ogLocaleFor(locale),
        alternateLocale: ogAlternateLocalesFor(locale),
      });
    } catch {
      return {};
    }
  }

  if (page === roomBase) {
    try {
      const roomId = await resolveRoomId(param);
      if (!roomId) return {};

      const room = await fetchRoomById(String(roomId), locale);
      if (!room) return {};

      const title = `${room.title ?? `Room ${param}`} - ${BRAND}`;
      const description = room.description ?? undefined;

      const mapped = (room.images ?? [])
        .map((img: any) => ({
          url: toAbsoluteUrl(img?.url),
          alt: img?.alt || room.title || `Room ${param}`,
        }))
        .filter((img: { url?: string }): img is { url: string; alt: string } => Boolean(img.url));

      const images = mapped.length > 0
        ? mapped
        : [{ url: `${SITE_URL}/images/general/logo/aru.png`, alt: room.title || `Room ${param}` }];

      return buildSocialMeta({ title, description, images });
    } catch {
      return {};
    }
  }

  if (
    page === serviceBase &&
    SERVICE_SOLUTIONS.includes(param as (typeof SERVICE_SOLUTIONS)[number])
  ) {
    const serviceMeta = (dict as any)?.service?.solutions?.descriptions?.[param];
    const defaultMeta = (dict as any)?.service?.meta;
    const title = `${serviceMeta?.title ?? param} - ${BRAND}`;

    let images: Array<{ url: string; alt: string }> = [];

    try {
      const service = await fetchService(locale);
      const serviceData = service?.service ?? service;
      const serviceCode = String(param).toUpperCase();

      images = pickServiceImages(serviceData?.[serviceCode])
        .map((item) => ({
          url: toAbsoluteUrl(item.src),
          alt: item.alt || title,
        }))
        .filter((img): img is { url: string; alt: string } => Boolean(img.url));
    } catch {
      images = [];
    }

    const finalImages = images.length > 0
      ? images
      : [{ url: `${SITE_URL}/images/general/logo/aru.png`, alt: title }];

    return buildSocialMeta({
      title,
      description: serviceMeta?.description ?? defaultMeta?.description ?? undefined,
      images: finalImages,
      keywords: defaultMeta?.keywords,
    });
  }

  return {};
}
