"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import HeroIndicators from "./HeroIndicators";
import HeroSlideOverlay from "./HeroSlideOverlay";
import HeroMask from "./HeroMask";

export type HeroSlide = {
  src: string;
  alt: string;
  title: string;
  ctaLabel?: string | null;
  ctaHref?: string | null;
  banner: string;
};

type CarouselProps = {
  slides: HeroSlide[];
  autoplayMs?: number;
  pauseOnHover?: boolean;
  className?: string;
  maskSrc?: string | null;
};

export default function Carousel({
  slides,
  autoplayMs = 5000,
  pauseOnHover = true,
  className = "",
  maskSrc = null,
}: CarouselProps) {
  const [active, setActive] = useState(0);
  const len = slides.length;

  const timerRef = useRef<number | null>(null);
  const hoveringRef = useRef(false);

  useEffect(() => {
    if (!len) return;

    const tick = () => {
      if (hoveringRef.current && pauseOnHover) return;
      setActive((i) => (i + 1) % len);
    };

    timerRef.current = window.setInterval(tick, autoplayMs);

    return () => {
      if (timerRef.current) window.clearInterval(timerRef.current);
      timerRef.current = null;
    };
  }, [len, autoplayMs, pauseOnHover]);

  const onEnter = () => (hoveringRef.current = true);
  const onLeave = () => (hoveringRef.current = false);

  const startY = useRef<number | null>(null);
  const deltaY = useRef(0);

  const onTouchStart: React.TouchEventHandler<HTMLDivElement> = (e) => {
    startY.current = e.touches[0].clientY;
    deltaY.current = 0;
  };

  const onTouchMove: React.TouchEventHandler<HTMLDivElement> = (e) => {
    if (startY.current == null) return;
    deltaY.current = e.touches[0].clientY - startY.current;
  };

  const onTouchEnd: React.TouchEventHandler<HTMLDivElement> = () => {
    if (startY.current == null) return;
    const threshold = 60;

    if (deltaY.current > threshold) setActive((i) => (i - 1 + len) % len);
    else if (deltaY.current < -threshold) setActive((i) => (i + 1) % len);

    startY.current = null;
    deltaY.current = 0;
  };

  const trackStyle = useMemo<React.CSSProperties>(
    () => ({
      transform: `translate3d(0, ${len ? (-active * 100) / len : 0}%, 0)`,
      transition: "transform 480ms ease",
      height: `${len * 100}%`,
    }),
    [active, len]
  );

  return (
    <div
      className={[
        "relative w-full rounded-2xl overflow-hidden",
        className,
      ].join(" ")}
      role="region"
      aria-roledescription="carousel"
      onMouseEnter={onEnter}
      onMouseLeave={onLeave}
    >
      <div
        className="relative h-auto w-full overflow-hidden aspect-[1920/900] md:aspect-[1920/820]"
        onTouchStart={onTouchStart}
        onTouchMove={onTouchMove}
        onTouchEnd={onTouchEnd}
      >
        <HeroMask src={maskSrc ?? null} />

        <div className="flex h-full w-full flex-col will-change-transform" style={trackStyle}>
          {slides.map((s, idx) => {
            const alt = s.alt || `slide-${idx + 1}`;
            const hasCta = s.ctaLabel && s.ctaHref;
            const showOverlay = Boolean(s.title) && s.banner !== "POLISH";

            return (
              <div
                key={idx}
                role="group"
                aria-roledescription="slide"
                aria-label={`Slide ${idx + 1}: ${s.title ?? alt}`}
                className="shrink-0 grow-0"
                style={{ height: `${100 / len}%` }}
              >
                {idx === 0 && s.title && (
                  <h1 className="sr-only">{s.title}</h1>
                )}

                <div className="relative w-full h-full bg-black">
                  <Image
                    src={s.src}
                    alt={alt}
                    fill
                    className="object-cover w-full h-full object-center"
                    sizes="(min-width: 1920px) 1920px, 100vw"
                    priority={idx === 0}
                  />

                  {showOverlay && (
                    <HeroSlideOverlay
                      title={s.title}
                      ctaLabel={s.ctaLabel ?? undefined}
                      ctaHref={s.ctaHref ?? undefined}
                    />
                  )}

                  {!s.title && hasCta ? (
                    <Link
                      aria-label={`Open ${s.ctaLabel}`}
                      href={s.ctaHref!}
                      className="absolute inset-0"
                    />
                  ) : null}
                </div>
              </div>
            );
          })}
        </div>

        {len > 1 && (
          <div
            className="
              absolute
              left-2 top-2 bottom-2
              sm:left-3 sm:top-6 sm:bottom-6
              md:left-4 md:top-8 md:bottom-8
              lg:left-6 lg:bottom-12 lg:top-auto
              flex h-auto
            "
          >
            <HeroIndicators count={len} activeIndex={active} onJump={setActive} />
          </div>
        )}
      </div>
    </div>
  );
}
