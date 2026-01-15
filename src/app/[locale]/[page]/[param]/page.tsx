import { notFound } from "next/navigation";
import type { Locale, Dictionary } from "@/i18n/get_dictionary";
import { getDictionary } from "@/i18n/get_dictionary";

import ArticlePage from "@/components/pages/ArticlePage";
import RoomPage from "@/components/pages/RoomPage";
import ServicePage from "@/components/pages/ServicePage";

import { dynamicSegmentByLocale } from "@/i18n/param_routes";

import { SERVICE_SOLUTIONS } from "./_constants";
import { resolveArticleId } from "./_resolvers";
import { fetchArticleById, fetchServiceSite } from "./_fetchers";
import { generateParamMetadata } from "./_metadata";

type Params = {
  locale: Locale;
  page: string;
  param: string;
};

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
    const articleId = await resolveArticleId(param, locale);
    if (!articleId) notFound();

    const article = await fetchArticleById(
      String(articleId),
      locale
    );
    if (!article) notFound();

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
      notFound();
    }

    const site = await fetchServiceSite(locale);
    if (!site) notFound();

    return (
      <ServicePage
        dict={dict}
        locale={locale}
        activeSolution={param}
        site={site}
      />
    );
  }

  notFound();
}

export async function generateMetadata({
  params,
}: {
  params: Params;
}) {
  const { locale, page, param } = params;
  const dict: Dictionary = await getDictionary(locale);

  return generateParamMetadata(locale, page, param, dict);
}

/* ===== SSG ===== */
export async function generateStaticParams() {
  return [];
}
