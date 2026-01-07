"use client";

import { memo } from "react";
import type { Dictionary, Locale } from "@/i18n/get_dictionary";
import Carousel from "./Carousel";
import type { NewsItem } from "./types";

type NewsAPIItem = {
  id: string;
  slug: string;
  title: string;
  summary: string;
  image_path: string;
  published_at: string;
};

function formatDate(iso: string) {
  const d = new Date(iso);
  return d.toLocaleDateString("id-ID", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
  });
}

function getArticlePath(locale: Locale) {
  return locale === "id" ? "artikel" : "article";
}

function mapNews(apiItems: NewsAPIItem[], locale: Locale): NewsItem[] {
  const base = getArticlePath(locale);

  return apiItems.map((n) => ({
    id: n.id,
    href: `/${locale}/${base}/${n.slug}`,
    title: n.title,
    date: formatDate(n.published_at),
    imageSrc: n.image_path,
    excerpt: n.summary,
  }));
}

function News({
  dict,
  locale,
  items,
}: {
  dict: Dictionary;
  locale: Locale;
  items: NewsAPIItem[];
}) {
  const t = dict.home.news;

  const newsItems = mapNews(items, locale);

  if (!newsItems.length) return null;

  return (
    <section className="relative h-[470px] md:h-[520px] lg:h-[590px] mt-12">
      <div className="absolute inset-x-0 top-0">
        <h2 className="pl-4 mb-4 text-2xl font-semibold lg:text-4xl lg:font-bold text-black">
          {t.heading}
        </h2>

        <Carousel
          items={newsItems}
          readMoreLabel={t.readMoreLabel}
          loadMoreLabel={t.loadMoreLabel}
        />
      </div>
    </section>
  );
}

export default memo(News);
