"use client";

import Image from "next/image";
import Link from "next/link";
import type { Locale } from "@/i18n/get_dictionary";

export default function Brand({ locale }: { locale: Locale }) {
  const href = `/${locale}`;
  const label = locale === "id" ? "Beranda" : "Home";

  return (
    <Link href={href} className="shrink-0" aria-label={label}>
      <div className="relative h-[80px] w-[260px] hidden sm:block">
        <Image
          src="/images/general/logo/bumn.png"
          alt="Brand Logo"
          fill
          className="object-contain"
          priority
        />
      </div>

      <div className="relative h-[60px] w-[56px] sm:hidden">
        <Image
          src="/images/general/logo/bumn-mobile.png"
          alt="Brand Logo Mobile"
          fill
          className="object-contain"
          priority
        />
      </div>
    </Link>
  );
}
