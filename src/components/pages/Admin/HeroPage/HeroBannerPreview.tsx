"use client";

import AdminHeroOverlay from "./AdminHeroOverlay";

type Props = {
  imageSrc?: string;
  alt?: string;
  title?: string;
  description?: string;
  banner?: string;
  emptyText: string;
  width?: number;
  height?: number;
  className?: string;
};

export default function HeroBannerPreview({
  imageSrc,
  alt,
  title,
  description,
  banner,
  emptyText,
  width = 960,
  height = 450,
  className = "",
}: Props) {
  return (
    <div
      className={[
        "overflow-hidden rounded-xl border border-bumnslate-10 bg-black relative",
        className,
      ].join(" ")}
      style={{
        width: "100%",
        maxWidth: `${width}px`,
        aspectRatio: `${width} / ${height}`,
      }}
    >
      {imageSrc ? (
        <img src={imageSrc} alt={alt || "hero-preview"} className="h-full w-full object-cover" />
      ) : (
        <div className="h-full w-full grid place-items-center text-sm text-bumnslate-4 bg-bumngray-2">{emptyText}</div>
      )}

      {imageSrc ? (
        <AdminHeroOverlay
          title={title}
          description={description}
          banner={banner}
          width={width}
        />
      ) : null}
    </div>
  );
}
