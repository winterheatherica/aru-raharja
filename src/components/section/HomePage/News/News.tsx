"use client";

import { memo } from "react";
import type { Dictionary } from "@/i18n/getDictionary";
import Carousel from "./Carousel";
import { newsItems } from "./data";

function News({ dict }: { dict: Dictionary }) {
  const t = dict.news;
  return (
    <section className="relative h-[470px] md:h-[520px] lg:h-[590px] mt-12">
      <div className="absolute inset-x-0 top-0">
        <h2 className="mb-4 text-2xl font-semibold lg:text-4xl lg:font-bold text-bumnblack-1">
          {t.heading}
        </h2>

        <Carousel
          items={newsItems}
          readMoreLabel={t.readMoreLabel}
          loadMoreLabel={t.loadMoreLabel}
        />
      </div>
    </section>
  );
}

export default memo(News);
