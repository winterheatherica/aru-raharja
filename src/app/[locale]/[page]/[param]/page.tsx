import { notFound, redirect } from "next/navigation";
import type { Locale, Dictionary } from "@/i18n/get_dictionary";
import { getDictionary } from "@/i18n/get_dictionary";

import ArticlePage from "@/components/pages/ArticlePage";
import RoomPage from "@/components/pages/RoomPage";

import { dynamicSegmentByLocale } from "@/i18n/param_routes";

import { SERVICE_SOLUTIONS } from "./_constants";
import { resolveArticleId, resolveRoomId } from "./_resolvers";
import { fetchArticleById, fetchRoomById } from "./_fetchers";
import { generateParamMetadata } from "./_metadata";

export const dynamic = "force-dynamic";
export const revalidate = 600;

type ServiceSolution = typeof SERVICE_SOLUTIONS[number];

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

    redirect(`/${locale}/${serviceBase}?solution=${param}`);
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
