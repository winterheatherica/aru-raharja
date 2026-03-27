"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import type { Locale, Dictionary } from "@/i18n/get_dictionary";
import { ADMIN_HISTORY_URL, HistoryItem } from "./_shared";

export default function HistoryListPage({ locale, dict }: { locale: Locale; dict?: Dictionary }) {
  const [items, setItems] = useState<HistoryItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [activeYear, setActiveYear] = useState<number | null>(null);

  const t = (dict as any)?.admin?.history?.list;
  const activeLang = locale.toUpperCase();

  async function load() {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch(ADMIN_HISTORY_URL, { credentials: "include" });
      if (!res.ok) throw new Error(await res.text());
      const data: HistoryItem[] = await res.json();
      setItems(data);
      const years = Array.from(new Set(data.map((x) => x.year).filter((x): x is number => typeof x === "number"))).sort((a, b) => b - a);
      setActiveYear((prev) => (prev && years.includes(prev) ? prev : (years[0] ?? null)));
    } catch (e: any) {
      setError(e?.message || "Failed to load history");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => { load(); }, []);

  const years = useMemo(() => Array.from(new Set(items.map((x) => x.year).filter((x): x is number => typeof x === "number"))).sort((a, b) => b - a), [items]);
  const activeItems = useMemo(() => items.filter((x) => x.year === activeYear), [items, activeYear]);
  const displayItem = useMemo(() => activeItems.find((x) => (x.language || "").toUpperCase() === activeLang) || activeItems[0] || null, [activeItems, activeLang]);

  async function onDelete(id: string) {
    if (!confirm(t?.deleteConfirm ?? "Hard delete history ini?")) return;
    try {
      const res = await fetch(`${ADMIN_HISTORY_URL}/${id}`, { method: "DELETE", credentials: "include" });
      if (!res.ok) throw new Error(await res.text());
      await load();
    } catch (e: any) {
      setError(e?.message || "Delete failed");
    }
  }

  return (
    <main className="mx-auto max-w-7xl p-6 grid gap-6 md:pl-72">
      <section className="rounded-2xl border border-bumnslate-10 bg-bumn-gradient-white-4 p-5 shadow-bumn-2">
        <div className="flex items-center justify-between gap-4">
          <h1 className="text-2xl font-semibold text-bumnblue-2">{t?.title ?? "Admin • History"}</h1>
          <Link href={`/${locale}/admin/history/create`} className="inline-flex items-center justify-center rounded-xl bg-bumn-gradient-primary-11 px-4 py-2 text-sm font-medium text-white shadow-bumn-2 transition hover:opacity-95">{t?.createButton ?? "Create History"}</Link>
        </div>
      </section>

      <section className="mt-2 grid grid-cols-12 gap-4">
        <div className="col-span-12 lg:col-span-3">
          <div className="mb-6 text-lg font-medium text-bumngreen-1">Track Record</div>
          <div className="flex w-full p-2">
            <div className="w-[7px] bg-bumn-gradient-primary-11 mt-14" />
            <div className="flex flex-col w-full px-2">
              <div className="pb-3 mb-3 text-sm font-medium border-b text-bumngreen-1">Year</div>
              <div className="flex flex-col space-y-2 max-h-[520px] overflow-auto pr-1">
                {years.map((year) => {
                  const isActive = activeYear === year;
                  return (
                    <button key={year} type="button" onClick={() => setActiveYear(year)} className={`inline-flex items-center justify-start whitespace-nowrap rounded-md px-3 py-2 text-base transition-all ${isActive ? "bg-bumn-gradient-primary-11 text-bumngray-1 shadow" : "text-bumnslate-3"}`}>
                      {year}
                    </button>
                  );
                })}
              </div>
            </div>
          </div>
        </div>

        <div className="col-span-12 lg:col-span-9">
          {error && <p className="mb-3 rounded-xl border border-red-200 bg-red-50 px-3 py-2 text-sm text-red-600">{error}</p>}
          {loading ? <p className="text-bumnslate-6">{t?.loading ?? "Loading..."}</p> : !activeItems.length ? (
            <p className="text-bumnslate-6">{t?.empty ?? "No history found"}</p>
          ) : (
            <div className="mt-2 rounded-xl bg-white shadow-none">
              <div className="flex flex-col space-y-1.5 p-6 pt-0">
                <h3 className="font-semibold tracking-tight text-2xl text-bumngreen-1">{activeYear}</h3>
              </div>
              <div className="p-6 pt-0">
                <div className="p-4 space-y-3 text-base rounded-lg lg:p-6 font-lato text-bumnslate-6 bg-bumncyan-1">
                  {displayItem?.title && <h4 className="text-xl font-semibold">{displayItem.title}</h4>}
                  {displayItem?.description && <p>{displayItem.description}</p>}

                  {displayItem?.table_headers?.length && displayItem?.table_rows?.length ? (
                    <table className="w-full mt-2 text-bumnslate-6 border-collapse">
                      <thead className="text-sm font-bold text-left bg-bumngray-2/20">
                        <tr>
                          {displayItem.table_headers.map((head, i) => (
                            <th key={i} className="p-3 border border-bumngray-2">{head}</th>
                          ))}
                        </tr>
                      </thead>
                      <tbody className="text-base font-lato">
                        {displayItem.table_rows.map((row, rIdx) => (
                          <tr key={rIdx}>
                            {row.map((cell, cIdx) => (
                              <td key={cIdx} className="p-3 border border-bumngray-2 align-top">{cell}</td>
                            ))}
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  ) : null}

                  <div className="pt-2 grid gap-2">
                    {activeItems.map((item) => (
                      <div key={item.id} className={["rounded-xl border border-bumnslate-10 bg-white p-3", item.is_active ? "ring-2 ring-bumnblue-5" : ""].join(" ")}>
                        <div className="flex flex-wrap items-center justify-between gap-3">
                          <div className="text-sm text-bumnslate-6">
                            <b>{t?.fields?.language ?? "Lang"}:</b> {item.language} • <b>{t?.fields?.active ?? "Active"}:</b> {String(item.is_active)}
                          </div>
                          <div className="flex gap-2">
                            <Link href={`/${locale}/admin/history/${item.id}`} className="inline-flex items-center justify-center rounded-xl bg-bumn-gradient-primary-11 px-3 py-2 text-sm font-medium text-white shadow-bumn-2">{t?.detailButton ?? "Detail / Edit"}</Link>
                            <button type="button" className="inline-flex items-center justify-center rounded-xl border border-red-300 bg-white px-3 py-2 text-sm font-medium text-red-600 hover:bg-red-50" onClick={() => onDelete(item.id)}>{t?.deleteButton ?? "Hard Delete"}</button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </section>
    </main>
  );
}
