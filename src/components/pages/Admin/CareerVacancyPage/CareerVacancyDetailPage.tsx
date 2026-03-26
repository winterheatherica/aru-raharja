"use client";

import Link from "next/link";
import { FormEvent, useEffect, useMemo, useState } from "react";
import type { Locale, Dictionary } from "@/i18n/get_dictionary";
import CareerVacancyPreviewCard from "./CareerVacancyPreviewCard";
import { ADMIN_CAREER_URL, CareerVacancyItem } from "./_shared";

export default function CareerVacancyDetailPage({ locale, dict, vacancyId }: { locale: Locale; dict?: Dictionary; vacancyId: string }) {
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const [title, setTitle] = useState("");
  const [employment, setEmployment] = useState("FULL_TIME");
  const [location, setLocation] = useState("");
  const [openedAt, setOpenedAt] = useState("");
  const [closedAt, setClosedAt] = useState("");
  const [isActive, setIsActive] = useState(true);

  const [translations, setTranslations] = useState<Record<string, { description: string }>>({ ID: { description: "" } });
  const [activeLang, setActiveLang] = useState("ID");

  const t = (dict as any)?.admin?.careerVacancy?.detail;
  const applyText = (dict as any)?.career?.registration?.results?.applyButton;

  useEffect(() => {
    (async () => {
      setLoading(true);
      setError(null);
      try {
        const res = await fetch(`${ADMIN_CAREER_URL}/${vacancyId}`, { credentials: "include" });
        if (!res.ok) throw new Error(await res.text());
        const item: CareerVacancyItem = await res.json();

        setTitle(item.title || "");
        setEmployment(item.employment || "FULL_TIME");
        setLocation(item.location || "");
        setOpenedAt((item.opened_at || "").slice(0, 10));
        setClosedAt((item.closed_at || "").slice(0, 10));
        setIsActive(Boolean(item.is_active));

        const map: Record<string, { description: string }> = {};
        for (const tr of item.translations || []) {
          const lang = (tr.language || "ID").toUpperCase();
          map[lang] = { description: tr.description || "" };
        }
        if (!map.ID) map.ID = { description: "" };

        setTranslations(map);
        setActiveLang(map[locale.toUpperCase()] ? locale.toUpperCase() : Object.keys(map)[0] || "ID");
      } catch (e: any) {
        setError(e?.message || "Failed to load vacancy detail");
      } finally {
        setLoading(false);
      }
    })();
  }, [vacancyId, locale]);

  const langOptions = useMemo(() => Object.keys(translations), [translations]);

  function updateDescription(value: string) {
    setTranslations((prev) => ({
      ...prev,
      [activeLang]: { ...(prev[activeLang] || { description: "" }), description: value },
    }));
  }

  async function onSave(e: FormEvent) {
    e.preventDefault();
    setSaving(true);
    setError(null);
    try {
      const current = translations[activeLang] || { description: "" };
      const body: any = {
        language: activeLang,
        title,
        employment,
        location,
        opened_at: openedAt,
        is_active: isActive,
        description: current.description,
      };
      if (closedAt) body.closed_at = closedAt;

      const res = await fetch(`${ADMIN_CAREER_URL}/${vacancyId}`, {
        method: "PUT",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });
      if (!res.ok) throw new Error(await res.text());
      alert(`${t?.updatedLanguage ?? "Berhasil update bahasa"} ${activeLang}`);
    } catch (e: any) {
      setError(e?.message || "Update failed");
    } finally {
      setSaving(false);
    }
  }

  if (loading) return <main className="mx-auto max-w-7xl p-6 md:pl-72 text-bumnslate-6">{t?.loading ?? "Memuat..."}</main>;

  const current = translations[activeLang] || { description: "" };

  return (
    <main className="mx-auto max-w-7xl p-6 grid gap-4 md:pl-72">
      <section className="rounded-2xl border border-bumnslate-10 bg-bumn-gradient-white-4 p-5 shadow-bumn-2">
        <div className="flex items-center justify-between gap-4">
          <h1 className="text-2xl font-semibold text-bumnblue-2">{t?.titlePrefix ?? "Detail Vacancy"} • {vacancyId}</h1>
          <Link href={`/${locale}/admin/career-vacancy`} className="inline-flex items-center justify-center rounded-xl border border-bumnslate-10 bg-white px-3 py-2 text-sm text-bumnslate-6">{t?.backToList ?? "Kembali ke daftar"}</Link>
        </div>
      </section>

      {error && <p className="rounded-xl border border-red-200 bg-red-50 px-3 py-2 text-sm text-red-600">{error}</p>}

      <form onSubmit={onSave} className="grid gap-3 rounded-2xl border border-bumnslate-10 bg-bumn-gradient-white-4 p-5 shadow-bumn-2">
        <div className="grid gap-3 md:grid-cols-2">
          <input className="rounded-xl border border-bumnslate-10 bg-white px-3 py-2" value={title} onChange={(e) => setTitle(e.target.value)} placeholder={t?.placeholders?.title ?? "title"} />
          <input className="rounded-xl border border-bumnslate-10 bg-white px-3 py-2" value={location} onChange={(e) => setLocation(e.target.value)} placeholder={t?.placeholders?.location ?? "location"} />
        </div>

        <div className="grid gap-3 md:grid-cols-2">
          <select className="rounded-xl border border-bumnslate-10 bg-white px-3 py-2" value={employment} onChange={(e) => setEmployment(e.target.value)}>
            <option value="FULL_TIME">FULL_TIME</option>
            <option value="PART_TIME">PART_TIME</option>
            <option value="INTERNSHIP">INTERNSHIP</option>
            <option value="CONTRACT">CONTRACT</option>
          </select>
          <label className="flex items-center gap-2 text-sm">
            <input type="checkbox" checked={isActive} onChange={(e) => setIsActive(e.target.checked)} /> {t?.labels?.isActive ?? "is_active"}
          </label>
        </div>

        <div className="grid gap-3 md:grid-cols-2">
          <input className="rounded-xl border border-bumnslate-10 bg-white px-3 py-2" type="date" value={openedAt} onChange={(e) => setOpenedAt(e.target.value)} />
          <input className="rounded-xl border border-bumnslate-10 bg-white px-3 py-2" type="date" value={closedAt} onChange={(e) => setClosedAt(e.target.value)} />
        </div>

        <div className="flex flex-wrap gap-2">
          {langOptions.map((lang) => (
            <button key={lang} type="button" onClick={() => setActiveLang(lang)} className={`rounded-xl px-3 py-1.5 text-sm transition ${activeLang === lang ? "bg-bumn-gradient-primary-11 text-white shadow-bumn-2" : "border border-bumnslate-10 bg-white text-bumnslate-6"}`}>{lang}</button>
          ))}
          <button type="button" className="rounded-xl border border-bumnslate-10 bg-white px-3 py-1.5 text-sm text-bumnslate-6" onClick={() => {
            const next = prompt(t?.addLanguagePrompt ?? "Tambah bahasa (contoh: EN)")?.trim().toUpperCase();
            if (!next) return;
            setTranslations((prev) => ({ ...prev, [next]: prev[next] || { description: "" } }));
            setActiveLang(next);
          }}>{t?.addLanguageButton ?? "+ Tambah Bahasa"}</button>
        </div>

        <textarea className="min-h-28 rounded-xl border border-bumnslate-10 bg-white px-3 py-2" value={current.description} onChange={(e) => updateDescription(e.target.value)} placeholder={`${t?.placeholders?.description ?? "description"} (${activeLang})`} />

        <div className="grid gap-2">
          <p className="text-sm font-medium text-bumnslate-6">{t?.previewTitle ?? "Preview"}</p>
          <CareerVacancyPreviewCard dict={dict} title={title} employment={employment} location={location} description={current.description} ctaText={applyText} />
        </div>

        <button type="submit" disabled={saving} className="inline-flex w-fit items-center justify-center rounded-xl bg-bumn-gradient-primary-11 px-4 py-2 font-medium text-white shadow-bumn-2 transition hover:opacity-95">{saving ? (t?.saveSaving ?? "Menyimpan...") : `${t?.savePrefix ?? "Simpan"} ${activeLang}`}</button>
      </form>
    </main>
  );
}
