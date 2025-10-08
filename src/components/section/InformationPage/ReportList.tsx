"use client";

import React from "react";
import ReportCard from "./ReportCard";

const reports = [
  {
    id: 1,
    date: "1 April 2025",
    title: "LAPORAN TAHUNAN 2024",
    image: "/report/report1.png",
    href: "/en/information/annual-report/2024",
  },
  {
    id: 2,
    date: "10 Mei 2025",
    title: "LAPORAN BULANAN MARET 2025",
    image: "/report/report2.png",
    href: "/en/information/monthly-report/2025/03",
  },
  {
    id: 3,
    date: "20 Juni 2025",
    title: "PRESS RELEASE KINERJA TRIWULAN I",
    image: "/report/report3.png",
    href: "/en/information/press-release/2025-q1",
  },
  {
    id: 4,
    date: "15 Juli 2025",
    title: "LAPORAN BULANAN JUNI 2025",
    image: "/report/report4.png",
    href: "/en/information/monthly-report/2025/06",
  },
  {
    id: 5,
    date: "20 Agustus 2025",
    title: "PRESS RELEASE KINERJA TRIWULAN II",
    image: "/report/report5.png",
    href: "/en/information/press-release/2025-q2",
  },
  {
    id: 6,
    date: "5 September 2025",
    title: "LAPORAN BULANAN JULI 2025",
    image: "/report/report6.png",
    href: "/en/information/monthly-report/2025/07",
  },
];


export default function ReportList() {
  return (
    <div className="grid grid-cols-1 gap-6 mt-8 md:grid-cols-2 lg:grid-cols-3">
      {reports.map((report) => (
        <a key={report.id} href={report.href} className="block">
          <ReportCard
            date={report.date}
            title={report.title}
            image={report.image}
          />
        </a>
      ))}
    </div>
  );
}
