"use client";

import * as React from "react";

import Timeline from "@/components/section/ServicePage/Solutions/Content/Template/Timeline/Timeline";
import Comparison from "@/components/section/ServicePage/Solutions/Content/Template/Comparison/Comparison";
import Cards from "@/components/section/ServicePage/Solutions/Content/Template/Cards/Cards";

type DictShape = {
  service?: {
    solutions?: {
      arusource?: {
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

export default function Arusource({ dict }: Props) {
  const copy = dict?.service?.solutions?.arusource;
  const titleHtml =
    copy?.titleHtml ?? "<b>ARU</b><i>source</i> — Tenaga kerja siap pakai";
  const description =
    copy?.description ??
    "Supply tenaga kerja profesional dengan SLA jelas, onboarding cepat, dan model kerja fleksibel (on-site / hybrid / remote).";
  const talents: Talent[] = [
    {
      id: "t1",
      name: "Alya Putri",
      role: "Frontend Engineer",
      seniority: "Senior (5+ thn)",
      avatar: "/talents/alya.jpg",
      skills: ["React", "Next.js", "Tailwind", "Testing"],
      available: true,
      location: "Jakarta",
    },
    {
      id: "t2",
      name: "Bima Pratama",
      role: "Data Analyst",
      seniority: "Mid (3 thn)",
      avatar: "/talents/bima.jpg",
      skills: ["SQL", "Python", "Power BI"],
      available: true,
      location: "Bandung",
    },
    {
      id: "t3",
      name: "Citra W.",
      role: "HR Generalist",
      seniority: "Senior (7 thn)",
      avatar: "/talents/citra.jpg",
      skills: ["Recruitment", "Payroll", "Compliance"],
      available: false,
      location: "Surabaya",
    },
    {
      id: "t4",
      name: "Dimas A.",
      role: "Project Coordinator",
      seniority: "Mid (4 thn)",
      avatar: "/talents/dimas.jpg",
      skills: ["Scheduling", "Reporting", "Vendor mgmt"],
      available: true,
      location: "Remote",
    },
  ];

  const steps = [
    {
      id: "w1",
      title: "Minggu 1",
      subtitle: "Kickoff & Shortlist",
      description: "Kumpulkan job spec, shortlist kandidat, jadwal interview.",
      status: "done" as const,
      meta: [{ label: "SLA", value: "< 72 jam shortlist" }],
    },
    {
      id: "w2",
      title: "Minggu 2",
      subtitle: "Interview & Offer",
      description: "Interview teknis/HR, reference check, negosiasi.",
      status: "current" as const,
      meta: [{ label: "Hit rate", value: "2–3 kandidat/posisi" }],
    },
    {
      id: "w3",
      title: "Minggu 3",
      subtitle: "Onboarding",
      description: "Dokumen, perangkat kerja, NDA, orientasi tugas.",
      status: "upcoming" as const,
    },
    {
      id: "w4",
      title: "Minggu 4",
      subtitle: "Stabilisasi",
      description: "Monitoring KPI awal, feedback loop, penguatan SLA.",
      status: "upcoming" as const,
    },
  ];

  const industries = [
    { id: "retail", title: "Retail", logoUrl: "/industries/retail.svg" },
    { id: "fmcg", title: "FMCG", logoUrl: "/industries/fmcg.svg" },
    { id: "bank", title: "Banking", logoUrl: "/industries/bank.svg" },
    { id: "log", title: "Logistics", logoUrl: "/industries/logistics.svg" },
    { id: "tech", title: "Tech", logoUrl: "/industries/tech.svg" },
    { id: "mfg", title: "Manufacturing", logoUrl: "/industries/mfg.svg" },
  ];

  const cmpItems = [
    { id: "on", title: "On-site", subtitle: "Di kantor" },
    { id: "hy", title: "Hybrid", subtitle: "Campuran WFO/WFH", badge: "Populer" },
    { id: "re", title: "Remote", subtitle: "Full WFH" },
  ];
  const cmpSections = [
    {
      id: "ops",
      title: "Operasional",
      rows: [
        { key: "collab", label: "Kolaborasi langsung", values: { on: "Mudah", hy: "Sedang", re: "Sulit" } },
        { key: "coverage", label: "Coverage jam kerja", values: { on: "09–17", hy: "09–17", re: "Fleksibel" } },
        { key: "equip", label: "Peralatan kerja", values: { on: "Disediakan kantor", hy: "Campuran", re: "Reimburse" } },
      ],
    },
    {
      id: "cost",
      title: "Biaya & Efisiensi",
      rows: [
        { key: "cost", label: "Biaya operasional", values: { on: "Tinggi", hy: "Sedang", re: "Rendah" } },
        { key: "talentpool", label: "Akses talent pool", values: { on: "Lokal", hy: "Regional", re: "Nasional+" } },
        { key: "retention", label: "Retensi", values: { on: "Sedang", hy: "Tinggi", re: "Bervariasi" } },
      ],
    },
    {
      id: "control",
      title: "Kontrol & Kepatuhan",
      rows: [
        { key: "compliance", label: "Kepatuhan & keamanan", values: { on: "Mudah dikontrol", hy: "Terkelola", re: "Perlu SOP ketat" } },
        { key: "monitor", label: "Monitoring KPI", values: { on: true, hy: true, re: true } },
      ],
    },
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
            href="/contact?topic=talent"
            className="inline-flex items-center gap-2 rounded-xl bg-bumn-gradient-primary-10 px-4 py-2 text-sm font-semibold text-white hover:opacity-95 focus:outline-none focus:ring-2 focus:ring-bumnblue-5"
          >
            Submit Job Spec
          </a>
          <a
            href="/contact?topic=talent&action=brief"
            className="inline-flex items-center gap-2 rounded-xl border border-bumnslate-10 bg-white px-4 py-2 text-sm font-semibold text-bumnblue-2 hover:border-bumnblue-5 focus:outline-none focus:ring-2 focus:ring-bumnblue-5"
          >
            Jadwalkan Brief
          </a>
        </div>
      </section>

      <TalentGrid title="Contoh Talent Tersedia" items={talents} />

      <Timeline
        title="SLA & Onboarding Timeline"
        description="Estimasi proses dari shortlist hingga stabilisasi minggu ke-4."
        steps={steps}
        numbered
        horizontalMd
        showProgress
      />

      <Cards
        variant="logo-wall"
        title="Industries Served"
        description="Berpengalaman di berbagai sektor."
        items={industries}
        gridCols={{ base: 2, md: 4, xl: 6 }}
      />

      <Comparison
        title="Hiring Models"
        description="Pilih model kerja sesuai kebutuhan operasional & efisiensi biaya."
        items={cmpItems}
        sections={cmpSections}
        showDiffToggle
      />

      <div className="text-center">
        <a
          href="/contact?topic=talent"
          className="inline-flex items-center gap-2 rounded-xl bg-bumn-gradient-primary-10 px-6 py-3 text-sm font-semibold text-white hover:opacity-95 focus:outline-none focus:ring-2 focus:ring-bumnblue-5"
        >
          Submit Job Spec
        </a>
      </div>
    </div>
  );
}

type Talent = {
  id: string;
  name: string;
  role: string;
  seniority: string;
  avatar?: string;
  skills?: string[];
  available?: boolean;
  location?: string;
};

function TalentGrid({ title, items }: { title?: string; items: Talent[] }) {
  return (
    <section className="w-full">
      {title && (
        <header className="mb-4">
          <h3 className="text-xl font-semibold text-bumnblue-2">{title}</h3>
        </header>
      )}

      <div className="grid grid-cols-1 gap-3 md:grid-cols-2 xl:grid-cols-3">
        {items.map((t) => (
          <article
            key={t.id}
            className="flex gap-3 rounded-2xl border border-bumnslate-10 bg-white p-4 shadow-bumn-2"
          >
            <div className="h-14 w-14 shrink-0 overflow-hidden rounded-xl bg-bumnwhite-3">
              {t.avatar ? (
                <img
                  src={t.avatar}
                  alt={t.name}
                  className="h-full w-full object-cover"
                />
              ) : (
                <div className="flex h-full w-full items-center justify-center text-sm text-bumnslate-6">
                  {t.name.charAt(0)}
                </div>
              )}
            </div>

            <div className="min-w-0 flex-1">
              <div className="flex items-start justify-between gap-2">
                <div>
                  <div className="text-sm font-semibold text-bumnblue-2">
                    {t.name}
                  </div>
                  <div className="text-xs text-bumnslate-6">
                    {t.role} • {t.seniority}
                  </div>
                </div>

                <span
                  className={`rounded-full px-2 py-0.5 text-[10px] ${
                    t.available
                      ? "bg-bumncyan-1 text-bumnblue-2"
                      : "bg-bumnslate-10 text-bumnslate-6"
                  }`}
                  title={t.available ? "Available" : "Not available"}
                >
                  {t.available ? "Available" : "Not available"}
                </span>
              </div>

              {t.location && (
                <div className="mt-1 text-[11px] text-bumnslate-6">
                  📍 {t.location}
                </div>
              )}

              {t.skills && t.skills.length > 0 && (
                <div className="mt-2 flex flex-wrap gap-1">
                  {t.skills.slice(0, 6).map((s) => (
                    <span
                      key={s}
                      className="rounded-full bg-bumnwhite-3 px-2 py-0.5 text-[11px] text-bumnslate-6"
                    >
                      {s}
                    </span>
                  ))}
                </div>
              )}
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
