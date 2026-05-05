"use client";

import dynamic from "next/dynamic";
import type { Locale } from "@/i18n/get_dictionary";
import type { HeroSlideAPI } from "@/components/section/HomePage/Hero/types";
import useRevealOnScroll from "@/components/general/Motion/useRevealOnScroll";

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
  locale: _locale,
}: {
  slides: HeroSlideAPI[];
  locale: Locale;
}) {
  const { ref, visible } = useRevealOnScroll<HTMLElement>();

  const mapped = slides.map((s) => ({
    ...s,
    title: s.title ?? undefined,
    description: s.description ?? undefined,
    ctaHref: undefined,
  }));

  return (
    <section
      ref={ref}
      aria-label="Hero Carousel"
      className={`relative mx-auto w-full max-w-screen-1920 overflow-hidden transition-all duration-[700ms] ease-out ${visible ? "translate-y-0 opacity-100" : "-translate-y-8 opacity-0"}`}
    >
      <LazyCarousel slides={mapped} autoplayMs={5000} />
    </section>
  );
}
