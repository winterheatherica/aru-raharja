"use client";

import PartnerItem from "./PartnerItem";
import type { Partner } from "./Partners";

export default function PartnersCarousel({ items }: { items: Partner[] }) {
  return (
    <div className="md:hidden">
      <div className="snap snap-x snap-mandatory flex h-56 w-72 gap-5 overflow-x-scroll scrollbar-hide">
        {items.map((it) => (
          <div key={it.title} className="snap-center snap-always">
            <PartnerItem data={it} variant="mobile" />
          </div>
        ))}
      </div>
    </div>
  );
}
