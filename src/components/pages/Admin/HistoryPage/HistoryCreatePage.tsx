"use client";

import Link from "next/link";
import { FormEvent, useState } from "react";
import type { Locale, Dictionary } from "@/i18n/get_dictionary";
import { ADMIN_HISTORY_URL } from "./_shared";
import HistoryTableEditor from "./HistoryTableEditor";

export default function HistoryCreatePage({ locale, dict }: { locale: Locale; dict?: Dictionary }) {
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const language = "ID";
  const [year, setYear] = useState<number | "">("");
  const [isActive, setIsActive] = useState(true);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [tableHeaders, setTableHeaders] = useState<string[]>(["", "", ""]);
  const [tableRows, setTableRows] = useState<string[][]>([["", "", ""]]);

  const t = (dict as any)?.admin?.history?.create;

  async function onCreate(e: FormEvent) {
    e.preventDefault();
    setSaving(true);
    setError(null);
    try {
      const normalizedHeaders = tableHeaders.map((x) => x.trim()).filter(Boolean);
      const colCount = Math.max(normalizedHeaders.length, ...tableRows.map((r) => r.length), 0);
      const normalizedRows = tableRows
        .map((r) => Array.from({ length: colCount }, (_, i) => (r[i] ?? "").trim()))
        .filter((r) => r.some((c) => c.length > 0));

      const body = {
        language,
        year: year === "" ? null : year,
        is_active: isActive,
        title,
        description,
        table_headers: normalizedHeaders,
        table_rows: normalizedRows,
      };

      const res = await fetch(ADMIN_HISTORY_URL, {
        method: "POST",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });
      if (!res.ok) throw new Error(await res.text());

      window.location.href = `/${locale}/admin/history`;
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
          <h1 className="text-2xl font-semibold text-bumnblue-2">{t?.title ?? "Create History"}</h1>
          <Link href={`/${locale}/admin/history`} className="inline-flex items-center justify-center rounded-xl border border-bumnslate-10 bg-white px-3 py-2 text-sm text-bumnslate-6">{t?.backToList ?? "Back to list"}</Link>
        </div>
      </section>

      {error && <p className="rounded-xl border border-red-200 bg-red-50 px-3 py-2 text-sm text-red-600">{error}</p>}

      <form onSubmit={onCreate} className="grid gap-3 rounded-2xl border border-bumnslate-10 bg-bumn-gradient-white-4 p-5 shadow-bumn-2">
        <p className="inline-flex w-fit rounded-full bg-bumn-gradient-primary-11 px-3 py-1 text-xs font-semibold text-white shadow-bumn-5">{t?.defaultLanguageHint ?? "Bahasa default: ID (EN auto-translate oleh backend)"}</p>
        <input className="rounded-xl border border-bumnslate-10 bg-white px-3 py-2" type="number" value={year} onChange={(e) => setYear(e.target.value === "" ? "" : Number(e.target.value))} placeholder={t?.placeholders?.year ?? "year"} />
        <label className="flex items-center gap-2 text-sm"><input type="checkbox" checked={isActive} onChange={(e) => setIsActive(e.target.checked)} /> {t?.labels?.isActive ?? "is_active"}</label>

        <input className="rounded-xl border border-bumnslate-10 bg-white px-3 py-2" value={title} onChange={(e) => setTitle(e.target.value)} placeholder={t?.placeholders?.title ?? "title"} />
        <textarea className="min-h-28 rounded-xl border border-bumnslate-10 bg-white px-3 py-2" value={description} onChange={(e) => setDescription(e.target.value)} placeholder={t?.placeholders?.description ?? "description"} />

        <HistoryTableEditor headers={tableHeaders} rows={tableRows} setHeaders={setTableHeaders} setRows={setTableRows} />

        <button type="submit" disabled={saving} className="inline-flex w-fit items-center justify-center rounded-xl bg-bumn-gradient-primary-11 px-4 py-2 font-medium text-white shadow-bumn-2">{saving ? (t?.submitSaving ?? "Saving...") : (t?.submitIdle ?? "Create History")}</button>
      </form>
    </main>
  );
}
