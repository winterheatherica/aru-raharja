"use client";

import Image from "next/image";

type Props = {
  title: string;
  subtitle: string;
  iconSrc: string;
  alt?: string;
  className?: string;
};

export default function ScrollerCard({ title, subtitle, iconSrc, alt, className }: Props) {
  return (
    <div
      className={`
        border min-h-[238px] rounded-lg
        bg-white/10 border-white/10 backdrop-blur-[30.4px]
        shadow ${className ?? ""}
      `}
    >
      <div className="flex flex-col items-center justify-center p-4 space-y-4">
        <div className="relative w-[78px] h-[78px] flex items-center justify-center rounded-full bg-white/80">
          <Image
            src={iconSrc}
            alt={alt || "icon"}
            fill
            className="object-contain"
            sizes="78px"
          />
        </div>
        <div className="space-y-1 text-center">
          <p className="text-xl font-bold text-white">{title}</p>
          <p className="text-base font-normal leading-6 font-sans text-white/90 max-w-[310px]">
            {subtitle}
          </p>
        </div>
      </div>
    </div>
  );
}
