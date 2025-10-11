"use client";

import * as React from "react";

type Tier = {
  id: string;
  name: string;
  description?: string;
  priceMonthly: number;
  priceYearly: number;
  features: string[];
  ctaLabel?: string;
  ctaHref?: string;
  popular?: boolean;
};

type Props = {
  tiers: Tier[];
  billingToggle?: boolean;
  currency?: string;
  note?: string;
  defaultPeriod?: "monthly" | "yearly";
  className?: string;
};

export default function Pricing({
  tiers,
  billingToggle = true,
  currency = "IDR",
  note,
  defaultPeriod = "monthly",
  className = "",
}: Props) {
  const [period, setPeriod] = React.useState<"monthly" | "yearly">(defaultPeriod);

  const fmt = (v: number) =>
    new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency,
      maximumFractionDigits: 0,
    }).format(v);

  return (
    <section className={`w-full ${className}`}>
      {billingToggle && (
        <div className="mb-5 flex items-center justify-center">
          <div className="inline-flex rounded-xl border border-bumnslate-10 bg-bumnwhite-3 p-1">
            <button
              type="button"
              onClick={() => setPeriod("monthly")}
              className={`px-4 py-2 text-sm rounded-lg transition
               ${period === "monthly" ? "bg-bumn-gradient-primary-10 text-white shadow-bumn-2" : "text-bumnslate-6"}`}
              aria-pressed={period === "monthly"}
            >
              Bulanan
            </button>
            <button
              type="button"
              onClick={() => setPeriod("yearly")}
              className={`px-4 py-2 text-sm rounded-lg transition
               ${period === "yearly" ? "bg-bumn-gradient-primary-10 text-white shadow-bumn-2" : "text-bumnslate-6"}`}
              aria-pressed={period === "yearly"}
            >
              Tahunan
            </button>
          </div>
        </div>
      )}

      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
        {tiers.map((t) => {
          const price = period === "monthly" ? t.priceMonthly : t.priceYearly;
          const suffix = period === "monthly" ? "/bln" : "/thn";
          return (
            <article
              key={t.id}
              className={`relative flex h-full flex-col rounded-2xl border border-bumnslate-10 bg-white p-5 shadow-bumn-2 ${
                t.popular ? "ring-2 ring-bumnblue-5" : ""
              }`}
            >
              {t.popular && (
                <div className="absolute -top-3 right-4 select-none rounded-full bg-bumn-gradient-primary-5 px-3 py-1 text-xs font-semibold text-white shadow-bumn-5">
                  Paling Populer
                </div>
              )}

              <header className="mb-3">
                <h3 className="text-lg font-semibold text-bumnblue-2">{t.name}</h3>
                {t.description && (
                  <p className="mt-1 text-sm text-bumnslate-5">{t.description}</p>
                )}
              </header>

              <div className="mb-4 flex items-baseline gap-2">
                <span className="text-3xl font-bold text-bumnblue-2">{fmt(price)}</span>
                <span className="text-sm text-bumnslate-5">{suffix}</span>
              </div>

              <ul className="mb-5 space-y-2">
                {t.features.map((f, i) => (
                  <li key={i} className="flex items-start gap-2 text-sm text-bumnslate-6">
                    <CheckIcon className="mt-0.5 h-4 w-4 shrink-0" />
                    <span>{f}</span>
                  </li>
                ))}
              </ul>

              <div className="mt-auto pt-1">
                <a
                  href={t.ctaHref || "#"}
                  className="inline-flex w-full items-center justify-center gap-2 rounded-xl bg-bumn-gradient-primary-18 px-4 py-2 font-medium text-bumngray-1 transition hover:opacity-95 focus:outline-none focus:ring-2 focus:ring-bumnblue-5"
                >
                  {t.ctaLabel || "Mulai Sekarang"}
                </a>
              </div>
            </article>
          );
        })}
      </div>

      {note && (
        <p className="mt-4 text-center text-xs text-bumnslate-5">{note}</p>
      )}
    </section>
  );
}

function CheckIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      {...props}
      viewBox="0 0 20 20"
      fill="none"
      aria-hidden="true"
      role="img"
    >
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
