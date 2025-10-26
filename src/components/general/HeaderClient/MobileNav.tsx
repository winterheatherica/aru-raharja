"use client";

import Link from "next/link";
import LangSwitcher from "./LangSwitcher";
import { useEffect, useRef } from "react";
import type { Locale, Dictionary } from "@/i18n/get_dictionary";
import { NAV_ORDER, getLabel, navHref } from "@/lib/nav";
import HomeIcon from "./HomeIcon";
import UserIcon from "./UserIcon";
import { usePathname } from "next/navigation";
import { useLockBody } from "@/hooks/useLockBody";
import { getRouteMap } from "@/i18n/routes";

type Props = {
  open: boolean;
  onRequestClose: () => void;
  locale: Locale;
  dict?: Dictionary;
};

export default function MobileNav({ open, onRequestClose, locale, dict }: Props) {
  const pathname = usePathname() || "/";
  const panelRef = useRef<HTMLDivElement>(null);

  useLockBody(open);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && onRequestClose();
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [onRequestClose]);

  useEffect(() => {
    onRequestClose();
  }, [pathname, onRequestClose]);

  useEffect(() => {
    if (open) panelRef.current?.focus();
  }, [open]);

  const homeSlug = getRouteMap(locale).home;
  const homeHref = `/${locale}/${homeSlug}`;
  const isHomeActive = pathname === homeHref;

  return (
    <>
      <div
        aria-hidden={!open}
        className={`fixed inset-0 z-[1000] bg-black/40 transition-opacity ${
          open ? "opacity-100" : "pointer-events-none opacity-0"
        } lg:hidden`}
        onClick={onRequestClose}
      />

      <div
        ref={panelRef}
        role="dialog"
        aria-modal="true"
        tabIndex={-1}
        aria-label="Mobile navigation"
        className={`fixed inset-y-0 right-0 z-[1001] h-full w-3/4 border-l bg-white p-6 shadow-lg transition-transform sm:max-w-sm
          ${open ? "translate-x-0" : "translate-x-full"} lg:hidden`}
        onClick={(e) => e.stopPropagation()}
      >
        <button
          type="button"
          onClick={onRequestClose}
          className="absolute right-4 top-4 rounded-sm opacity-70 transition hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:ring-offset-2"
          aria-label="Close"
        >
          <svg width="20" height="20" viewBox="0 0 15 15">
            <path
              d="M11.78 4.03a.75.75 0 0 0-1.06-1.06L7.5 6.19 4.28 2.97a.75.75 0 1 0-1.06 1.06L6.44 7.5l-3.22 3.22a.75.75 0 1 0 1.06 1.06L7.5 8.56l3.22 3.22a.75.75 0 1 0 1.06-1.06L8.56 7.5l3.22-3.47Z"
              fill="currentColor"
            />
          </svg>
        </button>

        <div className="mb-3">
          <Link
            href={homeHref}
            className="inline-flex h-9 w-9 items-center justify-center rounded-md"
            aria-label={locale === "id" ? "Beranda" : "Home"}
          >
            <HomeIcon
              aria-hidden="true"
              className={`size-6 ${isHomeActive ? "fill-bumnblue-8" : "fill-bumnslate-4"}`}
            />
          </Link>
        </div>

        <ul className="mb-2 flex w-full flex-col space-y-2">
          {NAV_ORDER.map((seg) => {
            const href = navHref(locale, seg);
            const isActive = pathname === href;
            return (
              <li key={seg}>
                <Link
                  href={href}
                  className={`flex h-10 items-center rounded-lg px-3 text-sm font-medium
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

        <div className="border-t pt-4">
          <LangSwitcher locale={locale} />
        </div>

        <div className="mt-3 pt-2 pl-1">
          <UserIcon />
        </div>
      </div>
    </>
  );
}
