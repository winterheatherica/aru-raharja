"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import type { Locale, Dictionary } from "@/i18n/get_dictionary";
import PartnerPreviewCard from "./PartnerPreviewCard";
import { ADMIN_PARTNER_URL, PartnerItem, partnerImageSrc } from "./_shared";

export default function PartnerListPage({ locale, dict }: { locale: Locale; dict?: Dictionary }) {
  const [items, setItems] = useState<PartnerItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const activeLang = locale.toUpperCase();
  const t = (dict as any)?.admin?.partner?.list;

  async function load() {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch(ADMIN_PARTNER_URL, { credentials: "include" });
      if (!res.ok) throw new Error(await res.text());
      setItems(await res.json());
    } catch (e: any) {
      setError(e?.message || "Failed to load partner");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    load();
  }, []);

  async function onDelete(id: string) {
    if (!confirm(t?.deleteConfirm ?? "Hard delete partner ini?")) return;
    try {
      const res = await fetch(`${ADMIN_PARTNER_URL}/${id}`, { method: "DELETE", credentials: "include" });
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
          <h1 className="text-2xl font-semibold text-bumnblue-2">{t?.title ?? "Admin • Partner"}</h1>
          <Link href={`/${locale}/admin/partner/create`} className="inline-flex items-center justify-center rounded-xl bg-bumn-gradient-primary-11 px-4 py-2 text-sm font-medium text-white shadow-bumn-2 transition hover:opacity-95">{t?.createButton ?? "Create Partner"}</Link>
        </div>
      </section>

      {error && <p className="rounded-xl border border-red-200 bg-red-50 px-3 py-2 text-sm text-red-600">{error}</p>}

      {loading ? <p className="text-bumnslate-6">{t?.loading ?? "Loading..."}</p> : (
        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          {items.map((item) => {
            const tr = item.translations?.find((x) => x.language?.toUpperCase() === activeLang) || item.translations?.[0];
            const isActive = item.is_active_partner_grid || item.is_active_partner_scroller;
            return (
              <article key={item.id} className={["rounded-2xl border border-bumnslate-10 bg-bumn-gradient-white-4 p-5 shadow-bumn-2 grid gap-3", isActive ? "ring-2 ring-bumnblue-5" : ""].join(" ")}>
                <PartnerPreviewCard imageSrc={partnerImageSrc(item)} alt={tr?.alt || undefined} emptyText={t?.previewEmpty ?? "No image"} />

                <div className="text-sm grid gap-1 text-bumnslate-6">
                  <p><b>{t?.fields?.id ?? "ID"}:</b> {item.id}</p>
                  <p><b>{t?.fields?.order ?? "Order"}:</b> {item.order_index}</p>
                  <p><b>{t?.fields?.activeGrid ?? "Active Grid"}:</b> {String(item.is_active_partner_grid)}</p>
                  <p><b>{t?.fields?.activeScroller ?? "Active Scroller"}:</b> {String(item.is_active_partner_scroller)}</p>
                  <p><b>{t?.fields?.language ?? "Lang"} ({activeLang}):</b> {tr?.language || "-"}</p>
                  <p><b>{t?.fields?.title ?? "Title"}:</b> {tr?.title || "-"}</p>
                </div>

                <div className="pt-1 flex gap-2">
                  <Link href={`/${locale}/admin/partner/${item.id}`} className="inline-flex items-center justify-center rounded-xl bg-bumn-gradient-primary-11 px-3 py-2 text-sm font-medium text-white shadow-bumn-2 transition hover:opacity-95">{t?.detailButton ?? "Detail / Edit"}</Link>
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
