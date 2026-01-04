import dynamic from "next/dynamic";
import { notFound, redirect } from "next/navigation";
import { dynamicSegmentByLocale } from "@/i18n/param_routes";

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

type SiteContent = {
  home?: {
    hero?: unknown[];
    [key: string]: unknown;
  };
  [key: string]: unknown;
};

type PageComponentProps = {
  dict: Dictionary;
  locale: Locale;
  site: SiteContent;
};

const PageComponentByCanonical: Record<
  CanonicalPage,
  React.ComponentType<PageComponentProps> | null
> = {
  home: HomePage,
  about: AboutPage,
  service: ServicePage as any,
  reservation: ReservationPage,
  information: InformationPage,
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
  career: { en: `Career - ${BRAND}`, id: `Karier - ${BRAND}` },
  login: { en: `Login - ${BRAND}`, id: `Masuk - ${BRAND}` },
  admin: { en: `Admin - ${BRAND}`, id: `Admin - ${BRAND}` },
};

async function fetchSite(locale: Locale): Promise<SiteContent> {
  const lang = locale.toUpperCase();

  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_BASE}/api/site?lang=${lang}`,
    { cache: "no-store" }
  );

  if (!res.ok) {
    throw new Error("Failed to fetch site API");
  }

  return res.json();
}

export default async function DynamicPage({
  params,
}: {
  params: { locale: Locale; page: string };
}) {
  const { locale, page } = params;
  const dict = await getDictionary(locale);

  const canonical = canonicalBySlug(locale)[page];
  if (!canonical) return notFound();

  if (canonical === "login") {
    return <LoginPage dict={dict} locale={locale} />;
  }

  if (canonical === "admin") {
    return <AdminPage dict={dict} locale={locale} />;
  }

  if (canonical === "service") {
    const serviceBase =
      dynamicSegmentByLocale[locale]?.service ??
      dynamicSegmentByLocale["id"].service;
    redirect(`/${locale}/${serviceBase}/arudigital`);
  }

  const Component = PageComponentByCanonical[canonical];
  if (!Component) return notFound();

  const site = await fetchSite(locale);

  return <Component dict={dict} locale={locale} site={site} />;
}

export async function generateStaticParams() {
  return locales.flatMap((l) =>
    Object.values(
      routeSlugByLocale[l as keyof typeof routeSlugByLocale]
    ).map((slug) => ({ locale: l, page: slug }))
  );
}

export async function generateMetadata({
  params,
}: {
  params: { locale: Locale; page: string };
}) {
  const { locale, page } = params;
  const dict = await getDictionary(locale);
  const canonical = canonicalBySlug(locale)[page];
  if (!canonical) return {};

  const pageDict = (dict as any)?.[canonical];
  const meta = pageDict?.meta;

  const title =
    meta?.title ?? `PT Aru Raharja`;
  const description =
    meta?.description ?? undefined;

  const languages: Record<string, string> = {
    en: `/en/${routeSlugByLocale.en[canonical]}`,
    id: `/id/${routeSlugByLocale.id[canonical]}`,
  };

  return {
    title,
    description,
    alternates: { languages },
  };
}
