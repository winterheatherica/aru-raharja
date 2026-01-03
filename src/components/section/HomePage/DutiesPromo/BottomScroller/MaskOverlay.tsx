"use client";
import Image from "next/image";

export default function MaskOverlay() {
  return (
    <div className="absolute inset-0 pointer-events-none hidden md:block z-0">
      <Image
        src="/images/general/masking/aru-mask-1-white.png"
        alt=""
        fill
        priority
        className="object-cover object-bottom opacity-75 select-none"
      />
    </div>
  );
}
