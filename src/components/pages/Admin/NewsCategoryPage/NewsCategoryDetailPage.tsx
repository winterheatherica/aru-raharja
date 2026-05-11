"use client";

import Link from "next/link";
import { FormEvent, useEffect, useMemo, useState } from "react";
import type { Locale, Dictionary } from "@/i18n/get_dictionary";
import { ADMIN_NEWS_CATEGORY_URL, NewsCategoryItem } from "./_shared";
import { revalidatePublic } from "@/app/actions/revalidate";

type TranslationForm = { name: string; slug: string; description: string };

export default function NewsCategoryDetailPage({ locale, dict, categoryId }: { locale: Locale; dict?: Dictionary; categoryId: string }) {
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const [isActive, setIsActive] = useState(true);
  const [translations, setTranslations] = useState<Record<string, TranslationForm>>({ ID: { name: "", slug: "", description: "" } });
  const [activeLang, setActiveLang] = useState("ID");

  const t = (dict as any)?.admin?.newsCategory?.detail;
  const f = t?.fields;
  const h = t?.helpers;

  useEffect(() => {
    (async () => {
      setLoading(true);
      setError(null);
      try {
        const res = await fetch(`${ADMIN_NEWS_CATEGORY_URL}/${categoryId}`, { credentials: "include" });
        if (!res.ok) throw new Error(await res.text());
        const item: NewsCategoryItem = await res.json();

        setIsActive(Boolean(item.is_active ?? true));

        const map: Record<string, TranslationForm> = {};
        for (const tr of item.translations || []) {
          const lang = (tr.language || "ID").toUpperCase();
          map[lang] = {
            name: tr.name || "",
            slug: tr.slug || "",
            description: tr.description || "",
          };
        }

        if (!Object.keys(map).length) {
          map.ID = {
            name: item.name || "",
            slug: item.slug || "",
            description: item.description || "",
          };
        }

        if (!map.ID) map.ID = { name: "", slug: "", description: "" };

        setTranslations(map);
        setActiveLang(map[locale.toUpperCase()] ? locale.toUpperCase() : Object.keys(map)[0] || "ID");
      } catch (e: any) {
        setError(e?.message || "Failed to load news category detail");
      } finally {
        setLoading(false);
      }
    })();
  }, [categoryId, locale]);

  const langOptions = useMemo(() => Object.keys(translations), [translations]);

  function updateField(field: keyof TranslationForm, value: string) {
    setTranslations((prev) => ({
      ...prev,
      [activeLang]: {
        ...(prev[activeLang] || { name: "", slug: "", description: "" }),
        [field]: value,
      },
    }));
  }

  async function onSave(e: FormEvent) {
    e.preventDefault();
    setSaving(true);
    setError(null);
    try {
      const current = translations[activeLang] || { name: "", slug: "", description: "" };
      const body = {
        language: activeLang,
        name: current.name,
        slug: current.slug,
        description: current.description,
        is_active: isActive,
      };

      const res = await fetch(`${ADMIN_NEWS_CATEGORY_URL}/${categoryId}`, {
        method: "PUT",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });
      if (!res.ok) throw new Error(await res.text());
      await revalidatePublic();
      alert(`${t?.updatedLanguage ?? "Berhasil update bahasa"} ${activeLang}`);
    } catch (e: any) {
      setError(e?.message || "Update failed");
    } finally {
      setSaving(false);
    }
  }

  if (loading) return <main className="mx-auto max-w-7xl p-6 md:pl-72 text-bumnslate-6">{t?.loading ?? "Memuat..."}</main>;

  const current = translations[activeLang] || { name: "", slug: "", description: "" };

  return (
    <main className="mx-auto max-w-7xl p-6 grid gap-4 md:pl-72">
      <section className="rounded-2xl border border-bumnslate-10 bg-bumn-gradient-white-4 p-5 shadow-bumn-2">
        <div className="flex items-center justify-between gap-4">
          <h1 className="text-2xl font-semibold text-bumnblue-2">{t?.titlePrefix ?? "Detail News Category"} • {categoryId}</h1>
          <Link href={`/${locale}/admin/news-category`} className="inline-flex items-center justify-center rounded-xl border border-bumnslate-10 bg-white px-3 py-2 text-sm text-bumnslate-6">{t?.backToList ?? "Kembali ke daftar"}</Link>
        </div>
      </section>

      {error && <p className="rounded-xl border border-red-200 bg-red-50 px-3 py-2 text-sm text-red-600">{error}</p>}

      <form onSubmit={onSave} className="grid gap-3 rounded-2xl border border-bumnslate-10 bg-bumn-gradient-white-4 p-5 shadow-bumn-2">
        <div className="grid gap-1">
          <label className="text-sm font-semibold text-bumnslate-7">{f?.status ?? "Status"}</label>
          <p className="text-xs text-bumnslate-5">{h?.status ?? "Aktifkan jika kategori ini ingin dipakai dan tampil pada artikel berita."}</p>
          <label className="flex items-center gap-2 text-sm">
            <input type="checkbox" checked={isActive} onChange={(e) => setIsActive(e.target.checked)} /> {t?.labels?.isActive ?? "is_active"}
          </label>
        </div>

        <div className="grid gap-1">
          <label className="text-sm font-semibold text-bumnslate-7">{f?.languageTabs ?? "Language"}</label>
          <p className="text-xs text-bumnslate-5">{h?.languageTabs ?? "Pilih bahasa terjemahan kategori yang ingin kamu edit."}</p>
          <div className="flex flex-wrap gap-2">
            {[...langOptions].sort((a, b) => { const ra = a === "EN" ? 0 : a === "ID" ? 1 : 2; const rb = b === "EN" ? 0 : b === "ID" ? 1 : 2; return ra - rb || a.localeCompare(b); }).map((lang) => (
              <button key={lang} type="button" onClick={() => setActiveLang(lang)} className={`rounded-xl px-3 py-1.5 text-sm transition ${activeLang === lang ? "bg-bumn-gradient-primary-11 text-white shadow-bumn-2" : "border border-bumnslate-10 bg-white text-bumnslate-6"}`}>{lang}</button>
            ))}
</div>
        </div>

        <div className="grid gap-1">
          <label className="text-sm font-semibold text-bumnslate-7">{f?.name ?? "Name"}</label>
          <p className="text-xs text-bumnslate-5">{h?.name ?? "Nama kategori yang akan tampil ke user (contoh: Teknologi, Event, Pengumuman)."}</p>
          <input className="rounded-xl border border-bumnslate-10 bg-white px-3 py-2" value={current.name} onChange={(e) => updateField("name", e.target.value)} placeholder={`${t?.placeholders?.name ?? "name"} (${activeLang})`} />
        </div>

        <div className="grid gap-1">
          <label className="text-sm font-semibold text-bumnslate-7">{f?.slug ?? "Slug"}</label>
          <p className="text-xs text-bumnslate-5">{h?.slug ?? "Identifier URL kategori (huruf kecil & dash), dipakai untuk routing/filtering."}</p>
          <input className="rounded-xl border border-bumnslate-10 bg-white px-3 py-2" value={current.slug} onChange={(e) => updateField("slug", e.target.value)} placeholder={`${t?.placeholders?.slug ?? "slug"} (${activeLang})`} />
        </div>

        <div className="grid gap-1">
          <label className="text-sm font-semibold text-bumnslate-7">{f?.description ?? "Description"}</label>
          <p className="text-xs text-bumnslate-5">{h?.description ?? "Deskripsi singkat kategori untuk konteks internal atau tampilan tambahan (opsional)."}</p>
          <textarea className="min-h-28 rounded-xl border border-bumnslate-10 bg-white px-3 py-2" value={current.description} onChange={(e) => updateField("description", e.target.value)} placeholder={`${t?.placeholders?.description ?? "description"} (${activeLang})`} />
        </div>

        <button type="submit" disabled={saving} className="inline-flex w-fit items-center justify-center rounded-xl bg-bumn-gradient-primary-11 px-4 py-2 font-medium text-white shadow-bumn-2 transition hover:opacity-95">{saving ? (t?.saveSaving ?? "Menyimpan...") : `${t?.savePrefix ?? "Simpan"} ${activeLang}`}</button>
      </form>
    </main>
  );
}
