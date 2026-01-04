"use client";

import { memo } from "react";
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

  return (
    <section className="mt-12">
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
