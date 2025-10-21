"use client";

import * as React from "react";

import Cards from "@/components/section/ServicePage/Solutions/Content/Template/Cards/Cards";
import Timeline from "@/components/section/ServicePage/Solutions/Content/Template/Timeline/Timeline";
import FAQ from "@/components/section/ServicePage/Solutions/Content/Template/FAQ/FAQ";
import Matrix from "@/components/section/ServicePage/Solutions/Content/Template/Matrix/Matrix";

type DictShape = {
  service?: {
    solutions?: {
      arusolution?: {
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

export default function Arusolution({ dict }: Props) {
  const copy = dict?.service?.solutions?.arusolution;
  const titleHtml =
    copy?.titleHtml ?? "<b>ARU</b><i>solution</i> — Implementasi cepat & best-fit";
  const description =
    copy?.description ??
    "Solusi siap pakai dengan playbook implementasi 1–3 minggu, sesuai kebutuhan dan budaya kerja perusahaan Anda.";
  const playbooks = [
    {
      id: "pb-hris",
      title: "HRIS Quickstart",
      desc: "Absensi, cuti, struktur organisasi, dan payroll dasar.",
      badge: "1–2 minggu",
    },
    {
      id: "pb-fin",
      title: "Finance Essentials",
      desc: "Invoicing, AR/AP, approval flow, dan cashflow view.",
      badge: "2 minggu",
    },
    {
      id: "pb-inv",
      title: "Inventory Lite",
      desc: "Stok multi-gudang, batch/lot, dan opname cepat.",
      badge: "2–3 minggu",
    },
  ];

  const steps = [
    {
      id: "w1",
      title: "Minggu 1",
      subtitle: "Discovery & Konfigurasi",
      description:
        "Workshop kebutuhan, mapping role & approval, konfigurasi modul prioritas.",
      status: "done" as const,
      meta: [{ label: "Dokumen", value: "BRD v1" }],
    },
    {
      id: "w2",
      title: "Minggu 2",
      subtitle: "Migrasi Data & UAT",
      description:
        "Template import, migrasi awal, UAT terbimbing, fine-tuning setting.",
      status: "current" as const,
      meta: [{ label: "Coverage", value: "80% modul" }],
    },
    {
      id: "w3",
      title: "Minggu 3",
      subtitle: "Go-live & Stabilisasi",
      description:
        "Training admin & user, rilis, monitoring, quick fixes, dan handover.",
      status: "upcoming" as const,
      meta: [{ label: "SLA", value: "99.9%" }],
    },
  ];

  const readiness = [
    {
      id: "r1",
      question: "Struktur organisasi (unit, jabatan, atasan) tersedia?",
      answer:
        "Siapkan CSV/Excel: <code>Nama</code>, <code>NIP</code>, <code>Jabatan</code>, <code>Atasan</code>.",
      category: "Data",
      checkable: true,
      defaultChecked: false,
    },
    {
      id: "r2",
      question: "Daftar user & role sudah ditentukan?",
      answer: "Minimal: Admin, Approver, dan User (per modul).",
      category: "Akses",
      checkable: true,
    },
    {
      id: "r3",
      question: "Kebijakan approval disepakati?",
      answer: "1–3 level approval, definisi SLA, delegasi saat cuti.",
      category: "Proses",
      checkable: true,
    },
    {
      id: "r4",
      question: "Data awal (cuti/utang/piutang/stok) siap di-import?",
      answer: "Gunakan template import; kami bantu mapping & validasi.",
      category: "Data",
      checkable: true,
    },
  ];

  const raciColumns = [
    { id: "aru", label: "ARU" },
    { id: "client", label: "Client" },
  ];
  const raciRows = [
    { feature: "Discovery & BRD", values: { aru: "R/A", client: "C/I" } },
    { feature: "Konfigurasi & Setup", values: { aru: "R", client: "C/I" } },
    { feature: "Data Migration", values: { aru: "C", client: "R/A" } },
    { feature: "UAT & Sign-off", values: { aru: "C", client: "R/A" } },
    { feature: "Training", values: { aru: "R", client: "C" } },
    { feature: "Go-live & Support", values: { aru: "R/A", client: "C/I" } },
  ];

  const risks = [
    {
      id: "k1",
      question: "Data tidak lengkap/valid saat migrasi",
      answer:
        "<b>Mitigasi:</b> sediakan template validasi, lakukan sampling QA, jadwalkan buffer 2–3 hari.",
      category: "Data",
    },
    {
      id: "k2",
      question: "User resist terhadap perubahan proses",
      answer:
        "<b>Mitigasi:</b> sosialisasi awal, champion per divisi, materi training ringkas & video mikro.",
      category: "Adopsi",
    },
    {
      id: "k3",
      question: "Integrasi dengan sistem lain terlambat",
      answer:
        "<b>Mitigasi:</b> gunakan konektor sementara (CSV/API light), split rilis: core dulu, integrasi menyusul.",
      category: "Teknis",
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

      </section>

      <Cards
        variant="feature"
        title="Solution Playbooks"
        description="Paket implementasi cepat berdasarkan use-case paling umum."
        items={playbooks}
        gridCols={{ base: 1, md: 2, xl: 3 }}
      />

      <Timeline
        title="Timeline Estimator"
        description="Estimasi umum. Durasi aktual menyesuaikan kompleksitas & kesiapan data."
        steps={steps}
        numbered
        horizontalMd
        showProgress
      />

      <FAQ
        title="Readiness Checklist"
        description="Tandai yang sudah siap supaya implementasi melaju cepat."
        items={readiness}
        allowMultipleOpen
      />

      <Matrix
        title="RACI Snapshot"
        description="Tanggung jawab ARU vs Client di fase implementasi."
        columns={raciColumns}
        rows={raciRows}
        footnote="R = Responsible, A = Accountable, C = Consulted, I = Informed"
      />

      <FAQ
        title="Risks & Mitigation"
        description="Antisipasi hambatan umum dan rencana mitigasinya."
        items={risks}
        allowMultipleOpen
      />

    </div>
  );
}
