"use client";

import { usePathname } from "next/navigation";
import { routeSlugByLocale } from "@/i18n/routes";
import type { Locale } from "@/i18n/routes";
import HeaderClient from "@/components/general/HeaderClient/HeaderClient"; // komponen header existing (pure UI)

type Props = {
  dict: any;
  locale: Locale;
};

export default function Header({ dict, locale }: Props) {
  const pathname = usePathname() ?? "/";
  const segments = pathname.split("/").filter(Boolean); // ['en','login'] or ['id','beranda']
  const visible = segments[1] ?? ""; // second segment is the visible page slug

  const map = routeSlugByLocale[locale] ?? routeSlugByLocale["id"];
  const loginSlug = map["login"];
  const adminSlug = map["admin"];

  // if current visible page is login/admin, don't render the header
  if (visible === loginSlug || visible === adminSlug) {
    return null;
  }

  // otherwise render the regular Header (pass props through)
  return <HeaderClient dict={dict} locale={locale} />;
}
