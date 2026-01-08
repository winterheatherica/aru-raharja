"use client";

import * as React from "react";
import Content from "./Content/Content";
import PhoneCTA from "@/components/general/BluePrint/PhoneCTA/PhoneCTA";

type NavItem = { id: string; label: string };

type DictShape = {
  information?: {
    reports?: {
      nav?: readonly NavItem[];
      arudigital?: {
        titleHtml?: string;
        description?: string;
        altIllustration?: string;
      };
    };
  };
};

type Props = {
  dict: DictShape;
  locale: string;
  site?: {
    news_cards?: any[];
    news_years?: number[];
  };
  value?: string;
  onValueChange?: (id: string) => void;
};

export default function Reports({ dict, locale, site, value, onValueChange }: Props) {
  const items = (dict?.information?.reports?.nav as NavItem[] | undefined) ?? [];
  const initial = value ?? items[0]?.id ?? "";
  const [active, setActive] = React.useState(initial);

  React.useEffect(() => {
    if (value !== undefined) setActive(value);
  }, [value]);

  const handleChange = (id: string) => {
    onValueChange?.(id);
    setActive(id);
  };

  if (!items.length) return null;

  return (
    <div className="w-full mt-8 space-y-8 lg:mt-12 lg:space-y-12 font-inter">
      <section aria-label="Solutions" className="w-full space-y-8">
        <Content activeId={active} dict={dict} locale={locale} site={site} />
        <PhoneCTA />
      </section>
    </div>
  );
}
