"use client";

import Link from "next/link";

export default function CtaButton({ href, label }: { href: string; label: string }) {
  return (
    <Link
      href={href}
      className="
        inline-flex items-center justify-center gap-2 whitespace-nowrap text-sm font-medium
        transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring
        disabled:pointer-events-none disabled:opacity-50
        [&_svg]:pointer-events-none [&_svg]:shrink-0
        bg-bumn-2 text-white shadow hover:bg-primary/90
        h-9 py-8 rounded-full mt-3 [&_svg]:size-[22px] px-10 w-full md:w-auto
      "
    >
      <div className="flex items-center gap-3">
        <span className="text-xl font-normal">{label}</span>
        <svg width="40" height="40" viewBox="0 0 24 27" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-2 h-2">
          <path
            d="M23 11.2H20.1111C19.0065 11.2 18.1111 12.0954 18.1111 13.2V16C18.1111 17.1046 19.0065 18 20.1111 18H23M23 11.2V18M23 11.2C23 5.5667 18.0751 1 12 1C5.92487 1 1 5.5667 1 11.2M23 18V18C23 22.1421 19.6421 25.5 15.5 25.5H15M1 11.2V16C1 17.1046 1.89543 18 3 18H3.88889C4.99346 18 5.88889 17.1046 5.88889 16V13.2C5.88889 12.0954 4.99346 11.2 3.88889 11.2H1ZM15 25.5V25.5C15 24.1193 13.8807 23 12.5 23H10.25C9.55964 23 9 23.5596 9 24.25V24.25C9 24.9404 9.55964 25.5 10.25 25.5H15Z"
            stroke="currentColor"
            strokeWidth="2"
          />
        </svg>
      </div>
    </Link>
  );
}
