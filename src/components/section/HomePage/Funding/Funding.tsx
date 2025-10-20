"use client";

import { memo } from "react";
import Carousel, { FundingItem } from "./Carousel";
import LeftStatement from "./LeftStatement";
import MaskOverlay from "./MaskOverlay";
import type { Dictionary } from "@/i18n/getDictionary";

const STATIC_ITEMS: Pick<FundingItem, "code" | "iconSrc">[] = [
  { code: "SWDKLJJ", iconSrc: "/images/home/funding/swdkljj-icon-2.png" },
  { code: "IWKBU",   iconSrc: "/images/home/funding/iwkbu-icon-2.png" },
  { code: "IWPU",    iconSrc: "/images/home/funding/iwpu-icon-2.png" },
  { code: "IWKA",    iconSrc: "/images/home/funding/iwka-icon-2.png" },
  { code: "IWKL",    iconSrc: "/images/home/funding/iwkl-icon-2.png" },
];

function FundingComponent({ dict }: { dict: Dictionary }) {
  const t = dict.home.funding;

  const items: FundingItem[] = STATIC_ITEMS.map((it, idx) => ({
    code: it.code,
    iconSrc: it.iconSrc,
    description: t.items[idx]?.description ?? "",
  }));

  return (
    <section className="mt-6">
      <div
        className="
          relative w-full rounded-2xl flex overflow-hidden bg-bumn-gradient-primary-11
          h-[28rem] md:h-[24rem] lg:h-[22rem]
          px-8 md:px-12 lg:px-12
          py-8 md:py-10 lg:py-12
        "
      >
        <LeftStatement html={t.leftTitleHtml} />

        <MaskOverlay />

        <div className="absolute inset-x-8 md:inset-x-12 bottom-6 md:bottom-8">
          <div className="pl-0 md:pl-[18rem] lg:pl-[22rem]">
            <Carousel items={items} />
          </div>
        </div>
      </div>
    </section>
  );
}

export default memo(FundingComponent);
