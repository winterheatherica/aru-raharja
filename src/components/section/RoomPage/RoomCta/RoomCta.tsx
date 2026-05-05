"use client";

import * as React from "react";
import useRevealOnScroll from "@/components/general/Motion/useRevealOnScroll";

type Props = {
  label: string;
};

export default function RoomCta({ label }: Props) {
  const { ref, visible } = useRevealOnScroll<HTMLDivElement>();
  const [hasShown, setHasShown] = React.useState(false);

  React.useEffect(() => {
    if (visible) setHasShown(true);
  }, [visible]);

  const anim = hasShown
    ? "opacity-100 translate-x-0"
    : "opacity-0 translate-x-10";

  return (
    <div
      ref={ref}
      className={`transition-all duration-[800ms] ease-out ${anim}`}
    >
      <a
        href="https://wa.me/6281227008100"
        target="_blank"
        rel="noopener noreferrer"
        className="inline-flex items-center gap-2 rounded-xl bg-bumn-gradient-primary-11 px-5 py-2.5 text-sm font-semibold text-white shadow-bumn-2 transition hover:opacity-95"
      >
        {label}
      </a>
    </div>
  );
}