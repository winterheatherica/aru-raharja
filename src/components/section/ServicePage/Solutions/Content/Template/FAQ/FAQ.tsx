"use client";

import * as React from "react";

export type FAQItem = {
  id: string;
  question: string;
  answer: string;
  category?: string;
  checkable?: boolean;
  defaultChecked?: boolean;
  defaultOpen?: boolean;
};

type Props = {
  title?: string;
  description?: string;
  items: FAQItem[];
  categories?: string[];
  enableSearch?: boolean;
  enableCategoryFilter?: boolean;
  allowMultipleOpen?: boolean;
  defaultOpenAll?: boolean;
  className?: string;
  onToggleItem?: (itemId: string, open: boolean) => void;
  onCheckItem?: (itemId: string, checked: boolean) => void;
};

export default function FAQ({
  title,
  description,
  items,
  categories,
  enableSearch = true,
  enableCategoryFilter = true,
  allowMultipleOpen = true,
  defaultOpenAll = false,
  className = "",
  onToggleItem,
  onCheckItem,
}: Props) {
  const [q, setQ] = React.useState("");
  const [cat, setCat] = React.useState<string>("all");

  const [openIds, setOpenIds] = React.useState<Set<string>>(() => {
    const init = new Set<string>();
    for (const it of items) {
      const shouldOpen = defaultOpenAll || it.defaultOpen;
      if (shouldOpen) init.add(it.id);
    }
    return init;
  });

  const [checked, setChecked] = React.useState<Record<string, boolean>>(() => {
    const init: Record<string, boolean> = {};
    for (const it of items) {
      if (it.checkable) init[it.id] = !!it.defaultChecked;
    }
    return init;
  });

  const derivedCategories = React.useMemo(() => {
    if (categories?.length) return categories;
    const s = new Set<string>();
    items.forEach((it) => it.category && s.add(it.category));
    return Array.from(s);
  }, [categories, items]);

  const filtered = React.useMemo(() => {
    const qq = q.trim().toLowerCase();
    return items.filter((it) => {
      const okCat = cat === "all" || !cat ? true : (it.category || "") === cat;
      const okText =
        !qq ||
        it.question.toLowerCase().includes(qq) ||
        it.answer.toLowerCase().includes(qq);
      return okCat && okText;
    });
  }, [items, q, cat]);

  const toggleItem = (id: string) => {
    setOpenIds((prev) => {
      const next = new Set(prev);
      const willOpen = !prev.has(id);

      if (!allowMultipleOpen) {
        next.clear();
        if (willOpen) next.add(id);
      } else {
        if (willOpen) next.add(id);
        else next.delete(id);
      }

      onToggleItem?.(id, willOpen);
      return next;
    });
  };

  const expandAll = () => {
    setOpenIds(new Set(filtered.map((f) => f.id)));
  };
  const collapseAll = () => {
    setOpenIds(new Set());
  };

  const onCheck = (id: string, value: boolean) => {
    setChecked((s) => ({ ...s, [id]: value }));
    onCheckItem?.(id, value);
  };

  return (
    <section className={`w-full ${className}`}>
      {(title || description) && (
        <header className="mb-4 space-y-1">
          {title && <h3 className="text-xl font-semibold text-bumnblue-2">{title}</h3>}
          {description && <p className="text-sm text-bumnslate-6">{description}</p>}
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
                placeholder="Cari pertanyaan…"
                className="w-full bg-transparent px-2 py-2 text-sm outline-none"
              />
            </div>
          )}

          {enableCategoryFilter && derivedCategories.length > 0 && (
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

        <div className="flex items-center justify-end gap-2">
          <button
            type="button"
            onClick={expandAll}
            className="rounded-lg border border-bumnslate-10 bg-white px-3 py-2 text-xs font-medium text-bumnslate-6 hover:border-bumnblue-5"
          >
            Buka semua
          </button>
          <button
            type="button"
            onClick={collapseAll}
            className="rounded-lg border border-bumnslate-10 bg-white px-3 py-2 text-xs font-medium text-bumnslate-6 hover:border-bumnblue-5"
          >
            Tutup semua
          </button>
        </div>
      </div>

      <div className="space-y-2">
        {filtered.map((it) => {
          const open = openIds.has(it.id);
          const isChecked = !!checked[it.id];

          return (
            <article
              key={it.id}
              className={`overflow-hidden rounded-2xl border shadow-bumn-2 transition ${
                open ? "border-bumnblue-5 bg-white" : "border-bumnslate-10 bg-white"
              }`}
            >
              <button
                type="button"
                onClick={() => toggleItem(it.id)}
                className="flex w-full items-center justify-between gap-3 px-4 py-3 text-left"
                aria-expanded={open}
              >
                <div className="flex items-center gap-3">
                  {it.checkable && (
                    <input
                      type="checkbox"
                      className="h-4 w-4 rounded border-bumnslate-10 text-bumnblue-5 focus:ring-bumnblue-5"
                      checked={isChecked}
                      onChange={(e) => onCheck(it.id, e.target.checked)}
                      onClick={(e) => e.stopPropagation()}
                      aria-label="Tandai selesai"
                    />
                  )}
                  <span className="text-sm font-semibold text-bumnblue-2">
                    {it.question}
                  </span>
                  {it.category && (
                    <span className="rounded-full bg-bumnwhite-3 px-2 py-0.5 text-[10px] text-bumnslate-6">
                      {it.category}
                    </span>
                  )}
                </div>

                <ChevronIcon
                  className={`h-4 w-4 shrink-0 text-bumnslate-6 transition-transform ${
                    open ? "rotate-180" : "rotate-0"
                  }`}
                />
              </button>

              {open && (
                <div className="border-t border-bumnslate-10 px-4 py-3 text-sm text-bumnslate-6">
                  <div dangerouslySetInnerHTML={{ __html: it.answer }} />
                </div>
              )}
            </article>
          );
        })}

        {filtered.length === 0 && (
          <div className="rounded-xl border border-dashed border-bumnslate-10 p-4 text-center text-sm text-bumnslate-6">
            Tidak ada item yang cocok.
          </div>
        )}
      </div>
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
function ChevronIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 20 20" fill="none" {...props}>
      <path d="M6 8l4 4 4-4" stroke="currentColor" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}
