"use client";

import * as React from "react";
import CertificationCard from "./CertificationCard";
import useRevealOnScroll from "@/components/general/Motion/useRevealOnScroll";

type Props = {
  items: any[];
};

export default function Certifications({ items }: Props) {
  if (!items.length) return null;

  const { ref, visible } = useRevealOnScroll<HTMLDivElement>();
  const [hasShown, setHasShown] = React.useState(false);

  React.useEffect(() => {
    if (visible) setHasShown(true);
  }, [visible]);

  const headerAnim = hasShown
    ? "opacity-100 translate-x-0"
    : "opacity-0 -translate-x-10";

  return (
    <section className="space-y-6">
      <div
        ref={ref}
        className={`text-center max-w-2xl mx-auto transition-all duration-[800ms] ease-out ${headerAnim}`}
      >
        <h3 className="text-2xl font-semibold text-bumnblue-1">
          Certifications & Compliance
        </h3>
        <p className="mt-2 text-sm text-bumnslate-8">
          Certifications that ensure service quality, compliance, and reliability.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {items.map((item, i) => (
          <CertificationCard
            key={item.id}
            item={item}
            index={i}
            visible={hasShown}
          />
        ))}
      </div>
    </section>
  );
}