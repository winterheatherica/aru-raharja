"use client";

import { useEffect, useRef, useCallback } from "react";
import PartnerItem from "./PartnerItem";
import type { Partner } from "./Partners";

export default function PartnersCarousel({ items }: { items: Partner[] }) {
  const scrollRef = useRef<HTMLDivElement | null>(null);
  const railRef = useRef<HTMLDivElement | null>(null);
  const knobRef = useRef<HTMLDivElement | null>(null);

  const updateKnob = useCallback(() => {
    if (!scrollRef.current || !railRef.current || !knobRef.current) return;

    const scrollEl = scrollRef.current;
    const railW = railRef.current.clientWidth;
    const knobW = knobRef.current.getBoundingClientRect().width || 0;
    const maxScroll = scrollEl.scrollWidth - scrollEl.clientWidth;
    const scrollLeft = scrollEl.scrollLeft;

    const progress = maxScroll > 0 ? scrollLeft / maxScroll : 0;
    knobRef.current.style.transform = `translateX(${progress * Math.max(0, railW - knobW)}px)`;
  }, []);

  useEffect(() => {
    const scrollEl = scrollRef.current;
    if (!scrollEl) return;

    scrollEl.addEventListener("scroll", updateKnob, { passive: true });
    const ro = new ResizeObserver(() => updateKnob());
    ro.observe(scrollEl);
    if (railRef.current) ro.observe(railRef.current);
    if (knobRef.current) ro.observe(knobRef.current);

    return () => {
      scrollEl.removeEventListener("scroll", updateKnob);
      ro.disconnect();
    };
  }, [updateKnob]);

  return (
    <div className="md:hidden">
      <div
        ref={scrollRef}
        className="snap snap-x snap-mandatory flex h-56 w-[90vw] gap-5 overflow-x-scroll scrollbar-hide"
      >
        {items.map((it) => (
          <div key={it.title} className="snap-center snap-always">
            <PartnerItem data={it} variant="mobile" />
          </div>
        ))}
      </div>

      <div className="mt-3 px-3">
        <div
          ref={railRef}
          className="relative h-1 w-full rounded-full bg-white/25"
        >
          <div
            ref={knobRef}
            className="absolute top-0 left-0 h-1 w-32 rounded-full bg-white transition-transform duration-150 ease-out"
          />
        </div>
      </div>
    </div>
  );
}
