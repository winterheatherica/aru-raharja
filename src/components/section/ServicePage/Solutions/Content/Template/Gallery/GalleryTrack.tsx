"use client";

import GalleryItem from "./GalleryItem";

type Mode = "mobile" | "tablet" | "desktop";

type Props = {
  items: any[];
  phase: "idle" | "anim";
  direction: "prev" | "next" | null;
  offset: number;
  mode: Mode;
};

const ITEM_SHIFT = 195;

export default function GalleryTrack({
  items,
  phase,
  direction,
  offset,
  mode,
}: Props) {
  const BASE_OFFSET = -ITEM_SHIFT;

  return (
    <div
      className="flex w-full will-change-transform"
      style={
        mode === "desktop"
          ? {
              transform: `translate3d(${BASE_OFFSET + offset}px,0,0)`,
              transition:
                phase === "anim"
                  ? "transform 300ms cubic-bezier(0.22, 1, 0.36, 1)"
                  : "none",
            }
          : {}
      }
    >
      {items.map((item, i) => (
        <GalleryItem
          key={`${item.id}-${i}`}
          item={item}
          index={i}
          phase={mode === "desktop" ? phase : "idle"}
          direction={mode === "desktop" ? direction : null}
          mode={mode}
        />
      ))}
    </div>
  );
}
