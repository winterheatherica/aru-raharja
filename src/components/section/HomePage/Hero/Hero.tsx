"use client";

import dynamic from "next/dynamic";
import { useEffect, useRef, useState } from "react";
import type { Dictionary, Locale } from "@/i18n/getDictionary";
import type { HeroSlide } from "./Carousel";

const LazyCarousel = dynamic(() => import("./Carousel"), {
  ssr: false,
  loading: () => (
    <div
      aria-label="Hero placeholder"
      className="relative mx-auto w-full max-w-screen-1920 overflow-hidden rounded-2xl bg-neutral-100 aspect-[1920/900] md:aspect-[1920/820]"
    />
  ),
});

export default function Hero({ dict, locale }: { dict: Dictionary; locale: Locale }) {
  const { hero } = dict as any;

  const slides: HeroSlide[] = [
    { src: "/carousel/hero-slide-1.webp", alt: "HUT RI ke-80" },
    { src: "/carousel/hero-slide-2.webp", alt: "Linktree Aru Raharja" },
    {
      src: "/carousel/hero-slide-3.webp",
      alt: "FAQ",
      title: hero.faqTitle,
      ctaLabel: hero.faqCta,
      ctaHref: `/${locale}/faq`,
    },
    {
      src: "/carousel/hero-slide-4.webp",
      alt: "Layanan Santunan",
      title: hero.serviceTitle,
      ctaLabel: hero.serviceCta,
      ctaHref: `/${locale}/service`,
    },
    {
      src: "/carousel/hero-slide-5.webp",
      alt: "Layanan Pengaduan",
      title: hero.complaintTitle,
      ctaLabel: hero.complaintCta,
      ctaHref: `/${locale}/complaint`,
    },
  ];

  const [shouldRender, setShouldRender] = useState(false);
  const holderRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let shown = false;
    const show = () => {
      if (!shown) {
        shown = true;
        setShouldRender(true);
      }
    };

    if (holderRef.current && "IntersectionObserver" in window) {
      const io = new IntersectionObserver(
        (entries) => {
          if (entries.some((e) => e.isIntersecting)) {
            io.disconnect();
            show();
          }
        },
        { rootMargin: "200px" }
      );
      io.observe(holderRef.current);
      return () => io.disconnect();
    }

    (window as any).requestIdleCallback
      ? (window as any).requestIdleCallback(show, { timeout: 1500 })
      : setTimeout(show, 800);
  }, []);

  return (
    <section aria-label="Hero Carousel" className="relative mx-auto w-full max-w-screen-1920 overflow-hidden">
      <div ref={holderRef}>
        {shouldRender ? (
          <LazyCarousel slides={slides} autoplayMs={5000} />
        ) : (
          <div className="relative mx-auto w-full max-w-screen-1920 overflow-hidden rounded-2xl bg-neutral-100 aspect-[1920/900] md:aspect-[1920/820]" />
        )}
      </div>
    </section>
  );
}
