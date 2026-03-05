import { notFound, redirect } from "next/navigation";
import type { Locale, Dictionary } from "@/i18n/get_dictionary";
import { getDictionary } from "@/i18n/get_dictionary";

import ArticlePage from "@/components/pages/ArticlePage";
import RoomPage from "@/components/pages/RoomPage";
import ServicePage from "@/components/pages/ServicePage";

import { dynamicSegmentByLocale } from "@/i18n/param_routes";
import { locales } from "@/i18n/routes";

import { SERVICE_SOLUTIONS } from "./_constants";
import { resolveArticleId, resolveRoomId } from "./_resolvers";
import { fetchArticleById, fetchRoomById } from "./_fetchers";
import { fetchService } from "../_fetchers";
import { generateParamMetadata } from "./_metadata";

export const revalidate = 3600;

type ServiceSolution = typeof SERVICE_SOLUTIONS[number];

type Params = {
  locale: Locale;
  page: string;
  param: string;
};

export default async function PageWithParam({
  params,
}: {
  params: Promise<Params>;
}) {
  const { locale, page, param } = await params;
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
      redirect(`/${locale}/${articleBase}/${article.slug}`);
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
    const roomId = await resolveRoomId(param);
    if (!roomId) notFound();

    const room = await fetchRoomById(
      String(roomId),
      locale
    );
    if (!room) notFound();

    if (room.slug && room.slug !== param) {
      redirect(`/${locale}/${roomBase}/${room.slug}`);
    }

    return (
      <RoomPage
        dict={dict}
        locale={locale}
        room={room}
      />
    );
  }

  if (page === serviceBase) {
    if (!SERVICE_SOLUTIONS.includes(param as ServiceSolution)) {
      notFound();
    }

    const site = await fetchService(locale);

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

export function generateStaticParams() {
  return locales.flatMap((locale) => {
    const serviceBase =
      (dynamicSegmentByLocale as any)[locale]?.service ??
      (dynamicSegmentByLocale as any)["id"]?.service;

    return SERVICE_SOLUTIONS.map((solution) => ({
      locale,
      page: serviceBase,
      param: solution,
    }));
  });
}

export async function generateMetadata({
  params,
}: {
  params: Promise<Params>;
}) {
  const { locale, page, param } = await params;
  const dict: Dictionary = await getDictionary(locale);

  return generateParamMetadata(locale, page, param, dict);
}
