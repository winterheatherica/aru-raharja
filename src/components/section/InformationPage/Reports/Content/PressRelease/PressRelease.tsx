"use client";

import * as React from "react";
import YearSelector from "../Template/YearSelector/YearSelector";
import Landscape2, { PRItem } from "../Template/Landscape-2/Landscape-2";

type Props = {
  dict?: any;
  locale?: string;
  years?: string[];
  items?: PRItem[];
};

export default function PressRelease({
  dict,
  locale,
  years = ["2025", "2024", "2023"],
  items = [],
}: Props) {
  const defaultYear = years.includes("2025") ? "2025" : years[0];
  const [selectedYear, setSelectedYear] = React.useState<string>(defaultYear);
  const demoItems: PRItem[] = [
    {
      id: "pr-1",
      title: "Raker Operasional Bali",
      date: "5 August 2025",
      imageUrl: "/images/information/report/press-release/report1.jpeg",
      href: "#",
    },
    {
      id: "pr-2",
      title: "Tinjauan ke Lampung",
      date: "28 July 2025",
      imageUrl: "/images/information/report/press-release/report2.jpeg",
      href: "#",
    },
    {
      id: "pr-3",
      title: "Konsinyering Kemenkeu 2025 asdadsdas",
      date: "28 July 2025",
      imageUrl: "/images/information/report/press-release/report3.jpeg",
      href: "#",
    },
    {
      id: "pr-4",
      title: "Hari Anak Nasional 2024 Jasa Raharja",
      date: "26 July 2024",
      imageUrl: "/images/information/report/press-release/report4.jpeg",
      href: "#",
    },
    {
      id: "pr-5",
      title: "Jasa Raharja dukung Polantas Menyapa",
      date: "24 July 2024",
      imageUrl: "/images/information/report/press-release/report5.jpeg",
      href: "#",
    },
    {
      id: "pr-6",
      title: "Rakortas 2023",
      date: "2 June 2023",
      imageUrl: "/images/information/report/press-release/report6.png",
      href: "#",
    },
  ];

  const allItems = items.length ? items : demoItems;
  const displayItems = allItems.filter((it) => it.date?.includes(selectedYear));

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
                  gridTemplateColumns: "repeat(auto-fit, minmax(360px, 1fr))",
                }}
              >
                {displayItems.map((item) => (
                  <Landscape2 key={item.id} item={item} />
                ))}
              </div>
            </div>
          </div>
          
        </div>
      </div>
    </section>
  );
}
