"use client";

import Link from "next/link";
import { FormEvent, useEffect, useMemo, useState } from "react";
import type { Locale, Dictionary } from "@/i18n/get_dictionary";
import AwardPreviewCard from "./AwardPreviewCard";
import { ADMIN_AWARD_URL, AwardItem, awardImageSrc } from "./_shared";

export default function AwardDetailPage({ locale, dict, awardId }: { locale: Locale; dict?: Dictionary; awardId: string }) {
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const [year, setYear] = useState<number | "">("");
  const [orderIndex, setOrderIndex] = useState(0);
  const [isActive, setIsActive] = useState(true);
  const [image, setImage] = useState<File | null>(null);
  const [previewSrc, setPreviewSrc] = useState("");

  const [translations, setTranslations] = useState<Record<string, { alt: string; title: string; label: string; description: string }>>({ ID: { alt: "", title: "", label: "", description: "" } });
  const [activeLang, setActiveLang] = useState("ID");

  const t = (dict as any)?.admin?.award?.detail;
  const h = t?.helpers;

  useEffect(() => {
    (async () => {
      setLoading(true);
      setError(null);
      try {
        const res = await fetch(`${ADMIN_AWARD_URL}/${awardId}`, { credentials: "include" });
        if (!res.ok) throw new Error(await res.text());
        const item: AwardItem = await res.json();

        setYear(item.year ?? "");
        setOrderIndex(item.order_index || 0);
        setIsActive(Boolean(item.is_active));
        setPreviewSrc(awardImageSrc(item));

        const map: Record<string, { alt: string; title: string; label: string; description: string }> = {};
        for (const tr of item.translations || []) {
          const lang = (tr.language || "ID").toUpperCase();
          map[lang] = { alt: tr.alt || "", title: tr.title || "", label: tr.label || "", description: tr.description || "" };
        }
        if (!map.ID) map.ID = { alt: "", title: "", label: "", description: "" };

        setTranslations(map);
        setActiveLang(map[locale.toUpperCase()] ? locale.toUpperCase() : Object.keys(map)[0] || "ID");
      } catch (e: any) {
        setError(e?.message || "Failed to load award detail");
      } finally {
        setLoading(false);
      }
    })();
  }, [awardId, locale]);

  const langOptions = useMemo(() => Object.keys(translations), [translations]);
  const pickedImagePreview = useMemo(() => (image ? URL.createObjectURL(image) : ""), [image]);

  function updateField(field: "alt" | "title" | "label" | "description", value: string) {
    setTranslations((prev) => ({
      ...prev,
      [activeLang]: { ...(prev[activeLang] || { alt: "", title: "", label: "", description: "" }), [field]: value },
    }));
  }

  async function onUpdateLanguage(e: FormEvent) {
    e.preventDefault();
    setSaving(true);
    setError(null);
    try {
      const current = translations[activeLang] || { alt: "", title: "", label: "", description: "" };
      const form = new FormData();
      form.append("language", activeLang);
      form.append("alt", current.alt || "");
      form.append("title", current.title || "");
      form.append("label", current.label || "");
      form.append("description", current.description || "");
      if (year !== "") form.append("year", String(year));
      form.append("order_index", String(orderIndex));
      form.append("is_active", String(isActive));
      if (image) form.append("image", image);

      const res = await fetch(`${ADMIN_AWARD_URL}/${awardId}`, { method: "PUT", body: form, credentials: "include" });
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

  const current = translations[activeLang] || { alt: "", title: "", label: "", description: "" };

  return (
    <main className="mx-auto max-w-7xl p-6 grid gap-4 md:pl-72">
      <section className="rounded-2xl border border-bumnslate-10 bg-bumn-gradient-white-4 p-5 shadow-bumn-2">
        <div className="flex items-center justify-between gap-4">
          <h1 className="text-2xl font-semibold text-bumnblue-2">{t?.titlePrefix ?? "Detail Award"} • {awardId}</h1>
          <Link href={`/${locale}/admin/award`} className="inline-flex items-center justify-center rounded-xl border border-bumnslate-10 bg-white px-3 py-2 text-sm text-bumnslate-6">{t?.backToList ?? "Kembali ke daftar"}</Link>
        </div>
      </section>

      {error && <p className="rounded-xl border border-red-200 bg-red-50 px-3 py-2 text-sm text-red-600">{error}</p>}

      <form onSubmit={onUpdateLanguage} className="grid gap-3 rounded-2xl border border-bumnslate-10 bg-bumn-gradient-white-4 p-5 shadow-bumn-2">
        <div className="grid gap-3 md:grid-cols-2">
          <div className="grid gap-1">
            <label className="text-sm font-semibold text-bumnslate-7">{t?.fields?.year ?? "Year"}</label>
            <p className="text-xs text-bumnslate-5">{h?.year ?? (dict as any)?.admin?.common?.formFieldHelper ?? "Use this field according to its label and function."}</p>
            <input className="rounded-xl border border-bumnslate-10 bg-white px-3 py-2" type="number" value={year} onChange={(e) => setYear(e.target.value === "" ? "" : Number(e.target.value))} placeholder={t?.placeholders?.year ?? "year"} />
          </div>
          <div className="grid gap-1">
            <label className="text-sm font-semibold text-bumnslate-7">{t?.fields?.orderIndex ?? "Order Index"}</label>
            <p className="text-xs text-bumnslate-5">{h?.orderIndex ?? (dict as any)?.admin?.common?.formFieldHelper ?? "Use this field according to its label and function."}</p>
            <input className="rounded-xl border border-bumnslate-10 bg-white px-3 py-2" type="number" value={orderIndex} onChange={(e) => setOrderIndex(Number(e.target.value || 0))} placeholder={t?.placeholders?.orderIndex ?? "order_index"} />
          </div>
        </div>

        <div className="grid gap-1">
          <label className="text-sm font-semibold text-bumnslate-7">{t?.fields?.status ?? "Status"}</label>
          <p className="text-xs text-bumnslate-5">{h?.status ?? (dict as any)?.admin?.common?.formFieldHelper ?? "Use this field according to its label and function."}</p>
          <label className="flex items-center gap-2 text-sm">
            <input type="checkbox" checked={isActive} onChange={(e) => setIsActive(e.target.checked)} /> {t?.labels?.isActive ?? "is_active"}
          </label>
        </div>

        <div className="grid gap-1">
          <label className="text-sm font-semibold text-bumnslate-7">{t?.fields?.image ?? "Image"}</label>
          <p className="text-xs text-bumnslate-5">{h?.image ?? (dict as any)?.admin?.common?.formFieldHelper ?? "Use this field according to its label and function."}</p>
          <input className="rounded-xl border border-bumnslate-10 bg-white px-3 py-2" type="file" accept="image/*" onChange={(e) => setImage(e.target.files?.[0] ?? null)} />
        </div>

        <div className="flex flex-wrap gap-2">
          {langOptions.map((lang) => (
            <button key={lang} type="button" onClick={() => setActiveLang(lang)} className={`rounded-xl px-3 py-1.5 text-sm transition ${activeLang === lang ? "bg-bumn-gradient-primary-11 text-white shadow-bumn-2" : "border border-bumnslate-10 bg-white text-bumnslate-6"}`}>{lang}</button>
          ))}
          <button
            type="button"
            className="rounded-xl border border-bumnslate-10 bg-white px-3 py-1.5 text-sm text-bumnslate-6"
            onClick={() => {
              const next = prompt(t?.addLanguagePrompt ?? "Tambah bahasa (contoh: EN)")?.trim().toUpperCase();
              if (!next) return;
              setTranslations((prev) => ({ ...prev, [next]: prev[next] || { alt: "", title: "", label: "", description: "" } }));
              setActiveLang(next);
            }}
          >{t?.addLanguageButton ?? "+ Tambah Bahasa"}</button>
        </div>

        <div className="grid gap-1">
          <label className="text-sm font-semibold text-bumnslate-7">{t?.fields?.altText ?? "Alt Text"}</label>
          <p className="text-xs text-bumnslate-5">{h?.altText ?? (dict as any)?.admin?.common?.formFieldHelper ?? "Use this field according to its label and function."}</p>
          <input className="rounded-xl border border-bumnslate-10 bg-white px-3 py-2" value={current.alt} onChange={(e) => updateField("alt", e.target.value)} placeholder={`${t?.placeholders?.alt ?? "alt"} (${activeLang})`} />
        </div>

        <div className="grid gap-1">
          <label className="text-sm font-semibold text-bumnslate-7">{t?.fields?.title ?? "Title"}</label>
          <p className="text-xs text-bumnslate-5">{h?.title ?? (dict as any)?.admin?.common?.formFieldHelper ?? "Use this field according to its label and function."}</p>
          <input className="rounded-xl border border-bumnslate-10 bg-white px-3 py-2" value={current.title} onChange={(e) => updateField("title", e.target.value)} placeholder={`${t?.placeholders?.title ?? "title"} (${activeLang})`} />
        </div>

        <div className="grid gap-1">
          <label className="text-sm font-semibold text-bumnslate-7">{t?.fields?.label ?? "Label"}</label>
          <p className="text-xs text-bumnslate-5">{h?.label ?? (dict as any)?.admin?.common?.formFieldHelper ?? "Use this field according to its label and function."}</p>
          <input className="rounded-xl border border-bumnslate-10 bg-white px-3 py-2" value={current.label} onChange={(e) => updateField("label", e.target.value)} placeholder={`${t?.placeholders?.label ?? "label"} (${activeLang})`} />
        </div>

        <div className="grid gap-1">
          <label className="text-sm font-semibold text-bumnslate-7">{t?.fields?.description ?? "Description"}</label>
          <p className="text-xs text-bumnslate-5">{h?.description ?? (dict as any)?.admin?.common?.formFieldHelper ?? "Use this field according to its label and function."}</p>
          <textarea className="min-h-24 rounded-xl border border-bumnslate-10 bg-white px-3 py-2" value={current.description} onChange={(e) => updateField("description", e.target.value)} placeholder={`${t?.placeholders?.description ?? "description"} (${activeLang})`} />
        </div>

        <div className="grid gap-2">
          <p className="text-sm font-medium text-bumnslate-6">{t?.previewTitle ?? "Preview"}</p>
          <AwardPreviewCard imageSrc={pickedImagePreview || previewSrc || undefined} alt={current.alt} title={current.title} year={year === "" ? null : year} ctaText={t?.previewCta ?? "Sertifikat Penghargaan"} emptyText={t?.previewEmpty ?? "Belum ada gambar"} />
        </div>

        <button type="submit" disabled={saving} className="inline-flex w-fit items-center justify-center rounded-xl bg-bumn-gradient-primary-11 px-4 py-2 font-medium text-white shadow-bumn-2 transition hover:opacity-95">{saving ? (t?.saveSaving ?? "Menyimpan...") : `${t?.savePrefix ?? "Simpan"} ${activeLang}`}</button>
      </form>
    </main>
  );
}

