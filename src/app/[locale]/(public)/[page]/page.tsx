import { notFound } from "next/navigation";
import type { Locale } from "@/i18n/getDictionary";
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

const PageComponentByCanonical: Record<CanonicalPage, React.FC<any>> = {
  home: HomePage,
  about: AboutPage,
  service: ServicePage,
  reservation: ReservationPage,
  information: InformationPage,
  appeal: AppealPage,
  career: CareerPage,
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
  const params: Array<{ locale: Locale; page: string }> = [];
  for (const l of locales) {
    for (const slug of Object.values(routeSlugByLocale[l])) {
      params.push({ locale: l, page: slug });
    }
  }
  return params;
}

export async function generateMetadata({
  params: { locale, page },
}: {
  params: { locale: Locale; page: string };
}) {
  const canonical = canonicalBySlug(locale)[page];
  if (!canonical) return {};

  const titleByCanonical: Record<CanonicalPage, Record<Locale, string>> = {
    home: { en: "Home - Aru Raharja", id: "Beranda - Aru Raharja" },
    about: { en: "About - Aru Raharja", id: "Tentang - Aru Raharja" },
    service: { en: "Services - Aru Raharja", id: "Layanan - Aru Raharja" },
    reservation: { en: "Reservation - Aru Raharja", id: "Reservasi - Aru Raharja" },
    information: { en: "Information - Aru Raharja", id: "Informasi - Aru Raharja" },
    appeal: { en: "Appeal - Aru Raharja", id: "Himbauan - Aru Raharja" },
    career: { en: "Careers - Aru Raharja", id: "Karier - Aru Raharja" },
  };

  const title = titleByCanonical[canonical]?.[locale] ?? "Page";
  return {
    title,
    alternates: {
      languages: {
        en: `/${"en"}/${routeSlugByLocale.en[canonical]}`,
        id: `/${"id"}/${routeSlugByLocale.id[canonical]}`,
      },
    },
  };
}
