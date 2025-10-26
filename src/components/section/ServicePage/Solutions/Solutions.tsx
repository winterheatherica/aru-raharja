"use client";

import * as React from "react";
import Navigation from "./Navigation/Navigation";
import Content from "./Content/Content";
import PhoneCTA from "@/components/general/BluePrint/PhoneCTA/PhoneCTA";

type NavItem = { id: string; label: string };

type DictShape = {
  service?: {
    solutions?: {
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
  value?: string;
  onValueChange?: (id: string) => void;
};

export default function Solutions({ dict, locale, value, onValueChange }: Props) {
  const items = (dict?.service?.solutions?.nav as NavItem[] | undefined) ?? [];
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
        <Navigation dict={dict} value={active} onChange={handleChange} />
        <div className="w-[90%] mx-auto">
          <Content activeId={active} dict={dict} locale={locale} />
          <PhoneCTA />
        </div>
      </section>
    </div>
  );
}
