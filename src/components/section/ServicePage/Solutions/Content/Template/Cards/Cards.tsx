"use client";

import * as React from "react";

export type CommonItem = {
  id: string;
  title?: string;
  desc?: string;
  href?: string;
  onClick?: () => void;
  badge?: string;
  icon?: React.ReactNode;
  iconUrl?: string;
};

export type LogoItem = CommonItem & {
  title: string;
  logoUrl: string;
  darkInvert?: boolean;
};

export type KPIItem = CommonItem & {
  label: string;
  value: string | number;
  unit?: string;
  note?: string;
  highlight?: boolean;
};

export type FeatureItem = CommonItem & {
  title: string;
  desc?: string;
};

export type ModuleItem = CommonItem & {
  title: string;
};

export type BadgeItem = CommonItem & {
  title: string;
};

type VariantItems =
  | { variant: "logo-wall"; items: LogoItem[] }
  | { variant: "kpi"; items: KPIItem[] }
  | { variant: "feature"; items: FeatureItem[] }
  | { variant: "modules"; items: ModuleItem[] }
  | { variant: "badges"; items: BadgeItem[] };

type Props = VariantItems & {
  title?: string;
  description?: string;
  gridCols?: { base?: number; md?: number; xl?: number };
  className?: string;
};

export default function Cards(props: Props) {
  const { title, description, className = "" } = props;
  const gridCols = props.gridCols ?? defaultCols(props.variant);

  return (
    <section className={`w-full ${className}`}>
      {(title || description) && (
        <header className="mb-4 space-y-1">
          {title && <h3 className="text-xl font-semibold text-bumnblue-2">{title}</h3>}
          {description && <p className="text-sm text-bumnslate-6">{description}</p>}
        </header>
      )}

      {props.variant === "logo-wall" && (
        <LogoWall items={props.items} gridCols={gridCols} />
      )}

      {props.variant === "kpi" && (
        <KPICards items={props.items} gridCols={gridCols} />
      )}

      {props.variant === "feature" && (
        <FeatureCards items={props.items} gridCols={gridCols} />
      )}

      {props.variant === "modules" && (
        <ModuleCards items={props.items} gridCols={gridCols} />
      )}

      {props.variant === "badges" && (
        <BadgeRow items={props.items} />
      )}
    </section>
  );
}

function LogoWall({ items, gridCols }: { items: LogoItem[]; gridCols: GridCols }) {
  const grid = gridClass(gridCols, "gap-3");
  return (
    <div className={grid}>
      {items.map((it) => {
        const content = (
          <div
            className="flex h-20 items-center justify-center rounded-2xl border border-bumnslate-10 bg-white p-3 shadow-bumn-2 transition hover:shadow-lg"
            title={it.title}
          >

            <img
              src={it.logoUrl}
              alt={it.title}
              className={`max-h-full max-w-[120px] object-contain opacity-80 transition group-hover:opacity-100 ${
                it.darkInvert ? "invert" : ""
              }`}
            />
          </div>
        );
        return (
          <MaybeLink key={it.id} href={it.href} onClick={it.onClick}>
            {content}
          </MaybeLink>
        );
      })}
    </div>
  );
}

function KPICards({ items, gridCols }: { items: KPIItem[]; gridCols: GridCols }) {
  const grid = gridClass(gridCols, "gap-3");
  return (
    <div className={grid}>
      {items.map((it) => {
        const isHi = !!it.highlight;
        return (
          <article
            key={it.id}
            className={`rounded-2xl border p-4 shadow-bumn-2 transition ${
              isHi
                ? "border-bumnblue-5 bg-bumn-gradient-primary-7 text-white"
                : "border-bumnslate-10 bg-white hover:shadow-lg"
            }`}
          >
            <div className="flex items-start justify-between">
              <div className={`text-xs ${isHi ? "text-white/80" : "text-bumnslate-6"}`}>{it.label}</div>
              {it.badge && (
                <span className={`rounded-full px-2 py-0.5 text-[10px] ${
                  isHi ? "bg-white/15 text-white" : "bg-bumnwhite-3 text-bumnslate-6"
                }`}>
                  {it.badge}
                </span>
              )}
            </div>

            <div className={`mt-1 text-3xl font-semibold ${isHi ? "text-white" : "text-bumnblue-2"}`}>
              {it.value}{it.unit ? <span className={`ml-1 text-lg ${isHi ? "text-white/90" : "text-bumnslate-6"}`}>{it.unit}</span> : null}
            </div>

            {it.note && (
              <div className={`mt-1 text-xs ${isHi ? "text-white/80" : "text-bumnslate-6"}`}>{it.note}</div>
            )}
          </article>
        );
      })}
    </div>
  );
}

