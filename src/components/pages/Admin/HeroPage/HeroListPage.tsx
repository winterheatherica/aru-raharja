"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import type { Locale, Dictionary } from "@/i18n/get_dictionary";
import { ADMIN_HERO_URL, HeroItem, heroImageSrc } from "./_shared";
import HeroBannerPreview from "./HeroBannerPreview";

export default function HeroListPage({ locale, dict }: { locale: Locale; dict?: Dictionary }) {
  const [items, setItems] = useState<HeroItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const activeLang = locale.toUpperCase();
  const t = (dict as any)?.admin?.hero?.list;

  async function load() {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch(ADMIN_HERO_URL, { credentials: "include" });
      if (!res.ok) throw new Error(await res.text());
      setItems(await res.json());
    } catch (e: any) {
      setError(e?.message || "Failed to load hero");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    load();
  }, []);

  async function onDelete(id: string) {
    if (!confirm(t?.deleteConfirm ?? "Hard delete hero ini?")) return;
    try {
      const res = await fetch(`${ADMIN_HERO_URL}/${id}`, { method: "DELETE", credentials: "include" });
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
          <div>
            <h1 className="text-2xl font-semibold text-bumnblue-2">{t?.title ?? "Admin • Hero"}</h1>
          </div>
          <Link href={`/${locale}/admin/hero/create`} className="inline-flex items-center justify-center rounded-xl bg-bumn-gradient-primary-11 px-4 py-2 text-sm font-medium text-white shadow-bumn-2 transition hover:opacity-95">{t?.createButton ?? "Create Hero"}</Link>
        </div>
      </section>

      {error && <p className="rounded-xl border border-red-200 bg-red-50 px-3 py-2 text-sm text-red-600">{error}</p>}

      {loading ? <p className="text-bumnslate-6">{t?.loading ?? "Loading..."}</p> : (
        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          {items.map((item) => {
            const tr = item.translations?.find((x) => x.language?.toUpperCase() === activeLang) || item.translations?.[0];
            return (
              <article
                key={item.id}
                className={[
                  "relative flex h-full flex-col rounded-2xl border border-bumnslate-10 bg-bumn-gradient-white-4 p-5 shadow-bumn-2",
                  item.is_active ? "ring-2 ring-bumnblue-5" : "",
                ].join(" ")}
              >
                <div className="mx-auto w-full max-w-sm grid gap-1">
                  <p className="text-xs text-bumnslate-5">{t?.previewCaption ?? "Preview: Mobile"}</p>
                  <HeroBannerPreview
                    imageSrc={heroImageSrc(item)}
                    alt={tr?.alt || undefined}
                    title={tr?.title || undefined}
                    description={tr?.description || undefined}
                    banner={item.banner}
                    width={480}
                    height={225}
                    emptyText={t?.previewEmpty ?? "No image"}
                  />
                </div>

                <div className="mt-3 text-sm grid gap-1 text-bumnslate-6">
                  <p><b>{t?.fields?.id ?? "ID"}:</b> {item.id}</p>
                  <p><b>{t?.fields?.order ?? "Order"}:</b> {item.order_index}</p>
                  <p><b>{t?.fields?.active ?? "Active"}:</b> {String(item.is_active)}</p>
                  <p><b>{t?.fields?.banner ?? "Banner"}:</b> {item.banner}</p>
                  <p><b>{t?.fields?.language ?? "Lang"} ({activeLang}):</b> {tr?.language || "-"}</p>
                  <p><b>{t?.fields?.alt ?? "Alt"}:</b> {tr?.alt || "-"}</p>
                  <p><b>{t?.fields?.title ?? "Title"}:</b> {tr?.title || "-"}</p>
                  <p><b>{t?.fields?.description ?? "Description"}:</b> {tr?.description || "-"}</p>
                </div>

                <div className="mt-auto pt-3 flex gap-2">
                  <Link href={`/${locale}/admin/hero/${item.id}`} className="inline-flex items-center justify-center rounded-xl bg-bumn-gradient-primary-11 px-3 py-2 text-sm font-medium text-white shadow-bumn-2 transition hover:opacity-95">{t?.detailButton ?? "Detail / Edit"}</Link>
                  <button type="button" className="inline-flex items-center justify-center rounded-xl border border-red-300 bg-white px-3 py-2 text-sm font-medium text-red-600 transition hover:bg-red-50" onClick={() => onDelete(item.id)}>{t?.deleteButton ?? "Hard Delete"}</button>
                </div>
              </article>
            );
          })}
        </div>
      )}
    </main>
  );
}
