"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import type { Locale, Dictionary } from "@/i18n/get_dictionary";
import { ADMIN_USER_URL, UserItem, USER_ROLES } from "./_shared";

export default function UserListPage({ locale, dict }: { locale: Locale; dict?: Dictionary }) {
  const [items, setItems] = useState<UserItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const t = (dict as any)?.admin?.user?.list;

  async function load() {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch(ADMIN_USER_URL, { credentials: "include" });
      if (!res.ok) throw new Error(await res.text());
      setItems(await res.json());
    } catch (e: any) {
      setError(e?.message || "Failed to load user");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    load();
  }, []);

  async function onDelete(id: string) {
    if (!confirm(t?.deleteConfirm ?? "Hard delete user ini?")) return;
    try {
      const res = await fetch(`${ADMIN_USER_URL}/${id}`, { method: "DELETE", credentials: "include" });
      if (!res.ok) throw new Error(await res.text());
      await load();
    } catch (e: any) {
      setError(e?.message || "Delete failed");
    }
  }

  const roleCount = useMemo(() => {
    return USER_ROLES.reduce((acc, role) => {
      acc[role] = items.filter((x) => x.role === role).length;
      return acc;
    }, {} as Record<string, number>);
  }, [items]);

  return (
    <main className="mx-auto max-w-7xl p-6 grid gap-6 md:pl-72">
      <section className="rounded-2xl border border-bumnslate-10 bg-bumn-gradient-white-4 p-5 shadow-bumn-2">
        <div className="flex items-center justify-between gap-4">
          <h1 className="text-2xl font-semibold text-bumnblue-2">{t?.title ?? "Admin • User"}</h1>
          <Link href={`/${locale}/admin/user/create`} className="inline-flex items-center justify-center rounded-xl bg-bumn-gradient-primary-11 px-4 py-2 text-sm font-medium text-white shadow-bumn-2 transition hover:opacity-95">{t?.createButton ?? "Create User"}</Link>
        </div>

        <div className="mt-4 grid gap-2 text-sm text-bumnslate-6">
          <p><b>{t?.fields?.total ?? "Total"}:</b> {items.length}</p>
          <p><b>{t?.fields?.roleType ?? "Type"}:</b> {USER_ROLES.join(", ")}</p>
          <p><b>{t?.fields?.roleCount ?? "Count by role"}:</b> {USER_ROLES.map((r) => `${r}: ${roleCount[r] ?? 0}`).join(" | ")}</p>
        </div>
      </section>

      {error && <p className="rounded-xl border border-red-200 bg-red-50 px-3 py-2 text-sm text-red-600">{error}</p>}

      {loading ? <p className="text-bumnslate-6">{t?.loading ?? "Loading..."}</p> : (
        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          {items.map((item) => (
            <article key={item.id} className="rounded-2xl border border-bumnslate-10 bg-bumn-gradient-white-4 p-5 shadow-bumn-2 grid gap-2 text-sm text-bumnslate-6">
              <p><b>{t?.fields?.id ?? "ID"}:</b> {item.id}</p>
              <p><b>{t?.fields?.email ?? "Email"}:</b> {item.email}</p>
              <p><b>{t?.fields?.username ?? "Username"}:</b> {item.username}</p>
              <p><b>{t?.fields?.fullName ?? "Full Name"}:</b> {item.full_name}</p>
              <p><b>{t?.fields?.role ?? "Role"}:</b> {item.role}</p>
              <p><b>{t?.fields?.active ?? "Active"}:</b> {String(item.active)}</p>
              <p><b>{t?.fields?.emailVerified ?? "Email Verified"}:</b> {String(item.email_verified)}</p>
              <p><b>{t?.fields?.createdAt ?? "Created"}:</b> {new Date(item.created_at).toLocaleString()}</p>
              <p><b>{t?.fields?.updatedAt ?? "Updated"}:</b> {new Date(item.updated_at).toLocaleString()}</p>

              <div className="pt-1 flex gap-2">
                <Link href={`/${locale}/admin/user/${item.id}`} className="inline-flex items-center justify-center rounded-xl bg-bumn-gradient-primary-11 px-3 py-2 text-sm font-medium text-white shadow-bumn-2 transition hover:opacity-95">{t?.detailButton ?? "Detail / Edit"}</Link>
                <button type="button" className="inline-flex items-center justify-center rounded-xl border border-red-300 bg-white px-3 py-2 text-sm font-medium text-red-600 transition hover:bg-red-50" onClick={() => onDelete(item.id)}>{t?.deleteButton ?? "Hard Delete"}</button>
              </div>
            </article>
          ))}
        </div>
      )}
    </main>
  );
}
