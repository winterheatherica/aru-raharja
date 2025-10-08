"use client";

import React from "react";
import Image from "next/image";

export default function Appeal() {
  return (
    <section
      className="relative flex overflow-hidden text-white border rounded-2xl h-auto lg:h-[352px] 
                 animate-fade-down bg-bumn-gradient-primary-12"
    >
      <div className="absolute inset-y-0 left-0 w-full flex items-center justify-start pointer-events-none z-0">
        <Image
          src="/images/general/masking/masking-variant-3.png"
          alt="Masking background"
          fill
          className="object-cover object-left invert brightness-0"
          priority
        />
      </div>

      <div className="absolute inset-y-0 right-0 w-1/3 flex items-center justify-end pointer-events-none z-10">
        <Image
          src="/images/services/service-bg.png"
          alt="Appeal background"
          width={420}
          height={200}
          className="object-contain object-right"
          priority
        />
      </div>

      <div className="relative z-20 flex w-full py-8 pl-8 pr-8 md:w-6/12 lg:pr-0 lg:pl-24 lg:py-14">
        <div className="max-w-[627px]">
          <h2 className="text-2xl lg:text-5xl lg:leading-[58px] font-bold font-inter animate-fade-right animate-delay-300">
            Appeal
          </h2>
          <div className="mt-4 text-lg lg:mt-6 font-lato animate-fade-left animate-delay-[600ms]">
            <p>
              Aru Raharja collaborates to prioritize information technology and
              services to the community
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
