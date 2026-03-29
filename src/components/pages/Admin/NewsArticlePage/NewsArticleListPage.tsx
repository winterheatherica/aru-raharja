"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import type { Locale, Dictionary } from "@/i18n/get_dictionary";
import { ADMIN_NEWS_ARTICLE_URL, NewsArticleItem, newsArticleImageSrc, stripHtml } from "./_shared";

function formatDate(value?: string) {
  if (!value) return "-";
  const d = new Date(value);
  if (Number.isNaN(d.getTime())) return value;
  return d.toLocaleDateString("id-ID", { day: "2-digit", month: "2-digit", year: "numeric" });
}

export default function NewsArticleListPage({ locale, dict }: { locale: Locale; dict?: Dictionary }) {
  const [items, setItems] = useState<NewsArticleItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const t = (dict as any)?.admin?.newsArticle?.list;
  const activeLang = locale.toUpperCase();

  async function load() {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch(ADMIN_NEWS_ARTICLE_URL, { credentials: "include" });
      if (!res.ok) throw new Error(await res.text());
      setItems(await res.json());
    } catch (e: any) {
      setError(e?.message || "Failed to load news article");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    load();
  }, []);

  async function onDelete(id: string) {
    if (!confirm(t?.deleteConfirm ?? "Hard delete artikel ini?")) return;
    try {
      const res = await fetch(`${ADMIN_NEWS_ARTICLE_URL}/${id}`, { method: "DELETE", credentials: "include" });
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
          <h1 className="text-2xl font-semibold text-bumnblue-2">{t?.title ?? "Admin • News Article"}</h1>
          <Link href={`/${locale}/admin/news-article/create`} className="inline-flex items-center justify-center rounded-xl bg-bumn-gradient-primary-11 px-4 py-2 text-sm font-medium text-white shadow-bumn-2 transition hover:opacity-95">{t?.createButton ?? "Create Article"}</Link>
        </div>
      </section>

      {error && <p className="rounded-xl border border-red-200 bg-red-50 px-3 py-2 text-sm text-red-600">{error}</p>}

      {loading ? <p className="text-bumnslate-6">{t?.loading ?? "Loading..."}</p> : (
        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          {items.map((item) => {
            const tr = item.translations?.find((x) => (x.language || "").toUpperCase() === activeLang)
              || item.translations?.find((x) => (x.language || "").toUpperCase() === "ID")
              || item.translations?.[0];

            const imageSrc = newsArticleImageSrc(item) || "/images/home/news/news-4.jpg";
            const excerpt = stripHtml(tr?.content).slice(0, 120) || (t?.previewEmpty ?? "Deskripsi belum tersedia.");

            return (
              <article key={item.id} className={[
                "flex flex-col rounded-2xl border border-bumnslate-10 bg-bumn-gradient-white-4 p-3 shadow-bumn-2",
                item.is_active ? "ring-2 ring-bumnblue-5" : "",
              ].join(" ")}>
                <div className="relative w-full overflow-hidden rounded-lg aspect-[16/9]">
                  <Image src={imageSrc} alt={tr?.title || "News image"} fill className="object-cover" />
                </div>

                <div className="w-full p-2 pt-3 pb-1">
                  <div className="flex justify-between items-start w-full gap-3">
                    <div className="flex items-start gap-3">
                      <span className="block w-3 h-3 rounded-full bg-bumn-gradient-primary-11 shrink-0 mt-1" />
                      <h3 className="text-lg font-bold line-clamp-2 text-black">{tr?.title || "-"}</h3>
                    </div>
                    <p className="text-xs font-medium text-black/60 whitespace-nowrap">{formatDate(item.published_at)}</p>
                  </div>
                </div>

                <div className="w-full p-2 pt-1 mt-auto grid gap-3">
                  <p className="text-sm text-black/60 line-clamp-2">{excerpt}</p>

                  {!!(item.categories && item.categories.length) && (
                    <div className="flex flex-wrap gap-1">
                      {item.categories.slice(0, 3).map((cat) => (
                        <span key={cat.id} className="rounded-full border border-bumnblue-5 bg-blue-50 px-2 py-0.5 text-[10px] font-semibold text-bumnblue-8">
                          {cat.name || cat.slug || "Category"}
                        </span>
                      ))}
                      {item.categories.length > 3 && (
                        <span className="rounded-full border border-bumnslate-10 bg-white px-2 py-0.5 text-[10px] text-bumnslate-6">+{item.categories.length - 3}</span>
                      )}
                    </div>
                  )}

                  <div className="flex gap-2 pt-1">
                    <Link href={`/${locale}/admin/news-article/${item.id}`} className="inline-flex items-center justify-center rounded-xl bg-bumn-gradient-primary-11 px-3 py-2 text-sm font-medium text-white shadow-bumn-2 transition hover:opacity-95">{t?.detailButton ?? "Detail / Edit"}</Link>
                    <button type="button" className="inline-flex items-center justify-center rounded-xl border border-red-300 bg-white px-3 py-2 text-sm font-medium text-red-600 transition hover:bg-red-50" onClick={() => onDelete(item.id)}>{t?.deleteButton ?? "Hard Delete"}</button>
                  </div>
                </div>
              </article>
            );
          })}
        </div>
      )}
    </main>
  );
}