function FeatureCards({ items, gridCols }: { items: FeatureItem[]; gridCols: GridCols }) {
  const grid = gridClass(gridCols, "gap-3");
  return (
    <div className={grid}>
      {items.map((it) => {
        const content = (
          <article className="group relative rounded-2xl border border-bumnslate-10 bg-white p-4 shadow-bumn-2 transition hover:shadow-lg">
            {it.badge && (
              <span className="absolute -top-3 right-4 rounded-full bg-bumn-gradient-primary-7 px-3 py-1 text-xs font-semibold text-white shadow-bumn-5">
                {it.badge}
              </span>
            )}

            {(it.icon || it.iconUrl) && (
              <div className="mb-2">
                {it.icon ? (
                  <span className="inline-flex h-10 w-10 items-center justify-center rounded-xl bg-bumnwhite-3 text-bumnblue-2">
                    {it.icon}
                  </span>
                ) : (
                  <span className="inline-flex h-10 w-10 items-center justify-center rounded-xl bg-bumnwhite-3">
                    <img src={it.iconUrl!} alt={it.title || ""} className="h-6 w-6 object-contain" />
                  </span>
                )}
              </div>
            )}

            <h4 className="text-base font-semibold text-bumnblue-2">{it.title}</h4>
            {it.desc && <p className="mt-1 text-sm text-bumnslate-6">{it.desc}</p>}
          </article>
        );
        return (
          <MaybeLink key={it.id} href={it.href} onClick={it.onClick}>
            {content}
          </MaybeLink>
        );
      })}
    </div>
  );
}

function ModuleCards({ items, gridCols }: { items: ModuleItem[]; gridCols: GridCols }) {
  const grid = gridClass(gridCols, "gap-2");
  return (
    <div className={grid}>
      {items.map((it) => {
        const content = (
          <div className="inline-flex items-center justify-between gap-2 rounded-xl border border-bumnslate-10 bg-white px-3 py-2 text-sm text-bumnblue-2 shadow-bumn-2 hover:border-bumnblue-5">
            <span className="font-medium">{it.title}</span>
            {it.badge && (
              <span className="rounded-full bg-bumnwhite-3 px-2 py-0.5 text-[10px] text-bumnslate-6">
                {it.badge}
              </span>
            )}
          </div>
        );
        return (
          <MaybeLink key={it.id} href={it.href} onClick={it.onClick}>
            {content}
          </MaybeLink>
        );
      })}
    </div>
  );
}

function BadgeRow({ items }: { items: BadgeItem[] }) {
  return (
    <div className="flex flex-wrap gap-2">
      {items.map((it) => (
        <span
          key={it.id}
          title={it.desc}
          className="rounded-full bg-bumnwhite-3 px-3 py-1 text-xs text-bumnslate-6"
        >
          {it.title}
        </span>
      ))}
    </div>
  );
}

type GridCols = { base?: number; md?: number; xl?: number };

function defaultCols(variant: Props["variant"]): GridCols {
  switch (variant) {
    case "logo-wall":
      return { base: 2, md: 4, xl: 6 };
    case "kpi":
      return { base: 1, md: 2, xl: 4 };
    case "feature":
      return { base: 1, md: 2, xl: 3 };
    case "modules":
      return { base: 2, md: 3, xl: 4 };
    case "badges":
      return { base: 0 };
    default:
      return { base: 1, md: 2, xl: 3 };
  }
}

function gridClass(cols: GridCols, extra = "") {
  const base = cols.base ? `grid-cols-${cols.base}` : "grid-cols-1";
  const md = cols.md ? `md:grid-cols-${cols.md}` : "";
  const xl = cols.xl ? `xl:grid-cols-${cols.xl}` : "";
  return `grid ${base} ${md} ${xl} ${extra}`.trim();
}

function MaybeLink({
  href,
  onClick,
  children,
}: {
  href?: string;
  onClick?: () => void;
  children: React.ReactNode;
}) {
  if (href) {
    return (
      <a href={href} onClick={onClick} className="group block">
        {children}
      </a>
    );
  }
  return (
    <button type="button" onClick={onClick} className="group block w-full text-left">
      {children}
    </button>
  );
}
