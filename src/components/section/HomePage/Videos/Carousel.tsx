"use client";

import useEmblaCarousel from "embla-carousel-react";
import type { EmblaOptionsType } from "embla-carousel";
import { useCallback, useEffect, useState } from "react";
import { useParams } from "next/navigation";
import type { Locale } from "@/i18n/get_dictionary";
import VideoCard from "./VideoCard";
import LoadMoreTile from "./LoadMoreTile";
import type { VideoItem } from "./data";

export default function Carousel({
  items,
  readMoreLabel,
  loadMoreLabel,
}: {
  items: VideoItem[];
  readMoreLabel: string;
  loadMoreLabel: string;
}) {
  const options: EmblaOptionsType = {
    align: "start",
    containScroll: "trimSnaps",
    direction: "ltr",
    loop: false,
  };

  const [emblaRef, emblaApi] = useEmblaCarousel(options);
  const [prevDisabled, setPrevDisabled] = useState(true);
  const [nextDisabled, setNextDisabled] = useState(true);

  const params = useParams<{ locale: Locale }>();
  const locale = params?.locale ?? "id";

  const onSelect = useCallback(() => {
    if (!emblaApi) return;
    setPrevDisabled(!emblaApi.canScrollPrev());
    setNextDisabled(!emblaApi.canScrollNext());
  }, [emblaApi]);

  const scrollPrev = useCallback(() => emblaApi && emblaApi.scrollPrev(), [emblaApi]);
  const scrollNext = useCallback(() => emblaApi && emblaApi.scrollNext(), [emblaApi]);

  useEffect(() => {
    if (!emblaApi) return;
    onSelect();
    emblaApi.on("select", onSelect);
    emblaApi.on("reInit", onSelect);
  }, [emblaApi, onSelect]);

  return (
    <div className="relative w-full" role="region" aria-roledescription="carousel">
      <div ref={emblaRef} className="overflow-hidden">
        <div className="flex -ml-4 h-full">
          {items.map((it) => (
            <div
              key={it.id}
              role="group"
              aria-roledescription="slide"
              className="min-w-0 shrink-0 grow-0 basis-full pl-4 pb-10 md:basis-1/2 lg:basis-1/3"
            >
              <VideoCard item={it} readMoreLabel={readMoreLabel} />
            </div>
          ))}

          <div className="min-w-0 shrink-0 grow-0 basis-full pl-4 pb-10 md:basis-1/2 lg:basis-1/3">
            <div className="h-full flex items-center justify-center">
              <LoadMoreTile locale={locale} label={loadMoreLabel} />
            </div>
          </div>
        </div>
      </div>

      <div className="absolute right-[3rem] -top-[2rem] lg:right-[9.275rem] lg:-top-[2.3rem]">
        <button
          onClick={scrollPrev}
          disabled={prevDisabled}
          className="inline-flex items-center justify-center absolute -left-12 top-1/2 -translate-y-1/2 rounded-xl w-[42px] h-[42px] bg-bumn-gradient-primary-11 text-white disabled:opacity-50"
          aria-label="Previous slide"
        >
          <svg width="15" height="15" viewBox="0 0 15 15" fill="none" className="w-4 h-4">
            <path
              d="M6.85355 3.14645C7.04882 3.34171 7.04882 3.65829 6.85355 3.85355L3.70711 7H12.5C12.7761 7 13 7.22386 13 7.5C13 7.77614 12.7761 8 12.5 8H3.70711L6.85355 11.1464C7.04882 11.3417 7.04882 11.6583 6.85355 11.8536C6.65829 12.0488 6.34171 12.0488 6.14645 11.8536L2.14645 7.85355C1.95118 7.65829 1.95118 7.34171 2.14645 7.14645L6.14645 3.14645C6.34171 2.95118 6.65829 2.95118 6.85355 3.14645Z"
              fill="currentColor"
            />
          </svg>
        </button>

        <button
          onClick={scrollNext}
          disabled={nextDisabled}
          className="inline-flex items-center justify-center absolute -right-12 top-1/2 -translate-y-1/2 rounded-xl w-[42px] h-[42px] bg-bumn-gradient-primary-11 text-white disabled:opacity-50"
          aria-label="Next slide"
        >
          <svg width="15" height="15" viewBox="0 0 15 15" fill="none" className="w-4 h-4">
            <path
              d="M8.14645 3.14645C8.34171 2.95118 8.65829 2.95118 8.85355 3.14645L12.8536 7.14645C13.0488 7.34171 13.0488 7.65829 12.8536 7.85355L8.85355 11.8536C8.65829 12.0488 8.34171 12.0488 8.14645 11.8536C7.95118 11.6583 7.95118 11.3417 8.14645 11.1464L11.2929 8H2.5C2.22386 8 2 7.77614 2 7.5C2 7.22386 2.22386 7 2.5 7H11.2929L8.14645 3.85355C7.95118 3.65829 7.95118 3.34171 8.14645 3.14645Z"
              fill="currentColor"
            />
          </svg>
        </button>
      </div>
    </div>
  );
}
