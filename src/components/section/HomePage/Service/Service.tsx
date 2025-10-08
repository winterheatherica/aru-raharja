"use client";

import { memo } from "react";
import type { Dictionary, Locale } from "@/i18n/getDictionary";
import ServiceCard from "./ServiceCard";

function Service({ dict, locale }: { dict: Dictionary; locale: Locale }) {
  const t = dict.home.service.cards;

  return (
    <section className="mt-12">
      <div className="grid gap-4 lg:gap-6 lg:grid-cols-3">
        <ServiceCard
          href={`/${locale}/service`}
          title={t.services.title}
          subtitle={t.services.subtitle}
          imgSrc="/images/home/services/layanan-icon-2.png"
          imgAlt={t.services.alt}
          imgClassName="w-[160px] lg:w-[180px] bottom-0"
        />

        <ServiceCard
          href={`/${locale}/complaint`}
          title={t.complaint.title}
          subtitle={t.complaint.subtitle}
          imgSrc="/images/home/services/pengaduan-icon-2.png"
          imgAlt={t.complaint.alt}
          imgClassName="w-[160px] lg:w-[140px] -bottom-2"
        />

        <ServiceCard
          href={`/${locale}/appeal`}
          title={t.appeal.title}
          subtitle={t.appeal.subtitle}
          imgSrc="/images/home/services/himbauan-icon-2.png"
          imgAlt={t.appeal.alt}
          imgClassName="w-[160px] lg:w-[180px] bottom-0"
        />
      </div>
    </section>
  );
}

export default memo(Service);
