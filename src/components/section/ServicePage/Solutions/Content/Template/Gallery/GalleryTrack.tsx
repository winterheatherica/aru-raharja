"use client";

import GalleryItem from "./GalleryItem";

type Props = {
  items: any[];
  phase: "idle" | "anim";
  direction: "prev" | "next" | null;
  offset: number;
};

const ITEM_SHIFT = 195;

export default function GalleryTrack({
  items,
  phase,
  direction,
  offset,
}: Props) {
  const BASE_OFFSET = -ITEM_SHIFT;

  return (
    <div
      className="flex transition-transform duration-300 ease-in-out"
      style={{
        transform: `translate3d(${BASE_OFFSET + offset}px,0,0)`,
      }}
    >
      {items.map((item, i) => (
        <GalleryItem
          key={`${item.id}-${i}`}
          item={item}
          index={i}
          phase={phase}
          direction={direction}
        />
      ))}
    </div>
  );
}
