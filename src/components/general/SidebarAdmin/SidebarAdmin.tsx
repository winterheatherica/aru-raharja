"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import type { Locale, Dictionary } from "@/i18n/get_dictionary";
import { routeSlugByLocale } from "@/i18n/routes";
import LangSwitcher from "@/components/general/HeaderClient/LangSwitcher";

export const API_BASE = process.env.NEXT_PUBLIC_API_BASE!.replace(/\/$/, "");
export const LOGOUT_URL = `${API_BASE}/api/auth/logout`;

type Props = {
  locale: Locale;
  dict?: Dictionary;
};

export default function SidebarAdmin({ locale, dict }: Props) {
  const pathname = usePathname() ?? "/";
  const segments = pathname.split("/").filter(Boolean);
  const visible = segments[1] ?? "";

  const map = routeSlugByLocale[locale] ?? routeSlugByLocale.id;
  const adminSlug = map.admin;
  const loginSlug = map.login;

  if (visible !== adminSlug) return null;

  const t = (dict as any)?.admin?.sidebar;

  const menuItems = [
    { label: "My Profile", slug: "me" },
    { label: "Award", slug: "award" },
    { label: "Career Vacancy", slug: "career-vacancy" },
    { label: "Client", slug: "client" },
    { label: "Hero", slug: "hero" },
    { label: "History", slug: "history" },
    { label: "News Article", slug: "news-article" },
    { label: "News Category", slug: "news-category" },
    { label: "Partner", slug: "partner" },
    { label: "Promo Slide", slug: "promo-slide" },
    { label: "Service Certification", slug: "service-certification" },
    { label: "Service Gallery", slug: "service-gallery" },
    { label: "Service Matrix", slug: "service-matrix" },
    { label: "Service Pricing Tier", slug: "service-pricing-tier" },
    { label: "Session", slug: "session" },
    { label: "Space Room", slug: "space-room" },
    { label: "User", slug: "user" },
  ] as const;

  async function onLogout() {
    await fetch(LOGOUT_URL, { method: "POST", credentials: "include" });
    location.href = `/${locale}/${loginSlug}`;
  }

  return (
    <aside className="fixed inset-y-0 left-0 z-40 w-64 border-r bg-white p-4">
      <div className="mb-6 px-2">
        <h2 className="text-lg font-semibold">{t?.title ?? "Admin"}</h2>
        <div className="flex items-center justify-between gap-2">
          <p className="text-xs opacity-70">{t?.subtitle ?? "Dashboard Menu"}</p>
          <LangSwitcher locale={locale} />
        </div>
      </div>

      <nav className="flex h-[calc(100%-5rem)] flex-col">
        <div className="space-y-2 overflow-y-auto pr-1">
          {menuItems.map((item) => {
            const href = `/${locale}/${adminSlug}/${item.slug}`;
            const isActive = pathname === href;

            return (
              <Link
                key={item.slug}
                href={href}
                className={`flex h-10 items-center rounded-lg px-3 text-sm font-medium ${
                  isActive
                    ? "bg-bumn-gradient-primary-16 text-white"
                    : "text-bumnslate-3 hover:bg-gray-50 hover:text-neutral-900"
                }`}
              >
                {item.label}
              </Link>
            );
          })}
        </div>

        <div className="mt-auto border-t pt-3">
          <button
            type="button"
            onClick={onLogout}
            className="w-full rounded-lg border px-3 py-2 text-left text-sm font-medium text-red-600 hover:bg-red-50"
          >
            {t?.logout ?? "Logout"}
          </button>
        </div>
      </nav>
    </aside>
  );
}
