"use client";

import { useEffect } from "react";
import { useLockBody } from "@/hooks/useLockBody";

type Props = {
  open: boolean;
  onRequestClose: () => void;
};

export default function MobileNav({ open, onRequestClose }: Props) {
  useLockBody(open);

  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") onRequestClose();
    }
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [onRequestClose]);

  return (
    <div
      className={`fixed inset-0 z-40 bg-black/40 backdrop-blur-sm transition-opacity duration-300 lg:hidden ${
        open ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
      }`}
      onClick={onRequestClose}
      aria-hidden={!open}
    >
      <div
        className={`ml-auto h-full w-[88%] max-w-[420px] bg-white transition-transform duration-300 ${
          open ? "translate-x-0" : "translate-x-full"
        }`}
        onClick={(e) => e.stopPropagation()}
        role="dialog"
        aria-modal="true"
      >
        <div className="p-6">Mobile menu coming soon…</div>
      </div>
    </div>
  );
}
