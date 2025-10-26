"use client";
import React from "react";

export default function PageTopBanner({ category }: { category?: string }) {
  return (
    <div className="w-full flex justify-center relative">
      <div className="relative w-full max-w-screen-1440 h-48 lg:h-56 rounded-b-xl overflow-hidden bg-bumn-gradient-primary-2 shadow-bumn-2">
        {/* garis-garis halus */}
        <div
          className="absolute inset-0 opacity-[0.08] bg-[linear-gradient(90deg,#fff_1px,transparent_1px),linear-gradient(180deg,#fff_1px,transparent_1px)] bg-[size:48px_48px]"
          aria-hidden
        ></div>

        {/* konten teks */}
        <div className="relative z-10 flex items-start h-full px-6 lg:px-10 pt-6 lg:pt-10">
          <div>
            <h2 className="text-2xl lg:text-3xl font-semibold text-white leading-tight">
              {category ?? "Teknologi Informasi"}
            </h2>
            <p className="text-sm lg:text-base text-white/90 mt-1">
              Modern Blogger Template with Clean & Responsive Design
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
