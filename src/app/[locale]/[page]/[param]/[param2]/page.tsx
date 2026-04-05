import { notFound, redirect } from "next/navigation";
import { cookies } from "next/headers";
import type { Locale, Dictionary } from "@/i18n/get_dictionary";
import { getDictionary } from "@/i18n/get_dictionary";
import { routeSlugByLocale } from "@/i18n/routes";

import HeroCreatePage from "@/components/pages/Admin/HeroPage/HeroCreatePage";
import HeroDetailPage from "@/components/pages/Admin/HeroPage/HeroDetailPage";
import AwardCreatePage from "@/components/pages/Admin/AwardPage/AwardCreatePage";
import AwardDetailPage from "@/components/pages/Admin/AwardPage/AwardDetailPage";
import CareerVacancyCreatePage from "@/components/pages/Admin/CareerVacancyPage/CareerVacancyCreatePage";
import CareerVacancyDetailPage from "@/components/pages/Admin/CareerVacancyPage/CareerVacancyDetailPage";
import ClientCreatePage from "@/components/pages/Admin/ClientPage/ClientCreatePage";
import ClientDetailPage from "@/components/pages/Admin/ClientPage/ClientDetailPage";
import PartnerCreatePage from "@/components/pages/Admin/PartnerPage/PartnerCreatePage";
import PartnerDetailPage from "@/components/pages/Admin/PartnerPage/PartnerDetailPage";
import PromoSlideCreatePage from "@/components/pages/Admin/PromoSlidePage/PromoSlideCreatePage";
import PromoSlideDetailPage from "@/components/pages/Admin/PromoSlidePage/PromoSlideDetailPage";
import HistoryCreatePage from "@/components/pages/Admin/HistoryPage/HistoryCreatePage";
import HistoryDetailPage from "@/components/pages/Admin/HistoryPage/HistoryDetailPage";
import NewsCategoryCreatePage from "@/components/pages/Admin/NewsCategoryPage/NewsCategoryCreatePage";
import NewsCategoryDetailPage from "@/components/pages/Admin/NewsCategoryPage/NewsCategoryDetailPage";
import NewsArticleCreatePage from "@/components/pages/Admin/NewsArticlePage/NewsArticleCreatePage";
import NewsArticleDetailPage from "@/components/pages/Admin/NewsArticlePage/NewsArticleDetailPage";
import ServiceCertificationCreatePage from "@/components/pages/Admin/ServiceCertificationPage/ServiceCertificationCreatePage";
import ServiceCertificationDetailPage from "@/components/pages/Admin/ServiceCertificationPage/ServiceCertificationDetailPage";
import ServiceGalleryCreatePage from "@/components/pages/Admin/ServiceGalleryPage/ServiceGalleryCreatePage";
import ServiceGalleryDetailPage from "@/components/pages/Admin/ServiceGalleryPage/ServiceGalleryDetailPage";
import ServiceMatrixCreatePage from "@/components/pages/Admin/ServiceMatrixPage/ServiceMatrixCreatePage";
import ServiceMatrixDetailPage from "@/components/pages/Admin/ServiceMatrixPage/ServiceMatrixDetailPage";
import ServicePricingTierCreatePage from "@/components/pages/Admin/ServicePricingTierPage/ServicePricingTierCreatePage";
import ServicePricingTierDetailPage from "@/components/pages/Admin/ServicePricingTierPage/ServicePricingTierDetailPage";
import SpaceRoomCreatePage from "@/components/pages/Admin/SpaceRoomPage/SpaceRoomCreatePage";
import SpaceRoomDetailPage from "@/components/pages/Admin/SpaceRoomPage/SpaceRoomDetailPage";
import UserCreatePage from "@/components/pages/Admin/UserPage/UserCreatePage";
import UserDetailPage from "@/components/pages/Admin/UserPage/UserDetailPage";

const API_BASE = process.env.NEXT_PUBLIC_API_BASE!.replace(/\/$/, "");
const ME_URL = `${API_BASE}/api/me`;

type Params = {
  locale: Locale;
  page: string;
  param: string;
  param2: string;
};

