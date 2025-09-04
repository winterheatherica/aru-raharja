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
  title?: string | null;
  ctaLabel?: string | null;
  ctaHref?: string | null;
};

type CarouselProps = {
  slides: HeroSlide[];
  autoplayMs?: number;
  pauseOnHover?: boolean;
  className?: string;
  maskSrc?: string | null;
};

const NAV_OFFSET_PX = 124;

export default function Carousel({
  slides,
  autoplayMs = 5000,
  pauseOnHover = true,
  className = "",
  maskSrc = null,
}: CarouselProps) {
  const [active, setActive] = useState(0);
  const len = Math.max(0, slides.length);


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
        className="relative overflow-hidden h-full hero-viewport"
        onTouchStart={onTouchStart}
        onTouchMove={onTouchMove}
        onTouchEnd={onTouchEnd}
      >
        <HeroMask src={maskSrc ?? null} />


        <div className="flex flex-col will-change-transform h-full" style={trackStyle}>
          {slides.map((s, idx) => {
            const alt = s.alt || `slide-${idx + 1}`;
            const hasCta = s.ctaLabel && s.ctaHref;
            const safeSrc =
              typeof s.src === "string" && s.src.trim() !== "" ? s.src : "/images/hero/placeholder-hero.jpg";

            return (
              <div
                key={idx}
                role="group"
                aria-roledescription="slide"
                className="shrink-0 grow-0"
                style={{ height: `${100 / len}%` }}
              >
                <div className="relative w-full h-full bg-black">
                  <Image
                    src={safeSrc}
                    alt={alt}
                    fill
                    className="object-cover w-full h-full"
                    sizes="100vw"
                    priority={idx === 0}
                  />

                  {(s.title || hasCta) && (
                    <HeroSlideOverlay
                      title={s.title ?? undefined}
                      ctaLabel={s.ctaLabel ?? undefined}
                      ctaHref={s.ctaHref ?? undefined}
                    />
                  )}

                  {!s.title && hasCta ? (
                    <Link aria-label={`Open ${s.ctaLabel}`} href={s.ctaHref!} className="absolute inset-0" />
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

      <style jsx>{`

        .hero-viewport {
          height: calc(100vw * 900 / 1920);
        }

        @media (min-width: 1024px) and (min-aspect-ratio: 16/9) and (max-aspect-ratio: 1920/900) {
          .hero-viewport {
            height: calc(100vh - ${NAV_OFFSET_PX}px);
          }
        }
      `}</style>
    </div>
  );
}
