"use client";

import * as React from "react";

export type ComparisonItem = {
  id: string;
  title: string;
  subtitle?: string;
  badge?: string;
  ctaLabel?: string;
  ctaHref?: string;
  meta?: Array<{ label: string; value: string }>;
};

export type ComparisonSection = {
  id: string;
  title: string;
  rows: Array<{
    key: string;
    label: string;
    hint?: string;
    values: Record<string, boolean | string | number | null | undefined>;
  }>;
};

type Props = {
  title?: string;
  description?: string;
  items: ComparisonItem[];
  sections: ComparisonSection[];
  showDiffToggle?: boolean;
  defaultShowDiff?: boolean;
  className?: string;
};

export default function Comparison({
  title,
  description,
  items,
  sections,
  showDiffToggle = true,
  defaultShowDiff = false,
  className = "",
}: Props) {
  const [onlyDiff, setOnlyDiff] = React.useState(defaultShowDiff);

  const isRowAllEqual = (row: ComparisonSection["rows"][number]) => {
    const arr = items.map((it) => row.values[it.id]);
    return arr.every((v) => eqCell(v, arr[0]));
  };

  const visibleSections = React.useMemo(() => {
    if (!onlyDiff) return sections;
    return sections
      .map((sec) => ({
        ...sec,
        rows: sec.rows.filter((r) => !isRowAllEqual(r)),
      }))
      .filter((sec) => sec.rows.length > 0);
  }, [sections, onlyDiff, items]);

  const headerGridTemplate = `repeat(${Math.max(1, items.length)}, minmax(220px, 1fr))`;

  return (
    <section className={`w-full ${className}`}>
      {(title || description) && (
        <header className="mb-4 space-y-1">
          {title && (
            <h3 className="text-xl font-semibold text-bumnblue-2">{title}</h3>
          )}
          {description && (
            <p className="text-sm text-bumnslate-6">{description}</p>
          )}
        </header>
      )}

      <div className="relative overflow-x-auto pt-6">
        <div className="min-w-[720px] flex justify-center">
          <div
            className="grid gap-3 w-full"
            style={{ gridTemplateColumns: headerGridTemplate } as React.CSSProperties}
          >
            {items.map((it) => (
              <div key={it.id} className="px-3">
                <article className="relative rounded-2xl border border-bumnslate-10 bg-white p-4 text-bumnslate-6 shadow-bumn-2">
                  {it.badge && (
                    <span className="absolute top-0 -translate-y-1/2 right-4 rounded-full bg-bumn-gradient-primary-7 px-3 py-1 text-xs font-semibold text-white shadow-bumn-5 transform">
                      {it.badge}
                    </span>
                  )}
                  <h4 className="text-base font-semibold text-bumnblue-2">
                    {it.title}
                  </h4>
                  {it.subtitle && (
                    <div className="text-xs text-bumnslate-6">{it.subtitle}</div>
                  )}

                  {Array.isArray(it.meta) && it.meta.length > 0 && (
                    <div className="mt-3 grid gap-2 sm:grid-cols-2">
                      {it.meta.map((m, idx) => (
                        <div key={idx} className="rounded-xl border border-bumnslate-10 bg-bumnwhite-3 px-3 py-2 text-xs">
                          <span className="text-bumnslate-6">{m.label}</span>
                          <span className="ml-2 font-medium text-bumnblue-2">{m.value}</span>
                        </div>
                      ))}
                    </div>
                  )}

                  {it.ctaHref && (
                    <div className="mt-3">
                      <a
                        href={it.ctaHref}
                        className="inline-flex w-full items-center justify-center rounded-xl bg-bumn-gradient-primary-7 px-4 py-2 text-sm font-semibold text-white hover:opacity-95"
                      >
                        {it.ctaLabel || "Pilih Paket"}
                      </a>
                    </div>
                  )}
                </article>
              </div>
            ))}
          </div>
        </div>
      </div>

      {showDiffToggle && (
        <div className="mt-3 flex items-center justify-end">
          <label className="inline-flex cursor-pointer items-center gap-2 text-sm text-bumnslate-6">
            <input
              type="checkbox"
              className="h-4 w-4 rounded border-bumnslate-10 text-bumnblue-5 focus:ring-bumnblue-5"
              checked={onlyDiff}
              onChange={(e) => setOnlyDiff(e.target.checked)}
            />
            Only show differences
          </label>
        </div>
      )}

      <div className="relative mt-3 overflow-x-auto rounded-2xl border border-bumnslate-10 bg-white shadow-bumn-2">
        <table className="w-full border-collapse text-sm">
          <thead>
            <tr className="bg-bumnwhite-3">
              <th
                scope="col"
                className="sticky left-0 z-10 px-4 py-3 text-left font-semibold text-bumnblue-2 bg-bumnwhite-3"
              >
                Fitur
              </th>
              {items.map((it) => (
                <th
                  key={it.id}
                  scope="col"
                  className="px-4 py-3 text-left font-semibold text-bumnblue-2"
                >
                  {it.title}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {visibleSections.map((sec, sIdx) => (
              <SectionGroup key={sec.id} section={sec} items={items} zebraStart={sIdx % 2 === 0} />
            ))}
          </tbody>
        </table>

        {visibleSections.length === 0 && (
          <div className="p-4 text-center text-sm text-bumnslate-6">
            Tidak ada perbedaan pada item yang dibandingkan.
          </div>
        )}
      </div>
    </section>
  );
}

function SectionGroup({
  section,
  items,
  zebraStart,
}: {
  section: ComparisonSection;
  items: ComparisonItem[];
  zebraStart: boolean;
}) {
  return (
    <>
      <tr className="bg-bumnwhite-3">
        <th
          colSpan={1 + items.length}
          className="px-4 py-2 text-left text-xs font-semibold uppercase tracking-wide text-bumnslate-6"
        >
          {section.title}
        </th>
      </tr>

      {section.rows.map((row, idx) => {
        const same = isAllEqual(items, row);
        const zebra = (zebraStart ? idx % 2 === 0 : idx % 2 !== 0) ? "bg-white" : "bg-bumnwhite-3";
        return (
          <tr key={row.key} className={`${zebra}`}>
            <th
              scope="row"
              className="sticky left-0 z-10 px-4 py-3 bg-inherit text-bumnslate-6 font-medium"
              title={row.hint || row.label}
            >
              {row.label}
              {row.hint && (
                <span className="ml-1 align-middle text-bumnslate-5" aria-hidden>
                  <InfoIcon className="inline h-3.5 w-3.5" />
                </span>
              )}
            </th>

            {items.map((it) => {
              const v = row.values[it.id];
              const diffClass = same ? "" : "ring-1 ring-bumnblue-5/40";
              return (
                <td key={it.id} className={`px-4 py-3 text-bumnslate-6 align-top ${diffClass}`}>
                  <Cell value={v} />
                </td>
              );
            })}
          </tr>
        );
      })}
    </>
  );
}

function Cell({ value }: { value: boolean | string | number | null | undefined }) {
  if (value === true) {
    return (
      <span className="inline-flex items-center gap-1 font-medium text-bumnblue-2">
        <CheckIcon className="h-4 w-4" /> Termasuk
      </span>
    );
  }
  if (value === false || value == null) {
    return (
      <span className="inline-flex items-center gap-1 text-bumnslate-5">
        <MinusIcon className="h-4 w-4" /> —
      </span>
    );
  }
  return <span className="text-bumnslate-6">{String(value)}</span>;
}

function eqCell(a: any, b: any) {
  if (typeof a === "number" && typeof b === "number") {
    return Object.is(a, b);
  }
  return String(a) === String(b);
}

function isAllEqual(items: ComparisonItem[], row: ComparisonSection["rows"][number]) {
  const arr = items.map((it) => row.values[it.id]);
  return arr.every((v) => eqCell(v, arr[0]));
}

function CheckIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 20 20" fill="none" {...props}>
      <path
        d="M16.667 5.833 8.75 13.75l-3.417-3.416"
        stroke="currentColor"
        strokeWidth={2}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
function MinusIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 20 20" fill="none" {...props}>
      <path d="M5 10h10" stroke="currentColor" strokeWidth={2} strokeLinecap="round" />
    </svg>
  );
}
function InfoIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 20 20" fill="none" {...props}>
      <circle cx="10" cy="10" r="8" stroke="currentColor" strokeWidth={1.5} />
      <circle cx="10" cy="6.5" r="1" fill="currentColor" />
      <path d="M10 9v5" stroke="currentColor" strokeWidth={1.5} />
    </svg>
  );
}
