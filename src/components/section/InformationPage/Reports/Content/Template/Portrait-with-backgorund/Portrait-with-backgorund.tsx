"use client";

import React from "react";
import Image from "next/image";

export type SecureItem = {
  id: string;
  title?: string;
  date?: string;
  viewers?: number;
  downloads?: number;
  image?: string;
  href?: string;
};

export default function PortraitWithBackground({
  item,
  bg = "/images/information/report/secure/wood-bg.jpg",
}: {
  item: SecureItem;
  bg?: string;
}) {
  const imageName = (item.image || "").toLowerCase();
  const preferContain = imageName.includes("secure1") || imageName.includes("secure2");

  return (
    <article
      className="rounded-xl border bg-card text-card-foreground border-none shadow-bumn-5 overflow-hidden"
      role="link"
      aria-label={item.title}
      onClick={() => {
        if (item.href) window.open(item.href, "_blank", "noopener");
      }}
    >
      <div
        className="rounded-xl overflow-hidden flex flex-col space-y-1.5 p-2"
        style={{
          backgroundImage: `url(${bg})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <div className="relative h-[200px] sm:h-[270px] lg:h-[290px] flex items-center justify-center">
          <Image
            src={item.image || "/images/information/report/secure/secure1.webp"}
            alt={item.title || "Secure cover"}
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 100vw, 100vw"
            className={preferContain ? "object-contain" : "object-cover"}
            style={{ objectPosition: "center" }}
            priority={false}
          />
        </div>
      </div>

      {/* BODY */}
      <div className="p-6 pt-4 pb-4">
        <div className="flex justify-between w-full gap-6 lg:items-start">
          <div className="flex items-center space-x-4">
            <h3 className="text-lg font-bold lg:text-xl font-inter line-clamp-2 text-bumngreen-1">
              {item.title}
            </h3>
          </div>

          <div>
            <div className="text-right flex justify-end font-thin mb-1 text-base text-gray-400 text-[12px] items-center">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="18"
                height="18"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="lucide lucide-eye"
              >
                <path d="M2.062 12.348a1 1 0 0 1 0-.696 10.75 10.75 0 0 1 19.876 0 1 1 0 0 1 0 .696 10.75 10.75 0 0 1-19.876 0"></path>
                <circle cx="12" cy="12" r="3"></circle>
              </svg>
              <p className="ms-2">{item.viewers ?? 0}</p>
            </div>

            <div className="text-right flex justify-end font-thin mb-1 text-base text-gray-400 text-[12px] items-center">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="18"
                height="18"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="lucide lucide-download ms-4"
              >
                <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path>
                <polyline points="7 10 12 15 17 10"></polyline>
                <line x1="12" x2="12" y1="15" y2="3"></line>
              </svg>
              <p className="ms-2">{item.downloads ?? 0}</p>
            </div>

            <p className="font-sans text-base text-bumngreen-2">{item.date ?? ""}</p>
          </div>
        </div>
      </div>

      <div className="items-center p-6 pt-0 flex pb-4">
        <a
          target="_blank"
          rel="noopener noreferrer"
          href={item.href || "#"}
          className="inline-flex items-center justify-center gap-2 whitespace-nowrap text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring text-primary underline-offset-4 hover:underline h-9 rounded-full font-inter"
        >
          <span className="block">Baca Selengkapnya</span>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="18"
            height="18"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="lucide lucide-chevron-right"
          >
            <path d="m9 18 6-6-6-6"></path>
          </svg>
        </a>
      </div>
    </article>
  );
}
