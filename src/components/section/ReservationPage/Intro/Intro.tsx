"use client";

import Link from "next/link";
import React from "react";
import type { Locale, Dictionary } from "@/i18n/get_dictionary";

type Props = {
  dict: Dictionary;
  locale?: Locale;
};

export default function Intro({ dict }: Props) {
  const t = dict?.reservation?.desc;
  if (!t) return null;

  return (
    <section className="px-2 md:px-16 lg:px-24 space-y-8 lg:space-y-12">
      <div className="max-w-3xl mx-auto text-center mt-8 text-xl font-lato">
        <p className="leading-relaxed text-bumnslate-6">
          {t.paragraph ??
            "Choose the room that best fits your needs and adjust your booking schedule."}
        </p>

        <div className="mt-8">
          <Link
            href="/reservation/schedule"
            className="inline-flex items-center gap-2 px-6 py-2.5 rounded-md bg-bumnblue-2 hover:bg-bumnblue-3 text-white font-semibold shadow transition"
          >
            {t.ctaLabel ?? "View Booking Schedule"}
          </Link>
        </div>
      </div>
    </section>
  );
}
