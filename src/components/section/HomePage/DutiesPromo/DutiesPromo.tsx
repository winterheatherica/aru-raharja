"use client";

import LeftStatement from "./BottomScroller/LeftStatement";
import PromoCarousel from "./PromoCarousel/PromoCarousel";
import type { Dictionary, Locale } from "@/i18n/get_dictionary";

const slidesMeta = [
  { src: "/images/home/duties-promo/hut-aru-raharja-37.png" },
  { src: "/images/home/duties-promo/hut-aru-raharja-37.png" },
];

const cardsMeta = [
  { iconSrc: "/images/home/duties-promo/icon-4.png" },
  { iconSrc: "/images/home/duties-promo/icon-5.png" },
  { iconSrc: "/images/home/duties-promo/icon-6.png" },
];

type Props = { dict: Dictionary; locale: Locale };

export default function DutiesPromo({ dict }: Props) {
  const t = dict.home.dutiesPromo;

  const cards = cardsMeta.map((meta, idx) => ({
    iconSrc: meta.iconSrc,
    title: t.cards[idx]?.title ?? "",
    subtitle: t.cards[idx]?.subtitle ?? "",
    alt: t.cards[idx]?.alt ?? "",
  }));

  const slides = slidesMeta.map((meta, idx) => ({
    src: meta.src,
    title: t.slides[idx]?.title ?? "",
    alt: t.slides[idx]?.alt ?? "",
  }));

  return (
    <section className="relative animate-fade-down">
      <div className="relative grid gap-6 mt-6 lg:grid-cols-5">
        <LeftStatement title={t.heading} descPrefix={t.descPrefix} laws={t.laws} cards={cards} />
        <PromoCarousel slides={slides} autoplayMs={5000} />
      </div>
    </section>
  );
}
