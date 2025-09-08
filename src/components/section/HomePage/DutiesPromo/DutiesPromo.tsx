"use client";

import LeftStatement from "./BottomScroller/LeftStatement";
import PromoCarousel from "./PromoCarousel/PromoCarousel";
import type { Dictionary, Locale } from "@/i18n/getDictionary";

const slides = [
  { title: "Twibbon #HUTAruRaharja", src: "/duties-promo/hut-aru-raharja.png", alt: "Twibbon #HUTAruRaharja" },
  { title: "Himbauan Kami", src: "/duties-promo/hut-aru-raharja.png", alt: "Himbauan Kami" },
];

const cards = [
  { title: "Perlindungan Penumpang", subtitle: "Perlindungan Penumpang Angkutan Umum Resmi", iconSrc: "/duties-promo/shield-icon.png",  alt: "shield" },
  { title: "Perlindungan Pihak Ketiga", subtitle: "Perlindungan kepada pihak ketiga di luar kendaraan penyebab kecelakaan", iconSrc: "/duties-promo/shields-icon.png", alt: "shields" },
  { title: "Perlindungan Pihak Ketiga", subtitle: "Perlindungan kepada pihak ketiga di luar kendaraan penyebab kecelakaan", iconSrc: "/duties-promo/shields-icon.png", alt: "shields" },
];

type Props = { dict: Dictionary; locale: Locale };

export default function DutiesPromo({ dict }: Props) {
  const t = dict.dutiesPromo;

  return (
    <section className="relative">
      <div className="relative grid gap-6 mt-6 lg:grid-cols-5">
        <LeftStatement title={t.heading} descPrefix={t.descPrefix} laws={t.laws} cards={cards} />
        <PromoCarousel slides={slides} autoplayMs={5000} />
      </div>
    </section>
  );
}
