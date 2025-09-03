"use client";

import Image from "next/image";
import Link from "next/link";

export default function Brand() {
  return (
    <Link href="/id" className="shrink-0" aria-label="Beranda">
      <div className="relative h-[29px] w-[149px]">
        <Image
          src="/common/danantara.webp"
          alt="Brand Logo"
          fill
          className="object-contain"
          priority
        />
      </div>
    </Link>
  );
}
