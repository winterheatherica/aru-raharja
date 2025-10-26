"use client";

import { usePathname } from "next/navigation";
import { routeSlugByLocale } from "@/i18n/routes";
import type { Locale } from "@/i18n/routes";
import HeaderClient from "@/components/general/HeaderClient/HeaderClient";

type Props = {
  dict: any;
  locale: Locale;
};

export default function Header({ dict, locale }: Props) {
  const pathname = usePathname() ?? "/";
  const segments = pathname.split("/").filter(Boolean);
  const visible = segments[1] ?? "";

  const map = routeSlugByLocale[locale] ?? routeSlugByLocale["id"];
  const loginSlug = map["login"];
  const adminSlug = map["admin"];

  if (visible === loginSlug || visible === adminSlug) {
    return null;
  }

  return <HeaderClient dict={dict} locale={locale} />;
}
