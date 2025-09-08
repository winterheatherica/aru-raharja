"use client";

import Link from "next/link";
import Image from "next/image";

type Props = {
  href: string;
  title: string;
  subtitle: string;
  imgSrc: string;
  imgAlt?: string;
  imgClassName?: string;
};

export default function ServiceCard({
  href,
  title,
  subtitle,
  imgSrc,
  imgAlt = "",
  imgClassName = "",
}: Props) {
  return (
    <Link
      href={href}
      className="
        group relative flex flex-col p-6 rounded-2xl h-[203px] lg:h-[203px]
        overflow-hidden transition-colors duration-300 ease-in-out
        bg-bumn-2
      "
    >
      <div className="z-10 text-white transition-colors duration-300 group-hover:text-black">
        <h3 className="font-medium text-[32px] leading-[46px]">{title}</h3>
        <p className="text-2xl font-light">{subtitle}</p>
      </div>

      <div className="z-10 mt-auto">
        <span
          className="
            inline-flex items-center justify-center w-[42px] h-[42px] rounded-full shrink-0
            bg-white transition-all duration-300
            group-hover:bg-bumn-2
          "
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24" height="24" viewBox="0 0 24 24" fill="none"
            stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
            className="
              -rotate-45 transition-colors duration-300
              text-bumnblue-3 group-hover:text-white
            "
            aria-hidden="true"
          >
            <path d="M18 8L22 12L18 16" />
            <path d="M2 12H22" />
          </svg>
        </span>
      </div>

      <Image
        src={imgSrc}
        alt={imgAlt}
        width={271}
        height={271}
        className={`
          absolute z-10 right-0 object-cover
          group-hover:filter group-hover:brightness-[50%] group-hover:grayscale
          ${imgClassName}
        `}
        priority={false}
      />

      <div
        aria-hidden="true"
        className="
          absolute inset-0 z-0 opacity-0 group-hover:opacity-100
          transition-opacity duration-300 ease-in-out
          bg-white
        "
      />
    </Link>
  );
}
