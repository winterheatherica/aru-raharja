"use client";

import * as React from "react";
import { ARU_LOCATION } from "./map.config";
import { ARU_MAP_IMAGE_URL } from "./map.constants";
import useRevealOnScroll from "@/components/general/Motion/useRevealOnScroll";

type Props = {
  dict: any;
};

export default function Map({ dict }: Props) {
  const t = dict?.service?.map;
  if (!t) return null;

  const { ref, visible } = useRevealOnScroll<HTMLDivElement>();
  const [hasShown, setHasShown] = React.useState(false);

  React.useEffect(() => {
    if (visible) setHasShown(true);
  }, [visible]);

  const headerAnim = hasShown
    ? "opacity-100 translate-x-0"
    : "opacity-0 -translate-x-10";

  const mapAnim = hasShown
    ? "opacity-100 translate-y-0"
    : "opacity-0 translate-y-10";

  return (
    <section className="space-y-8">
      <div ref={ref}>
        <div
          className={`max-w-3xl mx-auto text-center space-y-2 transition-all duration-[800ms] ease-out ${headerAnim}`}
        >
          <h3 className="text-2xl font-semibold text-bumnblue-1">
            {t.title}
          </h3>
          <p className="text-sm text-bumnslate-8">
            {t.description}
          </p>
        </div>

        <div
          className={`max-w-4xl mx-auto aspect-[16/9] w-auto rounded-2xl overflow-hidden shadow-bumn-2 mt-8 transition-all duration-[800ms] ease-out ${mapAnim}`}
        >
          <img
            src={ARU_MAP_IMAGE_URL}
            alt={`${ARU_LOCATION.name} Map`}
            className="w-full h-full object-cover"
            loading="lazy"
          />
        </div>
      </div>

      <div className="max-w-4xl mx-auto border border-bumnslate-10 bg-bumn-gradient-white-4 rounded-2xl shadow-bumn-2 p-6 md:p-8 space-y-4">
        <h4 className="text-sm font-semibold text-bumnblue-1">
          {t.locationTitle}
        </h4>

        {t.paragraphs?.map((text: string, idx: number) => (
          <p
            key={idx}
            className="text-sm text-bumnblue-1 leading-relaxed"
          >
            {text}
          </p>
        ))}

        <div className="flex flex-wrap items-center justify-between gap-3 pt-2">
          <p className="text-sm font-medium text-bumnslate-6">
            {ARU_LOCATION.city}
          </p>

          <span className="inline-block text-xs font-medium px-3 py-1 rounded-full bg-bumncyan-1 text-bumnblue-2">
            {t.badge}
          </span>
        </div>
      </div>
    </section>
  );
}