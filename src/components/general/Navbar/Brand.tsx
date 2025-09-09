"use client";

import Image from "next/image";
import Link from "next/link";
import type { Locale } from "@/i18n/getDictionary";

export default function Brand({ locale }: { locale: Locale }) {
  const href = `/${locale}`;
  const label = locale === "id" ? "Beranda" : "Home";

  return (
    <Link href={href} className="shrink-0" aria-label={label}>
      <div className="relative h-[68px] w-[300px] hidden sm:block">
        <Image
          src="/common/logo-dpjr.webp"
          alt="Brand Logo"
          fill
          className="object-contain"
          priority
        />
      </div>

      <div className="relative h-[56px] w-[56px] sm:hidden">
        <Image
          src="/common/logo-dpjr-mobile.webp"
          alt="Brand Logo Mobile"
          fill
          className="object-contain"
          priority
        />
      </div>
    </Link>
  );
}
