"use client";

import Link from "next/link";
import React from "react";
import type { Locale, Dictionary } from "@/i18n/get_dictionary";
import useRevealOnScroll from "@/components/general/Motion/useRevealOnScroll";

type Props = {
  dict: Dictionary;
  locale?: Locale;
};

export default function Intro({ dict }: Props) {
  const t = dict?.reservation?.desc;
  const { ref, visible } = useRevealOnScroll<HTMLDivElement>();
  if (!t) return null;

  return (
    <section className="px-2 md:px-16 lg:px-24 space-y-8 lg:space-y-12">
      <div ref={ref} className="max-w-3xl mx-auto text-center mt-8 text-xl font-lato">
        <p
          className={`leading-relaxed text-bumnslate-6 transition-all duration-[1200ms] ease-out
                      ${visible ? "opacity-100 translate-x-0" : "opacity-0 translate-x-20"}`}
        >
          {t.paragraph ??
            "Choose the room that best fits your needs and adjust your booking schedule."}
        </p>

        {/* <div className="mt-8">
          <Link
            href="/reservation/schedule"
            className="inline-flex items-center gap-2 px-6 py-2.5 rounded-md bg-bumn-gradient-primary-11 hover:opacity-95 text-white font-semibold shadow transition"
          >
            {t.ctaLabel ?? "View Booking Schedule"}
          </Link>
        </div> */}
      </div>
    </section>
  );
}
