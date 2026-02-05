"use client";

import PartnerItem from "./PartnerItem";
import type { Partner } from "./Partners";

export default function PartnersGrid({ items }: { items: Partner[] }) {
  return (
    <div className="hidden md:flex flex-wrap items-center justify-center gap-5">
      {items.map((it) => (
        <PartnerItem key={it.id} data={it} variant="desktop" />
      ))}
    </div>
  );
}
