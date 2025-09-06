"use client";

import Image from "next/image";
import Link from "next/link";
import type { Locale } from "@/i18n/getDictionary";

export default function Brand({ locale }: { locale: Locale }) {
  const href = `/${locale}`;
  const label = locale === "id" ? "Beranda" : "Home";

  return (
    <Link href={href} className="shrink-0" aria-label={label}>
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
