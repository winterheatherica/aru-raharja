"use client";

import ScrollerCard from "./ScrollerCard";

type Card = { title: string; subtitle: string; iconSrc: string; alt?: string };

type Props = {
  cards: Card[];
};

export default function BottomScroller({ cards }: Props) {
  return (
    <div className="absolute w-[calc(100%-10px)] lg:w-[calc(100%-320px)] left-5 sm:left-10 bottom-[42%] sm:bottom-[58%] md:bottom-[59%] lg:bottom-10 xl:bottom-16">
      <div className="relative w-full" role="region" aria-roledescription="carousel">
        <div className="overflow-hidden">
          <div className="flex -ml-4">
            {cards.map((c, i) => (
              <div
                key={i}
                role="group"
                aria-roledescription="slide"
                className="min-w-0 pl-4 flex-shrink-0 flex-none w-[355px]"
              >
                <ScrollerCard {...c} />
              </div>
            ))}
            <div
              role="group"
              aria-roledescription="slide"
              className="min-w-0 pl-4 flex-shrink-0 flex-none w-[120px]"
            />
          </div>
        </div>

        <div className="absolute left-2 -bottom-6">
          <div className="h-1 rounded bg-white/40 w-60">
            <div className="h-1 rounded bg-white/80" style={{ width: "0%" }} />
          </div>
        </div>
      </div>
    </div>
  );
}
