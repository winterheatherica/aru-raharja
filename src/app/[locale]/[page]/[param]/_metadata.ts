import type { Locale, Dictionary } from "@/i18n/get_dictionary";
import { dynamicSegmentByLocale } from "@/i18n/param_routes";
import { resolveArticleId } from "./_resolvers";
import { fetchArticleById } from "./_fetchers";
import { BRAND } from "./_constants";

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
      const articleId = await resolveArticleId(param, locale);
      if (!articleId) return {};

      const article = await fetchArticleById(
        String(articleId),
        locale
      );
      if (!article) return {};

      return {
        title: `${article.title ?? "Article"} - ${BRAND}`,
        description: article.meta?.description ?? undefined,
      };
    } catch {
      return {};
    }
  }

  if (page === roomBase) {
    const detailed = (dict as any)?.room;

    if (detailed?.meta?.id === param) {
      const title = detailed.meta?.title ?? `Room ${param}`;
      const desc = detailed.meta?.subtitle ?? undefined;

      return {
        title: `${title} - ${BRAND}`,
        description: desc,
      };
    }

    const listRooms: any[] =
      (dict as any)?.reservation?.roomlist?.list ?? [];

    const found = listRooms.find(
      (r) => String(r.id) === String(param)
    );

    if (found) {
      return {
        title: `${found.title ?? `Room ${param}`} - ${BRAND}`,
        description: found.subtitle ?? undefined,
      };
    }

    return {};
  }

  if (page === serviceBase) {
    const nav =
      (dict as any)?.service?.solutions?.nav ?? [];

    const found = nav.find(
      (s: any) => s.id === param
    );

    const title =
      found?.label?.replace(/<[^>]+>/g, "") ??
      `Service ${param}`;

    return {
      title: `${title} - ${BRAND}`,
    };
  }

  return {};
}
