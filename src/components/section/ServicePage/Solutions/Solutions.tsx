"use client";

import * as React from "react";
import Navigation from "./Navigation/Navigation";
import Content from "./Content/Content";
import { dynamicSegmentByLocale } from "@/i18n/param_routes";

type NavItem = { id: string; label: string };

type DictShape = {
  service?: {
    solutions?: {
      nav?: readonly NavItem[];
    };
  };
};

type Props = {
  dict: DictShape;
  locale: string;
  value: string;
  site?: any;
};

export default function Solutions({ dict, locale, value, site }: Props) {
  const items =
    (dict?.service?.solutions?.nav as NavItem[] | undefined) ?? [];

  const [active, setActive] = React.useState(value);

  React.useEffect(() => {
    setActive(value);
  }, [value]);

  if (!items.length) return null;

  const handleChange = (id: string) => {
    if (id === active) return;
    setActive(id);
    const base =
      (dynamicSegmentByLocale as any)[locale]?.service ??
      (dynamicSegmentByLocale as any)["id"]?.service;

    if (typeof window !== "undefined") {
      window.history.replaceState({}, "", `/${locale}/${base}?solution=${id}`);
    }
  };

  return (
    <div className="w-full mt-8 space-y-8 lg:mt-12 lg:space-y-12 font-inter">
      <section aria-label="Solutions" className="w-full space-y-8">
        <Navigation
          dict={dict}
          value={active}
          onChange={handleChange}
          orientation="horizontal"
        />

        <div className="w-[90%] mx-auto">
          <Content activeId={active} dict={dict} site={site} />
        </div>
      </section>
    </div>
  );
}
