"use client";

import * as React from "react";

type YearSelectorProps = {
  years: string[];
  selectedYear: string;
  onChange: (year: string) => void;
};

export default function YearSelector({
  years,
  selectedYear,
  onChange,
}: YearSelectorProps) {
  return (
    <div className="flex w-full p-2">
      <div className="w-[7px] bg-bumn-gradient-primary-4 mt-14 rounded" />

      <div className="flex flex-col w-full px-2">
        <div className="pb-3 mb-3 text-sm font-medium border-b font-inter text-bumngreen-1">
          Year
        </div>

        <div>
          <div className="flex flex-col items-center justify-start h-full p-1 space-y-2 bg-white rounded-lg text-bumnslate-3">
            {years.map((y) => {
              const active = y === selectedYear;
              return (
                <button
                  key={y}
                  onClick={() => onChange(y)}
                  aria-current={active ? "page" : undefined}
                  className={[
                    "inline-flex items-center justify-center whitespace-nowrap rounded-md px-3 py-2 text-base font-normal transition-all w-full",
                    active
                      ? "bg-bumn-gradient-primary-18 text-bumngray-1 shadow"
                      : "hover:bg-bumnwhite-1",
                  ].join(" ")}
                >
                  {y}
                </button>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
