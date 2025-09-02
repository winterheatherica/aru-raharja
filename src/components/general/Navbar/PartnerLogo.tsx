"use client";
import Image from "next/image";

export default function PartnerLogo() {
  return (
    <div className="relative h-[96px] w-[105px]">
      <Image
        src="/navbar/AruLogo.svg"
        alt="Aru Logo"
        fill
        className="object-contain"
        sizes="105px"
        priority
      />
    </div>
  );
}
