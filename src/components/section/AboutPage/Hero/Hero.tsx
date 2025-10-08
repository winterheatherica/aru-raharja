"use client";

import Image from "next/image";
import type { Dictionary } from "@/i18n/getDictionary";

type Props = {
  dict: Dictionary;
};

export default function Hero({ dict }: Props) {
  const t = dict.about;

  return (
    <section className="relative my-6">
      <div className="flex flex-col items-center justify-center mb-3 space-y-1">
        <h2 className="text-xl font-bold text-transparent uppercase bg-bumn-gradient-primary-7 bg-clip-text animate-fade-down">
          {t.hero.smallTitle}
        </h2>
        <span className="block w-[20px] h-[2px] rounded bg-bumn-gradient-primary-7"></span>
      </div>

      <h1 className="font-bold text-2xl lg:text-5xl lg:leading-[58px] text-center text-bumnblack-1 font-inter max-w-[1130px] mx-auto animate-fade-right animate-delay-300">
        {t.hero.headline}
      </h1>

      <div className="relative h-[156px] sm:h-[286px] lg:h-[486px] mt-8 lg:mt-14 animate-fade-left animate-delay-500">
        <Image
          src="/images/about/gedung-aru-1.png"
          alt={t.hero.buildingAlt}
          fill
          className="object-cover object-top w-full rounded-2xl"
        />
      </div>

      <div className="max-w-[1014px] mx-auto font-semibold text-[18px] leading-[30px] font-lato mt-8 lg:mt-14">
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
