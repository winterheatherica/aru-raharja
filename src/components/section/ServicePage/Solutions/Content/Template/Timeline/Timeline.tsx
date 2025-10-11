"use client";

import * as React from "react";

export type TimelineStep = {
  id: string;
  title: string;
  subtitle?: string;
  description?: string;
  status?: "done" | "current" | "upcoming";
  meta?: Array<{ label: string; value: string }>;
};

type Props = {
  title?: string;
  description?: string;
  steps: TimelineStep[];
  numbered?: boolean;
  compact?: boolean;
  horizontalMd?: boolean;
  showProgress?: boolean;
  className?: string;
};

export default function Timeline({
  title,
  description,
  steps,
  numbered = true,
  compact = false,
  horizontalMd = false,
  showProgress = true,
  className = "",
}: Props) {
  const total = steps.length || 1;
  const doneCount = steps.filter((s) => s.status === "done").length;
  const currentIdx = steps.findIndex((s) => s.status === "current");
  const progressRatio =
    doneCount > 0
      ? doneCount / total
      : currentIdx >= 0
      ? (currentIdx + 1) / total
      : 0;

  const padY = compact ? "py-2" : "py-3";
  const padCard = compact ? "p-3" : "p-4";

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

      {showProgress && (
        <div className="mb-4">
          <div className="h-2 w-full overflow-hidden rounded-full bg-bumnslate-10">
            <div
              className="h-full bg-bumn-gradient-primary-10 transition-all"
              style={{ width: `${Math.min(100, Math.max(0, progressRatio * 100))}%` }}
              aria-label="Progress"
              role="progressbar"
              aria-valuemin={0}
              aria-valuemax={100}
              aria-valuenow={Math.round(progressRatio * 100)}
            />
          </div>
          <div className="mt-1 text-right text-xs text-bumnslate-6">
            {Math.round(progressRatio * 100)}% selesai
          </div>
        </div>
      )}

      <div
        className={
          horizontalMd
            ?
              "relative flex flex-col gap-6 md:flex-row md:items-stretch md:justify-between"
            :
              "relative flex flex-col gap-4"
        }
      >
        {horizontalMd && (
          <div className="pointer-events-none absolute left-0 top-[32px] hidden h-[2px] w-full md:block">
            <div className="h-[2px] w-full bg-bumnslate-10" />
          </div>
        )}

        {steps.map((s, i) => {
          const isLast = i === steps.length - 1;
          const status = s.status ?? "upcoming";
          const color =
            status === "done"
              ? "bg-bumnblue-5 text-white"
              : status === "current"
              ? "bg-bumn-gradient-primary-10 text-white"
              : "bg-white text-bumnslate-6";

          const ring =
            status === "upcoming"
              ? "ring-1 ring-bumnslate-10"
              : "ring-2 ring-bumnblue-5";

          return (
            <div
              key={s.id}
              className={
                horizontalMd
                  ? "relative md:flex md:w-0 md:flex-1 md:flex-col md:items-center"
                  : "relative flex gap-4"
              }
            >
              {!horizontalMd && (
                <>
                  {!isLast && (
                    <span
                      className="absolute left-[12px] top-[36px] h-[calc(100%-36px)] w-[2px] bg-bumnslate-10"
                      aria-hidden
                    />
                  )}

                  <span
                    className={`mt-1 inline-flex h-6 w-6 shrink-0 items-center justify-center rounded-full ${color} ${ring} shadow-bumn-2`}
                    aria-hidden
                  >
                    {numbered ? (
                      <span className="text-xs font-semibold">
                        {i + 1}
                      </span>
                    ) : (
                      <DotIcon className="h-3.5 w-3.5" />
                    )}
                  </span>
                </>
              )}

              {horizontalMd && (
                <div className="hidden md:flex md:flex-col md:items-center">
                  <span
                    className={`z-10 inline-flex h-8 w-8 items-center justify-center rounded-full ${color} ${ring} shadow-bumn-2`}
                  >
                    {numbered ? (
                      <span className="text-xs font-semibold">{i + 1}</span>
                    ) : (
                      <DotIcon className="h-3.5 w-3.5" />
                    )}
                  </span>
                </div>
              )}

              <div
                className={`mt-0 ${padCard} rounded-2xl border bg-white shadow-bumn-2 ${
                  horizontalMd ? "md:mt-4 md:w-full" : "ml-2 w-full"
                } ${
                  status === "current"
                    ? "border-bumnblue-5"
                    : "border-bumnslate-10"
                }`}
              >
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <div className="text-sm font-semibold text-bumnblue-2">
                      {s.title}
                    </div>
                    {s.subtitle && (
                      <div className="text-xs text-bumnslate-6">{s.subtitle}</div>
                    )}
                  </div>

                  <StatusBadge status={status} />
                </div>

                {s.description && (
                  <p className={`mt-2 text-sm ${status === "upcoming" ? "text-bumnslate-6" : "text-bumnslate-6"}`}>
                    {s.description}
                  </p>
                )}

                {Array.isArray(s.meta) && s.meta.length > 0 && (
                  <div className="mt-3 grid gap-2 sm:grid-cols-2">
                    {s.meta.map((m, idx) => (
                      <div
                        key={idx}
                        className="rounded-xl border border-bumnslate-10 bg-bumnwhite-3 px-3 py-2 text-xs"
                      >
                        <span className="text-bumnslate-6">{m.label}</span>
                        <span className="ml-2 font-medium text-bumnblue-2">
                          {m.value}
                        </span>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}

function StatusBadge({ status }: { status: "done" | "current" | "upcoming" }) {
  if (status === "done") {
    return (
      <span className="inline-flex items-center gap-1 rounded-full bg-bumncyan-1 px-2 py-1 text-[11px] font-medium text-bumnblue-2">
        <CheckIcon className="h-3.5 w-3.5" /> Selesai
      </span>
    );
  }
  if (status === "current") {
    return (
      <span className="inline-flex items-center gap-1 rounded-full bg-bumn-gradient-primary-10 px-2 py-1 text-[11px] font-semibold text-white">
        <PulseIcon className="h-3.5 w-3.5" /> Berjalan
      </span>
    );
  }
  return (
    <span className="inline-flex items-center gap-1 rounded-full bg-bumnwhite-3 px-2 py-1 text-[11px] font-medium text-bumnslate-6">
      <ClockIcon className="h-3.5 w-3.5" /> Berikutnya
    </span>
  );
}

function CheckIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 20 20" fill="none" {...props} aria-hidden>
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
function ClockIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 20 20" fill="none" {...props} aria-hidden>
      <circle cx="10" cy="10" r="8" stroke="currentColor" strokeWidth={1.7} />
      <path d="M10 6v4l3 2" stroke="currentColor" strokeWidth={1.7} strokeLinecap="round" />
    </svg>
  );
}
function PulseIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="none" {...props} aria-hidden>
      <path d="M3 12h4l2 4 3-8 2 6h5" stroke="currentColor" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}
function DotIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 12 12" fill="currentColor" {...props} aria-hidden>
      <circle cx="6" cy="6" r="3" />
    </svg>
  );
}
