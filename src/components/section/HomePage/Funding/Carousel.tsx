"use client";

import useEmblaCarousel from "embla-carousel-react";
import type { EmblaOptionsType } from "embla-carousel";
import { useCallback, useEffect, useRef } from "react";
import FundingCard from "./FundingCard";

type FundingItem = { code: string; description: string; iconSrc: string; iconAlt?: string };

export default function Carousel({ items }: { items: FundingItem[] }) {
  const options: EmblaOptionsType = { align: "start", dragFree: true, containScroll: "trimSnaps", direction: "ltr" };
  const [emblaRef, emblaApi] = useEmblaCarousel(options);

  const railRef = useRef<HTMLDivElement | null>(null);
  const knobRef = useRef<HTMLDivElement | null>(null);

  const updateKnob = useCallback(() => {
    if (!emblaApi || !railRef.current || !knobRef.current) return;
    const progress = Math.min(1, Math.max(0, emblaApi.scrollProgress()));
    const railW = railRef.current.clientWidth;
    const knobW = knobRef.current.getBoundingClientRect().width || 0;
    knobRef.current.style.transform = `translateX(${progress * Math.max(0, railW - knobW)}px)`;
  }, [emblaApi]);

  useEffect(() => {
    if (!emblaApi) return;
    updateKnob();
    emblaApi.on("scroll", updateKnob);
    emblaApi.on("reInit", updateKnob);
  }, [emblaApi, updateKnob]);

  useEffect(() => {
    if (!railRef.current) return;
    const ro = new ResizeObserver(() => updateKnob());
    ro.observe(railRef.current);
    if (knobRef.current) ro.observe(knobRef.current);
    return () => ro.disconnect();
  }, [updateKnob]);

  return (
    <div className="relative">
      <div
        ref={emblaRef}
        className="overflow-hidden select-none mask-fade-x-24"
        role="region"
        aria-roledescription="carousel"
        aria-label="Funding"
      >
        <div className="flex gap-4 pr-6 md:pr-8 lg:pr-8">
          {items.map((it) => (
            <div key={it.code} className="flex-none w-[355px]">
              <FundingCard
                code={it.code}
                description={it.description}
                iconSrc={it.iconSrc}
                alt={it.iconAlt ?? `${it.code}-icon`}
              />
            </div>
          ))}
        </div>
      </div>

      <div className="mt-3">
        <div ref={railRef} className="relative h-1 w-full rounded-full bg-white/25" role="presentation">
          <div
            ref={knobRef}
            className="absolute top-0 left-0 h-1 w-40 rounded-full bg-white will-change-transform transition-transform duration-150 ease-out"
            style={{ transform: "translateX(0px)" }}
          />
        </div>
      </div>
    </div>
  );
}