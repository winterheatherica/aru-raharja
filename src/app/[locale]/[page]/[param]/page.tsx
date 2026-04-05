import { notFound, redirect } from "next/navigation";
import { cookies } from "next/headers";
import type { ComponentType } from "react";
import type { Locale, Dictionary } from "@/i18n/get_dictionary";
import { getDictionary } from "@/i18n/get_dictionary";

import ArticlePage from "@/components/pages/ArticlePage";
import RoomPage from "@/components/pages/RoomPage";
import ServicePage from "@/components/pages/ServicePage";

import MePage from "@/components/pages/Admin/MePage/MeDetailPage";
import AwardListPage from "@/components/pages/Admin/AwardPage/AwardListPage";
import CareerVacancyListPage from "@/components/pages/Admin/CareerVacancyPage/CareerVacancyListPage";
import ClientListPage from "@/components/pages/Admin/ClientPage/ClientListPage";
import HeroListPage from "@/components/pages/Admin/HeroPage/HeroListPage";
import HistoryListPage from "@/components/pages/Admin/HistoryPage/HistoryListPage";
import NewsArticlePage from "@/components/pages/Admin/NewsArticlePage/NewsArticleListPage";
import NewsCategoryListPage from "@/components/pages/Admin/NewsCategoryPage/NewsCategoryListPage";
import PartnerListPage from "@/components/pages/Admin/PartnerPage/PartnerListPage";
import PromoSlideListPage from "@/components/pages/Admin/PromoSlidePage/PromoSlideListPage";
import ServiceCertificationListPage from "@/components/pages/Admin/ServiceCertificationPage/ServiceCertificationListPage";
import ServiceGalleryPage from "@/components/pages/Admin/ServiceGalleryPage/ServiceGalleryListPage";
import ServiceMatrixPage from "@/components/pages/Admin/ServiceMatrixPage/ServiceMatrixListPage";
import ServicePricingTierPage from "@/components/pages/Admin/ServicePricingTierPage/ServicePricingTierListPage";
import SpaceRoomPage from "@/components/pages/Admin/SpaceRoomPage/SpaceRoomListPage";
import UserPage from "@/components/pages/Admin/UserPage/UserListPage";

import { dynamicSegmentByLocale } from "@/i18n/param_routes";
import { locales, routeSlugByLocale } from "@/i18n/routes";

import { SERVICE_SOLUTIONS } from "./_constants";
import { resolveArticleId, resolveRoomId } from "./_resolvers";
import { fetchArticleById, fetchRoomById } from "./_fetchers";
import { fetchService } from "../_fetchers";
import { generateParamMetadata } from "./_metadata";

export const revalidate = 0;

type ServiceSolution = typeof SERVICE_SOLUTIONS[number];

export const API_BASE = process.env.NEXT_PUBLIC_API_BASE!.replace(/\/$/, "");
export const ME_URL = `${API_BASE}/api/me`;

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
  const adminBase = routeSlugByLocale[locale]?.admin ?? "admin";

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

  if (page === adminBase) {
    const loginHref = `/${locale}/${routeSlugByLocale[locale]?.login ?? "login"}`;
    const session = (await cookies()).get("session")?.value;

    if (!session) {
      redirect(loginHref);
    }

    const meRes = await fetch(ME_URL, {
      headers: { Cookie: `session=${session}` },
      cache: "no-store",
    });

    if (!meRes.ok) {
      redirect(loginHref);
    }

    const adminPageByParam: Record<string, ComponentType<{ dict?: Dictionary; locale: Locale }>> = {
      "me": MePage,
      "award": AwardListPage,
      "career-vacancy": CareerVacancyListPage,
      "client": ClientListPage,
      "hero": HeroListPage,
      "history": HistoryListPage,
      "news-article": NewsArticlePage,
      "news-category": NewsCategoryListPage,
      "partner": PartnerListPage,
      "promo-slide": PromoSlideListPage,
      "service-certification": ServiceCertificationListPage,
      "service-gallery": ServiceGalleryPage,
      "service-matrix": ServiceMatrixPage,
      "service-pricing-tier": ServicePricingTierPage,
      "space-room": SpaceRoomPage,
      "user": UserPage,
    };

    const AdminComponent = adminPageByParam[param];
    if (!AdminComponent) notFound();

    return <AdminComponent dict={dict} locale={locale} />;
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
