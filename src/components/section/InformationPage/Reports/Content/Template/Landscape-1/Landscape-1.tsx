"use client";

import * as React from "react";
import Image from "next/image";

type ReportItem = {
  id: string;
  title: string;
  date: string;
  imageUrl: string;
  href?: string;
};

type Props = {
  item: ReportItem;
  className?: string;
};

export default function Landscape1({ item, className = "" }: Props) {
  return (
    <article
      className={[
        "relative flex flex-col rounded-xl bg-transparent cursor-pointer transition-shadow hover:shadow-lg overflow-visible mx-auto w-full max-w-[360px]",
        className,
      ].join(" ")}
      onClick={() => {
        if (item.href) window.location.href = item.href;
      }}
      role="link"
      aria-label={item.title}
    >
      <div className="w-full p-4 pt-6 space-y-4 bg-bumnwhite-3 rounded-xl overflow-hidden">
        <p className="font-sans text-slate-8 text-xs">{item.date}</p>
        <h3 className="font-bold text-black line-clamp-2 text-xl lg:text-xl w-[80%]">
          {item.title}
        </h3>
        <div className="relative w-full h-[250px] rounded-lg overflow-hidden">
          <Image
            src={item.imageUrl}
            alt={item.title}
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            className="object-cover object-top rounded-lg"
            priority={false}
          />
        </div>
      </div>

      <div
        className="absolute w-24 h-24 bg-white rounded-full rotate card__icon -top-7 -right-7 pointer-events-none z-10"
        aria-hidden="true"
      />
      
      <div
        className="absolute flex justify-center items-center text-white -rotate-45 w-[58px] h-[58px] rounded-full bg-bumn-gradient-primary-9 -top-1 -right-1 shadow-inner-blue-light pointer-events-none z-20"
        aria-hidden="true"
      >
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
