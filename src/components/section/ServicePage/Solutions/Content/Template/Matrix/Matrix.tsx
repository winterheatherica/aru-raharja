"use client";

import * as React from "react";

type Column = {
  id: string;
  label: string;
  sublabel?: string;
  popular?: boolean;
};

type CellValue = boolean | string | number | null | undefined;

type Row = {
  feature: string;
  hint?: string;
  values: Record<string, CellValue>;
};

type Props = {
  columns: Column[];
  rows: Row[];
  title?: string;
  description?: string;
  footnote?: string;
  className?: string;
  compact?: boolean;
};

export default function Matrix({
  columns,
  rows,
  title,
  description,
  footnote,
  className = "",
  compact = false,
}: Props) {
  const cellPad = compact ? "px-3 py-2" : "px-4 py-3";

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

      <div className="relative overflow-x-auto rounded-2xl border border-bumnslate-10 bg-white shadow-bumn-2">
        <table className="w-full border-collapse text-sm">
          <thead>
            <tr className="bg-bumnwhite-3">
              <th
                scope="col"
                className={`sticky left-0 z-10 ${cellPad} text-left font-semibold text-bumnblue-2 bg-bumnwhite-3`}
              >
                Fitur
              </th>

              {columns.map((col) => (
                <th
                  key={col.id}
                  scope="col"
                  className={`${cellPad} text-left font-semibold text-bumnblue-2 align-bottom`}
                >
                  <div
                    className={`inline-flex items-center gap-2 rounded-lg ${
                      col.popular
                        ? "ring-2 ring-bumnblue-5 px-2 py-1"
                        : ""
                    }`}
                  >
                    <span>{col.label}</span>
                    {col.sublabel && (
                      <span className="text-xs font-normal text-bumnslate-6">
                        {col.sublabel}
                      </span>
                    )}
                    {col.popular && (
                      <span className="ml-1 rounded-full bg-bumn-gradient-primary-7 px-2 py-0.5 text-[10px] font-semibold text-white">
                        Populer
                      </span>
                    )}
                  </div>
                </th>
              ))}
            </tr>
          </thead>

          <tbody>
            {rows.map((row, idx) => (
              <tr
                key={row.feature + idx}
                className={idx % 2 === 0 ? "bg-white" : "bg-bumnwhite-3/50"}
              >
                <th
                  scope="row"
                  className={`sticky left-0 z-10 ${cellPad} bg-inherit text-bumnslate-6 font-medium`}
                  title={row.hint || row.feature}
                >
                  {row.feature}
                  {row.hint && (
                    <span className="ml-1 align-middle text-bumnslate-5" aria-hidden>
                      <InfoIcon className="inline h-3.5 w-3.5" />
                    </span>
                  )}
                </th>

                {columns.map((col) => {
                  const v = row.values[col.id];
                  return (
                    <td
                      key={col.id}
                      className={`${cellPad} text-bumnslate-6 align-middle`}
                    >
                      <Cell value={v} />
                    </td>
                  );
                })}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {footnote && (
        <p className="mt-3 text-xs text-bumnslate-5 text-center">{footnote}</p>
      )}
    </section>
  );
}

function Cell({ value }: { value: CellValue }) {
  if (value === true) {
    return (
      <span className="inline-flex items-center gap-1 font-medium text-bumnblue-2">
        <CheckIcon className="h-4 w-4" />
        Termasuk
      </span>
    );
  }
  if (value === false || value == null) {
    return (
      <span className="inline-flex items-center gap-1 text-bumnslate-5">
        <MinusIcon className="h-4 w-4" />
        —
      </span>
    );
  }
  return <span className="text-bumnslate-6">{String(value)}</span>;
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
      <path
        d="M5 10h10"
        stroke="currentColor"
        strokeWidth={2}
        strokeLinecap="round"
      />
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
