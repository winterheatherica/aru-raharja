"use client";

import Link from "next/link";
import { FormEvent, useState } from "react";
import type { Locale, Dictionary } from "@/i18n/get_dictionary";
import CareerVacancyPreviewCard from "./CareerVacancyPreviewCard";
import { ADMIN_CAREER_URL } from "./_shared";

export default function CareerVacancyCreatePage({ locale, dict }: { locale: Locale; dict?: Dictionary }) {
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const [title, setTitle] = useState("");
  const [employment, setEmployment] = useState("FULL_TIME");
  const [location, setLocation] = useState("");
  const [openedAt, setOpenedAt] = useState(new Date().toISOString().slice(0, 10));
  const [closedAt, setClosedAt] = useState("");
  const [isActive, setIsActive] = useState(true);
  const [idDescription, setIdDescription] = useState("");

  const t = (dict as any)?.admin?.careerVacancy?.create;
  const h = t?.helpers;
  const applyText = (dict as any)?.career?.registration?.results?.applyButton;

  async function onCreate(e: FormEvent) {
    e.preventDefault();

    setSaving(true);
    setError(null);
    try {
      const body: any = {
        language: "ID",
        title,
        employment,
        location,
        opened_at: openedAt,
        is_active: isActive,
        description: idDescription,
      };
      if (closedAt) body.closed_at = closedAt;

      const res = await fetch(ADMIN_CAREER_URL, {
        method: "POST",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });
      if (!res.ok) throw new Error(await res.text());

      window.location.href = `/${locale}/admin/career-vacancy`;
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
          <h1 className="text-2xl font-semibold text-bumnblue-2">{t?.title ?? "Create Vacancy"}</h1>
          <Link href={`/${locale}/admin/career-vacancy`} className="inline-flex items-center justify-center rounded-xl border border-bumnslate-10 bg-white px-3 py-2 text-sm text-bumnslate-6">{t?.backToList ?? "Back to list"}</Link>
        </div>
      </section>

      {error && <p className="rounded-xl border border-red-200 bg-red-50 px-3 py-2 text-sm text-red-600">{error}</p>}

      <form onSubmit={onCreate} className="grid gap-3 rounded-2xl border border-bumnslate-10 bg-bumn-gradient-white-4 p-5 shadow-bumn-2">
        <p className="inline-flex w-fit rounded-full bg-bumn-gradient-primary-11 px-3 py-1 text-xs font-semibold text-white shadow-bumn-5">{t?.defaultLanguageHint ?? "Bahasa default: ID (EN auto-translate oleh backend)"}</p>

        <div className="grid gap-3 md:grid-cols-2">
          <div className="grid gap-1">
            <label className="text-sm font-semibold text-bumnslate-7">{t?.fields?.title ?? "Title"}</label>
            <p className="text-xs text-bumnslate-5">{h?.title ?? (dict as any)?.admin?.common?.formFieldHelper ?? "Use this field according to its label and function."}</p>
            <input className="rounded-xl border border-bumnslate-10 bg-white px-3 py-2" value={title} onChange={(e) => setTitle(e.target.value)} placeholder={t?.placeholders?.title ?? "title"} />
          </div>
          <div className="grid gap-1">
            <label className="text-sm font-semibold text-bumnslate-7">{t?.fields?.location ?? "Location"}</label>
            <p className="text-xs text-bumnslate-5">{h?.location ?? (dict as any)?.admin?.common?.formFieldHelper ?? "Use this field according to its label and function."}</p>
            <input className="rounded-xl border border-bumnslate-10 bg-white px-3 py-2" value={location} onChange={(e) => setLocation(e.target.value)} placeholder={t?.placeholders?.location ?? "location"} />
          </div>
        </div>

        <div className="grid gap-3 md:grid-cols-2">
          <div className="grid gap-1">
            <label className="text-sm font-semibold text-bumnslate-7">{t?.fields?.employment ?? "Employment"}</label>
            <p className="text-xs text-bumnslate-5">{h?.employment ?? (dict as any)?.admin?.common?.formFieldHelper ?? "Use this field according to its label and function."}</p>
            <select className="rounded-xl border border-bumnslate-10 bg-white px-3 py-2" value={employment} onChange={(e) => setEmployment(e.target.value)}>
              <option value="FULL_TIME">FULL_TIME</option>
              <option value="PART_TIME">PART_TIME</option>
              <option value="INTERNSHIP">INTERNSHIP</option>
              <option value="CONTRACT">CONTRACT</option>
            </select>
          </div>
          <div className="grid gap-1">
            <label className="text-sm font-semibold text-bumnslate-7">{t?.fields?.status ?? "Status"}</label>
            <p className="text-xs text-bumnslate-5">{h?.status ?? (dict as any)?.admin?.common?.formFieldHelper ?? "Use this field according to its label and function."}</p>
            <label className="flex items-center gap-2 text-sm">
              <input type="checkbox" checked={isActive} onChange={(e) => setIsActive(e.target.checked)} /> {t?.labels?.isActive ?? "is_active"}
            </label>
          </div>
        </div>

        <div className="grid gap-3 md:grid-cols-2">
          <div className="grid gap-1">
            <label className="text-sm font-semibold text-bumnslate-7">{t?.fields?.openedAt ?? "Opened At"}</label>
            <p className="text-xs text-bumnslate-5">{h?.openedAt ?? (dict as any)?.admin?.common?.formFieldHelper ?? "Use this field according to its label and function."}</p>
            <input className="rounded-xl border border-bumnslate-10 bg-white px-3 py-2" type="date" value={openedAt} onChange={(e) => setOpenedAt(e.target.value)} />
          </div>
          <div className="grid gap-1">
            <label className="text-sm font-semibold text-bumnslate-7">{t?.fields?.closedAt ?? "Closed At"}</label>
            <p className="text-xs text-bumnslate-5">{h?.closedAt ?? (dict as any)?.admin?.common?.formFieldHelper ?? "Use this field according to its label and function."}</p>
            <input className="rounded-xl border border-bumnslate-10 bg-white px-3 py-2" type="date" value={closedAt} onChange={(e) => setClosedAt(e.target.value)} />
          </div>
        </div>

        <div className="grid gap-1">
          <label className="text-sm font-semibold text-bumnslate-7">{t?.fields?.description ?? "Description"}</label>
          <p className="text-xs text-bumnslate-5">{h?.description ?? (dict as any)?.admin?.common?.formFieldHelper ?? "Use this field according to its label and function."}</p>
          <textarea className="min-h-28 rounded-xl border border-bumnslate-10 bg-white px-3 py-2" value={idDescription} onChange={(e) => setIdDescription(e.target.value)} placeholder={t?.placeholders?.description ?? "description (ID)"} />
        </div>

        <div className="grid gap-2">
          <p className="text-sm font-medium text-bumnslate-6">{t?.previewTitle ?? "Preview"}</p>
          <CareerVacancyPreviewCard dict={dict} title={title} employment={employment} location={location} description={idDescription} ctaText={applyText} />
        </div>

        <button type="submit" disabled={saving} className="inline-flex w-fit items-center justify-center rounded-xl bg-bumn-gradient-primary-11 px-4 py-2 font-medium text-white shadow-bumn-2 transition hover:opacity-95">{saving ? (t?.submitSaving ?? "Menyimpan...") : (t?.submitIdle ?? "Buat Vacancy")}</button>
      </form>
    </main>
  );
}
