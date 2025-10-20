"use client";

import * as React from "react";
import Portrait1 from "../Template/Portrait-1/Portrait-1";

type ReportItem = {
  id: string;
  title: string;
  date: string;
  imageUrl: string;
  href?: string;
};

type Props = {
  dict?: any;
  locale?: string;
  items?: ReportItem[];
};

export default function AnnualReport({
  dict,
  locale,
  items = [],
}: Props) {
  const defaultReports: ReportItem[] = [
    {
      id: "ar-2024",
      title: "Laporan Tahunan 2024 — Inovasi dan Transformasi Digital",
      date: "1 April 2025",
      imageUrl: "/images/information/report/annual-report/report1.png",
      href: "#",
    },
    {
      id: "ar-2023",
      title: "Laporan Tahunan 2023 — Kolaborasi Menuju Keberlanjutan",
      date: "1 April 2024",
      imageUrl: "/images/information/report/annual-report/report2.png",
      href: "#",
    },
    {
      id: "ar-2022",
      title: "Laporan Tahunan 2022 — Membangun Ketahanan Bisnis",
      date: "1 April 2023",
      imageUrl: "/images/information/report/annual-report/report3.png",
      href: "#",
    },
    {
      id: "ar-2021",
      title: "Laporan Tahunan 2021 — Adaptasi di Era Pandemi",
      date: "1 April 2022",
      imageUrl: "/images/information/report/annual-report/report4.png",
      href: "#",
    },
    {
      id: "ar-2020",
      title: "Laporan Tahunan 2020 — Menjaga Stabilitas di Tengah Krisis",
      date: "1 April 2021",
      imageUrl: "/images/information/report/annual-report/report5.png",
      href: "#",
    },
    {
      id: "ar-2019",
      title: "Laporan Tahunan 2019 — Fondasi Menuju Masa Depan",
      date: "1 April 2020",
      imageUrl: "/images/information/report/annual-report/report6.png",
      href: "#",
    },
  ];

  const reportItems = items.length ? items : defaultReports;

  return (
    <section className="py-8 lg:py-14">
      <div className="mx-auto max-w-screen-1440 px-4">
        <div className="grid grid-cols-12 gap-4">
          <div className="col-span-12 lg:col-span-12">
            <div className="mx-auto w-full max-w-[1400px]">
              <div
                className="grid gap-x-6 gap-y-8 items-stretch justify-start"
                style={{
                  gridTemplateColumns: "repeat(auto-fit, minmax(360px, 1fr))",
                  gridAutoRows: "1fr",
                }}
              >
                {reportItems.map((item) => (
                  <Portrait1 key={item.id} item={item} />
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
