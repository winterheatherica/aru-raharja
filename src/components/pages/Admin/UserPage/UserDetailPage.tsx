"use client";

import Link from "next/link";
import { FormEvent, useEffect, useState } from "react";
import type { Locale, Dictionary } from "@/i18n/get_dictionary";
import { ADMIN_USER_URL, UserItem, USER_ROLES, UserRole } from "./_shared";

export default function UserDetailPage({ locale, dict, userId }: { locale: Locale; dict?: Dictionary; userId: string }) {
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [fullName, setFullName] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState<UserRole>("MEMBER");
  const [active, setActive] = useState(true);
  const [emailVerified, setEmailVerified] = useState(true);
  const [createdAt, setCreatedAt] = useState("");
  const [updatedAt, setUpdatedAt] = useState("");

  const t = (dict as any)?.admin?.user?.detail;

  useEffect(() => {
    (async () => {
      setLoading(true);
      setError(null);
      try {
        const res = await fetch(`${ADMIN_USER_URL}/${userId}`, { credentials: "include" });
        if (!res.ok) throw new Error(await res.text());

        const user: UserItem = await res.json();
        setEmail(user.email || "");
        setUsername(user.username || "");
        setFullName(user.full_name || "");
        setRole(user.role || "MEMBER");
        setActive(Boolean(user.active));
        setEmailVerified(Boolean(user.email_verified));
        setCreatedAt(user.created_at || "");
        setUpdatedAt(user.updated_at || "");
      } catch (e: any) {
        setError(e?.message || "Failed to load user detail");
      } finally {
        setLoading(false);
      }
    })();
  }, [userId]);

  async function onSave(e: FormEvent) {
    e.preventDefault();
    setSaving(true);
    setError(null);

    try {
      const payload: any = {
        email,
        username,
        full_name: fullName,
        role,
        active,
        email_verified: emailVerified,
      };

      if (password.trim()) payload.password = password.trim();

      const res = await fetch(`${ADMIN_USER_URL}/${userId}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify(payload),
      });

      if (!res.ok) throw new Error(await res.text());
      alert(t?.saved ?? "Saved");
      setPassword("");

      const detailRes = await fetch(`${ADMIN_USER_URL}/${userId}`, { credentials: "include" });
      if (detailRes.ok) {
        const refreshed: UserItem = await detailRes.json();
        setUpdatedAt(refreshed.updated_at || "");
      }
    } catch (e: any) {
      setError(e?.message || "Update failed");
    } finally {
      setSaving(false);
    }
  }

  if (loading) return <main className="mx-auto max-w-7xl p-6 md:pl-72 text-bumnslate-6">{t?.loading ?? "Loading..."}</main>;

  return (
    <main className="mx-auto max-w-7xl p-6 grid gap-4 md:pl-72">
      <section className="rounded-2xl border border-bumnslate-10 bg-bumn-gradient-white-4 p-5 shadow-bumn-2">
        <div className="flex items-center justify-between gap-4">
          <h1 className="text-2xl font-semibold text-bumnblue-2">{t?.titlePrefix ?? "User Detail"} • {userId}</h1>
          <Link href={`/${locale}/admin/user`} className="inline-flex items-center justify-center rounded-xl border border-bumnslate-10 bg-white px-3 py-2 text-sm text-bumnslate-6">{t?.backToList ?? "Back to list"}</Link>
        </div>
      </section>

      {error && <p className="rounded-xl border border-red-200 bg-red-50 px-3 py-2 text-sm text-red-600">{error}</p>}

      <form onSubmit={onSave} className="grid gap-3 rounded-2xl border border-bumnslate-10 bg-bumn-gradient-white-4 p-5 shadow-bumn-2">
        <input className="rounded-xl border border-bumnslate-10 bg-white px-3 py-2" type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder={t?.placeholders?.email ?? "email"} required />
        <input className="rounded-xl border border-bumnslate-10 bg-white px-3 py-2" value={username} onChange={(e) => setUsername(e.target.value)} placeholder={t?.placeholders?.username ?? "username"} required />
        <input className="rounded-xl border border-bumnslate-10 bg-white px-3 py-2" value={fullName} onChange={(e) => setFullName(e.target.value)} placeholder={t?.placeholders?.fullName ?? "full_name"} required />
        <input className="rounded-xl border border-bumnslate-10 bg-white px-3 py-2" type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder={t?.placeholders?.password ?? "password (leave empty if unchanged)"} />

        <select className="rounded-xl border border-bumnslate-10 bg-white px-3 py-2" value={role} onChange={(e) => setRole(e.target.value as UserRole)}>
          {USER_ROLES.map((r) => (
            <option key={r} value={r}>{r}</option>
          ))}
        </select>

        <label className="flex items-center gap-2 text-sm"><input type="checkbox" checked={active} onChange={(e) => setActive(e.target.checked)} /> {t?.labels?.active ?? "active"}</label>
        <label className="flex items-center gap-2 text-sm"><input type="checkbox" checked={emailVerified} onChange={(e) => setEmailVerified(e.target.checked)} /> {t?.labels?.emailVerified ?? "email_verified"}</label>

        <div className="grid gap-1 rounded-xl border border-bumnslate-10 bg-white p-3 text-sm text-bumnslate-6">
          <p><b>{t?.fields?.createdAt ?? "Created"}:</b> {createdAt ? new Date(createdAt).toLocaleString() : "-"}</p>
          <p><b>{t?.fields?.updatedAt ?? "Updated"}:</b> {updatedAt ? new Date(updatedAt).toLocaleString() : "-"}</p>
        </div>

        <button type="submit" disabled={saving} className="inline-flex w-fit items-center justify-center rounded-xl bg-bumn-gradient-primary-11 px-4 py-2 font-medium text-white shadow-bumn-2 transition hover:opacity-95">{saving ? (t?.submitSaving ?? "Saving...") : (t?.submitIdle ?? "Save")}</button>
      </form>
    </main>
  );
}
