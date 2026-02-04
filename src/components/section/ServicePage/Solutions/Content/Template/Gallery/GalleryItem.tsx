"use client";

import Image from "next/image";
import clsx from "clsx";

type Mode = "mobile" | "tablet" | "desktop";

type Props = {
  item: any;
  index: number;
  phase: "idle" | "anim";
  direction: "prev" | "next" | null;
  mode: Mode;
};

export default function GalleryItem({
  item,
  index,
  phase,
  direction,
  mode,
}: Props) {
  if (mode === "mobile") {
    return (
      <div className="w-full flex-shrink-0 h-[430px]">
        <div className="h-full rounded-2xl overflow-hidden shadow bg-bumn-gradient-primary-7">
          <div className="relative w-full h-full p-6">
            <Image
              src={item.src}
              alt=""
              fill
              className="object-cover rounded-2xl"
            />
          </div>
        </div>
      </div>
    );
  }

  if (mode === "tablet") {
    return (
      <div className="w-1/2 lg:w-1/3 flex-shrink-0 h-[430px] pl-4">
        <div className="h-full rounded-2xl overflow-hidden shadow bg-bumn-gradient-primary-7">
          <div className="relative w-full h-full p-6">
            <Image
              src={item.src}
              alt=""
              fill
              className="object-cover rounded-2xl"
            />
          </div>
        </div>
      </div>
    );
  }

  const CENTER = 3;
  const PREV = 2;
  const NEXT = 4;

  const isCurrent = index === CENTER;
  const isPrev = index === PREV;
  const isNext = index === NEXT;

  const grow =
    phase === "anim" &&
    ((direction === "next" && isNext) ||
      (direction === "prev" && isPrev));

  const shrink = phase === "anim" && isCurrent;

  return (
    <div
      className={clsx(
        "pl-4 relative flex-shrink-0 h-[430px]",
        "transition-[flex-basis] duration-300 ease-in-out",
        isCurrent && !shrink && "basis-[40%]",
        shrink && "basis-[15%]",
        grow && "basis-[40%]",
        !isCurrent && !grow && "basis-[15%]"
      )}
    >
      <div className="h-full rounded-2xl overflow-hidden shadow bg-bumn-gradient-primary-7">
        <div className="relative w-full h-full p-6">
          <Image
            src={item.src}
            alt=""
            fill
            className="object-cover rounded-2xl"
          />
        </div>
      </div>
    </div>
  );
}
