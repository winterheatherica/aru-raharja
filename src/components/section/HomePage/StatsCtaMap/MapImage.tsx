"use client";

import Image from "next/image";

export default function MapImage({ src, alt = "map" }: { src: string; alt?: string }) {
  return (
    <Image
      src={src}
      alt={alt}
      width={834}
      height={350}
      className="object-cover w-full"
      priority={false}
    />
  );
}
