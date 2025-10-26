"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import type { Locale } from "@/i18n/get_dictionary";
import { canonicalBySlug, routeSlugByLocale } from "@/i18n/routes";

export default function LangSwitcher({ locale }: { locale: Locale }) {
  const pathname = usePathname() || "/";
  const parts = pathname.split("/");

  const isKnownLocale = (val: string | undefined): val is Locale =>
    val === "id" || val === "en";

  const currentLocale: Locale = isKnownLocale(parts[1]) ? (parts[1] as Locale) : locale;

  const toPath = (target: Locale) => {
    const next = [...parts];

    if (!isKnownLocale(next[1])) next.splice(1, 0, target);
    else next[1] = target;

    const currentSlug = next[2];

    if (!currentSlug) {
      next[2] = routeSlugByLocale[target].home;
    } else {
      const canonicalMap = canonicalBySlug(currentLocale);
      const canonical = canonicalMap[currentSlug];

      if (canonical) {
        next[2] = routeSlugByLocale[target][canonical];
      }
    }

    const url = next.join("/") || "/";
    return url.startsWith("//") ? url.slice(1) : url;
  };

  const targetID = toPath("id");
  const targetEN = toPath("en");

  const isID = currentLocale === "id";
  const isEN = currentLocale === "en";

  const toSetLocale = (val: Locale, redirect: string) =>
    `/set-locale?value=${val}&redirect=${encodeURIComponent(redirect)}`;

  return (
    <div className="flex items-center pl-3 text-sm font-medium">
      <Link
        href={toSetLocale("id", targetID)}
        aria-current={isID ? "page" : undefined}
        className={`${
          isID
            ? "text-bumnblue-8 underline font-semibold"
            : "text-bumnslate-3 hover:underline"
        }`}
      >
        ID
      </Link>

      <span className="mx-2 block h-4 w-px bg-neutral-300" />

      <Link
        href={toSetLocale("en", targetEN)}
        aria-current={isEN ? "page" : undefined}
        className={`${
          isEN
            ? "text-bumnblue-8 underline font-semibold"
            : "text-bumnslate-3 hover:underline"
        }`}
      >
        EN
      </Link>
    </div>
  );
}
