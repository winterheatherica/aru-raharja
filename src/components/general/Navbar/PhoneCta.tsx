"use client";

import Image from "next/image";
import Link from "next/link";

export default function PhoneCta() {
  return (
    <Link href="/id/complaint" className="hidden items-center lg:flex" aria-label="Pengaduan">
      <div className="relative flex h-[45px] w-[45px] animate-pulse">
        <Image
          src="/navbar/phone-icon.webp"
          alt="phone-icon"
          fill
          className="object-contain"
          sizes="45px"
        />
      </div>
    </Link>
  );
}
