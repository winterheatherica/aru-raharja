import type { Metadata } from "next";
import { notFound, redirect } from "next/navigation";
import type { Locale } from "@/i18n/get_dictionary";
import { getDictionary } from "@/i18n/get_dictionary";
import {
  canonicalBySlug,
  routeSlugByLocale,
  locales,
  type CanonicalPage,
} from "@/i18n/routes";
import { dynamicSegmentByLocale } from "@/i18n/param_routes";

import {
  PageComponentByCanonical,
  LoginPage,
  AdminPage,
} from "./_config";

import {
  fetchHome,
  fetchAbout,
  fetchService,
  fetchReservation,
  fetchInformation,
  fetchCareer,
} from "./_fetchers";

import { buildSocialMeta } from "./_metadata";

const fetcherByPage: Partial<
  Record<CanonicalPage, (l: Locale) => Promise<any>>
> = {
  home: fetchHome,
  about: fetchAbout,
  service: fetchService,
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

  if (!canonical) notFound();

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
  if (!Component) notFound();

  const fetcher = fetcherByPage[canonical];
  const site = fetcher ? await fetcher(locale) : null;

  return <Component dict={dict} locale={locale} activeSolution={undefined} site={site} />;
}

export async function generateStaticParams() {
  return locales.flatMap((l) =>
    Object.values(routeSlugByLocale[l]).map((slug) => ({
      locale: l,
      page: slug,
    }))
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

  const meta = (dict as any)?.[canonical]?.meta;
  if (!meta?.title) return {};

  return buildSocialMeta(meta);
}
