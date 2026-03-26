"use client";

import TwemojiText from "@/components/section/HomePage/Hero/TwemojiText";

type Props = {
  title?: string;
  description?: string;
  banner?: string;
  width: number;
};

export default function AdminHeroOverlay({ title, description, banner, width }: Props) {
  if (banner !== "TEXT") return null;
  if (!title && !description) return null;

  const isMobile = width <= 480;
  const scale = width / 1920;
  const titleSize = Math.max(12, Math.round(48 * scale));
  const descSize = Math.max(10, Math.round(30 * scale));
  const descMarginTop = Math.max(4, Math.round(8 * scale));

  return (
    <div className="absolute inset-0 z-10 flex items-center justify-start" style={{ paddingLeft: "12%" }}>
      <div style={{ maxWidth: "55%", paddingRight: "3.2%" }}>
        {title ? (
          <h3
            className="font-inter font-bold capitalize text-white text-stroke-sm leading-tight"
            style={{ fontSize: `${titleSize}px` }}
          >
            <TwemojiText text={title} />
          </h3>
        ) : null}

        {!isMobile && description ? (
          <p
            className="font-sans text-white text-stroke-sm leading-relaxed"
            style={{ fontSize: `${descSize}px`, marginTop: `${descMarginTop}px` }}
          >
            <TwemojiText text={description} />
          </p>
        ) : null}
      </div>
    </div>
  );
}