export default async function PageWithParam2({ params }: { params: Promise<Params> }) {
  const { locale, page, param, param2 } = await params;
  const dict: Dictionary = await getDictionary(locale);
  const adminBase = routeSlugByLocale[locale]?.admin ?? "admin";

  if (page !== adminBase || (param !== "hero" && param !== "award" && param !== "career-vacancy" && param !== "client" && param !== "partner" && param !== "promo-slide" && param !== "history" && param !== "news-category" && param !== "news-article" && param !== "service-certification" && param !== "service-gallery" && param !== "service-matrix" && param !== "service-pricing-tier" && param !== "space-room" && param !== "user")) notFound();

  const loginHref = `/${locale}/${routeSlugByLocale[locale]?.login ?? "login"}`;
  const session = (await cookies()).get("session")?.value;

  if (!session) redirect(loginHref);

  const meRes = await fetch(ME_URL, {
    headers: { Cookie: `session=${session}` },
    cache: "no-store",
  });

  if (!meRes.ok) redirect(loginHref);

  if (param === "hero") {
    if (param2 === "create") {
      return <HeroCreatePage dict={dict} locale={locale} />;
    }
    return <HeroDetailPage dict={dict} locale={locale} heroId={param2} />;
  }

  if (param === "award") {
    if (param2 === "create") {
      return <AwardCreatePage dict={dict} locale={locale} />;
    }
    return <AwardDetailPage dict={dict} locale={locale} awardId={param2} />;
  }

  if (param === "career-vacancy") {
    if (param2 === "create") {
      return <CareerVacancyCreatePage dict={dict} locale={locale} />;
    }
    return <CareerVacancyDetailPage dict={dict} locale={locale} vacancyId={param2} />;
  }

  if (param === "client") {
    if (param2 === "create") {
      return <ClientCreatePage dict={dict} locale={locale} />;
    }
    return <ClientDetailPage dict={dict} locale={locale} clientId={param2} />;
  }

  if (param === "news-category") {
    if (param2 === "create") {
      return <NewsCategoryCreatePage dict={dict} locale={locale} />;
    }
    return <NewsCategoryDetailPage dict={dict} locale={locale} categoryId={param2} />;
  }

  if (param === "news-article") {
    if (param2 === "create") {
      return <NewsArticleCreatePage dict={dict} locale={locale} />;
    }
    return <NewsArticleDetailPage dict={dict} locale={locale} articleId={param2} />;
  }

  if (param === "service-certification") {
    if (param2 === "create") {
      return <ServiceCertificationCreatePage dict={dict} locale={locale} />;
    }
    return <ServiceCertificationDetailPage dict={dict} locale={locale} certificationId={param2} />;
  }

  if (param === "service-gallery") {
    if (param2 === "create") {
      return <ServiceGalleryCreatePage dict={dict} locale={locale} />;
    }
    return <ServiceGalleryDetailPage dict={dict} locale={locale} galleryId={param2} />;
  }

  if (param === "service-matrix") {
    if (param2 === "create") {
      return <ServiceMatrixCreatePage dict={dict} locale={locale} />;
    }
    return <ServiceMatrixDetailPage dict={dict} locale={locale} matrixId={param2} />;
  }

  if (param === "service-pricing-tier") {
    if (param2 === "create") {
      return <ServicePricingTierCreatePage dict={dict} locale={locale} />;
    }
    return <ServicePricingTierDetailPage dict={dict} locale={locale} tierId={param2} />;
  }

  if (param === "space-room") {
    if (param2 === "create") {
      return <SpaceRoomCreatePage dict={dict} locale={locale} />;
    }
    return <SpaceRoomDetailPage dict={dict} locale={locale} roomId={param2} />;
  }

  if (param === "partner") {
    if (param2 === "create") {
      return <PartnerCreatePage dict={dict} locale={locale} />;
    }
    return <PartnerDetailPage dict={dict} locale={locale} partnerId={param2} />;
  }

  if (param === "promo-slide") {
    if (param2 === "create") {
      return <PromoSlideCreatePage dict={dict} locale={locale} />;
    }
    return <PromoSlideDetailPage dict={dict} locale={locale} slideId={param2} />;
  }

  if (param === "user") {
    if (param2 === "create") {
      return <UserCreatePage dict={dict} locale={locale} />;
    }
    return <UserDetailPage dict={dict} locale={locale} userId={param2} />;
  }

  if (param2 === "create") {
    return <HistoryCreatePage dict={dict} locale={locale} />;
  }

  return <HistoryDetailPage dict={dict} locale={locale} historyId={param2} />;
}
