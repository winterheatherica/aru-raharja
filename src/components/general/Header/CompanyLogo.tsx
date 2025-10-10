"use client";
import Image from "next/image";

type Props = { className?: string };

export default function CompanyLogo({ className }: Props) {
  return (
    <div className={`relative h-[56px] w-[65px] lg:h-[96px] lg:w-[105px] ${className ?? ""}`}>
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
  );
}
