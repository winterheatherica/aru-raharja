"use client";

import Image from "next/image";
import Link from "next/link";

export default function PhoneCta() {
  return (
    <Link href="/id/complaint" className="flex items-center" aria-label="Pengaduan">
      <div className="relative flex h-[30px] w-[30px] lg:h-[45px] lg:w-[45px] animate-pulse">
        <Image
          src="/navbar/phone-icon.webp"
          alt="phone-icon"
          fill
          className="object-contain"
          sizes="(max-width:1024px) 30px, 45px"
        />
      </div>
    </Link>
  );
}
