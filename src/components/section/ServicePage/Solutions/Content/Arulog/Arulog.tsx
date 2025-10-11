"use client";

import * as React from "react";

import Catalog, { type CatalogItem } from "@/components/section/ServicePage/Solutions/Content/Template/Catalog/Catalog";
import Timeline from "@/components/section/ServicePage/Solutions/Content/Template/Timeline/Timeline";
import Cards from "@/components/section/ServicePage/Solutions/Content/Template/Cards/Cards";

type DictShape = {
  service?: {
    solutions?: {
      arulog?: {
        titleHtml?: string;
        description?: string;
      };
    };
  };
};

type Props = {
  dict: DictShape;
  locale: string;
};

export default function Arulog({ dict }: Props) {
  const copy = dict?.service?.solutions?.arulog;
  const titleHtml =
    copy?.titleHtml ?? "<b>ARU</b><i>log</i> — Supplier katalog & pengadaan";
  const description =
    copy?.description ??
    "Katalog terkurasi dengan harga kompetitif, lead time jelas, dan SLA pengiriman yang bisa diandalkan.";
  const items: CatalogItem[] = [
    {
      id: "itm-001",
      name: "Kertas A4 80gsm",
      sku: "STN-A4-80",
      category: "Stationery",
      image: "/catalog/a4-80.jpg",
      price: 56000,
      currency: "IDR",
      moq: 5,
      leadTime: "2–3 hari",
      tags: ["Fast-moving", "Local"],
      rating: 4.6,
      available: true,
    },
    {
      id: "itm-002",
      name: "Mouse Wireless",
      sku: "ELC-MSE-WL",
      category: "Electronics",
      image: "/catalog/mouse.jpg",
      price: 135000,
      currency: "IDR",
      moq: 1,
      leadTime: "3–5 hari",
      tags: ["Garansi 1 tahun"],
      rating: 4.3,
      available: true,
    },
    {
      id: "itm-003",
      name: "Kursi Ergonomis",
      sku: "FUR-CHR-ERGO",
      category: "Furniture",
      image: "/catalog/chair.jpg",
      price: 1250000,
      currency: "IDR",
      moq: 2,
      leadTime: "7–10 hari",
      tags: ["Pre-order"],
      rating: 4.8,
      available: true,
    },
    {
      id: "itm-004",
      name: "Masker Medis (50pcs)",
      sku: "MED-MSK-50",
      category: "Medical",
      image: "/catalog/mask.jpg",
      price: 27000,
      currency: "IDR",
      moq: 10,
      leadTime: "1–2 hari",
      tags: ["In-stock"],
      rating: 4.5,
      available: true,
    },
    {
      id: "itm-005",
      name: "Hand Sanitizer 500ml",
      sku: "MED-HS-500",
      category: "Medical",
      image: "/catalog/hs500.jpg",
      price: 38000,
      currency: "IDR",
      moq: 12,
      leadTime: "2–3 hari",
      tags: ["Local"],
      rating: 4.2,
      available: true,
    },
  ];

  const [compareOpen, setCompareOpen] = React.useState(false);
  const [compareItems, setCompareItems] = React.useState<CatalogItem[]>([]);
  const onCompare = (selected: CatalogItem[]) => {
    setCompareItems(selected);
    setCompareOpen(true);
  };

  const flowSteps = [
    {
      id: "rfq",
      title: "RFQ",
      subtitle: "Permintaan penawaran",
      description: "Kirim spesifikasi & jumlah. Kami balas ≤ 24 jam kerja.",
      status: "done" as const,
      meta: [{ label: "SLA", value: "< 24 jam" }],
    },
    {
      id: "po",
      title: "PO & Konfirmasi",
      subtitle: "Tandatangan PO",
      description: "Konfirmasi ketersediaan & jadwal kirim.",
      status: "current" as const,
      meta: [{ label: "Lead", value: "1–2 hari" }],
    },
    {
      id: "delivery",
      title: "Pengiriman",
      subtitle: "SLA & Tracking",
      description: "Kirim sesuai jadwal, update tracking real-time.",
      status: "upcoming" as const,
    },
  ];

  const kpis = [
    { id: "on-time", label: "On-time delivery", value: 97, unit: "%", note: "12 bulan terakhir", highlight: true },
    { id: "vendors", label: "Terverifikasi", value: 120, unit: "+", note: "Jaringan supplier" },
    { id: "skus", label: "SKU aktif", value: 2800, unit: "+", note: "Katalog" },
    { id: "sla", label: "SLA respon RFQ", value: "<24", unit: "jam" },
  ];
  const badges = [
    { id: "qc", title: "QC Sampling" },
    { id: "sop", title: "SOP Packaging" },
    { id: "ret", title: "Return Policy" },
    { id: "wty", title: "Warranty Support" },
  ];

  const onRFQ = (item: CatalogItem) => {
    window.location.href = `/contact?topic=rfq&sku=${encodeURIComponent(item.sku)}`;
  };

  return (
    <div className="space-y-10">
      <section className="space-y-3">
        <h2
          className="text-2xl lg:text-4xl font-semibold leading-snug"
          dangerouslySetInnerHTML={{ __html: titleHtml }}
        />
        <p className="text-bumnslate-5 text-base lg:text-lg">{description}</p>

        <div className="flex flex-wrap gap-2 pt-1">
          <a
            href="/contact?topic=rfq"
            className="inline-flex items-center gap-2 rounded-xl bg-bumn-gradient-primary-10 px-4 py-2 text-sm font-semibold text-white hover:opacity-95 focus:outline-none focus:ring-2 focus:ring-bumnblue-5"
          >
            Minta Penawaran / RFQ
          </a>
          <a
            href="/contact?topic=catalog-brief"
            className="inline-flex items-center gap-2 rounded-xl border border-bumnslate-10 bg-white px-4 py-2 text-sm font-semibold text-bumnblue-2 hover:border-bumnblue-5 focus:outline-none focus:ring-2 focus:ring-bumnblue-5"
          >
            Konsultasi Katalog
          </a>
        </div>
      </section>

      <section className="grid gap-4 md:grid-cols-[minmax(260px,360px)_1fr] items-center">
        <Cards variant="kpi" items={kpis as any} gridCols={{ base: 1, md: 2, xl: 4 }} />
        <Cards variant="badges" items={badges} />
      </section>

      <Timeline
        title="Procurement Flow"
        description="Alur ringkas dari RFQ hingga pengiriman."
        steps={flowSteps}
        numbered
        horizontalMd
        showProgress
      />

      <Catalog
        title="Product Catalog"
        description="Telusuri item, bandingkan, dan kirim RFQ langsung."
        items={items}
        enableCompare
        onRFQ={onRFQ}
        onCompare={onCompare}
        gridCols={{ base: 1, md: 2, xl: 3 }}
        footnote="Harga dapat berubah. Pastikan ketersediaan saat mengirim PO."
      />

      {compareOpen && (
        <CompareModal items={compareItems} onClose={() => setCompareOpen(false)} />
      )}

      <div className="text-center">
        <a
          href="/contact?topic=rfq"
          className="inline-flex items-center gap-2 rounded-xl bg-bumn-gradient-primary-10 px-6 py-3 text-sm font-semibold text-white hover:opacity-95 focus:outline-none focus:ring-2 focus:ring-bumnblue-5"
        >
          Kirim RFQ Sekarang
        </a>
      </div>
    </div>
  );
}

