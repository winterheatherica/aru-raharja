"use client";

import { memo } from "react";
import type { Dictionary, Locale } from "@/i18n/get_dictionary";
import Metrics from "./Metrics";
import CtaButton from "./CtaButton";
import RightHeadline from "./RightHeadline";
import MapImage from "./MapImage";

function StatsCtaMap({ dict, locale }: { dict: Dictionary; locale: Locale }) {
  const s = dict.home.statsCtaMap;

  const metrics = [
    { value: 200, suffix: "+", label: s.metricLabels.regionalOffices },
    { value: 37, suffix: "+", label: s.metricLabels.branchOffices },
    { value: 24, suffix: "/7", label: s.metricLabels.serviceOffices },
  ];

  const ctaHref = `/${locale}/complaint`;
  const mapSrc = "/images/home/stats-cta-map/indonesia.png";

  return (
    <section className="mt-6">
      <div className="rounded-xl border text-card-foreground w-full mt-6 border-none shadow-none">
        <div className="relative flex flex-col w-full px-4 pt-4 pb-4 md:flex-row md:px-8 md:pt-12 md:pb-12">
          <div className="z-10 space-y-8">
            <Metrics items={metrics} />
            {/* <CtaButton href={ctaHref} label={s.ctaLabel} /> */}
          </div>

          <div className="z-10 hidden mb-20 ml-auto lg:block">
            <RightHeadline html={s.rightHeadlineHtml} />
          </div>

          <div className="absolute bottom-0 right-0 z-0 hidden w-[800px] md:block">
            <MapImage src={mapSrc} alt="indonesia map" />
          </div>
        </div>
      </div>
    </section>
  );
}

export default memo(StatsCtaMap);
