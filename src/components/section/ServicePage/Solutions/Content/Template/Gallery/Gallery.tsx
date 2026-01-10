"use client";

import * as React from "react";
import GalleryTrack from "./GalleryTrack";

type GalleryItem = {
  id: string;
  src: string;
  alt?: string;
  title?: string;
  caption?: string;
};

type Props = {
  items: GalleryItem[];
};

export default function ServiceGallery({ items }: Props) {
  const [active, setActive] = React.useState(0);

  if (!items || !items.length) return null;

  const prev = () => {
    setActive((p) => (p === 0 ? items.length - 1 : p - 1));
  };

  const next = () => {
    setActive((p) => (p === items.length - 1 ? 0 : p + 1));
  };

  return (
    <div
      className="relative w-full"
      role="region"
      aria-roledescription="carousel"
    >
      <div className="overflow-hidden">
        <GalleryTrack items={items} activeIndex={active} />
      </div>

      {/* controls */}
      <div className="absolute right-[3rem] -top-[2.1rem] lg:-top-[2.3rem]">
        <button
          onClick={prev}
          aria-label="Previous slide"
          className="absolute -left-12 top-1/2 -translate-y-1/2
            bg-bumn-gradient-primary-7 text-white rounded-xl
            w-[42px] h-[42px] flex items-center justify-center"
        >
          ‹
        </button>

        <button
          onClick={next}
          aria-label="Next slide"
          className="absolute -right-12 top-1/2 -translate-y-1/2
            bg-bumn-gradient-primary-7 text-white rounded-xl
            w-[42px] h-[42px] flex items-center justify-center"
        >
          ›
        </button>
      </div>
    </div>
  );
}
