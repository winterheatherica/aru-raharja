import { notFound } from "next/navigation";
import type { Locale, Dictionary } from "@/i18n/getDictionary";
import { getDictionary } from "@/i18n/getDictionary";
import {
  canonicalBySlug,
  routeSlugByLocale,
  locales,
  type CanonicalPage,
} from "@/i18n/routes";

import HomePage from "@/components/pages/HomePage";
import AboutPage from "@/components/pages/AboutPage";
import ServicePage from "@/components/pages/ServicePage";
import ReservationPage from "@/components/pages/ReservationPage";
import InformationPage from "@/components/pages/InformationPage";
import AppealPage from "@/components/pages/AppealPage";
import CareerPage from "@/components/pages/CareerPage";

const BRAND = "PT Aru Raharja" as const;

type PageComponentProps = {
  dict: Dictionary;
  locale: Locale;
};

const PageComponentByCanonical: Record<CanonicalPage, React.ComponentType<PageComponentProps>> = {
  home: HomePage,
  about: AboutPage,
  service: ServicePage,
  reservation: ReservationPage,
  information: InformationPage,
  appeal: AppealPage,
  career: CareerPage,
};

const titleByCanonical: Record<CanonicalPage, Record<Locale, string>> = {
  home: { en: `Home - ${BRAND}`, id: `Beranda - ${BRAND}` },
  about: { en: `About - ${BRAND}`, id: `Tentang - ${BRAND}` },
  service: { en: `Services - ${BRAND}`, id: `Layanan - ${BRAND}` },
  reservation: { en: `Reservation - ${BRAND}`, id: `Reservasi - ${BRAND}` },
  information: { en: `Information - ${BRAND}`, id: `Informasi - ${BRAND}` },
  appeal: { en: `Appeal - ${BRAND}`, id: `Himbauan - ${BRAND}` },
  career: { en: `Career - ${BRAND}`, id: `Karier - ${BRAND}` },
};

export default async function DynamicPage({
  params: { locale, page },
}: {
  params: { locale: Locale; page: string };
}) {
  const dict = await getDictionary(locale);

  const canonical = canonicalBySlug(locale)[page];
  if (!canonical) return notFound();

  const Component = PageComponentByCanonical[canonical];
  if (!Component) return notFound();

  return <Component dict={dict} locale={locale} />;
}

export async function generateStaticParams() {
  return locales.flatMap((l) =>
    Object.values(routeSlugByLocale[l]).map((slug) => ({ locale: l, page: slug }))
  );
}

export async function generateMetadata({
  params: { locale, page },
}: {
  params: { locale: Locale; page: string };
}) {
  const canonical = canonicalBySlug(locale)[page];
  if (!canonical) return {};

  const title = titleByCanonical[canonical]?.[locale] ?? BRAND;

  const languages: Record<string, string> = {
    en: `/en/${routeSlugByLocale.en[canonical]}`,
    id: `/id/${routeSlugByLocale.id[canonical]}`,
  };

  return {
    title,
    alternates: { languages },
  };
}
