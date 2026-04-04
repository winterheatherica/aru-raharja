"use client";

import Link from "next/link";
import { FormEvent, useEffect, useMemo, useState } from "react";
import type { Locale, Dictionary } from "@/i18n/get_dictionary";
import RichTextEditor from "../NewsArticlePage/RichTextEditor";
import { ADMIN_SPACE_ROOM_URL, SpaceRoomItem, slugify } from "./_shared";

type MeInfo = { id: string; full_name?: string; username?: string; email?: string };

type TranslationForm = {
  title: string;
  description: string;
  facilities: string;
  metaKeywords: string;
  slug: string;
};

function toLocalDateTime(raw?: string | null) {
  if (!raw) return "-";
  const d = new Date(raw);
  if (Number.isNaN(d.getTime())) return "-";
  return d.toLocaleString();
}

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

export default function SpaceRoomDetailPage({ locale, dict, roomId }: { locale: Locale; dict?: Dictionary; roomId: string }) {
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const [code, setCode] = useState("");
  const [capacity, setCapacity] = useState("");
  const [floor, setFloor] = useState("");
  const [address, setAddress] = useState("");
  const [isActive, setIsActive] = useState(true);

  const [translations, setTranslations] = useState<Record<string, TranslationForm>>({ ID: { title: "", description: "", facilities: "", metaKeywords: "", slug: "" } });
  const [activeLang, setActiveLang] = useState("ID");

  const [existingImages, setExistingImages] = useState<Array<{ id: string; image_url: string; is_thumbnail?: boolean; alt?: string; title?: string }>>([]);
  const [newImages, setNewImages] = useState<File[]>([]);
  const [newAlts, setNewAlts] = useState<string[]>([]);
  const [newTitles, setNewTitles] = useState<string[]>([]);
  const [newThumbnail, setNewThumbnail] = useState(0);

  const [me, setMe] = useState<MeInfo | null>(null);
  const [createdAt, setCreatedAt] = useState<string | null>(null);
  const [updatedAt, setUpdatedAt] = useState<string | null>(null);

  const t = (dict as any)?.admin?.spaceRoom?.detail;

  useEffect(() => {
    (async () => {
      setLoading(true);
      setError(null);
      try {
        const res = await fetch(`${ADMIN_SPACE_ROOM_URL}/${roomId}`, { credentials: "include" });
        if (!res.ok) throw new Error(await res.text());

        const item: SpaceRoomItem = await res.json();
        setCode(item.code || "");
        setCapacity(item.capacity == null ? "" : String(item.capacity));
        setFloor(item.floor == null ? "" : String(item.floor));
        setAddress(item.address || "");
        setIsActive(Boolean(item.is_active ?? true));
        setExistingImages(item.images || []);
        setCreatedAt(item.created_at || null);
        setUpdatedAt(item.updated_at || null);

        const map: Record<string, TranslationForm> = {};
        for (const tr of item.translations || []) {
          const lang = (tr.language || "ID").toUpperCase();
          const title = tr.title || "";
          map[lang] = {
            title,
            description: tr.description || "",
            facilities: (tr.facilities || []).join(", "),
            metaKeywords: (tr.meta_keywords || []).join(", "),
            slug: tr.slug || slugify(title),
          };
        }
        if (!map.ID) map.ID = { title: "", description: "", facilities: "", metaKeywords: "", slug: "" };
        setTranslations(map);
        setActiveLang(map[locale.toUpperCase()] ? locale.toUpperCase() : Object.keys(map)[0] || "ID");
      } catch (e: any) {
        setError(e?.message || "Failed to load room detail");
      } finally {
        setLoading(false);
      }
    })();
  }, [roomId, locale]);

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

  const langOptions = useMemo(() => Object.keys(translations), [translations]);
  const current = translations[activeLang] || { title: "", description: "", facilities: "", metaKeywords: "", slug: "" };

  function updateField(field: keyof TranslationForm, value: string) {
    setTranslations((prev) => {
      const base = prev[activeLang] || { title: "", description: "", facilities: "", metaKeywords: "", slug: "" };
      const next = { ...base, [field]: value };
      if (field === "title") next.slug = slugify(value);
      return { ...prev, [activeLang]: next };
    });
  }

  function onPickFiles(list: FileList | null) {
    const arr = Array.from(list || []);
    setNewImages(arr);
    setNewAlts(arr.map((_, i) => `${current.title || "Room"} image ${i + 1}`));
    setNewTitles(arr.map((_, i) => `${current.title || "Room"} image ${i + 1}`));
    setNewThumbnail(0);
  }

  async function onSave(e: FormEvent) {
    e.preventDefault();
    setSaving(true);
    setError(null);

    try {
      const form = new FormData();
      form.append("language", activeLang);
      form.append("code", code);
      form.append("title", current.title);
      form.append("description", current.description);
      form.append("facilities", current.facilities);
      form.append("meta_keywords", current.metaKeywords);
      form.append("capacity", capacity);
      form.append("floor", floor);
      form.append("address", address);
      form.append("is_active", String(isActive));
      if (me?.id) form.append("uploaded_by", me.id);

      if (newImages.length > 0) {
        form.append("thumbnail_index", String(newThumbnail));
        form.append("image_alts", newAlts.join("||"));
        form.append("image_titles", newTitles.join("||"));
        newImages.forEach((f) => form.append("images", f));
      }

      const res = await fetch(`${ADMIN_SPACE_ROOM_URL}/${roomId}`, {
        method: "PUT",
        credentials: "include",
        body: form,
      });
      if (!res.ok) throw new Error(await res.text());

      alert(`${t?.updatedLanguage ?? "Berhasil update bahasa"} ${activeLang}`);
      window.location.reload();
    } catch (e: any) {
      setError(e?.message || "Update failed");
    } finally {
      setSaving(false);
    }
  }

  if (loading) return <main className="mx-auto max-w-7xl p-6 md:pl-72 text-bumnslate-6">{t?.loading ?? "Memuat..."}</main>;

  return (
    <main className="mx-auto max-w-7xl p-6 grid gap-4 md:pl-72">
      <section className="rounded-2xl border border-bumnslate-10 bg-bumn-gradient-white-4 p-5 shadow-bumn-2">
        <div className="flex items-center justify-between gap-4">
          <h1 className="text-2xl font-semibold text-bumnblue-2">{t?.titlePrefix ?? "Detail Space Room"} • {roomId}</h1>
          <Link href={`/${locale}/admin/space-room`} className="inline-flex items-center justify-center rounded-xl border border-bumnslate-10 bg-white px-3 py-2 text-sm text-bumnslate-6">{t?.backToList ?? "Back to list"}</Link>
        </div>
      </section>

      {error && <p className="rounded-xl border border-red-200 bg-red-50 px-3 py-2 text-sm text-red-600">{error}</p>}

      <form onSubmit={onSave} className="grid gap-3 rounded-2xl border border-bumnslate-10 bg-bumn-gradient-white-4 p-5 shadow-bumn-2">
        <label className="flex items-center gap-2 text-sm">
          <input type="checkbox" checked={isActive} onChange={(e) => setIsActive(e.target.checked)} /> {t?.labels?.isActive ?? "is_active"}
        </label>

        <div className="rounded-xl border border-bumnslate-10 bg-bumnslate-1 px-3 py-2 text-sm text-bumnslate-7">
          Penulis: <span className="font-semibold">{me?.full_name || me?.username || me?.email || "-"}</span>
        </div>

        <div className="grid gap-3 sm:grid-cols-2">
          <input className="rounded-xl border border-bumnslate-10 bg-white px-3 py-2" value={code} onChange={(e) => setCode(e.target.value)} placeholder="Code" required />
          <input className="rounded-xl border border-bumnslate-10 bg-white px-3 py-2" value={address} onChange={(e) => setAddress(e.target.value)} placeholder="Address" />
          <input className="rounded-xl border border-bumnslate-10 bg-white px-3 py-2" value={capacity} onChange={(e) => setCapacity(e.target.value)} placeholder="Capacity (angka)" />
          <input className="rounded-xl border border-bumnslate-10 bg-white px-3 py-2" value={floor} onChange={(e) => setFloor(e.target.value)} placeholder="Floor (angka)" />
        </div>

        <div className="flex flex-wrap gap-2">
          {langOptions.map((lang) => (
            <button key={lang} type="button" onClick={() => setActiveLang(lang)} className={`rounded-xl px-3 py-1.5 text-sm transition ${activeLang === lang ? "bg-bumn-gradient-primary-11 text-white shadow-bumn-2" : "border border-bumnslate-10 bg-white text-bumnslate-6"}`}>{lang}</button>
          ))}
          <button
            type="button"
            className="rounded-xl border border-bumnslate-10 bg-white px-3 py-1.5 text-sm text-bumnslate-6"
            onClick={() => {
              const next = prompt("Tambah bahasa (contoh: EN)")?.trim().toUpperCase();
              if (!next) return;
              setTranslations((prev) => ({ ...prev, [next]: prev[next] || { title: "", description: "", facilities: "", metaKeywords: "", slug: "" } }));
              setActiveLang(next);
            }}
          >+ Tambah Bahasa</button>
        </div>

        <input className="rounded-xl border border-bumnslate-10 bg-white px-3 py-2" value={current.title} onChange={(e) => updateField("title", e.target.value)} placeholder={`Title (${activeLang})`} required />
        <input className="rounded-xl border border-bumnslate-10 bg-bumnslate-1 px-3 py-2 text-bumnslate-7" value={slugify(current.title)} readOnly placeholder="Slug (auto)" />

        <div className="grid gap-1">
          <label className="text-sm font-semibold text-bumnslate-7">Description</label>
          <RichTextEditor value={current.description} onChange={(v) => updateField("description", v)} placeholder={`Description (${activeLang})`} />
        </div>

        <div className="grid gap-1 rounded-xl border border-bumnslate-10 bg-white p-3">
          <p className="text-sm font-semibold text-bumnslate-7">Meta (auto-generated)</p>
          <p className="text-xs text-bumnslate-6">Meta title & meta description otomatis dari title + ringkasan description.</p>
          <p className="text-xs"><span className="font-semibold">Meta title:</span> {deriveMetaTitle(current.title) || "-"}</p>
          <p className="text-xs"><span className="font-semibold">Meta description:</span> {deriveMetaDescription(current.description) || "-"}</p>
        </div>

        <input className="rounded-xl border border-bumnslate-10 bg-white px-3 py-2" value={current.facilities} onChange={(e) => updateField("facilities", e.target.value)} placeholder="Facilities (pisahkan dengan koma ,)" />
        <input className="rounded-xl border border-bumnslate-10 bg-white px-3 py-2" value={current.metaKeywords} onChange={(e) => updateField("metaKeywords", e.target.value)} placeholder="Meta keyword (pisahkan dengan koma ,)" />

        <div className="grid gap-2 rounded-xl border border-bumnslate-10 bg-white p-3">
          <p className="text-sm font-semibold text-bumnslate-7">Current Images</p>
          {existingImages.length === 0 ? (
            <p className="text-xs text-bumnslate-6">Belum ada image.</p>
          ) : (
            <div className="grid gap-3 md:grid-cols-2">
              {existingImages.map((img) => (
                <div key={img.id} className="grid gap-2 rounded-xl border border-bumnslate-10 p-2">
                  <img src={img.image_url} alt={img.alt || "room"} className="h-32 w-full rounded-lg object-cover" />
                  <p className="text-xs text-bumnslate-6">{img.title || "-"} {img.is_thumbnail ? "• THUMBNAIL" : ""}</p>
                </div>
              ))}
            </div>
          )}
        </div>

        <div className="grid gap-2 rounded-xl border border-amber-200 bg-amber-50 p-3">
          <p className="text-sm font-semibold text-amber-800">Replace Images (optional)</p>
          <p className="text-xs text-amber-700">Kalau upload image baru saat update, image lama akan diganti semua.</p>
          <input type="file" multiple accept="image/*" className="rounded-xl border border-bumnslate-10 bg-white px-3 py-2" onChange={(e) => onPickFiles(e.target.files)} />
        </div>

        {newImages.length > 0 && (
          <div className="grid gap-3 md:grid-cols-2">
            {newImages.map((img, i) => (
              <div key={i} className={`grid gap-2 rounded-xl border p-3 ${newThumbnail === i ? "border-bumnblue-5 bg-blue-50" : "border-bumnslate-10 bg-white"}`}>
                <label className="text-xs font-medium"><input type="radio" checked={newThumbnail === i} onChange={() => setNewThumbnail(i)} /> Thumbnail</label>
                <img src={URL.createObjectURL(img)} alt="preview" className="h-36 w-full rounded-lg object-cover" />
                <input className="rounded-lg border border-bumnslate-10 px-2 py-1 text-sm" value={newAlts[i] || ""} onChange={(e) => setNewAlts((p) => p.map((v, idx) => idx === i ? e.target.value : v))} placeholder="Alt" />
                <input className="rounded-lg border border-bumnslate-10 px-2 py-1 text-sm" value={newTitles[i] || ""} onChange={(e) => setNewTitles((p) => p.map((v, idx) => idx === i ? e.target.value : v))} placeholder="Title" />
              </div>
            ))}
          </div>
        )}

        <div className="grid gap-1 rounded-xl border border-bumnslate-10 bg-bumnslate-1 p-3 text-xs text-bumnslate-7">
          <p>Created: {toLocalDateTime(createdAt)}</p>
          <p>Updated: {toLocalDateTime(updatedAt)}</p>
        </div>

        <button type="submit" disabled={saving} className="inline-flex w-fit items-center justify-center rounded-xl bg-bumn-gradient-primary-11 px-4 py-2 font-medium text-white shadow-bumn-2 transition hover:opacity-95">{saving ? (t?.saveSaving ?? "Menyimpan...") : `${t?.savePrefix ?? "Simpan"} ${activeLang}`}</button>
      </form>
    </main>
  );
}
