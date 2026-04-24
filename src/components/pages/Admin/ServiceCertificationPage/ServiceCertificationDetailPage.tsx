"use client";

import Link from "next/link";
import { FormEvent, useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import type { Locale, Dictionary } from "@/i18n/get_dictionary";
import { ADMIN_SERVICE_CERTIFICATION_URL, SERVICE_SOLUTIONS, ServiceCode } from "./_shared";

type Translation = { language?: string; title?: string; alt?: string; caption?: string };
type Item = {
  id: string;
  service: string;
  order_index: number;
  is_active: boolean;
  title?: string;
  alt?: string;
  caption?: string;
  translations?: Translation[];
};

export default function ServiceCertificationDetailPage({ locale, dict, certificationId }: { locale: Locale; dict?: Dictionary; certificationId: string }) {
  const search = useSearchParams();
  const service = (search.get("service") || "").toLowerCase() as ServiceCode;
  const selected = SERVICE_SOLUTIONS.includes(service) ? service : null;

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const [orderIndex, setOrderIndex] = useState("1");
  const [title, setTitle] = useState("");
  const [alt, setAlt] = useState("");
  const [caption, setCaption] = useState("");
  const [isActive, setIsActive] = useState(true);
  const [serviceCode, setServiceCode] = useState("");
  const [activeLang, setActiveLang] = useState(locale.toUpperCase());
  const [langOptions, setLangOptions] = useState<string[]>(["ID"]);

  const t = (dict as any)?.admin?.serviceCertification?.detail;
  const f = t?.fields;
  const h = t?.helpers;

  async function loadByLang(lang: string) {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch(`${ADMIN_SERVICE_CERTIFICATION_URL}/${certificationId}?lang=${lang}`, { credentials: "include" });
      if (!res.ok) throw new Error(await res.text());
      const item: Item = await res.json();
      setServiceCode(item.service);
      setOrderIndex(String(item.order_index || 1));
      setTitle(item.title || "");
      setAlt(item.alt || "");
      setCaption(item.caption || "");
      setIsActive(Boolean(item.is_active));

      const langs = Array.from(new Set(["ID", ...(item.translations || []).map((x) => (x.language || "ID").toUpperCase())]));
      setLangOptions(langs);
    } catch (e: any) {
      setError(e?.message || "Failed to load certification detail");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    loadByLang(activeLang);
  }, [certificationId, activeLang]);

  async function onSubmit(e: FormEvent) {
    e.preventDefault();
    setSaving(true);
    setError(null);
    try {
      const res = await fetch(`${ADMIN_SERVICE_CERTIFICATION_URL}/${certificationId}`, {
        method: "PUT",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          service: serviceCode,
          language: activeLang,
          order_index: Number(orderIndex) || 1,
          is_active: isActive,
          title,
          alt,
          caption,
        }),
      });
      if (!res.ok) throw new Error(await res.text());
      alert(`${t?.saved ?? "Saved"} (${activeLang})`);
      await loadByLang(activeLang);
    } catch (e: any) {
      setError(e?.message || "Save failed");
    } finally {
      setSaving(false);
    }
  }

  async function onDelete() {
    if (!confirm(t?.deleteConfirm ?? "Hard delete certification ini?")) return;
    const res = await fetch(`${ADMIN_SERVICE_CERTIFICATION_URL}/${certificationId}`, { method: "DELETE", credentials: "include" });
    if (res.ok) {
      const svc = selected || serviceCode.toLowerCase();
      window.location.href = `/${locale}/admin/service-certification?service=${svc}`;
    }
  }

  if (loading) return <main className="mx-auto max-w-7xl p-6 md:pl-72">{t?.loading ?? "Loading..."}</main>;

  const backService = selected || serviceCode.toLowerCase();

  return (
    <main className="mx-auto max-w-7xl p-6 grid gap-4 md:pl-72">
      <section className="rounded-2xl border border-bumnslate-10 bg-bumn-gradient-white-4 p-5 shadow-bumn-2 flex items-center justify-between">
        <h1 className="text-2xl font-semibold text-bumnblue-2">{t?.titlePrefix ?? "Detail Service Certification"} • {certificationId}</h1>
        <Link href={`/${locale}/admin/service-certification?service=${backService}`} className="rounded-xl border border-bumnslate-10 bg-white px-3 py-2 text-sm">{t?.backToList ?? "Back"}</Link>
      </section>
      {error && <p className="rounded-xl border border-red-200 bg-red-50 px-3 py-2 text-sm text-red-600">{error}</p>}
      <form onSubmit={onSubmit} className="grid gap-3 rounded-2xl border border-bumnslate-10 bg-white p-5 shadow-bumn-2">
        <div className="grid gap-1">
          <label className="text-sm font-semibold text-bumnslate-7">{f?.languageTabs ?? "Language"}</label>
          <p className="text-xs text-bumnslate-5">{h?.languageTabs ?? "Pilih bahasa terjemahan certification yang ingin kamu edit."}</p>
          <div className="flex flex-wrap gap-2">
            {[...langOptions].sort((a, b) => { const ra = a === "EN" ? 0 : a === "ID" ? 1 : 2; const rb = b === "EN" ? 0 : b === "ID" ? 1 : 2; return ra - rb || a.localeCompare(b); }).map((lang) => (
              <button key={lang} type="button" onClick={() => setActiveLang(lang)} className={`rounded-xl px-3 py-1.5 text-sm transition ${activeLang === lang ? "bg-bumn-gradient-primary-11 text-white shadow-bumn-2" : "border border-bumnslate-10 bg-white text-bumnslate-6"}`}>{lang}</button>
            ))}
</div>
        </div>

        <div className="grid gap-1">
          <label className="text-sm font-semibold text-bumnslate-7">{f?.status ?? "Status"}</label>
          <p className="text-xs text-bumnslate-5">{h?.status ?? "Aktifkan jika item certification ini ingin tampil di halaman service."}</p>
          <label className="flex items-center gap-2 text-sm"><input type="checkbox" checked={isActive} onChange={(e) => setIsActive(e.target.checked)} /> {t?.labels?.isActive ?? "is_active"}</label>
        </div>

        <div className="grid gap-1">
          <label className="text-sm font-semibold text-bumnslate-7">{f?.orderIndex ?? "Order Index"}</label>
          <p className="text-xs text-bumnslate-5">{h?.orderIndex ?? "Urutan tampil certification pada service. Angka lebih kecil muncul lebih dulu."}</p>
          <input className="rounded-xl border border-bumnslate-10 px-3 py-2" value={orderIndex} onChange={(e) => setOrderIndex(e.target.value)} placeholder={t?.placeholders?.orderIndex ?? "order_index"} />
        </div>

        <div className="grid gap-1">
          <label className="text-sm font-semibold text-bumnslate-7">{f?.title ?? "Title"}</label>
          <p className="text-xs text-bumnslate-5">{h?.title ?? "Judul certification yang ditampilkan ke user."}</p>
          <input className="rounded-xl border border-bumnslate-10 px-3 py-2" value={title} onChange={(e) => setTitle(e.target.value)} placeholder={`${t?.placeholders?.title ?? "title"} (${activeLang})`} required />
        </div>

        <div className="grid gap-1">
          <label className="text-sm font-semibold text-bumnslate-7">{f?.altText ?? "Alt Text"}</label>
          <p className="text-xs text-bumnslate-5">{h?.altText ?? "Teks alternatif untuk aksesibilitas dan fallback gambar certification."}</p>
          <input className="rounded-xl border border-bumnslate-10 px-3 py-2" value={alt} onChange={(e) => setAlt(e.target.value)} placeholder={`${t?.placeholders?.alt ?? "alt"} (${activeLang})`} />
        </div>

        <div className="grid gap-1">
          <label className="text-sm font-semibold text-bumnslate-7">{f?.caption ?? "Caption"}</label>
          <p className="text-xs text-bumnslate-5">{h?.caption ?? "Keterangan tambahan singkat untuk certification (opsional)."}</p>
          <textarea className="rounded-xl border border-bumnslate-10 px-3 py-2" value={caption} onChange={(e) => setCaption(e.target.value)} placeholder={`${t?.placeholders?.caption ?? "caption"} (${activeLang})`} rows={3} />
        </div>

        <div className="flex gap-2">
          <button type="submit" disabled={saving} className="rounded-xl bg-bumn-gradient-primary-11 px-4 py-2 text-white w-fit">{saving ? (t?.saveSaving ?? "Saving...") : `${t?.saveIdle ?? "Save"} ${activeLang}`}</button>
          <button type="button" onClick={onDelete} className="rounded-xl border border-red-300 px-4 py-2 text-red-600 w-fit">{t?.deleteButton ?? "Hard Delete"}</button>
        </div>
      </form>
    </main>
  );
}
