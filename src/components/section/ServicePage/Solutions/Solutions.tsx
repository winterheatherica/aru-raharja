"use client";

import * as React from "react";
import { useRouter } from "next/navigation";
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
  const router = useRouter();

  React.useEffect(() => {
    setActive(value);
  }, [value]);

  if (!items.length) return null;

  const base =
    (dynamicSegmentByLocale as any)[locale]?.service ??
    (dynamicSegmentByLocale as any)["id"]?.service;

  const handleChange = (id: string) => {
    if (id === active) return;
    setActive(id);
    router.replace(`/${locale}/${base}/${id}`, { scroll: false });
  };

  return (
    <div className="w-full mt-8 space-y-8 lg:mt-12 lg:space-y-12 font-inter">
      <section aria-label="Solutions" className="w-full space-y-8">
        <Navigation
          dict={dict}
          value={active}
          onChange={handleChange}
          hrefFor={(id) => `/${locale}/${base}/${id}`}
          orientation="horizontal"
        />

        <div className="w-[90%] mx-auto">
          <Content activeId={active} dict={dict} site={site} />
        </div>
      </section>
    </div>
  );
}
