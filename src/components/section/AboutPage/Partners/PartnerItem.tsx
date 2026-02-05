"use client";

import Image from "next/image";
import PartnersCard from "./PartnersCard";
import type { Partner } from "./Partners";

export default function PartnerItem({
  data,
  variant,
}: {
  data: Partner;
  variant: "desktop" | "mobile";
}) {
  const imageBox =
    variant === "desktop"
      ? "relative w-24 h-24"
      : "relative w-[200px] h-[200px]";

  const titleClass =
    variant === "desktop"
      ? "text-xs lg:text-sm leading-tight lg:leading-snug font-bold line-clamp-2"
      : "text-base font-bold text-center";

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

      <p className={`${titleClass} mt-4`}>
        {data.title}
      </p>
    </PartnersCard>
  );
}
