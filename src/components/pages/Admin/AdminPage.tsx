"use client";

import { useEffect } from "react";
import type { Locale, Dictionary } from "@/i18n/get_dictionary";

export default function AdminPage({ dict, locale }: { dict?: Dictionary; locale: Locale }) {
  useEffect(() => {
    window.location.replace(`/${locale}/admin/me`);
  }, [locale]);

  const t = (dict as any)?.admin?.common;

  return <p className="p-6">{t?.redirecting ?? "Redirecting..."}</p>;
}
