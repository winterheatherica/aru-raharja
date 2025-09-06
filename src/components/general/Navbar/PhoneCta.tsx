"use client";

import Image from "next/image";
import Link from "next/link";
import type { Locale } from "@/i18n/getDictionary";

type Props = { locale: Locale; className?: string };

export default function PhoneCta({ locale, className }: Props) {
  const href = `/${locale}/complaint`;
  const label = locale === "id" ? "Pengaduan" : "Complaint";

  return (
    <Link href={href} className={`flex items-center ${className ?? ""}`} aria-label={label}>
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
