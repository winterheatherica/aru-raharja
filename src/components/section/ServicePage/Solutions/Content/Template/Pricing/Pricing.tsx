"use client";

import * as React from "react";

type PricingItem = {
  id: string;
  service: string;
  price_monthly: number;
  price_yearly: number;
  popular: boolean;
  order_index: number;
  name: string;
  description?: string;
  features: string[];
  is_active: boolean;
};

type PricingTexts = {
  toggleMonthly: string;
  toggleYearly: string;
  popularBadge: string;
  cta: string;
  periodMonthly: string;
  periodYearly: string;
};

type Props = {
  items: PricingItem[];
  texts: PricingTexts;
};

export default function Pricing({ items, texts }: Props) {
  const [mode, setMode] =
    React.useState<"monthly" | "yearly">("monthly");

  if (!items || !items.length) return null;

  const sorted = [...items].sort(
    (a, b) => a.order_index - b.order_index
  );

  return (
    <section className="w-full">
      <div className="mb-5 flex items-center justify-center">
        <div className="inline-flex rounded-xl border border-bumnslate-10 bg-bumn-gradient-white-4 p-1">
          <button
            type="button"
            onClick={() => setMode("monthly")}
            aria-pressed={mode === "monthly"}
            className={[
              "px-4 py-2 text-sm rounded-lg transition",
              mode === "monthly"
                ? "bg-bumn-gradient-primary-7 text-white shadow-bumn-2"
                : "text-bumnslate-6",
            ].join(" ")}
          >
            {texts.toggleMonthly}
          </button>
          <button
            type="button"
            onClick={() => setMode("yearly")}
            aria-pressed={mode === "yearly"}
            className={[
              "px-4 py-2 text-sm rounded-lg transition",
              mode === "yearly"
                ? "bg-bumn-gradient-primary-7 text-white shadow-bumn-2"
                : "text-bumnslate-6",
            ].join(" ")}
          >
            {texts.toggleYearly}
          </button>
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
        {sorted.map((plan) => {
          const price =
            mode === "monthly"
              ? plan.price_monthly
              : plan.price_yearly;

          return (
            <article
              key={plan.id}
              className={[
                "relative flex h-full flex-col rounded-2xl border border-bumnslate-10 bg-bumn-gradient-white-4 p-5 shadow-bumn-2",
                plan.popular
                  ? "ring-2 ring-bumnblue-5"
                  : "",
              ].join(" ")}
            >
              {plan.popular && (
                <div className="absolute -top-3 right-4 select-none rounded-full bg-bumn-gradient-primary-7 px-3 py-1 text-xs font-semibold text-white shadow-bumn-5">
                  {texts.popularBadge}
                </div>
              )}

              <header className="mb-3">
                <h3 className="text-lg font-semibold text-bumnblue-2">
                  {plan.name}
                </h3>
                {plan.description && (
                  <p className="mt-1 text-sm text-bumnslate-5">
                    {plan.description}
                  </p>
                )}
              </header>

              <div className="mb-4 flex items-baseline gap-2">
                <span className="text-3xl font-bold text-bumnblue-2">
                  {fmtIDR(price)}
                </span>
                <span className="text-sm text-bumnslate-5">
                  /
                  {mode === "monthly"
                    ? texts.periodMonthly
                    : texts.periodYearly}
                </span>
              </div>

              <ul className="mb-5 space-y-2">
                {plan.features?.map((f, i) => (
                  <li
                    key={i}
                    className="flex items-start gap-2 text-sm text-bumnslate-6"
                  >
                    <CheckIcon />
                    <span>{f}</span>
                  </li>
                ))}
              </ul>

              <div className="mt-auto pt-1">
                <a
                  href={`/contact?plan=${encodeURIComponent(
                    plan.name
                      .toLowerCase()
                      .replace(/\s+/g, "-")
                  )}`}
                  className="inline-flex w-full items-center justify-center gap-2 rounded-xl bg-bumn-gradient-primary-7 px-4 py-2 font-medium text-bumngray-1 transition hover:opacity-95 focus:outline-none focus:ring-2 focus:ring-bumnblue-5"
                >
                  {texts.cta}
                </a>
              </div>
            </article>
          );
        })}
      </div>
    </section>
  );
}

function fmtIDR(v: number) {
  return new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    maximumFractionDigits: 0,
  }).format(Math.round(v || 0));
}

function CheckIcon() {
  return (
    <svg
      className="mt-0.5 h-4 w-4 shrink-0"
      viewBox="0 0 20 20"
      fill="none"
      aria-hidden="true"
      role="img"
    >
      <path
        d="M16.667 5.833 8.75 13.75l-3.417-3.416"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

