"use client";

import Image from "next/image";
import Link from "next/link";

export default function Brand() {
  return (
    <Link href="/id" className="shrink-0" aria-label="Beranda">
      <div className="relative h-[26.25px] w-[149px]">
        <Image
          src="/navbar/danantara.png"
          alt="Brand Logo"
          fill
          className="object-contain"
          priority
        />
      </div>
    </Link>
  );
}
