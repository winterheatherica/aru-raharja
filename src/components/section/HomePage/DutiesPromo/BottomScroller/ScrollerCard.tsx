"use client";

import Image from "next/image";

type Props = {
  title: string;
  subtitle: string;
  iconSrc: string;
  alt?: string;
};

export default function ScrollerCard({ title, subtitle, iconSrc, alt }: Props) {
  return (
    <div className="p-1">
      <div className="border text-card-foreground shadow min-h-[238px] rounded-lg bg-white/10 border-white/10 backdrop-blur-[30.4px]">
        <div className="flex flex-col items-center justify-center p-4 space-y-4">
          <div className="relative w-[78px] h-[78px] flex items-center justify-center bg-bumn rounded-full">
            <Image
              src={iconSrc}
              alt={alt || "icon"}
              fill
              className="bg-cover"
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 100vw, 100vw"
            />
          </div>
          <div className="space-y-1 text-center text-white">
            <p className="text-xl font-bold">{title}</p>
            <p className="text-base font-normal leading-6 font-sans max-w-[310px]">
              {subtitle}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
