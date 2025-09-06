"use client";

import LeftStatement from "./LeftStatement";
import PromoCarousel from "./PromoCarousel/PromoCarousel";
import BottomScroller from "./BottomScroller/BottomScroller";
import { promoSlides, scrollerCards } from "./data";

export default function DutiesPromo() {
  return (
    <section className="relative">
      <div className="relative grid gap-6 mt-6 lg:grid-cols-5">
        <LeftStatement />
        <PromoCarousel slides={promoSlides} autoplayMs={0} />
      </div>

      <BottomScroller cards={scrollerCards} />
    </section>
  );
}
