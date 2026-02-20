"use client";

import Image from "next/image";

type Props = {
  code: string;
  description: string;
  iconSrc: string;
  alt?: string;
  className?: string;
};

export default function FundingCard({ code, description, iconSrc, alt, className }: Props) {
  return (
    <div
      className={`
        relative z-10
        min-h-[238px] rounded-lg border
      border-white/20
        shadow-md ${className ?? ""}
      `}
    >
      <div className="flex flex-col items-center justify-center p-4 space-y-4">
        <div className="relative w-[78px] h-[78px] flex items-center justify-center rounded-full bg-white/40">
          <Image src={iconSrc} alt={alt || "icon"} fill className="object-contain" sizes="78px" />
        </div>
        <div className="space-y-1 text-center">
          <p className="text-xl font-bold text-white">{code}</p>
          <p className="text-base font-normal leading-6 font-sans text-white/90 max-w-[310px]">
            {description}
          </p>
        </div>
      </div>
    </div>
  );
}
