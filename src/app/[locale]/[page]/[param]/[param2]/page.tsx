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

  if (page !== adminBase || (param !== "hero" && param !== "award" && param !== "career-vacancy" && param !== "client" && param !== "partner" && param !== "promo-slide" && param !== "history" && param !== "news-category")) notFound();

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

  if (param2 === "create") {
    return <HistoryCreatePage dict={dict} locale={locale} />;
  }

  return <HistoryDetailPage dict={dict} locale={locale} historyId={param2} />;
}
