"use client";

import Image from "next/image";
import PartnersCard from "./PartnersCard";
import type { Partner } from "./Partners";

export default function PartnerItem({ data, variant }: { data: Partner; variant: "desktop" | "mobile" }) {
  const imageBox =
    variant === "desktop" ? "relative w-24 h-24" : "relative w-[200px] h-[200px]";

  const titleClass =
    variant === "desktop"
      ? "text-[0.75rem] lg:text-[0.875rem] leading-[1.2rem] lg:leading-[1.4rem] line-clamp-2"
      : "font-semibold";

  return (
    <PartnersCard size={variant}>
      <span className={imageBox}>
        <Image
          src={data.src}
          alt={data.alt}
          fill
          sizes={variant === "desktop" ? "96px" : "200px"}
          className="object-contain"
          priority={false}
        />
      </span>

      <p className={titleClass}>{data.title}</p>
    </PartnersCard>
  );
}
