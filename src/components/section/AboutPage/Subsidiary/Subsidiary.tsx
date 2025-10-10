"use client";

import Image from "next/image";
import Link from "next/link";

type Props = {
  dict?: any;
};

export default function Subsidiary({ dict }: Props) {
  const t = dict?.about?.subsidiary;

  return (
    <section className="mt-8 lg:mt-14">
      <div className="space-y-8 font-semibold font-lato">
        <h3 className="mb-6 text-2xl font-bold font-helvetica text-bumngreen-1">
          {t?.title ?? "Subsidiary"}
        </h3>

        <Link
          href="https://jrp.co.id/"
          target="_blank"
          rel="noopener noreferrer"
          className="block"
        >
          <div className="relative rounded-2xl overflow-hidden bg-bumn-gradient-primary-22 p-6 sm:p-8 lg:p-12">
            <Image
              src="/images/general/masking/masking-variant-1.3.png"
              alt=""
              fill
              priority={false}
              className="absolute inset-0 object-cover opacity-30 pointer-events-none select-none"
            />

            <div className="relative z-10 flex items-start gap-6 sm:gap-8">
              <div className="relative shrink-0 w-[64px] h-[64px] sm:w-[84px] sm:h-[84px] lg:w-[104px] lg:h-[104px] rounded-full bg-white/10 backdrop-blur">
                <Image
                  src="/images/general/logo/aru.svg"
                  alt={t?.logoAlt ?? "Aru Raharja logo"}
                  fill
                  className="p-2 object-contain"
                />
              </div>

              <div className="text-white">
                <h4 className="text-2xl sm:text-3xl font-bold font-helvetica mb-3 leading-snug">
                  {t?.name ?? "Aru Raharja Putera Insurance"}
                </h4>
                <p className="text-[16px] sm:text-[18px] leading-[28px] sm:leading-[30px] opacity-90">
                  {t?.description ??
                    "Founded on 27 November 1993 in Jakarta, it has provided extensive insurance services to people throughout Indonesia for more than two decades."}
                </p>
              </div>
            </div>
          </div>
        </Link>
      </div>
    </section>
  );
}
