"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import type { Locale, Dictionary } from "@/i18n/get_dictionary";
import { ADMIN_SPACE_ROOM_URL, SpaceRoomItem } from "./_shared";

export default function SpaceRoomListPage({ locale, dict }: { locale: Locale; dict?: Dictionary }) {
  const [items, setItems] = useState<SpaceRoomItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const t = (dict as any)?.admin?.spaceRoom?.list;

  async function load() {
    setLoading(true);
    try {
      const res = await fetch(ADMIN_SPACE_ROOM_URL, { credentials: "include" });
      if (!res.ok) throw new Error(await res.text());
      setItems(await res.json());
    } catch (e: any) {
      setError(e?.message || "Failed to load");
    } finally { setLoading(false); }
  }

  useEffect(() => { load(); }, []);

  async function onDelete(id: string) {
    if (!confirm("Hard delete room ini?")) return;
    const res = await fetch(`${ADMIN_SPACE_ROOM_URL}/${id}`, { method: "DELETE", credentials: "include" });
    if (res.ok) load();
  }

  return (
    <main className="mx-auto max-w-7xl p-6 grid gap-4 md:pl-72">
      <section className="rounded-2xl border border-bumnslate-10 bg-bumn-gradient-white-4 p-5 shadow-bumn-2 flex items-center justify-between">
        <h1 className="text-2xl font-semibold text-bumnblue-2">{t?.title ?? "Admin • Space Room"}</h1>
        <Link href={`/${locale}/admin/space-room/create`} className="rounded-xl bg-bumn-gradient-primary-11 px-4 py-2 text-sm text-white">{t?.createButton ?? "Create Room"}</Link>
      </section>
      {error && <p className="text-sm text-red-600">{error}</p>}
      {loading ? <p>Loading...</p> : (
        <div className="grid gap-3 md:grid-cols-2 xl:grid-cols-3">
          {items.map((it) => {
            const tr = it.translations?.find((x) => (x.language || "").toUpperCase() === locale.toUpperCase()) || it.translations?.find((x) => (x.language || "").toUpperCase() === "ID") || it.translations?.[0];
            return (
              <article
                key={it.id}
                className={[
                  "rounded-2xl border border-bumnslate-10 bg-white p-4 shadow-bumn-2 grid gap-3",
                  it.is_active ? "ring-2 ring-bumnblue-5" : "",
                ].join(" ")}
              >
                {it.main_image_url && (
                  <img src={it.main_image_url} alt={tr?.title || it.code} className="h-40 w-full rounded-xl object-cover" />
                )}
                <p className="text-xs text-bumnslate-6">{it.code}</p>
                <h3 className="text-lg font-semibold">{tr?.title || "-"}</h3>
                <div
                  className="line-clamp-2 text-sm text-bumnslate-6 [&_p]:m-0 [&_ul]:m-0 [&_ol]:m-0"
                  dangerouslySetInnerHTML={{ __html: tr?.description || "-" }}
                />
                <div className="flex gap-2">
                  <Link href={`/${locale}/admin/space-room/${it.id}`} className="rounded-xl bg-bumn-gradient-primary-11 px-3 py-2 text-sm text-white">Detail / Edit</Link>
                  <button onClick={() => onDelete(it.id)} className="rounded-xl border border-red-300 px-3 py-2 text-sm text-red-600">Hard Delete</button>
                </div>
              </article>
            );
          })}
        </div>
      )}
    </main>
  );
}
