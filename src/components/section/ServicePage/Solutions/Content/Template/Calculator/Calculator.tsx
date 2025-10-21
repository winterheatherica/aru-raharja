"use client";

import * as React from "react";

type NumberLike = number | string;

type FieldBase = {
  id: string;
  label: string;
  hint?: string;
  required?: boolean;
  className?: string;
};

type NumberField = FieldBase & {
  type?: "number";
  min?: number;
  max?: number;
  step?: number;
  placeholder?: string;
  defaultValue?: number;
  suffix?: string;
  prefix?: string;
};

type SelectField = FieldBase & {
  type: "select";
  options: Array<{ label: string; value: NumberLike }>;
  defaultValue?: NumberLike;
};

type Field = NumberField | SelectField;

type ResultSpec = {
  id: string;
  label: string;
  formatter?: "idr" | "number" | ((v: number) => string);
  highlight?: boolean;
  note?: string;
};

type Props = {
  title?: string;
  description?: string;
  fields: Field[];
  results: ResultSpec[];
  compute: (values: Record<string, number>) => Record<string, number>;
  footnote?: string;
  className?: string;
  defaultCollapsed?: boolean;
};

export default function Calculator({
  title,
  description,
  fields,
  results,
  compute,
  footnote,
  className = "",
  defaultCollapsed = false,
}: Props) {
  const [values, setValues] = React.useState<Record<string, NumberLike>>(() => {
    const init: Record<string, NumberLike> = {};
    for (const f of fields) {
      if (f.type === "select") {
        init[f.id] = f.defaultValue ?? (f.options?.[0]?.value ?? "");
      } else {
        init[f.id] = (f as NumberField).defaultValue ?? 0;
      }
    }
    return init;
  });

  const [collapsed, setCollapsed] = React.useState(defaultCollapsed);

  const numericValues = React.useMemo<Record<string, number>>(() => {
    const out: Record<string, number> = {};
    for (const k of Object.keys(values)) {
      const raw = values[k];
      const num =
        typeof raw === "number"
          ? raw
          : typeof raw === "string"
          ? Number(
              raw
                .toString()
                .replace(/[^\d.-]/g, "")
                .replace(/(\..*)\./g, "$1")
            )
          : 0;
      out[k] = Number.isFinite(num) ? num : 0;
    }
    return out;
  }, [values]);

  const computed = React.useMemo(() => {
    try {
      return compute(numericValues);
    } catch {
      return {};
    }
  }, [numericValues, compute]);

  const fmt = {
    idr: (v: number) =>
      new Intl.NumberFormat("id-ID", {
        style: "currency",
        currency: "IDR",
        maximumFractionDigits: 0,
      }).format(Math.round(v || 0)),
    number: (v: number) =>
      new Intl.NumberFormat("id-ID", {
        maximumFractionDigits: 2,
      }).format(v || 0),
  };

  const formatBy = (v: number, spec?: ResultSpec["formatter"]) => {
    if (!spec) return fmt.number(v);
    if (spec === "idr") return fmt.idr(v);
    if (spec === "number") return fmt.number(v);
    if (typeof spec === "function") return spec(v);
    return fmt.number(v);
  };

  const onChangeField = (id: string, next: NumberLike) => {
    setValues((s) => ({ ...s, [id]: next }));
  };

  const onReset = () => {
    setValues(() => {
      const init: Record<string, NumberLike> = {};
      for (const f of fields) {
        if (f.type === "select") {
          init[f.id] = f.defaultValue ?? (f.options?.[0]?.value ?? "");
        } else {
          init[f.id] = (f as NumberField).defaultValue ?? 0;
        }
      }
      return init;
    });
  };

  return (
    <section className={`w-full ${className}`}>
      {(title || description) && (
        <header className="mb-4">
          {title && (
            <h3 className="text-xl font-semibold text-bumnblue-2">{title}</h3>
          )}
          {description && (
            <p className="mt-1 text-sm text-bumnslate-6">{description}</p>
          )}
        </header>
      )}

      <div className="rounded-2xl border border-bumnslate-10 bg-white shadow-bumn-2">
        <button
          type="button"
          onClick={() => setCollapsed((c) => !c)}
          className="flex w-full items-center justify-between px-4 py-3"
          aria-expanded={!collapsed}
        >
          <span className="text-sm font-medium text-bumnblue-2">
            Parameter
          </span>
          <ChevronIcon
            className={`h-4 w-4 text-bumnslate-6 transition-transform ${
              collapsed ? "-rotate-90" : "rotate-0"
            }`}
          />
        </button>

        {!collapsed && (
          <div className="grid gap-4 border-t border-bumnslate-10 p-4 md:grid-cols-2 lg:grid-cols-3">
            {fields.map((f) => (
              <div key={f.id} className={f.className}>
                <label className="mb-1 block text-xs font-medium text-bumnslate-6">
                  <span>{f.label}</span>
                  {f.hint && (
                    <span className="ml-1 align-middle text-bumnslate-5">
                      <InfoIcon className="inline h-3.5 w-3.5" />
                    </span>
                  )}
                </label>

                {f.type === "select" ? (
                  <select
                    className="w-full rounded-lg border border-bumnslate-10 bg-white px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-bumnblue-5"
                    value={values[f.id] as NumberLike}
                    onChange={(e) => onChangeField(f.id, e.target.value)}
                  >
                    {(f.options || []).map((opt) => (
                      <option key={String(opt.value)} value={opt.value}>
                        {opt.label}
                      </option>
                    ))}
                  </select>
                ) : (
                  <div className="flex items-stretch overflow-hidden rounded-lg border border-bumnslate-10">
                    {f.prefix && (
                      <span className="flex items-center px-2 text-sm text-bumnslate-6">
                        {f.prefix}
                      </span>
                    )}
                    <input
                      type="number"
                      inputMode="decimal"
                      className="w-full px-3 py-2 text-sm outline-none"
                      placeholder={(f as NumberField).placeholder}
                      min={(f as NumberField).min}
                      max={(f as NumberField).max}
                      step={(f as NumberField).step ?? 1}
                      value={String(values[f.id] ?? "")}
                      onChange={(e) => onChangeField(f.id, e.target.value)}
                    />
                    {f.suffix && (
                      <span className="flex items-center px-2 text-sm text-bumnslate-6">
                        {f.suffix}
                      </span>
                    )}
                  </div>
                )}
              </div>
            ))}
          </div>
        )}

        <div className="flex items-center justify-between px-4 py-3">
          <button
            type="button"
            onClick={onReset}
            className="text-xs text-bumnslate-6 underline underline-offset-2 hover:text-bumnblue-2"
          >
            Reset
          </button>
          <div className="text-xs text-bumnslate-5">
            Hasil dihitung otomatis saat Anda mengubah input.
          </div>
        </div>
      </div>

      <div className="mt-4 grid gap-4 md:grid-cols-2 xl:grid-cols-3">
        {results.map((r) => {
          const val = Number(computed[r.id] ?? 0);
          const content = formatBy(val, r.formatter);

          return (
            <article
              key={r.id}
              className={`rounded-2xl border p-4 shadow-bumn-2 ${
                r.highlight
                  ? "border-bumnblue-5 bg-bumn-gradient-primary-7 text-white"
                  : "border-bumnslate-10 bg-white"
              }`}
            >
              <div
                className={`text-xs ${
                  r.highlight ? "text-white/80" : "text-bumnslate-6"
                }`}
              >
                {r.label}
              </div>
              <div
                className={`mt-1 text-2xl font-semibold ${
                  r.highlight ? "text-white" : "text-bumnblue-2"
                }`}
              >
                {content}
              </div>
              {r.note && !r.highlight && (
                <div className="mt-1 text-xs text-bumnslate-5">{r.note}</div>
              )}
            </article>
          );
        })}
      </div>

      {footnote && (
        <p className="mt-3 text-center text-xs text-bumnslate-5">{footnote}</p>
      )}
    </section>
  );
}

function ChevronIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 20 20" fill="none" {...props}>
      <path
        d="M6 8l4 4 4-4"
        stroke="currentColor"
        strokeWidth={1.8}
        strokeLinecap="round"
        strokeLinejoin="round"
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
