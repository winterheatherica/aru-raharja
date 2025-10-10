"use client";

import * as React from "react";

type NavItem = { id: string; label: string };

type DictShape = {
  service?: {
    solutions?: {
      nav?: readonly NavItem[];
    };
  };
};

type Props = {
  dict: DictShape;
  value: string;
  onChange: (id: string) => void;
  className?: string;
  orientation?: "horizontal" | "vertical";
};

export default function Navigation({
  dict,
  value,
  onChange,
  className = "",
  orientation = "horizontal",
}: Props) {
  const items = (dict?.service?.solutions?.nav as NavItem[] | undefined) ?? [];
  if (!items.length) return null;

  return (
    <div
      role="tablist"
      aria-orientation={orientation}
      tabIndex={0}
      data-orientation={orientation}
      className={[
        "grid grid-cols-1 lg:grid-cols-4 gap-2",
        "rounded-lg w-full p-1 bg-bumnwhite-3 text-bumnslate-3",
        className,
      ].join(" ")}
      style={{ outline: "none" }}
    >
      {items.map((tab) => {
        const isActive = value === tab.id;
        return (
          <button
            key={tab.id}
            type="button"
            role="tab"
            aria-selected={isActive}
            aria-controls={`content-${tab.id}`}
            data-state={isActive ? "active" : "inactive"}
            id={`tab-${tab.id}`}
            tabIndex={isActive ? 0 : -1}
            data-orientation={orientation}
            data-radix-collection-item=""
            onClick={() => onChange(tab.id)}
            className={[
              "items-center justify-center rounded-md px-3 py-2",
              "inline-flex w-full h-auto lg:h-[77px]",
              "ring-offset-background transition-all",
              "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",
              "disabled:pointer-events-none disabled:opacity-50",
              "text-xl font-medium whitespace-normal text-left lg:text-center",
              isActive
                ? "bg-bumn-gradient-primary-18 text-bumngray-1 shadow"
                : "",
            ].join(" ")}
          >
            <span
              className="leading-snug"
              dangerouslySetInnerHTML={{ __html: tab.label }}
            />
          </button>
        );
      })}
    </div>
  );
}
