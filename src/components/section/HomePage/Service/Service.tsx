"use client";

import { memo } from "react";
import useRevealOnScroll from "@/components/general/Motion/useRevealOnScroll";
import type { Dictionary, Locale } from "@/i18n/get_dictionary";
import ServiceCard from "./ServiceCard";

const SERVICES_META = [
  {
    key: "arudigital",
    imgSrc: "/images/home/services/layanan-icon-2.png",
  },
  {
    key: "aruhealthcare",
    imgSrc: "/images/home/services/pengaduan-icon-2.png",
  },
  {
    key: "arusolution",
    imgSrc: "/images/home/services/himbauan-icon-2.png",
  },
] as const;

function Service({ dict, locale }: { dict: Dictionary; locale: Locale }) {
  const t = dict.home.service.cards;
  const basePath = locale === "id" ? "layanan" : "service";
  const { ref, visible } = useRevealOnScroll<HTMLElement>();

  return (
    <section
      ref={ref}
      className={`mt-12 transition-all duration-700 ease-out ${visible ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0"}`}
    >
      <div className="grid gap-4 lg:gap-6 lg:grid-cols-3">
        {SERVICES_META.map((meta) => {
          const content = t[meta.key];

            return (
              <ServiceCard
                key={meta.key}
                href={`/${locale}/${basePath}/${meta.key}`}
                title={content.title}
                subtitle={content.subtitle}
                imgSrc={meta.imgSrc}
                imgAlt={content.alt}
                imgClassName="w-[160px] lg:w-[180px] bottom-0"
              />
            );
        })}
      </div>
    </section>
  );
}

export default memo(Service);
