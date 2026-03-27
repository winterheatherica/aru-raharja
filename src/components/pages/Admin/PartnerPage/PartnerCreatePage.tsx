"use client";

import Link from "next/link";
import { FormEvent, useMemo, useState } from "react";
import type { Locale, Dictionary } from "@/i18n/get_dictionary";
import PartnerPreviewCard from "./PartnerPreviewCard";
import { ADMIN_PARTNER_URL } from "./_shared";

export default function PartnerCreatePage({ locale, dict }: { locale: Locale; dict?: Dictionary }) {
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [orderIndex, setOrderIndex] = useState(0);
  const [isActiveGrid, setIsActiveGrid] = useState(true);
  const [isActiveScroller, setIsActiveScroller] = useState(true);
  const [image, setImage] = useState<File | null>(null);
  const [idAlt, setIdAlt] = useState("");
  const [idTitle, setIdTitle] = useState("");
  const [idDescription, setIdDescription] = useState("");

  const t = (dict as any)?.admin?.partner?.create;
  const imagePreview = useMemo(() => (image ? URL.createObjectURL(image) : ""), [image]);

  async function onCreate(e: FormEvent) {
    e.preventDefault();
    if (!image) return setError(t?.imageRequired ?? "Image wajib saat create");

    setSaving(true);
    setError(null);
    try {
      const form = new FormData();
      form.append("language", "ID");
      form.append("alt", idAlt);
      form.append("title", idTitle);
      form.append("description", idDescription);
      form.append("order_index", String(orderIndex));
      form.append("is_active_partner_grid", String(isActiveGrid));
      form.append("is_active_partner_scroller", String(isActiveScroller));
      form.append("image", image);

      const res = await fetch(ADMIN_PARTNER_URL, { method: "POST", body: form, credentials: "include" });
      if (!res.ok) throw new Error(await res.text());

      window.location.href = `/${locale}/admin/partner`;
    } catch (e: any) {
      setError(e?.message || "Create failed");
    } finally {
      setSaving(false);
    }
  }

  return (
    <main className="mx-auto max-w-7xl p-6 grid gap-4 md:pl-72">
      <section className="rounded-2xl border border-bumnslate-10 bg-bumn-gradient-white-4 p-5 shadow-bumn-2">
        <div className="flex items-center justify-between gap-4">
          <h1 className="text-2xl font-semibold text-bumnblue-2">{t?.title ?? "Create Partner"}</h1>
          <Link href={`/${locale}/admin/partner`} className="inline-flex items-center justify-center rounded-xl border border-bumnslate-10 bg-white px-3 py-2 text-sm text-bumnslate-6">{t?.backToList ?? "Back to list"}</Link>
        </div>
      </section>

      {error && <p className="rounded-xl border border-red-200 bg-red-50 px-3 py-2 text-sm text-red-600">{error}</p>}

      <form onSubmit={onCreate} className="grid gap-3 rounded-2xl border border-bumnslate-10 bg-bumn-gradient-white-4 p-5 shadow-bumn-2">
        <p className="inline-flex w-fit rounded-full bg-bumn-gradient-primary-11 px-3 py-1 text-xs font-semibold text-white shadow-bumn-5">{t?.defaultLanguageHint ?? "Bahasa default: ID (EN auto-translate oleh backend)"}</p>

        <input className="rounded-xl border border-bumnslate-10 bg-white px-3 py-2" type="number" value={orderIndex} onChange={(e) => setOrderIndex(Number(e.target.value || 0))} placeholder={t?.placeholders?.orderIndex ?? "order_index"} />

        <label className="flex items-center gap-2 text-sm"><input type="checkbox" checked={isActiveGrid} onChange={(e) => setIsActiveGrid(e.target.checked)} /> {t?.labels?.isActiveGrid ?? "is_active_partner_grid"}</label>
        <label className="flex items-center gap-2 text-sm"><input type="checkbox" checked={isActiveScroller} onChange={(e) => setIsActiveScroller(e.target.checked)} /> {t?.labels?.isActiveScroller ?? "is_active_partner_scroller"}</label>

        <input className="rounded-xl border border-bumnslate-10 bg-white px-3 py-2" type="file" accept="image/*" onChange={(e) => setImage(e.target.files?.[0] ?? null)} />
        <input className="rounded-xl border border-bumnslate-10 bg-white px-3 py-2" value={idAlt} onChange={(e) => setIdAlt(e.target.value)} placeholder={t?.placeholders?.alt ?? "alt (ID)"} />
        <input className="rounded-xl border border-bumnslate-10 bg-white px-3 py-2" value={idTitle} onChange={(e) => setIdTitle(e.target.value)} placeholder={t?.placeholders?.title ?? "title (ID)"} />
        <textarea className="min-h-24 rounded-xl border border-bumnslate-10 bg-white px-3 py-2" value={idDescription} onChange={(e) => setIdDescription(e.target.value)} placeholder={t?.placeholders?.description ?? "description (ID)"} />

        <div className="grid gap-2">
          <p className="text-sm font-medium text-bumnslate-6">{t?.previewTitle ?? "Preview"}</p>
          <PartnerPreviewCard imageSrc={imagePreview || undefined} alt={idAlt} emptyText={t?.previewEmpty ?? "Pilih gambar untuk preview"} />
        </div>

        <button type="submit" disabled={saving} className="inline-flex w-fit items-center justify-center rounded-xl bg-bumn-gradient-primary-11 px-4 py-2 font-medium text-white shadow-bumn-2 transition hover:opacity-95">{saving ? (t?.submitSaving ?? "Menyimpan...") : (t?.submitIdle ?? "Buat Partner")}</button>
      </form>
    </main>
  );
}
