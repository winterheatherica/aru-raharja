"use client";

import * as React from "react";
import Landscape1 from "../Template/Landscape-1/Landscape-1";
import YearSelector from "../Template/YearSelector/YearSelector";

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
  years?: string[];
  items?: ReportItem[];
};

export default function MonthlyReport({
  dict,
  locale,
  years = ["2025", "2024", "2023"],
  items = [],
}: Props) {
  const defaultYear = years.includes("2025") ? "2025" : years[0];
  const [selectedYear, setSelectedYear] = React.useState<string>(defaultYear);
  const defaultItems: ReportItem[] = [
    {
      id: "pr-2025-1",
      title: "Press Release — Peluncuran Program Digitalisasi 2025",
      date: "5 August 2025",
      imageUrl: "/images/information/report/monthly-report/report1.jpeg",
      href: "#",
    },
    {
      id: "pr-2025-2",
      title: "Press Release — Kerjasama Strategis Infrastruktur 2025",
      date: "28 July 2025",
      imageUrl: "/images/information/report/monthly-report/report2.jpeg",
      href: "#",
    },
    {
      id: "pr-2025-3",
      title: "Press Release — Inovasi Layanan Publik 2025",
      date: "17 January 2025",
      imageUrl: "/images/information/report/monthly-report/report3.jpeg",
      href: "#",
    },
    {
      id: "pr-2024-1",
      title: "Press Release — Ringkasan Kegiatan 2024 (Q4)",
      date: "10 December 2024",
      imageUrl: "/images/information/report/monthly-report/report4.jpeg",
      href: "#",
    },
    {
      id: "pr-2024-2",
      title: "Press Release — Program Penguatan SDM 2024",
      date: "4 November 2024",
      imageUrl: "/images/information/report/monthly-report/report5.jpeg",
      href: "#",
    },
    {
      id: "pr-2023-1",
      title: "Press Release — Laporan Tahunan 2023",
      date: "2 June 2023",
      imageUrl: "/images/information/report/monthly-report/report6.jpeg",
      href: "#",
    },
  ];

  const allItems = items.length ? items : defaultItems;
  const displayItems = allItems.filter((it) => it.date.includes(selectedYear));

  return (
    <section className="py-8 lg:py-14">
      <div className="mx-auto max-w-screen-1440 px-4">
        <div className="grid grid-cols-12 gap-4">

          <aside className="col-span-12 lg:col-span-2">
            <YearSelector
              years={years}
              selectedYear={selectedYear}
              onChange={(y) => setSelectedYear(y)}
            />
          </aside>

          <div className="col-span-12 lg:col-span-10">
            <div className="mx-auto w-full max-w-[1112px]">
              <div
                className="grid gap-x-4 gap-y-8 justify-center"
                style={{
                  gridTemplateColumns:
                    "repeat(auto-fit, minmax(360px, 1fr))",
                }}
              >
                {displayItems.map((item) => (
                  <Landscape1 key={item.id} item={item} />
                ))}
              </div>
            </div>
          </div>
          
        </div>
      </div>
    </section>
  );
}
