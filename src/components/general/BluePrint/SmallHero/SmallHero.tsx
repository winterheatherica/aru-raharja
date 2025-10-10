"use client";

import React from "react";
import Image from "next/image";

type HeroData = {
  titleHtml?: string;
  description?: string;
  altMask?: string;
  altIllustration?: string;
};

type Props = {
  hero?: HeroData;
  illustrationSrc?: string;
};

export default function SmallHero({ hero, illustrationSrc }: Props) {
  if (!hero) return null;

  return (
    <section
      aria-label="Hero Section"
      className="relative flex overflow-hidden text-white border rounded-2xl h-auto lg:h-[352px]
                 bg-bumn-gradient-primary-12 bg-cover bg-left-top lg:bg-top animate-fade-down"
    >
      {/* Background masking */}
      <div className="absolute inset-y-0 left-0 w-full h-full flex items-center justify-start pointer-events-none z-0">
        <Image
          src="/images/general/masking/masking-variant-3.png"
          alt={hero.altMask ?? ""}
          fill
          className="object-cover object-left invert brightness-0"
          priority
        />
      </div>

      {/* Right-side illustration (dinamis via prop) */}
      {illustrationSrc ? (
        <div className="hidden md:block absolute inset-y-0 right-0 w-2/3 pointer-events-none z-10">
          <div className="relative h-full">
            <Image
              src={illustrationSrc}
              alt={hero.altIllustration ?? ""}
              fill
              className="object-contain object-right-bottom"
              priority
            />
          </div>
        </div>
      ) : null}

      {/* Copy */}
      <div className="relative z-20 flex w-full py-8 pl-8 pr-8 md:w-7/12 lg:pl-24 lg:py-14 lg:pr-0">
        <div className="max-w-[680px]">
          <h1
            className="text-2xl lg:text-5xl lg:leading-[58px] font-bold font-inter 
                       animate-fade-right animate-delay-300"
            dangerouslySetInnerHTML={{ __html: hero.titleHtml ?? "" }}
          />
          {hero.description ? (
            <p
              className="mt-4 text-lg lg:mt-6 font-lato 
                          animate-fade-left animate-delay-[600ms]"
            >
              {hero.description}
            </p>
          ) : null}
        </div>
      </div>
    </section>
  );
}
