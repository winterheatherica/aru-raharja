"use client";

import Image from "next/image";
import type { Dictionary } from "@/i18n/get_dictionary";
import useRevealOnScroll from "@/components/general/Motion/useRevealOnScroll";

type Props = {
  dict: Dictionary;
};

export default function Hero({ dict }: Props) {
  const t = dict.about;
  const { ref, visible } = useRevealOnScroll<HTMLElement>();

  return (
    <section
      ref={ref}
      className={`relative my-6 transition-opacity duration-1000 ease-out ${visible ? "opacity-100" : "opacity-0"}`}
    >
      <div className="flex flex-col items-center justify-center mb-3 space-y-1">
        <h2
          className={`text-xl font-bold text-transparent uppercase bg-bumn-gradient-primary-11 bg-clip-text transition-all duration-[800ms] ease-out ${visible ? "translate-x-0 opacity-100" : "-translate-x-8 opacity-0"}`}
        >
          {t.hero.smallTitle}
        </h2>
        <span className="block w-[20px] h-[2px] rounded bg-bumn-gradient-primary-11"></span>
      </div>  

      <h1
        className={`font-bold text-2xl lg:text-5xl lg:leading-[58px] text-center text-bumnblack-1 font-inter max-w-[1130px] mx-auto transition-all duration-[800ms] ease-out ${visible ? "translate-x-0 opacity-100 delay-[400ms]" : "translate-x-10 opacity-0"}`}
      >
        {t.hero.headline}
      </h1>

      <div
        className={`relative h-[156px] sm:h-[286px] lg:h-[486px] mt-8 lg:mt-14 transition-all duration-[800ms] ease-out ${visible ? "translate-x-0 opacity-100 delay-[800ms]" : "-translate-x-10 opacity-0"}`}
      >
        <Image
          src="/images/about/gedung-aru-1.png"
          alt={t.hero.buildingAlt}
          fill
          className="object-cover object-top w-full rounded-2xl"
        />
      </div>

      <div
        className={`max-w-[1014px] mx-auto font-semibold text-[18px] leading-[30px] font-lato mt-8 lg:mt-14 transition-all duration-[800ms] ease-out ${visible ? "translate-y-0 opacity-100 delay-[1200ms]" : "translate-y-20 opacity-0"}`}
      >
        <p>{t.intro}</p>
        <ul className="ml-12 list-disc">
          {t.list.items.map((item, i) => (
            <li key={i}>{item}</li>
          ))}
        </ul>
      </div>
    </section>
  );
}
