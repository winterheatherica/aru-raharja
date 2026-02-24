"use client";
import React from "react";

export default function PageTopBanner() {
  return (
    <div
      className="absolute inset-y-0 left-1/2 w-screen -translate-x-1/2 overflow-hidden bg-bumn-gradient-primary-2 pointer-events-none"
      aria-hidden
    >
      <div className="absolute inset-0 opacity-[0.08] bg-[linear-gradient(90deg,#fff_1px,transparent_1px),linear-gradient(180deg,#fff_1px,transparent_1px)] bg-[size:48px_48px]" />
    </div>
  );
}
