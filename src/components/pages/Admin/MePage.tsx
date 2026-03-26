"use client";
import { useEffect, useState } from "react";
import type { Locale, Dictionary } from "@/i18n/get_dictionary";

export const API_BASE = process.env.NEXT_PUBLIC_API_BASE!.replace(/\/$/, "");
export const ME_URL = `${API_BASE}/api/me`;

export default function MePage({ dict, locale }: { dict?: Dictionary; locale: Locale }) {
  const [me, setMe] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  const t = (dict as any)?.admin?.me;

  useEffect(() => {
    (async () => {
      try {
        const res = await fetch(ME_URL, { credentials: "include" });
        if (res.ok) setMe(await res.json());
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  if (loading) return <p>{t?.loading ?? "Loading..."}</p>;
  if (!me) {
    const loginSlug = locale === "id" ? "login" : "login";
    return (
      <main className="mx-auto max-w-lg p-6">
        <p className="mb-2">{t?.notSignedIn ?? (locale === "id" ? "Anda belum masuk." : "You are not signed in.")}</p>
        <a className="underline" href={`/${locale}/${loginSlug}`}>
          {t?.goToLogin ?? (locale === "id" ? "Ke halaman masuk" : "Go to login")}
        </a>
      </main>
    );
  }

  return (
    <main className="mx-auto max-w-3xl p-6 grid gap-4 md:pl-72">
      <h1 className="text-2xl font-semibold">{t?.title ?? "Admin • Me"}</h1>
      <div className="rounded-lg border p-4 text-sm">
        <p><span className="font-medium">{t?.fields?.name ?? "Name"}:</span> {me.full_name || "-"}</p>
        <p><span className="font-medium">{t?.fields?.email ?? "Email"}:</span> {me.email}</p>
        <p><span className="font-medium">{t?.fields?.role ?? "Role"}:</span> {me.role}</p>
      </div>
    </main>
  );
}
