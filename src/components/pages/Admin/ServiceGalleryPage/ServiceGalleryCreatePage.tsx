"use client";

import Link from "next/link";
import { FormEvent, useMemo, useState } from "react";
import { useSearchParams } from "next/navigation";
import type { Locale, Dictionary } from "@/i18n/get_dictionary";
import { ADMIN_SERVICE_GALLERY_URL, SERVICE_SOLUTIONS, ServiceCode } from "./_shared";

export default function ServiceGalleryCreatePage({ locale, dict }: { locale: Locale; dict?: Dictionary }) {
  const search = useSearchParams();
  const service = (search.get("service") || "").toLowerCase() as ServiceCode;
  const selected = SERVICE_SOLUTIONS.includes(service) ? service : null;

  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [title, setTitle] = useState("");
  const [alt, setAlt] = useState("");
  const [caption, setCaption] = useState("");
  const [isActive, setIsActive] = useState(true);
  const [image, setImage] = useState<File | null>(null);

  const t = (dict as any)?.admin?.serviceGallery?.create;
  const f = t?.fields;
  const h = t?.helpers;
  const imagePreview = useMemo(() => (image ? URL.createObjectURL(image) : ""), [image]);

  async function onSubmit(e: FormEvent) {
    e.preventDefault();
    if (!selected) return;
    if (!image) {
      setError(t?.imageRequired ?? "Image wajib");
      return;
    }
    setSaving(true);
    setError(null);
    try {
      const form = new FormData();
      form.append("service", selected.toUpperCase());
      form.append("language", "ID");
      form.append("media_type", "IMAGE");
      form.append("is_active", String(isActive));
      form.append("title", title);
      form.append("alt", alt);
      form.append("caption", caption);
      form.append("image", image);

      const res = await fetch(ADMIN_SERVICE_GALLERY_URL, { method: "POST", credentials: "include", body: form });
      if (!res.ok) throw new Error(await res.text());
      window.location.href = `/${locale}/admin/service-gallery?service=${selected}`;
    } catch (e: any) {
      setError(e?.message || "Create failed");
    } finally {
      setSaving(false);
    }
  }

  if (!selected) return <main className="mx-auto max-w-7xl p-6 md:pl-72">{t?.serviceRequired ?? "Pilih service dulu."}</main>;

  return (
    <main className="mx-auto max-w-7xl p-6 grid gap-4 md:pl-72">
      <section className="rounded-2xl border border-bumnslate-10 bg-bumn-gradient-white-4 p-5 shadow-bumn-2 flex items-center justify-between">
        <h1 className="text-2xl font-semibold text-bumnblue-2">{t?.titlePrefix ?? "Create Service Gallery"} • {selected.toUpperCase()}</h1>
        <Link href={`/${locale}/admin/service-gallery?service=${selected}`} className="rounded-xl border border-bumnslate-10 bg-white px-3 py-2 text-sm">{t?.backToList ?? "Back"}</Link>
      </section>
      {error && <p className="rounded-xl border border-red-200 bg-red-50 px-3 py-2 text-sm text-red-600">{error}</p>}
      <form onSubmit={onSubmit} className="grid gap-3 rounded-2xl border border-bumnslate-10 bg-white p-5 shadow-bumn-2">
        <p className="inline-flex w-fit rounded-full bg-bumn-gradient-primary-11 px-3 py-1 text-xs font-semibold text-white shadow-bumn-5">{t?.languageHint ?? "Bahasa default: ID (EN auto-translate oleh backend)"}</p>

        <div className="grid gap-1">
          <label className="text-sm font-semibold text-bumnslate-7">{f?.status ?? "Status"}</label>
          <p className="text-xs text-bumnslate-5">{h?.status ?? "Aktifkan jika item gallery ini ingin tampil di halaman service."}</p>
          <label className="flex items-center gap-2 text-sm"><input type="checkbox" checked={isActive} onChange={(e) => setIsActive(e.target.checked)} /> {t?.labels?.isActive ?? "is_active"}</label>
        </div>

        <div className="grid gap-1">
          <label className="text-sm font-semibold text-bumnslate-7">{f?.image ?? "Image"}</label>
          <p className="text-xs text-bumnslate-5">{h?.image ?? "Gambar utama gallery untuk service ini."}</p>
          <input className="rounded-xl border border-bumnslate-10 px-3 py-2" type="file" accept="image/*" onChange={(e) => setImage(e.target.files?.[0] ?? null)} required />
        </div>

        {imagePreview ? <img src={imagePreview} alt={alt || title || "preview"} className="h-52 rounded-xl border border-bumnslate-10 object-cover" /> : null}

        <div className="grid gap-1">
          <label className="text-sm font-semibold text-bumnslate-7">{f?.title ?? "Title"}</label>
          <p className="text-xs text-bumnslate-5">{h?.title ?? "Judul item gallery yang ditampilkan ke user."}</p>
          <input className="rounded-xl border border-bumnslate-10 px-3 py-2" value={title} onChange={(e) => setTitle(e.target.value)} placeholder={t?.placeholders?.title ?? "title"} required />
        </div>

        <div className="grid gap-1">
          <label className="text-sm font-semibold text-bumnslate-7">{f?.altText ?? "Alt Text"}</label>
          <p className="text-xs text-bumnslate-5">{h?.altText ?? "Teks alternatif untuk aksesibilitas dan fallback gambar."}</p>
          <input className="rounded-xl border border-bumnslate-10 px-3 py-2" value={alt} onChange={(e) => setAlt(e.target.value)} placeholder={t?.placeholders?.alt ?? "alt"} />
        </div>

        <div className="grid gap-1">
          <label className="text-sm font-semibold text-bumnslate-7">{f?.caption ?? "Caption"}</label>
          <p className="text-xs text-bumnslate-5">{h?.caption ?? "Keterangan singkat tambahan untuk gallery (opsional)."}</p>
          <textarea className="rounded-xl border border-bumnslate-10 px-3 py-2" value={caption} onChange={(e) => setCaption(e.target.value)} placeholder={t?.placeholders?.caption ?? "caption"} rows={3} />
        </div>

        <button type="submit" disabled={saving} className="rounded-xl bg-bumn-gradient-primary-11 px-4 py-2 text-white w-fit">{saving ? (t?.submitSaving ?? "Saving...") : (t?.submitIdle ?? "Create")}</button>
      </form>
    </main>
  );
}
