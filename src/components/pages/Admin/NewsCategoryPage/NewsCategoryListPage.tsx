"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import type { Locale, Dictionary } from "@/i18n/get_dictionary";
import { ADMIN_NEWS_CATEGORY_URL, NewsCategoryItem } from "./_shared";

export default function NewsCategoryListPage({ locale, dict }: { locale: Locale; dict?: Dictionary }) {
  const [items, setItems] = useState<NewsCategoryItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const activeLang = locale.toUpperCase();
  const t = (dict as any)?.admin?.newsCategory?.list;

  async function load() {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch(ADMIN_NEWS_CATEGORY_URL, { credentials: "include" });
      if (!res.ok) throw new Error(await res.text());
      setItems(await res.json());
    } catch (e: any) {
      setError(e?.message || "Failed to load news category");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    load();
  }, []);

  async function onDelete(id: string) {
    if (!confirm(t?.deleteConfirm ?? "Hard delete news category ini?")) return;
    try {
      const res = await fetch(`${ADMIN_NEWS_CATEGORY_URL}/${id}`, { method: "DELETE", credentials: "include" });
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
          <h1 className="text-2xl font-semibold text-bumnblue-2">{t?.title ?? "Admin • News Category"}</h1>
          <Link href={`/${locale}/admin/news-category/create`} className="inline-flex items-center justify-center rounded-xl bg-bumn-gradient-primary-11 px-4 py-2 text-sm font-medium text-white shadow-bumn-2 transition hover:opacity-95">{t?.createButton ?? "Create Category"}</Link>
        </div>
      </section>

      {error && <p className="rounded-xl border border-red-200 bg-red-50 px-3 py-2 text-sm text-red-600">{error}</p>}

      {loading ? (
        <p className="text-bumnslate-6">{t?.loading ?? "Loading..."}</p>
      ) : (
        <div className="grid gap-3">
          {items.length === 0 ? (
            <p className="rounded-2xl border border-bumnslate-10 bg-bumn-gradient-white-4 px-4 py-3 text-sm text-bumnslate-6 shadow-bumn-2">
              {t?.empty ?? "Belum ada news category"}
            </p>
          ) : (
            items.map((item) => {
              const tr =
                item.translations?.find((x) => (x.language || "").toUpperCase() === activeLang) ||
                item.translations?.find((x) => (x.language || "").toUpperCase() === "ID") ||
                item.translations?.[0];

              const displayName = tr?.name || item.name || "-";

              return (
                <article
                  key={item.id}
                  className="w-full rounded-2xl border border-bumnslate-10 bg-bumn-gradient-white-4 px-4 py-3 shadow-bumn-2"
                >
                  <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
                    <p className="text-base font-medium text-bumnblue-8">{displayName}</p>

                    <div className="flex gap-2">
                      <Link
                        href={`/${locale}/admin/news-category/${item.id}`}
                        className="inline-flex items-center justify-center rounded-xl bg-bumn-gradient-primary-11 px-3 py-2 text-sm font-medium text-white shadow-bumn-2 transition hover:opacity-95"
                      >
                        {t?.detailButton ?? "Detail / Edit"}
                      </Link>
                      <button
                        type="button"
                        className="inline-flex items-center justify-center rounded-xl border border-red-300 bg-white px-3 py-2 text-sm font-medium text-red-600 transition hover:bg-red-50"
                        onClick={() => onDelete(item.id)}
                      >
                        {t?.deleteButton ?? "Hard Delete"}
                      </button>
                    </div>
                  </div>
                </article>
              );
            })
          )}
        </div>
      )}
    </main>
  );
}
