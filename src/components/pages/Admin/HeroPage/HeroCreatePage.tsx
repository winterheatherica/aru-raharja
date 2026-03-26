"use client";

import Link from "next/link";
import { FormEvent, useMemo, useState } from "react";
import type { Locale, Dictionary } from "@/i18n/get_dictionary";
import { ADMIN_HERO_URL } from "./_shared";
import HeroBannerPreview from "./HeroBannerPreview";

export default function HeroCreatePage({ locale, dict }: { locale: Locale; dict?: Dictionary }) {
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [orderIndex, setOrderIndex] = useState(0);
  const [isActive, setIsActive] = useState(true);
  const [banner, setBanner] = useState<"POLISH" | "TEXT">("POLISH");
  const [image, setImage] = useState<File | null>(null);
  const [idAlt, setIdAlt] = useState("");
  const [idTitle, setIdTitle] = useState("");
  const [idDescription, setIdDescription] = useState("");

  const t = (dict as any)?.admin?.hero?.create;
  const f = t?.fields;
  const h = t?.helpers;
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
      form.append("banner", banner === "TEXT" ? "TEXT" : "POLISH");
      form.append("order_index", String(orderIndex));
      form.append("is_active", String(isActive));
      form.append("image", image);

      const res = await fetch(ADMIN_HERO_URL, { method: "POST", body: form, credentials: "include" });
      if (!res.ok) throw new Error(await res.text());

      window.location.href = `/${locale}/admin/hero`;
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
          <h1 className="text-2xl font-semibold text-bumnblue-2">{t?.title ?? "Create Hero"}</h1>
          <Link href={`/${locale}/admin/hero`} className="inline-flex items-center justify-center rounded-xl border border-bumnslate-10 bg-white px-3 py-2 text-sm text-bumnslate-6">{t?.backToList ?? "Back to list"}</Link>
        </div>
      </section>

      {error && <p className="rounded-xl border border-red-200 bg-red-50 px-3 py-2 text-sm text-red-600">{error}</p>}

      <form onSubmit={onCreate} className="grid gap-3 rounded-2xl border border-bumnslate-10 bg-bumn-gradient-white-4 p-5 shadow-bumn-2">
        <p className="inline-flex w-fit rounded-full bg-bumn-gradient-primary-11 px-3 py-1 text-xs font-semibold text-white shadow-bumn-5">{t?.defaultLanguageHint ?? "Default language: ID (EN auto-translate by backend)"}</p>
        <div className="grid gap-3 md:grid-cols-2">
          <div className="grid gap-1">
            <label className="text-sm font-semibold text-bumnslate-7">{f?.bannerType ?? "Banner Type"}</label>
            <p className="text-xs text-bumnslate-5">{h?.bannerType ?? "Select hero overlay style. Currently used: POLISH and TEXT."}</p>
            <select className="rounded-xl border border-bumnslate-10 bg-white px-3 py-2" value={banner} onChange={(e) => setBanner((e.target.value as "POLISH" | "TEXT") === "TEXT" ? "TEXT" : "POLISH")}>
              <option value="POLISH">POLISH</option>
              <option value="TEXT">TEXT</option>
            </select>
          </div>
          <div className="grid gap-1">
            <label className="text-sm font-semibold text-bumnslate-7">{f?.orderIndex ?? "Order Index"}</label>
            <p className="text-xs text-bumnslate-5">{h?.orderIndex ?? "Slide display order. Smaller value appears first."}</p>
            <input className="rounded-xl border border-bumnslate-10 bg-white px-3 py-2" type="number" value={orderIndex} onChange={(e) => setOrderIndex(Number(e.target.value || 0))} placeholder={t?.placeholders?.orderIndex ?? "order_index"} />
          </div>
        </div>

        <div className="grid gap-1">
          <label className="text-sm font-semibold text-bumnslate-7">{f?.status ?? "Status"}</label>
          <p className="text-xs text-bumnslate-5">{h?.status ?? "Enable if this slide should be shown on homepage."}</p>
          <label className="flex items-center gap-2 text-sm">
            <input type="checkbox" checked={isActive} onChange={(e) => setIsActive(e.target.checked)} /> {t?.labels?.isActive ?? "is_active"}
          </label>
        </div>

        <div className="grid gap-1">
          <label className="text-sm font-semibold text-bumnslate-7">{f?.image ?? "Image"}</label>
          <p className="text-xs text-bumnslate-5">{h?.image ?? "Main image for hero banner."}</p>
          <input className="rounded-xl border border-bumnslate-10 bg-white px-3 py-2" type="file" accept="image/*" onChange={(e) => setImage(e.target.files?.[0] ?? null)} />
        </div>

        <div className="grid gap-1">
          <label className="text-sm font-semibold text-bumnslate-7">{f?.altText ?? "Alt Text"}</label>
          <p className="text-xs text-bumnslate-5">{h?.altText ?? "Alternative text for accessibility and image fallback."}</p>
          <input className="rounded-xl border border-bumnslate-10 bg-white px-3 py-2" value={idAlt} onChange={(e) => setIdAlt(e.target.value)} placeholder={t?.placeholders?.alt ?? "alt (ID)"} />
        </div>

        <div className="grid gap-1">
          <label className="text-sm font-semibold text-bumnslate-7">{f?.title ?? "Title"}</label>
          <p className="text-xs text-bumnslate-5">{h?.title ?? "Main headline displayed on top of banner."}</p>
          <input className="rounded-xl border border-bumnslate-10 bg-white px-3 py-2" value={idTitle} onChange={(e) => setIdTitle(e.target.value)} placeholder={t?.placeholders?.title ?? "title (ID)"} />
        </div>

        <div className="grid gap-1">
          <label className="text-sm font-semibold text-bumnslate-7">{f?.description ?? "Description"}</label>
          <p className="text-xs text-bumnslate-5">{h?.description ?? "Description/CTA text shown under title. Wider field for longer copy."}</p>
          <textarea className="min-h-28 rounded-xl border border-bumnslate-10 bg-white px-3 py-2" value={idDescription} onChange={(e) => setIdDescription(e.target.value)} placeholder={t?.placeholders?.description ?? "description (ID)"} />
        </div>

        <div className="grid gap-2">
          <p className="text-sm font-medium text-bumnslate-6">{t?.previewTitle ?? "Banner preview"}</p>
          <HeroBannerPreview
            imageSrc={imagePreview || undefined}
            alt={idAlt}
            title={idTitle}
            description={idDescription}
            banner={banner}
            emptyText={t?.previewEmpty ?? "Select an image to preview"}
          />
        </div>

        <button type="submit" disabled={saving} className="inline-flex w-fit items-center justify-center rounded-xl bg-bumn-gradient-primary-11 px-4 py-2 font-medium text-white shadow-bumn-2 transition hover:opacity-95">{saving ? (t?.submitSaving ?? "Saving...") : (t?.submitIdle ?? "Create Hero")}</button>
      </form>
    </main>
  );
}

