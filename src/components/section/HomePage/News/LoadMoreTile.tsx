"use client";

import Link from "next/link";
import type { Locale } from "@/i18n/get_dictionary";

export default function LoadMoreTile({
  locale,
  label,
}: {
  locale: Locale;
  label?: string;
}) {
  const href = `/${locale}/news`;

  return (
    <Link
      href={href}
      aria-label={label}
      className="
        group cursor-pointer flex flex-col items-center justify-center
        space-y-4 w-[250px] select-none
      "
    >
      <div
        className="
          w-[96px] h-[96px] rounded-full flex items-center justify-center
          bg-bumn-gradient-primary-11
          group-hover:bg-none
          transition-colors duration-300 ease-in-out
          shadow
        "
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          className="
            w-12 h-12 text-white
            transition-colors duration-300 ease-in-out
            group-hover:text-black
          "
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M18 8L22 12L18 16"></path>
          <path d="M2 12H22"></path>
        </svg>
      </div>

      <p className="text-xl font-bold text-black">{label}</p>
    </Link>
  );
}
