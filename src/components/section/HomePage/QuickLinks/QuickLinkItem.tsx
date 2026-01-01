"use client";

import Link from "next/link";

type Props = {
  title: string;
  buttonLabel: string;
  href: string;
  logoSrc: string;
  logoAlt: string;
};

export default function QuickLinkItem({
  title,
  buttonLabel,
  href,
  logoSrc,
  logoAlt,
}: Props) {
  return (
    <div
      className="
        relative bg-bumn-gradient-white-2 rounded-2xl overflow-hidden
        p-6 lg:p-10
        min-h-[12rem] md:min-h-[10rem] lg:min-h-[12rem]
      "
    >
      <div className="relative z-20 h-full flex flex-col justify-center">
        <h2
          className="
            text-black font-semibold leading-tight text-balance
            text-lg sm:text-2xl lg:text-3xl
            sm:pr-[8rem] md:pr-[6rem] lg:pr-[10rem]
          "
        >
          {title}
        </h2>

        <Link
          href={href}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={buttonLabel}
          className="
            inline-flex items-center justify-center gap-2 rounded-full bg-bumn-gradient-primary-11 text-white font-medium z-20
            w-fit
            px-4 py-2 text-sm
            md:px-6 md:py-3
            mt-4
            transition-all
          "
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M5 12h14m-6-6l6 6-6 6"
            />
          </svg>
          <span>{buttonLabel}</span>
        </Link>
      </div>

      <div
        aria-hidden
        className="
          absolute z-0 pointer-events-none bg-bumn-gradient-white-3 rounded-full
          top-1/2 -translate-y-1/2 right-6
          w-[70%] max-w-[8rem] aspect-square
          md:max-w-[11rem] lg:max-w-[14rem]
        "
      />

      <div
        aria-hidden
        className="
          absolute inset-0 z-10 flex items-center justify-end
          pr-6 md:pr-4 lg:pr-10
        "
      >
        <img
          src={logoSrc}
          alt={logoAlt}
          className="
            w-full h-full object-contain
            max-w-[8rem] md:max-w-[12rem] lg:max-w-[16rem] lg:pl-16
          "
        />
      </div>
    </div>
  );
}
