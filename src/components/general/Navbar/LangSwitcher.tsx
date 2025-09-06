"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import type { Locale } from "@/i18n/getDictionary";

export default function LangSwitcher({ locale }: { locale: Locale }) {
  const pathname = usePathname() || "/";
  const parts = pathname.split("/");

  const currentLocale =
    parts[1] === "id" || parts[1] === "en" ? (parts[1] as Locale) : locale;

  const toPath = (target: "id" | "en") => {
    const next = [...parts];

    if (!(next[1] === "id" || next[1] === "en")) {
      next.splice(1, 0, target);
    } else {
      next[1] = target;
    }

    const url = next.join("/") || "/";
    return url.startsWith("//") ? url.slice(1) : url;
  };

  const targetID = toPath("id");
  const targetEN = toPath("en");

  const isID = currentLocale === "id";
  const isEN = currentLocale === "en";

  const toSetLocale = (val: "id" | "en", redirect: string) =>
    `/set-locale?value=${val}&redirect=${encodeURIComponent(redirect)}`;

  return (
    <div className="flex items-center pl-3 text-sm font-medium">
      <Link
        href={toSetLocale("id", targetID)}
        aria-current={isID ? "page" : undefined}
        className={`text-blue-700 ${isID ? "underline font-semibold" : "hover:underline"}`}
      >
        ID
      </Link>

      <span className="mx-2 block h-4 w-px bg-neutral-300" />

      <Link
        href={toSetLocale("en", targetEN)}
        aria-current={isEN ? "page" : undefined}
        className={`text-blue-700 ${isEN ? "underline font-semibold" : "hover:underline"}`}
      >
        EN
      </Link>
    </div>
  );
}
