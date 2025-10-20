"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";

export type AnnualItem = {
  id: string;
  title?: string;
  date?: string;
  imageUrl?: string;
  href?: string;
};

export default function Portrait1({ item }: { item: AnnualItem }) {
  const imageSrc = item.imageUrl || "/images/information/report/annual-report/report1.png";

  return (
    <article className="relative flex flex-col h-full rounded-xl bg-transparent cursor-pointer mx-auto w-full max-w-[360px] transition-shadow hover:shadow-lg overflow-visible">
      <div className="relative flex flex-col h-full rounded-xl bg-bumnwhite-3 overflow-hidden">
        <Link href={item.href || "#"} className="w-full h-full block">
          <div className="w-full p-4 pt-6 space-y-3 min-h-[88px]">
            <p className="font-sans text-slate-8 text-xs">{item.date}</p>
            <h3 className="font-bold text-black line-clamp-2 text-xl lg:text-xl">
              {item.title || ""}
            </h3>
          </div>

          <div
            className="relative w-full flex-none rounded-lg"
            style={{ height: 450 }}
            >
            <Image
                src={imageSrc}
                alt={item.title || "Laporan Tahunan"}
                fill
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                className="object-contain object-center"
                style={{ objectFit: "contain", objectPosition: "center" }}
                priority={false}
            />
            </div>
        </Link>
      </div>

      <div className="absolute w-24 h-24 bg-white rounded-full rotate -top-7 -right-7 z-10" />
      <div className="absolute flex justify-center items-center text-white -rotate-45 w-[58px] h-[58px] rounded-full bg-bumn-gradient-primary-9 -top-1 -right-1 shadow-inner-blue-light z-20">
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-move-right w-7 h-7">
          <path d="M18 8L22 12L18 16" />
          <path d="M2 12H22" />
        </svg>
      </div>
    </article>
  );
}
