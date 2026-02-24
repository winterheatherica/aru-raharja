"use client";

import * as React from "react";
import GalleryTrack from "./GalleryTrack";
import { useBreakpoint } from "./useBreakpoint";

type Item = {
  id: string;
  src: string;
};

type Props = {
  items: Item[];
};

export default function Gallery({ items }: Props) {
  const { isMobile, isTablet, isDesktop } = useBreakpoint();
  const isTabletSmall =
    isTablet && typeof window !== "undefined" && window.innerWidth < 1024;

  const mode = isMobile ? "mobile" : isTablet ? "tablet" : "desktop";

  const [start, setStart] = React.useState(0);
  const [phase, setPhase] = React.useState<"idle" | "anim">("idle");
  const [direction, setDirection] =
    React.useState<"prev" | "next" | null>(null);
  const [offset, setOffset] = React.useState(0);

  const total = items.length;
  const SHIFT = 195;

  const visible = React.useMemo(() => {
    if (!total) return [];

    if (isMobile) {
      return [items[start]];
    }

    if (isTablet) {
      const count = isTabletSmall ? 2 : 3;
      return Array.from({ length: count }, (_, i) => {
        return items[(start + i) % total];
      });
    }

    return Array.from({ length: 7 }, (_, i) => {
      const relative = i - 3;
      const index = (start + relative + total) % total;
      return items[index];
    });
  }, [start, items, total, isMobile, isTablet, isTabletSmall]);

  if (!total) return null;

  const run = (dir: "prev" | "next") => {
    if (isDesktop) {
      if (phase !== "idle") return;

      setDirection(dir);
      setPhase("anim");
      setOffset(dir === "next" ? -SHIFT : SHIFT);

      setTimeout(() => {
        setStart((s) =>
          dir === "next" ? (s + 1) % total : (s - 1 + total) % total
        );
        setOffset(0);
        setPhase("idle");
        setDirection(null);
      }, 300);

      return;
    }

    setStart((s) => (dir === "next" ? (s + 1) % total : (s - 1 + total) % total));
  };

  return (
    <div className="w-full flex flex-col gap-4">
      <div className="flex justify-end gap-3 pr-6">
        <button
          onClick={() => run("prev")}
          className="inline-flex items-center justify-center rounded-xl w-[42px] h-[42px] bg-bumn-gradient-primary-7 text-white disabled:opacity-50"
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
          onClick={() => run("next")}
          className="inline-flex items-center justify-center rounded-xl w-[42px] h-[42px] bg-bumn-gradient-primary-7 text-white disabled:opacity-50"
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

      <div className="overflow-hidden">
        <GalleryTrack
          items={visible}
          phase={phase}
          direction={direction}
          offset={offset}
          mode={mode}
        />
      </div>
    </div>
  );
}
