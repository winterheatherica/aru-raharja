"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import LangSwitcher from "./LangSwitcher";
import { useEffect, useRef } from "react";
import type { Dictionary } from "@/i18n/getDictionary";
import { NAV_ORDER, getLabel, navHref } from "@/lib/nav";
import HomeIcon from "./HomeIcon";
import UserIcon from "./UserIcon";
import { getRouteMap, normalizeLocale } from "@/i18n/routes";

type Props = {
  open: boolean;
  onRequestClose: () => void;
  attachTo?: React.RefObject<HTMLDivElement>;
  locale: string;
  dict?: Dictionary;
};

export default function DesktopNav({ open, onRequestClose, attachTo, locale, dict }: Props) {
  const panelRef = useRef<HTMLDivElement>(null);
  const pathname = usePathname();

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

  const safe = normalizeLocale(locale);
  const homeSlug = getRouteMap(safe).home;

  return (
    <div
      id="desktop-nav-panel"
      ref={panelRef}
      aria-hidden={!open}
      {...(!open ? { inert: "" as any } : {})}
      className={`pointer-events-none absolute right-0 top-0 z-0 flex h-[86px] w-[860px] items-center gap-3
        rounded-2xl bg-white px-6 opacity-0 transition-all duration-500 ease-in-out
        ${open ? "pointer-events-auto translate-x-0 opacity-100" : "translate-x-24"}`}
    >
      <Link
        href={`/${safe}/${homeSlug}`}
        aria-label={safe === "id" ? "Beranda" : "Home"}
        className="inline-flex h-9 w-9 items-center justify-center rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
      >
        <HomeIcon
          aria-hidden="true"
          className={`size-6 ${
            pathname === `/${safe}/${homeSlug}`
              ? "fill-bumnblue-8"
              : "fill-bumnslate-4"
          }`}
        />
      </Link>

      <ul className="flex items-center space-x-1 whitespace-nowrap">
        {NAV_ORDER.map((seg) => {
          const href = navHref(safe, seg);
          const isActive = pathname === href;
          return (
            <li key={seg}>
              <Link
                href={href}
                className={`rounded-lg p-3 text-sm font-medium focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring
                  ${
                    isActive
                      ? "bg-bumn-gradient-primary-16 text-white"
                      : "text-bumnslate-3 hover:text-neutral-900"
                  }`}
              >
                {getLabel(dict, seg)}
              </Link>
            </li>
          );
        })}
      </ul>

      <LangSwitcher locale={safe as any} />

      <div className="ml-2 flex items-center">
        <UserIcon />
      </div>
    </div>
  );
}
