"use client";

import Image from "next/image";
import Link from "next/link";
import type { Locale } from "@/i18n/get_dictionary";

type Props = {
  className?: string;
  locale: Locale;
};

export default function CompanyLogo({ className, locale }: Props) {
  const label = locale === "id" ? "beranda" : "home";
  const href = `/${locale}/${label}`;

  return (
    <Link href={href} aria-label={label} className={`shrink-0 ${className ?? ""}`}>
      <div className="relative h-[56px] w-[65px] lg:h-[96px] lg:w-[105px]">
        <Image
          src="/images/general/logo/aru.svg"
          alt="Aru Logo"
          width={105}
          height={96}
          priority
          sizes="(max-width:1024px) 65px, 105px"
          className="h-full w-full object-contain"
        />
      </div>
    </Link>
  );
}