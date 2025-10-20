"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";

export type PRItem = {
  id: string;
  title?: string;
  date?: string;
  imageUrl?: string;
  href?: string;
};

export default function Landscape2({ item }: { item: PRItem }) {
  const imageSrc = item.imageUrl || "/images/home/news/news-4.jpg";

  return (
    <article
      className="
        relative flex flex-col bg-transparent cursor-pointer 
        overflow-visible mx-auto w-full max-w-[360px]
        transition-shadow hover:shadow-lg
      "
    >
      <Link href={item.href || "#"} className="w-full h-full block">
        <div className="relative flex flex-col justify-between rounded-xl bg-bumnwhite-3 overflow-hidden min-h-[375px]">
          <div className="w-full p-4 pt-6 flex-1 flex flex-col space-y-3">
            <p className="font-sans text-slate-8 text-xs">{item.date}</p>

            <h3 className="font-bold text-black line-clamp-2 text-xl lg:text-xl">
              {item.title || ""}
            </h3>
          </div>

          <div className="relative w-full h-[250px] rounded-b-xl overflow-hidden flex-shrink-0">
            <Image
              src={imageSrc}
              alt={item.title || ""}
              fill
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              className="object-cover object-top"
              priority={false}
            />
          </div>
        </div>
      </Link>

      <div className="absolute w-24 h-24 bg-white rounded-full rotate -top-7 -right-7 z-10" />

      <div className="absolute flex justify-center items-center text-white -rotate-45 w-[58px] h-[58px] rounded-full bg-bumn-gradient-primary-9 -top-1 -right-1 shadow-inner-blue-light z-20">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="lucide lucide-move-right w-7 h-7"
        >
          <path d="M18 8L22 12L18 16" />
          <path d="M2 12H22" />
        </svg>
      </div>
    </article>
  );
}
