"use client";

import { PropsWithChildren } from "react";

type Props = PropsWithChildren<{
  size: "desktop" | "mobile";
}>;

export default function PartnersCard({ size, children }: Props) {
  const sizeClass =
    size === "desktop"
      ? "w-48 h-48"
      : "w-[200px] h-[200px] mx-auto";

  return (
    <div
      className={[
        "rounded-2xl border flex flex-col items-center justify-between text-center p-5 shadow-bumn-2 bg-bumn-gradient-white-4",
        sizeClass,
      ].join(" ")}
    >
      {children}
    </div>
  );
}
