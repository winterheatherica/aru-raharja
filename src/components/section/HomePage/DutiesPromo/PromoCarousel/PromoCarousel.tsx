"use client";

import { useEffect, useMemo, useState } from "react";
import PromoSlide from "./PromoSlide";

type Slide = { title: string; src: string; alt: string };
type Props = { slides: Slide[]; autoplayMs?: number };

export default function PromoCarousel({ slides, autoplayMs = 0 }: Props) {
  const [active, setActive] = useState(0);
  const count = slides.length;

  useEffect(() => {
    if (!autoplayMs || count <= 1) return;
    const t = setInterval(() => setActive((i) => (i + 1) % count), autoplayMs);
    return () => clearInterval(t);
  }, [autoplayMs, count]);

  const trackStyle = useMemo<React.CSSProperties>(
    () => ({ transform: `translate3d(${-active * 100}%,0,0)` }),
    [active]
  );

  return (
    <div
      className="
        relative text-white lg:col-span-2
        h-[600px] sm:h-[580px] md:h-[540px] lg:h-[680px] xl:h-[640px]
      "
    >
      <div className="relative w-full h-full" role="region" aria-roledescription="carousel">
        <div className="overflow-hidden h-full">
          <div className="flex -ml-4 transition-transform duration-500 h-full" style={trackStyle}>
            {slides.map((s, i) => (
              <PromoSlide key={i} {...s} />
            ))}
          </div>
        </div>
      </div>

      {count > 1 && (
        <div className="absolute inset-x-0 bottom-3 flex items-center justify-center gap-2">
          {slides.map((_, i) => (
            <button
              key={i}
              aria-label={`Go to slide ${i + 1}`}
              onClick={() => setActive(i)}
              className={`h-1 rounded transition-all ${
                i === active ? "w-14 bg-white/80" : "w-8 bg-white/40"
              }`}
            />
          ))}
        </div>
      )}
    </div>
  );
}
