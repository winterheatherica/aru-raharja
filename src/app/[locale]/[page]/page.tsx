import dynamic from "next/dynamic";
import { notFound } from "next/navigation";
import type { Locale, Dictionary } from "@/i18n/get_dictionary";
import { getDictionary } from "@/i18n/get_dictionary";
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

const LoginPage = dynamic(() => import("@/components/pages/LoginPage"), {
  ssr: false,
  loading: () => <div>Loading…</div>,
});
const AdminPage = dynamic(() => import("@/components/pages/AdminPage"), {
  ssr: false,
  loading: () => <div>Loading admin…</div>,
});

const BRAND = "PT Aru Raharja" as const;

type PageComponentProps = {
  dict: Dictionary;
  locale: Locale;
};

const PageComponentByCanonical: Record<CanonicalPage, React.ComponentType<PageComponentProps> | null> = {
  home: HomePage,
  about: AboutPage,
  service: ServicePage,
  reservation: ReservationPage,
  information: InformationPage,
  appeal: AppealPage,
  career: CareerPage,
  login: null,
  admin: null,
};

const titleByCanonical: Record<CanonicalPage, Record<Locale, string>> = {
  home: { en: `Home - ${BRAND}`, id: `Beranda - ${BRAND}` },
  about: { en: `About - ${BRAND}`, id: `Tentang - ${BRAND}` },
  service: { en: `Services - ${BRAND}`, id: `Layanan - ${BRAND}` },
  reservation: { en: `Reservation - ${BRAND}`, id: `Reservasi - ${BRAND}` },
  information: { en: `Information - ${BRAND}`, id: `Informasi - ${BRAND}` },
  appeal: { en: `Appeal - ${BRAND}`, id: `Himbauan - ${BRAND}` },
  career: { en: `Career - ${BRAND}`, id: `Karier - ${BRAND}` },
  login: { en: `Login - ${BRAND}`, id: `Masuk - ${BRAND}` },
  admin: { en: `Admin - ${BRAND}`, id: `Admin - ${BRAND}` },
};

export default async function DynamicPage({
  params: { locale, page },
}: {
  params: { locale: Locale; page: string };
}) {
  const dict = await getDictionary(locale);

  const canonical = canonicalBySlug(locale)[page];
  if (!canonical) return notFound();

  if (canonical === "login") {
    return <LoginPage dict={dict} locale={locale} />;
  }
  
  if (canonical === "admin") {
    return <AdminPage dict={dict} locale={locale} />;
  }

  const Component = PageComponentByCanonical[canonical];
  if (!Component) return notFound();

  return <Component dict={dict} locale={locale} />;
}

export async function generateStaticParams() {
  return locales.flatMap((l) =>
    Object.values(routeSlugByLocale[l as keyof typeof routeSlugByLocale]).map((slug) => ({ locale: l, page: slug }))
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
    en: `/en/${routeSlugByLocale.en[canonical as keyof typeof routeSlugByLocale.en]}`,
    id: `/id/${routeSlugByLocale.id[canonical as keyof typeof routeSlugByLocale.id]}`,
  };

  return {
    title,
    alternates: { languages },
  };
}
