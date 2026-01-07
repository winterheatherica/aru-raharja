import Masking from "@/components/section/HomePage/Masking/Masking";
import Hero from "@/components/section/HomePage/Hero/Hero";
import DutiesPromo from "@/components/section/HomePage/DutiesPromo/DutiesPromo";
import Funding from "@/components/section/HomePage/Funding/Funding";
import StatsCtaMap from "@/components/section/HomePage/StatsCtaMap/StatsCtaMap";
import Service from "@/components/section/HomePage/Service/Service";
import News from "@/components/section/HomePage/News/News";
import Videos from "@/components/section/HomePage/Videos/Videos";
import QuickLinks from "@/components/section/HomePage/QuickLinks/QuickLinks";
import PartnerScroller from "@/components/section/HomePage/PartnerScroller/PartnerScroller";

import type { Locale, Dictionary } from "@/i18n/get_dictionary";
import type { HeroSlideAPI } from "@/types/hero";

type ScrollerItem = {
  id: string;
  src: string;
  alt: string;
  title: string;
  order: number;
};

type PromoSlide = {
  id: string;
  src: string;
  alt: string;
  title: string;
  order: number;
};

type NewsAPIItem = {
  id: string;
  slug: string;
  title: string;
  summary: string;
  image_path: string;
  published_at: string;
};

type HomeData = {
  hero?: unknown[];
  partner_scroller?: ScrollerItem[];
  client_scroller?: ScrollerItem[];
  promo?: PromoSlide[];
  news?: NewsAPIItem[];
};

type Props = {
  dict: Dictionary;
  locale: Locale;
  site: {
    home?: HomeData;
    [key: string]: unknown;
  };
};

export default function HomePage({ dict, locale, site }: Props) {
  const home = site.home ?? {};

  const heroSlides = (home.hero ?? []) as HeroSlideAPI[];
  const promoSlides = home.promo ?? [];
  const news = home.news ?? [];
  const partners = home.partner_scroller ?? [];
  const clients = home.client_scroller ?? [];

  return (
    <main className="relative px-4 lg:px-2 py-2 mx-auto max-w-screen-1440 text-bumnslate-6">

      <Hero slides={heroSlides} locale={locale} />

      <DutiesPromo
        dict={dict}
        locale={locale}
        promo={promoSlides}
      />

      <Funding dict={dict} />
      <StatsCtaMap dict={dict} locale={locale} />
      <Service dict={dict} locale={locale} />
      <News dict={dict} locale={locale} items={news} />

      <PartnerScroller
        locale={locale}
        partners={partners}
        clients={clients}
      />

      <QuickLinks dict={dict} />
    </main>
  );
}
