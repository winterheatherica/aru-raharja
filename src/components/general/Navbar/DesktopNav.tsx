"use client";

import Link from "next/link";
import LangSwitcher from "./LangSwitcher";
import { useEffect, useRef, useState } from "react";
import type { Locale, Dictionary } from "@/i18n/getDictionary";
import { NAV_ORDER, getLabel } from "@/lib/nav";
import HomeIcon from "./HomeIcon";
import UserIcon from "./UserIcon";

type Props = {
  open: boolean;
  onRequestClose: () => void;
  attachTo?: React.RefObject<HTMLDivElement>;
  locale: Locale;
  dict?: Dictionary;
};

const BREAK_MAX = 1360;
const BREAK_MIN = 1024;
const MIN_SCALE = 0.84;

export default function DesktopNav({ open, onRequestClose, attachTo, locale, dict }: Props) {
  const panelRef = useRef<HTMLDivElement>(null);
  const [scale, setScale] = useState(1);

  useEffect(() => {
    if (!open) return;

    const onClickOutside = (e: MouseEvent) => {
      const t = e.target as Node;
      if (
        panelRef.current &&
        !panelRef.current.contains(t) &&
        !(attachTo?.current && attachTo.current.contains(t))
      ) {
        onRequestClose();
      }
    };

    document.addEventListener("mousedown", onClickOutside);
    return () => document.removeEventListener("mousedown", onClickOutside);
  }, [open, onRequestClose, attachTo]);

  useEffect(() => {
    const compute = () => {
      const vw = window.innerWidth;

      if (vw >= BREAK_MAX) {
        setScale(1);
        return;
      }

      const clamped = Math.max(BREAK_MIN, Math.min(BREAK_MAX, vw));
      const t = (clamped - BREAK_MIN) / (BREAK_MAX - BREAK_MIN);
      const s = MIN_SCALE + (1 - MIN_SCALE) * t;

      setScale(Math.max(MIN_SCALE, Math.min(1, s)));
    };

    compute();
    window.addEventListener("resize", compute);
    return () => window.removeEventListener("resize", compute);
  }, []);

  return (
    <div
      id="desktop-nav-panel"
      ref={panelRef}
      aria-hidden={!open}
      {...(!open ? { inert: "" as any } : {})}
      className={`pointer-events-none absolute right-0 top-0 z-0 flex h-[86px] w-[980px] items-center gap-3
        rounded-2xl bg-white px-6 opacity-0 transition-all duration-500 ease-in-out
        ${open ? "pointer-events-auto translate-x-0 opacity-100" : "translate-x-24"}`}
      style={{
        transformOrigin: "right center",
        transform: `scale(${scale})`,
      }}
    >
      <Link
        href={`/${locale}`}
        className="inline-flex h-9 w-9 items-center justify-center rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
        aria-label="Home"
      >
        <HomeIcon aria-hidden="true" className="fill-blue-600" />
      </Link>

      <ul className="flex items-center space-x-1 whitespace-nowrap">
        {NAV_ORDER.map((seg) => (
          <li key={seg}>
            <Link
              href={`/${locale}/${seg}`}
              className="rounded-lg p-3 text-sm font-medium text-neutral-600 hover:text-neutral-900 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
            >
              {getLabel(dict, seg)}
            </Link>
          </li>
        ))}
      </ul>

      <LangSwitcher locale={locale} />

      <div className="ml-2 flex items-center">
        <UserIcon />
      </div>
    </div>
  );
}
