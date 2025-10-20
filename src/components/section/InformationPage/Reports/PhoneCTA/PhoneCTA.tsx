"use client";

import * as React from "react";

export default function PhoneCTA() {
  return (
    <div className="rounded-2xl border border-bumnslate-10 bg-white p-6 shadow-bumn-2 text-center">
      <h3 className="text-lg font-semibold text-bumnblue-2">
        Butuh bantuan lebih lanjut?
      </h3>
      <p className="mt-1 text-sm text-bumnslate-6">
        Konsultasikan kebutuhan Anda langsung dengan tim kami melalui telepon.
      </p>

      <div className="mt-3 flex flex-wrap items-center justify-center gap-2">
        <a
          href="tel:+622112345678"
          className="inline-flex items-center gap-2 rounded-xl bg-bumn-gradient-primary-10 px-5 py-2.5 text-sm font-semibold text-white hover:opacity-90 focus:outline-none focus:ring-2 focus:ring-bumnblue-5"
        >
          <PhoneIcon className="h-4 w-4" aria-hidden />
          Hubungi Kami: (021) 123-45678
        </a>
      </div>
    </div>
  );
}

function PhoneIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 20 20" fill="none" {...props}>
      <path
        d="M3.5 5.5c0 6 5 11 11 11l2-2a1 1 0 0 0 0-1.4l-2.3-2.3a1 1 0 0 0-1.4 0l-.8.8c-1.8-.7-3.3-2.2-4-4l.8-.8a1 1 0 0 0 0-1.4L6.9 3.5a1 1 0 0 0-1.4 0l-2 2z"
        stroke="currentColor"
        strokeWidth={1.6}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
