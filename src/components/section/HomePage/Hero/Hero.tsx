"use client";

import Carousel, { type HeroSlide } from "./Carousel";
import type { Dictionary, Locale } from "@/i18n/getDictionary";

export default function Hero({
  dict,
  locale,
}: {
  dict: Dictionary;
  locale: Locale;
}) {
  const { hero } = dict as any;

  const slides: HeroSlide[] = [
    { src: "/carousel/hero-slide-1.png", alt: "HUT RI ke-80" },
    { src: "/carousel/hero-slide-2.png", alt: "Linktree Aru Raharja" },
    {
      src: "/carousel/hero-slide-3.jpg",
      alt: "FAQ",
      title: hero.faqTitle,
      ctaLabel: hero.faqCta,
      ctaHref: `/${locale}/faq`,
    },
    {
      src: "/carousel/hero-slide-4.jpg",
      alt: "Layanan Santunan",
      title: hero.serviceTitle,
      ctaLabel: hero.serviceCta,
      ctaHref: `/${locale}/service`,
    },
    {
      src: "/carousel/hero-slide-5.jpg",
      alt: "Layanan Pengaduan",
      title: hero.complaintTitle,
      ctaLabel: hero.complaintCta,
      ctaHref: `/${locale}/complaint`,
    },
  ];

  return (
    <section
      aria-label="Hero Carousel"
      className="relative w-full max-w-screen-1440 mx-auto overflow-hidden"
    >
      <Carousel slides={slides} autoplayMs={5000} />
    </section>
  );
}
