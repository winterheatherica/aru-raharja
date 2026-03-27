"use client";

import Link from "next/link";
import { FormEvent, useEffect, useMemo, useState } from "react";
import type { Locale, Dictionary } from "@/i18n/get_dictionary";
import PromoSlidePreviewCard from "./PromoSlidePreviewCard";
import { ADMIN_PROMO_SLIDE_URL, PromoSlideItem, promoSlideImageSrc } from "./_shared";

export default function PromoSlideDetailPage({ locale, dict, slideId }: { locale: Locale; dict?: Dictionary; slideId: string }) {
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const [orderIndex, setOrderIndex] = useState(0);
  const [isActive, setIsActive] = useState(true);
  const [image, setImage] = useState<File | null>(null);
  const [previewSrc, setPreviewSrc] = useState("");
  const [translations, setTranslations] = useState<Record<string, { alt: string; title: string }>>({ ID: { alt: "", title: "" } });
  const [activeLang, setActiveLang] = useState("ID");

  const t = (dict as any)?.admin?.promoSlide?.detail;

  useEffect(() => {
    (async () => {
      setLoading(true);
      setError(null);
      try {
        const res = await fetch(`${ADMIN_PROMO_SLIDE_URL}/${slideId}`, { credentials: "include" });
        if (!res.ok) throw new Error(await res.text());
        const item: PromoSlideItem = await res.json();

        setOrderIndex(item.order_index || 0);
        setIsActive(Boolean(item.is_active));
        setPreviewSrc(promoSlideImageSrc(item));

        const map: Record<string, { alt: string; title: string }> = {};
        for (const tr of item.translations || []) {
          const lang = (tr.language || "ID").toUpperCase();
          map[lang] = { alt: tr.alt || "", title: tr.title || "" };
        }
        if (!map.ID) map.ID = { alt: "", title: "" };

        setTranslations(map);
        setActiveLang(map[locale.toUpperCase()] ? locale.toUpperCase() : Object.keys(map)[0] || "ID");
      } catch (e: any) {
        setError(e?.message || "Failed to load promo slide detail");
      } finally {
        setLoading(false);
      }
    })();
  }, [slideId, locale]);

  const langOptions = useMemo(() => Object.keys(translations), [translations]);
  const pickedImagePreview = useMemo(() => (image ? URL.createObjectURL(image) : ""), [image]);

  function updateField(field: "alt" | "title", value: string) {
    setTranslations((prev) => ({
      ...prev,
      [activeLang]: { ...(prev[activeLang] || { alt: "", title: "" }), [field]: value },
    }));
  }

  async function onSave(e: FormEvent) {
    e.preventDefault();
    setSaving(true);
    setError(null);
    try {
      const current = translations[activeLang] || { alt: "", title: "" };
      const form = new FormData();
      form.append("language", activeLang);
      form.append("alt", current.alt || "");
      form.append("title", current.title || "");
      form.append("order_index", String(orderIndex));
      form.append("is_active", String(isActive));
      if (image) form.append("image", image);

      const res = await fetch(`${ADMIN_PROMO_SLIDE_URL}/${slideId}`, { method: "PUT", body: form, credentials: "include" });
      if (!res.ok) throw new Error(await res.text());
      if (image) {
        setImage(null);
        setPreviewSrc(pickedImagePreview || previewSrc);
      }
      alert(`${t?.updatedLanguage ?? "Berhasil update bahasa"} ${activeLang}`);
    } catch (e: any) {
      setError(e?.message || "Update failed");
    } finally {
      setSaving(false);
    }
  }

  if (loading) return <main className="mx-auto max-w-7xl p-6 md:pl-72 text-bumnslate-6">{t?.loading ?? "Memuat..."}</main>;

  const current = translations[activeLang] || { alt: "", title: "" };
  const previewImage = pickedImagePreview || previewSrc || undefined;

  return (
    <main className="mx-auto max-w-7xl p-6 grid gap-4 md:pl-72">
      <section className="rounded-2xl border border-bumnslate-10 bg-bumn-gradient-white-4 p-5 shadow-bumn-2">
        <div className="flex items-center justify-between gap-4">
          <h1 className="text-2xl font-semibold text-bumnblue-2">{t?.titlePrefix ?? "Detail Promo Slide"} • {slideId}</h1>
          <Link href={`/${locale}/admin/promo-slide`} className="inline-flex items-center justify-center rounded-xl border border-bumnslate-10 bg-white px-3 py-2 text-sm text-bumnslate-6">{t?.backToList ?? "Kembali ke daftar"}</Link>
        </div>
      </section>

      {error && <p className="rounded-xl border border-red-200 bg-red-50 px-3 py-2 text-sm text-red-600">{error}</p>}

      <form onSubmit={onSave} className="grid gap-3 rounded-2xl border border-bumnslate-10 bg-bumn-gradient-white-4 p-5 shadow-bumn-2">
        <input className="rounded-xl border border-bumnslate-10 bg-white px-3 py-2" type="number" value={orderIndex} onChange={(e) => setOrderIndex(Number(e.target.value || 0))} placeholder={t?.placeholders?.orderIndex ?? "order_index"} />

        <label className="flex items-center gap-2 text-sm"><input type="checkbox" checked={isActive} onChange={(e) => setIsActive(e.target.checked)} /> {t?.labels?.isActive ?? "is_active"}</label>

        <input className="rounded-xl border border-bumnslate-10 bg-white px-3 py-2" type="file" accept="image/*" onChange={(e) => setImage(e.target.files?.[0] ?? null)} />

        <div className="flex flex-wrap gap-2">
          {langOptions.map((lang) => (
            <button key={lang} type="button" onClick={() => setActiveLang(lang)} className={`rounded-xl px-3 py-1.5 text-sm transition ${activeLang === lang ? "bg-bumn-gradient-primary-11 text-white shadow-bumn-2" : "border border-bumnslate-10 bg-white text-bumnslate-6"}`}>{lang}</button>
          ))}
          <button type="button" className="rounded-xl border border-bumnslate-10 bg-white px-3 py-1.5 text-sm text-bumnslate-6" onClick={() => {
            const next = prompt(t?.addLanguagePrompt ?? "Tambah bahasa (contoh: EN)")?.trim().toUpperCase();
            if (!next) return;
            setTranslations((prev) => ({ ...prev, [next]: prev[next] || { alt: "", title: "" } }));
            setActiveLang(next);
          }}>{t?.addLanguageButton ?? "+ Tambah Bahasa"}</button>
        </div>

        <input className="rounded-xl border border-bumnslate-10 bg-white px-3 py-2" value={current.alt} onChange={(e) => updateField("alt", e.target.value)} placeholder={`${t?.placeholders?.alt ?? "alt"} (${activeLang})`} />
        <input className="rounded-xl border border-bumnslate-10 bg-white px-3 py-2" value={current.title} onChange={(e) => updateField("title", e.target.value)} placeholder={`${t?.placeholders?.title ?? "title"} (${activeLang})`} />

        <div className="grid gap-3 md:grid-cols-3">
          <div className="grid gap-1">
            <p className="text-sm font-medium text-bumnslate-6">16:9</p>
            <PromoSlidePreviewCard ratio="16:9" imageSrc={previewImage} alt={current.alt} emptyText={t?.previewEmpty ?? "Belum ada gambar"} />
          </div>
          <div className="grid gap-1">
            <p className="text-sm font-medium text-bumnslate-6">1:1</p>
            <PromoSlidePreviewCard ratio="1:1" imageSrc={previewImage} alt={current.alt} emptyText={t?.previewEmpty ?? "Belum ada gambar"} />
          </div>
          <div className="grid gap-1">
            <p className="text-sm font-medium text-bumnslate-6">9:16</p>
            <PromoSlidePreviewCard ratio="9:16" imageSrc={previewImage} alt={current.alt} emptyText={t?.previewEmpty ?? "Belum ada gambar"} />
          </div>
        </div>

        <button type="submit" disabled={saving} className="inline-flex w-fit items-center justify-center rounded-xl bg-bumn-gradient-primary-11 px-4 py-2 font-medium text-white shadow-bumn-2 transition hover:opacity-95">{saving ? (t?.saveSaving ?? "Menyimpan...") : `${t?.savePrefix ?? "Simpan"} ${activeLang}`}</button>
      </form>
    </main>
  );
}