function CompareModal({
  items,
  onClose,
}: {
  items: CatalogItem[];
  onClose: () => void;
}) {
  const headers = ["Nama", "SKU", "Harga", "MOQ", "Lead Time", "Rating"];
  return (
    <div
      className="fixed inset-0 z-50 flex items-end md:items-center justify-center bg-bumnblack-1/60 p-0 md:p-6"
      role="dialog"
      aria-modal="true"
      onClick={onClose}
    >
      <div
        className="w-full max-w-4xl rounded-t-2xl md:rounded-2xl border border-bumnslate-10 bg-white shadow-bumn-2 overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between border-b border-bumnslate-10 px-4 py-3">
          <div className="text-sm font-semibold text-bumnblue-2">Bandingkan Item</div>
          <button
            onClick={onClose}
            className="rounded-md border border-bumnslate-10 px-2 py-1 text-sm text-bumnslate-6 hover:border-bumnblue-5"
          >
            Tutup
          </button>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full min-w-[720px] border-collapse text-sm">
            <thead className="bg-bumnwhite-3">
              <tr>
                {headers.map((h) => (
                  <th key={h} className="px-4 py-2 text-left font-semibold text-bumnblue-2">
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {items.map((it) => (
                <tr key={it.id} className="border-t border-bumnslate-10">
                  <td className="px-4 py-2 text-bumnblue-2 font-medium">{it.name}</td>
                  <td className="px-4 py-2 text-bumnslate-6">{it.sku}</td>
                  <td className="px-4 py-2 text-bumnblue-2 font-semibold">
                    {typeof it.price === "number" ? fmtIDR(it.price, it.currency || "IDR") : "—"}
                  </td>
                  <td className="px-4 py-2 text-bumnslate-6">{it.moq ?? "—"}</td>
                  <td className="px-4 py-2 text-bumnslate-6">{it.leadTime ?? "—"}</td>
                  <td className="px-4 py-2 text-bumnslate-6">{it.rating != null ? it.rating.toFixed(1) : "—"}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="flex items-center justify-end gap-2 border-t border-bumnslate-10 px-4 py-3">
          <a
            href={`/contact?topic=rfq${items[0] ? `&sku=${encodeURIComponent(items.map(i => i.sku).join(","))}` : ""}`}
            className="inline-flex items-center gap-2 rounded-xl bg-bumn-gradient-primary-10 px-4 py-2 text-sm font-semibold text-white hover:opacity-95 focus:outline-none focus:ring-2 focus:ring-bumnblue-5"
          >
            Ajukan RFQ untuk Item Ini
          </a>
        </div>
      </div>
    </div>
  );
}

function fmtIDR(v: number, currency = "IDR") {
  return new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency,
    maximumFractionDigits: 0,
  }).format(Math.round(v || 0));
}
