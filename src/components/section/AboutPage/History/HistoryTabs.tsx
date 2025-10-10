"use client";

import { useState } from "react";

export type HistoryItem = {
  year: string;
  content: React.ReactNode;
};

export default function HistoryTabs({
  items,
  defaultYear,
}: {
  items: HistoryItem[];
  defaultYear?: string;
}) {
  const [active, setActive] = useState<string>(
    defaultYear ?? items[0]?.year ?? ""
  );

  if (!items?.length) return null;

  return (
    <div className="mt-8 lg:mt-12 grid grid-cols-12 gap-4">
      {/* Sidebar years */}
      <div className="col-span-12 lg:col-span-3">
        <div className="mb-6 text-lg font-medium text-bumngreen-1">
          Track Record
        </div>
        <div className="flex w-full p-2">
          <div className="w-[7px] bg-bumn-gradient-primary-4 mt-14" />
          <div className="flex flex-col w-full px-2">
            <div className="pb-3 mb-3 text-sm font-medium border-b text-bumngreen-1">
              Year
            </div>
            <div className="flex flex-col space-y-2 max-h-[520px] overflow-auto pr-1">
              {items.map((it) => {
                const isActive = active === it.year;
                return (
                  <button
                    key={it.year}
                    onClick={() => setActive(it.year)}
                    className={`inline-flex items-center justify-start whitespace-nowrap rounded-md px-3 py-2 text-base transition-all
                      focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2
                      ${isActive ? "bg-bumn-gradient-primary-18 text-bumngray-1 shadow" : "text-bumnslate-3"}
                    `}
                  >
                    {it.year}
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      </div>

      {/* Panel */}
      <div className="col-span-12 lg:col-span-9">
        {items.map(
          (it) =>
            it.year === active && (
              <div
                key={it.year}
                className="mt-2 rounded-xl bg-white shadow-none"
              >
                <div className="flex flex-col space-y-1.5 p-6 pt-0">
                  <h3 className="font-semibold tracking-tight text-2xl text-bumngreen-1">
                    {it.year}
                  </h3>
                </div>
                <div className="p-6 pt-0">
                  <div className="p-4 space-y-5 text-base rounded-lg lg:p-6 font-lato text-bumnslate-6 bg-bumncyan-1">
                    {it.content}
                  </div>
                </div>
              </div>
            )
        )}
      </div>
    </div>
  );
}
