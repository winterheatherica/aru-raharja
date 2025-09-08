"use client";

import Image from "next/image";

type Props = {
  title: string;
  src: string;
  alt: string;
};

export default function PromoSlide({ title, src, alt }: Props) {
  return (
    <div
      role="group"
      aria-roledescription="slide"
      className="min-w-0 shrink-0 grow-0 basis-full pl-4 w-full h-full"
    >
      <div className="block relative h-full">
        <Image
          src={src}
          alt={alt}
          fill
          priority={false}
          className="object-cover rounded-xl"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 100vw, 100vw"
        />
        <div className="absolute flex items-center space-x-2 bottom-5 left-8 lg:bottom-6 lg:left-8">
          <span className="block w-6 h-[2px] bg-white" />
          <p className="text-base font-bold uppercase text-white">{title}</p>
        </div>
      </div>
    </div>
  );
}
