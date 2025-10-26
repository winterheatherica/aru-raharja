"use client";

import * as React from "react";
import Landscape3 from "../Template/Landscape-3/Landscape-3";
import YearSelector from "../Template/YearSelector/YearSelector";

type NewsItem = {
  id: string;
  title: string;
  date: string;
  imageUrl?: string;
  excerpt?: string;
  href?: string;
};

type Props = {
  dict?: any;
  locale?: string;
  items?: NewsItem[];
  years?: string[];
};

export default function News({
  dict,
  locale,
  items = [],
  years = ["2025", "2024", "2023"],
}: Props) {
  const defaultYear = years.includes("2025") ? "2025" : years[0];
  const [selectedYear, setSelectedYear] = React.useState<string>(defaultYear);
  const demoItems: NewsItem[] = [
    {
      id: "news-0",
      title: "Digital IT Penopang Kehidupan Manusia",
      date: "2025-10-10",
      excerpt:
        "Dalam kehidupan manusia kebutuhan akan informasi merupakan suatu hal yang sangat penting.",
      imageUrl: "/images/article/article-1.png",
      href: "/id/artikel/digital-it-penopang-kehidupan-manusia",
    },
    {
      id: "news-1",
      title: "ARU Raharja Sukses Menggelar Program Digitalisasi Pelayanan",
      date: "2025-10-10",
      excerpt:
        "Digitalisasi menjadi langkah besar ARU Raharja dalam meningkatkan efisiensi layanan publik di berbagai sektor.",
      imageUrl: "/images/home/news/news-1.jpeg",
      href: "#",
    },
    {
      id: "news-2",
      title: "Inovasi Baru ARU Raharja dalam Layanan Infrastruktur",
      date: "2025-09-08",
      excerpt:
        "ARU Raharja memperkenalkan sistem monitoring berbasis AI untuk meningkatkan kualitas dan keamanan infrastruktur nasional.",
      imageUrl: "/images/home/news/news-2.jpeg",
      href: "#",
    },
    {
      id: "news-3",
      title: "ARU Raharja Dorong Transformasi Digital di Sektor BUMN",
      date: "2025-08-05",
      excerpt:
        "Transformasi digital ARU Raharja menjadi bagian dari upaya kolaborasi untuk menciptakan sistem layanan publik yang lebih efisien.",
      imageUrl: "/images/home/news/news-3.jpeg",
      href: "#",
    },
    {
      id: "news-4",
      title: "ARU Raharja Raih Penghargaan Inovasi Nasional",
      date: "2024-07-10",
      excerpt:
        "Atas inovasinya dalam pengembangan sistem digitalisasi pelayanan publik, ARU Raharja menerima penghargaan tingkat nasional.",
      imageUrl: "/images/home/news/news-4.jpg",
      href: "#",
    },
    {
      id: "news-5",
      title: "ARU Raharja Raih Penghargaan Inovasi Nasional",
      date: "2024-07-10",
      excerpt:
        "Atas inovasinya dalam pengembangan sistem digitalisasi pelayanan publik, ARU Raharja menerima penghargaan tingkat nasional.",
      imageUrl: "/images/home/news/news-5.jpeg",
      href: "#",
    },
    {
      id: "news-6",
      title: "ARU Raharja Raih Penghargaan Inovasi Nasional",
      date: "2023-07-10",
      excerpt:
        "Atas inovasinya dalam pengembangan sistem digitalisasi pelayanan publik, ARU Raharja menerima penghargaan tingkat nasional.",
      imageUrl: "/images/home/news/news-6.jpeg",
      href: "#",
    },
  ];

  const allItems = items.length ? items : demoItems;
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
                className="grid gap-x-4 gap-y-8"
                style={{ gridTemplateColumns: "repeat(auto-fit, minmax(360px, 1fr))" }}
              >
                {displayItems.map((item) => (
                  <Landscape3 key={item.id} item={item} />
                ))}
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
