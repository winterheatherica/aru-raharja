"use client";

import Link from "next/link";
import { FormEvent, useState } from "react";
import { useSearchParams } from "next/navigation";
import type { Locale, Dictionary } from "@/i18n/get_dictionary";
import { ADMIN_SERVICE_MATRIX_URL, SERVICE_SOLUTIONS, ServiceCode } from "./_shared";

type Column = { key: string; label: string; popular: boolean; order_index: number };
type Row = { key: string; feature: string; order_index: number; cells: Record<string, string> };

export default function ServiceMatrixCreatePage({ locale, dict }: { locale: Locale; dict?: Dictionary }) {
  const search = useSearchParams();
  const service = (search.get("service") || "").toLowerCase() as ServiceCode;
  const selected = SERVICE_SOLUTIONS.includes(service) ? service : null;

  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [footnote, setFootnote] = useState("");
  const [compact, setCompact] = useState(false);
  const [isActive, setIsActive] = useState(true);
  const [columns, setColumns] = useState<Column[]>([{ key: "aru_digital", label: "ARU Digital", popular: true, order_index: 1 }]);
  const [rows, setRows] = useState<Row[]>([{ key: "fitur_1", feature: "Strategi Produk Digital", order_index: 1, cells: { aru_digital: "Pendekatan berbasis riset" } }]);

  const t = (dict as any)?.admin?.serviceMatrix?.create;

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

  async function onSubmit(e: FormEvent) {
    e.preventDefault();
    if (!selected) return;
    setSaving(true);
    setError(null);
    try {
      const payload = {
        service: selected.toUpperCase(),
        language: "ID",
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
      };

      const res = await fetch(ADMIN_SERVICE_MATRIX_URL, {
        method: "POST",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      if (!res.ok) throw new Error(await res.text());
      window.location.href = `/${locale}/admin/service-matrix?service=${selected}`;
    } catch (e: any) {
      setError(e?.message || "Create failed");
    } finally {
      setSaving(false);
    }
  }

  if (!selected) {
    return <main className="mx-auto max-w-7xl p-6 md:pl-72">{t?.serviceRequired ?? "Please pick a service from list page first."}</main>;
  }

  return (
    <main className="mx-auto max-w-7xl p-6 grid gap-4 md:pl-72">
      <section className="rounded-2xl border border-bumnslate-10 bg-bumn-gradient-white-4 p-5 shadow-bumn-2 flex items-center justify-between">
        <h1 className="text-2xl font-semibold text-bumnblue-2">{t?.titlePrefix ?? "Create Service Matrix"} - {selected.toUpperCase()}</h1>
        <Link href={`/${locale}/admin/service-matrix?service=${selected}`} className="rounded-xl border border-bumnslate-10 bg-white px-3 py-2 text-sm">{t?.backToList ?? "Back"}</Link>
      </section>

      {error && <p className="rounded-xl border border-red-200 bg-red-50 px-3 py-2 text-sm text-red-600">{error}</p>}

      <form onSubmit={onSubmit} className="grid gap-4 rounded-2xl border border-bumnslate-10 bg-white p-5 shadow-bumn-2">
        <input className="rounded-xl border border-bumnslate-10 px-3 py-2" value={title} onChange={(e) => setTitle(e.target.value)} placeholder="title" required />
        <textarea className="rounded-xl border border-bumnslate-10 px-3 py-2" value={description} onChange={(e) => setDescription(e.target.value)} placeholder="description" rows={2} />
        <textarea className="rounded-xl border border-bumnslate-10 px-3 py-2" value={footnote} onChange={(e) => setFootnote(e.target.value)} placeholder="footnote" rows={2} />
        <div className="flex gap-4 text-sm">
          <label className="flex items-center gap-2"><input type="checkbox" checked={isActive} onChange={(e) => setIsActive(e.target.checked)} /> is_active</label>
          <label className="flex items-center gap-2"><input type="checkbox" checked={compact} onChange={(e) => setCompact(e.target.checked)} /> compact</label>
        </div>

        <div className="grid gap-2">
          <div className="flex justify-between items-center">
            <h3 className="font-semibold">Columns</h3>
            <button type="button" onClick={addColumn} className="rounded-lg border px-3 py-1 text-sm">+ Add Column</button>
          </div>
          {columns.map((c, i) => (
            <div key={i} className="grid grid-cols-4 gap-2">
              <input className="rounded border px-2 py-1" value={c.key} onChange={(e) => setColumns((prev) => prev.map((x, idx) => idx === i ? { ...x, key: e.target.value } : x))} placeholder="key" />
              <input className="rounded border px-2 py-1" value={c.label} onChange={(e) => setColumns((prev) => prev.map((x, idx) => idx === i ? { ...x, label: e.target.value } : x))} placeholder="label" />
              <input className="rounded border px-2 py-1" value={c.order_index} onChange={(e) => setColumns((prev) => prev.map((x, idx) => idx === i ? { ...x, order_index: Number(e.target.value) || 1 } : x))} placeholder="order" />
              <label className="flex items-center gap-2 text-sm"><input type="checkbox" checked={c.popular} onChange={(e) => setColumns((prev) => prev.map((x, idx) => idx === i ? { ...x, popular: e.target.checked } : x))} /> popular</label>
            </div>
          ))}
        </div>

        <div className="grid gap-2">
          <div className="flex justify-between items-center">
            <h3 className="font-semibold">Rows + Cells</h3>
            <button type="button" onClick={addRow} className="rounded-lg border px-3 py-1 text-sm">+ Add Row</button>
          </div>
          {rows.map((r, ri) => (
            <div key={ri} className="rounded-xl border p-3 grid gap-2">
              <div className="grid grid-cols-3 gap-2">
                <input className="rounded border px-2 py-1" value={r.key} onChange={(e) => setRows((prev) => prev.map((x, idx) => idx === ri ? { ...x, key: e.target.value } : x))} placeholder="row key" />
                <input className="rounded border px-2 py-1" value={r.feature} onChange={(e) => setRows((prev) => prev.map((x, idx) => idx === ri ? { ...x, feature: e.target.value } : x))} placeholder="feature" />
                <input className="rounded border px-2 py-1" value={r.order_index} onChange={(e) => setRows((prev) => prev.map((x, idx) => idx === ri ? { ...x, order_index: Number(e.target.value) || 1 } : x))} placeholder="order" />
              </div>
              <div className="grid gap-2">
                {columns.map((c, ci) => (
                  <div key={ci} className="grid grid-cols-[220px_1fr] gap-2 items-center">
                    <span className="text-sm text-bumnslate-7">{c.label || c.key}</span>
                    <input className="rounded border px-2 py-1" value={r.cells[c.key] || ""} onChange={(e) => setRows((prev) => prev.map((x, idx) => idx === ri ? { ...x, cells: { ...x.cells, [c.key]: e.target.value } } : x))} placeholder="cell value" />
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        <section className="grid gap-2">
          <h3 className="font-semibold">Preview Matrix</h3>
          <p className="text-xs text-bumnslate-6">Kalau tabel kesempitan, geser horizontal ke kanan/kiri.</p>
          <div className="overflow-x-auto rounded-2xl border border-bumnslate-10 bg-bumn-gradient-white-4 p-3">
            <table className="min-w-[900px] w-full border-separate border-spacing-2 text-sm">
              <thead>
                <tr>
                  <th className="rounded-xl border border-bumnblue-4 bg-white px-3 py-2 text-left">Feature</th>
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

        <button type="submit" disabled={saving} className="rounded-xl bg-bumn-gradient-primary-11 px-4 py-2 text-white w-fit">{saving ? "Saving..." : "Create"}</button>
      </form>
    </main>
  );
}
