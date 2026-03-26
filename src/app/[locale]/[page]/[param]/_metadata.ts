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

function pickServiceImage(serviceData: any) {
  const gallery = (serviceData?.gallery ?? [])
    .filter((item: any) => item?.media_type === "IMAGE" && item?.src)
    .sort(
      (a: any, b: any) =>
        (Number(b?.order ?? b?.sort ?? b?.priority ?? 0) || 0) -
        (Number(a?.order ?? a?.sort ?? a?.priority ?? 0) || 0)
    );

  return gallery?.[0]?.src;
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
      const image = toAbsoluteUrl(article.image_url) ?? `${SITE_URL}/images/general/logo/aru.png`;
      const keywords = article.category ?? article.categories?.map((c: any) => c?.name).filter(Boolean).join(", ");

      return buildSocialMeta({ title, description, image, keywords });
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
      const image = toAbsoluteUrl(room.images?.[0]?.url) ?? `${SITE_URL}/images/general/logo/aru.png`;

      return buildSocialMeta({ title, description, image });
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

    let image: string | undefined;

    try {
      const service = await fetchService(locale);
      const serviceData = service?.service ?? service;
      const serviceCode = String(param).toUpperCase();
      image = toAbsoluteUrl(pickServiceImage(serviceData?.[serviceCode]));
    } catch {
      image = undefined;
    }

    return buildSocialMeta({
      title: `${serviceMeta?.title ?? param} - ${BRAND}`,
      description: serviceMeta?.description ?? defaultMeta?.description ?? undefined,
      image,
      keywords: defaultMeta?.keywords,
    });
  }

  return {};
}
