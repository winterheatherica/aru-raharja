"use client";

import * as React from "react";
import GalleryTrack from "./GalleryTrack";

type Item = {
  id: string;
  src: string;
};

type Props = {
  items: Item[];
};

export default function ServiceGallery({ items }: Props) {
  const [start, setStart] = React.useState(0);
  const [phase, setPhase] = React.useState<"idle" | "anim">("idle");
  const [direction, setDirection] =
    React.useState<"prev" | "next" | null>(null);
  const [offset, setOffset] = React.useState(0);

  const total = items.length;
  if (!total) return null;

  const VISIBLE_COUNT = 7;
  const CENTER = 3;
  const SHIFT = 195;

  const visible = React.useMemo(
    () =>
      Array.from({ length: VISIBLE_COUNT }, (_, i) => {
        const relative = i - CENTER;
        const index = (start + relative + total) % total;
        return items[index];
      }),
    [start, items, total]
  );

  const run = (dir: "prev" | "next") => {
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
        />
      </div>
    </div>
  );
}
