"use client";

import { memo } from "react";
import type { Dictionary } from "@/i18n/getDictionary";
import Carousel from "./Carousel";
import { videoItems } from "./data";

function Videos({ dict }: { dict: Dictionary }) {
  const t = dict.home.videos;
  return (
    <section className="relative h-auto mt-12">
      <div className="relative">
        <h2 className="pl-4 mb-4 text-2xl font-semibold lg:text-4xl lg:font-bold text-black">
          {t.heading}
        </h2>

        <div className="h-[460px] md:h-[480px] lg:h-[520px]">
          <Carousel
            items={videoItems}
            readMoreLabel={t.readMoreLabel}
            loadMoreLabel={t.loadMoreLabel}
          />
        </div>
      </div>
    </section>
  );
}

export default memo(Videos);
