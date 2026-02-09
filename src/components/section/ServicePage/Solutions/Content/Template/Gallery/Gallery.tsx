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
  const isTabletSmall = isTablet && typeof window !== "undefined" && window.innerWidth < 1024;

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
          dir === "next"
            ? (s + 1) % total
            : (s - 1 + total) % total
        );
        setOffset(0);
        setPhase("idle");
        setDirection(null);
      }, 300);

      return;
    }

    setStart((s) =>
      dir === "next"
        ? (s + 1) % total
        : (s - 1 + total) % total
    );
  };

  return (
    <div className="w-full flex flex-col gap-4">
      <div className="flex justify-end gap-3 pr-6">
        <button
          onClick={() => run("prev")}
          className="bg-bumn-gradient-primary-7 text-white
                     w-[42px] h-[42px] rounded-xl
                     flex items-center justify-center"
        >
          ‹
        </button>

        <button
          onClick={() => run("next")}
          className="bg-bumn-gradient-primary-7 text-white
                     w-[42px] h-[42px] rounded-xl
                     flex items-center justify-center"
        >
          ›
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
