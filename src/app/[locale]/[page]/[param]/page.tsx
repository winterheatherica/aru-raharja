import { notFound } from "next/navigation";
import type { Locale, Dictionary } from "@/i18n/get_dictionary";
import { getDictionary } from "@/i18n/get_dictionary";
import ArticlePage from "@/components/pages/ArticlePage";
import RoomPage from "@/components/pages/RoomPage";
import ServicePage from "@/components/pages/ServicePage";
import { dynamicSegmentByLocale } from "@/i18n/param_routes";

const BRAND = "PT Aru Raharja" as const;

type Params = {
  locale: Locale;
  page: string;
  param: string;
};

const SERVICE_SOLUTIONS = [
  "arudigital",
  "aruhealthcare",
  "arucontractor",
  "arusource",
  "arusolution",
  "arulog",
  "arutrans",
  "aruspace",
] as const;

async function fetchArticle(slug: string, locale: Locale) {
  const lang = locale.toUpperCase();

  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_BASE}/api/article/${slug}?lang=${lang}`,
    { cache: "no-store" }
  );

  if (!res.ok) return null;
  return res.json();
}

export default async function PageWithParam({
  params,
}: {
  params: Params;
}) {
  const { locale, page, param } = params;
  const dict: Dictionary = await getDictionary(locale);

  const localeMap =
    (dynamicSegmentByLocale as any)[locale] ??
    (dynamicSegmentByLocale as any)["id"];

  const articleBase = localeMap?.article;
  const roomBase = localeMap?.room;
  const serviceBase = localeMap?.service;

  if (page === articleBase) {
    const article = await fetchArticle(param, locale);

    if (!article) return notFound();

    return (
      <ArticlePage
        dict={dict}
        locale={locale}
        article={article}
      />
    );
  }

  if (page === roomBase) {
    return (
      <RoomPage
        dict={dict}
        locale={locale}
        id={param}
      />
    );
  }

  if (page === serviceBase) {
    if (!SERVICE_SOLUTIONS.includes(param as any)) {
      return notFound();
    }

    const lang = locale.toUpperCase();

    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_BASE}/api/service?lang=${lang}`,
      { cache: "no-store" }
    );

    if (!res.ok) {
      return notFound();
    }

    const site = await res.json();

    return (
      <ServicePage
        dict={dict}
        locale={locale}
        activeSolution={param}
        site={site}
      />
    );
  }

  return notFound();
}

export async function generateMetadata({
  params,
}: {
  params: Params;
}) {
  const { locale, page, param } = params;
  const dict: Dictionary = await getDictionary(locale);

  const localeMap =
    (dynamicSegmentByLocale as any)[locale] ??
    (dynamicSegmentByLocale as any)["id"];

  const articleBase = localeMap?.article;
  const roomBase = localeMap?.room;
  const serviceBase = localeMap?.service;

  if (page === articleBase) {
    try {
      const article = await fetchArticle(param, locale);

      if (article) {
        return {
          title: `${article.title ?? "Article"} - ${BRAND}`,
          description: article.meta?.description ?? undefined,
        };
      }
    } catch (_) {}

    const list = (dict as any)?.article?.list ?? [];
    const found = list.find((a: any) => a.slug === param);

    if (found) {
      return {
        title: `${found.title ?? "Article"} - ${BRAND}`,
        description: found.excerpt ?? undefined,
      };
    }

    return {};
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

export async function generateStaticParams() {
  return [];
}
