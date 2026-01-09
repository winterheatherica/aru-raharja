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

  React.useEffect(() => {
    if (defaultYear) setSelectedYear(defaultYear);
  }, [defaultYear]);

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

  const displayItems = React.useMemo(() => {
    if (!selectedYear) return mappedItems;
    return mappedItems.filter((it) => it.date.startsWith(selectedYear));
  }, [mappedItems, selectedYear]);

  return (
    <section className="py-8 lg:py-14">
      <div className="mx-auto max-w-screen-1440 px-4">
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
                className="grid gap-x-4 gap-y-8"
                style={{ gridTemplateColumns: "repeat(auto-fit, minmax(360px, 1fr))" }}
              >
                {displayItems.map((item) => (
                  <Landscape3 key={item.id} item={item} />
                ))}
                {displayItems.length === 0 && (
                  <div className="text-bumnslate-4">No news found for this year.</div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
