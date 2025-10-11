"use client";

import * as React from "react";

import Calculator from "@/components/section/ServicePage/Solutions/Content/Template/Calculator/Calculator";
import Cards from "@/components/section/ServicePage/Solutions/Content/Template/Cards/Cards";
import Timeline from "@/components/section/ServicePage/Solutions/Content/Template/Timeline/Timeline";
import FAQ from "@/components/section/ServicePage/Solutions/Content/Template/FAQ/FAQ";

type DictShape = {
  service?: {
    solutions?: {
      aruhealthcare?: {
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

export default function Aruhealthcare({ dict }: Props) {
  const copy = dict?.service?.solutions?.aruhealthcare;
  const titleHtml =
    copy?.titleHtml ?? "<b>ARU</b><i>healthcare</i> — Preventif & Produktif";
  const description =
    copy?.description ??
    "Program preventif karyawan untuk menaikkan produktivitas dan menurunkan biaya rawat inap.";

  const wellnessScore = 78;

  const roiFields = [
    { id: "employees", label: "Jumlah Karyawan", defaultValue: 200, suffix: "org" },
    { id: "inpatientCost", label: "Biaya Rawat Inap / orang / tahun", defaultValue: 3500000, prefix: "Rp" },
    { id: "reductionPct", label: "Perkiraan Penurunan", defaultValue: 18, suffix: "%" },
  ] as const;

  const roiResults = [
    { id: "saving", label: "Estimasi Penghematan / tahun", formatter: "idr", highlight: true },
    { id: "perEmployee", label: "Penghematan / karyawan", formatter: "idr" },
  ] as const;

  const roiCompute = ({ employees, inpatientCost, reductionPct }: Record<string, number>) => {
    const emp = employees || 0;
    const cost = inpatientCost || 0;
    const pct = (reductionPct || 0) / 100;
    const saving = emp * cost * pct;
    const perEmployee = emp > 0 ? saving / emp : 0;
    return { saving, perEmployee };
  };

  const modules = [
    { id: "checkup", title: "Medical Checkup", badge: "Preventif" },
    { id: "mental", title: "Mental Health", badge: "Preventif" },
    { id: "nutrition", title: "Nutrisi", badge: "Preventif" },
    { id: "ergonomic", title: "Ergonomic Coaching" },
    { id: "quit", title: "Quit Smoking Program" },
  ];

  const steps = [
    {
      id: "m1",
      title: "Bulan 1",
      subtitle: "Kickoff & Screening",
      description: "Baseline {absensi, klaim, risiko}, onboarding peserta.",
      status: "done" as const,
      meta: [{ label: "Coverage", value: "90%+" }],
    },
    {
      id: "m2",
      title: "Bulan 2",
      subtitle: "Program Nutrisi",
      description: "Kelas nutrisi & food journal challenge.",
      status: "current" as const,
      meta: [{ label: "Partisipasi", value: "72%" }],
    },
    {
      id: "m3",
      title: "Bulan 3",
      subtitle: "Mental Health",
      description: "Webinar stress management + konseling 1:1 opsional.",
      status: "upcoming" as const,
    },
    {
      id: "m4",
      title: "Bulan 4",
      subtitle: "Aktivitas Fisik",
      description: "Steps challenge & ergonomic clinic.",
      status: "upcoming" as const,
    },
    {
      id: "m5",
      title: "Bulan 5",
      subtitle: "Checkup Ulang",
      description: "Evaluasi biomarker & progres individu.",
      status: "upcoming" as const,
    },
    {
      id: "m6",
      title: "Bulan 6",
      subtitle: "Laporan & ROI",
      description: "Executive report: dampak biaya rawat inap & produktivitas.",
      status: "upcoming" as const,
    },
  ];

  const privacyFaq = [
    {
      id: "p1",
      question: "Bagaimana privasi data kesehatan karyawan dijaga?",
      answer:
        "<ul><li>Data individu <b>di-anonimkan</b> pada laporan manajemen.</li><li>Akses berbasis role; hanya konselor melihat data personal saat sesi.</li><li>Audit log dan enkripsi penyimpanan.</li></ul>",
      category: "Privasi",
      defaultOpen: true,
    },
    {
      id: "p2",
      question: "Apakah sesuai standar (HIPAA-like)?",
      answer:
        "Kami menerapkan praktik sepadan: kontrol akses ketat, persetujuan peserta, enkripsi data saat transit & saat disimpan.",
      category: "Privasi",
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
      </section>

      <section className="grid gap-4 md:grid-cols-[minmax(260px,360px)_1fr] items-center">
        <div className="rounded-2xl border border-bumnslate-10 bg-white p-6 shadow-bumn-2">
          <h3 className="text-sm font-semibold text-bumnblue-2 mb-3">Wellness Score</h3>
          <WellnessGauge score={wellnessScore} />
          <p className="mt-3 text-xs text-bumnslate-6 text-center">
            Skor indikatif tim (0–100). Target per kuartal ≥ 80.
          </p>
        </div>

        <Cards
          variant="kpi"
          items={[
            { id: "inpatient", label: "Penurunan rawat inap", value: 18, unit: "%", note: "Rata-rata program 6 bulan", highlight: true },
            { id: "productivity", label: "Naik produktivitas", value: 12, unit: "%" },
            { id: "engagement", label: "Engagement peserta", value: 70, unit: "%", note: "Median perusahaan" },
            { id: "satisfaction", label: "Kepuasan program", value: 4.6, unit: "/5" },
          ]}
          gridCols={{ base: 1, md: 2, xl: 4 }}
        />
      </section>

      <Calculator
        title="ROI Calculator"
        description="Perkirakan penghematan biaya rawat inap dari program preventif."
        fields={roiFields as any}
        results={roiResults as any}
        compute={roiCompute}
        footnote="Hasil estimasi. Angka aktual bergantung pada baseline kesehatan & kepesertaan."
      />

      <Cards
        variant="modules"
        title="Program Modules"
        description="Paket aktivitas preventif yang bisa dikombinasikan sesuai budaya kerja."
        items={modules}
        gridCols={{ base: 2, md: 3, xl: 4 }}
      />

      <Timeline
        title="Engagement Timeline (6 Bulan)"
        description="Contoh rencana aktivitas dari onboarding hingga laporan ROI."
        steps={steps}
        numbered
        horizontalMd
        showProgress
      />

      <FAQ
        title="Privacy & Compliance"
        description="Kami mengutamakan keamanan & kerahasiaan data karyawan."
        items={privacyFaq}
        allowMultipleOpen
        defaultOpenAll={false}
      />

      <div className="text-center">
        <a
          href="/contact?topic=healthcare"
          className="inline-flex items-center gap-2 rounded-xl bg-bumn-gradient-primary-10 px-6 py-3 text-sm font-semibold text-white hover:opacity-95 focus:outline-none focus:ring-2 focus:ring-bumnblue-5"
        >
          Minta Proposal HR
        </a>
      </div>
    </div>
  );
}

function WellnessGauge({ score = 0 }: { score: number }) {
  const clamped = Math.max(0, Math.min(100, score));
  const size = 180;
  const stroke = 14;
  const r = (size - stroke) / 2;
  const c = 2 * Math.PI * r;
  const progress = (clamped / 100) * c;

  return (
    <div className="flex flex-col items-center">
      <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`} className="block">
        <circle
          cx={size / 2}
          cy={size / 2}
          r={r}
          stroke="#E8EAED"
          strokeWidth={stroke}
          fill="none"
        />
        <circle
          cx={size / 2}
          cy={size / 2}
          r={r}
          stroke="url(#grad)"
          strokeWidth={stroke}
          fill="none"
          strokeLinecap="round"
          strokeDasharray={`${c} ${c}`}
          strokeDashoffset={c - progress}
          transform={`rotate(-90 ${size / 2} ${size / 2})`}
        />
        <defs>
          <linearGradient id="grad" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#0F5CE5" />
            <stop offset="100%" stopColor="#53CAFD" />
          </linearGradient>
        </defs>
        <text
          x="50%"
          y="50%"
          dominantBaseline="central"
          textAnchor="middle"
          fontSize="32"
          fontWeight="700"
          fill="#126DB7"
        >
          {clamped}
        </text>
        <text
          x="50%"
          y="50%"
          dy="22"
          dominantBaseline="hanging"
          textAnchor="middle"
          fontSize="12"
          fill="#646A7A"
        >
          /100
        </text>
      </svg>
      <div className="mt-2 text-sm font-medium text-bumnblue-2">Team Wellness</div>
    </div>
  );
}
