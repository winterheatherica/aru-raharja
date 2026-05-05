"use client";

import useRevealOnScroll from "@/components/general/Motion/useRevealOnScroll";
import * as React from "react";

type Props = {
  columns: any[];
  compact?: boolean;
};

export default function MatrixHeader({ columns, compact = false }: Props) {
  const { ref, visible } = useRevealOnScroll<HTMLTableSectionElement>();
  const [hasShown, setHasShown] = React.useState(false);

  React.useEffect(() => {
    if (visible) setHasShown(true);
  }, [visible]);

  const anim = hasShown
    ? "opacity-100 translate-y-0"
    : "opacity-0 translate-y-10";

  return (
    <thead
      ref={ref}
      className={`transition-all duration-[800ms] ease-out ${anim}`}
    >
      <tr className="text-center">
        <th className="w-[20%]" />
        {columns.map((col) => (
          <th key={col.id} className={compact ? "px-0 bg-bumn-gradient" : "px-2 bg-bumn-gradient"}>
            <div
              className={`${compact ? "px-2 py-1.5 text-xs" : "px-4 py-3 text-sm"} font-semibold ${
                compact ? "rounded-none" : "rounded-2xl"
              } ${
                col.popular
                  ? "bg-bumn-gradient-primary-11 text-white shadow-bumn-2"
                  : "bg-white border border-bumnblue-5 text-bumnblue-1"
              }`}
            >
              {col.label}
            </div>
          </th>
        ))}
      </tr>
    </thead>
  );
}