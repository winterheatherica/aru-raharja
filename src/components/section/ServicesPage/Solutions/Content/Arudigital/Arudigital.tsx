"use client";

import * as React from "react";
import Image from "next/image";

type DictShape = {
  service?: {
    solutions?: {
      arudigital?: {
        titleHtml?: string;
        description?: string;
        altIllustration?: string;
      };
    };
  };
};

type Props = {
  dict: DictShape;
  locale: string; // disimpan kalau nanti perlu logic locale
};

export default function Arudigital({ dict }: Props) {
  const copy = dict?.service?.solutions?.arudigital;

  // fallback aman kalau kamus belum diisi
  const titleHtml = copy?.titleHtml ?? "<b>ARU</b><i>digital</i>";
  const description =
    copy?.description ??
    "Digital solutions to streamline operations and deliver better customer experiences.";
  const altIllustration = copy?.altIllustration ?? "ARUdigital illustration";

  return (
    <div className="mt-6 lg:mt-8 grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-10 items-center">
      <div className="order-2 lg:order-1 space-y-3 lg:space-y-4">
        <h2
          className="text-2xl lg:text-4xl font-semibold leading-snug"
          dangerouslySetInnerHTML={{ __html: titleHtml }}
        />
        <p className="text-bumnslate-5 text-base lg:text-lg">{description}</p>

        {/* kalau mau CTA, siapkan field i18n juga */}
        {/* <div className="pt-2">
          <a className="inline-flex items-center px-4 py-2 rounded-xl bg-bumn-gradient-primary-18 text-bumngray-1 font-medium">
            {copy?.ctaLabel ?? "Learn more"}
          </a>
        </div> */}
      </div>

      <div className="order-1 lg:order-2 w-full flex justify-center">
        <Image
          src="/images/services/ARUdigital.png"
          alt={altIllustration}
          width={560}
          height={360}
          className="w-auto h-auto max-w-full"
          priority
        />
      </div>
    </div>
  );
}
