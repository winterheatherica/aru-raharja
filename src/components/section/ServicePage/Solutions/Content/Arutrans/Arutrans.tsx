"use client";

import * as React from "react";

import Catalog, { type CatalogItem } from "@/components/section/ServicePage/Solutions/Content/Template/Catalog/Catalog";
import Calculator from "@/components/section/ServicePage/Solutions/Content/Template/Calculator/Calculator";
import Booking, { type BookingAvailability } from "@/components/section/ServicePage/Solutions/Content/Template/Booking/Booking";
import FAQ from "@/components/section/ServicePage/Solutions/Content/Template/FAQ/FAQ";
import Cards from "@/components/section/ServicePage/Solutions/Content/Template/Cards/Cards";

type Props = {
  dict: any;
  locale: string;
};

export default function Arutrans({ dict }: Props) {
  const copy = dict?.service?.solutions?.arutrans;
  const titleHtml =
    copy?.titleHtml ?? "<b>ARU</b><i>trans</i> — Sewa kendaraan fleksibel, driver & asuransi siap";
  const description =
    copy?.description ??
    "Armada mobil & minibus untuk kebutuhan harian hingga proyek. Termasuk opsi driver, asuransi, serta dukungan 24/7.";
  const fleet: CatalogItem[] = [
    {
      id: "v-avio",
      name: "Avanza / Xenia",
      sku: "MPV-5",
      category: "MPV",
      image: "/vehicles/avanza.jpg",
      price: 450000,
      currency: "IDR",
      moq: 1,
      leadTime: "Same-day*",
      tags: ["5 seat", "M/T", "Irit"],
      rating: 4.6,
      available: true,
    },
    {
      id: "v-inn",
      name: "Innova Reborn",
      sku: "MPV-7",
      category: "MPV",
      image: "/vehicles/innova.jpg",
      price: 750000,
      currency: "IDR",
      moq: 1,
      leadTime: "1 hari",
      tags: ["7 seat", "A/T", "Nyaman"],
      rating: 4.8,
      available: true,
    },
    {
      id: "v-hiace",
      name: "Hiace Commuter",
      sku: "BUS-14",
      category: "Minibus",
      image: "/vehicles/hiace.jpg",
      price: 1500000,
      currency: "IDR",
      moq: 1,
      leadTime: "2 hari",
      tags: ["14 seat", "A/T"],
      rating: 4.7,
      available: true,
    },
    {
      id: "v-double",
      name: "Double Cabin 4x4",
      sku: "PU-2DC",
      category: "Pickup",
      image: "/vehicles/doublecab.jpg",
      price: 1200000,
      currency: "IDR",
      moq: 1,
      leadTime: "2–3 hari",
      tags: ["4x4", "Proyek"],
      rating: 4.5,
      available: true,
    },
  ];

  const [selected, setSelected] = React.useState<CatalogItem | null>(null);

  const onCheckAvailability = (item: CatalogItem) => {
    setSelected(item);
    const el = document.getElementById("arutrans-booking");
    if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  const estimatorFields = [
    { id: "days", label: "Durasi sewa (hari)", defaultValue: 1 },
    { id: "distance", label: "Perkiraan jarak (km/hari)", defaultValue: 40 },
    { id: "withDriver", label: "Dengan driver? (1=ya, 0=tidak)", defaultValue: 1 },
  ] as const;

  const estimatorResults = [
    { id: "dailyRate", label: "Tarif dasar / hari", formatter: "idr" as const },
    { id: "driverFee", label: "Biaya driver / hari", formatter: "idr" as const },
    { id: "distanceFee", label: "Biaya jarak / hari", formatter: "idr" as const },
    { id: "subtotal", label: "Subtotal (sebelum pajak)", formatter: "idr" as const, highlight: true },
  ] as const;

  const estimatorCompute = ({ days, distance, withDriver }: Record<string, number>) => {
    const base = (selected?.price ?? 500000) || 0;
    const d = Math.max(1, Math.round(days || 1));
    const kmPerDay = Math.max(0, distance || 0);

    const driverFeePerDay = withDriver ? 150000 : 0;
    const distanceFeePerDay = Math.max(0, (kmPerDay - 50) * 2500);
    const daily = base;
    const subtotal = (daily + driverFeePerDay + distanceFeePerDay) * d;

    return {
      dailyRate: daily,
      driverFee: driverFeePerDay,
      distanceFee: distanceFeePerDay,
      subtotal,
    };
  };

  const availability: BookingAvailability = {
    "2025-10-10": [
      { id: "am", start: "09:00", end: "12:00", capacity: 3, booked: 1, label: "Pagi" },
      { id: "pm", start: "13:00", end: "17:00", capacity: 3, booked: 0, label: "Siang" },
    ],
    "2025-10-11": [
      { id: "full", start: "08:00", end: "18:00", capacity: 2, booked: 2, label: "Full day" },
    ],
    "2025-10-12": [
      { id: "am2", start: "09:00", end: "12:00", capacity: 2, booked: 0, label: "Pagi" },
      { id: "pm2", start: "13:00", end: "17:00", capacity: 2, booked: 1, label: "Siang" },
    ],
  };

  const policies = [
    {
      id: "p1",
      question: "Apakah termasuk driver dan BBM?",
      answer:
        "Paket <b>dengan driver</b> sudah termasuk jasa pengemudi. <i>BBM</i> mengikuti paket atau dihitung berdasarkan jarak aktual.",
      category: "Kebijakan",
      defaultOpen: true,
    },
    {
      id: "p2",
      question: "Bagaimana dengan asuransi?",
      answer:
        "Unit dilengkapi asuransi standar. Kerusakan/biaya di luar cakupan asuransi menjadi tanggung jawab penyewa.",
      category: "Kebijakan",
    },
    {
      id: "p3",
      question: "Overtime & denda keterlambatan?",
      answer:
        "Overtime dihitung per jam melewati batas harian. Denda keterlambatan mengikuti ketentuan kontrak.",
      category: "Biaya",
    },
    {
      id: "p4",
      question: "Area layanan & tol/parkir?",
      answer:
        "Area Jabodetabek default; luar kota by request. Tol & parkir ditanggung penyewa kecuali disepakati paket all-in.",
      category: "Operasional",
    },
  ];

  const kpis = [
    { id: "fleet", label: "Armada aktif", value: 180, unit: "+", note: "MPV / Minibus / Pickup", highlight: true },
    { id: "response", label: "Respon order", value: "<2", unit: "jam" },
    { id: "satisfaction", label: "Kepuasan pelanggan", value: 4.7, unit: "/5" },
    { id: "uptime", label: "Ketersediaan unit", value: 98, unit: "%" },
  ];

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
            href="#arutrans-booking"
            className="inline-flex items-center gap-2 rounded-xl bg-bumn-gradient-primary-10 px-4 py-2 text-sm font-semibold text-white hover:opacity-95 focus:outline-none focus:ring-2 focus:ring-bumnblue-5"
          >
            Cek Ketersediaan
          </a>
          <a
            href="/contact?topic=transport-brief"
            className="inline-flex items-center gap-2 rounded-xl border border-bumnslate-10 bg-white px-4 py-2 text-sm font-semibold text-bumnblue-2 hover:border-bumnblue-5 focus:outline-none focus:ring-2 focus:ring-bumnblue-5"
          >
            Minta Penawaran
          </a>
        </div>
      </section>

      <Cards
        variant="kpi"
        items={kpis as any}
        gridCols={{ base: 1, md: 2, xl: 4 }}
      />

      <Catalog
        title="Fleet Browser"
        description="Pilih kendaraan sesuai kebutuhan. Klik 'Cek Ketersediaan' untuk lanjut booking."
        items={fleet}
        enableCompare
        onRFQ={onCheckAvailability}
        gridCols={{ base: 1, md: 2, xl: 3 }}
        footnote="*Same-day tergantung ketersediaan driver & area layanan."
      />

      <Calculator
        title={`Price Estimator ${selected ? `— ${selected.name}` : ""}`}
        description="Perkirakan biaya berdasarkan durasi, jarak, dan opsi driver. Angka ini estimasi, belum termasuk biaya tol/parkir."
        fields={estimatorFields as any}
        results={estimatorResults as any}
        compute={estimatorCompute}
        footnote="Hasil estimasi. Harga final mengikuti ketersediaan unit, lokasi penjemputan, dan kebijakan operasional."
      />

      <div id="arutrans-booking">
        <Booking
          title={`Cek Ketersediaan ${selected ? `— ${selected.name}` : ""}`}
          description="Pilih tanggal & slot waktu untuk penjemputan/pengembalian. Tim kami akan mengonfirmasi melalui telepon atau WhatsApp."
          timezone="WIB (UTC+7)"
          availability={availability}
          requireContact
          onSubmit={({ date, slotId, contact }) => {
            const sku = selected?.sku || "";
            window.location.href =
              `/contact?topic=transport-booking&date=${encodeURIComponent(date)}&slot=${encodeURIComponent(slotId)}${sku ? `&sku=${encodeURIComponent(sku)}` : ""}`;
          }}
        />
      </div>

      <FAQ
        title="Driver Policy & Insurance"
        description="Kebijakan umum layanan ARUtrans."
        items={policies}
        allowMultipleOpen
      />

      <div className="text-center">
        <a
          href="#arutrans-booking"
          className="inline-flex items-center gap-2 rounded-xl bg-bumn-gradient-primary-10 px-6 py-3 text-sm font-semibold text-white hover:opacity-95 focus:outline-none focus:ring-2 focus:ring-bumnblue-5"
        >
          Cek Ketersediaan
        </a>
      </div>
    </div>
  );
}
