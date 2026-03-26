"use client";

import Link from "next/link";
import { FormEvent, useEffect, useMemo, useState } from "react";
import type { Locale, Dictionary } from "@/i18n/get_dictionary";
import { ADMIN_HERO_URL, HeroItem, heroImageSrc } from "./_shared";
import HeroBannerPreview from "./HeroBannerPreview";

export default function HeroDetailPage({ locale, heroId, dict }: { locale: Locale; dict?: Dictionary; heroId: string }) {
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const [orderIndex, setOrderIndex] = useState(0);
  const [isActive, setIsActive] = useState(true);
  const [banner, setBanner] = useState<"POLISH" | "TEXT">("POLISH");
  const [image, setImage] = useState<File | null>(null);
  const [previewSrc, setPreviewSrc] = useState<string>("");
  const [translations, setTranslations] = useState<Record<string, { alt: string; title: string; description: string }>>({ ID: { alt: "", title: "", description: "" } });
  const [activeLang, setActiveLang] = useState("ID");

  const t = (dict as any)?.admin?.hero?.detail;
  const f = t?.fields;
  const h = t?.helpers;
  const pv = t?.previewModes;

  useEffect(() => {
    (async () => {
      setLoading(true);
      setError(null);
      try {
        const res = await fetch(`${ADMIN_HERO_URL}/${heroId}`, { credentials: "include" });
        if (!res.ok) throw new Error(await res.text());
        const item: HeroItem = await res.json();

        setOrderIndex(item.order_index || 0);
        setIsActive(Boolean(item.is_active));
        setBanner(item.banner === "TEXT" ? "TEXT" : "POLISH");
        setPreviewSrc(heroImageSrc(item));

        const map: Record<string, { alt: string; title: string; description: string }> = {};
        for (const tr of item.translations || []) {
          const lang = (tr.language || "ID").toUpperCase();
          map[lang] = { alt: tr.alt || "", title: tr.title || "", description: tr.description || "" };
        }
        if (!map.ID) map.ID = { alt: "", title: "", description: "" };
        setTranslations(map);
        setActiveLang(map[locale.toUpperCase()] ? locale.toUpperCase() : Object.keys(map)[0] || "ID");
      } catch (e: any) {
        setError(e?.message || "Failed to load hero detail");
      } finally {
        setLoading(false);
      }
    })();
  }, [heroId, locale]);

  const langOptions = useMemo(() => Object.keys(translations), [translations]);
  const pickedImagePreview = useMemo(() => (image ? URL.createObjectURL(image) : ""), [image]);

  function updateField(field: "alt" | "title" | "description", value: string) {
    setTranslations((prev) => ({
      ...prev,
      [activeLang]: { ...(prev[activeLang] || { alt: "", title: "", description: "" }), [field]: value },
    }));
  }

  async function onUpdateLanguage(e: FormEvent) {
    e.preventDefault();
    setSaving(true);
    setError(null);
    try {
      const current = translations[activeLang] || { alt: "", title: "", description: "" };
      const form = new FormData();
      form.append("language", activeLang);
      form.append("alt", current.alt || "");
      form.append("title", current.title || "");
      form.append("description", current.description || "");
      form.append("banner", banner === "TEXT" ? "TEXT" : "POLISH");
      form.append("order_index", String(orderIndex));
      form.append("is_active", String(isActive));
      if (image) form.append("image", image);

      const res = await fetch(`${ADMIN_HERO_URL}/${heroId}`, { method: "PUT", body: form, credentials: "include" });
      if (!res.ok) throw new Error(await res.text());
      if (image) {
        setImage(null);
        setPreviewSrc(pickedImagePreview || previewSrc);
      }
      alert(`${t?.updatedLanguage ?? "Updated language"} ${activeLang}`);
    } catch (e: any) {
      setError(e?.message || "Update failed");
    } finally {
      setSaving(false);
    }
  }

  if (loading) return <main className="mx-auto max-w-7xl p-6 md:pl-72 text-bumnslate-6">{t?.loading ?? "Loading..."}</main>;

  const current = translations[activeLang] || { alt: "", title: "", description: "" };

  return (
    <main className="mx-auto max-w-7xl p-6 grid gap-4 md:pl-72">
      <section className="rounded-2xl border border-bumnslate-10 bg-bumn-gradient-white-4 p-5 shadow-bumn-2">
        <div className="flex items-center justify-between gap-4">
          <h1 className="text-2xl font-semibold text-bumnblue-2">{t?.titlePrefix ?? "Hero Detail"} • {heroId}</h1>
          <Link href={`/${locale}/admin/hero`} className="inline-flex items-center justify-center rounded-xl border border-bumnslate-10 bg-white px-3 py-2 text-sm text-bumnslate-6">{t?.backToList ?? "Back to list"}</Link>
        </div>
      </section>

      {error && <p className="rounded-xl border border-red-200 bg-red-50 px-3 py-2 text-sm text-red-600">{error}</p>}

      <form onSubmit={onUpdateLanguage} className="grid gap-3 rounded-2xl border border-bumnslate-10 bg-bumn-gradient-white-4 p-5 shadow-bumn-2">
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
          <p className="text-xs text-bumnslate-5">{h?.image ?? "Upload a new image to replace current banner."}</p>
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
              const next = prompt(t?.addLanguagePrompt ?? "Add language (example: EN)")?.trim().toUpperCase();
              if (!next) return;
              setTranslations((prev) => ({ ...prev, [next]: prev[next] || { alt: "", title: "", description: "" } }));
              setActiveLang(next);
            }}
          >{t?.addLanguageButton ?? "+ Add Language"}</button>
        </div>

        <div className="grid gap-1">
          <label className="text-sm font-semibold text-bumnslate-7">{f?.altText ?? "Alt Text"}</label>
          <p className="text-xs text-bumnslate-5">{h?.altText ?? "Alternative text for accessibility and image fallback."}</p>
          <input className="rounded-xl border border-bumnslate-10 bg-white px-3 py-2" value={current.alt} onChange={(e) => updateField("alt", e.target.value)} placeholder={`${t?.placeholders?.alt ?? "alt"} (${activeLang})`} />
        </div>
        <div className="grid gap-1">
          <label className="text-sm font-semibold text-bumnslate-7">{f?.title ?? "Title"}</label>
          <p className="text-xs text-bumnslate-5">{h?.title ?? "Main headline displayed on top of banner."}</p>
          <input className="rounded-xl border border-bumnslate-10 bg-white px-3 py-2" value={current.title} onChange={(e) => updateField("title", e.target.value)} placeholder={`${t?.placeholders?.title ?? "title"} (${activeLang})`} />
        </div>
        <div className="grid gap-1">
          <label className="text-sm font-semibold text-bumnslate-7">{f?.description ?? "Description"}</label>
          <p className="text-xs text-bumnslate-5">{h?.description ?? "Description/CTA text shown under title. Wider field for longer copy."}</p>
          <textarea className="min-h-28 rounded-xl border border-bumnslate-10 bg-white px-3 py-2" value={current.description} onChange={(e) => updateField("description", e.target.value)} placeholder={`${t?.placeholders?.description ?? "description"} (${activeLang})`} />
        </div>

        <div className="grid gap-3">
          <p className="text-sm font-medium text-bumnslate-6">{t?.previewTitle ?? "Banner preview"}</p>

          <div className="grid gap-1">
            <p className="text-xs text-bumnslate-5">{pv?.desktop ?? "Desktop & tablet preview"}</p>
            <HeroBannerPreview
              imageSrc={pickedImagePreview || previewSrc || undefined}
              alt={current.alt}
              title={current.title}
              description={current.description}
              banner={banner}
              width={548.57}
              height={257.14}
              emptyText={t?.previewEmpty ?? "No image available"}
            />
          </div>

          <div className="grid gap-1">
            <p className="text-xs text-bumnslate-5">{pv?.mobile ?? "Mobile preview (240×112.5)"}</p>
            <HeroBannerPreview
              imageSrc={pickedImagePreview || previewSrc || undefined}
              alt={current.alt}
              title={current.title}
              description={current.description}
              banner={banner}
              width={240}
              height={112.5}
              emptyText={t?.previewEmpty ?? "No image available"}
            />
          </div>
        </div>

        <button type="submit" disabled={saving} className="inline-flex w-fit items-center justify-center rounded-xl bg-bumn-gradient-primary-11 px-4 py-2 font-medium text-white shadow-bumn-2 transition hover:opacity-95">{saving ? (t?.saveSaving ?? "Saving...") : `${t?.savePrefix ?? "Save"} ${activeLang}`}</button>
      </form>
    </main>
  );
}

