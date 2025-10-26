"use client";

import { usePathname } from "next/navigation";
import { routeSlugByLocale } from "@/i18n/routes";
import type { Locale } from "@/i18n/routes";
import FooterClient from "@/components/general/FooterClient/FooterClient";

type Props = {
  dict: any;
  locale: Locale;
};

export default function Footer({ dict, locale }: Props) {
  const pathname = usePathname() ?? "/";
  const segments = pathname.split("/").filter(Boolean);
  const visible = segments[1] ?? "";

  const map = routeSlugByLocale[locale] ?? routeSlugByLocale["id"];
  const loginSlug = map["login"];
  const adminSlug = map["admin"];

  if (visible === loginSlug || visible === adminSlug) {
    return null;
  }

  return <FooterClient dict={dict} locale={locale} />;
}
