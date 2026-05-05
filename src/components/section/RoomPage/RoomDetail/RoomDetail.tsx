"use client";

import * as React from "react";
import useRevealOnScroll from "@/components/general/Motion/useRevealOnScroll";

type Props = {
  title: string;
  description: string;
  capacity: number;
  floor: number;
  facilities: string[];
};

export default function RoomDetail({
  title,
  description,
  capacity,
  floor,
  facilities,
}: Props) {
  const { ref, visible } = useRevealOnScroll<HTMLDivElement>();
  const [hasShown, setHasShown] = React.useState(false);

  React.useEffect(() => {
    if (visible) setHasShown(true);
  }, [visible]);

  const anim = hasShown
    ? "opacity-100 translate-y-0"
    : "opacity-0 translate-y-10";

  return (
    <section ref={ref} className="space-y-8">
      <div
        className={`bg-bumn-gradient-white-4 border border-bumnslate-10 rounded-2xl shadow-bumn-2 p-6 md:p-8 space-y-6 transition-all duration-[800ms] ease-out ${anim}`}
      >
        <h3 className="text-lg font-semibold text-bumnblue-1">
          {title}
        </h3>

        <div
          className="text-sm text-bumnslate-8 leading-relaxed [&_p]:my-2 [&_ul]:my-2 [&_ol]:my-2"
          dangerouslySetInnerHTML={{ __html: description }}
        />

        <div className="flex flex-wrap gap-6 pt-2">
          <div className="space-y-1">
            <span className="block text-xs text-bumnslate-8">
              Capacity
            </span>
            <span className="text-sm font-medium text-bumnslate-6">
              {capacity} People
            </span>
          </div>

          <div className="space-y-1">
            <span className="block text-xs text-bumnslate-8">
              Floor
            </span>
            <span className="text-sm font-medium text-bumnslate-6">
              Floor {floor}
            </span>
          </div>
        </div>
      </div>

      {facilities.length > 0 && (
        <div
          style={{ transitionDelay: "120ms" }}
          className={`bg-bumn-gradient-white-4 rounded-2xl shadow-bumn-2 p-6 md:p-8 space-y-4 border border-bumnslate-10 transition-all duration-[800ms] ease-out ${anim}`}
        >
          <h4 className="text-sm font-semibold text-bumnblue-1">
            Facilities
          </h4>

          <ul className="flex flex-wrap gap-3">
            {facilities.map((item) => (
              <li
                key={item}
                className="inline-block text-xs font-medium px-3 py-1 rounded-full bg-bumncyan-1 text-bumnblue-2"
              >
                {item}
              </li>
            ))}
          </ul>
        </div>
      )}
    </section>
  );
}