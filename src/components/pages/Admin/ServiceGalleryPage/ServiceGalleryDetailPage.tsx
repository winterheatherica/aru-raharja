"use client";

import Link from "next/link";
import { FormEvent, useEffect, useMemo, useState } from "react";
import { useSearchParams } from "next/navigation";
import type { Locale, Dictionary } from "@/i18n/get_dictionary";
import { ADMIN_SERVICE_GALLERY_URL, SERVICE_SOLUTIONS, ServiceCode } from "./_shared";

type Translation = { language?: string; title?: string; alt?: string; caption?: string };
type Item = {
  id: string;
  service: string;
  media_type: string;
  image_url?: string;
  is_active: boolean;
  title?: string;
  alt?: string;
  caption?: string;
  translations?: Translation[];
};

export default function ServiceGalleryDetailPage({ locale, dict, galleryId }: { locale: Locale; dict?: Dictionary; galleryId: string }) {
  const search = useSearchParams();
  const service = (search.get("service") || "").toLowerCase() as ServiceCode;
  const selected = SERVICE_SOLUTIONS.includes(service) ? service : null;

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const [title, setTitle] = useState("");
  const [alt, setAlt] = useState("");
  const [caption, setCaption] = useState("");
  const [isActive, setIsActive] = useState(true);
  const [serviceCode, setServiceCode] = useState("");
  const [activeLang, setActiveLang] = useState(locale.toUpperCase());
  const [langOptions, setLangOptions] = useState<string[]>(["ID"]);
  const [image, setImage] = useState<File | null>(null);
  const [previewSrc, setPreviewSrc] = useState("");

  const t = (dict as any)?.admin?.serviceGallery?.detail;
  const pickedImagePreview = useMemo(() => (image ? URL.createObjectURL(image) : ""), [image]);

  async function loadByLang(lang: string) {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch(`${ADMIN_SERVICE_GALLERY_URL}/${galleryId}?lang=${lang}`, { credentials: "include" });
      if (!res.ok) throw new Error(await res.text());
      const item: Item = await res.json();
      setServiceCode(item.service);
      setTitle(item.title || "");
      setAlt(item.alt || "");
      setCaption(item.caption || "");
      setIsActive(Boolean(item.is_active));
      setPreviewSrc(item.image_url || "");
      const langs = Array.from(new Set(["ID", ...(item.translations || []).map((x) => (x.language || "ID").toUpperCase())]));
      setLangOptions(langs);
    } catch (e: any) {
      setError(e?.message || "Failed to load gallery detail");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    loadByLang(activeLang);
  }, [galleryId, activeLang]);

  async function onSubmit(e: FormEvent) {
    e.preventDefault();
    setSaving(true);
    setError(null);
    try {
      const form = new FormData();
      form.append("service", serviceCode);
      form.append("language", activeLang);
      form.append("media_type", "IMAGE");
      form.append("is_active", String(isActive));
      form.append("title", title);
      form.append("alt", alt);
      form.append("caption", caption);
      if (image) form.append("image", image);

      const res = await fetch(`${ADMIN_SERVICE_GALLERY_URL}/${galleryId}`, { method: "PUT", credentials: "include", body: form });
      if (!res.ok) throw new Error(await res.text());
      setImage(null);
      alert(`${t?.saved ?? "Saved"} (${activeLang})`);
      await loadByLang(activeLang);
    } catch (e: any) {
      setError(e?.message || "Save failed");
    } finally {
      setSaving(false);
    }
  }

  async function onDelete() {
    if (!confirm(t?.deleteConfirm ?? "Hard delete gallery ini?")) return;
    const res = await fetch(`${ADMIN_SERVICE_GALLERY_URL}/${galleryId}`, { method: "DELETE", credentials: "include" });
    if (res.ok) {
      const svc = selected || serviceCode.toLowerCase();
      window.location.href = `/${locale}/admin/service-gallery?service=${svc}`;
    }
  }

  if (loading) return <main className="mx-auto max-w-7xl p-6 md:pl-72">{t?.loading ?? "Loading..."}</main>;

  const backService = selected || serviceCode.toLowerCase();
  const displayImage = pickedImagePreview || previewSrc;

  return (
    <main className="mx-auto max-w-7xl p-6 grid gap-4 md:pl-72">
      <section className="rounded-2xl border border-bumnslate-10 bg-bumn-gradient-white-4 p-5 shadow-bumn-2 flex items-center justify-between">
        <h1 className="text-2xl font-semibold text-bumnblue-2">{t?.titlePrefix ?? "Detail Service Gallery"} • {galleryId}</h1>
        <Link href={`/${locale}/admin/service-gallery?service=${backService}`} className="rounded-xl border border-bumnslate-10 bg-white px-3 py-2 text-sm">{t?.backToList ?? "Back"}</Link>
      </section>
      {error && <p className="rounded-xl border border-red-200 bg-red-50 px-3 py-2 text-sm text-red-600">{error}</p>}
      <form onSubmit={onSubmit} className="grid gap-3 rounded-2xl border border-bumnslate-10 bg-white p-5 shadow-bumn-2">
        <div className="flex flex-wrap gap-2">
          {langOptions.map((lang) => (
            <button key={lang} type="button" onClick={() => setActiveLang(lang)} className={`rounded-xl px-3 py-1.5 text-sm transition ${activeLang === lang ? "bg-bumn-gradient-primary-11 text-white shadow-bumn-2" : "border border-bumnslate-10 bg-white text-bumnslate-6"}`}>{lang}</button>
          ))}
          <button type="button" className="rounded-xl border border-bumnslate-10 bg-white px-3 py-1.5 text-sm text-bumnslate-6" onClick={() => {
            const next = prompt(t?.addLanguagePrompt ?? "Tambah bahasa (contoh: EN)")?.trim().toUpperCase();
            if (!next) return;
            if (!langOptions.includes(next)) setLangOptions((prev) => [...prev, next]);
            setActiveLang(next);
          }}>{t?.addLanguageButton ?? "+ Tambah Bahasa"}</button>
        </div>

        <label className="flex items-center gap-2 text-sm"><input type="checkbox" checked={isActive} onChange={(e) => setIsActive(e.target.checked)} /> is_active</label>
        <input className="rounded-xl border border-bumnslate-10 px-3 py-2" type="file" accept="image/*" onChange={(e) => setImage(e.target.files?.[0] ?? null)} />
        {displayImage ? <img src={displayImage} alt={alt || title || "gallery"} className="h-52 rounded-xl border border-bumnslate-10 object-cover" /> : null}
        <input className="rounded-xl border border-bumnslate-10 px-3 py-2" value={title} onChange={(e) => setTitle(e.target.value)} placeholder={`title (${activeLang})`} required />
        <input className="rounded-xl border border-bumnslate-10 px-3 py-2" value={alt} onChange={(e) => setAlt(e.target.value)} placeholder={`alt (${activeLang})`} />
        <textarea className="rounded-xl border border-bumnslate-10 px-3 py-2" value={caption} onChange={(e) => setCaption(e.target.value)} placeholder={`caption (${activeLang})`} rows={3} />
        <div className="flex gap-2">
          <button type="submit" disabled={saving} className="rounded-xl bg-bumn-gradient-primary-11 px-4 py-2 text-white w-fit">{saving ? "Saving..." : `Save ${activeLang}`}</button>
          <button type="button" onClick={onDelete} className="rounded-xl border border-red-300 px-4 py-2 text-red-600 w-fit">Hard Delete</button>
        </div>
      </form>
    </main>
  );
}
