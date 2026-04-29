"use client";

import * as React from "react";
import Landscape3 from "../Template/Landscape-3/Landscape-3";
import YearSelector from "../Template/YearSelector/YearSelector";
import { articleHref } from "@/i18n/param_routes";


type ApiNewsCard = {
  id: string;
  slug: string;
  title: string;
  summary: string;
  image_path?: string;
  published_at: string;
};

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
  items?: ApiNewsCard[];
  years?: number[];
};

export default function News({ dict, locale, items = [], years = [] }: Props) {
  const sortedYears = React.useMemo(() => [...years].sort((a, b) => b - a), [years]);
  const defaultYear = sortedYears.length ? String(sortedYears[0]) : "";
  const [selectedYear, setSelectedYear] = React.useState<string>(defaultYear);
  const [page, setPage] = React.useState<number>(1);
  const readMoreLabel = dict?.information?.reports?.readMore;
  const perPage = 18;

  React.useEffect(() => {
    if (defaultYear) {
      setSelectedYear(defaultYear);
      setPage(1);
    }
  }, [defaultYear]);

  React.useEffect(() => {
    setPage(1);
  }, [selectedYear]);

  const mappedItems: NewsItem[] = React.useMemo(
    () =>
      items.map((it) => ({
        id: it.id,
        title: it.title,
        date: it.published_at,
        excerpt: it.summary,
        imageUrl: it.image_path,
        href: articleHref(locale ?? "en", it.slug),
      })),
    [items, locale]
  );

  const filteredItems = React.useMemo(() => {
    if (!selectedYear) return mappedItems;
    return mappedItems.filter((it) => it.date.startsWith(selectedYear));
  }, [mappedItems, selectedYear]);

  const totalPages = Math.max(1, Math.ceil(filteredItems.length / perPage));

  React.useEffect(() => {
    if (page > totalPages) setPage(totalPages);
  }, [page, totalPages]);

  const displayItems = React.useMemo(() => {
    const start = (page - 1) * perPage;
    return filteredItems.slice(start, start + perPage);
  }, [filteredItems, page]);

  return (
    <section className="py-8 lg:py-14">
      <div className="mx-auto max-w-screen-1440 px-0 md:px-4">
        <div className="grid grid-cols-12 gap-4">
          <aside className="col-span-12 lg:col-span-2">
            <YearSelector
              years={sortedYears.map(String)}
              selectedYear={selectedYear}
              onChange={(y) => setSelectedYear(y)}
            />
          </aside>

          <div className="col-span-12 lg:col-span-10">
            <div className="mx-auto w-full max-w-[1112px]">
              <div
                className="grid grid-cols-1 justify-items-stretch gap-x-4 gap-y-8 sm:grid-cols-2 xl:grid-cols-3"
              >
                {displayItems.map((item) => (
                  <Landscape3 key={item.id} item={item} readMoreLabel={readMoreLabel} />
                ))}
                {displayItems.length === 0 && (
                  <div className="text-bumnslate-4">No news found for this year.</div>
                )}
              </div>

              {filteredItems.length > perPage && (
                <div className="mt-8 flex items-center justify-center gap-4">
                  <button
                    type="button"
                    aria-label="Previous page"
                    className="group flex h-11 w-11 items-center justify-center rounded-full bg-bumn-gradient-primary-11 text-white shadow transition-colors duration-300 ease-in-out hover:bg-none hover:text-black disabled:cursor-not-allowed disabled:bg-bumnslate-6 disabled:text-white disabled:opacity-60"
                    disabled={page <= 1}
                    onClick={() => setPage((p) => Math.max(1, p - 1))}
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      className="h-5 w-5"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <path d="M6 12H22"></path>
                      <path d="M6 12L10 8"></path>
                      <path d="M6 12L10 16"></path>
                    </svg>
                  </button>

                  <span className="min-w-[88px] text-center text-base font-bold text-black">
                    {page} / {totalPages}
                  </span>

                  <button
                    type="button"
                    aria-label="Next page"
                    className="group flex h-11 w-11 items-center justify-center rounded-full bg-bumn-gradient-primary-11 text-white shadow transition-colors duration-300 ease-in-out hover:bg-none hover:text-black disabled:cursor-not-allowed disabled:bg-bumnslate-6 disabled:text-white disabled:opacity-60"
                    disabled={page >= totalPages}
                    onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      className="h-5 w-5"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <path d="M18 12H2"></path>
                      <path d="M18 12L14 8"></path>
                      <path d="M18 12L14 16"></path>
                    </svg>
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
