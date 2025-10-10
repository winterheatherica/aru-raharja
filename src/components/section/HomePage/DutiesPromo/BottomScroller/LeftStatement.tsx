"use client";

import MaskOverlay from "./MaskOverlay";
import BottomScroller from "./BottomScroller";

type Card = { title: string; subtitle: string; iconSrc: string; alt?: string };

type Props = {
  title: string;
  descPrefix: string;
  laws: ReadonlyArray<string>;
  cards: Card[];
};

export default function LeftStatement({ title, descPrefix, laws, cards }: Props) {
  return (
    <div
      className="
        lg:col-span-3 relative rounded-xl
        px-6 sm:px-12 pt-2 sm:pt-3 lg:pt-4
        text-white bg-bumn-radial-1
        h-[600px] sm:h-[580px] md:h-[540px] lg:h-[680px] xl:h-[640px]
        overflow-hidden
      "
    >
      <div
        className="
          relative z-10 flex flex-col items-center text-center justify-center
          min-h-[calc(100%-20rem)]
          sm:min-h-[calc(100%-230px)]
          lg:min-h-[calc(100%-240px)]
          gap-2 sm:gap-3 lg:gap-4
        "
      >
        <h2 className="text-3xl sm:text-3xl md:text-4xl lg:text-5xl font-bold capitalize font-inter lg:leading-[54px]">
          {title}
        </h2>
        <p className="font-sans text-lg font-normal sm:text-xl lg:text-2xl lg:leading-9">
          {descPrefix}{" "}
          {laws.map((law, i) => (
            <span key={law}>
              <b>{law}</b>
              {i < laws.length - 2 ? ", " : i === laws.length - 2 ? " dan " : ""}
            </span>
          ))}
        </p>
      </div>

      <BottomScroller cards={cards} />
      <MaskOverlay />
    </div>
  );
}
