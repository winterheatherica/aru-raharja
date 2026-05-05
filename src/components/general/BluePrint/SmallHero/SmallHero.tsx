"use client";

import React from "react";
import Image from "next/image";
import useRevealOnScroll from "@/components/general/Motion/useRevealOnScroll";

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
  const { ref, visible } = useRevealOnScroll<HTMLElement>();
  if (!hero) return null;

  return (
    <section
      ref={ref}
      aria-label="Hero Section"
      className={`relative flex overflow-hidden text-white border rounded-2xl h-auto lg:h-[352px]
                 bg-bumn-gradient-primary-12 bg-cover bg-left-top lg:bg-top
                 transition-all duration-[1000ms] ease-out
                 ${visible ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-10"}`}
    >
      <div className="hidden md:block absolute inset-y-0 left-0 w-full h-full pointer-events-none z-0">
        <Image
          src="/images/general/masking/aru-mask-4-white.png"
          alt={hero.altMask ?? ""}
          fill
          className="object-cover object-left invert brightness-0 rotate-180 drop-shadow-[0_0_0px_rgba(255,255,255,1)]"
          priority
        />
      </div>

      <div
        className="hidden md:block absolute inset-0 pointer-events-none z-10"
        aria-hidden
        style={{
          background:
            "linear-gradient(75deg, rgba(0,0,0,0.3) 0%, rgba(0,0,0,0.24) 10%, rgba(0,0,0,0.12) 20%, transparent 30%)",
        }}
      />

      <div
        className="hidden md:block absolute inset-0 pointer-events-none z-10"
        aria-hidden
        style={{
          background:
            "linear-gradient(40deg, transparent 30%, rgba(15, 91, 157, 0.3) 40%, rgba(177, 217, 248, 0.8) 100%)",
          left: "0%",
        }}
      />

      {illustrationSrc ? (
        <div
          className={`hidden md:block absolute inset-y-0 right-0 w-2/3 pointer-events-none z-20
                     transition-all duration-[1000ms] ease-out
                     ${visible ? "opacity-100 translate-y-0 delay-[700ms]" : "opacity-0 -translate-y-10"}`}
        >
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

      <div className="relative z-30 flex w-full py-8 pl-8 pr-8 md:w-7/12 lg:pl-24 lg:py-14 lg:pr-0">
        <div className="max-w-[680px]">
          <h1
            className={`text-2xl lg:text-5xl lg:leading-[58px] font-bold font-inter
                       transition-all duration-[700ms] ease-out
                       ${visible ? "opacity-100 translate-y-0 delay-[300ms]" : "opacity-0 -translate-y-10"}`}
            dangerouslySetInnerHTML={{ __html: hero.titleHtml ?? "" }}
          />

          {hero.description ? (
            <p
              className={`mt-4 text-lg lg:mt-6 font-lato
                         transition-all duration-[700ms] ease-out
                         ${visible ? "opacity-100 translate-y-0 delay-[600ms]" : "opacity-0 -translate-y-10"}`}
              dangerouslySetInnerHTML={{ __html: hero.description }}
            />
          ) : null}
        </div>
      </div>
    </section>
  );
}
