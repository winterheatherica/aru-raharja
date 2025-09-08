"use client";

import useEmblaCarousel from "embla-carousel-react";
import type { EmblaOptionsType } from "embla-carousel";
import { useCallback, useEffect, useRef } from "react";
import ScrollerCard from "./ScrollerCard";

type Card = { title: string; subtitle: string; iconSrc: string; alt?: string };
type Props = { cards: Card[] };

export default function BottomScroller({ cards }: Props) {
  const options: EmblaOptionsType = {
    align: "start",
    dragFree: true,
    containScroll: "trimSnaps",
    direction: "ltr",
  };

  const [emblaRef, emblaApi] = useEmblaCarousel(options);

  const railRef = useRef<HTMLDivElement | null>(null);
  const knobRef = useRef<HTMLDivElement | null>(null);

  const updateKnob = useCallback(() => {
    const api = emblaApi;
    const rail = railRef.current;
    const knob = knobRef.current;
    if (!api || !rail || !knob) return;

    const progress = Math.min(1, Math.max(0, api.scrollProgress())); // 0..1
    const railW = rail.clientWidth;
    const knobW = knob.getBoundingClientRect().width || 0;
    const travel = Math.max(0, railW - knobW);
    const x = progress * travel;

    knob.style.transform = `translateX(${x}px)`;
  }, [emblaApi]);

  useEffect(() => {
    if (!emblaApi) return;
    updateKnob(); // init
    emblaApi.on("scroll", updateKnob);
    emblaApi.on("reInit", updateKnob);
  }, [emblaApi, updateKnob]);

  useEffect(() => {
    const rail = railRef.current;
    const knob = knobRef.current;
    if (!rail) return;

    const ro = new ResizeObserver(() => updateKnob());
    ro.observe(rail);
    if (knob) ro.observe(knob);

    return () => ro.disconnect();
  }, [updateKnob]);

  return (
    <div className="absolute inset-x-6 bottom-6 z-10">
      <div className="relative">
        <div
          ref={emblaRef}
          className="overflow-hidden select-none mask-fade-x-24"
          role="region"
          aria-roledescription="carousel"
          aria-label="Protections"
        >
          <div className="flex gap-4">
            {cards.map((c, i) => (
              <div key={i} className="flex-none w-[355px]">
                <ScrollerCard {...c} />
              </div>
            ))}
            <div className="flex-none w-6" />
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
    </div>
  );
}
