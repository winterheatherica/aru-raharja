"use client";

import Link from "next/link";
import { FormEvent, useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import type { Locale, Dictionary } from "@/i18n/get_dictionary";
import { ADMIN_SERVICE_PRICING_TIER_URL, SERVICE_SOLUTIONS, ServiceCode } from "./_shared";

type Item = {
  id: string;
  service: string;
  price_monthly: number;
  price_yearly: number;
  popular: boolean;
  order_index: number;
  is_active: boolean;
  name: string;
  description?: string;
  features?: string[];
  translations?: Array<{ language?: string }>;
};

export default function ServicePricingTierDetailPage({ locale, tierId }: { locale: Locale; dict?: Dictionary; tierId: string }) {
  const search = useSearchParams();
  const service = (search.get("service") || "").toLowerCase() as ServiceCode;
  const selected = SERVICE_SOLUTIONS.includes(service) ? service : null;

  const [loading, setLoading] = useState(true);
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
  const [serviceCode, setServiceCode] = useState("");
  const [activeLang, setActiveLang] = useState(locale.toUpperCase());
  const [langOptions, setLangOptions] = useState<string[]>(["ID"]);

  async function loadByLang(lang: string) {
    setLoading(true); setError(null);
    try {
      const res = await fetch(`${ADMIN_SERVICE_PRICING_TIER_URL}/${tierId}?lang=${lang}`, { credentials: "include" });
      if (!res.ok) throw new Error(await res.text());
      const item: Item = await res.json();
      setServiceCode(item.service);
      setName(item.name || "");
      setDescription(item.description || "");
      setFeaturesText((item.features || []).join("\n"));
      setPriceMonthly(String(item.price_monthly || 0));
      setPriceYearly(String(item.price_yearly || 0));
      setOrderIndex(String(item.order_index || 1));
      setPopular(Boolean(item.popular));
      setIsActive(Boolean(item.is_active));
      const langs = Array.from(new Set(["ID", ...(item.translations || []).map((x) => (x.language || "ID").toUpperCase())]));
      setLangOptions(langs);
    } catch (e: any) {
      setError(e?.message || "Failed to load pricing tier detail");
    } finally { setLoading(false); }
  }

  useEffect(() => { loadByLang(activeLang); }, [tierId, activeLang]);

  async function onSubmit(e: FormEvent) {
    e.preventDefault();
    setSaving(true); setError(null);
    try {
      const res = await fetch(`${ADMIN_SERVICE_PRICING_TIER_URL}/${tierId}`, {
        method: "PUT",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          service: serviceCode,
          language: activeLang,
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
      alert(`Saved (${activeLang})`);
      await loadByLang(activeLang);
    } catch (e: any) {
      setError(e?.message || "Save failed");
    } finally { setSaving(false); }
  }

  async function onDelete() {
    if (!confirm("Hard delete pricing tier ini?")) return;
    const res = await fetch(`${ADMIN_SERVICE_PRICING_TIER_URL}/${tierId}`, { method: "DELETE", credentials: "include" });
    if (res.ok) {
      const svc = selected || serviceCode.toLowerCase();
      window.location.href = `/${locale}/admin/service-pricing-tier?service=${svc}`;
    }
  }

  if (loading) return <main className="mx-auto max-w-7xl p-6 md:pl-72">Loading...</main>;
  const backService = selected || serviceCode.toLowerCase();

  return (
    <main className="mx-auto max-w-7xl p-6 grid gap-4 md:pl-72">
      <section className="rounded-2xl border border-bumnslate-10 bg-bumn-gradient-white-4 p-5 shadow-bumn-2 flex items-center justify-between">
        <h1 className="text-2xl font-semibold text-bumnblue-2">Detail Service Pricing Tier • {tierId}</h1>
        <Link href={`/${locale}/admin/service-pricing-tier?service=${backService}`} className="rounded-xl border border-bumnslate-10 bg-white px-3 py-2 text-sm">Back</Link>
      </section>
      {error && <p className="rounded-xl border border-red-200 bg-red-50 px-3 py-2 text-sm text-red-600">{error}</p>}
      <form onSubmit={onSubmit} className="grid gap-3 rounded-2xl border border-bumnslate-10 bg-white p-5 shadow-bumn-2">
        <div className="flex flex-wrap gap-2">
          {langOptions.map((lang) => (
            <button key={lang} type="button" onClick={() => setActiveLang(lang)} className={`rounded-xl px-3 py-1.5 text-sm transition ${activeLang === lang ? "bg-bumn-gradient-primary-11 text-white shadow-bumn-2" : "border border-bumnslate-10 bg-white text-bumnslate-6"}`}>{lang}</button>
          ))}
        </div>
        <input className="rounded-xl border border-bumnslate-10 px-3 py-2" value={name} onChange={(e) => setName(e.target.value)} placeholder={`name (${activeLang})`} required />
        <textarea className="rounded-xl border border-bumnslate-10 px-3 py-2" value={description} onChange={(e) => setDescription(e.target.value)} placeholder={`description (${activeLang})`} rows={2} />
        <textarea className="rounded-xl border border-bumnslate-10 px-3 py-2" value={featuresText} onChange={(e) => setFeaturesText(e.target.value)} placeholder={`features (${activeLang})`} rows={4} />
        <input className="rounded-xl border border-bumnslate-10 px-3 py-2" value={priceMonthly} onChange={(e) => setPriceMonthly(e.target.value)} placeholder="price_monthly" />
        <input className="rounded-xl border border-bumnslate-10 px-3 py-2" value={priceYearly} onChange={(e) => setPriceYearly(e.target.value)} placeholder="price_yearly" />
        <input className="rounded-xl border border-bumnslate-10 px-3 py-2" value={orderIndex} onChange={(e) => setOrderIndex(e.target.value)} placeholder="order_index" />
        <label className="flex items-center gap-2 text-sm"><input type="checkbox" checked={popular} onChange={(e) => setPopular(e.target.checked)} /> popular</label>
        <label className="flex items-center gap-2 text-sm"><input type="checkbox" checked={isActive} onChange={(e) => setIsActive(e.target.checked)} /> is_active</label>
        <div className="flex gap-2">
          <button type="submit" disabled={saving} className="rounded-xl bg-bumn-gradient-primary-11 px-4 py-2 text-white w-fit">{saving ? "Saving..." : `Save ${activeLang}`}</button>
          <button type="button" onClick={onDelete} className="rounded-xl border border-red-300 px-4 py-2 text-red-600 w-fit">Hard Delete</button>
        </div>
      </form>
    </main>
  );
}
