import { notFound, redirect } from "next/navigation";
import type { Locale, Dictionary } from "@/i18n/get_dictionary";
import { getDictionary } from "@/i18n/get_dictionary";

import ArticlePage from "@/components/pages/ArticlePage";
import RoomPage from "@/components/pages/RoomPage";
import ServicePage from "@/components/pages/ServicePage";

import { dynamicSegmentByLocale } from "@/i18n/param_routes";

import { SERVICE_SOLUTIONS } from "./_constants";
import { resolveArticleId } from "./_resolvers";
import { fetchArticleById } from "./_fetchers";
import { generateParamMetadata } from "./_metadata";

type ServiceSolution = typeof SERVICE_SOLUTIONS[number];

type Params = {
  locale: Locale;
  page: string;
  param: string;
};

async function fetchServiceSite(locale: Locale) {
  const lang = locale.toUpperCase();

  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_BASE}/api/service?lang=${lang}`,
    { cache: "force-cache" }
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
    const articleId = await resolveArticleId(param);
    if (!articleId) notFound();

    const article = await fetchArticleById(
      String(articleId),
      locale
    );
    if (!article) notFound();

    if (article.slug && article.slug !== param) {
      const redirectUrl = `/${locale}/${page}/${article.slug}`;
      redirect(redirectUrl);
    }

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
    if (!SERVICE_SOLUTIONS.includes(param as ServiceSolution)) {
      notFound();
    }

    const site = await fetchServiceSite(locale);
    if (!site) notFound();

    return (
      <ServicePage
        dict={dict}
        locale={locale}
        site={site}
        activeSolution={param}
      />
    );
  }

  notFound();
}

export async function generateStaticParams() {
  const locales: Locale[] = ["id", "en"];

  return locales.flatMap((locale) =>
    SERVICE_SOLUTIONS.map((solution) => ({
      locale,
      page: "service",
      param: solution,
    }))
  );
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
