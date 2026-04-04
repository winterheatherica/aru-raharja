"use client";

import Link from "next/link";
import { FormEvent, useEffect, useMemo, useState } from "react";
import type { Locale, Dictionary } from "@/i18n/get_dictionary";
import RichTextEditor from "../NewsArticlePage/RichTextEditor";
import { ADMIN_SPACE_ROOM_URL, slugify } from "./_shared";

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

export default function SpaceRoomCreatePage({ locale, dict }: { locale: Locale; dict?: Dictionary }) {
  const [code, setCode] = useState("");
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [capacity, setCapacity] = useState("");
  const [floor, setFloor] = useState("");
  const [address, setAddress] = useState("");
  const [facilities, setFacilities] = useState("");
  const [metaKeywords, setMetaKeywords] = useState("");
  const [isActive, setIsActive] = useState(true);
  const [images, setImages] = useState<File[]>([]);
  const [alts, setAlts] = useState<string[]>([]);
  const [titles, setTitles] = useState<string[]>([]);
  const [thumbnail, setThumbnail] = useState(0);
  const [me, setMe] = useState<MeInfo | null>(null);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const t = (dict as any)?.admin?.spaceRoom?.create;
  const generatedSlug = useMemo(() => slugify(title), [title]);

  useEffect(() => {
    (async () => {
      try {
        const apiBase = process.env.NEXT_PUBLIC_API_BASE!.replace(/\/$/, "");
        const meRes = await fetch(`${apiBase}/api/me`, { credentials: "include" });
        if (meRes.ok) setMe(await meRes.json());
      } catch {
        // ignore me load error
      }
    })();
  }, []);

  function onPickFiles(list: FileList | null) {
    const arr = Array.from(list || []);
    setImages(arr);
    setAlts(arr.map((_, i) => `${title || "Room"} image ${i + 1}`));
    setTitles(arr.map((_, i) => `${title || "Room"} image ${i + 1}`));
    setThumbnail(0);
  }

  async function onSubmit(e: FormEvent) {
    e.preventDefault();
    setSaving(true);
    setError(null);

    try {
      const form = new FormData();
      form.append("language", "ID");
      form.append("code", code);
      form.append("title", title);
      form.append("description", description);
      form.append("facilities", facilities);
      form.append("meta_keywords", metaKeywords);
      form.append("capacity", capacity);
      form.append("floor", floor);
      form.append("address", address);
      form.append("is_active", String(isActive));
      form.append("thumbnail_index", String(thumbnail));
      if (me?.id) form.append("uploaded_by", me.id);
      form.append("image_alts", alts.join("||"));
      form.append("image_titles", titles.join("||"));
      images.forEach((f) => form.append("images", f));

      const res = await fetch(ADMIN_SPACE_ROOM_URL, { method: "POST", credentials: "include", body: form });
      if (!res.ok) throw new Error(await res.text());
      window.location.href = `/${locale}/admin/space-room`;
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
          <h1 className="text-2xl font-semibold text-bumnblue-2">{t?.title ?? "Create Space Room"}</h1>
          <Link href={`/${locale}/admin/space-room`} className="inline-flex items-center justify-center rounded-xl border border-bumnslate-10 bg-white px-3 py-2 text-sm text-bumnslate-6">{t?.backToList ?? "Back to list"}</Link>
        </div>
      </section>

      {error && <p className="rounded-xl border border-red-200 bg-red-50 px-3 py-2 text-sm text-red-600">{error}</p>}

      <form onSubmit={onSubmit} className="grid gap-3 rounded-2xl border border-bumnslate-10 bg-bumn-gradient-white-4 p-5 shadow-bumn-2">
        <p className="inline-flex w-fit rounded-full bg-bumn-gradient-primary-11 px-3 py-1 text-xs font-semibold text-white shadow-bumn-5">Master dulu (ID), lalu EN auto-translate dari backend</p>

        <label className="flex items-center gap-2 text-sm">
          <input type="checkbox" checked={isActive} onChange={(e) => setIsActive(e.target.checked)} /> {t?.labels?.isActive ?? "is_active"}
        </label>

        <div className="rounded-xl border border-bumnslate-10 bg-bumnslate-1 px-3 py-2 text-sm text-bumnslate-7">
          Penulis: <span className="font-semibold">{me?.full_name || me?.username || me?.email || "-"}</span>
        </div>

        <input className="rounded-xl border border-bumnslate-10 bg-white px-3 py-2" value={code} onChange={(e) => setCode(e.target.value)} placeholder="Code" required />
        <div className="grid gap-3 sm:grid-cols-2">
          <input className="rounded-xl border border-bumnslate-10 bg-white px-3 py-2" value={capacity} onChange={(e) => setCapacity(e.target.value)} placeholder="Capacity (angka)" />
          <input className="rounded-xl border border-bumnslate-10 bg-white px-3 py-2" value={floor} onChange={(e) => setFloor(e.target.value)} placeholder="Floor (angka)" />
        </div>
        <input className="rounded-xl border border-bumnslate-10 bg-white px-3 py-2" value={address} onChange={(e) => setAddress(e.target.value)} placeholder="Address" />

        <input className="rounded-xl border border-bumnslate-10 bg-white px-3 py-2" value={title} onChange={(e) => setTitle(e.target.value)} placeholder="Title (ID)" required />
        <input className="rounded-xl border border-bumnslate-10 bg-bumnslate-1 px-3 py-2 text-bumnslate-7" value={generatedSlug} readOnly placeholder="Slug (auto)" />

        <div className="grid gap-1">
          <label className="text-sm font-semibold text-bumnslate-7">Description</label>
          <RichTextEditor value={description} onChange={setDescription} placeholder="Description (ID)" />
        </div>

        <div className="grid gap-1 rounded-xl border border-bumnslate-10 bg-white p-3">
          <p className="text-sm font-semibold text-bumnslate-7">Meta (auto-generated)</p>
          <p className="text-xs text-bumnslate-6">Meta title & meta description otomatis dari title + ringkasan description.</p>
          <p className="text-xs"><span className="font-semibold">Meta title:</span> {deriveMetaTitle(title) || "-"}</p>
          <p className="text-xs"><span className="font-semibold">Meta description:</span> {deriveMetaDescription(description) || "-"}</p>
        </div>

        <input className="rounded-xl border border-bumnslate-10 bg-white px-3 py-2" value={facilities} onChange={(e) => setFacilities(e.target.value)} placeholder="Facilities (pisahkan dengan koma ,)" />
        <input className="rounded-xl border border-bumnslate-10 bg-white px-3 py-2" value={metaKeywords} onChange={(e) => setMetaKeywords(e.target.value)} placeholder="Meta keyword (pisahkan dengan koma ,)" />

        <input type="file" multiple accept="image/*" className="rounded-xl border border-bumnslate-10 bg-white px-3 py-2" onChange={(e) => onPickFiles(e.target.files)} required />
        {images.length > 0 && (
          <div className="grid gap-3 md:grid-cols-2">
            {images.map((img, i) => (
              <div key={i} className={`grid gap-2 rounded-xl border p-3 ${thumbnail === i ? "border-bumnblue-5 bg-blue-50" : "border-bumnslate-10 bg-white"}`}>
                <label className="text-xs font-medium"><input type="radio" checked={thumbnail === i} onChange={() => setThumbnail(i)} /> Thumbnail</label>
                <img src={URL.createObjectURL(img)} alt="preview" className="h-36 w-full rounded-lg object-cover" />
                <input className="rounded-lg border border-bumnslate-10 px-2 py-1 text-sm" value={alts[i] || ""} onChange={(e) => setAlts((p) => p.map((v, idx) => idx === i ? e.target.value : v))} placeholder="Alt" />
                <input className="rounded-lg border border-bumnslate-10 px-2 py-1 text-sm" value={titles[i] || ""} onChange={(e) => setTitles((p) => p.map((v, idx) => idx === i ? e.target.value : v))} placeholder="Title" />
              </div>
            ))}
          </div>
        )}

        <button type="submit" disabled={saving} className="inline-flex w-fit items-center justify-center rounded-xl bg-bumn-gradient-primary-11 px-4 py-2 font-medium text-white shadow-bumn-2 transition hover:opacity-95">{saving ? "Menyimpan..." : "Buat Space Room"}</button>
      </form>
    </main>
  );
}
