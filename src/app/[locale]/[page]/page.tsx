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

type PageComponentProps = {
  dict: Dictionary;
  locale: Locale;
  site: any;
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

async function fetchFromAPI(endpoint: string, locale: Locale) {
  const lang = locale.toUpperCase();

  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_BASE}${endpoint}?lang=${lang}`,
    { cache: "no-store" }
  );

  if (!res.ok) {
    throw new Error(`Failed to fetch ${endpoint}`);
  }

  return res.json();
}

const fetchHome = (l: Locale) => fetchFromAPI("/api/home", l).then((data) => ({ home: data }));
const fetchAbout = (l: Locale) => fetchFromAPI("/api/about", l);
const fetchReservation = (l: Locale) => fetchFromAPI("/api/reservation", l);
const fetchInformation = (l: Locale) => fetchFromAPI("/api/information", l);
const fetchCareer = (l: Locale) => fetchFromAPI("/api/career", l);

const fetcherByPage: Partial<
  Record<CanonicalPage, (l: Locale) => Promise<any>>
> = {
  home: fetchHome,
  about: fetchAbout,
  reservation: fetchReservation,
  information: fetchInformation,
  career: fetchCareer,
};

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

  const fetcher = fetcherByPage[canonical];
  const site = fetcher ? await fetcher(locale) : null;

  return <Component dict={dict} locale={locale} site={site} />;
}

export async function generateStaticParams() {
  return locales.flatMap((l) =>
    Object.values(
      routeSlugByLocale[l as keyof typeof routeSlugByLocale]
    ).map((slug) => ({ locale: l, page: slug }))
  );
}

function buildSocialMeta(meta: {
  title: string;
  description?: string;
  image?: string;
  keywords?: string;
}) {
  return {
    title: meta.title,
    description: meta.description,
    keywords: meta.keywords,
    robots: "index, follow",

    openGraph: {
      title: meta.title,
      description: meta.description,
      siteName: "PT Aru Raharja",
      type: "website",
      images: meta.image
        ? [
            {
              url: meta.image,
              alt: meta.title,
              type: "image/png",
            },
          ]
        : [],
    },

    twitter: {
      card: "summary_large_image",
      title: meta.title,
      description: meta.description,
      images: meta.image ? [meta.image] : [],
    },
  };
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

  const pageDict = (dict as any)?.[canonical];
  const meta = pageDict?.meta;

  if (!meta?.title) return {};

  return buildSocialMeta(meta);
}
