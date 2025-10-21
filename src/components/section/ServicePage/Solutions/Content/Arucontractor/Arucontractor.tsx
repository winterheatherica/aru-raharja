"use client";

import * as React from "react";

import Gallery from "@/components/section/ServicePage/Solutions/Content/Template/Gallery/Gallery";
import Timeline from "@/components/section/ServicePage/Solutions/Content/Template/Timeline/Timeline";
import Cards from "@/components/section/ServicePage/Solutions/Content/Template/Cards/Cards";
import Matrix from "@/components/section/ServicePage/Solutions/Content/Template/Matrix/Matrix";
import Map from "@/components/section/ServicePage/Solutions/Content/Template/Map/Map";

type DictShape = {
  service?: {
    solutions?: {
      arucontractor?: {
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

export default function Arucontractor({ dict }: Props) {
  const copy = dict?.service?.solutions?.arucontractor;
  const titleHtml =
    copy?.titleHtml ?? "<b>ARU</b><i>contractor</i> — Konstruksi profesional & tepat waktu";
  const description =
    copy?.description ??
    "Jasa konstruksi dengan manajemen proyek yang rapi, standar keselamatan ketat, dan dokumentasi transparan.";
  const galleryItems = [
    {
      id: "g1",
      kind: "image" as const,
      src: "/images/services/ARUcontractor.png",
      alt: "Kantor - Sebelum",
      caption: "Contoh Gambar",
    },
    {
      id: "g2",
      kind: "image" as const,
      src: "/images/services/ARUcontractor.png",
      alt: "Kantor - Sesudah",
      caption: "Contoh Gambar",
    },
    {
      id: "g3",
      kind: "video" as const,
      src: "https://youtu.be/q5WeTMUTiak?si=2FUalR7r-wbP1VsJ",
      poster: "",
      caption: "Contoh Video",
    },
  ];

  const steps = [
    {
      id: "t1",
      title: "Design & Planning",
      subtitle: "Minggu 1–2",
      description: "Finalisasi gambar kerja, RAB, dan jadwal (baseline).",
      status: "done" as const,
      meta: [{ label: "Dokumen", value: "IFC + RAB v1" }],
    },
    {
      id: "t2",
      title: "Procurement",
      subtitle: "Minggu 3–4",
      description: "Pengadaan material, subkon, dan perizinan lokasi.",
      status: "current" as const,
      meta: [{ label: "Lead", value: "MEP & Finishing" }],
    },
    {
      id: "t3",
      title: "Construction",
      subtitle: "Minggu 5–10",
      description: "Pekerjaan sipil, MEP, arsitektur; inspeksi mingguan.",
      status: "upcoming" as const,
    },
    {
      id: "t4",
      title: "QA/QC & Handover",
      subtitle: "Minggu 11–12",
      description: "Testing & commissioning, punch list, serah terima.",
      status: "upcoming" as const,
    },
  ];

  const certFeatures = [
    {
      id: "iso",
      title: "ISO 9001 / 45001",
      desc: "Manajemen mutu & K3.",
    },
    {
      id: "apd",
      title: "APD & Toolbox Talk",
      desc: "Briefing K3 harian di site.",
    },
    {
      id: "permit",
      title: "Work Permit System",
      desc: "Hot work, ketinggian, confined space.",
    },
  ];
  const safetyBadges = [
    { id: "s1", title: "Zero LTI Target" },
    { id: "s2", title: "Emergency Drill" },
    { id: "s3", title: "SOP Scaffold" },
    { id: "s4", title: "Fire Watch" },
  ];

  const boqColumns = [
    { id: "vol", label: "Volume" },
    { id: "unit", label: "Satuan" },
    { id: "price", label: "Harga Satuan" },
    { id: "sub", label: "Subtotal" },
  ];
  const boqRows = [
    {
      feature: "Pekerjaan Partisi Gypsum",
      values: { vol: 120, unit: "m²", price: "Rp 185.000", sub: "Rp 22.200.000" },
    },
    {
      feature: "Pemasangan Lantai Vinyl",
      values: { vol: 90, unit: "m²", price: "Rp 210.000", sub: "Rp 18.900.000" },
    },
    {
      feature: "MEP — Instalasi Titik Listrik",
      values: { vol: 45, unit: "titik", price: "Rp 350.000", sub: "Rp 15.750.000" },
    },
  ];

  const markers = [
    {
      id: "m1",
      title: "Proyek A — Jakarta Selatan",
      subtitle: "Office fit-out 1200 m²",
      address: "Kuningan, Jakarta",
      category: "Office",
      xy: { xPct: 43, yPct: 63 },
      placeUrl: "https://maps.google.com",
    },
    {
      id: "m2",
      title: "Proyek B — Jakarta Timur",
      subtitle: "Gudang 2.500 m²",
      address: "Rancaekek, Bandung",
      category: "Warehouse",
      xy: { xPct: 80, yPct: 38 },
      placeUrl: "https://maps.google.com",
    },
    {
      id: "m3",
      title: "Proyek C — Jakarta Pusat",
      subtitle: "Kantor cabang",
      address: "Rungkut, Surabaya",
      category: "Office",
      xy: { xPct: 50, yPct: 33 },
      placeUrl: "https://maps.google.com",
    },
  ];

  return (
    <div className="space-y-10 pb-10">
      <section className="space-y-3">
        <h2
          className="text-2xl lg:text-4xl font-semibold leading-snug"
          dangerouslySetInnerHTML={{ __html: titleHtml }}
        />
        <p className="text-bumnslate-5 text-base lg:text-lg">{description}</p>
        <div className="flex flex-wrap gap-2 pt-1">
          <a
            href="/contact?topic=survey"
            className="inline-flex items-center gap-2 rounded-xl bg-bumn-gradient-primary-7 px-4 py-2 text-sm font-semibold text-white hover:opacity-95 focus:outline-none focus:ring-2 focus:ring-bumnblue-5"
          >
            Survey Lokasi
          </a>
          <a
            href="/contact?topic=consult"
            className="inline-flex items-center gap-2 rounded-xl border border-bumnslate-10 bg-white px-4 py-2 text-sm font-semibold text-bumnblue-2 hover:border-bumnblue-5 focus:outline-none focus:ring-2 focus:ring-bumnblue-5"
          >
            Konsultasi Gratis
          </a>
        </div>
      </section>

      <Gallery
        title="Project Gallery"
        description="Sebelum / sesudah dan cuplikan progres pekerjaan."
        items={galleryItems}
        layout="grid"
        gridCols={{ base: 1, md: 2, xl: 3 }}
        showThumbnails={false}
      />

      <Timeline
        title="Project Timeline"
        description="Fase utama dari desain hingga serah terima."
        steps={steps}
        numbered
        horizontalMd
        showProgress
      />

      <Cards
        variant="feature"
        title="Certifications & Safety Practices"
        description="Standar mutu & K3 yang kami terapkan di setiap proyek."
        items={certFeatures}
        gridCols={{ base: 1, md: 2, xl: 3 }}
      />
      <Cards variant="badges" items={safetyBadges} />

      <Matrix
        title="Contoh Bill of Quantity (Ringkas)"
        description="Estimasi awal. RAB final mengikuti gambar kerja & survei."
        columns={boqColumns}
        rows={boqRows}
        footnote="* Harga indikatif. Tidak mengikat sebelum survei & dokumen final."
      />

      <Map
        title="Sebaran Proyek"
        description="Beberapa lokasi proyek yang pernah kami kerjakan."
        mode="image"
        image={{ src: "/images/services/peta.jpg", alt: "Peta Indonesia", aspectRatio: "aspect-[1/1]" }}
        markers={markers}
        enableSearch
        enableCategoryFilter
        defaultActiveId="m1"
      />

    </div>
  );
}
