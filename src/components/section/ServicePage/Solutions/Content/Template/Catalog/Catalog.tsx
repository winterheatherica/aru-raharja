"use client";

import * as React from "react";

export type CatalogItem = {
  id: string;
  name: string;
  sku: string;
  category?: string;
  image?: string;
  price?: number | null;
  currency?: string;
  moq?: number | null;
  leadTime?: string | null;
  tags?: string[];
  rating?: number | null;
  available?: boolean;
  meta?: Record<string, any>;
};

type SortKey = "name" | "priceAsc" | "priceDesc" | "leadTime";

type Props = {
  title?: string;
  description?: string;
  items: CatalogItem[];
  categories?: string[];
  enableSearch?: boolean;
  enableCategoryFilter?: boolean;
  enableSort?: boolean;
  enableCompare?: boolean;
  gridCols?: { base?: number; md?: number; xl?: number };
  onRFQ?: (item: CatalogItem) => void;
  onCompare?: (items: CatalogItem[]) => void;
  footnote?: string;
  className?: string;
};

export default function Catalog({
  title,
  description,
  items,
  categories,
  enableSearch = true,
  enableCategoryFilter = true,
  enableSort = true,
  enableCompare = true,
  gridCols = { base: 1, md: 2, xl: 3 },
  onRFQ,
  onCompare,
  footnote,
  className = "",
}: Props) {
  const [q, setQ] = React.useState("");
  const [cat, setCat] = React.useState<string>("all");
  const [sort, setSort] = React.useState<SortKey>("name");
  const [compare, setCompare] = React.useState<string[]>([]);

  const derivedCategories = React.useMemo(() => {
    if (categories && categories.length) return categories;
    const set = new Set<string>();
    items.forEach((it) => it.category && set.add(it.category));
    return Array.from(set);
  }, [categories, items]);

  const fmtIDR = (v: number, currency = "IDR") =>
    new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency,
      maximumFractionDigits: 0,
    }).format(Math.round(v || 0));

  const filtered = React.useMemo(() => {
    const qLower = q.trim().toLowerCase();
    let list = items.filter((it) => {
      const okCat = cat === "all" || !cat ? true : (it.category || "") === cat;
      const inText =
        !qLower ||
        it.name.toLowerCase().includes(qLower) ||
        it.sku.toLowerCase().includes(qLower);
      return okCat && inText;
    });

    const leadToNum = (s?: string | null) => {
      if (!s) return Number.POSITIVE_INFINITY;
      const m = s.match(/\d+/);
      return m ? parseInt(m[0], 10) : Number.POSITIVE_INFINITY;
    };

    list.sort((a, b) => {
      if (sort === "name") {
        return a.name.localeCompare(b.name, "id");
      }
      if (sort === "priceAsc") {
        const pa = a.price ?? Number.POSITIVE_INFINITY;
        const pb = b.price ?? Number.POSITIVE_INFINITY;
        return pa - pb;
      }
      if (sort === "priceDesc") {
        const pa = a.price ?? Number.NEGATIVE_INFINITY;
        const pb = b.price ?? Number.NEGATIVE_INFINITY;
        return pb - pa;
      }
      if (sort === "leadTime") {
        return leadToNum(a.leadTime) - leadToNum(b.leadTime);
      }
      return 0;
    });

    return list;
  }, [items, q, cat, sort]);

  const toggleCompare = (id: string) => {
    setCompare((prev) => {
      const exists = prev.includes(id);
      if (exists) return prev.filter((x) => x !== id);
      if (prev.length >= 3) return prev;
      return [...prev, id];
    });
  };

  const selectedItems = React.useMemo(
    () => compare.map((id) => items.find((i) => i.id === id)).filter(Boolean) as CatalogItem[],
    [compare, items]
  );

  const gridClass = `grid gap-4 ${
    gridCols.base ? `grid-cols-${gridCols.base}` : "grid-cols-1"
  } ${gridCols.md ? `md:grid-cols-${gridCols.md}` : ""} ${
    gridCols.xl ? `xl:grid-cols-${gridCols.xl}` : ""
  }`;

  return (
    <section className={`w-full ${className}`}>
      {(title || description) && (
        <header className="mb-4">
          {title && <h3 className="text-xl font-semibold text-bumnblue-2">{title}</h3>}
          {description && <p className="mt-1 text-sm text-bumnslate-6">{description}</p>}
        </header>
      )}

      <div className="mb-4 flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
        <div className="flex flex-1 items-center gap-2">
          {enableSearch && (
            <div className="flex w-full max-w-xs items-center overflow-hidden rounded-lg border border-bumnslate-10 bg-white">
              <span className="pl-3 pr-1 text-bumnslate-6">
                <SearchIcon className="h-4 w-4" />
              </span>
              <input
                value={q}
                onChange={(e) => setQ(e.target.value)}
                placeholder="Cari nama atau SKU…"
                className="w-full bg-transparent px-2 py-2 text-sm outline-none"
              />
            </div>
          )}

          {enableCategoryFilter && (derivedCategories.length > 0) && (
            <select
              value={cat}
              onChange={(e) => setCat(e.target.value)}
              className="w-full max-w-[180px] rounded-lg border border-bumnslate-10 bg-white px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-bumnblue-5"
            >
              <option value="all">Semua kategori</option>
              {derivedCategories.map((c) => (
                <option key={c} value={c}>{c}</option>
              ))}
            </select>
          )}
        </div>

        {enableSort && (
          <select
            value={sort}
            onChange={(e) => setSort(e.target.value as SortKey)}
            className="w-full max-w-[180px] rounded-lg border border-bumnslate-10 bg-white px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-bumnblue-5"
          >
            <option value="name">Urutkan: Nama</option>
            <option value="priceAsc">Harga: Termurah</option>
            <option value="priceDesc">Harga: Termahal</option>
            <option value="leadTime">Lead Time: Tercepat</option>
          </select>
        )}
      </div>

      <div className={gridClass}>
        {filtered.map((it) => (
          <article
            key={it.id}
            className="group relative rounded-2xl border border-bumnslate-10 bg-white p-4 shadow-bumn-2 transition hover:shadow-lg"
          >
            {enableCompare && (
              <button
                type="button"
                onClick={() => toggleCompare(it.id)}
                className={`absolute right-3 top-3 inline-flex items-center justify-center rounded-md border px-2 py-1 text-xs transition ${
                  compare.includes(it.id)
                    ? "border-bumnblue-5 bg-bumn-gradient-primary-10 text-white"
                    : "border-bumnslate-10 bg-white text-bumnslate-6 hover:border-bumnblue-5"
                }`}
                aria-pressed={compare.includes(it.id)}
              >
                {compare.includes(it.id) ? "Dipilih" : "Bandingkan"}
              </button>
            )}

            {it.image && (
              <div className="mb-3 aspect-[16/9] w-full overflow-hidden rounded-lg bg-bumnwhite-3">
                <img src={it.image} alt={it.name} className="h-full w-full object-cover" />
              </div>
            )}

            <header className="mb-2">
              <h4 className="text-base font-semibold text-bumnblue-2">{it.name}</h4>
              <div className="mt-0.5 text-xs text-bumnslate-6">SKU: {it.sku}</div>
            </header>

            <div className="mb-3 flex flex-wrap items-center gap-2">
              {typeof it.moq === "number" && (
                <span className="rounded-full bg-bumnwhite-3 px-2 py-1 text-xs text-bumnslate-6">
                  MOQ {it.moq}
                </span>
              )}
              {it.leadTime && (
                <span className="rounded-full bg-bumnwhite-3 px-2 py-1 text-xs text-bumnslate-6">
                  Lead {it.leadTime}
                </span>
              )}
              {typeof it.rating === "number" && (
                <span className="inline-flex items-center gap-1 rounded-full bg-bumnwhite-3 px-2 py-1 text-xs text-bumnslate-6">
                  <StarIcon className="h-3.5 w-3.5" /> {it.rating.toFixed(1)}
                </span>
              )}
              {Array.isArray(it.tags) &&
                it.tags.slice(0, 3).map((t) => (
                  <span key={t} className="rounded-full bg-bumnwhite-3 px-2 py-1 text-xs text-bumnslate-6">
                    {t}
                  </span>
                ))}
              {it.available === false && (
                <span className="rounded-full bg-bumnslate-10 px-2 py-1 text-xs text-bumnslate-6">
                  Tidak tersedia
                </span>
              )}
            </div>

            {typeof it.price === "number" && (
              <div className="mb-3 text-lg font-semibold text-bumnblue-2">
                {fmtIDR(it.price, it.currency || "IDR")}
              </div>
            )}

            <div className="pt-1">
              <button
                type="button"
                onClick={() => onRFQ?.(it)}
                className="inline-flex w-full items-center justify-center gap-2 rounded-xl bg-bumn-gradient-primary-18 px-4 py-2 text-sm font-medium text-bumngray-1 transition hover:opacity-95 focus:outline-none focus:ring-2 focus:ring-bumnblue-5"
              >
                Minta Penawaran
              </button>
            </div>
          </article>
        ))}
      </div>

      {footnote && (
        <p className="mt-4 text-center text-xs text-bumnslate-5">{footnote}</p>
      )}

      {enableCompare && selectedItems.length > 0 && (
        <div className="pointer-events-auto fixed inset-x-4 bottom-4 z-40 rounded-2xl border border-bumnslate-10 bg-white p-3 shadow-bumn-2 md:inset-x-auto md:right-6 md:w-[480px]">
          <div className="mb-2 flex items-center justify-between">
            <div className="text-sm font-medium text-bumnblue-2">
              Bandingkan ({selectedItems.length}/3)
            </div>
            <button
              type="button"
              onClick={() => setCompare([])}
              className="text-xs text-bumnslate-6 underline underline-offset-2 hover:text-bumnblue-2"
            >
              Reset
            </button>
          </div>

          <div className="mb-3 grid grid-cols-3 gap-2">
            {selectedItems.map((it) => (
              <div key={it.id} className="overflow-hidden rounded-lg border border-bumnslate-10 bg-bumnwhite-3">
                <div className="p-2">
                  <div className="truncate text-xs font-medium text-bumnblue-2">{it.name}</div>
                  <div className="truncate text-[10px] text-bumnslate-6">SKU: {it.sku}</div>
                </div>
              </div>
            ))}
          </div>

          <div className="flex items-center justify-end gap-2">
            <button
              type="button"
              onClick={() => {
                onCompare?.(selectedItems);
              }}
              className="inline-flex items-center justify-center rounded-lg bg-bumn-gradient-primary-10 px-3 py-2 text-sm font-semibold text-white"
            >
              Bandingkan
            </button>
          </div>
        </div>
      )}
    </section>
  );
}

function SearchIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 20 20" fill="none" {...props}>
      <path d="M13.5 13.5L17 17" stroke="currentColor" strokeWidth={1.5} strokeLinecap="round" />
      <circle cx="9" cy="9" r="5.5" stroke="currentColor" strokeWidth={1.5} />
    </svg>
  );
}

function StarIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 20 20" fill="currentColor" {...props} aria-hidden>
      <path d="M10 2.5l2.2 4.46 4.92.72-3.56 3.47.84 4.9L10 13.96 5.6 16.05l.84-4.9L2.88 7.68l4.92-.72L10 2.5z" />
    </svg>
  );
}
