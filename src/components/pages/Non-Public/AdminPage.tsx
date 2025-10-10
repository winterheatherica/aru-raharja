"use client";
import { useEffect, useState } from "react";
import type { Locale, Dictionary } from "@/i18n/getDictionary";

const API_BASE = process.env.NEXT_PUBLIC_API_BASE ?? "/api";

export default function AdminPage({ dict, locale }: { dict?: Dictionary; locale: Locale }) {
  const [me, setMe] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => { (async () => {
    try {
      const res = await fetch(`${API_BASE}/me`, { credentials: "include" });
      if (res.ok) setMe(await res.json());
    } finally { setLoading(false); }
  })(); }, []);

  if (loading) return <p>Loading...</p>;
  if (!me) {
    const loginSlug = locale === "id" ? "login" : "login";
    return (
      <main className="mx-auto max-w-lg p-6">
        <p className="mb-2">{locale === "id" ? "Anda belum masuk." : "You are not signed in."}</p>
        <a className="underline" href={`/${locale}/${loginSlug}`}>
          {locale === "id" ? "Ke halaman masuk" : "Go to login"}
        </a>
      </main>
    );
  }

  return (
    <main className="mx-auto max-w-2xl p-6 grid gap-4">
      <h1 className="text-2xl font-semibold">Admin</h1>
      <div className="text-sm opacity-80">{me.full_name} • {me.email} • {me.role}</div>
      <form onSubmit={async (e)=>{ e.preventDefault(); await fetch(`${API_BASE}/auth/logout`, { method:"POST", credentials:"include" }); location.href=`/${locale}`; }}>
        <button className="border rounded p-2">Logout</button>
      </form>
    </main>
  );
}
