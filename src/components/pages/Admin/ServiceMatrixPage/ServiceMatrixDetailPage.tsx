"use client";

import Link from "next/link";
import { FormEvent, useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import type { Locale, Dictionary } from "@/i18n/get_dictionary";
import { ADMIN_SERVICE_MATRIX_URL, SERVICE_SOLUTIONS, ServiceCode } from "./_shared";

type Column = { key: string; label: string; popular: boolean; order_index: number };
type Row = { key: string; feature: string; order_index: number; cells: Record<string, string> };
type MatrixTranslation = { language?: string; title?: string; description?: string; footnote?: string };
type Item = {
  id: string;
  service: string;
  compact: boolean;
  is_active: boolean;
  title?: string;
  description?: string;
  footnote?: string;
  translations?: MatrixTranslation[];
  columns?: Column[];
  rows?: Array<{ key: string; feature: string; order_index: number; cells?: Array<{ column_key: string; value_text?: string }> }>;
};

export default function ServiceMatrixDetailPage({ locale, dict, matrixId }: { locale: Locale; dict?: Dictionary; matrixId: string }) {
  const search = useSearchParams();
  const service = (search.get("service") || "").toLowerCase() as ServiceCode;
  const selected = SERVICE_SOLUTIONS.includes(service) ? service : null;

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [footnote, setFootnote] = useState("");
  const [compact, setCompact] = useState(false);
  const [isActive, setIsActive] = useState(true);
  const [serviceCode, setServiceCode] = useState("");
  const [columns, setColumns] = useState<Column[]>([]);
  const [rows, setRows] = useState<Row[]>([]);
  const [activeLang, setActiveLang] = useState(locale.toUpperCase());
  const [langOptions, setLangOptions] = useState<string[]>(["ID"]);

  const t = (dict as any)?.admin?.serviceMatrix?.detail;
  const f = t?.fields;
  const h = t?.helpers;

  function addColumn() {
    const n = columns.length + 1;
    const key = `kolom_${n}`;
    setColumns((prev) => [...prev, { key, label: `Kolom ${n}`, popular: false, order_index: n }]);
    setRows((prev) => prev.map((r) => ({ ...r, cells: { ...r.cells, [key]: "-" } })));
  }

  function addRow() {
    const n = rows.length + 1;
    const cells: Record<string, string> = {};
    columns.forEach((c) => {
      cells[c.key] = "-";
    });
    setRows((prev) => [...prev, { key: `fitur_${n}`, feature: `Fitur ${n}`, order_index: n, cells }]);
  }

  async function loadByLang(lang: string) {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch(`${ADMIN_SERVICE_MATRIX_URL}/${matrixId}?lang=${lang}`, { credentials: "include" });
      if (!res.ok) throw new Error(await res.text());
      const item: Item = await res.json();

      setServiceCode(item.service);
      setTitle(item.title || "");
      setDescription(item.description || "");
      setFootnote(item.footnote || "");
      setCompact(Boolean(item.compact));
      setIsActive(Boolean(item.is_active));

      const langs = Array.from(new Set(["ID", ...(item.translations || []).map((x) => (x.language || "ID").toUpperCase())]));
      setLangOptions(langs);

      const cols = item.columns || [];
      setColumns(cols);

      const mappedRows: Row[] = (item.rows || []).map((r) => {
        const cells: Record<string, string> = {};
        (r.cells || []).forEach((c) => {
          cells[c.column_key] = c.value_text || "-";
        });
        cols.forEach((c) => {
          if (!cells[c.key]) cells[c.key] = "-";
        });
        return { key: r.key, feature: r.feature, order_index: r.order_index, cells };
      });
      setRows(mappedRows);
    } catch (e: any) {
      setError(e?.message || "Failed to load matrix detail");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    loadByLang(activeLang);
  }, [matrixId, activeLang]);

  async function onSubmit(e: FormEvent) {
    e.preventDefault();
    setSaving(true);
    setError(null);
    try {
      const res = await fetch(`${ADMIN_SERVICE_MATRIX_URL}/${matrixId}`, {
        method: "PUT",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          service: serviceCode,
          language: activeLang,
          compact,
          is_active: isActive,
          title,
          description,
          footnote,
          columns,
          rows: rows.map((r) => ({
            key: r.key,
            feature: r.feature,
            order_index: r.order_index,
            cells: columns.map((c) => ({ column_key: c.key, value_text: r.cells[c.key] || "-" })),
          })),
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
    if (!confirm(t?.deleteConfirm ?? "Hard delete this matrix?")) return;
    const res = await fetch(`${ADMIN_SERVICE_MATRIX_URL}/${matrixId}`, { method: "DELETE", credentials: "include" });
    if (res.ok) {
      const svc = selected || serviceCode.toLowerCase();
      window.location.href = `/${locale}/admin/service-matrix?service=${svc}`;
    }
  }

  if (loading) return <main className="mx-auto max-w-7xl p-6 md:pl-72">{t?.loading ?? "Loading..."}</main>;

  const backService = selected || serviceCode.toLowerCase();

  return (
    <main className="mx-auto max-w-7xl p-6 grid gap-4 md:pl-72">
      <section className="rounded-2xl border border-bumnslate-10 bg-bumn-gradient-white-4 p-5 shadow-bumn-2 flex items-center justify-between">
        <h1 className="text-2xl font-semibold text-bumnblue-2">{t?.titlePrefix ?? "Detail Service Matrix"} - {matrixId}</h1>
        <Link href={`/${locale}/admin/service-matrix?service=${backService}`} className="rounded-xl border border-bumnslate-10 bg-white px-3 py-2 text-sm">{t?.backToList ?? "Back"}</Link>
      </section>
      {error && <p className="rounded-xl border border-red-200 bg-red-50 px-3 py-2 text-sm text-red-600">{error}</p>}
      <form onSubmit={onSubmit} className="grid gap-4 rounded-2xl border border-bumnslate-10 bg-white p-5 shadow-bumn-2">
        <div className="grid gap-1">
          <label className="text-sm font-semibold text-bumnslate-7">{f?.languageTabs ?? "Language"}</label>
          <p className="text-xs text-bumnslate-5">{h?.languageTabs ?? "Pilih bahasa terjemahan matrix yang ingin kamu edit."}</p>
          <div className="flex flex-wrap gap-2">
            {langOptions.map((lang) => (
              <button key={lang} type="button" onClick={() => setActiveLang(lang)} className={`rounded-xl px-3 py-1.5 text-sm transition ${activeLang === lang ? "bg-bumn-gradient-primary-11 text-white shadow-bumn-2" : "border border-bumnslate-10 bg-white text-bumnslate-6"}`}>{lang}</button>
            ))}
            <button
              type="button"
              className="rounded-xl border border-bumnslate-10 bg-white px-3 py-1.5 text-sm text-bumnslate-6"
              onClick={() => {
                const next = prompt(t?.addLanguagePrompt ?? "Tambah bahasa (contoh: EN)")?.trim().toUpperCase();
                if (!next) return;
                if (!langOptions.includes(next)) setLangOptions((prev) => [...prev, next]);
                setActiveLang(next);
              }}
            >
              {t?.addLanguageButton ?? "+ Tambah Bahasa"}
            </button>
          </div>
        </div>

        <div className="grid gap-1">
          <label className="text-sm font-semibold text-bumnslate-7">{f?.title ?? "Title"}</label>
          <p className="text-xs text-bumnslate-5">{h?.title ?? "Judul utama tabel perbandingan matrix."}</p>
          <input className="rounded-xl border border-bumnslate-10 px-3 py-2" value={title} onChange={(e) => setTitle(e.target.value)} placeholder={`${t?.placeholders?.title ?? "title"} (${activeLang})`} required />
        </div>

        <div className="grid gap-1">
          <label className="text-sm font-semibold text-bumnslate-7">{f?.description ?? "Description"}</label>
          <p className="text-xs text-bumnslate-5">{h?.description ?? "Deskripsi singkat yang menjelaskan konteks matrix."}</p>
          <textarea className="rounded-xl border border-bumnslate-10 px-3 py-2" value={description} onChange={(e) => setDescription(e.target.value)} placeholder={`${t?.placeholders?.description ?? "description"} (${activeLang})`} rows={2} />
        </div>

        <div className="grid gap-1">
          <label className="text-sm font-semibold text-bumnslate-7">{f?.footnote ?? "Footnote"}</label>
          <p className="text-xs text-bumnslate-5">{h?.footnote ?? "Catatan kecil di bawah matrix (opsional)."}</p>
          <textarea className="rounded-xl border border-bumnslate-10 px-3 py-2" value={footnote} onChange={(e) => setFootnote(e.target.value)} placeholder={`${t?.placeholders?.footnote ?? "footnote"} (${activeLang})`} rows={2} />
        </div>

        <div className="grid gap-2 text-sm">
          <div className="grid gap-1">
            <label className="text-sm font-semibold text-bumnslate-7">{f?.status ?? "Status"}</label>
            <p className="text-xs text-bumnslate-5">{h?.status ?? "Aktifkan jika matrix ini ingin ditampilkan di halaman service."}</p>
            <label className="flex items-center gap-2"><input type="checkbox" checked={isActive} onChange={(e) => setIsActive(e.target.checked)} /> {t?.labels?.isActive ?? "is_active"}</label>
          </div>
          <div className="grid gap-1">
            <label className="text-sm font-semibold text-bumnslate-7">{f?.compact ?? "Compact"}</label>
            <p className="text-xs text-bumnslate-5">{h?.compact ?? "Aktifkan mode compact jika tabel ingin tampilan lebih rapat."}</p>
            <label className="flex items-center gap-2"><input type="checkbox" checked={compact} onChange={(e) => setCompact(e.target.checked)} /> compact</label>
          </div>
        </div>

        <div className="grid gap-2">
          <div className="flex justify-between items-center">
            <div className="grid gap-0.5">
              <h3 className="font-semibold">{f?.columns ?? "Columns"} ({activeLang})</h3>
              <p className="text-xs text-bumnslate-5">{h?.columns ?? "Daftar kolom paket/opsi yang dibandingkan di matrix."}</p>
            </div>
            <button type="button" onClick={addColumn} className="rounded-lg border px-3 py-1 text-sm">{t?.addColumnButton ?? "+ Add Column"}</button>
          </div>
          {columns.map((c, i) => (
            <div key={i} className="grid grid-cols-4 gap-2">
              <input className="rounded border px-2 py-1" value={c.key} onChange={(e) => setColumns((prev) => prev.map((x, idx) => idx === i ? { ...x, key: e.target.value } : x))} placeholder={t?.placeholders?.columnKey ?? "key"} />
              <input className="rounded border px-2 py-1" value={c.label} onChange={(e) => setColumns((prev) => prev.map((x, idx) => idx === i ? { ...x, label: e.target.value } : x))} placeholder={`${t?.placeholders?.columnLabel ?? "label"} (${activeLang})`} />
              <input className="rounded border px-2 py-1" value={c.order_index} onChange={(e) => setColumns((prev) => prev.map((x, idx) => idx === i ? { ...x, order_index: Number(e.target.value) || 1 } : x))} placeholder={t?.placeholders?.columnOrder ?? "order"} />
              <label className="flex items-center gap-2 text-sm"><input type="checkbox" checked={c.popular} onChange={(e) => setColumns((prev) => prev.map((x, idx) => idx === i ? { ...x, popular: e.target.checked } : x))} /> {t?.labels?.popular ?? "popular"}</label>
            </div>
          ))}
        </div>

        <div className="grid gap-2">
          <div className="flex justify-between items-center">
            <div className="grid gap-0.5">
              <h3 className="font-semibold">{f?.rowsCells ?? "Rows + Cells"} ({activeLang})</h3>
              <p className="text-xs text-bumnslate-5">{h?.rowsCells ?? "Baris fitur beserta isi nilai pada tiap kolom."}</p>
            </div>
            <button type="button" onClick={addRow} className="rounded-lg border px-3 py-1 text-sm">{t?.addRowButton ?? "+ Add Row"}</button>
          </div>
          {rows.map((r, ri) => (
            <div key={ri} className="rounded-xl border p-3 grid gap-2">
              <div className="grid grid-cols-3 gap-2">
                <input className="rounded border px-2 py-1" value={r.key} onChange={(e) => setRows((prev) => prev.map((x, idx) => idx === ri ? { ...x, key: e.target.value } : x))} placeholder={t?.placeholders?.rowKey ?? "row key"} />
                <input className="rounded border px-2 py-1" value={r.feature} onChange={(e) => setRows((prev) => prev.map((x, idx) => idx === ri ? { ...x, feature: e.target.value } : x))} placeholder={`${t?.placeholders?.feature ?? "feature"} (${activeLang})`} />
                <input className="rounded border px-2 py-1" value={r.order_index} onChange={(e) => setRows((prev) => prev.map((x, idx) => idx === ri ? { ...x, order_index: Number(e.target.value) || 1 } : x))} placeholder={t?.placeholders?.rowOrder ?? "order"} />
              </div>
              <div className="grid gap-2">
                {columns.map((c, ci) => (
                  <div key={ci} className="grid grid-cols-[220px_1fr] gap-2 items-center">
                    <span className="text-sm text-bumnslate-7">{c.label || c.key}</span>
                    <input className="rounded border px-2 py-1" value={r.cells[c.key] || ""} onChange={(e) => setRows((prev) => prev.map((x, idx) => idx === ri ? { ...x, cells: { ...x.cells, [c.key]: e.target.value } } : x))} placeholder={`${t?.placeholders?.cellValue ?? "cell value"} (${activeLang})`} />
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        <section className="grid gap-2">
          <h3 className="font-semibold">{t?.previewTitle ?? "Preview Matrix"}</h3>
          <p className="text-xs text-bumnslate-6">{t?.previewHint ?? "Kalau tabel kesempitan, geser horizontal ke kanan/kiri."}</p>
          <div className="overflow-x-auto rounded-2xl border border-bumnslate-10 bg-bumn-gradient-white-4 p-3">
            <table className="min-w-[900px] w-full border-separate border-spacing-2 text-sm">
              <thead>
                <tr>
                  <th className="rounded-xl border border-bumnblue-4 bg-white px-3 py-2 text-left">{t?.featureHeader ?? "Feature"}</th>
                  {columns.map((c, ci) => (
                    <th key={ci} className="rounded-xl border border-bumnblue-4 bg-white px-3 py-2 text-center">{c.label || c.key}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {rows.map((r, ri) => (
                  <tr key={ri}>
                    <td className="rounded-xl border border-bumnblue-4 bg-white px-3 py-2 font-medium">{r.feature || r.key}</td>
                    {columns.map((c, ci) => (
                      <td key={ci} className="rounded-xl bg-white px-3 py-2 text-center">{r.cells[c.key] || "-"}</td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        <div className="flex gap-2">
          <button type="submit" disabled={saving} className="rounded-xl bg-bumn-gradient-primary-11 px-4 py-2 text-white w-fit">{saving ? (t?.saveSaving ?? "Saving...") : `${t?.saveIdle ?? "Save"} ${activeLang}`}</button>
          <button type="button" onClick={onDelete} className="rounded-xl border border-red-300 px-4 py-2 text-red-600 w-fit">{t?.deleteButton ?? "Hard Delete"}</button>
        </div>
      </form>
    </main>
  );
}
