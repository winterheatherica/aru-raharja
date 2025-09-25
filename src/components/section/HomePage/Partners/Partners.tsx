"use client";

import { memo } from "react";
import type { Dictionary } from "@/i18n/getDictionary";
import PartnersGrid from "./PartnersGrid";
import PartnersCarousel from "./PartnersCarousel";

export type Partner = {
  title: string;
  alt: string;
  src: string;
};

function Partners({ dict }: { dict: Dictionary }) {
  const t = (dict as any).partners ?? {
    heading: "Keanggotaan",
    description:
      "Layanan ARU Raharja telah dipercayai oleh berbagai perusahaan kelas dunia dari berbagai industri untuk membantu mereka berkembang.",
  };

  const PARTNERS: Partner[] = [
    { title: "info@aruraharja.co.id", alt: "Aru Raharja", src: "/common/AruLogo.svg" },
    { title: "GAPENSI", alt: "Gapensi", src: "/partner/Keanggotaan/LOGO-GAPENSI.png" },
    { title: "ABUJAPI", alt: "Abujapi", src: "/partner/Keanggotaan/abujapi.png" },
    { title: "Kadin Indonesia", alt: "Kadin Indonesia", src: "/partner/Keanggotaan/kadin-2.jpeg" },
    { title: "APKLINDO", alt: "Apklindo", src: "/partner/Keanggotaan/apklindo.jpeg" },
  ];

  return (
    <section className="flex flex-col items-center justify-center gap-6 px-4 py-8 lg:gap-8 lg:px-24 lg:py-16">
      <h2 className="text-[1.5rem] lg:text-[2rem] leading-[2.1rem] lg:leading-[2.8rem] font-bold max-w-5xl text-center text-secondMineShaft">
        {t.heading}
      </h2>

      <p className="text-[0.875rem] lg:text-[1.125rem] leading-[1.225rem] lg:leading-[1.575rem] max-w-2xl text-center text-secondMineShaft">
        {t.description}
      </p>

      <PartnersGrid items={PARTNERS} />
      <PartnersCarousel items={PARTNERS} />
    </section>
  );
}

export default memo(Partners);
