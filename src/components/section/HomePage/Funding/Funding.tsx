"use client";

import { memo } from "react";
import Carousel, { FundingItem } from "./Carousel";
import LeftStatement from "./LeftStatement";
import MaskOverlay from "./MaskOverlay";
import type { Dictionary } from "@/i18n/get_dictionary";

const STATIC_ITEMS: Pick<FundingItem, "code" | "iconSrc">[] = [
  { code: "Web Development", iconSrc: "/images/home/duties-promo/icon-1.png" },
  { code: "Mobile Apps", iconSrc: "/images/home/duties-promo/icon-2.png" },
  { code: "UI/UX Design", iconSrc: "/images/home/duties-promo/icon-3.png" },

  { code: "ARUdigital", iconSrc: "/images/home/duties-promo/aru-digital.png" },
  { code: "ARUsolution", iconSrc: "/images/home/duties-promo/aru-solution.png" },
  { code: "ARUhealthcare", iconSrc: "/images/home/duties-promo/aru-healthcare.png" },
  { code: "ARUlog", iconSrc: "/images/home/duties-promo/aru-log.png" },
  { code: "ARUcontractor", iconSrc: "/images/home/duties-promo/aru-contractor.png" },
  { code: "ARUtrans", iconSrc: "/images/home/duties-promo/aru-trans.png" },
  { code: "ARUsource", iconSrc: "/images/home/duties-promo/aru-source.png" },
  { code: "ARUspace", iconSrc: "/images/home/duties-promo/aru-space.png" },
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
        <LeftStatement htmlDesktop={t.leftTitleHtmlDesktop} htmlMobile={t.leftTitleHtmlMobile} />

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
