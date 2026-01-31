"use client";

import Image from "next/image";
import clsx from "clsx";

type Props = {
  item: any;
  index: number;
  phase: "idle" | "anim";
  direction: "prev" | "next" | null;
};

export default function GalleryItem({
  item,
  index,
  phase,
  direction,
}: Props) {
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
