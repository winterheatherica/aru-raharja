"use client";

import dynamic from "next/dynamic";
import type { Locale } from "@/i18n/get_dictionary";
import type { HeroSlideAPI } from "@/types/hero";
import { mapHeroHref } from "@/utils/heroMapper";

const LazyCarousel = dynamic(() => import("./Carousel"), {
  ssr: false,
  loading: () => (
    <div
      aria-label="Hero placeholder"
      className="relative mx-auto w-full max-w-screen-1920 overflow-hidden rounded-2xl bg-neutral-100 aspect-[1920/900] md:aspect-[1920/820]"
    />
  ),
});

export default function Hero({
  slides,
  locale,
}: {
  slides: HeroSlideAPI[];
  locale: Locale;
}) {

  const mapped = slides.map((s) => ({
    ...s,
    title: s.title ?? undefined,
    ctaLabel: s.ctaLabel ?? undefined,
    ctaHref: mapHeroHref(s.banner, locale),
  }));

  return (
    <section
      aria-label="Hero Carousel"
      className="relative mx-auto w-full max-w-screen-1920 overflow-hidden animate-fade-down"
    >
      <LazyCarousel slides={mapped} autoplayMs={5000} />
    </section>
  );
}
