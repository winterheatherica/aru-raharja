import dynamic from "next/dynamic";
import type { Metadata } from "next";
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
}): Promise<Metadata> {
  const { locale, page } = params;
  const dict = await getDictionary(locale);
  const canonical = canonicalBySlug(locale)[page];
  if (!canonical) return {};

  if (canonical === "home") {
    const seo = (dict as any)?.home?.seo;
    const og = (dict as any)?.home?.openGraph;
    const twitter = (dict as any)?.home?.twitter;

    return {
      title: seo?.title,
      description: seo?.description,
      robots: seo?.robots,
      alternates: {
        canonical: seo?.canonical,
        languages: {
          en: "/en/home",
          id: "/id/beranda",
        },
      },
      openGraph: og
        ? {
            type: og.type,
            locale: og.locale,
            siteName: og.siteName,
            title: og.title,
            description: og.description,
            url: og.url,
            images: og.image
              ? [
                  {
                    url: og.image.url,
                    width: og.image.width,
                    height: og.image.height,
                    alt: og.image.alt,
                    type: og.image.type,
                  },
                ]
              : [],
          }
        : undefined,
      twitter: twitter
        ? {
            card: twitter.card,
            title: twitter.title,
            description: twitter.description,
            images: twitter.image ? [twitter.image] : [],
          }
        : undefined,
    };
  }
  const pageDict = (dict as any)?.[canonical];
  const meta = pageDict?.meta;

  return {
    title: meta?.title,
    description: meta?.description,
  };
}
