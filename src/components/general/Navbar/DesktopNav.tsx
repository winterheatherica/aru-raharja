"use client";

import Link from "next/link";
import { MENU } from "@/lib/nav";
import LangSwitcher from "./LangSwitcher";
import { useEffect, useRef } from "react";

type Props = {
  open: boolean;
  onRequestClose: () => void;
  attachTo?: React.RefObject<HTMLDivElement>;
};

export default function DesktopNav({ open, onRequestClose, attachTo }: Props) {
  const panelRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function onClickOutside(e: MouseEvent) {
      if (!open) return;
      const t = e.target as Node;
      if (
        panelRef.current &&
        !panelRef.current.contains(t) &&
        !(attachTo?.current && attachTo.current.contains(t))
      ) {
        onRequestClose();
      }
    }
    document.addEventListener("mousedown", onClickOutside);
    return () => document.removeEventListener("mousedown", onClickOutside);
  }, [open, onRequestClose, attachTo]);

  return (
    <div
      id="desktop-nav-panel"
      ref={panelRef}
      className={`pointer-events-none absolute right-0 top-0 z-0 flex h-[86px] w-[980px] items-center gap-3 rounded-2xl bg-white px-6 opacity-0 transition-all duration-500 ease-in-out
        ${open ? "pointer-events-auto translate-x-0 opacity-100" : "translate-x-24"}`}
    >
      <Link
        href="/id"
        className="inline-flex h-9 w-9 items-center justify-center rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
        aria-label="Home"
      >
        <svg width="24" height="24" viewBox="0 0 24 24" className="fill-blue-600" aria-hidden="true">
          <path d="M10.7715 4.79055C11.1154 4.51458 11.5503 4.36328 11.9996 4.36328C12.4489 4.36328 12.8838 4.51458 13.2278 4.79055L18.9551 9.38867C19.1683 9.55971 19.3397 9.77321 19.4573 10.0142C19.575 10.2552 19.6359 10.5178 19.636 10.7837V18.4209C19.636 18.7431 19.5019 19.0522 19.2632 19.2801C19.0246 19.508 18.7008 19.636 18.3633 19.636H14.8633C14.5257 19.636 14.202 19.508 13.9633 19.2801C13.7246 19.0522 13.5906 18.7431 13.5906 18.4209V14.1679H10.4087V18.4209C10.4087 18.7431 10.2746 19.0522 10.036 19.2801C9.79728 19.508 9.47356 19.636 9.13601 19.636H5.63601C5.29846 19.636 4.97474 19.508 4.73605 19.2801C4.49737 19.0522 4.36328 18.7431 4.36328 18.4209V10.7831C4.36335 10.5172 4.42434 10.2546 4.54196 10.0136C4.65959 9.7726 4.831 9.5591 5.04419 9.38806L10.7715 4.78994V4.79055Z" />
        </svg>
      </Link>

      <ul className="flex items-center space-x-1 whitespace-nowrap">
        {MENU.map((m) => (
          <li key={m.href}>
            <Link
              href={m.href}
              className="rounded-lg p-3 text-sm font-medium text-neutral-600 hover:text-neutral-900 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
            >
              {m.label}
            </Link>
          </li>
        ))}
      </ul>

      <LangSwitcher />

      <div className="ml-2 flex items-center">
        <button
          type="button"
          aria-label="User"
          className="rounded-lg p-2 hover:bg-neutral-200 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
        >
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="text-neutral-700"
            aria-hidden="true"
          >
            <path d="M18 20a6 6 0 0 0-12 0"></path>
            <circle cx="12" cy="10" r="4"></circle>
            <circle cx="12" cy="12" r="10"></circle>
          </svg>
        </button>
      </div>
    </div>
  );
}
