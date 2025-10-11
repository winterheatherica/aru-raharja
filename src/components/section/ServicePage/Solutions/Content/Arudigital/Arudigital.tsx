"use client";

import * as React from "react";

import Pricing from "@/components/section/ServicePage/Solutions/Content/Template/Pricing/Pricing";
import Matrix from "@/components/section/ServicePage/Solutions/Content/Template/Matrix/Matrix";
import Cards from "@/components/section/ServicePage/Solutions/Content/Template/Cards/Cards";
import Gallery from "@/components/section/ServicePage/Solutions/Content/Template/Gallery/Gallery";

type DictShape = {
  service?: {
    solutions?: {
      arudigital?: {
        titleHtml?: string;
        description?: string;
        demo?: {
          kind?: "image" | "video";
          src: string;
          poster?: string;
          caption?: string;
        };
      };
    };
  };
};

type Props = {
  dict: DictShape;
  locale: string;
};

export default function Arudigital({ dict }: Props) {
  const copy = dict?.service?.solutions?.arudigital;

  const titleHtml =
    copy?.titleHtml ?? "<b>ARU</b><i>digital</i> — Cloud business platform";
  const description =
    copy?.description ??
    "Digital solutions to streamline operations and deliver better customer experiences.";
  const demo = copy?.demo ?? {
    kind: "video" as const,
    src: "/media/arudigital-demo.mp4",
    poster: "/media/arudigital-demo-poster.jpg",
    caption: "Login → Dashboard overview (sample demo)",
  };

  const pricing = {
    note: "Harga belum termasuk PPN 11%. Paket tahunan sudah termasuk diskon 2 bulan.",
    tiers: [
      {
        id: "starter",
        name: "Starter",
        description: "Tim kecil, mulai cepat.",
        priceMonthly: 99000,
        priceYearly: 99000 * 10,
        features: ["User sampai 10", "Modul HRIS dasar", "Email support (48 jam)"],
        ctaLabel: "Coba Gratis",
        ctaHref: "/contact?plan=starter",
      },
      {
        id: "growth",
        name: "Growth",
        description: "Perusahaan berkembang.",
        priceMonthly: 399000,
        priceYearly: 399000 * 10,
        features: ["User sampai 100", "HRIS + Finance + Inventory", "SSO", "SLA 99.9%"],
        ctaLabel: "Request Demo",
        ctaHref: "/contact?plan=growth",
        popular: true,
      },
      {
        id: "enterprise",
        name: "Enterprise",
        description: "Skala besar & kustom.",
        priceMonthly: 540000,
        priceYearly: 540000 * 10,
        features: ["Unlimited user", "Audit Log & DLP", "On-prem/Hybrid", "Dedicated CS"],
        ctaLabel: "Hubungi Sales",
        ctaHref: "/contact?plan=enterprise",
      },
    ],
  };

  const fmColumns = [{ id: "avail", label: "Ketersediaan", popular: true }];
  const fmRows = [
    { feature: "HRIS", values: { avail: true } },
    { feature: "Finance", values: { avail: true } },
    { feature: "Inventory", values: { avail: "Add-on" } },
  ];

  const integrations = [
    { id: "google", title: "Google", logoUrl: "/logos/google.svg" },
    { id: "microsoft", title: "Microsoft", logoUrl: "/logos/microsoft.svg" },
    { id: "sap", title: "SAP", logoUrl: "/logos/sap.svg", darkInvert: true },
    { id: "slack", title: "Slack", logoUrl: "/logos/slack.svg" },
    { id: "okta", title: "Okta", logoUrl: "/logos/okta.svg" },
    { id: "gsheets", title: "Google Sheets", logoUrl: "/logos/gsheets.svg" },
  ];

  const securityBadges = [
    { id: "iso", title: "ISO 27001" },
    { id: "sso", title: "SSO Ready" },
    { id: "audit", title: "Audit Log" },
    { id: "backup", title: "Daily Backup" },
  ];

  const caseStudies = [
    {
      id: "cs-1",
      kind: "image" as const,
      src: "/case/retail-before-after.png",
      alt: "Retail: sebelum & sesudah",
      caption: "Retail: cut manual process 60% — deploy 3 minggu",
    },
    {
      id: "cs-2",
      kind: "image" as const,
      src: "/case/manufacture-dashboard.png",
      alt: "Manufacture dashboard",
      caption: "Manufacture: real-time inventory & traceability",
    },
    {
      id: "cs-3",
      kind: "video" as const,
      src: "/case/finance-automation.mp4",
      poster: "/case/finance-automation-poster.jpg",
      caption: "Finance automation: from invoice to reconciliation",
    },
  ];

  return (
    <div className="space-y-10">
      <section className="grid gap-6 lg:grid-cols-2 lg:items-center">
        <div className="space-y-4">
          <h2
            className="text-2xl lg:text-4xl font-semibold leading-snug"
            dangerouslySetInnerHTML={{ __html: titleHtml }}
          />
          <p className="text-bumnslate-5 text-base lg:text-lg">{description}</p>

          <div className="flex flex-wrap gap-2 pt-1">
            <a
              href="/sandbox"
              className="inline-flex items-center gap-2 rounded-xl bg-bumn-gradient-primary-10 px-4 py-2 text-sm font-semibold text-white hover:opacity-95 focus:outline-none focus:ring-2 focus:ring-bumnblue-5"
            >
              Coba Sandbox
            </a>
            <a
              href="/roadmap"
              className="inline-flex items-center gap-2 rounded-xl border border-bumnslate-10 bg-white px-4 py-2 text-sm font-semibold text-bumnblue-2 hover:border-bumnblue-5 focus:outline-none focus:ring-2 focus:ring-bumnblue-5"
            >
              Lihat Roadmap
            </a>
          </div>
        </div>

        <div className="rounded-2xl border border-bumnslate-10 bg-bumnblack-1/90 shadow-bumn-2 overflow-hidden">
          {demo.kind === "video" ? (
            <video
              className="w-full max-h-[420px] object-contain bg-black"
              src={demo.src}
              poster={demo.poster}
              controls
              preload="metadata"
            />
          ) : (
            <img
              className="w-full max-h-[420px] object-contain bg-black"
              src={demo.src}
              alt={demo.caption || "Demo"}
            />
          )}
          {demo.caption && (
            <div className="border-t border-bumnslate-10 p-2 text-center text-xs text-bumnslate-6">
              {demo.caption}
            </div>
          )}
        </div>
      </section>

      <Matrix
        title="Modul & Ketersediaan"
        description="Modul inti yang tersedia pada ARUdigital."
        columns={fmColumns}
        rows={fmRows}
        footnote="* Inventory tersedia sebagai Add-on."
      />

      <Pricing
        tiers={pricing.tiers}
        note={pricing.note}
        billingToggle
        currency="IDR"
        defaultPeriod="monthly"
      />

      <Cards
        variant="logo-wall"
        title="Integrations"
        description="Terhubung dengan tools favorit Anda."
        items={integrations}
        gridCols={{ base: 2, md: 4, xl: 6 }}
      />

      <Cards
        variant="badges"
        title="Security & Compliance"
        items={securityBadges}
      />

      <Gallery
        title="Case Studies"
        description="Problem → Solusi → Hasil."
        items={caseStudies}
        layout="carousel"
        showThumbnails
        autoplay
        autoplayIntervalMs={6000}
      />

      <div className="flex flex-wrap gap-2">
        <a
          href="/sandbox"
          className="inline-flex items-center gap-2 rounded-xl bg-bumn-gradient-primary-10 px-4 py-2 text-sm font-semibold text-white hover:opacity-95 focus:outline-none focus:ring-2 focus:ring-bumnblue-5"
        >
          Coba Sandbox
        </a>
        <a
          href="/roadmap"
          className="inline-flex items-center gap-2 rounded-xl border border-bumnslate-10 bg-white px-4 py-2 text-sm font-semibold text-bumnblue-2 hover:border-bumnblue-5 focus:outline-none focus:ring-2 focus:ring-bumnblue-5"
        >
          Lihat Roadmap
        </a>
        <a
          href="/contact?topic=arudigital"
          className="inline-flex items-center gap-2 rounded-xl border border-bumnslate-10 bg-white px-4 py-2 text-sm font-semibold text-bumnblue-2 hover:border-bumnblue-5 focus:outline-none focus:ring-2 focus:ring-bumnblue-5"
        >
          Request Demo
        </a>
      </div>
    </div>
  );
}
