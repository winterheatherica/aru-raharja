"use client";

import { memo } from "react";
import Image from "next/image";
import type { Dictionary } from "@/i18n/get_dictionary";
import PartnersGrid from "./PartnersGrid";
import PartnersCarousel from "./PartnersCarousel";

export type Partner = {
  id: string;
  title: string;
  alt: string;
  src: string;
  order?: number;
};

type Props = {
  dict: Dictionary;
  partners: Partner[];
};

function Partners({ dict, partners }: Props) {
  const t = (dict as any).about.partners;

  const items = [...partners].sort(
    (a, b) => (a.order ?? 0) - (b.order ?? 0)
  );

  if (!items.length) return null;

  return (
    <section className="relative flex flex-col items-center justify-center gap-6 px-4 py-8 lg:gap-8 lg:px-24 lg:py-16 bg-bumn-radial-1 rounded-2xl shadow-sm overflow-hidden">
      <Image
        src="/images/general/masking/aru-mask-1-white.png"
        alt=""
        fill
        priority
        className="hidden md:block object-cover object-bottom opacity-75 pointer-events-none select-none"
      />
      <h2 className="text-3xl sm:text-3xl md:text-4xl lg:text-5xl font-bold capitalize font-inter lg:leading-[54px] text-center text-white relative z-10">
        {t.heading}
      </h2>

      <p className="font-sans text-lg font-normal sm:text-xl lg:text-2xl lg:leading-9 max-w-2xl text-center text-white relative z-10">
        {t.description}
      </p>

      <div className="relative z-10">
        <PartnersGrid items={items} />
        <PartnersCarousel items={items} />
      </div>
    </section>
  );
}

export default memo(Partners);
