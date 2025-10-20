"use client";

import Image from "next/image";
import Link from "next/link";

export type NewsItem = {
  id: string;
  title: string;
  date: string;
  imageUrl?: string;
  excerpt?: string;
  href?: string;
};

export default function Landscape3({
  item,
  readMoreLabel = "Read More",
}: {
  item: NewsItem;
  readMoreLabel?: string;
}) {
  const imageSrc = item?.imageUrl || "/images/home/news/news-4.jpg";
  const formatDate = (dateStr: string) => {
    const d = new Date(dateStr);
    if (isNaN(d.getTime())) return dateStr;
    const day = String(d.getDate()).padStart(2, "0");
    const month = String(d.getMonth() + 1).padStart(2, "0");
    const year = d.getFullYear();
    return `${day}/${month}/${year}`;
  };

  return (
    <div className="mx-auto w-full max-w-[360px]">
      <div className="flex flex-col items-start w-full h-full p-2 rounded-lg shadow-bumn-2 bg-bumn-gradient-white-4">
        <Link
          href={item.href || "#"}
          className="relative w-full overflow-hidden rounded-lg aspect-[16/9]"
        >
          <Image
            src={imageSrc}
            alt={item.title || "News image"}
            fill
            sizes="(max-width: 1024px) 100vw, 33vw"
            className="object-cover rounded-lg"
            priority={false}
          />
        </Link>

        <div className="w-full p-3 pb-0 lg:p-5 lg:pb-0">
          <div className="flex justify-between items-start w-full gap-6">
            <div className="flex items-start gap-4">
              <span className="block w-3 h-3 rounded-full bg-bumn-gradient-primary-11 shrink-0 mt-1" />
              <h3 className="text-lg font-bold lg:text-xl line-clamp-2 text-black">
                {item.title}
              </h3>
            </div>

            <p className="font-sans text-sm lg:text-base font-medium text-black/60 whitespace-nowrap">
              {formatDate(item.date)}
            </p>
          </div>
        </div>

        <div className="w-full p-3 pt-2 pb-1 mt-auto space-y-3 lg:pb-3 lg:p-5 lg:pt-2">
          <div className="mt-auto text-base text-black/60 font-lato line-clamp-2">
            {item.excerpt || "Deskripsi belum tersedia."}
          </div>

          <Link
            href={item.href || "#"}
            className="inline-flex items-center gap-2 text-sm font-medium text-blue-700 underline-offset-4 hover:underline h-9 rounded-full p-0"
          >
            <span className="block">{readMoreLabel}</span>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="lucide lucide-chevron-right"
            >
              <path d="m9 18 6-6-6-6" />
            </svg>
          </Link>
        </div>
      </div>
    </div>
  );
}
