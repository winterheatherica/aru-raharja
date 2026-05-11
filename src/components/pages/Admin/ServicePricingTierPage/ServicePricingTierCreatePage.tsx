"use client";

import Link from "next/link";
import { FormEvent, useState } from "react";
import { useSearchParams } from "next/navigation";
import type { Locale, Dictionary } from "@/i18n/get_dictionary";
import { ADMIN_SERVICE_PRICING_TIER_URL, SERVICE_SOLUTIONS, ServiceCode } from "./_shared";
import { revalidatePublic } from "@/app/actions/revalidate";

export default function ServicePricingTierCreatePage({ locale, dict }: { locale: Locale; dict?: Dictionary }) {
  const search = useSearchParams();
  const service = (search.get("service") || "").toLowerCase() as ServiceCode;
  const selected = SERVICE_SOLUTIONS.includes(service) ? service : null;

  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [featuresText, setFeaturesText] = useState("");
  const [priceMonthly, setPriceMonthly] = useState("0");
  const [priceYearly, setPriceYearly] = useState("0");
  const [orderIndex, setOrderIndex] = useState("1");
  const [popular, setPopular] = useState(false);
  const [isActive, setIsActive] = useState(true);

  const t = (dict as any)?.admin?.servicePricingTier?.create;
  const f = t?.fields;
  const h = t?.helpers;

  async function onSubmit(e: FormEvent) {
    e.preventDefault();
    if (!selected) return;
    setSaving(true); setError(null);
    try {
      const res = await fetch(ADMIN_SERVICE_PRICING_TIER_URL, {
        method: "POST",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          service: selected.toUpperCase(),
          language: "ID",
          price_monthly: Number(priceMonthly) || 0,
          price_yearly: Number(priceYearly) || 0,
          popular,
          order_index: Number(orderIndex) || 1,
          is_active: isActive,
          name,
          description,
          features: featuresText.split("\n").map((x) => x.trim()).filter(Boolean),
        }),
      });
      if (!res.ok) throw new Error(await res.text());
      await revalidatePublic();
      window.location.href = `/${locale}/admin/service-pricing-tier?service=${selected}`;
    } catch (e: any) {
      setError(e?.message || "Create failed");
    } finally { setSaving(false); }
  }

  if (!selected) return <main className="mx-auto max-w-7xl p-6 md:pl-72">{t?.serviceRequired ?? "Pilih service dulu di list page."}</main>;

  return (
    <main className="mx-auto max-w-7xl p-6 grid gap-4 md:pl-72">
      <section className="rounded-2xl border border-bumnslate-10 bg-bumn-gradient-white-4 p-5 shadow-bumn-2 flex items-center justify-between">
        <h1 className="text-2xl font-semibold text-bumnblue-2">{t?.titlePrefix ?? "Create Service Pricing Tier"} • {selected.toUpperCase()}</h1>
        <Link href={`/${locale}/admin/service-pricing-tier?service=${selected}`} className="rounded-xl border border-bumnslate-10 bg-white px-3 py-2 text-sm">{t?.backToList ?? "Back"}</Link>
      </section>
      {error && <p className="rounded-xl border border-red-200 bg-red-50 px-3 py-2 text-sm text-red-600">{error}</p>}
      <form onSubmit={onSubmit} className="grid gap-3 rounded-2xl border border-bumnslate-10 bg-white p-5 shadow-bumn-2">
        <p className="inline-flex w-fit rounded-full bg-bumn-gradient-primary-11 px-3 py-1 text-xs font-semibold text-white shadow-bumn-5">{t?.defaultLanguageHint ?? "Bahasa default: ID (EN auto-translate oleh backend)"}</p>
        <div className="grid gap-1">
          <label className="text-sm font-semibold text-bumnslate-7">{f?.name ?? "Name"}</label>
          <p className="text-xs text-bumnslate-5">{h?.name ?? "Nama paket pricing tier yang ditampilkan ke user."}</p>
          <input className="rounded-xl border border-bumnslate-10 px-3 py-2" value={name} onChange={(e) => setName(e.target.value)} placeholder={t?.placeholders?.name ?? "name"} required />
        </div>

        <div className="grid gap-1">
          <label className="text-sm font-semibold text-bumnslate-7">{f?.description ?? "Description"}</label>
          <p className="text-xs text-bumnslate-5">{h?.description ?? "Deskripsi singkat paket pricing tier."}</p>
          <textarea className="rounded-xl border border-bumnslate-10 px-3 py-2" value={description} onChange={(e) => setDescription(e.target.value)} placeholder={t?.placeholders?.description ?? "description"} rows={2} />
        </div>

        <div className="grid gap-1">
          <label className="text-sm font-semibold text-bumnslate-7">{f?.features ?? "Features"}</label>
          <p className="text-xs text-bumnslate-5">{h?.features ?? "Daftar fitur paket, satu baris untuk satu fitur."}</p>
          <textarea className="rounded-xl border border-bumnslate-10 px-3 py-2" value={featuresText} onChange={(e) => setFeaturesText(e.target.value)} placeholder={t?.placeholders?.features ?? "features (1 line = 1 feature)"} rows={4} />
        </div>

        <div className="grid gap-1">
          <label className="text-sm font-semibold text-bumnslate-7">{f?.priceMonthly ?? "Price Monthly"}</label>
          <p className="text-xs text-bumnslate-5">{h?.priceMonthly ?? "Harga berlangganan per bulan."}</p>
          <input className="rounded-xl border border-bumnslate-10 px-3 py-2" value={priceMonthly} onChange={(e) => setPriceMonthly(e.target.value)} placeholder={t?.placeholders?.priceMonthly ?? "price_monthly"} />
        </div>

        <div className="grid gap-1">
          <label className="text-sm font-semibold text-bumnslate-7">{f?.priceYearly ?? "Price Yearly"}</label>
          <p className="text-xs text-bumnslate-5">{h?.priceYearly ?? "Harga berlangganan per tahun."}</p>
          <input className="rounded-xl border border-bumnslate-10 px-3 py-2" value={priceYearly} onChange={(e) => setPriceYearly(e.target.value)} placeholder={t?.placeholders?.priceYearly ?? "price_yearly"} />
        </div>

        <div className="grid gap-1">
          <label className="text-sm font-semibold text-bumnslate-7">{f?.orderIndex ?? "Order Index"}</label>
          <p className="text-xs text-bumnslate-5">{h?.orderIndex ?? "Urutan tampil paket. Nilai kecil tampil lebih dulu."}</p>
          <input className="rounded-xl border border-bumnslate-10 px-3 py-2" value={orderIndex} onChange={(e) => setOrderIndex(e.target.value)} placeholder={t?.placeholders?.orderIndex ?? "order_index"} />
        </div>

        <div className="grid gap-1">
          <label className="text-sm font-semibold text-bumnslate-7">{f?.popular ?? "Popular"}</label>
          <p className="text-xs text-bumnslate-5">{h?.popular ?? "Tandai paket ini sebagai paket unggulan/popular."}</p>
          <label className="flex items-center gap-2 text-sm"><input type="checkbox" checked={popular} onChange={(e) => setPopular(e.target.checked)} /> {t?.labels?.popular ?? "popular"}</label>
        </div>

        <div className="grid gap-1">
          <label className="text-sm font-semibold text-bumnslate-7">{f?.status ?? "Status"}</label>
          <p className="text-xs text-bumnslate-5">{h?.status ?? "Aktifkan jika paket ini ingin ditampilkan di halaman pricing."}</p>
          <label className="flex items-center gap-2 text-sm"><input type="checkbox" checked={isActive} onChange={(e) => setIsActive(e.target.checked)} /> {t?.labels?.isActive ?? "is_active"}</label>
        </div>

        <button type="submit" disabled={saving} className="rounded-xl bg-bumn-gradient-primary-11 px-4 py-2 text-white w-fit">{saving ? (t?.submitSaving ?? "Saving...") : (t?.submitIdle ?? "Create")}</button>
      </form>
    </main>
  );
}
