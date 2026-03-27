"use client";

import Link from "next/link";
import { FormEvent, useState } from "react";
import type { Locale, Dictionary } from "@/i18n/get_dictionary";
import { ADMIN_NEWS_CATEGORY_URL } from "./_shared";

export default function NewsCategoryCreatePage({ locale, dict }: { locale: Locale; dict?: Dictionary }) {
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const [isActive, setIsActive] = useState(true);
  const [name, setName] = useState("");
  const [slug, setSlug] = useState("");
  const [description, setDescription] = useState("");

  const t = (dict as any)?.admin?.newsCategory?.create;

  async function onCreate(e: FormEvent) {
    e.preventDefault();
    setSaving(true);
    setError(null);

    try {
      if (!name.trim() || !slug.trim()) {
        throw new Error(t?.validation?.idRequired ?? "Isi Name & Slug untuk bahasa ID dulu.");
      }

      const createRes = await fetch(ADMIN_NEWS_CATEGORY_URL, {
        method: "POST",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          language: "ID",
          name,
          slug,
          description,
          is_active: isActive,
        }),
      });

      if (!createRes.ok) throw new Error(await createRes.text());

      window.location.href = `/${locale}/admin/news-category`;
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
          <h1 className="text-2xl font-semibold text-bumnblue-2">{t?.title ?? "Create News Category"}</h1>
          <Link href={`/${locale}/admin/news-category`} className="inline-flex items-center justify-center rounded-xl border border-bumnslate-10 bg-white px-3 py-2 text-sm text-bumnslate-6">{t?.backToList ?? "Back to list"}</Link>
        </div>
      </section>

      {error && <p className="rounded-xl border border-red-200 bg-red-50 px-3 py-2 text-sm text-red-600">{error}</p>}

      <form onSubmit={onCreate} className="grid gap-3 rounded-2xl border border-bumnslate-10 bg-bumn-gradient-white-4 p-5 shadow-bumn-2">
        <p className="inline-flex w-fit rounded-full bg-bumn-gradient-primary-11 px-3 py-1 text-xs font-semibold text-white shadow-bumn-5">{t?.defaultLanguageHint ?? "Bahasa default: ID (EN auto-translate oleh backend)"}</p>

        <label className="flex items-center gap-2 text-sm">
          <input type="checkbox" checked={isActive} onChange={(e) => setIsActive(e.target.checked)} /> {t?.labels?.isActive ?? "is_active"}
        </label>

        <input className="rounded-xl border border-bumnslate-10 bg-white px-3 py-2" value={name} onChange={(e) => setName(e.target.value)} placeholder={`${t?.placeholders?.name ?? "name"} (ID)`} />
        <input className="rounded-xl border border-bumnslate-10 bg-white px-3 py-2" value={slug} onChange={(e) => setSlug(e.target.value)} placeholder={`${t?.placeholders?.slug ?? "slug"} (ID)`} />
        <textarea className="min-h-28 rounded-xl border border-bumnslate-10 bg-white px-3 py-2" value={description} onChange={(e) => setDescription(e.target.value)} placeholder={`${t?.placeholders?.description ?? "description"} (ID)`} />

        <button type="submit" disabled={saving} className="inline-flex w-fit items-center justify-center rounded-xl bg-bumn-gradient-primary-11 px-4 py-2 font-medium text-white shadow-bumn-2 transition hover:opacity-95">{saving ? (t?.submitSaving ?? "Menyimpan...") : (t?.submitIdle ?? "Buat News Category")}</button>
      </form>
    </main>
  );
}
