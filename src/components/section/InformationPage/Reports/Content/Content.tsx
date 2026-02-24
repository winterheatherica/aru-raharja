"use client";

import * as React from "react";
import News from "./News/News";
import SectionTitle from "./Template/SectionTitle/SectionTitle";

type Props = {
  activeId: string;
  dict: any;
  locale: string;
  site?: {
    news_cards?: any[];
    news_years?: number[];
  };
};

export default function Content({ activeId, dict, locale, site }: Props) {
  const sectionTitle = dict?.information?.reports?.sectionTitle?.[activeId] ?? {};
  const titleHtml = sectionTitle?.titleHtml || "";
  const description = sectionTitle?.description || "";

  let content: React.ReactNode = null;

  switch (activeId) {
    case "news":
      content = (
        <News
          dict={dict}
          locale={locale}
          items={site?.news_cards}
          years={site?.news_years}
        />
      );
      break;
  }

  return (
    <section className="py-4">
      <div className="container mx-auto px-4">
        <SectionTitle titleHtml={titleHtml} description={description} />
        {content}
      </div>
    </section>
  );
}
