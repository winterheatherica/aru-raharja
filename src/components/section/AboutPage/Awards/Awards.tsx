"use client";

import { useState, useMemo } from "react";
import Image from "next/image";

type Award = {
  id: string;
  year: number;
  src: string;
  alt: string;
  title: string;
  label: string;
  description: string;
  order: number;
};

type Props = {
  dict?: any;
  awards?: Award[];
};

export default function Awards({ dict, awards = [] }: Props) {
  const t = dict?.about?.awards ?? {};

  const years = useMemo(() => {
    const set = new Set<number>();
    awards.forEach((a) => set.add(a.year));
    return Array.from(set).sort((a, b) => b - a);
  }, [awards]);

  const [active, setActive] = useState<"all" | number>("all");

  const filtered = useMemo(() => {
    if (active === "all") return awards;
    return awards.filter((a) => a.year === active);
  }, [active, awards]);

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
                      className={`inline-flex items-center justify-center whitespace-nowrap rounded-md px-3 py-2 text-base font-normal transition-all w-full
                        ${
                          active === "all"
                            ? "bg-bumn-gradient-primary-18 text-bumngray-1 shadow"
                            : ""
                        }`}
                    >
                      {t?.yearAll ?? "All years"}
                    </button>

                    {years.map((y) => (
                      <button
                        key={y}
                        onClick={() => setActive(y)}
                        aria-current={active === y ? "page" : undefined}
                        className={`inline-flex items-center justify-center whitespace-nowrap rounded-md px-3 py-2 text-base font-normal transition-all w-full
                          ${
                            active === y
                              ? "bg-bumn-gradient-primary-18 text-bumngray-1 shadow"
                              : ""
                          }`}
                      >
                        {y}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="col-span-12 lg:col-span-9">
            <div className="grid gap-x-6 gap-y-8 lg:grid-cols-3">
              {filtered.map((a) => (
                <div
                  key={a.id}
                  className="relative p-4 overflow-hidden border rounded-lg bg-bumnwhite-3"
                >
                  <div className="absolute inset-0 pointer-events-none bg-white/10 card-blur" />

                  <div className="relative">
                    <div className="relative aspect-[4/3] mb-4">
                      <Image
                        src={a.src}
                        alt={a.alt}
                        fill
                        className="object-contain w-full"
                        sizes="100vw"
                      />
                    </div>

                    <div className="space-y-2 text-center">
                      <div className="text-sm font-semibold text-bumnslate-6">
                        {a.title}
                      </div>
                      <div className="text-xs text-bumnslate-4">
                        {a.year}
                      </div>

                      <button
                        className="inline-flex items-center justify-center gap-2 whitespace-nowrap transition-colors
                                   bg-bumn-gradient-primary-16 text-white shadow w-full h-6 px-6 py-3 text-xs font-semibold rounded-lg
                                   lg:h-10 lg:text-sm"
                      >
                        {t?.cta ?? "View Certificate"}
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
