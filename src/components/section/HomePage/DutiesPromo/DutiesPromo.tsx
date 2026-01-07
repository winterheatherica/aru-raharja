"use client";

import LeftStatement from "./BottomScroller/LeftStatement";
import PromoCarousel from "./PromoCarousel/PromoCarousel";
import type { Dictionary, Locale } from "@/i18n/get_dictionary";

type PromoSlide = {
  id: string;
  src: string;
  alt: string;
  title: string;
  order: number;
};

type Props = {
  dict: Dictionary;
  locale: Locale;
  promo: PromoSlide[];
};

// icon tetap lokal (asset, bukan konten bahasa)
const cardsMeta = [
  { iconSrc: "/images/home/duties-promo/icon-4.png" },
  { iconSrc: "/images/home/duties-promo/icon-5.png" },
  { iconSrc: "/images/home/duties-promo/icon-6.png" },
];

export default function DutiesPromo({ dict, promo }: Props) {
  const t = dict.home.dutiesPromo;

  // === cards: icon dari meta, text dari dictionary ===
  const cards = cardsMeta.map((meta, idx) => ({
    iconSrc: meta.iconSrc,
    title: t.cards[idx]?.title ?? "",
    subtitle: t.cards[idx]?.subtitle ?? "",
    alt: t.cards[idx]?.alt ?? "",
  }));

  // === slides dari API (promo) ===
  const slides = promo
    .slice()
    .sort((a, b) => a.order - b.order)
    .map((item) => ({
      src: item.src,
      title: item.title,
      alt: item.alt,
    }));

  if (!slides.length) return null;

  return (
    <section className="relative animate-fade-down">
      <div className="relative grid gap-6 mt-6 lg:grid-cols-5">
        <LeftStatement
          title={t.heading}
          descPrefix={t.descPrefix}
          laws={t.laws}
          cards={cards}
        />
        <PromoCarousel slides={slides} autoplayMs={5000} />
      </div>
    </section>
  );
}
