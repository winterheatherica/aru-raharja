"use client";

import { CSSProperties } from "react";

type HeroIndicatorsProps = {
  count?: number;
  activeIndex?: number;
  onJump?: (index: number) => void;
  thickness?: number | string;
  inactiveLen?: number | string;
  activeLen?: number | string;
  gap?: number | string;
  className?: string;
};

function toLen(v?: number | string, fallback?: string) {
  if (v === undefined || v === null) return fallback;
  return typeof v === "number" ? `${v}px` : v;
}

export default function HeroIndicators({
  count = 4,
  activeIndex = 0,
  onJump,
  thickness,
  inactiveLen,
  activeLen,
  gap,
  className,
}: HeroIndicatorsProps) {
  const styleVars: CSSProperties = {
    ["--hi-thickness" as any]: toLen(thickness, "clamp(3px, 0.5vw, 8px)"),
    ["--hi-inactive" as any]: toLen(inactiveLen, "clamp(18px, 4vw, 56px)"),
    ["--hi-active" as any]: toLen(activeLen, "clamp(32px, 7vw, 92px)"),
    ["--hi-gap" as any]: toLen(gap, "clamp(6px, 1.4vw, 14px)"),
  };

  return (
    <div
      className={["flex justify-center rotate-180", className].filter(Boolean).join(" ")}
      style={styleVars}
    >
      <div className="flex h-full lg:h-auto flex-col items-center gap-[var(--hi-gap)]">
        {Array.from({ length: Math.max(0, count) }).map((_, i) => {
          const isActive = i === (activeIndex ?? 0);
          return (
            <button
              key={i}
              aria-label={`Go to slide ${i + 1}`}
              aria-current={isActive ? "true" : undefined}
              onClick={() => onJump?.(i)}
              type="button"
              className={[
                "inline-flex items-center justify-center rounded-none p-0 transition-colors outline-none",
                "w-[var(--hi-thickness)]",
                isActive ? "flex-[1.6]" : "flex-1",
                isActive ? "lg:h-[var(--hi-active)] lg:flex-none" : "lg:h-[var(--hi-inactive)] lg:flex-none",
                isActive ? "bg-white" : "bg-white/45 hover:bg-white focus:bg-white/80",
                "focus:ring-2 focus:ring-white/70",
              ].join(" ")}
            />
          );
        })}
      </div>
    </div>
  );
}
