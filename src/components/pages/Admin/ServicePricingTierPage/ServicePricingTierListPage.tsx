"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import { useSearchParams } from "next/navigation";
import type { Locale, Dictionary } from "@/i18n/get_dictionary";
import { ADMIN_SERVICE_PRICING_TIER_URL, SERVICE_SOLUTIONS, ServiceCode, serviceLabel } from "./_shared";

type Item = {
  id: string;
  service: string;
  price_monthly: number;
  price_yearly: number;
  popular: boolean;
  order_index: number;
  is_active: boolean;
  name: string;
};

export default function ServicePricingTierListPage({ locale, dict }: { locale: Locale; dict?: Dictionary }) {
  const t = (dict as any)?.admin?.servicePricingTier?.list;
  const search = useSearchParams();
  const service = (search.get("service") || "").toLowerCase() as ServiceCode;
  const selected = SERVICE_SOLUTIONS.includes(service) ? service : null;

  const [items, setItems] = useState<Item[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!selected) return;
    (async () => {
      setLoading(true);
      setError(null);
      try {
        const res = await fetch(`${ADMIN_SERVICE_PRICING_TIER_URL}/service/${selected.toUpperCase()}?lang=${locale.toUpperCase()}`, { credentials: "include" });
        if (!res.ok) throw new Error(await res.text());
        setItems(await res.json());
      } catch (e: any) {
        setError(e?.message || "Failed to load pricing tiers");
      } finally {
        setLoading(false);
      }
    })();
  }, [selected, locale]);

  const selectedLabel = useMemo(() => (selected ? serviceLabel[selected] : "-"), [selected]);

  async function onDelete(id: string) {
    if (!confirm(t?.deleteConfirm ?? "Hard delete pricing tier ini?")) return;
    try {
      const res = await fetch(`${ADMIN_SERVICE_PRICING_TIER_URL}/${id}`, { method: "DELETE", credentials: "include" });
      if (!res.ok) throw new Error(await res.text());
      setItems((prev) => prev.filter((x) => x.id !== id));
    } catch (e: any) {
      setError(e?.message || "Delete failed");
    }
  }

  return (
    <main className="mx-auto max-w-7xl p-6 grid gap-6 md:pl-72">
      <section className="rounded-2xl border border-bumnslate-10 bg-bumn-gradient-white-4 p-5 shadow-bumn-2">
        <h1 className="text-2xl font-semibold text-bumnblue-2">{t?.title ?? "Admin • Service Pricing Tier"}</h1>
        <p className="mt-1 text-sm text-bumnslate-6">{t?.subtitle ?? "Pilih service untuk kelola pricing tier."}</p>
      </section>

      <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
        {SERVICE_SOLUTIONS.map((svc) => (
          <Link key={svc} href={`/${locale}/admin/service-pricing-tier?service=${svc}`} className={["rounded-2xl border border-bumnslate-10 bg-bumn-gradient-white-4 p-4 shadow-bumn-2 transition hover:-translate-y-0.5 hover:shadow-bumn-3", selected === svc ? "ring-2 ring-bumnblue-5" : ""].join(" ")}>
            <p className="text-xs text-bumnslate-5">{svc.toUpperCase()}</p>
            <h3 className="mt-1 text-lg font-semibold text-bumnblue-2">{serviceLabel[svc]}</h3>
          </Link>
        ))}
      </div>

      {selected && (
        <section className="grid gap-4">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-semibold text-bumnblue-2">{selectedLabel}</h2>
            <Link href={`/${locale}/admin/service-pricing-tier/create?service=${selected}`} className="inline-flex items-center justify-center rounded-xl bg-bumn-gradient-primary-11 px-4 py-2 text-sm font-medium text-white shadow-bumn-2 transition hover:opacity-95">{t?.createButton ?? "Create Pricing Tier"}</Link>
          </div>
          {error && <p className="rounded-xl border border-red-200 bg-red-50 px-3 py-2 text-sm text-red-600">{error}</p>}
          {loading ? <p className="text-bumnslate-6">{t?.loading ?? "Loading..."}</p> : (
            <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
              {items.map((it) => (
                <article key={it.id} className={["rounded-2xl border border-bumnslate-10 bg-bumn-gradient-white-4 p-5 shadow-bumn-2 grid gap-3", it.is_active ? "ring-2 ring-bumnblue-5" : ""].join(" ")}>
                  <div className="text-sm grid gap-1 text-bumnslate-6">
                    <p><b>Name:</b> {it.name}</p>
                    <p><b>Monthly:</b> {it.price_monthly}</p>
                    <p><b>Yearly:</b> {it.price_yearly}</p>
                    <p><b>Popular:</b> {String(it.popular)}</p>
                    <p><b>Order:</b> {it.order_index}</p>
                  </div>
                  <div className="pt-1 flex gap-2">
                    <Link href={`/${locale}/admin/service-pricing-tier/${it.id}?service=${selected}`} className="inline-flex items-center justify-center rounded-xl bg-bumn-gradient-primary-11 px-3 py-2 text-sm font-medium text-white shadow-bumn-2 transition hover:opacity-95">{t?.detailButton ?? "Detail / Edit"}</Link>
                    <button type="button" onClick={() => onDelete(it.id)} className="inline-flex items-center justify-center rounded-xl border border-red-300 bg-white px-3 py-2 text-sm font-medium text-red-600 transition hover:bg-red-50">{t?.deleteButton ?? "Hard Delete"}</button>
                  </div>
                </article>
              ))}
            </div>
          )}
        </section>
      )}
    </main>
  );
}
