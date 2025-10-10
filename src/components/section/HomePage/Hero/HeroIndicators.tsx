"use client";

import { CSSProperties } from "react";

type HeroIndicatorsProps = {
  count?: number;
  activeIndex?: number;
  onJump?: (index: number) => void;
  thickness?: number | string;
  thicknessSm?: number | string;
  inactiveLen?: number | string;
  activeLen?: number | string;
  inactiveLenSm?: number | string;
  activeLenSm?: number | string;
  gap?: number | string;
  className?: string;
};

function toLen(v?: number | string, fallback?: string) {
  if (v === undefined || v === null) return fallback!;
  return typeof v === "number" ? `${v}px` : v;
}

export default function HeroIndicators({
  count = 4,
  activeIndex = 0,
  onJump,
  thickness = 5,
  thicknessSm = 2,
  inactiveLen = 30,
  activeLen = 50,
  inactiveLenSm = 47,
  activeLenSm = 80,
  gap = 12,
  className,
}: HeroIndicatorsProps) {
  const styleVars: CSSProperties = {
    ["--hi-thickness" as any]: toLen(thickness, "5px"),
    ["--hi-thickness-sm" as any]: toLen(thicknessSm, "3px"),
    ["--hi-gap" as any]: toLen(gap, "12px"),
    ["--hi-inactive" as any]: toLen(inactiveLen, "30px"),
    ["--hi-active" as any]: toLen(activeLen, "50px"),
    ["--hi-inactive-sm" as any]: toLen(inactiveLenSm, "47px"),
    ["--hi-active-sm" as any]: toLen(activeLenSm, "80px"),
  };

  return (
    <div
      className={["flex justify-center rotate-180", className].filter(Boolean).join(" ")}
      style={styleVars}
    >
      <div className="flex h-full flex-col items-center gap-[var(--hi-gap)]">
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
                "w-[var(--hi-thickness-sm)] sm:w-[var(--hi-thickness)]", // responsive thickness
                isActive
                  ? "h-[var(--hi-active)] sm:h-[var(--hi-active-sm)]"
                  : "h-[var(--hi-inactive)] sm:h-[var(--hi-inactive-sm)]",
                isActive ? "bg-white" : "bg-white/45 hover:bg-white",
              ].join(" ")}
            />
          );
        })}
      </div>
    </div>
  );
}
