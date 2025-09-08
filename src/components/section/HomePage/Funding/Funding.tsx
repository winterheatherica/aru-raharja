"use client";

import { memo } from "react";
import Carousel from "./Carousel";
import LeftStatement from "./LeftStatement";
import MaskOverlay from "./MaskOverlay";
import type { Dictionary } from "@/i18n/getDictionary";

type FundingItem = { code: string; description: string; iconSrc: string; iconAlt?: string };
type FundingDict = { leftTitleHtml: string; maskSrc?: string | null; items: FundingItem[] };

function FundingComponent({ dict }: { dict: Dictionary }) {
  const f = ((dict as unknown) as { funding?: FundingDict }).funding ?? {
    leftTitleHtml: "",
    maskSrc: null,
    items: [],
  };

  return (
    <section className="mt-6">
      <div
        className="
            relative w-full rounded-2xl flex overflow-hidden bg-bumn-2
            h-[28rem] md:h-[24rem] lg:h-[22rem]
            px-8 md:px-12 lg:px-12
            py-8 md:py-10 lg:py-12
        "
      >
        <LeftStatement html={f.leftTitleHtml} />
        {f.maskSrc ? <MaskOverlay src={f.maskSrc} /> : null}

        <div className="absolute inset-x-8 md:inset-x-12 bottom-6 md:bottom-8">
          <div className="pl-0 md:pl-[18rem] lg:pl-[22rem]">
            <Carousel items={f.items} />
          </div>
        </div>
      </div>
    </section>
  );
}

export default memo(FundingComponent);
