"use client";

import Link from "next/link";
import { FormEvent, useEffect, useMemo, useState } from "react";
import type { Locale, Dictionary } from "@/i18n/get_dictionary";
import { ADMIN_NEWS_ARTICLE_URL } from "./_shared";
import RichTextEditor from "./RichTextEditor";

type NewsCategoryOption = { id: string; name?: string | null; translations?: Array<{ language?: string | null; name?: string | null }> };
type MeInfo = { id: string; full_name?: string; username?: string; email?: string };

function stripHtml(html: string) {
  return html.replace(/<[^>]+>/g, " ").replace(/\s+/g, " ").trim();
}

function deriveMetaTitle(title: string) {
  return title.trim().slice(0, 70);
}

function deriveMetaDescription(contentHtml: string) {
  const text = stripHtml(contentHtml);
  if (!text) return "";
  return text.slice(0, 160);
}

function slugify(value: string) {
  return value
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "") || "news-article";
}

export default function NewsArticleCreatePage({ locale, dict }: { locale: Locale; dict?: Dictionary }) {
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const [isActive, setIsActive] = useState(true);
  const [publishedAt, setPublishedAt] = useState("");
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [image, setImage] = useState<File | null>(null);
  const [me, setMe] = useState<MeInfo | null>(null);
  const [categories, setCategories] = useState<NewsCategoryOption[]>([]);
  const [selectedCategoryIds, setSelectedCategoryIds] = useState<string[]>([]);

  const t = (dict as any)?.admin?.newsArticle?.create;
  const activeLang = locale.toUpperCase();
  const generatedSlug = useMemo(() => slugify(title), [title]);

  useEffect(() => {
    (async () => {
      try {
        const apiBase = process.env.NEXT_PUBLIC_API_BASE!.replace(/\/$/, "");
        const [meRes, categoryRes] = await Promise.all([
          fetch(`${apiBase}/api/me`, { credentials: "include" }),
          fetch(`${apiBase}/api/admin/news-category`, { credentials: "include" }),
        ]);

        if (meRes.ok) setMe(await meRes.json());
        if (categoryRes.ok) setCategories(await categoryRes.json());
      } catch {
        // ignore load error on form
      }
    })();
  }, []);

  async function onCreate(e: FormEvent) {
    e.preventDefault();
    setSaving(true);
    setError(null);

    try {
      const form = new FormData();
      form.append("language", "ID");
      form.append("title", title);
      form.append("content", content);
      form.append("slug", generatedSlug);
      form.append("meta_title", deriveMetaTitle(title));
      form.append("meta_description", deriveMetaDescription(content));
      form.append("category_ids", selectedCategoryIds.join(","));
      if (me?.id) form.append("uploaded_by", me.id);
      form.append("is_active", String(isActive));
      if (publishedAt) form.append("published_at", new Date(publishedAt).toISOString());
      if (image) form.append("image", image);

      const res = await fetch(ADMIN_NEWS_ARTICLE_URL, {
        method: "POST",
        credentials: "include",
        body: form,
      });

      if (!res.ok) throw new Error(await res.text());
      window.location.href = `/${locale}/admin/news-article`;
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
          <h1 className="text-2xl font-semibold text-bumnblue-2">{t?.title ?? "Create News Article"}</h1>
          <Link href={`/${locale}/admin/news-article`} className="inline-flex items-center justify-center rounded-xl border border-bumnslate-10 bg-white px-3 py-2 text-sm text-bumnslate-6">{t?.backToList ?? "Back to list"}</Link>
        </div>
      </section>

      {error && <p className="rounded-xl border border-red-200 bg-red-50 px-3 py-2 text-sm text-red-600">{error}</p>}

      <form onSubmit={onCreate} className="grid gap-3 rounded-2xl border border-bumnslate-10 bg-bumn-gradient-white-4 p-5 shadow-bumn-2">
        <p className="inline-flex w-fit rounded-full bg-bumn-gradient-primary-11 px-3 py-1 text-xs font-semibold text-white shadow-bumn-5">{t?.defaultLanguageHint ?? "Bahasa default: ID (EN auto-translate dan slug EN dibuat backend)"}</p>

        <label className="flex items-center gap-2 text-sm">
          <input type="checkbox" checked={isActive} onChange={(e) => setIsActive(e.target.checked)} /> {t?.labels?.isActive ?? "is_active"}
        </label>

        <input className="rounded-xl border border-bumnslate-10 bg-white px-3 py-2" type="datetime-local" value={publishedAt} onChange={(e) => setPublishedAt(e.target.value)} />
        <div className="rounded-xl border border-bumnslate-10 bg-bumnslate-1 px-3 py-2 text-sm text-bumnslate-7">
          Penulis: <span className="font-semibold">{me?.full_name || me?.username || me?.email || "-"}</span>
        </div>
        <input className="rounded-xl border border-bumnslate-10 bg-white px-3 py-2" value={title} onChange={(e) => setTitle(e.target.value)} placeholder={`${t?.placeholders?.title ?? "title"} (ID)`} required />
        <input className="rounded-xl border border-bumnslate-10 bg-bumnslate-1 px-3 py-2 text-bumnslate-7" value={generatedSlug} readOnly placeholder={`${t?.placeholders?.slug ?? "slug"} (auto)`} />

        <div className="grid gap-1">
          <label className="text-sm font-semibold text-bumnslate-7">{t?.fields?.content ?? "Content"}</label>
          <RichTextEditor value={content} onChange={setContent} placeholder={`${t?.placeholders?.content ?? "content"} (ID)`} />
        </div>

        <div className="grid gap-1 rounded-xl border border-bumnslate-10 bg-white p-3">
          <p className="text-sm font-semibold text-bumnslate-7">Meta (auto-generated)</p>
          <p className="text-xs text-bumnslate-6">Meta title & meta description otomatis dari Title + ringkasan Content.</p>
          <p className="text-xs"><span className="font-semibold">Meta title:</span> {deriveMetaTitle(title) || "-"}</p>
          <p className="text-xs"><span className="font-semibold">Meta description:</span> {deriveMetaDescription(content) || "-"}</p>
        </div>

        <input className="rounded-xl border border-bumnslate-10 bg-white px-3 py-2" type="file" accept="image/*" onChange={(e) => setImage(e.target.files?.[0] ?? null)} />

        <div className="grid gap-2">
          <div className="flex items-center justify-between gap-2">
            <p className="text-sm font-semibold text-bumnslate-7">News Category</p>
            <span className="text-xs text-bumnslate-6">Terpilih: {selectedCategoryIds.length}</span>
          </div>
          <div className="grid gap-2 sm:grid-cols-2">
            {categories.map((cat) => {
              const tr = cat.translations?.find((x) => (x.language || "").toUpperCase() === activeLang) || cat.translations?.find((x) => (x.language || "").toUpperCase() === "ID") || cat.translations?.[0];
              const name = tr?.name || cat.name || "-";
              const checked = selectedCategoryIds.includes(cat.id);
              return (
                <label key={cat.id} className={`flex items-center justify-between gap-2 rounded-xl border px-3 py-2 text-sm ${checked ? "border-bumnblue-5 bg-blue-50" : "border-bumnslate-10 bg-white"}`}>
                  <span className="flex items-center gap-2">
                    <input
                      type="checkbox"
                      checked={checked}
                      onChange={(e) => {
                        setSelectedCategoryIds((prev) => e.target.checked ? [...prev, cat.id] : prev.filter((id) => id !== cat.id));
                      }}
                    />
                    <span>{name}</span>
                  </span>
                  {checked && <span className="rounded-full bg-bumn-gradient-primary-11 px-2 py-0.5 text-[10px] font-semibold text-white">ACTIVE</span>}
                </label>
              );
            })}
          </div>
        </div>

        <button type="submit" disabled={saving} className="inline-flex w-fit items-center justify-center rounded-xl bg-bumn-gradient-primary-11 px-4 py-2 font-medium text-white shadow-bumn-2 transition hover:opacity-95">{saving ? (t?.submitSaving ?? "Menyimpan...") : (t?.submitIdle ?? "Buat Article")}</button>
      </form>
    </main>
  );
}
