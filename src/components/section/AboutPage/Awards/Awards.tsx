"use client";

import { useState, useMemo } from "react";
import Image from "next/image";

type Props = {
  dict?: any;
};

type Award = {
  year: "2025";
  img: string;
  alt: string;
  cta: string;
};

export default function Awards({ dict }: Props) {
  const t = dict?.about?.awards ?? {};
  const years = ["2025"] as const;

  const [active, setActive] = useState<"all" | (typeof years)[number]>("all");

  const allAwards: Award[] = [
    {
      year: "2025",
      img: "/images/about/award1.jpeg",
      alt: "award-1",
      cta: t?.cta ?? "Certificate of Excellence",
    },
    {
      year: "2025",
      img: "/images/about/award2.jpeg",
      alt: "award-2",
      cta: t?.cta ?? "Certificate of Excellence",
    },
    {
      year: "2025",
      img: "/images/about/award3.jpeg",
      alt: "award-3",
      cta: t?.cta ?? "Certificate of Excellence",
    },
  ];

  const filtered = useMemo(() => {
    if (active === "all") return allAwards;
    return allAwards.filter((a) => a.year === active);
  }, [active]);

  return (
    <section className="mt-8 lg:mt-14">
      <div className="space-y-6 font-semibold lg:space-y-8">
        <h3 className="text-2xl font-bold font-helvetica text-bumngreen-1">
          {t?.title ?? "Awards"}
        </h3>

        <div className="grid grid-cols-12 gap-4">
          <div className="col-span-12 lg:col-span-3">
            <div className="flex w-full p-2">
              <div className="flex flex-col w-full px-2">
                <div>
                  <div className="pb-3 mb-3 text-sm font-medium border-b text-bumngreen-1 font-inter">
                    {t?.yearLabel ?? "Year"}
                  </div>

                  <div className="flex flex-col items-center justify-start h-full p-1 space-y-2 bg-white rounded-lg text-bumnslate-3">
                    <button
                      aria-current={active === "all" ? "page" : undefined}
                      onClick={() => setActive("all")}
                      className={`inline-flex items-center justify-center whitespace-nowrap rounded-md px-3 py-2 text-base font-normal ring-offset-background transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 w-full ${
                        active === "all"
                          ? "bg-bumn-gradient-primary-18 text-bumngray-1 shadow"
                          : ""
                      }`}
                    >
                      {t?.yearAll ?? "All years"}
                    </button>

                    {/* <button
                      onClick={() => setActive("2025")}
                      className={`inline-flex items-center justify-center whitespace-nowrap rounded-md px-3 py-2 text-base font-normal ring-offset-background transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 w-full ${
                        active === "2025"
                          ? "bg-bumn-gradient-primary-18 text-bumngray-1 shadow"
                          : ""
                      }`}
                    >
                      {t?.year2025 ?? "2025"}
                    </button> */}
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="col-span-12 lg:col-span-9">
            <div className="grid gap-x-6 gap-y-8 lg:grid-cols-3">
              {filtered.map((a, idx) => (
                <div
                  key={idx}
                  className="relative p-4 overflow-hidden border rounded-lg bg-bumnwhite-3"
                >
                  <div className="absolute inset-0 pointer-events-none bg-white/10 card-blur" />

                  <div className="relative">
                    <div className="relative aspect-[4/3] mb-4">
                      <Image
                        src={a.img}
                        alt={a.alt}
                        fill
                        className="object-contain w-full"
                        sizes="100vw"
                        priority={false}
                      />
                    </div>

                    <div>
                      <button
                        className="inline-flex items-center justify-center gap-2 whitespace-nowrap transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50
                                   bg-bumn-gradient-primary-16 text-white shadow w-full h-6 px-6 py-3 text-xs font-semibold rounded-lg lg:h-10 lg:text-sm"
                      >
                        {a.cta}
                      </button>
                    </div>
                  </div>
                </div>
              ))}

              {filtered.length === 0 && (
                <div className="col-span-full text-bumnslate-4">
                  {t?.empty ?? "No awards found for this year."}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
