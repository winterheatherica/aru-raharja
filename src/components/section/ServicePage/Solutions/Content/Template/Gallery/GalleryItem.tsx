"use client";

import Image from "next/image";

type Item = {
  id: string;
  src: string;
  alt?: string;
  title?: string;
  caption?: string;
};

type Props = {
  item: Item;
  active: boolean;
};

export default function GalleryItem({ item, active }: Props) {
  return (
    <div
      role="group"
      aria-roledescription="slide"
      className={[
        "pl-4 relative flex-shrink-0 h-[430px]",
        "transition-all duration-300",
        active
          ? "basis-[75%] lg:basis-[40%] expand-item"
          : "basis-1/3 lg:basis-[15%] shrink-item",
      ].join(" ")}
    >
      <div className="h-full rounded-2xl overflow-hidden shadow border-none">
        <div className="relative w-full h-full p-6">
          <Image
            src={item.src}
            alt={item.alt || item.title || "Gallery"}
            fill
            className={[
              "object-cover rounded-2xl transition-all",
              active ? "grayscale-0" : "grayscale",
            ].join(" ")}
          />

          {/* overlay */}
          <div
            className={[
              "absolute inset-0 rounded-2xl transition-opacity duration-300",
              "bg-gradient-to-tr from-bumnblue-2/40 to-transparent",
              active ? "opacity-60" : "opacity-0",
            ].join(" ")}
          />

          {/* caption */}
          {active && (item.title || item.caption) && (
            <div className="absolute bottom-4 left-4 right-4 text-white">
              {item.title && (
                <h4 className="text-lg font-semibold">
                  {item.title}
                </h4>
              )}
              {item.caption && (
                <p className="text-sm opacity-90">
                  {item.caption}
                </p>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
