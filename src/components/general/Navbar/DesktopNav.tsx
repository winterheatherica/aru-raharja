"use client";

import Link from "next/link";
import LangSwitcher from "./LangSwitcher";
import { useEffect, useRef } from "react";
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

export default function DesktopNav({ open, onRequestClose, attachTo, locale, dict }: Props) {
  const panelRef = useRef<HTMLDivElement>(null);

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

  return (
    <div
      id="desktop-nav-panel"
      ref={panelRef}
      aria-hidden={!open}
      {...(!open ? { inert: "" as any } : {})}
      className={`pointer-events-none absolute -right-3 top-0 z-0 flex h-[86px] w-[980px] items-center gap-3
        rounded-2xl bg-white px-6 opacity-0 transition-all duration-500 ease-in-out
        ${open ? "pointer-events-auto translate-x-0 opacity-100" : "translate-x-24"}`}
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
