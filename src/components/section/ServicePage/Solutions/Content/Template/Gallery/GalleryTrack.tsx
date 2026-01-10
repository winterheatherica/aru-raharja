"use client";

import GalleryItem from "./GalleryItem";

type Item = {
  id: string;
  src: string;
  alt?: string;
  title?: string;
  caption?: string;
};

type Props = {
  items: Item[];
  activeIndex: number;
};

export default function GalleryTrack({
  items,
  activeIndex,
}: Props) {
  return (
    <div
      className="flex -ml-4 transition-transform duration-300"
      style={{
        transform: `translate3d(-${
          activeIndex * 180
        }px, 0, 0)`,
      }}
    >
      {items.map((it, i) => (
        <GalleryItem
          key={it.id}
          item={it}
          active={i === activeIndex}
        />
      ))}
    </div>
  );
}
