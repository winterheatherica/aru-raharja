"use client";

import React from "react";
import type { Dictionary } from "@/i18n/get_dictionary";

type Props = {
  dict: Dictionary;
};

export default function Filters({ dict }: Props) {
  const t = dict.career?.registration?.filters;

  return (
    <div className="flex flex-col gap-4 lg:flex-row lg:justify-between">

      <div className="relative w-full lg:w-[400px]">
        <input
          className="flex h-9 w-full rounded-md border border-input transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50 px-4 py-6 font-sans text-base bg-white shadow-none text-bumngray-3 ps-12"
          placeholder={t?.searchPlaceholder ?? "Search Position"}
          defaultValue=""
          aria-label={t?.searchPlaceholder ?? "Search Position"}
        />
        <div className="absolute inset-y-0 flex items-center pointer-events-none start-0 ps-3">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24" height="24" viewBox="0 0 24 24" fill="none"
            stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
            className="lucide lucide-search w-6 h-6 text-bumnblue-5"
          >
            <circle cx="11" cy="11" r="8" />
            <path d="m21 21-4.3-4.3" />
          </svg>
        </div>
      </div>

      <div className="flex flex-col items-center gap-4 md:flex-row">
        <button
          type="button"
          role="combobox"
          aria-expanded="false"
          aria-label={t?.positionLabel ?? "All Positions"}
          className="flex h-9 items-center justify-between whitespace-nowrap rounded-md border border-input bg-transparent px-4 py-6 text-base font-sans text-bumngray-3 shadow-none ring-offset-background placeholder:text-muted-foreground focus:outline-none focus:ring-1 focus:ring-ring disabled:cursor-not-allowed disabled:opacity-50 [&>span]:line-clamp-1 w-full lg:w-[223px]"
        >
          <span style={{ pointerEvents: "none" }}>
            {t?.positionLabel ?? "All Positions"}
          </span>
          <svg width="15" height="15" viewBox="0 0 15 15" fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="w-6 h-6 text-bumnblue-5" aria-hidden="true"
          >
            <path
              d="M3.13523 6.15803C3.3241 5.95657 3.64052 5.94637 3.84197 6.13523L7.5 9.56464L11.158 6.13523C11.3595 5.94637 11.6759 5.95657 11.8648 6.15803C12.0536 6.35949 12.0434 6.67591 11.842 6.86477L7.84197 10.6148C7.64964 10.7951 7.35036 10.7951 7.15803 10.6148L3.15803 6.86477C2.95657 6.67591 2.94637 6.35949 3.13523 6.15803Z"
              fill="currentColor" fillRule="evenodd" clipRule="evenodd"
            />
          </svg>
        </button>

        <button
          type="button"
          role="combobox"
          aria-expanded="false"
          aria-label={t?.typeLabel ?? "All Types"}
          className="flex h-9 items-center justify-between whitespace-nowrap rounded-md border border-input bg-transparent px-4 py-6 text-base font-sans text-bumngray-3 shadow-none ring-offset-background placeholder:text-muted-foreground focus:outline-none focus:ring-1 focus:ring-ring disabled:cursor-not-allowed disabled:opacity-50 [&>span]:line-clamp-1 w-full lg:w-[223px]"
        >
          <span style={{ pointerEvents: "none" }}>
            {t?.typeLabel ?? "All Types"}
          </span>
          <svg width="15" height="15" viewBox="0 0 15 15" fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="w-6 h-6 text-bumnblue-5" aria-hidden="true"
          >
            <path
              d="M3.13523 6.15803C3.3241 5.95657 3.64052 5.94637 3.84197 6.13523L7.5 9.56464L11.158 6.13523C11.3595 5.94637 11.6759 5.95657 11.8648 6.15803C12.0536 6.35949 12.0434 6.67591 11.842 6.86477L7.84197 10.6148C7.64964 10.7951 7.35036 10.7951 7.15803 10.6148L3.15803 6.86477C2.95657 6.67591 2.94637 6.35949 3.13523 6.15803Z"
              fill="currentColor" fillRule="evenodd" clipRule="evenodd"
            />
          </svg>
        </button>

        <button
          className="inline-flex items-center gap-2 transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:shrink-0 hover:bg-accent hover:text-accent-foreground h-9 w-full lg:w-[223px] justify-between rounded-md whitespace-nowrap border border-input bg-transparent px-4 py-6 text-base font-sans text-bumngray-3 font-normal shadow-none ring-offset-background placeholder:text-bumngray-10 placeholder:italic overflow-hidden [&_svg]:size-6"
          role="combobox"
          aria-expanded="false"
          type="button"
          aria-haspopup="dialog"
          aria-label={t?.locationLabel ?? "All Locations"}
        >
          <span className="line-clamp-1">
            {t?.locationLabel ?? "All Locations"}
          </span>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24" height="24" viewBox="0 0 24 24" fill="none"
            stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
            className="lucide lucide-chevron-down w-6 h-6 text-bumnblue-5"
          >
            <path d="m6 9 6 6 6-6" />
          </svg>
        </button>
      </div>
    </div>
  );
}
